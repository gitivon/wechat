import base64 from './base64'
import CryptoJS from './crypto'
import { accessKey, secretKey } from '../config/qiniu/key'
import * as policy from '../config/qiniu/policy/index'
import WxUpload from './wxUpload'

const safe64 = base64 => {
  base64 = base64.replace(/\+/g, "-");
  base64 = base64.replace(/\//g, "_");
  return base64;
}


export default class Qiniu {

  token
  file
  host
  progress = {
    progress: 0,
    totalBytesSent: 0,
    totalBytesExpectedToSend: 0
  }

  static getToken (policyName) {
    const putPolicy = policy[policyName]
    putPolicy.deadline += Date.now()
    //SETP 2
    var put_policy = JSON.stringify(putPolicy);
    //SETP 3
    var encoded = base64.encode(base64.utf16to8(put_policy));
    //SETP 4
    var hash = CryptoJS.HmacSHA1(encoded, secretKey);
    var encoded_signed = hash.toString(CryptoJS.enc.Base64);
    //SETP 5
    var upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
    return upload_token;
  }

  static init (bucketName) {
    return new this(bucketName)
  }

  constructor (bucketName) {
    this.token = this.constructor.getToken(bucketName)
    this.host = policy[bucketName].host
  }

  upload (file, onProgress) {
    const wxUpload = new WxUpload()
    return new Promise((resolve, reject) => {
      let handle = wxUpload.upload({
        url: 'https://up.qbox.me',
        filePath: file,
        name: 'file',
        formData: { token: this.token },
        success: ({ data }) => {
          const { hash, key } = JSON.parse(data)
          resolve(`http://${this.host}/${key}`)
        },
        progress: onProgress,
        fail: reject
      })
    })
  }

}