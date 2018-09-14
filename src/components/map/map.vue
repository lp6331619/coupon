<template>
    <div class="mapBox">
        12312312312312
    </div>
</template>
<script>
    // 引入mint全部组件
    import {Indicator} from 'mint-ui';
    export default {
      name: 'home',
      props:{
        config:{
          url:Boolean,//是后退还是关闭弹窗
          ticket_id:Number//请求优惠券获取的id
        }
      },
      created() {
        this.getList()
      },
      data(){
        return{
           list:[],
           dialogDetail:false,
           formBox:{},
           rule_data:{},
        }
      },
      methods: {
        getList(){
          // Indicator.open('加载中！')
          this.$$api_public_jssdk_config({
              data     : {url:'http://wxapp.quitang.com/pay/detail'},
              fn       : data => {
                console.log(data)
                
                wx.config({//地图接口配置
                    debug: false,
                    appId: data.appid,
                    timestamp: data.timestamp,
                    nonceStr: data.noncestr,
                    signature: data.sign,
                    jsApiList: [
                      'openLocation',
                      'getLocation',
                    ]
                });

                wx.getLocation({  
                   type : 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
                    success : function(res) {  
                      alert(111)
                     //使用微信内置地图查看位置接口  
                      wx.openLocation({  
                          latitude : res.latitude, // 纬度，浮点数，范围为90 ~ -90  
                          longitude : res.longitude, // 经度，浮点数，范围为180 ~ -180。  
                          name : '我的位置', // 位置名  
                          address : '苏大夫就邓帅分', // 地址详情说明  
                          scale : 28, // 地图缩放级别,整形值,范围从1~28。默认为最大  
                          infoUrl : 'http://www.gongjuji.net' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）  
                      });  
                    },  
                    cancel : function(res) {  
                         alert(222)
                    }  
                });  
              },
              errFn    : (err) => {
                  Indicator.close();
                  this.$message.error(err.msg)
              }
          })
        },
        //返回
        back(item){
          if(this.config.url){
            this.$emit('setCoupon',item)
          }
        },
      },
      components: {}
    }
    </script>
</script>
<style lang="sass" scoped>
  .moreBox
    padding: 0 10px 10px
    li
      background: #fff
      position: relative
      padding: 10px 80px 10px 100px
      .price
        position: absolute
        left: 10px
        top: 10px
        width: 75px
        .red
          font-size: 26px
          line-height: 46px
          font-weight: bold
          i
            position: relative
            top: -4px
            left: -2px
            font-size: 12px
            font-weight: normal
            vertical-align: top
            font-style: normal
        p
          font-size: 12px
          color: #999
      .center
        text-align: left
        .name
          color: #333
          font-size: 16px
          font-weight: bold
          line-height: 30px
        .text
          color: #999
          font-size: 12px
          margin-top: 5px
      .right
        position: absolute
        right: 10px
        top: 50%
        margin-top: -10px
        .el-button
          padding: 7px 13px
          border-radius: 15px
</style>
