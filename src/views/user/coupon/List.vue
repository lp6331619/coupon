<template>
    <div class="form">
      <v-coupon :config="couponConfig" @setCoupon="setCoupon"></v-coupon>
    </div>
</template>
<script>
    // 引入mint全部组件
    import Coupon from '../../../components/coupon/coupon'
    import {Indicator} from 'mint-ui';
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        
      },
      data(){
        return{
          couponConfig:{
            url:false,//是后退还是关闭弹窗,
            ticket_id:0,
          },
        }
      },
      methods: {
        setCoupon(data){//优惠券返回数据

        },
      },
      components: {
        'v-coupon' : Coupon
      }
    }
    </script>
</script>
<style lang="sass" scoped>
  
  
</style>
