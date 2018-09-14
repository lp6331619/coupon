<template>
    <div class="form">
      <div class="container">
        <div class="top bgfff ">
          <div class="box f16">
            <h3 class="title f18">亚布力新体委滑雪场门票</h3>
            <div class="gray mt20 f12">
              自2015年5月1日起销售的旅行日期为2016年3月27日（含）之后的客票将按照新舱位顺序使用条件执行该使用条件适用于国航实际承运及挂国航代号由其他航空公司承运的，使用国航国内运输客票（包括使用“999”确认的BSP客票）填开的锅内航线（不含港、澳、台地区航线）运输，以及与国航签有子舱位销售协议，并使用其它航空公司客票填开的国航国内航线运输。
            </div>
          </div>
          <div class="price line">
            <span class="gray">订单金额</span>
            <span class="red">¥<strong class=" f22">340</strong></span>
          </div>
        </div>
      </div>
      <div class="el-btn-box">
        <el-button size="medium" class="el-btn-block" type="danger" @click="$router.push('/user/success')">确认并支付 ¥30</el-button>
      </div>
    </div>
</template>
<script>
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        if(this.$route.query.status){
          
        }
      },
      data(){
        return{
            mainHeight:{
              height:'0',
              overflow:'auto'
            },
            dataBox:{},
            rule_data:{},
            peoper:[{
              name:'江南',
              num:'213124120984091284908120'
            },{
              name:'江南',
              num:'213124120984091284908120'
            },{
              name:'江南',
              num:'213124120984091284908120'
            },{
              name:'江南',
              num:'213124120984091284908120'
            }]

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
        padding: 10px 0 10px 20px
        margin: 20px -20px 0
        .gray
          display: inline-block
          width: 70px
  .el-btn-box

</style>
