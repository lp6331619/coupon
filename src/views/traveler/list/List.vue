<template>
    <div class="form">
      <v-menu></v-menu>
      <div class="container ">
          <ul class="list p10">
            <li @click="$router.push('/traveler/detail?status=1')">
              <div class="name f16">亚布力新体委滑雪场门票</div>
              <p class="gray f12">12月28日 星期四</p>
              <p class="gray f12">2人</p>
              <div class="nameBox mt10">林佳辰 张宇</div>
              <div class="code"><img src="../../../assets/images/code.jpg" alt=""></div>
            </li>
            <li @click="$router.push('/traveler/detail?status=2')">
              <div class="name f16">亚布力新体委滑雪场门票</div>
              <p class="gray f12">12月28日 星期四</p>
              <p class="gray f12">2人</p>
              <div class="nameBox mt10">林佳辰 张宇</div>
            </li>
            <li @click="$router.push('/traveler/detail?status=3')">
              <div class="name f16">亚布力新体委滑雪场门票</div>
              <p class="gray f12">12月28日 星期四</p>
              <p class="gray f12">2人</p>
              <div class="nameBox mt10">林佳辰 张宇</div>
            </li>
            <li @click="$router.push('/traveler/detail?status=4')">
              <div class="name f16">亚布力新体委滑雪场门票</div>
              <p class="gray f12">12月28日 星期四</p>
              <p class="gray f12">2人</p>
              <div class="nameBox mt10">林佳辰 张宇</div>
            </li>
          </ul>
      </div>
    </div>
</template>
<script>
    // 引入mint全部组件
    import menu from '../../../components/menu/menu'
    import {Indicator} from 'mint-ui';
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

      },
      components: {
        'v-menu' : menu,
      }
    }
    </script>
</script>
<style lang="sass" scoped>
  .list
    padding-top: 0 !important
    li
      position: relative
      padding: 10px 20px
      margin-top: 10px
      line-height: 25px
      background: #fff
      .code
        position: absolute
        right: 10px
        bottom: 10px
        width: 40px
        height: 40px
        img
          width: 100%

</style>
