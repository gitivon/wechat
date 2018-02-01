import Bmob from '/../lib/bmob.js'

export default class Product extends Bmob {
  static _name = 'Product'
  sku
  title
  pic
  description
  objectId
  status
}