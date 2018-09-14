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
                  prop="FamilyName"
                  class="line c666 "
                  label="姓">
                  <el-input class="fr f16" placeholder="请输入名字" v-model="dataBox.FamilyName"></el-input>
              </el-form-item>
              <el-form-item
                  prop="GivenName"
                  class="line c666 "
                  label="名">
                  <el-input class="fr f16" placeholder="请输入名字" v-model="dataBox.GivenName"></el-input>
              </el-form-item>
              <el-form-item
                  prop="GivenName"
                  class="line c666 "
                  label="名">
                  <el-input class="fr f16" placeholder="请输入名字" v-model="dataBox.GivenName"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div class="el-btn-box">
          <el-button size="medium" class="el-btn-block" type="danger" @click="$router.push('/user/traveler')">提交</el-button>
          
        </div>
    </div>
</template>
<script>
    import {Indicator} from 'mint-ui';
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        
      },
      data(){
        return{
          dataBox:{
          },
          rule_data:{},
        }
      },
      methods: {
        subDate(){
          Indicator.open('加载中！');
          this.$$api_user_add_passager({
             data     : dataBox,
             fn       : data => {
                Indicator.close();
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        },
      },
      computed: {
         
      },
      components: {
      }
    }
    </script>
</script>
<style scoped lang="sass">
  

</style>
