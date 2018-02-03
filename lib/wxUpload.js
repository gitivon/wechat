
export default class WxUpload {


  
  upload (setting) {
    const handle = wx.uploadFile(setting)
    handle.onProgressUpdate(res => {
      this.progress = res
      setting.progress && setting.progress(res)
    })
    return handle
  }
  

}