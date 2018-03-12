
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'../../pic/pic.jpg',

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    search_value: "",
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  canvasIdErrorCallback: function (e) {

    console.error(e.detail.errMsg);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var context = wx.createContext();//创建并返回绘图上下文context对象。
    var width = wx.getSystemInfoSync().screenWidth

    context.setLineWidth(1);
    context.setLineCap("round")
    context.setLineJoin("miter");
    context.setMiterLimit(10);

    context.moveTo(0, 0);
    context.lineTo(width/8*5, 0);
    context.lineTo(width/8*6, 20);
    context.lineTo(width / 8 * 5, 40);
    context.lineTo( 0, 40);
    context.lineTo(0, 0);

    context.setFontSize(20);
    context.fillText("创建一个新的打卡", width/7, 28);
    context.stroke();

    wx.drawCanvas({
      canvasId : 'arrow-button',
      actions : context.getActions()
    });
 
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
    console.log('创建新打卡');
    wx.navigateTo({
      url: '../create_group/create_group',
    })
  },
  searchSubmit: function(){
    console.log("submit search")
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
