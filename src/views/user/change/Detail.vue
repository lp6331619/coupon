<template>
    <div class="form">
      <div class="container change">
        <ul class="flex changeSelect">
          <li :class="{'active':select==1}" @click="setTab(1)">退款</li>
          <li :class="{'active':select==2}" @click="setTab(2)" v-if="subData.change=='1'">改签</li>
        </ul>
        <div class="f16" v-if="select==2">
          <div class="text p20">
            <div class="gray">改签说明</div>
            <p class="mt10">
              1、只改日期时间、不能改线路、姓名。<br>
              2、每个订单只能改签1次，改签后不能退票。<br>
              3、每个订单收取改签服务费10元人民币，如果下单改签的车次票已售完，改签服务费全额退还。<br>
              4、车次改签后，如有差价，多退少补。
            </p>
          </div>
          <el-form 
            class="formeBox p10" 
            label-position="left" 
            label-width="105px"
            :rules="rule_data"
            ref='dataBox'
            :model='dataBox'>
              <el-form-item
                  class="line c666 "
                  label="原订单日期">
                  <span class="fr f16">{{subData.depdate}}</span>
              </el-form-item>
              <el-form-item
                  class="line c666 right data"
                  label="改签日期">
                  <el-date-picker
                    v-model="dataBox.new_date"
                    type="date"
                    class="fr"
                    @change="picker"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item
                  class="line c666 "
                  label="改签时间">
                  <el-input v-model="dataBox.new_time" placeholder="如13:00"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div class="f16" v-else>
          <div class="text p20">
            <div class="gray">退款说明</div>
            <p class="mt10">自2015年5月1日起销售的旅行日期为2016年3月27日（含）之后的客票将按照新舱位顺序使用条件执行。该使用条件适用于国航实际承运及挂国航代号由其他航空公司承运的，使用国航国内运输客票自2015年5月1日起销售的旅行日期为2016年3月27日（含）之后的客票将按照新舱位顺序使用条件执行。该使用条件适用于国航实际承运及挂国航代号由其他航空公司承运的，使用国航国内运输客票</p>
          </div>
        </div>
      </div>
      <div class="el-btn-box">
        <el-button size="medium" class="el-btn-block" type="danger" @click="sub('dataBox')">确定</el-button>
      </div>
    </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        console.log(this.subData)
      },
      data(){
        return{
          select:1,
          subData:this.$route.query,
          dataBox:{
            new_date:''
          },
          rule_data:{}
        }
      },
      methods: {
        setTab(num){
          this.select=num
        },
        picker(date){
          this.dataBox.new_date=date
        },
        sub(ref){
          Indicator.open('加载中...');
          if(this.select=='2'){
            //改签
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.dataBox = Object.assign({}, this.dataBox, {
                        id: this.subData.id,
                    })
                    this.$$api_order_ticketOrder_change({
                         data     : this.dataBox,
                         fn       : data => {
                            Indicator.close();
                            this.$message.success('恭喜您申请改签成功！')
                            this.$router.push('/user/list?type=1&status=5')
                         },
                         errFn    : (err) => {
                            Indicator.close();
                            this.$message.error(err.msg)
                         }
                    })
                }
            })
          }else{
            //退款
            this.$$api_order_ticketOrder_refund({
                 data     : {id:this.subData.id},
                 fn       : data => {
                    Indicator.close();
                    this.$message.success('恭喜您申请退款成功！')
                    this.$router.push('/user/list?type=1&status=5')
                 },
                 errFn    : (err) => {
                    Indicator.close();
                    this.$message.error(err.msg)
                 }
            })
          }
        },

      },
      components: {}
    }
    </script>
</script>
<style lang="sass" scoped>
  .container
    background: #fff
    .changeSelect
      padding: 40px 0
      justify-content: center
      li
        width: 40%
        margin: 0 5%
        text-align: center
        line-height: 45px
        color: #999
        border: 1px solid #ddd
        font-size: 18px
        &.active
          position: relative
          border-color: #000
          color: #000
          &:before,&:after
            content: ''
            display: block
            position: absolute
            right: 0
            bottom: 0
          &:before
            width: 0; 
            height: 0; 
            border-bottom: 22px solid #000; 
            border-left: 22px solid transparent; 
          &:after
            width: 7px
            height: 4px
            bottom: 5px
            right: 2px
            border: 1px solid #fff
            border-width: 0 0 1px 1px
            transform: rotate(-45deg)
            -webkit-transform: rotate(-45deg)
    .text
      line-height: 26px
      padding-bottom: 30px
      border-bottom: 1px solid #ddd

</style>
