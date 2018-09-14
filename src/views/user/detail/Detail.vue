<template>
    <div class="form">
      <div class="container">
        <div class="num gray f12">订单号：{{dataBox.order_sn}} <span class="fr">{{dataBox.ctime}}</span></div>
        <div class="top text-center bgfff mt10">
          <div class="f18 gray pt20" v-if="$route.query.status=='0'">待付款</div>
          <div class="f18 gray pt20" v-if="$route.query.status=='1'">待出票</div>
          <div class="f18 red pt20" v-else-if="$route.query.status=='2'">已出票</div>
          <div class="f18 gray pt20" v-else-if="$route.query.status=='3'">待评价</div>
          <div class="f18 gray pt20" v-else-if="$route.query.status=='5'">待退款</div>
          <div class="time f16">{{dataBox.depdate}}  {{dataBox.depart_time}}出发</div>
          <ul class="flex">
            <li class="overflow">{{dataBox.departure}}</li>
            <li class="conter overflow">{{dataBox.train_num}}</li>
            <li class="overflow">{{dataBox.arrival}}</li>
          </ul>
          <div class="mt10 line f16" v-if="this.dataBox.passagers!='null'">
            <ul>
              <li v-for="(item,index) in dataBox.passagersBox">
                <p><span class="gray">出行人</span>{{item.FamilyName}}{{item.GivenName}}</p>
                <p><span class="gray">护照号</span>{{item.CertNo}}</p>
              </li>
            </ul>
          </div>
          <div class="price">
            <span class="gray">订单金额</span>
            <span class="red"><strong class=" f22">{{dataBox.pay_money}}</strong>{{dataBox.currency}}</span>
          </div>
        </div>
        <div class="mt10 bgfff Refund p20" v-if="dataBox.status=='4' || dataBox.status=='5'">
          <div class="title f16">退款进度</div>
          <ul class="flex">
            <li>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-rightActive"></use>
              </svg>
              <p>提交申请</p>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-dengdaishenhe"></use>
              </svg>
              <p>等待审核</p>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tijiaoshenqing"></use>
              </svg>
              <p>退款成功</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="el-btn-box">
        <el-button v-if="dataBox.status==0" size="medium" class="el-btn-block" type="danger" @click="pay()">支付订单</el-button>
        <el-button v-if="dataBox.status==0" size="medium" class="el-btn-block mt20" type="danger" @click="cancel()">取消订单</el-button>
     <!--    <el-button v-if="dataBox.status==5" size="medium" class="el-btn-block mt20" type="danger" @click="$router.push('/user/success')">取消退款</el-button> -->
        <el-button v-if="dataBox.status==3" size="medium" class="el-btn-block mt20" type="danger" @click="$router.push('/user/success')">去评价</el-button>
        <el-button v-if="dataBox.status == 2 || dataBox.status == 3" size="medium" class="el-btn-block mt20" type="danger" @click="$router.push(`/user/change?id=${dataBox.id}&depdate=${dataBox.depdate}&change=1`)">改签/退款</el-button>
      </div>
      <!--成功提示-->
      <el-dialog
        title="成功"
        :show-close="false"
        :visible.sync="success"
        size="full">
        <v-Success :config="successConfig"></v-Success>
      </el-dialog>
    </div>
</template>
<script>
    import {Indicator} from 'mint-ui';
    import Success from '../../../components/success/success'
    export default {
      name: 'home',
      created() {
        this.getList()
      },
      data(){
        return{
            dataBox:{},
            rule_data:{},
            //成功提示
            success:false,
            successConfig:{
              coupon:false,//是否有优惠券
              url:'/user/list?type=1&status=5',//跳转链接
            }
        }
      },
      methods: {
        // 
        getList(){
          Indicator.open('加载中！')
          this.$$api_order_ticketOrder_detail({
               data     : this.$route.query,
               fn       : data => {
                  Indicator.close();
                  this.dataBox=data
                  let passagersBox = JSON.parse(this.dataBox.passagers);
                  this.$set(this.dataBox,'passagersBox',passagersBox)
               },
               errFn    : (err) => {
                  Indicator.close();
                  this.$message.error(err.msg)
               }
          })
        },
        pay(){//支付订单
          let typeNum = 1;
          if (this.dataBox.type == '2') {
              typeNum = 8;
          } else if (this.dataBox.type == '4') {
              typeNum = 2;
          } else if (this.dataBox.type == '1') {
              typeNum = 1;
          } else if (this.dataBox.type == '3') {
              typeNum = 4;
          }
          this.$$api_public_payDopay({
              data     : { ticket_order_id : this.dataBox.id,pay_type: 1,type: typeNum},
              fn       : data => {
                  var _this = this
                  wx.config({
                      debug: false, 
                      appId: data.AppID, // 必填，公众号的唯一标识
                      timestamp: data.TimeStamp, // 必填，生成签名的时间戳
                      nonceStr: data.NonceStr, // 必填，生成签名的随机串
                      signature: data.SignType,// 必填，签名
                      jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
                  });
                  wx.error(function(res){
                      _this.$message.error(res)
                      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                  })
                  wx.chooseWXPay({
                    timestamp: data.TimeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: data.NonceStr, // 支付签名随机串，不长于 32 位
                    package: data.Package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: data.PaySign, 
                    success: function (res) {
                        _this.successConfig={
                          coupon:false,//是否有优惠券
                          url:"/user/list?type=1&status=5",//跳转链接
                        }
                        _this.success=true
                      // 支付成功后的回调函数
                    }
                  });
              },
              errFn    : (err) => {
                  this.$message.error(err.msg);
              },
          })
        },
        cancel(){
          this.$confirm('是否确定取消订单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$$api_order_ticketOrder_cancel({
                data     : {id:this.$route.query.id},
                fn       : data => {
                    this.$message.success('恭喜您订单成功取消！');
                    this.$router.push('/user/list?type=1&status=5')
                },
                errFn    : (err) => {
                    this.$message.error(err.msg);
                },
            })
          }).catch(() => { });
        }
      },
      components: {
        'v-Success' : Success
      }
    }
    </script>
</script>
<style lang="sass" scoped>
  .container
    padding: 10px
    .top
      border-radius: 3px
      .time
        line-height: 50px
      .flex
        justify-content: space-around
        line-height: 80px
        font-size: 16px
        li
          width: 30%
          font-size: 20px
        .conter
          position: relative
          font-size: 12px
          width: 20%
          &:before
            content: ''
            width: 100%
            height: 1px
            position: absolute
            left: 0
            bottom: 24px
            background: #666
          &:after
            content: ''
            position: absolute
            right: 0
            bottom: 26px
            width: 6px
            height: 1px
            background: #666
            transform: rotate(45deg)
      .line
        text-align: left
        border: 1px solid #ddd
        border-width: 1px 0
        padding: 10px 20px
        li
          padding: 10px 0
          line-height: 30px
          .gray
            font-size: 14px
            width: 70px
            display: inline-block
      .price
        text-align: left
        padding: 20px
        .gray
          display: inline-block
          width: 70px
    .Refund
      border-radius: 3px
      ul
        padding: 20px 0 0
      li
        position: relative
        text-align: center
        width: 33.33%
        &:after
          content: ''
          position: absolute
          left: 50%
          width: 100%
          top: 10px
          height: 1px 
          background: #000
        &:last-child:after
          display: none
        .icon
          position: relative
          z-index: 2
          font-size: 20px
        p
          font-size: 12px
          margin-top: 5px
  .el-btn-box
    .el-button
      background: none
      color: #ff4949
      margin-left: 0

</style>
