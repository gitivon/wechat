Component({
  data: {
    error: 'ok'
  },
  properties: {
    src: {
      type: String,
      value: null,
      observer (v) {
        
      }
    }
  },
  methods: {
    play () {
      this.audioCtx.play()
      wx.showToast({ 
        title: '开始播放', 
        icon: 'success', 
        duration: 1000 
      })
    },
    end (e) {
      wx.showToast({ 
        title: '播放完成', 
        icon: 'success', 
        duration: 1000 
      })
    },
    error (e) {
      this.setData({
        error: e.detail.errMsg
      })
      wx.showToast({
        title: '播放错误',
        icon: 'error',
        duration: 1000
      })
    }
  },
  ready () {
    this.audioCtx = wx.createAudioContext('myAudio')
  }
})