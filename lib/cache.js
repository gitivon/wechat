
export const get = (key) => {

}

export const set = (key, val, opt) => {
  wx.setStorageSync(key, {
    "value": val,
    ...opt
  })
}