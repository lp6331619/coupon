<template>
    <div class="form">
      <div class="container">
        <div class="detail">
          <div class="swiper-container" id="swiperBox">
              <div class=" swiper-wrapper clearfix">
                  <div class="swiper-slide" v-for="(item,index) in dataBox.url" :key="index" :style="height">
                      <div class="imgBox" ref="imgBox" :style="height"><img :src="item" ref alt=""></div>
                  </div>
              </div>
              <div class="swiper-pagination"></div>
          </div>
          <div class="name">{{dataBox.name}}</div>
          <div class="price red">¥{{dataBox.price}} <el-button size="medium" class="fr mapBtn" @click="mapShow(dataBox.lng, dataBox.lat,dataBox.name)">查看地图</el-button></div>
          <div class="pop" >
            <pre>{{dataBox.highlight_desc}}</pre>
          </div>
          <div class="img">
            <img :src="dataBox.highlight_img" alt="">
          </div>
          <div class="text">
            {{dataBox.desc}}
          </div>
          <div class="el-btn-box text-center">
            <el-button size="medium" @click="dialogVisible2=true">查看详细信息</el-button>
          </div>
        </div>
        <div class="Comment">
          <!-- <div class="title">地图位置</div>
          <div class="mapBox" id="mapBox"></div> -->
          <!-- <iframe class="mapBox" :src="mapSrc" frameborder="0"></iframe> -->
          <div class="title">用户评价</div>
          <ul v-if="Evaluation.length>0">
            <li v-for="(item,index) in Evaluation" v-if="index<=3">
              <div class="name">
                <img src="../../../assets/images/head.jpg" alt="">
                {{item.nickname}}
                <div class="star fr">
                  <svg class="icon" aria-hidden="true" v-for="statVi in stat" >
                      <use v-if="statVi <= item.score" xlink:href="#icon-pingjiaxiaoxingxing-copy"></use>
                      <use v-else xlink:href="#icon-pingjiaxiaoxingxing"></use>
                  </svg>
                </div>
              </div>
              <div class="text">{{item.content}}<br>
                <time>{{item.ctime}}</time>
              </div>
              <div class="img">
                <img v-for="(img,index) in item.imgBox" :key="index" :src="img" alt="">
              </div>
            </li>
          </ul>
          <div class="no" v-else>暂无评论</div>
          <div class="el-btn-box text-center" >
          <!-- comment -->
            <el-button size="medium" @click="commentBox">查看全部评价</el-button>
          </div>
        </div>
        <div class="Purchase">
          <div class="title">
            <svg class="icon mr10" aria-hidden="true">
                <use xlink:href="#icon-goumaixuzhi"></use>
            </svg>购买须知
          </div>
          <ul v-html="dataBox.buy_desc">
          </ul>
          <!-- <ul>
            <li><div class="tit">预定时间</div>
              最早可预定1月20日之前的行程
            </li>
            <li><div class="tit">确认时长</div>
              2小时
            </li>
            <li><div class="tit">退改政策</div>
              法定节假日不支持退改签<br>
              出行72小时内不支持退改签
            </li>
            <li><div class="tit">使用说明</div>
              购买后会生成对呀产品的消费卷二维码，专车接送由系统发送时间、司机、车牌号等信息对应即可乘车，著出、用餐时向前台出示对呀的消费卷二维码即可，其他情况的使用方法在购买后会令做说明，如有不明之处，出行前及行程中可随时咨询我们。
            </li>
            <li><div class="tit">注意事项</div>
              如怀有身孕，携带儿童及65周岁以上的老人出行请事先说明。
            </li>
          </ul> -->
        </div>
        <div class="help">
          <div class="title">需要帮助</div>
          <p>如果您对产品有任何疑问，请联系我们</p>
          <ul class="flex">
            <li class="flexLi">
              <router-link to="/">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fuwurexian"></use>
                </svg>
                <div class="name">服务热线</div>
              </router-link>
            </li>
            <li class="flexLi">
              <router-link to="/">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zaixiankefu"></use>
                </svg>
                <div class="name">服务热线</div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="title">安排您的行程</div>
        <el-form 
          class="formeBox formeBox2" 
          label-position="left" 
          label-width="105px"
          :rules="rule_data"
          ref='formBox'
          :model='formBox'>
            <el-form-item
                prop="use_time"
                class="line c666 right"
                label="日期">
                <el-date-picker
                    class="data fr"
                    v-model="formBox.use_time"
                    type="date"
                    @change="timeUse"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item
                class="line c666 right"
                v-if="dataBox.spec.length>0"
                prop="spec"
                label="装备">
                <i></i>
                <div @click="dialogVisible = true">
                  <el-input :disabled="true" placeholder="请选择装备！" v-model="formBox.spec" ></el-input>
                </div>
            </el-form-item>
            <el-form-item
                class="line c666"
                v-if="dataBox.is_passport == '0'"
                label="成人数量">
                <el-input-number class="fr" :min="1" size="large" v-model="formBox.adult_num"></el-input-number>
            </el-form-item>
            <el-form-item
                class="line c666"
                v-if="dataBox.is_passport == '0' && dataBox.is_children_price == '1'"
                label="儿童数量">
                <el-input-number class="fr" :min="0" size="large" v-model="formBox.children_num"></el-input-number>
            </el-form-item>
            <!-- <el-form-item
                class="line c666 right"
                label="取货方式">
                <i></i>
                <div class="fr" @click="determine()">自取</div>
            </el-form-item> -->
        </el-form>
      </div>
      <div class="el-btn-box fixed flex">
        <el-button size="medium" class="flexLi buy" @click="goDetail('formBox')">¥{{dataBox.spec.length>0 ? specPrice+'起' : dataBox.price}} 立即购买</el-button>
        <el-button size="medium" class="customer" >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zaixiankefuhong" ></use>
            </svg>在线客服</el-button>
      </div>
      <!--装备弹框-->
      <div class="selectBox" v-if="dialogVisible" :visible.sync="dialogVisible">
        <div class="box">
          <div class="tit">选择装备</div>
          <ul>
            <li class="item" v-for="(item,index) in dataBox.spec">
              <div class="name">{{item.name}}</div>
              <span @click="setBox(item,itemChild)" v-for="(itemChild,indexChild) in item.child" :class="{'active':itemChild.status}">
                {{itemChild.name}}
              </span>
            </li>
          </ul>
          <div class="el-btn-box pt0">
            <el-button size="medium" class="el-btn-block" @click="determine()">确定</el-button>
          </div>
        </div>
      </div>
      <!--详情弹框-->
      <el-dialog
        class="detailPopBox"
        :visible.sync="dialogVisible2"
        size="full">
        <div class="detailPop">
          <div class="el-dialog__title text-center mt20">{{dataBox.name}}</div>
          <div class="text" v-html="dataBox.detail"></div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false" icon="close"></el-button>
        </div>
      </el-dialog>
      <!--评论弹框-->
      <el-dialog
        class="detailPopBox"
        :visible.sync="comment"
        size="full">
        <div class="Comment">
          <ul>
            <li v-for="(item,index) in Evaluation">
              <div class="name">
                <img src="../../../assets/images/head.jpg" alt="">
                {{item.nickname}}
                <div class="star fr">
                  <svg class="icon" aria-hidden="true" v-for="statVi in stat" >
                      <use v-if="statVi <= item.score" xlink:href="#icon-pingjiaxiaoxingxing-copy"></use>
                      <use v-else xlink:href="#icon-pingjiaxiaoxingxing"></use>
                  </svg>
                </div>
              </div>
              <div class="text">{{item.content}}<br>
                <time>{{item.ctime}}</time>
              </div>
              <div class="img">
                <img v-for="(img,index) in item.imgBox" :key="index" :src="img" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="comment=false" icon="close"></el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
    import DetailJs from './Detail.js';
    export default DetailJs;
