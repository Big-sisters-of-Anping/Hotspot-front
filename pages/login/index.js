// pages/login/index.js

import Toast from '@vant/weapp/toast/toast';
Page({
  handleGetUserInfo(e){
    // console.log(e); 
    const {userInfo}=e.detail;
    wx.setStorageSync('userinfo', userInfo);

    //check whether the user has already registered
    var userId = 0; //not a valid userId
    wx.request({
      url: app.globalData.url + "/user/findUserByName?userName="+userInfo.nickName,//to be modified
      method: 'GET',
      success: (res) =>{
          if(res.data.length == 0){
            //this user has not registed, so register
            wx.request({
              url: app.globalData.url + "/user/signup",
              method: 'POST',
              data: {
                "userName": userInfo.nickName,
              },
              //get userId 
              success: (res) => {
                if(res.data.sucess == false){
                   //fail to register
                   var toastText = "注册失败:(";
                   Toast.fail(toastText);
                }else{
                   userId = res.data.userId;
                }
              }
            })
          } else {
              console.log("res.data");
              console.log(res.data);
              userId = res.data.userId;
          }

          //this user has aleady registered, login
          wx.request({
            url: app.globalData.url + "/user/signin?userId=" + userId,
          });
          success: (res) => {
            if(res.data.success == false){
               //this user has not been registered, exception
               var toastText = "登录失败:(";
               Toast.fail(toastText);
            }
          } 
      }
    });

    //naviagate back
    wx.navigateBack({
      delta:1
    });
  }
})