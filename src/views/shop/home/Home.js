import menu from '../../../components/menu/menu'
import { Indicator } from 'mint-ui';
export default {
    created() {

        this.getList()
        if (this.headStatus) {
            if (!this.$store.state.user.userinfo.token || this.$route.query.tokenExpired == '0') {
                Indicator.open('加载中！')
                if (!this.$route.query.token || this.$route.query.tokenExpired == '0') {
                    location.href = 'http://wechat-api.quitang.com/user/login'
                } else {
                    this.$store.dispatch('update_userinfo', {
                        userinfo: {
                            token: this.$route.query.token,
                            openid: this.$route.query.openid,
                        }
                    }).then(() => {
                        this.$$api_public_userinfo({
                            data: {},
                            fn: data => {
                                this.$store.dispatch('update_userinfo', {
                                    userinfo: {
                                        token: this.$route.query.token,
                                        openid: this.$route.query.openid,
                                        user: data,
                                    }
                                }).then(() => {
                                    Indicator.close()
                                    this.$message.success('获取信息成功!')
                                    this.getList()
                                    delete this.$route.query.token
                                    delete this.$route.query.openid
                                    delete this.$route.query.tokenExpired
                                })
                            },
                            errFn: (err) => {
                                Indicator.close()
                                this.$message.error(err.msg);
                            },
                        })
                    })
                }
            }
        } else {
            this.$store.dispatch('update_userinfo', {
                userinfo: {
                    span: 1
                }
            }).then(() => {})
        }
    },
    filters: { //过滤器
        filtersMoney(value) {
            return '$' + value
        }
    },

    data() {
        return {
            country: this.$route.query.country ? this.$route.query.country : '国家',
            img: require('../../../assets/images/banner.jpg'),
            dataBox: [],
            height: {
                height: '150px'
            },
            country_id: this.$route.query.country_id ? this.$route.query.country_id : '1',
        }
    },
    methods: {
        SwiperSlid: function(obj) { //swiper
            var mySwiper = new Swiper(obj, {
                slidesPerView: 'auto',
                spaceBetween: 10,
                slidesPerView: 1.8,
            });
        }, //获取数据
        getList() {
            this.$$api_shop_index({
                data: this.$route.query,
                fn: data => {
                    this.dataBox = data
                    for (let i in this.dataBox) {
                        if (this.dataBox[i].length > 0) {
                            this.dataBox[i].forEach((item, index) => {
                                if (item.imgs[item.imgs.length - 1] == ',') {
                                    item.imgs = item.imgs.substr(0, item.imgs.length - 1);
                                }
                                this.$set(item, 'img', item.imgs.split(','))
                            })
                        }
                    }
                    this.$nextTick(function() {
                        if (this.dataBox.goods_1) {
                            this.SwiperSlid('#swiperBox');
                        }
                        if (this.dataBox.goods_2) {
                            this.SwiperSlid('#swiperBox2');
                        }
                        if (this.dataBox.goods_4) {
                            this.SwiperSlid('#swiperBox3');
                        }
                        if (this.$refs.imgBox) {
                            this.height = Object.assign({}, this.height, {
                                height: this.$refs.imgBox[0].offsetWidth / 4 * 3 + 'px'
                            })
                        }
                    })
                },
                errFn: (err) => {
                    Indicator.close();
                    this.dddd = JSON.stringify(err)
                    this.$message.error(err.msg)
                }
            })
        }, //登陆
        // login(){
        //     Indicator.open('登陆中...');
        //     this.$$api_public_login({
        //         data     : {},
        //         fn       : data => {
        //             Indicator.close();

        //             alert(data)
        //         },
        //         errFn    : (err) => {
        //             Indicator.close();
        //             this.$message.error(err.msg)
        //         }
        //     })
        // },
        // getCountry(){
        //     this.$$api_public_countrys({
        //        data     : {},
        //        fn       : data => {
        //           Indicator.close();
        //           this.$store.dispatch('get_countrys',{
        //               countrys:data
        //           }).then((res) => {
        //           })
        //        },
        //        errFn    : (err) => {
        //           Indicator.close();
        //           this.$message.error(err.msg)
        //        }
        //     })
        // }
    },

    components: {
        'v-menu': menu,
    },
}