<template>
    <div class="form">
      <div class="container">
        <div class="top">
          <div class="topTitle">{{dataBox.name}}</div>
          <ul>
            <li><span class="tit gray">出行日期</span> {{dataBox.use_time}} </li>
          </ul>
        </div>
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
                v-if="dataBox.is_passport=='1'"
                class="grayBg"
                label-width="205px"
                label="出行人信息">
            </el-form-item>
            <ul class="Traveler line" v-if="dataBox.is_passport=='1'">
                <li v-for="(item,index) in peoper">
                  <p class="overflow"><span class="w105">出行人</span> {{item.FamilyName}}{{item.GivenName}}</p>
                  <p class="overflow"><span class="w105">护照</span> {{item.CertNo}}</p>
                  <el-button type="danger" @click="del(index)">删除</el-button>
                </li>
                <li class="noMore" @click="dialogVisible=true">+请添加出行人</li>
            </ul>
            <el-form-item
                class="line left10"
                v-if="dataBox.is_passport=='1'"
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
                class="grayBg"
                label-width="305px"
                label="金额">
            </el-form-item>
            <el-form-item
                label-width="105px"
                :label="dataBox.is_passport=='1'? '成人票' : '购买数量'">
                <div class="text-right red"> {{dataBox.adult_num}} × {{dataBox.specPrice ? dataBox.specPrice : dataBox.price}} 元</div>
            </el-form-item>
            <el-form-item
                v-if="dataBox.is_passport=='1' &&  dataBox.is_children_price == '1'"
                label-width="105px"
                label="儿童票">
                <div class="text-right red">{{dataBox.children_num}} × {{dataBox.children_price?dataBox.children_price:dataBox.specPrice}} 元</div>
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
      padding: 10px 15px
      .topTitle
        font-size: 18px
        line-height: 40px
        font-weight: bold
      ul
        margin-top: 10px
      li
        margin-top: 10px
        position: relative
        padding-left: 105px
        .tit
          position: absolute
          color: #999
          left: 0
          top: 0
</style>
