import Bmob from '/../lib/bmob.js'

export default class Shop extends Bmob {
  static _name = 'Shop'
  
  shop_id     // 店铺 id    : number
  notice      // 公告       : string[]
  brand       // 店铺品牌   : string
  admin       // 管理员 id  : string

  static getById (id) {
    return this.getBy({
      shop_id: id
    }).then(shops => shops.length ? shops[0] : Promise.resolve(null))
  }

}