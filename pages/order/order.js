// pages/order/order.js
import Toast from '@vant/weapp/toast/toast';

var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-08-01',
    startDate : '2020-08-01',//used to set the start time of picker
    //spotOrderTimeList
    listData : [
      // order_status: 0 stands for can not be ordered, 1 stands for can be ordered
      //user_order_status: 0 stands for haven't not been ordered, 1 stands for have been ordered
      //time_status: 0 stands for currentTime < selectedTime; 1 stands for currentTime >= selectedTime (consider date)
      {order_time: "08:00 - 10:00", order_status: "1", time_status : "0", user_order_status: "0"},
      {order_time: "10:00 - 12:00", order_status: "1", time_status : "0", user_order_status: "0"},
      {order_time: "14:00 - 16:00", order_status: "1",time_status : "0", user_order_status: "0"},
      {order_time: "16:00 - 18:00", order_status: "1",time_status : "0", user_order_status: "0"},
      {order_time: "18:00 - 20:00", order_status: "1",time_status : "0", user_order_status: "0"},
      {order_time: "20:00 - 22:00", order_status: "1",time_status : "0", user_order_status: "0"}
    ],
    user_order_status_index:"9999",//at most one listData[index].user_order_status = 1 is permitted
    button_word:["预约","取消"],
    placeIndex: '0',//spotId
    placeArray:["南京大学游泳馆","方肇周体育馆","田径场","学生第四餐厅","学生第五餐厅","四组团餐厅" , "杜厦图书馆"],//get spotName
    spotList:[],
    spotOrderTimeList: [],//correpsonding orderlist for the chosen spot
    submit_type : "预约",//
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //test /spot/listAllSpots
    var that = this;

    //jump from callout
    if(options.orderBean != null){
      var orderBean = JSON.parse(options.orderBean);
        console.log(orderBean);
        that.setData({
          placeIndex : orderBean,
        })
    }
    
    //set date to the current date & check current time
    that.setDate();//it is only used when onLoad
    
    // set placeArray
    if(that.data.spotList.length > 0){
      var tmpPlaceArray = new Array(app.globalData.spotList.length);
      //place[spotId] = spotName, but not place[i] = spotName
      //because the value returned by placepicker is index
      for(var i = 0; i < that.data.spotList.length; ++i){
        tmpPlaceArray[that.data.spotList[i].spotId - 1] =  that.data.spotList[i].spotName;
      }
      that.setData({
        placeArray : tmpPlaceArray,
      })
    }
    that.getSpotOrderTime();

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
    this.setData({
      date: e.detail.value,
      user_order_status_index: 9999
    })
    console.log('date picker发送选择改变', this.data.date);
    //load the available time
    this.getSpotOrderTime();
  },

  bindPlaceChange: function(e) {
    var that = this;
    console.log('place picker发送选择改变，携带值为', e.detail)
    that.setData({
      placeIndex: e.detail.value, //start from 0
      user_order_status_index: 9999
    })
    //load the available time
    that.getSpotOrderTime();
  },

  //get listSpotOrderTime
  getSpotOrderTime: function (){
    var that = this;
    var UrlplaceIndex = Number(that.data.placeIndex) + 1;
    //load the available time
    wx.request({
      //placeIndex + 1 because the major key in database start from index = 1
      url: app.globalData.url + "/order/listSpotOrderTime?date="+that.data.date+"&spotId=" + UrlplaceIndex,
      method: 'GET',
      success: (res) =>{
          //using spotOrderTimeList to update listData
          let tmplistData = [];
          for(let i = 0; i < res.data.length; i++) {
            // check ordered people
            let order_status = 0;
            if(res.data[i].orderedPeople <= res.data[i].suggestedPeople)
              order_status = 1;

            // check time
            let time_status = 0;
            let currentDateTime = util.formatTime(new Date());
            let hour = res.data[i].endTime;
            let currentDate = currentDateTime.split(' ')[0];
            let currentTime = currentDateTime.split(' ')[1];
            if(that.data.date == currentDate){
                let selectedTime = [hour, 0].map(util.formatNumber).join(':');
                if(currentTime >= selectedTime){
                  time_status = 1;//can not choose
                }
            }else if(that.data.date < currentDate){//this normally won't happen as start time of datePicker is aleady set
                time_status = 1;
            }else{
              time_status = 0;//selectedDate > currentDate
            }

            let curr = {
              order_time: res.data[i].startTime + " - " + res.data[i].endTime, 
              order_status: order_status, 
              time_status : time_status, 
              user_order_status: 0
            };
            tmplistData.push(curr);

          }
          that.setData({
            listData : tmplistData,
            spotOrderTimeList : res.data
          });
      }
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

    let tmplistdata = this.data.listData;
    //cancel the last selected user_oder_status = 0 (at most one item can be selected)
    if(this.data.user_order_status_index != "9999"){ 
      tmplistdata[this.data.user_order_status_index].user_order_status = 0;
    }

    //change the user_order_status of the current item to 1
    //if last_index != current_index, -> 1, 
    //otherwise, -> 0 (already set in  if(this.data.user_order_status_index != "9999"))
    if(this.data.user_order_status_index != value){
      tmplistdata[value].user_order_status = tmplistdata[value].user_order_status ^ 1;
      console.log("set value: " + this.data.user_order_status_index);
    }

    if(tmplistdata[value].user_order_status == 0){
      this.data.user_order_status_index = "9999";
    } else{
      this.data.user_order_status_index = value;
    }
  
    //setData cannot get list item directly
    //this.setData should be used to reload the changed data
    this.setData({
       listData : tmplistdata,
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
          url: app.globalData.url + "/order/addFIFOOrder",//addOrder to be done
          method: 'POST',
          data: {
            "orderDate": that.data.date,
            "userId": "2",//to be done
            "orderTime":{
              "spotOrderTimeId": that.data.spotOrderTimeList[that.data.user_order_status_index].spotOrderTimeId
            }
          },
          headers:{
            'content-type': 'application/json' // 默认值 
          },
          success(res){
            console.log(res.data);
            console.log(res.data.success);
            console.log("spotOrderTimeId "+ that.data.spotOrderTimeList[that.data.user_order_status_index].spotOrderTimeId);
            if(res.data.success == false){
              // var toastText = "预约失败:(" + res.data.errMsg;
              var toastText = "预约失败:(";
              //analysis errMsg
              if(res.data.errMsg.indexOf("Duplicate") != -1)
                toastText = toastText + "\n 已预约该时段！";
              // wx.showToast({
              //   title: toastText,
              //   icon: '',
              //   duration: 2000
              // });
              Toast.fail(toastText);
            } else {
              var toastText = "预约成功:)";
              Toast.success(toastText);
              setTimeout(function(){
                wx.navigateBack({
                  complete: (res) => {},
                })
              },2000);
            }
           }
        })
      } else {
        // wx.showToast({
        //   icon: 'none',
        //   title: '请选择预约时段:(',
        // })
        var toastText = "请选择时段";
        Toast.fail(toastText);

      }
  },

  //SET DATE
  setDate : function(){
    var that = this;
    var time = util.formatTime(new Date());
    var arr = time.split(" ");
    that.setData({
      date : arr[0],
      startDate : arr[0],
    });
  }

})


// Component({

// })