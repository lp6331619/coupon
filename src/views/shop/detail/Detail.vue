<template>
    <div class="form">
      <div class="container">
        <div class="top text-center">
          <div class="time">{{dataBox.date}}  {{dataBox.seatTime}} {{dataBox.depart_time}} 出发</div>
          <div>{{dataBox.specName}}</div>
          <ul class="flex">
            <li class="overflow">{{dataBox.departure}}</li>
            <li class="conter overflow">{{dataBox.train_num}}</li>
            <li class="overflow">{{dataBox.arrival}}</li>
          </ul>
        </div>
        <!-- {{map}} -->
        <el-form 
          class="listDetail" 
          label-position="left" 
          label-width="105px"
          :rules="rule_data"
          ref='subData'
          :model='subData'>
            <!-- <el-form-item
                class="line c666"
                label="购票数量">
                <el-input-number class="fr" :min="0" size="small" v-model="dataBox.num"></el-input-number>
            </el-form-item> -->
            <!-- <el-form-item
                label-width="205px"
                label="退票，改签如何收费？">
                <span class="fr blue">预定须知</span>
            </el-form-item> -->
            <el-form-item
                v-if="dataBox.is_license==1"
                class="line left10"
                label-width="105px"
                :label="dataBox.departure">
                <div class="text-right" @click="mapShow(dataBox.depart_lng,dataBox.depart_lat,dataBox.departure)">地图<i class="el-icon-arrow-right"></i></div>
            </el-form-item>
            <el-form-item
                v-if="dataBox.is_license==1"
                class="line left10"
                label-width="105px"
                :label="dataBox.arrival">
                <div class="text-right " @click="mapShow(dataBox.arrive_lng,dataBox.arrive_lat,dataBox.arrival)">地图<i class="el-icon-arrow-right"></i></div>
            </el-form-item>
            <el-form-item
                class="grayBg"
                label-width="205px"
                label="添加出行人">
            </el-form-item>
            <ul class="Traveler line">
                <li v-for="(item,index) in peoper">
                  <p class="overflow"><span class="w105">出行人</span> {{item.FamilyName}}{{item.GivenName}}</p>
                  <p class="overflow"><span class="w105">护照</span> {{item.CertNo}}</p>
                  <el-button type="danger" @click="del(index)">删除</el-button>
                </li>
                <li class="noMore" @click="dialogVisible=true">+请添加出行人</li>
            </ul>
            <el-form-item
                v-if="dataBox.is_license==1"
                class="line left10"
                label-width="105px"
                label="上传签证照">
                <div class="text-right red" @click="visaImg=true">{{peoper.length}} 张 <i class="el-icon-arrow-right "></i></div>
            </el-form-item>
            <el-form-item
                class="grayBg"
                label-width="305px"
                label="请填写联系人信息用于接收订单信息反馈">
            </el-form-item>
            <el-form-item
                class="line left10"
                label-width="105px"
                prop="wechat"
                label="微信号">
                <el-input class="text" v-model="subData.wechat" placeholder="请填写微信号"></el-input>
            </el-form-item>
            <el-form-item
                class="line left10"
                label-width="105px"
                prop="phone"
                label="手机号">
                <el-input class="text" v-model="subData.phone" placeholder="请填写手机号"></el-input>
            </el-form-item>
            <el-form-item
                class="line left10"
                label-width="105px"
                prop="remark"
                label="备注">
                <el-input class="text" v-model="subData.remark" placeholder="请填写备注"></el-input>
            </el-form-item>
         
            <el-form-item
                v-if="dataBox.selected == '2' || dataBox.selected=='4'"
                label-width="105px"
                class="line"
                label="是否接受换位">
                <div class="text-right" @click="seat()">{{change_seat_name}}<i class="el-icon-arrow-right "></i></div>
            </el-form-item>
            <el-form-item
                v-if="dataBox.selected == '2' || dataBox.selected=='4'"
                label-width="0">
                <div style="line-height:20px;">
                  旅游旺季部分轮船线路可能出现坐席紧张，请选择是否接受次一级的坐席（如一等舱买完之后买二等舱的票，调换产生的差价多退少补。)
                </div>
            </el-form-item>
            <el-form-item
                class="grayBg"
                label-width="305px"
                label="金额">
            </el-form-item>
            <el-form-item
                label-width="105px"
                label="成人票">
                <div class="text-right red"> {{adult_num}} × {{dataBox.specPrice}} 元</div>
            </el-form-item>
            <el-form-item
                label-width="105px"
                label="儿童票">
                <div class="text-right red">{{children_num}} × {{dataBox.children_price?dataBox.specChildren_price:dataBox.specPrice}} 元</div>
            </el-form-item>
            <el-form-item
                label-width="105px"
                label="优惠券">
                <div class="text-right red" @click="sopenCoupon()">-{{couponPrice}} 元 <i class="el-icon-arrow-right "></i></div>
            </el-form-item>
            <el-form-item
                label-width="105px"
                label="共计金额">
                <div class="text-right red">{{money}} 元</div>
            </el-form-item>
        </el-form>
      </div>
      <div class="el-btn-box">
        <el-button size="medium" class="el-btn-block" type="danger" @click="sub('subData')">微信支付  {{money}} 元</el-button>
      </div>
      <el-dialog
        title="常用乘客列表"
        :visible.sync="dialogVisible"
        size="full">
        <v-traveler :config="travelerConfit" @setTraveler="setTraveler"></v-traveler>
      </el-dialog>
      <el-dialog
        title="优惠券列表"
        :visible.sync="coupon"
        size="full">
        <v-coupon :config="couponConfig" @setCoupon="setCoupon"></v-coupon>
      </el-dialog>
      <el-dialog
        title="签证图片"
        :visible.sync="visaImg"
        size="full">
          <div class="p20 visaImgBox">
            <div class="item" v-for="(item,index) in peoper" :key="index">
                <div class="name">{{item.FamilyName}}{{item.GivenName}}</div>
                <div @click="labelBox(index)">
                  <el-upload
                    class="avatar-uploader traveler"
                    action="http://merchant-api.quitang.com/public/oss_upload"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarError"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="item.visa_img" :src="item.visa_img ? item.visa_img : ''" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
            </div>
            <el-button type="success" style="width:100%;margin-top:20px" @click="subVisa_img()">确定</el-button>
          </div>
      </el-dialog>
      <el-dialog
        title="成功"
        :show-close="false"
        :visible.sync="success"
        size="full">
        <v-Success :config="successConfig" @setCoupon="setSuccess"></v-Success>
      </el-dialog>

      <el-dialog
        title="地图导航"
        :visible.sync="mapBoo"
        size="full">
        <v-map :config="mapConfig" ></v-map>
      </el-dialog>
      <div class="pickerBox" v-if="pickerBoo" >
          <v-picker :config="pickerConfig" @selectPicker="selectPicker" @closePicker="closePicker"></v-picker>
      </div>
    </div>
</template>
<script>
import DetailJs from "./Detail.js";
export default DetailJs;
</script>
<style lang="sass" scoped>
  .noMore
    text-align: center
    line-height: 40px
    padding-right: 0!important
    border-bottom: 1px solid #eee !important
  .visaImgBox
    .item
      .name
        margin: 20px 0 10px
        font-size: 16px
  .container
    background: #fff
    .top
      .time
        line-height: 50px
      .flex
        justify-content: space-around
        line-height: 80px
        font-size: 16px
        li
          width: 30%
          font-size: 16px
        .conter
          position: relative
          font-size: 12px
          width: 20%
          &:before
            content: ''
            width: 100%
            height: 1px
            position: absolute
            left: 0
            bottom: 24px
            background: #666
          &:after
            content: ''
            position: absolute
            right: 0
            bottom: 26px
            width: 6px
            height: 1px
            background: #666
            transform: rotate(45deg)


</style>
