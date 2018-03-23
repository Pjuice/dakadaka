// pages/index/Judge/judge.js
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      group: '读书',
      time:'2018-3-23',

      n:3,
      all_people:5,

      dakatext:"今天我完成了背单词\n今天我背了100个单词",
      images: [ '../../../image/pic/read0.jpg',
                '../../../image/pic/read1.jpg',
                '../../../image/pic/read2.jpg',
                '../../../image/pic/read3.jpg',
                '../../../image/pic/read4.jpg',
                '../../../image/pic/read5.jpg',
                ],
      imageWidth: wx.getSystemInfoSync().windowWidth / 3 - 24
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log('onLoad')
      that = this;
      //获取用户信息
      app.getUserInfo(function (userInfo) {
          that.setData({
              userInfo: userInfo,
          })
          that.update()
        //   console.log(this.data.userInfo)
      })

      var objectId = options.objectId;

      console.log('hhh')
      console.log(that.data.imageWidth)
      console.log('www')
  },

  previewImage: function () {
      // 预览图集
      wx.previewImage({
          urls: that.data.images
      });
      console.log(that.data.images)
  },

  submit: function(){
      wx.navigateTo({
          url: '../mylog/mylog'
      })
  }
})