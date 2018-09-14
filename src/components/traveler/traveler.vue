<template>
    <div class="traveler">
      <div class="container" >
          <ul class="list mt10 bgfff ">
            <li v-for="(item,index) in traveler" :key="index">
              <div @click="back(item)">
                <div class="name f16">{{item.FamilyName}}{{item.GivenName}}</div>
                <p class="gray">护照号：{{item.CertNo}}</p>
              </div>
              <!-- <div class="btnBox"> -->
                <!-- <el-button icon="edit" @click="edit()"></el-button> -->
                <!-- <el-button icon="delete2" @click="del()"></el-button> -->
              <!-- </div> -->
            </li>
          </ul>
          <div class="add mt10"><el-button @click="edit()">+添加常用旅客</el-button></div>
      </div>
      <!--增加修改-->
      <el-dialog
        title="新增/修改客户信息"
        :visible.sync="dialogDetail"
        :modal="false"
        size="full">
          <el-form 
            class="formeBox formeBox2" 
            label-position="left" 
            label-width="105px"
            :rules="rule_data"
            ref='formBox'
            :model='formBox'>
              <el-form-item
                  prop="FamilyName"
                  class="line c666 "
                  label="姓(拼音)">
                  <el-input class="fr f16" placeholder="护照姓氏拼音" v-model="formBox.FamilyName"></el-input>
              </el-form-item>
              <el-form-item
                  prop="GivenName"
                  class="line c666 "
                  label="名(拼音)">
                  <el-input class="fr f16" placeholder="护照名字拼音" v-model="formBox.GivenName"></el-input>
              </el-form-item>
              <!-- <el-form-item
                  prop="CertType"
                  class="line c666 "
                  label="证件类型">
                  <el-input class="fr f16" placeholder="请输入名字" v-model="formBox.GivenName"></el-input>
              </el-form-item> -->
              <el-form-item
                  prop="CertNo"
                  class="line c666 "
                  label="护照号码">
                  <el-input class="fr f16" placeholder="请输入护照号码" v-model="formBox.CertNo"></el-input>
              </el-form-item>
              <el-form-item
                  prop="CertExpired"
                  class="line c666 "
                  label="护照有效期">
                  <el-date-picker
                    v-model="formBox.CertExpired"
                    type="date"
                    @change="CertExpired"
                    :picker-options="pickerOptions2"
                    placeholder="请选择护照有效期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item
                  prop="BirthDate"
                  class="line c666 "
                  label="出生日期">
                  <el-date-picker
                    v-model="formBox.BirthDate"
                    type="date"
                    @change="BirthDate"
                    :picker-options="pickerOptions"
                    placeholder="出生日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item
                  prop="SexB"
                  class="line c666 "
                  label="性别">
                  <div @click="tripSex()" class="textRight">
                      <el-input v-model="formBox.SexB" placeholder="请选择男女" :disabled="true"></el-input>
                  </div>

              </el-form-item>
              <el-form-item
                  prop="NationalityB"
                  class="line c666 "
                  label="国籍">
                  <div @click="tripCountry()" class="textRight">
                      <el-input v-model="formBox.NationalityB" placeholder="请选择国籍" :disabled="true"></el-input>
                  </div>
              </el-form-item>
              <el-form-item
                  prop="PassportImg"
                  class="line c666 "
                  label-width="0"
                  label="">
                  护照首页图片
                  <el-upload
                    class="avatar-uploader traveler"
                    action="http://merchant-api.quitang.com/public/oss_upload"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="formBox.PassportImg" :src="formBox.PassportImg ? formBox.PassportImg : ''" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
              <!-- <el-form-item
                  prop="VisaImg"
                  class="line c666 "
                  label-width="0"
                  label="">
                  签证图片
                  <el-upload
                    class="avatar-uploader traveler"
                    action="http://merchant-api.quitang.com/public/oss_upload"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="formBox.VisaImg" :src="formBox.VisaImg ? formBox.VisaImg : ''" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item> -->
          </el-form>
          <div class="pickerBox" v-if="pickerBoo" >
              <v-picker :config="pickerConfig" @selectPicker="selectPicker" @closePicker="pickerBoo=false"></v-picker>
          </div>
        <div class="el-btn-box">
          <el-button size="medium" class="el-btn-block" type="danger" @click="subDate('formBox')">提交</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script>
    // 引入mint全部组件
    import {Indicator} from 'mint-ui';
    import picker from '../picker/picker'
    export default {
      name: 'home',
      props:{
        config:{
          url:Boolean//是后退还是关闭弹窗
        }
      },
      created() {
        this.getList()
        this.getCountry()
      },
      data(){
        return{
           traveler:[],
           dialogDetail:false,
           formBox:{},
           pickerOptions:{//日期插件禁止日期
             disabledDate(time) {
               return time.getTime() > Date.now();
             }
           },
           pickerOptions2:{//日期插件禁止日期
             disabledDate(time) {
               return time.getTime() < Date.now();
             }
           },
           rule_data:{
              FamilyName : [{
                  required: true,
                  message : '不能为空！',
                  trigger : 'blur'
              },{
                  pattern: /^[A-Za-z]+$/,
                  message : '只能为字母!',
                  trigger : 'blur'
              }],
              GivenName : [{
                  required: true,
                  message : '不能为空！',
                  trigger : 'blur'
              },{
                  pattern: /^[A-Za-z]+$/,
                  message : '只能为字母!',
                  trigger : 'blur'
              }],
              CertNo : [{
                  required: true,
                  message : '不能为空！',
                  trigger : 'blur'
              }],
              CertExpired : [{
                  required: true,
                  message : '不能为空！',
              }],
              BirthDate : [{
                  required: true,
                  message : '不能为空！',
              }],
              NationalityB : [{
                  required: true,
                  message : '不能为空！',
              }],
           },
           pickerBoo:false,
           countrys:[],
           pickerConfig:{//选择框配置
             state:0,//选中状态 0.国家 1.城市 2.货币
             dataBox:[],//数据
             selectBox:[],//选中状态
             title:'',//标题
           },
        }
      },
      methods: {
        getList(){
          Indicator.open('加载中！')
          this.$$api_public_get_passagers({
              data     : {},
              fn       : data => {
                Indicator.close();
                this.traveler=data
              },
              errFn    : (err) => {
                  Indicator.close();
                  this.$message.error(err.msg)
              }
          })
          
        },
        getCountry(){
          this.$$api_public_countrys({
             data     : {},
             fn       : data => {
                Indicator.close();
                this.countrys=data
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        },
        edit(){
          this.dialogDetail=true
        },
        del(){//删除
          this.$confirm('是否确认删除改联系人?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {});
        },

        //返回
        back(item){
          if(this.config.url){
            this.$emit('setTraveler',item)
          }
        },
        subDate(ref){
          this.$refs[ref].validate((valid) => {
              if (valid) {
                Indicator.open('提交中！');
                let obj = [];
                obj=this.countrys.find((item)=>{
                  return item.name == this.formBox.NationalityB
                })
                this.formBox.Nationality = obj.abbr
                this.formBox.CertType = 'pp'
                if(this.formBox.Sexb == '男'){
                  this.formBox.Sex= 'M'
                }else{
                  this.formBox.Sex= 'F'
                }
                this.$$api_public_add_passager({
                   data     : this.formBox,
                   fn       : data => {
                      Indicator.close();
                      this.$message.success('恭喜您添加成功！')
                      this.dialogDetail=false
                      this.getList()
                   },
                   errFn    : (err) => {
                      Indicator.close();
                      this.$message.error(err.msg)
                   }
                })
              }
          })
        },
        //生日
        BirthDate(date){
          this.formBox.BirthDate = date
        },
        CertExpired(date){
          this.formBox.CertExpired = date
        },
        tripSex(){//性别
            this.pickerConfig ={
              state:2,//选中状态 0.国家 1.城市 2.货币
              dataBox:[{
                 flex: 1,
                 values: ['男', '女',],
                 className: 'slot1',
              }],//数据
              selectBox:[],//选中状态
              title:'选择往反程',//标题
            }
            this.pickerBoo = true
        },
        //国家选择
        tripCountry(){//
            let countrysArry = []
            this.countrys.forEach((item)=>{
              countrysArry.push(item.name)
            })
            this.pickerConfig ={
              state:1,//选中状态 0.国家 1.城市 2.货币
              dataBox:[{
                 flex: 1,
                 values: countrysArry,
                 className: 'slot1',
              }],//数据
              selectBox:[],//选中状态
              title:'选择往反程',//标题
            }
            this.pickerBoo = true
        },
        selectPicker(data,state){
          this.pickerBoo = false
          if(state==2){
            this.formBox = Object.assign({}, this.formBox, {
                SexB: data[0]
            })
          }else if(state==1){
            this.formBox = Object.assign({}, this.formBox, {
                NationalityB: data[0]
            })
          }
        },
        
        handleAvatarSuccess(res, file) {//上传护照
          this.formBox = Object.assign({}, this.formBox, {
              PassportImg: 'http://img.quitang.com/' + res.data.img
          })
        },
        handleAvatarSuccess2(res, file) {//上传
          this.formBox = Object.assign({}, this.formBox, {
              VisaImg: 'http://img.quitang.com/' + res.data.img
          })
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 2048 / 2048 < 4;
          if (!isJPG ) {
            this.$message.error('上传图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M ;
        },
      },
      components: {
        'v-picker' : picker
      }
    }
    </script>
</script>
<style lang="sass" scoped>
  .add
    .el-button
      width: 100%
      border: none
      line-height: 30px
  .list
    li
      position: relative
      padding: 10px 110px 10px 20px
      line-height: 25px
      &:before
        content: ''
        position: absolute
        left: 20px
        right: 0
        bottom: 0
        height: 1px
        background: #eee
      &:last-child:before
        display: none
      .btnBox
        position: absolute
        right: 0
        top: 0
        .el-button
          border: none
          line-height: 49px
  .p5
    padding-top: 5px
    padding-bottom: 5px
  .formeBox2
    .el-form-item
      padding: 5px 20px
      color: #1f2d3d
    .img
      width: 40px
      height: 50px
</style>
