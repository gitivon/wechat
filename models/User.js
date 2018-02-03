import Bmob from '../lib/bmob'
import Server from '../models/Server'

export default class User extends Bmob {

  static GENDER = {
    MALE: 1,  // 男性
    FEMALE: 2 // 女性
  }

  nickName  // 昵称
  province  // 城市
  open_id
  avatarUrl  // 头像
  gender   // 性别
  // objectId = open_id

  // 获取授权
  static authroize (scope = 'scope.userInfo', withCredentials = false) {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.userInfo',
        withCredentials,
        lang: 'zh_CN',
        success: resolve,
        fail: reject
      })
    })
  }

  static get () {
    return this.authroize().then(() => new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          console.log(res)
          const user = new this(res.userInfo)
          user.login().then(({ sessionKey, openId }) => {
            console.log(sessionKey, openId)
            resolve(user)
          })
        },
        fail: reject,
        complete () {
          // complete
        }
      })
    }))
  }

  login () {
    return new Promise((success, fail) => {
      wx.login({ 
        success: ({ code }) => {
          Server.getSession(code).then(success, fail)
        },
        fail 
      })
    })
  }

}