import Bmob from '../lib/bmob'
import { http } from '../lib/http'

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
          user.login().then((res) => {
            console.log(res)
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

  /**
   * 用户发起登录
   * @return 3rd_sessionId 请保存到 cookie 中
   */
  login () {
    return new Promise((success, fail) => {
      wx.login({ 
        success: ({ code }) => {
          console.log(code)
          http({
            url: 'http://weapp.me/weapp/session',
            data: { code }
          }).then(success, fail)
        },
        fail 
      })
    })
  }

}