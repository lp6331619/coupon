<template>
    <div class="form">
        <div class="container">
            <div class="moreBox">
              <ul v-if="list.length>0">
                <li class="mt10" v-for="(item,index) in list" :key="index">
                  <div class="price text-center">
                    <div class="red"><i>¥</i>{{item.value}}</div>
                    <p>满{{item.use_condition}}可用</p>
                  </div>
                  <div class="center ">
                    <div class="name overflow">{{item.name}}</div>
                    <div class="text">限{{item.start_date}}~{{item.end_date}}使用<br>{{item.desc}}</div>
                  </div>
                  <div class="right " v-if="config.url">
                    <el-button size="small" type="danger" @click="back(item)">去使用</el-button>
                  </div>
                </li>
              </ul>
              <div v-else class="noneData">暂无优惠券</div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    // 引入mint全部组件
    import {Indicator} from 'mint-ui';
    export default {
      name: 'home',
      props:{
        config:{
          url:Boolean,//是后退还是关闭弹窗
          ticket_id:Number//请求优惠券获取的id
        }
      },
      created() {
        this.getList()
      },
      data(){
        return{
           list:[],
           dialogDetail:false,
           formBox:{},
           rule_data:{},
        }
      },
      methods: {
        getList(){
          Indicator.open('加载中！')
          this.$$api_shop_coupon_lists({
              data     : this.config,
              fn       : data => {
                Indicator.close();
                this.list=data
              },
              errFn    : (err) => {
                  Indicator.close();
                  this.$message.error(err.msg)
              }
          })
        },
        //返回
        back(item){
          if(this.config.url){
            this.$emit('setCoupon',item)
          }
        },
        
      },
      components: {}
    }
    </script>
</script>
<style lang="sass" scoped>
  .noneData
    line-height: 200px
    text-align: center

  .moreBox
    padding: 0 10px 10px
    li
      background: #fff
      position: relative
      padding: 10px 80px 10px 100px
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
