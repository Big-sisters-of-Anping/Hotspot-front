Component({
  data: {
    selected: 0,
    color: "#515151",
    selectedColor: "#3BA1FF",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "/images/map.png",
        "selectedIconPath": "/images/map_blue.png",
        "text": "地图"
      },
      {
        "pagePath": "/pages/index/discover",
        "iconPath": "/images/discover.png",
        "selectedIconPath": "/images/discover_blue.png",
        "text": "发现"
      },
      {
        "pagePath": "/pages/index/mine",
        "iconPath": "/images/mine.png",
        "selectedIconPath": "/images/mine_blue.png",
        "text": "我的"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})