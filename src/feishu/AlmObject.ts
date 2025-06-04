import fs from "fs";

const node = JSON.parse(fs.readFileSync('../../conf/workflow/node2section.json', 'utf8'));
const section = JSON.parse(fs.readFileSync('../../conf/workflow/section2.json', 'utf8'));

type almSection = '1.受理' | '2.开发' | '3.测试' | '4.上线准备' | '5.上线后验证' | '6.关闭' | '9.暂停' | '0.其他'
type almType = '需求' | '项目' | '缺陷'


interface Feishu {
    "Key": string,
    "类型": almType,
    "需求名称": string,
    "负责人": string,
    "阶段": almSection,
    "状态": string,
    "下发日期": Date,
    "计划上线日期": Date,
    "实际上线日期": Date,
    "涉及系统": string,
    "变更系统": string,
    "签报号-TechOne" string,
    "备注": string
}

// ALM响应接口
interface AlmList {
    code: number;
    payload: Payload;
    iql: string;
    updateDateTime: string;
}

// 数据负载接口
interface Payload {
    count: number;
    items: AlmItem[];
}

// ALM需求项接口
interface AlmItem {
    id: string;                    // 唯一标识
    key: string;                   // ALM编号
    name: string;                  // 需求名称
    type: string;                  // 类型
    section: string;               // 所处阶段
    status: string;                // 状态
    workspace: string;             // 工作空间
    fzr: string[];                // 负责人列表
    sjxt: string[];               // 涉及系统
    sjxt2: string[];              // 涉及系统2
    bgxt: string[];               // 变更系统
    numFzr: number;               // 负责人数量
    responsible: string[];        // 责任人列表
    numSjxt: number;              // 涉及系统数量
    numSjxt2: number;             // 涉及系统2数量
    numBgxt: number;              // 变更系统数量
    singleSystem: boolean;        // 是否单系统
    xqjl?: string;                // 需求经理（可选）
    User_dr?: string;             // 用户DR（可选）
    bbh: string;                  // 版本号
    xfrq?: string;                // 下发日期（可选）
    cszxr?: string;               // 测试执行人（可选）
    ywjl?: string;                // 业务经理（可选）
    sjsxsj?: string;              // 实际生效时间（可选）
    oaqbh?: string;              // OA签报号
}


interface obj {
    setSection(status: string): string;

    setValueFromAlm(almInfo: AlmItem, sysList: any): void;

    StatusObject(sysInfo: any): void;

    SysObject(sysInfo): void;

    toDate(timestamp: string): string | undefined;

    toString(dlm: string): string;

    toFeishu(): Feishu;
}


export class AlmObject {
    id!: string;
    key!: string;
    name!: string;
    type!: string;
    section!: string;
    status!: string;
    workspace!: string;
    fzr!: string[];
    sjxt!: string[];
    sjxt2!: string[];
    bgxt!: string[];
    numFzr!: number;
    responsible!: string[];
    numSjxt!: number;
    numSjxt2!: number;
    numBgxt!: number;
    singleSystem!: boolean;
    xqjl?: string;
    User_dr?: string;
    bbh!: string;
    xfrq?: string;
    cszxr?: string;
    ywjl?: string;
    sjsxsj?: string;
    priority!: string;
    tcr?: string;
    tcbm?: string;
    fpr?: string;
    oaqbh?: string;
    private jhbgrq?: string;
    private ces?: string;
    private Date_dr?: string;
    private kfzgzl?: any;

    constructor(obj: AlmItem) {
        Object.assign(this, obj)
    }

    setSection(status: string) {
        let id, sec
        node.forEach(n => {
            // console.log(n, status)
            if (n.node === status.name) {
                // console.log(n.sec_id)
                id = n.sec_id
                sec = section[n.sec_id]
            }
        })
        return [id, sec].join('.')
    }

