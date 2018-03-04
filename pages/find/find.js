
const app = getApp()
var util = require('../../utils/util.js')  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'../../pic/pic.jpg',

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    slider: [
        {  
            id: 1,
            linkUrl:'/pages/index/index',  
            picUrl:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'   
       },{  
            id: 2,
            linkUrl:'/pages/person_info/person_info',  
            picUrl:'/image/pic/pic.jpg'   
       },{  
            id: 3,
            linkUrl:'/pages/me/me',  
            picUrl:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'   
       }
    ],  
    swiperCurrent: 0  
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {  
//     var that = this;  
// //网络访问，获取轮播图的图片  
//     util.getRecommend(function(data){  
//       that.setData({  
//         slider: data.data.slider  
//       })  
//     });   
  },  
  //轮播图的切换事件  
  swiperChange: function(e){  
//只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({  
      swiperCurrent: e.detail.current  
    })  
  },  
  //点击指示点切换  
  chuangEvent: function(e){  
    this.setData({  
      swiperCurrent: e.currentTarget.id  
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
  toDetail: function () {
    console.log('点击了 one daka');
    wx.navigateTo({
      url: '../daka_info/daka_info',
    })
  },
  addNewDK: function(){
    console.log('点击了');
    wx.navigateTo({
      url: '../create_group/create_group',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
