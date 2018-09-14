<template>
    <div class="form">
      <div class="container text-center">
        <div class="success">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhifuchenggong"></use>
          </svg>
          <p>{{config.text ? config.text : '支付成功'}}!</p>
        </div>
        <div class="el-btn-box">
          <el-button size="medium" @click="back()">查看订单</el-button>
        </div>
        <div class="moreBox" v-if="config.coupon">
          <div class="title">恭喜您获得新的商品优惠劵！</div>
          <ul class="pt10">
            <li class="mt10">
              <div class="price text-center">
                <div class="red"><i>¥</i>120</div>
                <p>满200可用</p>
              </div>
              <div class="center ">
                <div class="name overflow">旅游产品专用</div>
                <div class="text">限2018-01-01当天使用<br>限该账号用户下单使用</div>
              </div>
              <div class="right ">
                <el-button size="small" type="danger">去使用</el-button>
              </div>
            </li>
            <li class="mt10">
              <div class="price text-center">
                <div class="red"><i>¥</i>120</div>
                <p>满200可用</p>
              </div>
              <div class="center ">
                <div class="name overflow">旅游产品专用</div>
                <div class="text">限2018-01-01当天使用<br>限该账号用户下单使用</div>
              </div>
              <div class="right ">
                <el-button size="small" type="danger">去使用</el-button>
              </div>
            </li>
            <li class="mt10">
              <div class="price text-center">
                <div class="red"><i>¥</i>120</div>
                <p>满200可用</p>
              </div>
              <div class="center ">
                <div class="name overflow">旅游产品专用</div>
                <div class="text">限2018-01-01当天使用<br>限该账号用户下单使用</div>
              </div>
              <div class="right ">
                <el-button size="small" type="danger" @click="$router.push('/home')">去使用</el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
      name: 'home',
      props:{
        config:{
          coupon:Boolean,//是后退还是关闭弹窗
          url:String,//跳转链接
          text:String
        }
      },
      created() {
        console.log(this.config)
      },
      data(){
        return{
            
        }
      },
      methods: {
        back(){
          this.$router.push(this.config.url)
        }
      },
      components: {}
    }
    </script>
</script>
<style lang="sass" scoped>
  .container
    background: #fff
  .success
    padding: 100px 0 30px
    .icon
      font-size: 4rem
    p
      line-height: 50px
      font-size: 16px
  .moreBox
    padding: 10px
    li
      position: relative
      padding: 10px 80px 10px 100px
      border: 1px solid #ddd
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
