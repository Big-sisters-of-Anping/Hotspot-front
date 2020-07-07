//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    btn_img: "clock",
    btn_words: "预约",
    selected_spot_id: -1,
    hasMarkers: false,
    //NJU, xianlin campus
    latitude: 32.11914686983188,
    longitude: 118.9585018157959,
    scale: 15,
    markers: [
    // {
    //   id: 1,
    //   latitude: 32.11618454892917,
    //   longitude: 118.95806193351746,
    //   name: '游泳馆',
    //   callout: {
    //     content: "预约/人数上限：10/200",
    //     display: "BYCLICK",
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     bgColor:"#FFFFFF",
    //     padding: 5
    //   }
    // },
    // {
    //   id: 2,
    //   latitude: 32.121055062443766,
    //   longitude: 118.95301938056946,
    //   name: '方肇周体育馆',
    //   callout: {
    //     content: "预约/人数上限：80/100",
    //     display: "BYCLICK",
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     bgColor:"#FFFFFF",
    //     padding: 5
    //   }
    // },
    // {
    //   id: 3,
    //   latitude: 32.12045534906481,
    //   longitude: 118.95304083824158,
    //   name: '田径场',
    //   callout: {
    //     content: "实时人数/建议人数上限：75 / 100 \n建议待会儿再来哦",
    //     display: "BYCLICK",
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     bgColor:"#FFFFFF",
    //     padding: 5
    //   }
    // },
    // {
    //   id: 4,
    //   latitude: 32.111322863025954,
    //   longitude: 118.95545482635498,
    //   name: '学生第四餐厅',
    //   callout: {
    //     content: "实时人数/建议人数上限：20 / 100",
    //     display: "BYCLICK",
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     bgColor:"#FFFFFF",
    //     padding: 5
    //   }
    // },
    // {
    //   id: 5,
    //   latitude: 32.11155913785915,
    //   longitude: 118.95536363124847,
    //   name: '学生第五餐厅',
    //   callout: {
    //     content: "实时人数/建议人数上限：80 / 100 \n建议待会儿再来哦",
    //     display: "BYCLICK",
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     bgColor:"#FFFFFF",
    //     padding: 5
    //   }
    // },
    // {
    //   id: 6,
    //   latitude: 32.1227633153165,
    //   longitude: 118.95236492156982,
    //   name: '四组团餐厅',
    //   callout: {
    //     content: "实时人数/建议人数上限：10 / 60",
    //     display: "BYCLICK",
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     bgColor:"#FFFFFF",
    //     padding: 5
    //   }
    // },
    // {
    //   id: 7,
    //   latitude: 32.114130858992915,
    //   longitude: 118.95988583564758,
    //   name: '杜厦图书馆',
    //   callout: {
    //     content: "实时人数/建议人数上限：50 / 100",
    //     display: "BYCLICK",
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     bgColor:"#FFFFFF",
    //     padding: 5
    //   }
    // }
  ]
  },

  //get tarbar (use the tabbar provided by weixin to avoid bug...)
  // pageLifetimes: {
  //   show() {
  //     if (typeof this.getTabBar === 'function' &&
  //       this.getTabBar()) {
  //       this.getTabBar().setData({
  //         selected: 0
  //       })
  //     }
  //   }
  // },
    onLoad:function(e){
      var that = this;
      wx.request({
          url: app.globalData.url + "/spot/listAllSpots",
          method: 'GET',
          success: (res) =>{
              // console.log(res.data);
              var spotList = res.data;
              app.globalData.spotList = spotList;
              var currMarkers = [];
              spotList.forEach(spot => {
                var iconPath = "/images/location-green.png";
                if(spot.realtimePeople == spot.suggestedPeople){
                  iconPath = "/images/location-red.png";
                }else if (spot.realtimePeople > spot.suggestedPeople * 0.75){
                  iconPath = "/images/location-yellow.png";
                }
                var currMark = {
                  "id": spot,
                  "latitude": spot.latitude,
                  "longitude": spot.longitude,
                  "name": spot.spotName,
                  "iconPath": iconPath,
                  "callout": {
                    content: spot.spotName + "\n实时人数/建议人数：" + spot.realtimePeople + " / " + spot.suggestedPeople,
                    display: "BYCLICK",
                    borderRadius: 5,
                    borderWidth: 1,
                    bgColor:"#FFFFFF",
                    padding: 5,
                    anchorY: 5,   
                    textAlign: "center",
                  }
                };
                currMarkers.push(currMark);
              });
              that.setData({
                markers : currMarkers,
                hasMarkers: true
              })
          }
      })
    },
    onReady: function (e) {
      this.mapCtx = wx.createMapContext('myMap')

      //get current location and reset the map, 
      //comment it temporarily as we use xianlin camplus as exmaple
      //getlocation();
    },
    getCenterLocation: function () {
      this.mapCtx.getCenterLocation({
        success: function(res){
          console.log(res.longitude)
          console.log(res.latitude)
        }
      })
    },
    moveToLocation: function () {
      this.mapCtx.moveToLocation()
    },
    translateMarker: function() {
      this.mapCtx.translateMarker({
        markerId: 1,
        autoRotate: true,
        duration: 1000,
        destination: {
          latitude:23.10229,
          longitude:113.3345211,
        },
        animationEnd() {
          console.log('animation end')
        }
      })
    },
    includePoints: function() {
      this.mapCtx.includePoints({
        padding: [10],
        points: [{
          latitude:23.10229,
          longitude:113.3345211,
        }, {
          latitude:23.00229,
          longitude:113.3345211,
        }]
      })
    },

    onclickmap: function(e){
      console.log(e);
      var lat = e.detail.latitude;
      var long = e.detail.longtitude;
    },

    onclickmarker: function(e){
      console.log(e);//makerId
      this.setData({
        btn_img: (e.markerId.spotType == 1) ? "clock":"like",
        btn_words: (e.markerId.spotType == 1) ? "预约":"想去",
        selected_spot_id: e.markerId.spotId
      });
      // this.createCallout(e.detail.markerId);
    },

    onclickcallout: function(e){
      //pass information (place)
      console.log(e);
      let spotId = Number(e.markerId.spotId) - 1;//spotId >=0, but placeIndex >= 0 
      let orderBean = JSON.stringify(spotId);
      wx.navigateTo({
        url: "/pages/order/order?orderBean=" + orderBean,
      })
    },

    getlocation: function(){
      wx.getLocation({
        success: (res) => {
         
          console.log(res.longitude)
          console.log(res.latitude)
          //get current location
          this.data.latitude = res.latitude
          this.data.longitude =  res.longitude

          //move to current location (user's current location)
          this.mapCtx.moveToLocation()
        }
      })
    },

    //when order button is clicked
    onclickorder: function(e){
      console.log(e);
      wx.navigateTo({
        url: "/pages/order/order" + (this.data.selected_spot_id == -1 ? "" : ("?orderBean=" + (this.data.selected_spot_id-1)))
      })
      // wx.navigateTo({
      //   //note that absolute path should be used to avoid ERROR
      //   url: "/pages/order/order",
      //   events:{
      //     //to be done, get info from pages/order
      //   }
      // })

    }
  
})