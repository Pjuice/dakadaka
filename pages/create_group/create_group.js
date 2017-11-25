Page({
  data: {
    money: ['2元/天', '5元/天', '10元/天'],
    days_num: ['7天', '15天', '30天'],
    category: ['单词', '早起', '读书', '运动'],
    mon_index: 0,
    days_index: 0,
    cate_index: 0
  },
  mon_bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      mon_index: e.detail.value
    })
  },
  days_bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      days_index: e.detail.value
    })
  },
  cate_bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cate_index: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  }
})