    setValueFromAlm(almInfo: AlmItem, sysList) {
        this.id = almInfo['id'] || almInfo.id
        this.key = almInfo['key']
        this.name = almInfo['name']
        this.type = almInfo['itemType'].name || almInfo.type
        this.priority = almInfo['jjcd']
        this.section = this.setSection(almInfo['status']) // 阶段，待划分
        this.status = almInfo['status']['name']
        this.workspace = almInfo['workspace']['name']
        this.tcr = almInfo['tcr']
        this.tcbm = almInfo['tcbm']
        this.fzr = almInfo.values.yfjjy ? almInfo.values.yfjjy.map(i => i.label) : ['未指派']
        this.sjxt = almInfo.values.sjxt ? almInfo.values.sjxt.map(i => sysList[i]) : []
        this.sjxt2 = almInfo.values.sjxt2 ? almInfo.values.sjxt2.map(i => sysList[i]) : []
        this.bgxt = almInfo.values.bgxtqk ? almInfo.values.bgxtqk.map(i => sysList[i]) : []
        this.numFzr = almInfo.values.yfjjy ? almInfo.values.yfjjy.length : 0
        this.responsible = (this.numFzr === 1) ? this.fzr : [] // 有点问题-修改为[]看看
        this.numSjxt = almInfo.values.sjxt ? almInfo.values.sjxt.length : 0
        this.numSjxt2 = almInfo.values.sjxt2 ? almInfo.values.sjxt2.length : 0
        this.numBgxt = almInfo.values.bgxtqk ? almInfo.values.bgxtqk.length : 0
        this.singleSystem = (this.numSjxt === 1) || (this.numBgxt === 1)
        this.xfrq = this.toDate(almInfo.values['xfrq']) // 下发日期
        this.jhbgrq = this.toDate(almInfo.values['jhbgrq']) // 计划变更日期
        this.sjsxsj = this.toDate(almInfo.values['sjsxsj']) // 实际上线日期
        this.xqjl = almInfo.values['xqjl'] ? almInfo.values['xqjl'].label : '' // 需求经理
        this.fpr = almInfo.values['fpr'] ? almInfo.values['fpr'].label : "" // 分派给
        this.User_dr = almInfo.values['User_dr'] ? almInfo.values['User_dr'].label : "" // 测试经理
        this.cszxr = almInfo.values['cszxr'] ? almInfo.values['cszxr'].label : '' // 测试执行人
        this.ywjl = almInfo.values['ywjl'] ? almInfo.values['ywjl'].label : "" // 运维经理
        this.ces = this.toDate(almInfo.values['ces'])	//测试实际开始时间
        // this.Date_dr = new Date(almInfo.values['Date_dr']).toLocaleDateString()	//测试实际结束时间
        this.Date_dr = this.toDate(almInfo.values['Date_dr']) //测试实际结束时间
        // this.sjxjzsxx = almInfo.values['sjxjzsxx']	//时间线及注释信息
        this.kfzgzl = almInfo.values['kfzgzl']// 开发总工作量
        this.oaqbh = almInfo.values['oaqbh']// OA签报号
        this.bbh = almInfo.values['bbh']//版本号
        // this.RQ_VC_CHECKIN_DATE = almInfo.values['RQ_VC_CHECKIN_DATE']	//版本签入日期
    }

    StatusObject(sysInfo) {
        this.id = sysInfo['id']
        this.key = sysInfo['key']
        this.name = sysInfo['name']
        this.status = sysInfo['status']['name']
        this.workspace = sysInfo['workspace']['name']
    };


    SysObject(sysInfo) {
        this.id = sysInfo['id']
        this.key = sysInfo['key']
        this.name = sysInfo['name']
        this.status = sysInfo['status']['name']
        this.workspace = sysInfo['workspace']['name']
    };


    toDate(timestamp: string) {
        if (timestamp) {
            return new Date(timestamp).toLocaleDateString()
        } else {
            undefined
        }
    }

    toString(dlm: string = ' ') {
        return [this.key, this.type, this.name, this.fzr.join(','), this.section, this.status,
            this.xfrq, this.jhbgrq, this.sjsxsj,
            ':::', this.sjxt.join(','), '***', this.bgxt.join(',')].join(dlm)
    }

    toFeishu(): Feishu {
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
            "签报号-TechOne": this.oaqbh,
            "备注": ""
        }
    }
}


function test2() {
    const content = JSON.parse(fs.readFileSync('../../conf/almList_full.json', 'utf8'))
    const sys = JSON.parse(fs.readFileSync('../../conf/jgbs.json', 'utf8'))
    content.payload.items.forEach(i => {
        // const a = new AlmObject()
        const a = AlmObject.setValueFromAlm(i, sys)
        // console.log(JSON.stringify(a.toFeishu()))
        // const x = a.toFeishu()
        console.log(a.name)
        // console.log(a.toFeishu())
    })
}

// test2()
// module.exports = {AlmObject};

