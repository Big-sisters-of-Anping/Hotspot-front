// pages/discover.js
import Toast from '@vant/weapp/toast/toast';

var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/IMG_1902.JPG',
      '../../images/IMG_tower.JPG',
      '../../images/IMG_CS1.JPG',
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0,
    // listSearch : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('发现')
    console.log(this.getTabBar());
    this.getTabBar();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //tabbar
  switchTab: function(e){
    this.setData({
      url: "/pages/index/discover",
    });
  },

  //when scroll to the top
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },

  //when scroll to the button
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },

    //使用本地 fake 数据实现刷新效果
    refresh: function(){
      var feed = util.getDiscovery();
      console.log("loaddata");
      var feed_data = feed.data;
      this.setData({
        feed:feed_data,
        feed_length: feed_data.length
      });
    },

    //网络请求数据, 实现刷新
    refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },

    //使用本地 fake 数据实现继续加载效果
    nextLoad: function(){
      var next = util.discoveryNext();
      console.log("continueload");
      var next_data = next.data;
      this.setData({
        feed: this.data.feed.concat(next_data),
        feed_length: this.data.feed_length + next_data.length
      });
  },

  //search
  goSearch : function(e){
    console.log(e.detail.value);
    let that = this;
    wx.request({
      //to be done, just for test currently
      url: app.globalData.url + "/search/searchSpotsByName?spotName="+e.detail.value,
      method: 'GET',
      // data: e.detail.value,
      headers:{
        'content-type': 'application/json' // 默认值 
      },
      success(res){
        if(res.data == null){
          console.log(res.data.errMsg);
          var toastText = "获取数据失败";
          // wx.showToast({
          //   title: toastText,
          //   icon: '',
          //   duration: 2000
          // });
          Toast.fail(toastText);
        } else {
          //navigate to search page
          console.log(res.data);
          var searchBean = JSON.stringify(res.data);
          wx.navigateTo({
            url: '/pages/search/search?searchBean=' + searchBean,
          })
        }
       }
    })
  }
})

// Component({
//   methods:{
//     onShow: function () {
//       console.log('个人中心')
//       this.getTabBar().init();
//     }
//   }
// })

// Component({
//   pageLifetimes: {
//     show() {
//       if (typeof this.getTabBar === 'function' &&
//         this.getTabBar()) {
//         this.getTabBar().setData({
//           selected: 1
//         })
//       }
//     }
//   }
// })

