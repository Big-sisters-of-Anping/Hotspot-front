// pages/order/order.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-08-01',
    placeIndex: '1',
    //spotOrderTimeList
    listData : [
      // order_status: 0 stands for can not be ordered, 1 stands for can be ordered
      //user_order_status: 0 stands for haven't not been ordered, 1 stands for have been ordered
      {order_time: "08:00am - 09:00am", order_status: "1", user_order_status: "0"},
      {order_time: "09:00am - 10:00am", order_status: "0", user_order_status: "0"},
      {order_time: "10:00am - 11:00am", order_status: "0",user_order_status: "0"},
      {order_time: "11:00am - 12:00am", order_status: "1",user_order_status: "0"},
      {order_time: "12:00am - 13:00am", order_status: "1",user_order_status: "0"},
      {order_time: "13:00am - 14:00am", order_status: "0", user_order_status: "0"},
      // {order_time: "14:00am - 15:00am", order_status: "1"},
      // {order_time: "15:00am - 16:00am", order_status: "1"},
      // {order_time: "16:00am - 17:00am", order_status: "0"},
    ],
    user_order_status_index:"9999",//at most one listData[index].user_order_status = 1 is permitted
    button_word:["预约","取消"],
    placeArray:["游泳馆","方肇周体育馆","田径场","学生第四餐厅","学生第五餐厅","四组团餐厅" , "杜厦图书馆"],
    spotList:[],
    spotOrderTimeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //test /spot/listAllSpots
    var that = this;
    wx.request({
        url: app.globalData.url + "/order/listSpotOrderTime?date=2020-06-29&spotId=1",
        method: 'GET',
        success: (res) =>{
            // console.log(res.data);
            that.setData({
              timeList : res.data,
            }
            )
            console.log(that.data.timeList);
        }

    })
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

  bindPlaceChange: function(e) {
    console.log('place picker发送选择改变，携带值为', e.detail)
    this.setData({
      placeIndex: e.detail.value
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

    //cancel the user_oder_status = 0 (at most one item can be selected)
    if(this.data.user_order_status_index != "9999"){ 
      let listdata = this.data.listData;
      listdata[this.data.user_order_status_index].user_order_status = 0;
    }

    //change the user_order_status of the current item to 1
    let listdata = this.data.listData;

    //if last_index != current_index, -> 1, 
    //otherwise, -> 0 (already set in  if(this.data.user_order_status_index != "9999"))
    if(this.data.user_order_status_index != value)
      listdata[value].user_order_status = listdata[value].user_order_status ^ 1;

    if(listdata[value].user_order_status == 0){
      this.data.user_order_status_index = "9999";
    } else{
     this.data.user_order_status_index = value;
    }
  
    //setData cannot get list item directly
    //this.setData should be used to reload the changed data
    this.setData({
       listData : listdata,
    });

    console.log(this.data.listData[value].user_order_status);
    

    // if(listdata[value].user_order_status == "1"){
    //   wx.showToast({
    //     icon: 'none',
    //     title: '预约成功！可在个人中心查看:)',
    //   })
    // }else{
    //   wx.showToast({
    //     icon: 'none',
    //     title: '取消预约，涉及个人信用，请谨慎操作:(',
    //   })
    // }
   
  },
  onclickorder2: function(e){
    wx.showToast({
      title: '此时段不可预约:(',
      icon: 'none'
    })
  },

  //to be done, submit order
  onclicksubmit: function(e){
      let that = this;

      //if time is selected (valid), send request
      if(that.data.user_order_status_index != "9999"){

        //get start time and end time from 
        let dur = that.data.listData[that.data.user_order_status_index].order_time;
        let arr = dur.split(" - ");
        console.log("arr "+ arr);

        wx.request({
          url: app.globalData.url + "/order/addOrder",
          method: 'POST',
          data: {
            "endTime": arr[1],
            "note": "none",//?
            "orderDate": that.data.date,
            // "orderId": 0,//this should be changed by server??
            // "orderStatus": 0,//it's not necessary
            "spotId": that.data.placeIndex,
            "spotName": that.data.placeArray[that.data.placeIndex],
            "startTime": arr[0],
            "userId": 0//to be done
          },
          headers:{
            'content-type': 'application/json' // 默认值 
          },
          success(res){
            if(res.data == null){
              var toastText = "预约失败，请稍后重试" + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });
            } else {
              console.log(res.data);
              var toastText = "预约成功！请前往个人中心查看:)";
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              })
              wx.navigateBack({
                complete: (res) => {},
              })
            }
           }
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '请选择预约时段:(',
        })
      }

  }
})

// Component({

// })