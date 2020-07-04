const newLocal = wx.getStorageInfoSync;

var app = getApp();
// pages/mine/mine.js
Page({
  data: {
    userinfo:{},
    currentTab: 1,
    naviBean : 0,//to distinguish the jump from order page
  },
  onLoad : function(options){

    var that = this;
    if(options.orderBean != null){
      var navibean = JSON.parse(options.naviBean);
        console.log('navibean');
        console.log(navibean);
        that.setData({
          naviBean : navibean,
        })
    }

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
    //login to the HotSpot system
    console.log('userinfo');
    console.log(userInfo);
    this.userLogin();
  },

  userLogin : function(e){
    //check whether the user has already registered
    var userId = 0; //not a valid userId
    var that = this;
    const userinfo = wx.getStorageSync("userinfo");
    var re=/[^\u4e00-\u9fa5a-zA-Z0-9]/g;
    var nickName = userinfo.nickName.replace(re, "");
    console.log("nickName");
    console.log(nickName);

    wx.request({
      url: app.globalData.url + "/user/findUserByName?userName="+ nickName,//to be modified
      method: 'GET',
      success: (res) =>{
          if(res.data.length == 0){
            console.log("to register it");
            //this user has not registered, so register it
            wx.request({
              url: app.globalData.url + "/user/signup",
              method: 'POST',
              data: {
                "userName": nickName,
              },
              //get userId 
              success: (res) => {
                if(res.data.sucess == false){
                   //fail to register
                   var toastText = "注册失败:(";
                   Toast.fail(toastText);
                }else{
                   userId = res.data.userId;
                   console.log("registerd it, userId");
                   console.log(userId);
                }
              }
            })
          } else {
              console.log("has already registered, get userId");
              console.log("res.data");
              console.log(res.data);
              userId = res.data.userId;
          }
 
          //this user has aleady registered, login
          wx.request({
            url: app.globalData.url + "/user/signin?userId=" + userId,
            method: 'GET',

            success: (res) => {
              if(res.data.success == false){
                 //this user has not been registered, exception
                 var toastText = "登录失败:(";
                 Toast.fail(toastText);
              }else {
                //if this page is jumped from order page, jump back
                console.log("login successfully");

                //set userId
                that.getUserIdByName();

                if(app.globalData.naviBean != 0){
                  // wx.navigateBack({
                  //   delta:1
                  // })
                  setTimeout(function(){
                    wx.navigateTo({
                      url: '/pages/order/order',
                    })
                  },500);
                  app.globalData.naviBean = 1;
                }
              }
            } 
          });
      }
    });
 },

 getUserIdByName : function(e){
  //get user id
  var that = this;
  if(app.globalData.userId == '0'){
    var userinfo = wx.getStorageSync("userinfo");
    if(userinfo.length == 0) {
      Toast.fail("获取用户信息失败！");
    }else{
        let re=/[^\u4e00-\u9fa5a-zA-Z0-9]/g;
        let nickName = userinfo.nickName.replace(re, "");
        wx.request({
          url: app.globalData.url + "/user/findUserByName?userName="+ nickName,//to be modified
          method: 'GET',
          success: (res) =>{
              if(res.data.length == 0){
                Toast.fail("获取用户信息失败！");
              }else {
                console.log("getUserIdByName res.data");
                console.log(res.data);
                app.globalData.userId = res.data.userId;

                console.log("mine userId");
                console.log(app.globalData.userId);
              }
          }
      });
    }
  }else {//user id has already been set
    console.log("userId");
    console.log(app.globalData.userId);

  }
},

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
