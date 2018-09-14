<template>
    <div class="form">
      <div class="container">
          <div class="topBox">
            <ul class="flex">
           <!--    <li class="flexLi" :class="{'active':selected==1}" @click="tab(1)">待付款</li> -->
              <li class="flexLi" :class="{'active':type=='1'}" @click="tab('1')">票务订单</li>
              <li class="flexLi" :class="{'active':type=='2'}" @click="tab('2')">旅行订单</li>
            </ul>
          </div>
          <div class="topBox topBox2">
            <ul class="flex">
           <!--    <li class="flexLi" :class="{'active':selected==1}" @click="tab(1)">待付款</li> -->
              <li class="flexLi" :class="{'active':selected==1}" @click="tab2(1)">待确认</li>
              <li class="flexLi" :class="{'active':selected==2}" @click="tab2(2)">待出行</li>
              <li class="flexLi" :class="{'active':selected==3}" @click="tab2(3)">待评价</li>
              <li class="flexLi" :class="{'active':selected==4}" @click="tab2(4)"> {{type=='2'?'退款' :'退款/改签'}}</li>
              <li class="flexLi" :class="{'active':selected==5}" @click="tab2(5)">全部</li>
            </ul>
          </div>
          <div class="mainHeight" >
              <div class="loadmore">
                <ul>
                  <!-- 旅行订单 -->
                  <li v-if="type=='2'" @click="toDetil2(item)" v-for="(item,index) in list">
                      <div class="name  clearfix f16 pr100">{{item.goods_name}} <span class="red f22 fr price">${{item.total_money}}</span></div>
                      <div class="time gray f12">{{item.use_time}} </div>
                      <div class="time gray f12">{{item.adult_num}}张
                        <span class="fr red" v-if="item.status==1" >出票中</span>
                        <span class="fr gray" v-else-if="item.status==2">已出票</span>
                        <el-button v-else-if="item.status==0" class="fr" type="danger" size="small">立即支付</el-button>
                        <el-button v-else-if="item.status==3" class="fr" type="danger" size="small">立即评价</el-button>
                        <span class="fr red" v-if="selected==4">查看进度</span>
                      </div>
                      <div class="nameBox">
                         <span v-for="(passagers,index) in item.passagersBox" :key="index">{{passagers.FamilyName}}{{passagers.GivenName}}</span>
                      </div>
                  </li> 
                  <!-- 票务订单 -->
                  <li v-if="type=='1'" v-for="item in list" @click="toDetail(item)">
                      <div class="name clearfix f16">
                        {{item.id}} 
                        {{item.departure}} 
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-liebiaojiantou"></use>
                        </svg>
                        {{item.arrival}}
                        <span class="red f22 fr">${{item.total_money}}</span>
                      </div>
                      <div class="time gray f12">
                       出发时间：{{item.depdate}}&nbsp;&nbsp;{{item.depart_time}} ~ {{item.arrive_time}}</div>
                      <div class="time gray f12">
                        <span v-if="item.adult_num>0">成人{{item.adult_num}}张 </span>
                        <span v-if="item.children_num>0">  
                        儿童{{item.children_num}}张 
                        </span>
                        <span class="fr red" v-if="item.status==1" >出票中</span>
                        <span class="fr gray" v-else-if="item.status==2">已出票</span>
                        <el-button v-else-if="item.status==0" class="fr" type="danger" size="small">立即支付</el-button>
                        <el-button v-else-if="item.status==3" class="fr" type="danger" size="small">立即评价</el-button>
                        <span class="fr red" v-if="selected==4">查看进度</span>
                      </div>
                      <div class="nameBox">
                         <span v-for="(passagers,index) in item.passagersBox" :key="index">{{passagers.FamilyName}}{{passagers.GivenName}}</span>
                      </div>
                  </li>
                </ul>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
  import ListJs from './List.js';
  export default ListJs;
</script>
<style lang="sass" scoped>
  .topBox
    position: fixed
    left: 0
    right: 0
    top: 0
    z-index: 10
    font-size: 16px
    text-align: center
    background: #fff
    color: #666
    // box-shadow: 0 0 4px rgba(0,0,0,.2)
    &.topBox2
      top: 52px
      border-top: 1px solid #eee
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
    li
      padding: 15px 0
      &.active
        position: relative
        color: #ff5356
        &:before
          content: ''
          position: absolute
          left: 0
          right: 0
          bottom: 0
          background: #ff5356
          height: 1px
    
  .mainHeight
    padding-top: 104px
  .loadmore
    padding: 0 10px
    li
      margin-top: 10px
      position: relative
      background: #fff
      padding: 5px 15px 15px
      border-radius: 3px
      .name
        line-height: 40px
        font-weight: bold
      .pr100
        position: relative
        padding: 10px 100px 0 0
        line-height: 20px
        .price
          position: absolute
          top: 10px
          right: 10px
        .red
          font-weight: normal
      .time
        line-height: 22px
      .nameBox
        margin-top: 10px
        span
          margin-right: 10px
      .el-button
        border-radius: 15px
  

</style>
