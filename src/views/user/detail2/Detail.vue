<template>
    <div class="form">
      <div class="container">
        <div class="num gray f12">订单号：{{dataBox.order_sn}} <span class="fr">{{dataBox.ctime}}</span></div>
        <div class="top bgfff mt10">
          <div class="box f16">
            <h3 class="title f18">{{dataBox.goods_name}}
              <span class="f12 gray pt20" v-if="$route.query.status=='0' || $route.query.status=='1' || $route.query.status=='2'">待付款</span>
              <span class="f12 red pt20" v-else-if="$route.query.status=='3'">待出票</span>
              <span class="f12 gray pt20" v-else-if="$route.query.status=='5'">待评价</span>
              <span class="f12 gray pt20" v-else-if="$route.query.status=='7'">待退款</span>
            </h3>
            <div class="mt10 line f16" v-if="this.dataBox.passagers!='null'">
            <ul>
              <li v-for="(item,index) in dataBox.passagersBox">
                <p><span class="gray">出行人</span>{{item.FamilyName}}{{item.GivenName}}</p>
                <p><span class="gray">护照号</span>{{item.CertNo}}</p>
              </li>
            </ul>
          </div>
          </div>
          <div class="price line">
            <span class="gray">订单金额</span>
            <span class="red">¥ <strong class=" f22"> {{dataBox.total_money}}</strong></span>
          </div>
        </div>
      </div>
      <div class="mt10 bgfff Refund p20"  v-if="dataBox.status=='5'">
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
      <div class="el-btn-box">
        <el-button v-if="dataBox.status==0" size="medium" class="el-btn-block" type="danger" @click="pay()">支付订单</el-button>
        <el-button v-if="dataBox.status==0" size="medium" class="el-btn-block mt20" type="danger" @click="cancel()">取消订单</el-button>
        <!-- <el-button v-if="dataBox.status==5" size="medium" class="el-btn-block mt20" type="danger" @click=""></el-button> -->
        <el-button v-if="dataBox.status==5" size="medium" class="el-btn-block mt20" type="danger" @click="comment()">去评价</el-button>
        <el-button v-if="dataBox.status == 2 || dataBox.status == 3" size="medium" class="el-btn-block mt20" type="danger" @click="$router.push(`/user/change?id=${dataBox.id}&depdate=${dataBox.depdate}`)">改签/退款</el-button>
      </div>
      <!-- 评论 -->
      <el-dialog
        class="commentBox"
        :show-close="false"
        :visible.sync="commentBoo"
        size="full">
        <div class="Comment p20">
          <v-evaluate :config="evaluateConfig" @setEvaluate="setEvaluate"> </v-evaluate>
        </div>
      </el-dialog>
      <el-dialog
        title="成功"
        :show-close="false"
        :visible.sync="success"
        size="full">
        <v-Success :config="successConfig" @setCoupon="setSuccess"></v-Success>
      </el-dialog>
    </div>
</template>
<script>
    import {Indicator} from 'mint-ui';
    import Success from '../../../components/success/success';
    import Evaluate from '../../../components/evaluate/evaluate';

    export default {
      name: 'home',
      created() {
        this.getList()
      },
      data(){
        return{
            dataBox:{},
            rule_data:{},
            commentBoo:false,
            //成功提示
            success:false,
            successConfig:{
              coupon:false,//是否有优惠券
              url:'/user/list?type=2&status=5',//跳转链接
              text:'申请退款成功'
            },
            subBox:{},
            evaluateConfig:{
              // coupon:true,//是后退还是关闭弹窗
              // url:'',//跳转链接
              data:[]
            },
        }
      },
      methods: {
        getList(){
          Indicator.open('加载中！')
          this.$$api_order_order_detail({
               data     : this.$route.query,
               fn       : data => {
                  Indicator.close();
                  this.dataBox=data
                  this.evaluateConfig.data = data
                  let passagersBox = JSON.parse(this.dataBox.passagers);
                  this.$set(this.dataBox,'passagersBox',passagersBox)
               },
               errFn    : (err) => {
                  Indicator.close();
                  this.$message.error(err.msg)
               }
          })
        },
        comment(){//评论
          this.commentBoo=true
          this.successConfig={
            coupon:false,//是否有优惠券
            url:'/user/list?type=2&status=3',//跳转链接
            text:'评论成功'
          }
        },
        setEvaluate(data){
          this.commentBoo=false
          this.success=true
        },
        setSuccess(){},
        pay(){//支付订单
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
              data     : {order_id: this.dataBox.id,pay_type: 1,type: typeNum},
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
                          url:"/user/list?type=2&status=5",//跳转链接
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
        cancel(){//取消
          this.$$api_order_ticketOrder_cancel({
              data     : {id:this.$route.query.id},
              fn       : data => {
                  this.$message.success('恭喜您订单成功取消！');
                  this.$router.push('/user/list?type=2&status=5')
              },
              errFn    : (err) => {
                  this.$message.error(err.msg);
              },
          })
        },
      },
      components: {
        'v-Success' : Success,
        'v-evaluate' : Evaluate
      }
    }
</script>
<style lang="sass" scoped>
  .container
    padding: 10px
    .top
      border-radius: 3px
      padding: 10px 20px
      .line
        border-top: 1px solid #eee
      .box
        text-align: left
        border-width: 1px 0
        padding-top: 10px
        li
          padding: 10px 0
          line-height: 30px
          p
            padding: 0 0 10px 80px
            position: relative
            line-height: 22px
          .gray
            font-size: 14px
            position: absolute
            left: 0
            top: 0
            width: 70px
            display: inline-block
      .price
        text-align: left
        padding: 10px 0
        .gray
          display: inline-block
          width: 70px
  .el-btn-box
    .el-button
      background: none
      color: #ff4949
      margin-left: 0
    .el-button+.el-btn-block
      margin: 10px 0 0 0
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
  .Comment
    .manyi
      line-height: 50px
      border-bottom: 1px solid #ddd
</style>
