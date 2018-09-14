<template>
    <div class="form">
      <div class="container text-center">
        <div class="success">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhifuchenggong"></use>
          </svg>
          <p>改签成功!</p>
        </div>
        <div class="el-btn-box">
          <el-button size="medium" @click="$router.push('/user/list')">返回订单</el-button>
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
</style>
