import { http } from './http.js'
import { appId, apiKey } from '../config/bmob'

class Bmob {

  static _name
  static _safeKey = [
    'objectId',
    'createdAt',
    'updatedAt'
  ]

  /* bmob 默认自带的三个属性 */
  objectId
  createdAt
  updatedAt

  constructor (data) {
    for(let i in data) {
      this[i] = data[i]
    }
  }

  static send (setting = {}) {
    setting = Object.assign({
      method: 'get',
      url: 'https://api.bmob.cn/1/classes/' + this._name + ( setting.path || '' ),
      header: {
        'X-Bmob-Application-Id': appId,
        'X-Bmob-REST-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }, setting)
    return http(setting)
      .then(({ data }) => {
        console.info(data)
        if(data.error) {
          return Promise.reject(data.error)
        } else {
          return data
        }
      })
      .catch((err) => {
        console.log(setting, err)
        wx.showModal({
          content: err,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      })
  }

  static get (objectId) {
    return objectId ? this.send({
      path: '/' + objectId
    }).then(data => new this(data)) : Promise.resolve(new this)
  }

  static all () {
    return this.send().then(({ results }) => results.map(data => new this(data)))
  }

  static getBy (condition = {}) {
    return this.send({
      path: '?where=' + encodeURI(JSON.stringify(condition))
    }).then(({ results }) => results.map(data => new this(data)))
  }

  save () {
    let data = {}
    for(let i in this) {
      if(this.constructor._safeKey.indexOf(i) < 0) {
        data[i] = this[i]
      }
    }
    return this.constructor.send({
      method: this.objectId ? 'PUT' : 'POST',
      data,
      path: this.objectId ? `/${this.objectId}` : null
    }).then(data => {
      for(let i in data) {
        this[i] = data[i]
      }
      return data
    })
  }

  remove () {
    
  }

}

export default Bmob