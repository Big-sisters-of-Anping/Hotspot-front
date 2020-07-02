const newLocal = wx.getStorageInfoSync;
// pages/mine/mine.js
Page({
  data: {
    userinfo:{},
    currentTab: 1
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({userinfo})
  },

  onclickMyOrder: function(e){
    console.log(e);
    wx.navigateTo({
      //note that absolute path should be used to avoid ERROR
      url: "/pages/user/myorder?uid={{user_id}}",
      events:{
        //to be done, get info from pages/order
      }
    })
  },
  onclickMyWish: function(e){
    console.log(e);
    wx.navigateTo({
      //note that absolute path should be used to avoid ERROR
      url: "/pages/user/mywish",
      events:{
        //to be done, get info from pages/order
      }
    })
  },
  handleGetUserInfo(e){
    // console.log(e); 
    const {userInfo}=e.detail;
    wx.setStorageSync('userinfo', userInfo);
    this.onShow()
  }
})

//when Myorder button is clicked


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
