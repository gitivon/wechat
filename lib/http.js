import { set } from './cache'

export const http = ({url, data = {}, method = 'get', header = {}}) => new Promise((resolve, reject) => {
  wx.request({
    url, method, data, header,
    success: (res) => {
      // 写 cookie
      if(res.header['Set-Cookie']) {
        const params = {}
        const ck = res.header['Set-Cookie'].split('httponly')[0]
        for(let field of ck.split(';')) {
          let [ key, val ] = field.split('=')
          if(key) {
            params[key.trim()] = val
          }
        }
        params.sessionId && set('sessionId', params.sessionId, {
          expire: params.expires
        })
      }
      resolve(res) 
    },
    fail: reject
  })
})