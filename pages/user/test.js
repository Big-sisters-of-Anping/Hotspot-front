// import Dialog from '@vant/weapp/dist/dialog/dialog';

Page({
  data: {
    show: false,
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({ close: false });
  },
});