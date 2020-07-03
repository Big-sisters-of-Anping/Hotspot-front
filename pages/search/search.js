// pages/search/search.js

var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    if(options.searchBean != null){
      var searchBean = JSON.parse(options.searchBean);
      console.log(searchBean);
    
      //set img url
      that.setImg(searchBean);

      that.setData({
        searchList : searchBean,
      })
  
      console.log("searchList");
      console.log(that.data.searchList);
    } else {
      //to be done 暂时没有其他内容哦~
    }

   
  
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

  //when scroll to the top
  upper: function () {
    // wx.showNavigationBarLoading()
    // this.refresh();
    console.log("upper");
    // setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
    //setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 20);
  },

  //when scroll to the button
  lower: function (e) {
    // wx.showNavigationBarLoading();
    var that = this;
    // setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
   // setTimeout(function(){wx.hideNavigationBarLoading();}, 10);
    console.log("lower")
  },

  onclickorder: function(e){
      console.log(e);
      var index = e.currentTarget.dataset.idx;
      var spotId = this.data.searchList[index].spotId;
      var spotId = Number(spotId) - 1;//spotId >=0, but placeIndex >= 0 
      var orderBean = JSON.stringify(spotId);
      wx.navigateTo({
        url: "/pages/order/order?orderBean=" + orderBean,
      })
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
          var toastText = "获取数据失败，请稍后重试";
          Toast.fail(toastText);
        } else {
          //navigate to search page
          console.log(res.data);
          var searchBean = res.data;
          //set img url
          that.setImg(searchBean);
          that.setData({
            searchList : searchBean,
          })
        }
       }
    })
  },

  setImg : function(searchBean){
      searchBean.forEach(v=>{
      if(v.spotId == 1)//游泳馆
        v.imgUrl = " ../../images/IMG_playground1.JPG";
      else if(v.spotId == 2)//方肇周体育馆
        v.imgUrl = " ../../images/IMG_playground2.JPG";
      else if(v.spotId == 3)//田径场
        v.imgUrl = " ../../images/IMG_playground3.JPG";
      else if(v.spotId == 4)//第四餐厅
        v.imgUrl = " ../../images/IMG_canteen2.JPG";
      else if(v.spotId == 5)//第四餐厅
        v.imgUrl = " ../../images/IMG_canteen1.JPG";
      else if(v.spotId == 6)//第四餐厅
        v.imgUrl = " ../../images/IMG_canteen3.JPG";
      else if(v.spotId == 7)//图书馆
        v.imgUrl = "../../images/IMG_library.JPG";
    })
  }

})