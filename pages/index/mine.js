const newLocal = wx.getStorageInfoSync;
// pages/mine/mine.js
Page({
  data: {
    userinfo:{}
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({userinfo})
  } 
})

// Component({
//   pageLifetimes: {
//     show() {
//       if (typeof this.getTabBar === 'function' &&
//         this.getTabBar()) {
//         this.getTabBar().setData({
//           selected: 3
//         })
//       }
//     }
//   }
// })
