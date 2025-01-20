// https://scnbvf7ldg2u.feishu.cn/base/automation/webhook/event/KRSqavkdAwuQ9DhS2EwctQcOnec
// nQLGY5M0UNzZZt7bYed_nQmd
// 自动化流程名称：TechOne列表更新通知

import https from "https";

// 已写死 webhookId
// import dotenv from "dotenv/config";
// const webhookId = process.env.WEBHOOK_ID;

export interface Message {
    text: string;
    dataDateTime: string;
    updatedDateTime: string;
}

export function sendMsgToFeishu(content: Message) {
    const options = {
        hostname: 'scnbvf7ldg2u.feishu.cn',
        port: 443,
        path: '/base/automation/webhook/event/KRSqavkdAwuQ9DhS2EwctQcOnec',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + webhookId,
            Authorization: 'Bearer ' + 'nQLGY5M0UNzZZt7bYed_nQmd',
        }
    };

    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (err) => {
        console.log(err)
    });
    req.write(JSON.stringify({content}));
    req.end();
}

// test
/*
const msg: Message = {
    "text": "已更新",
    "dataDateTime": new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    "updatedDateTime": new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
}
sendMsgToFeishu(msg)
*/


