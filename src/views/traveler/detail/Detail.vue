<template>
    <div class="form">
      <div class="container">
        <div class="title f20"><strong>亚力新体委滑雪场门票</strong></div>
        <div v-if="$route.query.status==1">
          <p class="gray f14 small text-center">凭以下二维码向商家验证即可</p>
          <div class="code mt20">
            <img src="../../../assets/images/code2.png" alt="">
            <p class="f16">133-980-4567787-23</p>
          </div>
        </div>
        <div v-else-if="$route.query.status==2">
          <p class="gray f14 small text-center">凭以下图片向商家验证即可</p>
          <div class="code2 mt20">
            <img src="../../../assets/images/coming1.jpg" alt="">
            <img src="../../../assets/images/coming2.jpg" alt="">
            <img src="../../../assets/images/coming3.jpg" alt="">
            <img src="../../../assets/images/coming4.jpg" alt="">
            <img src="../../../assets/images/coming5.jpg" alt="">
            <img src="../../../assets/images/coming6.jpg" alt="">
          </div>
        </div>
        <div v-else-if="$route.query.status==3">
          <p class="gray f14 small text-center">凭以下文档向商家验证即可</p>
          <div class="code3 mt20">
            <li><span>pdf</span>验证须知文档</li>
            <li><span>pdf</span>验证须知文档</li>
            <li><span>pdf</span>验证须知文档</li>
            <li><span>pdf</span>验证须知文档</li>
          </div>
        </div>
        <div v-else-if="$route.query.status==4">
          <p class="gray f14 small text-center">凭以下文本向商家验证即可</p>
          <div class="code4 mt20">
            The use of notes is used for the exchange of products.
          </div>
        </div>
        <div class="info">
          <ul>
            <li><span class="gray">地址</span>黑龙江省哈尔滨市尚志市亚布力滑雪旅游度假区</li>
            <li><span class="gray">服务电话</span>4006-258-258</li>
            <li class="line"></li>
            <li><span class="gray">使用日期</span>2017年2月27日 星期二</li>
            <li><span class="gray">购买份数</span>2份</li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        
      },
      data(){
        return{
        
        }
      },
      methods: {
        del(index){
          this.peoper.splice(index,1)
        }
      },
      components: {}
    }
    </script>
</script>
<style lang="sass" scoped>
  .container
    background: #fff
    .title
      padding: 30px 20px 10px
      text-align: center
    .code
      padding: 20px
      text-align: center
      img
        width: 200px
        height: 200px
    .code2
      text-align: center
      padding-bottom: 40px
      img
        display: inline-block
        margin: 5px 3px
        width: 96px
        height: 96px
    .code3
      padding: 10px 20px
      li
        position: relative
        padding-left: 60px
        line-height: 70px
        span
          position: absolute
          left: 0
          top: 10px
          display: block
          width: 50px
          height: 50px
          background: #fd697a
          color: #fff
          text-align: center
          line-height: 50px
        &:before
          content: ''
          position: absolute
          left: 0
          right: -20px
          height: 1px 
          background: #eee
        &:first-child:before
          display: none
    .code4
      padding: 10px 20px 40px
    .line
      border-top: 1px solid #eee
    .info
      border-top: 1px solid #eee
      ul
        padding: 20px
      li
        position: relative
        line-height: 25px
        padding: 0 0 10px 80px
        .gray
          position: absolute
          left: 0
          top: 0
    

</style>
