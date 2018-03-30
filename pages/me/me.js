//获取应用实例
// 'use strict';
let choose_year = null,
    choose_month = null;

var app = getApp()

Page({
    data: {
        userInfo: {},
        leftchar: "<",
        rightchar: ">",
        hasEmptyGrid: false,
        showPicker: false,

        dakaday: [{
            year: 2018,
            month: 3,
            day: 4
        }, {
            year: 2018,
            month: 2,
            day: 6
        }, {
            year: 2018,
            month: 2,
            day: 12
        }],

        notices: [
            {
                'subject': '来打卡吧',
                'detail': '亲爱的xxx,恭喜你完成第一次打卡...',
                'time':'12:30'
            },
            {
                'subject': '欢迎',
                'detail': '亲爱的xxx,欢迎来到打卡大咖社区,这里...',
                'time': '15:32'
            }
        ]
    },

    // 获取个人信息
    get_data: function () {
        console.log('开始获取请求')
        var that = this;
        const requestTask = wx.request({
            url: 'http://127.0.0.1:5000/info', //仅为示例，并非真实的接口地址
            data: {
                x: 'LY',
                y: ''
            },
            header: {
                'content-type': 'application/json'      //get方式
                // "Content-Type": "application/x-www-form-urlencoded"   //post方式
            },
            method: "GET",
            success: function (res) {
                console.log('请求成功,数据为:')
                console.log(res.data)
                console.log('------------------------分割线1-----------------------')
                console.log(res.data['info'][0]['id'])  //得到用户id
                // var info = res.data['info'][0];
                console.log('------------------------分割线2-----------------------')
                that.setData({
                    ID: res.data['info'][0]['id']
                });
                console.log(that.data.ID)
                console.log('------------------------分割线3-----------------------')

            }
        })
    },

    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../person_info/person_info'
        })
    },


    onLoad: function () {
        this.get_data()

        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        const weeks_ch = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        this.calculateEmptyGrids(cur_year, cur_month);
        this.calculateDays(cur_year, cur_month);
        this.setData({
            cur_year,
            cur_month,
            weeks_ch
        });

        console.log('onLoad')
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
            that.update()
        })
        console.log('-----------------last----------------')
        console.log(this.data.id)
    },

    getThisMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
    },
    getFirstDayOfWeek(year, month) {
        return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },
    calculateEmptyGrids(year, month) {
        const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
        let empytGrids = [];
        if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
                empytGrids.push(i);
            }
            this.setData({
                hasEmptyGrid: true,
                empytGrids
            });
        } else {
            this.setData({
                hasEmptyGrid: false,
                empytGrids: []
            });
        }
    },
    calculateDays(year, month) {
        let days = [];

        const thisMonthDays = this.getThisMonthDays(year, month);

        for (let i = 1; i <= thisMonthDays; i++) {
            days.push({
                day: i,
                choosed: false,
                today: false
            });
        }
        // //设置当前日期
        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        const cur_day = date.getDate();

        // 将已打卡日期标记为true
        for (var i in this.data.dakaday) {
            // console.log(this.data.dakaday[0].year)
            // console.log(year)
            if (this.data.dakaday[i].year === year && this.data.dakaday[i].month === month) {
                days[this.data.dakaday[i].day - 1].choosed = true;
            }
        }

        if (cur_year === year && cur_month === month) {
            days[cur_day - 1].today = true;
        }


        this.setData({
            days
        });
    },
    handleCalendar(e) {
        console.log(e);
        const handle = e.currentTarget.dataset.handle;
        const cur_year = this.data.cur_year;
        const cur_month = this.data.cur_month;
        if (handle === 'prev') {
            let newMonth = cur_month - 1;
            let newYear = cur_year;
            if (newMonth < 1) {
                newYear = cur_year - 1;
                newMonth = 12;
            }

            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);

            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            });

        } else {
            let newMonth = cur_month + 1;
            let newYear = cur_year;
            if (newMonth > 12) {
                newYear = cur_year + 1;
                newMonth = 1;
            }

            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);

            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            });
        }
    },
    //   tapDayItem(e) {
    //     const idx = e.currentTarget.dataset.idx;
    //     const days = this.data.days;
    //     days[idx].choosed = !days[idx].choosed;
    //     this.setData({
    //       days,
    //     });
    //   },

    chooseYearAndMonth() {
        console.log('chooseYearAndMonth')
        const cur_year = this.data.cur_year;
        const cur_month = this.data.cur_month;
        let picker_year = [],
            picker_month = [];
        for (let i = 1900; i <= 2100; i++) {
            picker_year.push(i);
        }
        for (let i = 1; i <= 12; i++) {
            picker_month.push(i);
        }
        const idx_year = picker_year.indexOf(cur_year);
        const idx_month = picker_month.indexOf(cur_month);
        this.setData({
            picker_value: [idx_year, idx_month],
            picker_year,
            picker_month,
            showPicker: true,
        });
        wx.pageScrollTo({
            scrollTop: 1500
        })
    },

    pickerChange(e) {
        const val = e.detail.value;
        choose_year = this.data.picker_year[val[0]];
        choose_month = this.data.picker_month[val[1]];
    },

    tapPickerBtn(e) {
        const type = e.currentTarget.dataset.type;
        const o = {
            showPicker: false,
        };
        if (type === 'confirm') {
            o.cur_year = choose_year;
            o.cur_month = choose_month;
            this.calculateEmptyGrids(choose_year, choose_month);
            this.calculateDays(choose_year, choose_month);
        }

        this.setData(o);
        wx.pageScrollTo({
            scrollTop: 0
        })
    },


    // 跳转到当天打卡详细界面
    gotoDetail: function () {
        wx.navigateTo({
            url: '../daka_info/daka_info'
        })
        // this.handleCalendar(handle: "next" );
        // this.chooseYearAndMonth();
    },

    complaint: function () {
        wx.navigateTo({
            url: 'complaint/complaint'
        })
    }
})
