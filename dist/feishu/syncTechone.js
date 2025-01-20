"use strict";
// node-sdk使用说明：https://github.com/larksuite/node-sdk/blob/main/README.zh.md
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const fs_1 = __importDefault(require("fs"));
const hook_1 = require("./hook");
require("dotenv/config");
// 多维表格ID
const appToken = (_a = process.env.APPTOKEN_TW47) !== null && _a !== void 0 ? _a : '';
// console.log(appToken)
const almJson = JSON.parse(fs_1.default.readFileSync('../../conf/statALM.json', { encoding: 'utf8' }));
const almList = almJson.payload.items.filter(i => i['系统'] === '智慧监管平台'); // almList = almList.filter(i => i['系统'] === '智慧监管平台' && i['阶段'] !== '6.关闭');
const data_date = new Date(almJson.updateDateTime);
const msg = {
    "text": "已更新",
    "dataDateTime": data_date.toLocaleDateString() + ' ' + data_date.toLocaleTimeString(),
    "updatedDateTime": new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
};
// console.log(almList.length);
/*
function getYearWeek(date: Date) {
    const firstDay = new Date(date.getFullYear(), 0, 1)
    const dif = Math.round((date.valueOf() - firstDay.valueOf()) / 86400000);
    return Math.ceil(
        (dif + ((firstDay.getDay() + 1) - 1)) / 7
    );
}
*/
// console.log( getYearWeek(new Date()) )
function updateTableName(page_token, table_id, data_date) {
    // const weekNo = getYearWeek(new Date())
    const updateDateTime = new Date(data_date);
    const dtStr = [updateDateTime.toLocaleDateString().replace(/\//g, '-').substring(5, 10),
        updateDateTime.toLocaleTimeString().replace(/:/g, '').substring(0, 4)].join(' ');
    client_1.client.bitable.appTable.patch({
        path: { app_token: page_token, table_id: table_id, },
        data: { name: 'TECHONE (' + dtStr + ')' },
    })
        .then(res => console.log(res))
        .catch(e => console.error(JSON.stringify(e.response.data, null, 4)));
}
const getTableList = (app_token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.client.bitable.appTable.list({
        path: { app_token: app_token }
    }).then(r => {
        return r;
    }).catch(e => {
        console.error(JSON.stringify(e.response.data, null, 4));
    });
});
const getTableDetails = (page_token, table_id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client_1.client.bitable.appTableRecord.list({
        params: { page_size: 500, },
        path: { app_token: page_token, table_id: table_id },
    }).then(r => {
        return r;
    }).catch(e => {
        console.error(JSON.stringify(e.response.data, null, 4));
    });
    if (res && res.code === 0)
        return res;
    else
        return null;
});
const batchCreate = (page_token, table_id, dataJSON) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(dataJSON)
    client_1.client.bitable.appTableRecord.batchCreate({
        path: { app_token: page_token, table_id: table_id, },
        data: { records: dataJSON, },
    })
        .then(res => console.log('添加成功，', res))
        .catch(e => console.error('添加失败，', JSON.stringify(e.response.data, null, 4)));
});
const batchDelete = (page_token, table_id, data2del) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(data2del)
    let total;
    const res = client_1.client.bitable.appTableRecord.batchDelete({
        path: { app_token: page_token, table_id: table_id },
        data: { records: data2del, },
    })
        .then(res => total = res.data.count)
        .catch(e => console.error('删除失败，', JSON.stringify(e, null, 4)));
    if (res.code === 0)
        return total;
    else
        return 0;
});
const pagination = (page, number, Json_data) => {
    const counts = Json_data.length;
    const start = (page - 1) * number;
    let end = page * number;
    let data = [];
    if (start > counts)
        return false;
    if (end > counts)
        end = counts;
    for (let i = start; i < end; i++)
        data.push(Json_data[i]);
    return data;
};
function deleteAll(page_token, table_id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        let records;
        try {
            for (var _d = true, _e = __asyncValues(yield client_1.client.bitable.appTableRecord.searchWithIterator({
                path: { app_token: page_token, table_id: table_id, },
            })), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const item = _c;
                if (item.total > 0) {
                    records = item.items.map(i => {
                        return i.record_id;
                    });
                    yield batchDelete(page_token, table_id, records);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function deleteAll2(page_token, table_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // const res = await getTableDetails(page_token, table_id)
        let total;
        getTableDetails(page_token, table_id)
            .then(res => {
            total = res.data.total;
            if (total > 0) {
                const records = res.data.items.map(i => {
                    return i.record_id;
                });
                batchDelete(page_token, table_id, records);
            }
            if (total > 0)
                deleteAll2(page_token, table_id);
            return 0;
        })
            .catch(e => {
            deleteAll2(page_token, table_id);
        });
        return total;
    });
}
function insertAll(page_token, table_id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const num_per_page = 1000;
        let p = Math.ceil(data.length / num_per_page);
        for (let i = 1; i <= p; i++) {
            let d = pagination(i, num_per_page, data);
            result = d.map(i => {
                return { fields: i };
            });
            yield batchCreate(page_token, table_id, result);
            // 发送飞书信息
            yield (0, hook_1.sendMsgToFeishu)(msg);
            // 改名 增加更新日期时间
            yield updateTableName(page_token, table_id, almJson.updateDateTime);
        }
    });
}
let result;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const tableList = yield getTableList(appToken);
    tableList.data.items.forEach(tableInfo => {
        if (tableInfo.name.includes('TECHONE')) {
            console.log(tableInfo);
            getTableDetails(appToken, tableInfo.table_id)
                .then(res => {
                // deleteAll2(appToken, tableInfo.table_id)
                // return 0
                let total = res.data.total;
                if (total > 500) {
                    console.log(total);
                    return deleteAll2(appToken, tableInfo.table_id);
                    // batchDelete(appToken, tableInfo.table_id)
                }
                else if (total > 0) {
                    console.log(total);
                    console.log('大于0');
                    return deleteAll2(appToken, tableInfo.table_id);
                }
                else {
                    console.log(total);
                    console.log('等于0');
                    return 0;
                }
            })
                .then(data => {
                if (data === 0) {
                    console.log('添加开始', data);
                    insertAll(appToken, tableInfo.table_id, almList).then();
                }
            });
        }
    });
}))();
