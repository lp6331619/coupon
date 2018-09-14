<template>
  <div class="picker">
    <mt-picker :showToolbar="true" class="pickerBox" :value-key="config.name" :slots="config.dataBox" @change="onValuesChange">
      {{config.title}}
      <el-button @click="countrysSub()" type="primary" size="small" class="pull-right">确定</el-button>
    </mt-picker>
    <div class="bg" @click="close()"></div>
  </div>
</template> 

<script>
import Vue from 'vue';
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);
export default {
  name: 'menu',
  props:{
    config:{

    }
  },
  created(){
    console.log(this.config)
  },
  data () {
    return {
        select:[],
    }
  },
  methods: {
    onValuesChange(picker, values) {
      console.log(picker, values,111)
      this.select = values
    },
    countrysSub:function(){
      this.$emit('selectPicker',this.select,this.config.state);
    },
    close:function(){
      this.$emit('closePicker');
    }
  },
  components: {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 
</style>
