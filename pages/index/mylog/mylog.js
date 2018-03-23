var that;
Page({
    data: {
        images: [],
        uploadedImages: [],
        imageWidth: wx.getSystemInfoSync().windowWidth / 3 - 20
    },
    onLoad: function (options) {
        that = this;
        var objectId = options.objectId;
        // console.log(objectId);
        console.log(this.data.imageWidth)
        // console.log(wx.getSystemInfoSync())
    },
    chooseImage: function () {
        // 选择图片
        wx.chooseImage({
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                console.log(tempFilePaths);
                that.setData({
                    images: that.data.images.concat(tempFilePaths)
                });
            }
        })
    },

    submit: function () {
        // 提交图片，事先遍历图集数组
        that.data.images.forEach(function (tempFilePath) {
            console.log(tempFilePath)
            // new AV.File('file-name', {
            //     blob: {
            //         uri: tempFilePath,
            //     },
            // }).save().then(
            //     // file => console.log(file.url())
            //     function (file) {
            //         // 先读取
            //         var uploadedImages = that.data.uploadedImages;
            //         uploadedImages.push(file.url());
            //         // 再写入
            //         that.setData({
            //             uploadedImages: uploadedImages
            //         });
            //         console.log(uploadedImages);
            //     }
            //     ).catch(console.error);
        });
        wx.showToast({
            title: '发布成功',
            success: function () {
                setTimeout(function () {
                    //要延时执行的代码  
                    //跳转到详细打卡界面
                    wx.navigateTo({
                        url: '../../daka_info/daka_info',
                    })
                }, 600) //延迟时间 这里是0.6秒  
            }
        });
    },
    delete: function (e) {
        var index = e.currentTarget.dataset.index;
        var images = that.data.images;
        images.splice(index, 1);
        that.setData({
            images: images
        });
    }
})