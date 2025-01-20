// todo： 修改为直读almList_full.json，需调整sysList为单层object。

import fs from "fs";
import {AlmObject} from "./AlmObject";

const jgSys = JSON.parse(fs.readFileSync('../../conf/jgbs.json', 'utf8'));

// let almList = JSON.parse(fs.readFileSync('../json/almList_full.json'))
const almList = JSON.parse(fs.readFileSync('../../conf/almList.json', 'utf8'));

console.log(almList.length)

const result = JSON.parse(JSON.stringify(almList))
result.payload.items = []

jgSys.forEach(s  => {
    let t = 1

    almList.payload.items.forEach(i => {
        const a = new AlmObject(i)
        if (a.sjxt.includes(s.sys)) {
            // console.log(a.xfrq)
            // 如果，sj系统或bgxt未维护，则不明确；如果
            // console.log(a.bgxt && a.sjxt, a.bgxt, '', a.sjxt)
            console.log(a.name, a.status, a.section[0])

            const resp = (a.sjxt.length > 0 && a.bgxt.length > 0)
                ? (s.manager === a.fzr[0].replace(/\(.*\)/, '')) ? '主责' : (a.bgxt.includes(s.sys) ? '配合改造' : '配合测试')
                : (a.section[0] === '1') ? '信息待补充' : '信息有缺失'

            result.payload.items.push(Object.assign({"系统": s.sys, "id": t, "主责": resp}, a.toFeishu()))
            t++;
        }
    });
})
fs.writeFileSync('../../conf/statALM.json', JSON.stringify(result, null, 2))

