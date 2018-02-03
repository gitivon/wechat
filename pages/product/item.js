import Product from '../../models/Product'

Page({
  data: {
    product: new Product(),
    progress: 0
  },
  onLoad (options) {
    Product.get(options.id).then(data => {
      this.data.product = data
      this.setData({
        product: data
      })
    })
  },
  setValue (e) {
    const { key } = e.currentTarget.dataset
    const value = e.detail.value
    this.data.product[key] = typeof value === 'object' ? value.checked : value
  },
  previewImage: function(e){
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.product.pic // 需要预览的图片http链接列表
    })
  },
  choosePhoto ({ detail }) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    this.data.product.pic = this.data.product.pic ? this.data.product.pic.concat(detail) : detail
    this.setData({
      product: this.data.product
    })
  },
  progress ({ detail }) {
    this.setData({
      progress: detail.progress
    })
  },
  save () {
    this.data.product.save()
      .then(() => {
        this.setData({
          product: this.data.product
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
      })
  }
})