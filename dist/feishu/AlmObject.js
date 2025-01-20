"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlmObject = void 0;
const fs_1 = __importDefault(require("fs"));
const node = JSON.parse(fs_1.default.readFileSync('../../conf/workflow/node2section.json', 'utf8'));
const section = JSON.parse(fs_1.default.readFileSync('../../conf/workflow/section2.json', 'utf8'));
class AlmObject {
    constructor(obj) {
        Object.assign(this, obj);
    }
    setSection(status) {
        let id, sec;
        node.forEach(n => {
            // console.log(n, status)
            if (n.node === status.name) {
                // console.log(n.sec_id)
                id = n.sec_id;
                sec = section[n.sec_id];
            }
        });
        return [id, sec].join('.');
    }
    setValueFromAlm(almInfo, sysList) {
        this.id = almInfo['id'] || almInfo.id;
        this.key = almInfo['key'];
        this.name = almInfo['name'];
        this.type = almInfo['itemType'].name || almInfo.type;
        this.priority = almInfo['jjcd'];
        this.section = this.setSection(almInfo['status']); // 阶段，待划分
        this.status = almInfo['status']['name'];
        this.workspace = almInfo['workspace']['name'];
        this.tcr = almInfo['tcr'];
        this.tcbm = almInfo['tcbm'];
        this.fzr = almInfo.values.yfjjy ? almInfo.values.yfjjy.map(i => i.label) : ['未指派'];
        this.sjxt = almInfo.values.sjxt ? almInfo.values.sjxt.map(i => sysList[i]) : [];
        this.sjxt2 = almInfo.values.sjxt2 ? almInfo.values.sjxt2.map(i => sysList[i]) : [];
        this.bgxt = almInfo.values.bgxtqk ? almInfo.values.bgxtqk.map(i => sysList[i]) : [];
        this.numFzr = almInfo.values.yfjjy ? almInfo.values.yfjjy.length : 0;
        this.responsible = (this.numFzr === 1) ? this.fzr : []; // 有点问题-修改为[]看看
        this.numSjxt = almInfo.values.sjxt ? almInfo.values.sjxt.length : 0;
        this.numSjxt2 = almInfo.values.sjxt2 ? almInfo.values.sjxt2.length : 0;
        this.numBgxt = almInfo.values.bgxtqk ? almInfo.values.bgxtqk.length : 0;
        this.singleSystem = (this.numSjxt === 1) || (this.numBgxt === 1);
        this.xfrq = this.toDate(almInfo.values['xfrq']); // 下发日期
        this.jhbgrq = this.toDate(almInfo.values['jhbgrq']); // 计划变更日期
        this.sjsxsj = this.toDate(almInfo.values['sjsxsj']); // 实际上线日期
        this.xqjl = almInfo.values['xqjl'] ? almInfo.values['xqjl'].label : ''; // 需求经理
        this.fpr = almInfo.values['fpr'] ? almInfo.values['fpr'].label : ""; // 分派给
        this.User_dr = almInfo.values['User_dr'] ? almInfo.values['User_dr'].label : ""; // 测试经理
        this.cszxr = almInfo.values['cszxr'] ? almInfo.values['cszxr'].label : ''; // 测试执行人
        this.ywjl = almInfo.values['ywjl'] ? almInfo.values['ywjl'].label : ""; // 运维经理
        this.ces = this.toDate(almInfo.values['ces']); //测试实际开始时间
        // this.Date_dr = new Date(almInfo.values['Date_dr']).toLocaleDateString()	//测试实际结束时间
        this.Date_dr = this.toDate(almInfo.values['Date_dr']); //测试实际结束时间
        // this.sjxjzsxx = almInfo.values['sjxjzsxx']	//时间线及注释信息
        this.kfzgzl = almInfo.values['kfzgzl']; // 开发总工作量
        this.bbh = almInfo.values['bbh']; //版本号
        // this.RQ_VC_CHECKIN_DATE = almInfo.values['RQ_VC_CHECKIN_DATE']	//版本签入日期
    }
    StatusObject(sysInfo) {
        this.id = sysInfo['id'];
        this.key = sysInfo['key'];
        this.name = sysInfo['name'];
        this.status = sysInfo['status']['name'];
        this.workspace = sysInfo['workspace']['name'];
    }
    ;
    SysObject(sysInfo) {
        this.id = sysInfo['id'];
        this.key = sysInfo['key'];
        this.name = sysInfo['name'];
        this.status = sysInfo['status']['name'];
        this.workspace = sysInfo['workspace']['name'];
    }
    ;
    toDate(timestamp) {
        if (timestamp) {
            return new Date(timestamp).toLocaleDateString();
        }
        else {
            undefined;
        }
    }
    toString(dlm = ' ') {
        return [this.key, this.type, this.name, this.fzr.join(','), this.section, this.status,
            this.xfrq, this.jhbgrq, this.sjsxsj,
            ':::', this.sjxt.join(','), '***', this.bgxt.join(',')].join(dlm);
    }
    toFeishu() {
        return {
            "Key": this.key,
            "类型": this.type,
            "需求名称": this.name,
            "负责人": this.fzr.join(','),
            "阶段": this.section,
            "状态": this.status,
            "下发日期": new Date(this.xfrq).valueOf(),
            "计划上线日期": new Date(this.jhbgrq).valueOf(),
            "实际上线日期": new Date(this.sjsxsj).valueOf(),
            "涉及系统": this.sjxt.join(','),
            "变更系统": this.bgxt.join(','),
            "备注": ""
        };
    }
}
exports.AlmObject = AlmObject;
function test2() {
    const content = JSON.parse(fs_1.default.readFileSync('../../conf/almList_full.json', 'utf8'));
    const sys = JSON.parse(fs_1.default.readFileSync('../../conf/jgbs.json', 'utf8'));
    content.payload.items.forEach(i => {
        // const a = new AlmObject()
        const a = AlmObject.setValueFromAlm(i, sys);
        // console.log(JSON.stringify(a.toFeishu()))
        // const x = a.toFeishu()
        console.log(a.name);
        // console.log(a.toFeishu())
    });
}
// test2()
// module.exports = {AlmObject};
