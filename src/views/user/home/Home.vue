<template>
    <div class="form">
        <v-menu></v-menu>
        <div class="container ">
          <div class="top text-center bgfff">
            <router-link to="/user/user">
              <img :src="img" alt="">
              <p class="name">{{VuexInfo.NickName}}</p>
              <!-- <div class="text gray">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-VIPgerenzhongxin" ></use>
              </svg>会员到期日2018.12.31</div> -->
            </router-link>
          </div>
          <div class="order bgfff mt10">
            <div class="title">票务订单 <span class="fr more gray" @click="toList(1,5)">查看所有票务订单 </span></div>
            <ul class="flex">
              <li class="flexLi" @click="toList(1,1)">
                  <span class="num">12</span>
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-daifukuan" ></use>
                  </svg> <p>待付款</p>
              </li>
              <li class="flexLi" @click="toList(1,2)">
                  <span class="num">2</span>
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-daichuhang" ></use>
                  </svg><p>待出行</p>
              </li>
              <li class="flexLi" @click="toList(1,3)">
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-daipingjia" ></use>
                  </svg><p>待评价</p>
              </li>
              <li class="flexLi" @click="toList(1,4)">
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-tuikuangaiqian" ></use>
                  </svg><p>退款/改签</p>
              </li>
            </ul>
          </div>
          <div class="order bgfff mt10">
            <div class="title">旅行订单 <span class="fr more gray" @click="toList(2,5)">查看所有旅行订单 </span></div>
            <ul class="flex">
              <li class="flexLi" @click="toList(2,1)">
                  <span class="num">12</span>
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-daifukuan" ></use>
                  </svg> <p>待付款</p>
              </li>
              <li class="flexLi" @click="toList(2,2)">
                  <span class="num">2</span>
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-daichuhang" ></use>
                  </svg><p>待出行</p>
              </li>
              <li class="flexLi" @click="toList(2,3)">
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-daipingjia" ></use>
                  </svg><p>待评价</p>
              </li>
              <li class="flexLi" @click="toList(2,4)">
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-tuikuangaiqian" ></use>
                  </svg><p>退款/改签</p>
              </li>
            </ul>
          </div>
          <div class="userLi bgfff mt10">
            <router-link class="rightText item" to="/">邀请有礼</router-link>
            <router-link class="rightText item" to="/traveler">消费券 <span class="red fr f12">2张待使用</span></router-link>
            <router-link class="rightText item" to="/user/coupon">优惠劵 <span class="red fr f12">1张可用</span></router-link>
            <router-link class="rightText item" to="/user/traveler">常用旅客</router-link>
          </div>
          <div class="contactUs text-center bgfff mt10">
            <a href="tel:13950186826">联系我们：400-820-8820</a>
          </div>
        </div>
    </div>
</template>
<script>
    import menu from '../../../components/menu/menu'
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
      },
      data(){
        return{
            img : require('../../../assets/images/head.jpg'),
            VuexInfo: this.headStatus ? this.$store.state.user.userinfo.user : {},
        }
      },
      methods: {
        toList(type,num){
          this.$router.push({
            path:'/user/list',
            query:{type:type,status:num}
          })
        }
      },
      computed: {
         
      },
      components: {
        'v-menu' : menu,
      }
    }
    </script>
</script>
<style scoped lang="sass">
  .top
    padding: 30px 0 20px
    img
      width: 100px
      height: 100px
      border-radius: 50%
    .name
      font-size: 16px
      margin-top: 5px
      line-height: 40px
    .text
      font-size: 12px
      .icon
        font-size: 23px
        vertical-align: middle
        margin-right: 5px
  .order
    padding-bottom: 10px
    .title
      padding: 0 10px 0 20px
      line-height: 50px
      color: #333
      .more
        font-size: 12px
        &:after
          content: ''
          display: inline-block
          vertical-align: 2px
          width: 5px
          height: 5px
          border: 1px solid #999
          border-width: 1px 1px 0 0
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
    li
      text-align: center
      position: relative
      .icon
        font-size: 26px
      .num
        position: absolute
        left: 50%
        top: -5px
        margin-left: 5px
        height: 15px
        line-height: 15px
        font-size: 12px
        font-weight: normal
        padding: 0 4px
        border-radius: 10px
        background: red
        color: #fff
      p
        font-size: 12px
        line-height: 30px
        color: #333
  .contactUs
    a
      padding: 15px
      display: block
      font-size: 16px
      color: #666
</style>
