<template>
    <div class="form">
        <div class="container ">
          <el-form 
            class="formeBox formeBox2" 
            label-position="left" 
            label-width="105px"
            :rules="rule_data"
            ref='dataBox'
            :model='dataBox'>
              <el-form-item
                  class="line c666 "
                  label="头像">
                  <img :src="img" class="img fr p5" alt="">
              </el-form-item>
              <el-form-item
                  class="line c666 "
                  label="姓名">
                  <span class="fr f16">{{VuexInfo.NickName}}</span>
              </el-form-item>
              <el-form-item
                  class="line c666 "
                  label="性别">
                  <div class="fr f16">{{VuexInfo.Sex}}</div>
              </el-form-item>
              <el-form-item
                  class="line c666 "
                  label="生日">
                  <div class="fr f16">{{VuexInfo.BirthDate}}</div>
              </el-form-item>
              <el-form-item
                  class="line c666 "
                  label="国家">
                  <div class="fr f16">{{VuexInfo.Country}}</div>
              </el-form-item>
              <el-form-item
                  class="line c666 "
                  label="城市">
                  <div class="fr f16">{{VuexInfo.City}}</div>
              </el-form-item>
              <el-form-item
                  class="line c666 "
                  label="电话">
                  <div class="fr f16">{{VuexInfo.name}}</div>
              </el-form-item>
              <el-form-item
                  class="line c666 "
                  label="微信号">
                  <div class="fr f16">{{VuexInfo.name}}</div>
              </el-form-item>
          </el-form>
        </div>
    </div>
</template>
<script>
    import menu from '../../../components/menu/menu'
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        
      },
      data(){
        return{
          dataBox:{
            time:'2015.12.24'
          },
          rule_data:{},
          img : require('../../../assets/images/head.jpg'),
          VuexInfo: this.headStatus ? this.$store.state.user.userinfo.user : {NickName:''},
        }
      },
      methods: {
       
      },
      computed: {
         
      },
      components: {
        'v-menu' : menu,
      }
    }
    </script>
</script>
<style scoped lang="sass">
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
