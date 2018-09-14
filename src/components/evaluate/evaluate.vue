<template>
    <div class="evaluateBox">
        <el-form 
            label-position="left" 
            label-width="105px"
            :rules="rule_data"
            ref='formBox'
            :model='formBox'>
              <el-form-item
                  class=" c666 line"
                  label="整体满意度">
                  <div class="star fr">
                      <svg class="icon" aria-hidden="true" @click="star(item)" v-for="item in starAttr" :key="item">
                        <use v-if="item <= formBox.score" xlink:href="#icon-pingjiaxiaoxingxing-copy"></use>
                        <use v-else xlink:href="#icon-pingjiaxiaoxingxing" ></use>
                      </svg>
                  </div>
              </el-form-item>
              <el-form-item
                  prop="content"
                  label-width="0"
                  class="borderNone ">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 6}"
                      placeholder="请输入评价内容"
                      v-model="formBox.content">
                    </el-input>
              </el-form-item>
              <el-form-item
                  class="c666 "
                  label-width="0">
                    <el-upload
                      class="avatar-uploader "
                      action="http://merchant-api.quitang.com/public/oss_upload"
                      list-type="picture-card"
                      multiple
                      :file-list="fileList"
                      :on-success="handSuccess"
                      :on-preview="handlePictureCardPreview"
                      :before-upload="beforeAvatarUpload"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
              </el-form-item>
          </el-form>
          <el-button size="medium" class="el-btn-block" type="danger" @click="subDate('formBox')">提交评价</el-button>
          <el-button size="medium" class="el-btn-block ml0 mt20" @click="back()">取消</el-button>
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
          data:Array//数据
        }
      },
      created() {
        console.log(this.config)
      },
      data(){
        return{
           formBox:{
            score:1
           },
           rule_data:{
              content : [{
                  required: true,
                  message : '评论不能为空！',
                  trigger : 'blur'
              }],
           },
           fileList:[],
           starAttr:[1,2,3,4,5],
        }
      },
      methods: {
        star(num){//星星
          this.formBox.score=num
        },
        //返回
        back(item){
          this.$emit('setEvaluate',item)
        },
        subDate(ref){
          this.$refs[ref].validate((valid) => {
              if (valid) {
                if(this.fileList.length>0){//图片
                  let imgBox = '';
                  this.fileList.forEach((item)=>{
                      imgBox+=item.url +',';
                  })
                  this.formBox.imgs = imgBox
                }
                this.formBox.pid= this.config.data.goods_id
                Indicator.open('提交中！');
                this.$$api_order_comment_add({
                   data     : this.formBox,
                   fn       : data => {
                      Indicator.close();
                      this.$message.success('恭喜您评价成功！');
                      this.back()
                   },
                   errFn    : (err) => {
                      Indicator.close();
                      this.$message.error(err.msg)
                   }
                })
              }
          })
        },
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        handSuccess(response, file, fileList) { //上传成功
            let url = 'http://img.quitang.com/' + response.data.img
            this.fileList.push({
                url: url
            })
        },
        handlePictureCardPreview(file) { //点击打开大图
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file) { //亮点图片上传
          if(this.fileList.length<=6){
            const isLt2M = file.size / 2048 / 2048 < 10;
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isGIF = file.type === 'image/gif';
            if (!isJPG && !isPNG && !isGIF) {
                this.$message.error('上传头像图片只能是 jpg, gif, png, jpeg 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG || isPNG || isGIF && isLt2M;
          }else{
            this.$message.error('最多上传6张')
          }
        },
      },
      components: {
      }
    }
    </script>
</script>
<style lang="sass">
  .star
    .icon
      margin: 0 5px
  .evaluateBox
    .line
      position: relative
      &:before
        content: ''
        position: absolute
        left: 0 
        bottom: 0 
        height: 1px 
        width: 100%
        background: #eee
    .el-upload-list__item-status-label,.el-upload-list__item-preview
      display: none!important
    .avatar-uploader .el-upload,.avatar-uploader-icon,.el-upload-list--picture-card .el-upload-list__item
      width: 80px
      height: 80px
      line-height: 80px
  .borderNone
    textarea
      border: none
      width: 100%
  .p5
    padding-top: 5px
    padding-bottom: 5px
</style>
