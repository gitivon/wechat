import Qiniu from '../../lib/qiniu'

Component({
  properties: {
    auto: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  created () {
  },
  methods: {
    chooseImage () {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: ({ tempFilePaths }) => {
          // 上传
          Promise.all(tempFilePaths.map(path => {
            return Qiniu.upload('weapp', path)
          })).then(paths => {
            this.triggerEvent('success', paths)
          })
        }
      })
    }
  }
})