</script>
<style lang="sass" scoped>
  .mapBox
    width: 100%
    height: 300px
  .title
    border-top: 1px solid #ddd
    text-align: center
    padding-top: 30px
    line-height: 50px
    font-size: 1.5rem
    color: #333
    font-weight: bold
  .no
    text-align: center
    line-height: 100px
  .container
    background: #fff
    padding-bottom: 80px
    .help
      padding: 20px 0 40px
      text-align: center
      .title
        border: none
      p
        color: #999
      .flex
        margin-top: 30px
        .name
          margin-top: 10px
      .icon
        font-size: 3rem
  .Purchase
    background: #eee
    padding: 10px 15px 30px
    .title
      border: none
    ul
      margin-top: 20px
    li
      position: relative
      padding: 0 0 10px 90px
      line-height: 24px
      font-size: 16px
      .tit
        position: absolute
        left: 0
        top: 0
  .mapBtn
    background: #000
    color: #fff
    border-color: #000 
  .fixed
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index: 10
    padding: 10px
    background: #fff
    box-shadow: 0 0 4px rgba(0,0,0,.2)
    .buy
      background: #000
      color: #fff
      border-color: #000 
    .customer
      color: #ff544a
      border-color: #ff544a
      .icon
        margin-right: 5px
  .selectBox
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    z-index: 11
    background: rgba(0,0,0,.5)
    .box
      position: absolute
      bottom: 0
      left: 0
      right: 0
      color: #333
      background: #fff
      .tit
        font-size: 18px
        border-bottom: 1px solid #ddd
        padding: 15px
      ul
        padding: 15px
        .name
          font-size: 16px
        li
          padding-bottom: 10px
        span
          position: relative
          margin: 10px
          display: inline-block
          padding: 8px 10px
          color: #bbb
          border: 1px solid #ddd
          &.active
            color: #000
            border: 1px solid #000
            &:before,&:after
              content: ''
              display: block
              position: absolute
              right: 0
              bottom: 0
            &:before
              width: 0; 
              height: 0; 
              border-bottom: 16px solid #000; 
              border-left: 16px solid transparent; 
            &:after
              width: 7px
              height: 4px
              bottom: 4px
              border: 1px solid #fff
              border-width: 0 0 1px 1px
              transform: rotate(-45deg)
              -webkit-transform: rotate(-45deg)
    .el-btn-block
      background: #000
      color: #fff
      border-color: #000
  .Comment
    ul
      padding: 10px
    li
      padding: 10px
      border-top: 1px dashed #ddd
      &:first-child
        border: none
    .name
      line-height: 40px
      padding-bottom: 10px
      img
        width: 30px
        height: 30px
        margin-right: 10px
        border-radius: 50%
        vertical-align: middle
    .text
      font-size: 16px
      time
        display: block
        font-size: 12px
        line-height: 28px
        color: #c8c8c8
    .img
      img
        width: 100px
        height: 100px
        margin-right: 10px
  .detail
    padding: 0 15px
    .name
      font-size: 18px
      font-weight: bold
      line-height: 30px
    .price
      font-size: 20px
      line-height: 50px
      border-bottom: 1px solid #ddd
    .img
      margin: 10px -15px
    .pop
      padding: 10px 0
      p
        position: relative
        padding: 10px 0 0 20px
        &:before
          content: ''
          position: absolute
          left: 10px
          top: 18px
          width: 2px
          height: 2px
          background: red
    .text
      line-height: 26px
  .banner
    img
      width: 100%
  .swiper-container
    margin: 0 -15px
  .detailPopBox
    .detailPop,.Comment 
      padding: 20px
</style>
