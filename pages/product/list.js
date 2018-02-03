import Product from '../../models/Product'
import Shop from '../../models/Shop'

Page({
  data: {
    shop: {},
    lists: [],
    editable: true
  },
  getLists () {
    // 获取商铺信息
    Shop.getById(1).then(shop => this.setData({ shop }))
    // 获取商品列表
    Product.all().then(lists => this.setData({ lists }))
  },
  onLoad () {
    // 获取列表
    this.getLists()
  },
  save (e) {
    const { index } = e.currentTarget.dataset
    this.data.lists[index].title = e.detail.value
    this.data.lists[index].save()
    this.setData({
      lists: this.data.lists
    })
  },
  onPullDownRefreash () {
    console.log('pullDown')
    this.getLists()
  }
})