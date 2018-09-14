export default {
    created() {
        if (this.$route.query) {
            this.getList()
        }
        console.log(this.$route,111)
    },
    data() {
        return {
            dataBox: {
                spec: []
            },
            formBox: {
                use_time: '',
            },
            Evaluation: [], //评价
            rule_data: {
                use_time: [{
                    required: true,
                    message: '不能为空！',
                }],
                spec: [{
                    required: true,
                    message: '不能为空！',
                }],
            },
            dialogVisible: false,
            dialogVisible2: false,
            comment: false,//评论
            height: {},
            specPrice: 0,
            mapSrc: '',
            stat:['1','2','3','4','5']
        }
    },
    methods: {
        // init(lat, lng) {
        //     var center = new qq.maps.LatLng(lng, lat);
        //     var map = new qq.maps.Map(document.getElementById("mapBox"), {
        //         center: center,
        //         zoom: 13
        //     });
        //     var info = new qq.maps.InfoWindow({ map: map });
        //     var marker = new qq.maps.Marker({
        //         position: center,
        //         map: map,
        //     });
            // var uluru = {
            //     lat: -25.363,
            //     lng: 131.044
            // };
            // var map = new google.maps.Map(document.getElementById('mapBox'), {
            //     zoom: 4,
            //     center: uluru
            // });
            // var marker = new google.maps.Marker({
            //     position: uluru,
            //     map: map
            // });

        // },
        setBox(item, itemChild) {
            item.child.forEach((itemBox) => {
                this.$set(itemBox, 'status', false)
            })
            itemChild.status = true
        },
        determine() {
            let status = false;
            let num = 0;
            let text = '';
            let price = 0;
            let priceChild = 0;
            let sort = 's';
            this.dataBox.spec.forEach((item) => {
                item.child.forEach((child, index) => {
                    if (child.status == true) {
                        text += child.name + '+';
                        sort += index.toString()
                        num++
                    }
                })
            })
            if (num >= this.dataBox.spec.length) {
                this.formBox.spec = text.substring(0, text.length - 1);
                this.formBox.price = this.dataBox.spec_price[sort].price;
                this.formBox.children_price = this.dataBox.spec_price[sort].children_price;
                this.formBox.specPrice = this.formBox.price;
                this.dialogVisible = !this.dialogVisible
            } else {
                this.$message.error(`请选择至少${this.dataBox.spec.length}个装备！`)
            }
        },
        SwiperSlid: function(obj) {
            var mySwiper = new Swiper(obj, {
                autoplay: 5000,
                pagination: '.swiper-pagination',
            });
        },
        sortNumber(a, b) {
            return a - b
        },
        commentBox(){//评论列表请求
            this.comment = true
        },
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
        //获取数据
        getList() {
            this.$$api_product_detail({
                data: this.$route.query,
                fn: data => {
                    this.dataBox = data
                    this.$nextTick(function() {
                        // this.mapShow(this.dataBox.lng, this.dataBox.lat,this.dataBox.name)
                        // this.init(this.dataBox.lat, this.dataBox.lng)
                    //     // 39.908491, 116.374328  C75BZ-ZOWHD-J3A4J-HFA42-CPWJV-YSF3P
                    //     // this.mapSrc = `http://www.google.cn/maps/place/地址/@${this.dataBox.lat},${this.dataBox.lng},7z/`
                            // this.mapSrc = `http://3gimg.qq.com/lightmap/v1/marker/?marker=coord%3A39.892326%2C116.342763%3Btitle%3A%E8%B6%85%E5%A5%BD%E5%90%83%E5%86%B0%E6%BF%80%E5%87%8C%3Baddr%3A%E6%89%8B%E5%B8%95%E5%8F%A3%E6%A1%A5%E5%8C%97%E9%93%81%E8%B7%AF%E9%81%93%E5%8F%A3&referer=myapp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`
                    })
                    if (this.dataBox.imgs.length > 0) { //图片
                        if (this.dataBox.imgs[this.dataBox.imgs.length - 1] == ',') {
                            this.dataBox.imgs = this.dataBox.imgs.slice(0, this.dataBox.imgs.length - 1)
                        }
                        let urlBox = this.dataBox.imgs.split(',')
                        this.$set(this.dataBox, 'url', urlBox)
                        this.$nextTick(function() { //banner
                            this.SwiperSlid('#swiperBox');
                            this.height = Object.assign({}, this.height, {
                                height: this.$refs.imgBox[0].offsetWidth / 4 * 3 + 'px'
                            })
                        })
                    }
                    //评价
                    this.$$api_order_comment({
                        data: { pid: this.dataBox.id },
                        fn: data => {
                            this.Evaluation = data
                            this.Evaluation.forEach((item)=>{
                                if(item.imgs && item.imgs[item.imgs.length-1]==','){
                                    let str = item.imgs.substring(0,item.imgs.length-1).split(",")
                                    this.$set(item,'imgBox',str);
                                }
                            })
                            console.log(this.Evaluation)
                        },
                        errFn: (err) => {
                            this.$message.error(err.msg)
                        }
                    })
                        //规格
                    if (this.dataBox.spec.length > 0) {
                        let priceBox = []
                        for (let i in this.dataBox.spec_price) {
                            priceBox.push(this.dataBox.spec_price[i].price)
                        }
                        this.specPrice = priceBox.sort(this.sortNumber)[0]
                    }
                },
                errFn: (err) => {
                    Indicator.close();
                    this.$message.error(err.msg)
                }
            })

        },
        timeUse(time) {
            this.formBox.use_time = time
        },
        goDetail(ref) {
            let subData = this.formBox
            subData = Object.assign({}, subData, {
                goods_id: this.dataBox.id,
                name: this.dataBox.name,
                is_passport: this.dataBox.is_passport, //护照开启
                is_children_price: this.dataBox.is_children_price, //儿童价开启
                type: this.dataBox.type,
                sub_type: this.dataBox.sub_type,
                price: this.formBox.price ? this.formBox.price : '',
                children_price:this.formBox.children_price ? this.formBox.children_price : '',
                specPrice:this.formBox.specPrice ? this.formBox.specPrice : ''
            });
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('get_listTickey', {
                        listTickey: subData
                    }).then(() => {
                        this.$router.push({
                            path: '/pay/formDetail',
                        })
                    })
                }
            })
        }
    },
    components: {}
}