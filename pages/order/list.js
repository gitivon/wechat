import User from '../../models/User'

Page({
  onLoad () {
    User.get().then(user => {
      console.log(user)
    })
  }
})