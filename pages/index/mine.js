const newLocal = wx.getStorageInfoSync;
var util = require('../../utils/util.js');
var app = getApp();
// pages/mine/mine.js
Page({
  data: {
    userinfo:{},
    currentTab: 1,
    userId: 0
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    var that = this;
    that.setData({userinfo: userinfo})

    console.log(userinfo.nickName);
    //check whether user is in database
    wx.request({
      url: app.globalData.url + "/user/findUserByName",
      method: 'GET',
      data: {
        "userName": userinfo.nickName
      },
      headers:{
        'content-type': 'application/json' // 默认值 
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          userId: res.data.userId
        })
        console.log(that.data.userId);
       }
    })

    console.log(that.data.userId);
      // signup 
      // 有“用户名不能为空！“的问题
    wx.request({
      url: app.globalData.url + "/user/signup",//addOrder to be done
      method: 'POST',
      data: {
          // "userName": "Marry"
          "userName": that.data.userinfo.nickName
       },
       headers:{
         'content-type': 'application/json' // 默认值 
       },
       success(res){
         console.log(res.data);
         if (res.data.success == true){
          that.setData({
            userId: res.data.userId
          })}
       }
      })
  },

  onclickMyOrder: function(e){
    let that=this
    console.log(e);
    console.log(that.data.userinfo);
    wx.navigateTo({
      //note that absolute path should be used to avoid ERROR
      url: "/pages/user/myorder?userName="+that.data.userinfo.nickName,
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
