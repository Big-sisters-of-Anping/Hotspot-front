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
    userId:1,
    tabs:[
      {
        id:0,
        value:"我的预约",
        isActive:true
      },
      {
        id:0,
        value:"我的想去",
        isActive:false
      },
    ],
    ordersList:[]
  },
  //接口要的参数
  QueryParams:{
    userid:0,  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:options.userName
    })
    this.getOrdersList();

  },

  getOrdersList(){
    const res = wx.request({
      url: app.globalData.url + "/order/listUserOrders?userId="+this.data.userId,
      method: 'GET',
      success: (res) =>{}
    }) 
    console.log(res);
    this.setData({
      ordersList:res.data
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