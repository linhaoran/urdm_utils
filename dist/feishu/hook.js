"use strict";
// https://scnbvf7ldg2u.feishu.cn/base/automation/webhook/event/KRSqavkdAwuQ9DhS2EwctQcOnec
// nQLGY5M0UNzZZt7bYed_nQmd
// 自动化流程名称：TechOne列表更新通知
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMsgToFeishu = sendMsgToFeishu;
const https_1 = __importDefault(require("https"));
function sendMsgToFeishu(content) {
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
    const req = https_1.default.request(options, (res) => {
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });
    req.on('error', (err) => {
        console.log(err);
    });
    req.write(JSON.stringify({ content }));
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
