import Product from '../../models/Product';

Page({
  data: new Product(),
  onLoad () {
    // 获取列表
    Product.all().then(lists => console.log(lists))
  }
})