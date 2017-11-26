// pages/daka_info/daka_info.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myGroup: "学英语",
    continue_days: 1,
    tabs:["打卡记录","活动详情","小组成员"],
    daka_word: "打卡",  //打卡文字内容，未实现
    winWidth:0,
    winHeight:0,
    //tab
    currentTab:0,
    animationData: [],
  },

  click_daka: function (){
    //设置点击动画
    var animation = wx.createAnimation({
      duration: 300,  //动画时间
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50% 0",
    })

    animation.rotate(720).scale(0.1).step()
    animation.rotate(0).scale(1).step()

    this.setData({ animationData: animation.export() })
    // this.setData({ daka_word:"已打卡"}) //打卡文字内容，未实现
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const ctx = wx.createCanvasContext('dakaCanvas')

    // // Create circular gradient
    // const grd = ctx.createCircularGradient(150, 50, 50)
    // grd.addColorStop(0, 'blue')
    // // grd.addColorStop(1, 'white')


    // // Fill with gradient
    // ctx.setFillStyle(grd)
    // ctx.fillRect(10, 0, 200, 100)
    // ctx.draw()
    var that =this;
    //get sys info

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth:res.windowWidth,
          winHeight:res.windowHeight
        });
      },
    });
  },
  //change tabs hua dong
  bindChange:function(e){
    var that =this;
    that.setData({currentTab:e.detail.current});
  },
  //change by tap
  swichNav:function(e){
    var that = this;
    if(this.data.currentTab == e.target.dataset.current){
      return false;
    }
    else{
      that.setData({
        currentTab : e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    try { //获取页面宽度width
      var res = wx.getSystemInfoSync()
      var width = res.windowWidth;
    } catch (e) {
      // Do something when catch error
      var width = 320;
    }

    // 页面渲染完成  
    const ctx = wx.createCanvasContext('dakaCanvas')
    
    ctx.arc(width/2, 50, 40, 0, 2 * Math.PI, true);
    ctx.setFillStyle("#20B2AA");
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(width/2, 50, 45, 0, 2 * Math.PI, true);
    ctx.setStrokeStyle("#20B2AA");
    ctx.stroke();

    ctx.beginPath();
    ctx.setFillStyle("#ffffff"); //设置文字颜色
    ctx.setFontSize(20);
    ctx.setTextAlign('center'); ctx.setFontSize(20)
    ctx.fillText("打卡", width / 2, 58,true);  //文字位置
    ctx.stroke();

    ctx.draw();
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
  set_tab(e){

  }
})