import Traveler from '../../../components/traveler/traveler'
import Coupon from '../../../components/coupon/coupon'
import Success from '../../../components/success/success'
import MapBox from '../../../components/map/map'
import Picker from '../../../components/picker/picker'
// import {Traveler} from '../../../components';
export default {
    name: 'home',
    created() {
        console.log(this.dataBox)
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
                change_seat: 1,
            },
            change_seat_name:'接受',
            peoper: [],
            dialogVisible: false,
            travelerConfit: {
                url: true, //是后退还是关闭弹窗,
            },
            couponConfig: {
                url: true, //是后退还是关闭弹窗,
                ticket_id: this.$route.query.id ? parseInt(this.$route.query.id) : 0,
                goods_type: 3
            },
            children_num: 0,
            adult_num: 0,
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
            pickerBoo:false,
            pickerConfig: { //选择框配置
              state: 0, //选中状态 0.国家 1.城市 2.货币
              dataBox: [], //数据
              selectBox: [], //选中状态
              title: '', //标题
            },
        }
    },
    computed: {
        money() {
            let adult = this.adult_num * this.dataBox.specPrice
            let child = this.dataBox.specChildren_price ? this.dataBox.specChildren_price : this.dataBox.specPrice
            let children = this.children_num * child - this.couponPrice
            return parseInt(adult) + parseInt(children)
        }
    },
    methods: {
        //地图打开
        mapShow(lng, lat, name) {
            this.$$api_public_jssdk_config({
                data: { url: window.location.href },
                fn: data => {
                    var _this = this
                    wx.config({ //地图接口配置
                        debug: false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['openLocation']
                    });
                    // var myGeo = new BMap.Geocoder();
                    // myGeo.getPoint(name, function(point){
                    //   if(point){
                    wx.openLocation({
                        latitude: lat, // 纬度，浮点数，范围为90 ~ -90  
                        longitude: lng, // 经度，浮点数，范围为180 ~ -180。  
                        name: '地址', // 位置名  
                        address: name, // 地址详情说明  
                        scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大  
                        // infoUrl : 'http://www.gongjuji.net' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）  
                    });
                    //   }else{
                    //     _this.$message.error('没有找到该地址坐标！')
                    //   }
                    // })
                },
                errFn: (err) => {
                    Indicator.close();
                    this.$message.error(err.msg)
                }
            })
        },
        del(index) {
            this.peoper.splice(index, 1)
        },
        closeTraveler() {

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
                    this.children_num++
                } else {
                    this.adult_num++
                }
            } else {
                this.$message.error('您已经添加过此人咯！')
            }
        },
        sopenCoupon() {
            this.couponConfig = {
                    url: true, //是后退还是关闭弹窗,
                    ticket_id: this.dataBox.id ? parseInt(this.dataBox.id) : 0,
                    goods_type: 3
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
        seat(){
            this.pickerBoo=true;
            let dataBox=[{
                value:{},
                valueIndex:0,
                values: ['不接受','接受']
            }]
            this.pickerConfig= { //选择框配置
              state: 0, //选中状态 0.国家 1.城市 2.货币
              dataBox: dataBox, //数据
              selectBox: [], //选中状态
              title: '是否接受换位', //标题
            }
        },
        selectPicker(data){
            this.pickerBoo = false;
            this.subData = Object.assign({}, this.subData, {
                change_seat: data[0]=='不接受' ? 0 : 1 
            })
            this.change_seat_name = data[0]
        },
        closePicker(){
            this.pickerBoo = false;
        },
        sub(ref) {
            this.subData = Object.assign({}, this.subData, {
                spec: this.dataBox.specName,
                duration: this.dataBox.duration,
                depdate: this.dataBox.date,
                ticket_id: this.dataBox.id ? this.dataBox.id : 0,
                adult_num: this.adult_num,
                children_num: this.children_num,
                passagers: this.peoper,
                coupon_id: this.coupon_id
            })
            let status = true
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
            if (status) {
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.$$api_shop_ticketOrderBook({
                            data: this.subData,
                            fn: data => {
                                this.$message.success('订单创建成功！');
                                let dataId = data.id;
                                let typeNum = 1;
                                if (this.dataBox.selected == '2') {
                                    typeNum = 8;
                                } else if (this.dataBox.selected == '4') {
                                    typeNum = 2;
                                } else if (this.dataBox.selected == '1') {
                                    typeNum = 1;
                                } else if (this.dataBox.selected == '3') {
                                    typeNum = 4;
                                }
                                this.$$api_public_payDopay({
                                    data: {
                                        ticket_order_id: dataId,
                                        pay_type: 1,
                                        type: typeNum
                                    },
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
                                                    url: '/user/list?type=1&status=5', //跳转链接
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
        'v-map': MapBox,
        'v-picker': Picker
    }
}