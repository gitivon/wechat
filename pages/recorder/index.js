Page({
  data: {
    src: null
  },
  getRecorder (e) {
    this.setData({
      src: e.detail
    })
  },
  play () {
    let self = this
    wx.playVoice({
      filePath: this.data.src,
      success () {
        wx.showToast({
          title: '播放结束' + self.data.src,
          icon: 'success',
          duration: 1000
        })
      },
      fail () {
        wx.showToast({
          title: '播放错误',
          icon: 'fail',
          duration: 1000
        })
      }
    })
  }
})