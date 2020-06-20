// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-08-01',
    listData : [
      // order_status: 0 stands for can not be ordered, 1 stands for can be ordered
      //user_order_status: 0 stands for haven't not been ordered, 1 stands for have been ordered
      {order_time: "8:00am - 9:00am", order_status: "1", user_order_status: "0"},
      {order_time: "9:00am - 10:00am", order_status: "0", user_order_status: "0"},
      {order_time: "10:00am - 11:00am", order_status: "0",user_order_status: "0"},
      {order_time: "11:00am - 12:00am", order_status: "1",user_order_status: "0"},
      {order_time: "12:00am - 13:00am", order_status: "1",user_order_status: "0"},
      // {order_time: "13:00am - 14:00am", order_status: "0"},
      // {order_time: "14:00am - 15:00am", order_status: "1"},
      // {order_time: "15:00am - 16:00am", order_status: "1"},
      // {order_time: "16:00am - 17:00am", order_status: "0"},
    ],
    button_word:["预约","取消"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  onDisplay() {

  },
  onClose() {

  },

  //when date picker is selected
  //to be done
  bindDateChange: function(e) {
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //to be done
  onclickorder1: function(e){
    console.log(e);
    //跟后端交互 to be done & 图标变成: 取消预约
    let value = e.currentTarget.dataset.value;
    console.log("value "+value);
    //toggle the state of user_order_status, 0 ^ 1 -> 1, 1 ^ 1 -> 0
    console.log(this.data.listData);
    let listdata = this.data.listData;
    listdata[value].user_order_status = listdata[value].user_order_status ^ 1,
    //setData cannot get list item directly
    this.setData({
       listData : listdata,
    });
    // this.data.listData[value].user_order_status = this.data.listData[value].user_order_status ^ 1;
    console.log(this.data.listData[value].user_order_status);
    
    console.log(this.data.button_word);

    if(listdata[value].user_order_status == "1"){
      wx.showToast({
        icon: 'none',
        title: '预约成功！可在个人中心查看:)',
      })
    }else{
      wx.showToast({
        icon: 'none',
        title: '取消预约，涉及个人信用，请谨慎操作:(',
      })
    }
   
  },
  onclickorder2: function(e){
    wx.showToast({
      title: '此时段不可预约:(',
      icon: 'none'
    })
  }
})

// Component({

// })