// pages/user/myorder.js
import Toast from '@vant/weapp/toast/toast';

var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    userName: '',
    userId:117,
    tabNum:0,
    tabs:[
      {
        id:0,
        value:"我的预约",
        isActive:true
      },
      {
        id:1,
        value:"我的想去",
        isActive:false
      },
    ],
    ordersList:[],
    wishesList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:options.userName,
      tabNum:options.tabNum
    })
    if (this.data.tabNum == 0){
      this.setData({
        tabs:[
          {id:0,value:"我的预约",isActive: true},
          {id:1,value:"我的想去",isActive: false}
        ]
      })
    }
    else{
      this.setData({
        tabs:[
          {id:0,value:"我的预约",isActive: false},
          {id:1,value:"我的想去",isActive: true}
        ]
      })
    }
    var that = this;
      wx.request({
          url: app.globalData.url + "/order/listUserOrders?userId=" + that.data.userId,
          method: 'GET',
          success: (res) =>{
              console.log(res.data);
              var orderList = res.data;
              var currOrders = [];
              orderList.forEach(order => {
                var currOrder = {
                  "endTime": order.orderTime.endTime,
                  "startTime": order.orderTime.startTime,
                  "note": order.note,
                  "orderDate": order.orderDate,
                  "orderId": order.orderId,
                  "orderStatus": order.orderStatus,
                  "spotId": order.orderTime.sspotId,
                  "spotName":order.orderTime.spotName,
                  "suggestedPeople":order.orderTime.suggestedPeople,
                  "orderedPeople":order.orderTime.orderedPeople,
                  "userId": order.userId
                };
                currOrders.push(currOrder);
              });
              that.setData({
                ordersList : currOrders,
                // hasMarkers: true
              })
          }
      })

      wx.request({
        url: app.globalData.url + "/wish/listUserWishes?userId=" + that.data.userId,
        method: 'GET',
        success: (res) =>{
            console.log(res.data);
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
              // hasMarkers: true
            })
        }
    })

  },

  handleTabsItemChange(e){
    //获取被点击的标题索引
    const {index}=e.detail;
    //修改源数据
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //赋值
    this.setData({
      tabs
    })
  },
  handleDeleteOrder(e){
    console.log(e);

  }
})