import { http } from './http.js'
import { appId, apiKey } from '../config/bmob'

class Bmob {

  constructor (data) {
    for(let i in data) {
      this[i] = data[i]
    }
  }

  static send (setting) {
    return http(Object.assign({
      method: 'get',
      url: 'https://api.bmob.cn/1/classes/' + this.name + ( setting.path || '' ),
      header: {
        'X-Bmob-Application-Id': appId,
        'X-Bmob-REST-API-Key': apiKey
      }
    }, setting)).then(({ data }) => data)
  }

  static get (objectId) {
    return this.send({
      path: '/' + objectId
    }).then(data => new this(data))
  }

  static all () {
    return this.send().then(({ results }) => results.map(data => new this(data)))
  }

}

export default Bmob