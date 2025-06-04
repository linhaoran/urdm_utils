// node-sdk使用说明：https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/server-side-sdk/nodejs-sdk/preparation-before-development
import {client} from "../feishu/client";
import "dotenv/config"
import * as fs from "fs";

const appToken = process.env.APPTOKEN_TW47 ?? '';
const table_id1 = 'tblQVPdNxe0HqyJE'; //需求调研-表级
const table_id2 = 'tblGIrcaVpqdkD0q'; //需求调研-字段级

console.log('appToken', appToken);

// 还可以使用迭代器的方式便捷的获取数据，无需手动维护page_token
fs.writeFileSync('aaa.json', '', 'utf8');

let p = 1;
let start;
let end = 0;
let result = new Map();

(async () => {
    for await (const item of await client.bitable.v1.appTableRecord.searchWithIterator({
        path: {app_token: appToken, table_id: table_id2,},
        params: {page_size: 500,},
        data: {
            // field_names: ['YBT表名', 'YBT数据项名称'],
            filter: {
                conjunction: 'or',
                conditions: [{
                    field_name: 'YBT表名',
                    operator: 'is',
                    value: ['员工'],
                }, {
                    field_name: '父记录',
                    operator: 'is',
                    value: ['recuJmd5nnB2QW']
                }]
            }
        }
    })) {
        if (p === 1) {
            console.log(item!.items);
            // result = item;
            item?.items?.forEach((i) => {
                // @ts-ignore
                result.set(i.record_id, {
                    id: i.record_id,
                    nameE: i.fields.NameE ? i.fields!.NameE[0].text : '',
                    // namel: i.fields.NameE,
                    // SourceID: i.fields.SourceID[0].text,
                    parent: i.fields.父记录
                });
                console.log(result.get(i.record_id));
            })
        } else {
            // result!.items!.push(item.items);
        }

        start = item!.items!.length > 0 ? end + 1 : 0;
        end = item!.items!.length > 0 ? end + item!.items!.length : 0;
        console.log('p =', p++, 'start =', start, 'end =', end, '/', item!.total)

        // fs.appendFileSync('aaa.json', JSON.stringify(item, null, 2), 'utf8');
    }
    fs.appendFileSync('aaa.json', JSON.stringify(result, null, 2), 'utf8');
    console.log(result.size);

})();

/*
const getParent = async () => {
    for await (const item of await client.bitable.v1.appTableRecord.searchWithIterator({
        path: {app_token: appToken, table_id: table_id2,},
        params: {page_size: 500,},
        data: {
            // field_names: ['YBT表名', 'YBT数据项名称'],
            filter: {
                conjunction: 'or',
                conditions: [{
                    field_name: 'YBT表名',
                    operator: 'is',
                    value: ['员工'],
                }]
            }
        }
    })) {
        if (p === 1) {
            // console.log(item!.items);
            result = item;
        } else {
            result!.items!.push(item.items);
        }

        start = item!.items!.length > 0 ? end + 1 : 0;
        end = item!.items!.length > 0 ? end + item!.items!.length : 0;
        console.log('p =', p++, 'start =', start, 'end =', end, '/', item!.total)

        // fs.appendFileSync('aaa.json', JSON.stringify(item, null, 2), 'utf8');
    }
    // fs.appendFileSync('aaa.json', JSON.stringify(result, null, 2), 'utf8');
    console.log(result!.items!.length);
    return result;

}*/
