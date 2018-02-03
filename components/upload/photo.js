import Qiniu from '../../lib/qiniu'

const computeProgress = all => {
  let length = all.length
  let s = { 
    progress: 0, 
    totalBytesSent: 0, 
    totalBytesExpectedToSend: 0
  }
  all.reduce((p, v, i, a) => {
    s.progress += v.progress
    s.totalBytesSent += v.totalBytesSent
    s.totalBytesExpectedToSend += v.totalBytesExpectedToSend
  }, s)
  s.progress = parseInt(s.totalBytesSent * 100 / s.totalBytesExpectedToSend)
  return s
}

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
          const qiniu = Qiniu.init('weapp')
          const all = [], self = this
          const t = setInterval(() => {
            let progress = computeProgress(all)
            this.triggerEvent('progress', progress)
            if(progress.progress >= 100) {
              clearInterval(t)
            }
          }, 50)
          Promise.all(tempFilePaths.map(path => {
            const res = {
              progress: 0,
              totalBytesSent: 0,
              totalBytesExpectedToSend: 0
            }
            all.push(res)
            return qiniu.upload(path, (progress) => {
              res.progress = progress.progress
              res.totalBytesSent = progress.totalBytesSent
              res.totalBytesExpectedToSend = progress.totalBytesExpectedToSend
            })
          }))
            .then(paths => {
              this.triggerEvent('success', paths)
            })
        }
      })
    }
  }
})