import Product from '../../models/Product';

Page({
  data: {
    lists: [],
    editable: true
  },
  getLists () {
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