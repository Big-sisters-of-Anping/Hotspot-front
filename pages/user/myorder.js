// pages/user/myorder.js
import Toast from '@vant/weapp/toast/toast';
// import Notify from '@vant/weapp/dist/notify/notify';
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    userName: '',
    dialogShow: false,
    userId: 0,
    currId: 0,  //前台循环到的order(wish) index, 用于删改
    tabNum: 0,
    active: "order",  
    activeKey: 0,
    ordersList:[],
    wishesList:[],
    selected_spot_id: 0
  },
  //切换tab
  onChange(event) {
    var that = this;
    that.data.active = event.detail.index;
    console.log(that.data.active)
  },

  //切换side_tab
  onSideBarChange(event){
    var that = this;
    let curActiveKey = event.detail;
    that.data.activeKey = curActiveKey;
    console.log(curActiveKey)
    // 更新右侧的预约内容页
    that.getOrders(curActiveKey);
    console.log(that.data.orderList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userId:options.userId,
      active:options.tabNum
    })
    if(that.data.active==0){
      that.setData({activeKey:options.sideTabNum})
    }
    that.getOrders(that.data.activeKey);
    console.log(that.data.active)
      wx.request({
        url: app.globalData.url + "/wish/listUserWishes?userId=" + that.data.userId,
        method: 'GET',
        success: (res) =>{
            // console.log(res.data);
            var wishesList = res.data;
            var currWishes = [];
            wishesList.forEach(wish => {
              var currWish = {
                "endTime": wish.wishTime.endTime,
                "startTime": wish.wishTime.startTime,
                "wishDate": wish.wishDate,
                "wishId": wish.wishId,
                "spotId": wish.wishTime.sspotId,
                "spotName":wish.wishTime.spotName,
                "userId": wish.userId
              };
              currWishes.push(currWish);
            });
            that.setData({
              wishesList : currWishes,
            })
        }
    })
  },
  getOrders(curStatus){
    var that = this;
    wx.request({
        url: app.globalData.url + "/order/listUserOrders?userId=" + that.data.userId,
        method: 'GET',
        success: (res) =>{
            console.log(res.data);
            var orderList = res.data;
            var currOrders = [];
            orderList.forEach(order => {

              if (order.orderStatus==curStatus){
                var currOrder = {
                  "endTime": order.orderTime.endTime,
                  "startTime": order.orderTime.startTime,
                  "note": order.note,
                  "orderDate": order.orderDate,
                  "orderId": order.orderId,
                  "orderStatus": order.orderStatus,
                  "spotId": order.orderTime.spotId,
                  "spotName":order.orderTime.spotName,
                  "suggestedPeople":order.orderTime.suggestedPeople,
                  "orderedPeople":order.orderTime.orderedPeople,
                  "userId": order.userId
                };
               currOrders.push(currOrder);
              }
            });
            that.setData({
              ordersList: currOrders
            })
            console.log(that.data.ordersList)
        }
    })
  },

  handleDeleteOrder(){
    var that = this;
    let orderId = that.data.currId;
    console.log("orderId "+ orderId);
    wx.request({
      url: app.globalData.url + "/order/cancelOrder?orderId="+orderId,
      method: 'GET',
      headers:{
        'content-type': 'application/json' // 默认值 
      },
      success(res){
        console.log("res.data");
        console.log(res.data);
        console.log(res.data.errMsg)
        if(res.data.success == false){
          var toastText = "取消失败:(";
          Toast.fail(toastText);
        } else {
          var toastText = "取消成功:)";
          Toast.success(toastText);
          setTimeout(function(){
            // wx.navigateBack({
            //   complete: (res) => {},
            // })
             wx.navigateTo({
              //note that absolute path should be used to avoid ERROR
              url: "/pages/user/myorder?userId="+that.data.userId+"&tabNum=order&sideTabNum="+that.data.activeKey,
              events:{
                //to be done, get info from pages/order
              }
            })
          },1000);
        }
       }
    })
   
  },

  handleDeleteWish(){ 
    var that = this;
    let wishId = that.data.currId;
    console.log("wishid "+ wishId);
    wx.request({
      url: app.globalData.url + "/wish/cancelWish?wishId="+wishId,
      method: 'POST',
      headers:{
        'content-type': 'application/json' // 默认值 
      },
      success(res){
        console.log(res);
        console.log(res.data);
        // console.log(res.data.errMsg)
        if(res.data == false){
          var toastText = "取消失败:(";
          Toast.fail(toastText);
        } else {
          console.log("suceedddddd!!!!!")
          var toastText = "取消成功:)";
          Toast.success(toastText);
          setTimeout(function(){
            // wx.navigateBack({
            //   complete: (res) => {},
            // })
             wx.navigateTo({
              //note that absolute path should be used to avoid ERROR
              url: "/pages/user/myorder?userId="+that.data.userId+"&tabNum=wish",
              events:{
                //to be done, get info from pages/order
              }
            })
          },1000);
        }
       }
    })
  },
  handleCancel(event){
    if (this.data.active==0)this.handleDeleteOrder();
    else this.handleDeleteWish();
  },
  onDialogShow(event) {
    console.log(event);
    this.setData({
      dialogShow: true,
      currId: event.currentTarget.dataset.currid
    })
  },

  onClose() {
    this.setData({
      dialogShow: false
    })
  },
  handleEdit: function(e){
    console.log(e);
    let spotId = Number(e.currentTarget.dataset.spotid) - 1;
    let orderitem = e.currentTarget.dataset.orderitem;
    let orderBean = JSON.stringify(spotId);
    wx.navigateTo({
      url: "/pages/order/change?orderBean=" + orderBean + "&orderitem=" + orderitem
    })
  },
})