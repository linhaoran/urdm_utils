// node-sdk使用说明：https://github.com/larksuite/node-sdk/blob/main/README.zh.md

import {client} from "./client";
import fs from "fs";
import {sendMsgToFeishu, Message} from "./hook";
import "dotenv/config"

// 多维表格ID
const appToken = process.env.APPTOKEN_TW47 ?? '';
// console.log(appToken)

const almJson = JSON.parse(fs.readFileSync('../../conf/statALM.json', {encoding: 'utf8'}));
const almList = almJson.payload.items.filter(i => i['系统'] === '智慧监管平台'); // almList = almList.filter(i => i['系统'] === '智慧监管平台' && i['阶段'] !== '6.关闭');
const data_date = new Date(almJson.updateDateTime);
const msg: Message = {
    "text": "已更新",
    "dataDateTime": data_date.toLocaleDateString() + ' ' + data_date.toLocaleTimeString(),
    "updatedDateTime": new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
}

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

function updateTableName(page_token: string, table_id: string, data_date: string) {
    // const weekNo = getYearWeek(new Date())
    const updateDateTime = new Date(data_date);
    const dtStr = [updateDateTime.toLocaleDateString().replace(/\//g, '-').substring(5, 10),
        updateDateTime.toLocaleTimeString().replace(/:/g, '').substring(0, 4)].join(' ')

    client.bitable.appTable.patch({
        path: {app_token: page_token, table_id: table_id,},
        data: {name: 'TECHONE (' + dtStr + ')'},
    })
        .then(res => console.log(res))
        .catch(e => console.error(JSON.stringify(e.response.data, null, 4)));
}

const getTableList = async (app_token: string) => {
    return await client.bitable.appTable.list({
            path: {app_token: app_token}
        }
    ).then(r => {
        return r;
    }).catch(e => {
        console.error(JSON.stringify(e.response.data, null, 4));
    });
};

const getTableDetails = async (page_token: string, table_id: string) => {
    const res = await client.bitable.appTableRecord.list({
            params: {page_size: 500,},
            path: {app_token: page_token, table_id: table_id},
        },
    ).then(r => {
        return r;
    }).catch(e => {
        console.error(JSON.stringify(e.response.data, null, 4));
    });

    if (res && res.code === 0) return res
    else return null;
}

const batchCreate = async (page_token: string, table_id: string, dataJSON) => {
    // console.log(dataJSON)
    client.bitable.appTableRecord.batchCreate({
        path: {app_token: page_token, table_id: table_id,},
        data: {records: dataJSON,},
    })
        .then(res => console.log('添加成功，', res))
        .catch(e => console.error('添加失败，', JSON.stringify(e.response.data, null, 4)));
}

const batchDelete = async (page_token: string, table_id: string, data2del) => {
    // console.log(data2del)
    let total;
    const res = client.bitable.appTableRecord.batchDelete({
        path: {app_token: page_token, table_id: table_id},
        data: {records: data2del,},
    })
        .then(res => total = res.data.count)
        .catch(e => console.error('删除失败，', JSON.stringify(e, null, 4)))

    if (res.code === 0) return total;
    else return 0;
}

const pagination = (page: number, number: number, Json_data) => {
    const counts = Json_data.length;
    const start = (page - 1) * number;
    let end = page * number;
    let data = []
    if (start > counts) return false;
    if (end > counts) end = counts;
    for (let i = start; i < end; i++) data.push(Json_data[i]);
    return data;
}

async function deleteAll(page_token: string, table_id: string) {
    let records;
    for await (const item of await client.bitable.appTableRecord.searchWithIterator({
        path: {app_token: page_token, table_id: table_id,},
    },)) {
        if (item.total > 0) {
            records = item.items.map(i => {
                return i.record_id
            })
            await batchDelete(page_token, table_id, records);
        }
    }
}

async function deleteAll2(page_token: string, table_id: string) {
    // const res = await getTableDetails(page_token, table_id)
    let total: number;
    getTableDetails(page_token, table_id)
        .then(res => {
            total = res.data.total;
            if (total > 0) {
                const records = res.data.items.map(i => {
                    return i.record_id
                })
                batchDelete(page_token, table_id, records)
            }
            if (total > 0) deleteAll2(page_token, table_id)
            return 0;
        })
        .catch(e => {
            deleteAll2(page_token, table_id)
        })
    return total;
}


async function insertAll(page_token: string, table_id: string, data) {
    const num_per_page = 1000
    let p = Math.ceil(data.length / num_per_page);

    for (let i = 1; i <= p; i++) {
        let d = pagination(i, num_per_page, data);

        result = d.map(i => {
            return {fields: i}
        })
        await batchCreate(page_token, table_id, result);

        // 发送飞书信息
        await sendMsgToFeishu(msg)
        // 改名 增加更新日期时间
        await updateTableName(page_token, table_id, almJson.updateDateTime)
    }
}


let result;
(async () => {
    const tableList = await getTableList(appToken);
    tableList.data.items.forEach(tableInfo => {
        if (tableInfo.name.includes('TECHONE')) {
            console.log(tableInfo);
            getTableDetails(appToken, tableInfo.table_id)
                .then(res => {
                    // deleteAll2(appToken, tableInfo.table_id)
                    // return 0

                    let total = res.data.total;
                    if (total > 500) {
                        console.log(total)
                        return deleteAll2(appToken, tableInfo.table_id)
                        // batchDelete(appToken, tableInfo.table_id)
                    } else if (total > 0) {
                        console.log(total)
                        console.log('大于0')
                        return deleteAll2(appToken, tableInfo.table_id)
                    } else {
                        console.log(total)
                        console.log('等于0')
                        return 0
                    }
                })
                .then(data => {
                    if (data === 0) {
                        console.log('添加开始', data)
                        insertAll(appToken, tableInfo.table_id, almList).then()
                    }
                });


        }
    })
})()



