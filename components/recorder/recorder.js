const recorderManager = wx.getRecorderManager()

Component({
  data: {
    recordStatus: false,
    audio: null
  },
  properties: {

  },
  methods: {
    recordStart () {
      console.log('start')
      recorderManager.start({
        format: 'mp3'
      })
    },
    recordEnd () {
      console.log('end')
      recorderManager.stop()
    }
  },
  ready () {
    recorderManager.onStart(() => {
      console.log(this)
      this.setData({
        recordStatus: true
      })
    })
    recorderManager.onStop(({ tempFilePath }) => {
      this.setData({
        recordStatus: false,
        audio: tempFilePath
      })
      wx.saveFile({ 
        tempFilePath: tempFilePath, 
        success: ({ savedFilePath }) => { 
          //持久路径 
          console.log("savedFilePath: " + savedFilePath) 
          this.triggerEvent('stop', savedFilePath)
        } 
      }) 
    })
  }
})