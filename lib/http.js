
export const http = ({url, data = {}, method = 'get', header = {}}) => new Promise((resolve, reject) => {
  wx.request({
    url, method, data, header,
    success: resolve,
    fail: reject
  })
})