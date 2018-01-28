//index.js
//获取应用实例
import Test from '../../models/test.js'
const app = getApp()
const id = 'vDYUrrrs'
Page({
  data: new Test(),
  onLoad() {
    Test.get(id).then(data => this.setData(data))
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setTitle (e) {
    this.setData({
      title: e.detail.value
    })
  }
})
