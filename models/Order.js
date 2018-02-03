import Bmob from '../lib/bmob'

export default class Order extends Bmob {

  order_id
  user_id
  status
  price
  comment
  products

  static list (start, count) {
    
  }

}