import { http } from '../lib/http'
import { appid, secret } from '../config/weapp'

export default class Server {

  static getSession (js_code, grant_type = 'authorization_code') {
    const url = 'https://api.weixin.qq.com/sns/jscode2session'
    return http({
      url,
      data: { appid, secret, js_code, grant_type }
    })
  }

}