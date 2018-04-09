//index.js
let config = require("../../config/static-config.js")
//获取应用实例
const app = getApp()

Page({
    data: {
        qricon: '../../source/扫码@2x.png',
        searchicon: '../../source/search@2x.png',
        tapAllCss: 'border:#000 solid;border-width: 6rpx;border-top-width: 0;border-left-width: 0;border-right-width: 0;',
        xToken: '',
        canUseWidth: '',
        canUseHeith: '',
        useHeith: 0,
        scrollViewHeith: 0,
        tapNoKillCss: '',
        tapKilledCss: '',
        tapRefundCss: '',
        orderData: '',
        orderStatus: '',
        size: 10,
        page: 0,
        defaultOrderStatus: '',
        defaultSize: 10,
        defaultPage: 0,

    },
    onLoad: function () {
        let that = this;
        //search-view高度
        let qSearch = wx.createSelectorQuery();
        qSearch.select('.search').boundingClientRect()
        qSearch.exec(function (res) {
            that.setData({
                useHeith: that.data.useHeith + res[0].height
            })
            // killorder-view高度
            let qKillOrder = wx.createSelectorQuery();
            qKillOrder.select('.kill-order').boundingClientRect()
            let result = qKillOrder.exec(function (resk) {
                that.setData({
                    useHeith: that.data.useHeith + resk[0].height
                })
                // bannerType-view高度
                let qBannerType = wx.createSelectorQuery();
                qBannerType.select('.bannerType').boundingClientRect()
                qBannerType.exec(function (resb) {
                    that.setData({
                        useHeith: that.data.useHeith + resb[0].height
                    })
                    wx.getSystemInfo({
                        success: function (res) {
                            that.setData({
                                canUseWidth: res.windowWidth,
                                canUseHeith: res.windowHeight,
                                scrollViewHeith: res.windowHeight - that.data.useHeith
                            })
                        },
                    })
                })
            })
        })//这一串都是为了设置scrollview高度

        let xToken = wx.getStorageSync('XToken');
        this.setData({
            xToken: xToken
        });
        wx.request({
            url: config.apiUrl + 'admin/orders',
            header: {
                XToken: xToken
            },
            data: {
                orderStatus: that.data.defaultOrderStatus,
                size: that.data.defaultSize,
                page: that.data.defaultPage,
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    orderData: res.data.data
                })
            }
        })
    },
    openqr: function () {
        wx.scanCode({
            success: function (res) {
                console.log(res)
            },
            fail: function () {
                console.log(res)
            },
        })
    },
    tapAll: function () {
        wx.showLoading({
            title: '正在加载。。。',
            mask: true,
        })
        let that = this;
        this.setData({
            tapAllCss: "border:#000 solid;border-width: 6rpx;border-top-width: 0;border-left-width: 0;border-right-width: 0;",
            tapNoKillCss: '',
            tapKilledCss: '',
            tapRefundCss: '',
            orderStatus: '',
        })
        wx.request({
            url: config.apiUrl + 'admin/orders',
            header: {
                XToken: this.data.xToken
            },
            data: {
                orderStatus: that.data.defaultOrderStatus,
                size: that.data.defaultSize,
                page: that.data.defaultPage,
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    orderData: res.data.data
                })
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },
    tapNoKill: function () {
        wx.showLoading({
            title: '正在加载。。。',
            mask: true,
        })
        let that = this;
        this.setData({
            tapNoKillCss: "border:#000 solid;border-width: 6rpx;border-top-width: 0;border-left-width: 0;border-right-width: 0;",
            tapAllCss: '',
            tapKilledCss: '',
            tapRefundCss: '',
            orderStatus: '1',
        })
        wx.request({
            url: config.apiUrl + 'admin/orders',
            header: {
                XToken: this.data.xToken
            },
            data: {
                orderStatus: 1,
                size: that.data.defaultSize,
                page: that.data.defaultPage,
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    orderData: res.data.data
                })
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },
    tapKilled: function () {
        this.setData({
            tapKilledCss: "border:#000 solid;border-width: 6rpx;border-top-width: 0;border-left-width: 0;border-right-width: 0;",
            tapAllCss: '',
            tapNoKillCss: '',
            tapRefundCss: '',
            orderStatus: '2',
        });
        wx.showLoading({
            title: '正在加载。。。',
            mask: true,
        })
        let that = this;
        wx.request({
            url: config.apiUrl + 'admin/orders',
            header: {
                XToken: this.data.xToken
            },
            data: {
                orderStatus: 2,
                size: that.data.defaultSize,
                page: that.data.defaultPage,
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    orderData: res.data.data
                })
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },
    tapRefund: function () {
        this.setData({
            tapRefundCss: "border:#000 solid;border-width: 6rpx;border-top-width: 0;border-left-width: 0;border-right-width: 0;",
            tapAllCss: '',
            tapNoKillCss: '',
            tapKilledCss: '',
            orderStatus: '2',
        })
        wx.showLoading({
            title: '正在加载。。。',
            mask: true,
        })
        let that = this;
        wx.request({
            url: config.apiUrl + 'admin/orders',
            header: {
                XToken: this.data.xToken
            },
            data: {
                orderStatus: 3,
                size: that.data.defaultSize,
                page: that.data.defaultPage,
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    orderData: res.data.data
                })
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },
    nextPage: function () {
        let that = this;
        if (!this.data.orderData.last) {
            wx.showLoading({
                title: '正在加载。。。',
                mask: true,
            })
            wx.request({
                url: config.apiUrl + 'admin/orders',
                header: {
                    XToken: that.data.xToken
                },
                data: {
                    orderStatus: that.data.orderStatus,
                    size: that.data.orderData.size,
                    page: that.data.orderData.number + 1,
                },
                success: function (res) {
                    let oldData = that.data.orderData;
                    let newData = res.data.data;
                    let nowData = {};
                    nowData.content = oldData.content.concat(newData.content);
                    nowData.last = newData.last;
                    nowData.number = newData.number;
                    nowData.size = newData.size;
                    nowData.totalElements = newData.totalElements;
                    nowData.totalPages = newData.totalPages;
                    that.setData({
                        orderData: nowData
                    })
                    console.log(that.data.orderData)
                    wx.hideLoading();
                }
            })
        } else {
            wx.showToast({
                title: '已加载。。。',
            })
        }
    }
})