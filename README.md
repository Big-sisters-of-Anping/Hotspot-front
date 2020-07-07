# Readme

HotSpot（挤否）是一款基于微信小程序的平台，致力于帮助在校师生避开热点，安全出行。

这是HotSpot的前端代码。

### Install

- 在[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)中打开
- 点击导航栏 工具 -> 构建npm，弹出构建完成的弹窗即可。
- 点击右上角 详情，选择本地设置，调试基础库选择2.10.4或以上，点击推送。并勾选 使用npm模块。
- 左上角的机型选择为iPhone 6/7/8
- 点击编译，编译完成后就可以对左侧的模拟器进行操作。

### 文件路径

```shell
MINIPROGRAM-1/
  ├─app.js 存放全局变量
  ├─app.json TabBar的路径以及navigationBar的样式
  ├─app.wxss 规定了全局样式
  ├─utils/ 可供全局使用的工具函数
  ├─...
  ├─pages/
  │ ├─index/ TabBar的三个界面
  │ | ├─index.* 主界面（地图页面）
  │ | ├─discover* 发现页面
  │ | ├─mine* 个人中心页面
  │ ├─order/ 预约/想去界面
  │ ├─search/ discover搜索跳转界面
  │ ├─user/ 查看预约和想去界面
  │ ├─history/ 查看历史数据界面
  │ └─images/ 图片
  └─...
```



### 支持使用的系统

- iOS
- Android