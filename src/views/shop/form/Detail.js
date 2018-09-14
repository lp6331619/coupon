import Traveler from '../../../components/traveler/traveler'
import Coupon from '../../../components/coupon/coupon'
import Success from '../../../components/success/success'
import MapBox from '../../../components/map/map'
// import {Traveler} from '../../../components';
export default {
    name: 'home',
    created() {
        console.log(this.dataBox)
        this.dataBox = Object.assign({}, this.dataBox, {
            adult_num: this.dataBox.adult_num ? this.dataBox.adult_num : 0,
            children_num: this.dataBox.children_num ? this.dataBox.children_num : 0
        })
    },
    data() {
        return {
            map: {},
            mainHeight: {
                height: '0',
                overflow: 'auto'
            },
            dataBox: this.$store.state.commondata.listTickey,
            rule_data: {
                wechat: [{
                    required: true,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
                phone: [{
                    pattern: /^[0-9]*$/,
                    message: '不能为空！',
                    trigger: 'blur'
                }],
            },
            subData: {
                adult_num: 0,
                children_num: 0,
            },
            peoper: [],
            dialogVisible: false,
            travelerConfit: {
                url: true, //是后退还是关闭弹窗,
            },
            couponConfig: {
                url: true, //是后退还是关闭弹窗,
                ticket_id: this.$route.query.id ? parseInt(this.$route.query.id) : 0,
                goods_type: 2
            },
            // children_num: 0,
            // adult_num: 0,
            coupon: false, //优惠券弹框
            couponPrice: 0,

            visaImg: false, //签证图片或者个人近照弹框
            visaImgNum: 0,
            coupon_id: 0,

            success: false,
            successConfig: {
                coupon: false, //是否有优惠券
                url: '/user/list', //跳转链接
            },

            mapBoo: false,
            mapConfig: {
                coupon: false, //
            },
        }
    },
    computed: {
        money() {
            let price = this.dataBox.specPrice ? parseInt(this.dataBox.specPrice) : parseInt(this.dataBox.price)
            let priceChildren = this.dataBox.children_price ? parseInt(this.dataBox.children_price) : parseInt(this.dataBox.specPrice)
            let adult = parseInt(this.dataBox.adult_num) *  price;
            let children = parseInt(this.dataBox.children_num) * priceChildren
            return  parseInt(adult) + parseInt(children)
        }
    },
    methods: {
        del(index) {
            this.peoper.splice(index, 1)
        },
        setTraveler(data) {
            this.dialogVisible = false
            let repeat = true
            this.peoper.forEach((item) => {
                if (item.CertNo == data.CertNo) {
                    repeat = false
                    return false
                }
            })
            if (repeat) {
                this.peoper.push(data)
                let today = new Date().getFullYear();
                let birth = data.BirthDate.substring(0, 4);
                let child = today - birth < 10
                if (child) {
                    this.dataBox.children_num++
                } else {
                    this.dataBox.adult_num++
                }
            } else {
                this.$message.error('您已经添加过此人咯！')
            }
        },
        sopenCoupon() {
            this.couponConfig = {
                    url: true, //是后退还是关闭弹窗,
                    ticket_id: this.dataBox.id ? parseInt(this.dataBox.id) : 0,
                    goods_type: 2
                },
                this.coupon = true
        },
        setCoupon(data) { //优惠券返回数据
            this.coupon = false
            this.couponPrice = parseInt(data.value)
            this.coupon_id = data.id
        },
        labelBox(num) { //图片上传获取现在点击的是第几个
            this.visaImgNum = num
        },
        handleAvatarSuccess(res, file, fileList) { //上传
            this.$set(this.peoper[this.visaImgNum], 'visa_img', 'http://img.quitang.com/' + res.data.img)
        },
        handleAvatarError(err, file, fileList) {
            this.$message.error(err)
        },
        subVisa_img() { //验证是否穿了照片
            let status = true
            this.peoper.forEach((item) => {
                if (item.visa_img == undefined) {
                    this.$message.error('请上传签证照片！')
                    status = false
                }
            })
            if (status)
                this.visaImg = false
        },
        beforeAvatarUpload(file) { //图片上传
            const isLt2M = file.size / 2048 / 2048 < 10;
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isGIF = file.type === 'image/gif';
            if (!isJPG && !isPNG && !isPDF && !isGIF) {
                this.$message.error('上传头像图片只能是 jpg, gif, png, jpeg 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG || isPNG || isGIF && isLt2M;

        },
        setSuccess() { //成功弹框返回

        },
        sub(ref) {
            // this.dataBox
            this.subData = Object.assign({}, this.subData, {
                coupon_id: this.coupon_id,
                goods_id: this.dataBox.goods_id,
                spec: this.dataBox.spec,
            })
            let status = true
            if (this.dataBox.is_passport != '0') {
                this.subData = Object.assign({}, this.subData, {
                    // adult_num: this.adult_num,
                    // children_num: this.children_num,
                    passagers: this.peoper,
                })
                if (this.peoper.length <= 0) {
                    status = false
                    this.$message.error('至少添加一个出行人')
                }
                if (this.dataBox.is_license == 1) {
                    this.peoper.forEach((item) => {
                        if (!item.visa_img) {
                            status = false
                            this.$message.error('请上传签证照片！')
                        }
                    })
                }
            }
            if (status) {
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.$$api_product_order_book({
                            data: this.subData,
                            fn: data => {
                                this.$message.success('订单创建成功！');
                                let dataId = data.id;
                                let typeNum = 20;
                                if (this.dataBox.type == 2) {
                                    typeNum = 3;
                                } else if (this.dataBox.type == 3 && this.dataBox.sub_type == 1) {
                                    typeNum = 5;
                                } else if (this.dataBox.type == 3 && this.dataBox.sub_type == 6) {
                                    typeNum = 6;
                                } else if (this.dataBox.type == 6 && this.dataBox.sub_type == 1) {
                                    typeNum = 7;
                                }
                                this.$$api_public_payDopay({
                                    data: { order_id: dataId, pay_type: 1, type: typeNum },
                                    fn: data => {
                                        var _this = this
                                        wx.config({
                                            debug: false,
                                            appId: data.AppID, // 必填，公众号的唯一标识
                                            timestamp: data.TimeStamp, // 必填，生成签名的时间戳
                                            nonceStr: data.NonceStr, // 必填，生成签名的随机串
                                            signature: data.SignType, // 必填，签名
                                            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
                                        });
                                        // wx.error(function(res){
                                        //     _this.$message.error(res)
                                        //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                                        // })
                                        wx.chooseWXPay({
                                            timestamp: data.TimeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                            nonceStr: data.NonceStr, // 支付签名随机串，不长于 32 位
                                            package: data.Package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                            paySign: data.PaySign,
                                            success: function(res) {
                                                _this.successConfig = {
                                                    coupon: false,
                                                    url: '/user/list?type=2&status=5', //跳转链接
                                                }
                                                _this.success = true
                                                    // 支付成功后的回调函数
                                            }
                                        });
                                    },
                                    errFn: (err) => {
                                        this.$message.error(err.msg);
                                    },
                                })
                            },
                            errFn: (err) => {
                                this.$message.error(err.msg);
                            },
                        });
                    }
                })
            }
        },
    },
    components: {
        'v-traveler': Traveler,
        'v-coupon': Coupon,
        'v-Success': Success,
        'v-map': MapBox
    }
}