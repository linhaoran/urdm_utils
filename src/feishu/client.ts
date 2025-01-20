import * as lark from '@larksuiteoapi/node-sdk';
import 'dotenv/config'

// console.log(process.env.APPID);

export const client = new lark.Client({
    appId: process.env.APPID ?? '',
    appSecret: process.env.APPSECRET ?? '',
    appType: lark.AppType.SelfBuild,
    domain: lark.Domain.Feishu,
});

// module.exports = client;
