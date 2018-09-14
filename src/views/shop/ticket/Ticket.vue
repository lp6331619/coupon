<template>
    <div class="form">
      <div class="container">
        <div class="ticketTabBox">
          <img :src="src" alt="">
          <ul class="ticketTab flex" >
            <li class="flexLi" :class="{'active':selected==2}" @click="tab(2)">火车</li>
            <li class="flexLi" :class="{'active':selected==4}" @click="tab(4)">廉价航空</li>
            <li class="flexLi" :class="{'active':selected==1}" @click="tab(1)">汽车</li>
            <li class="flexLi" :class="{'active':selected==3}" @click="tab(3)">轮船</li>
          </ul>
        </div>
        <el-form 
          class="formeBox p20" 
          label-position="left" 
          label-width="105px"
          :rules="rule_data"
          ref='dataBox'
          :model='dataBox'>
            <el-form-item
                class="right rightLeft"
                prop="departure"
                label="出发站">
                <div @click="siteSelect(1)" class="textRight">
                  <el-input v-model="dataBox.departure" placeholder="请选择出发站" :disabled="true"></el-input>
                </div>
            </el-form-item>
            <el-form-item
                class="right rightLeft"
                prop="arrival"
                label="到达站">
                <div @click="siteSelect(2)" class="textRight">
                  <el-input v-model="dataBox.arrival" placeholder="请选择到达站" :disabled="true"></el-input>
                </div>
            </el-form-item>
            <el-form-item
                v-if="selected==4"
                class="right rightLeft"
                prop="arrival"
                label="单反程">
                <div @click="tripSelect()" class="textRight">
                    <el-input v-model="dataBox.trip_type" placeholder="请选择单反程" :disabled="true"></el-input>
                </div>
            </el-form-item>
            <el-form-item
                prop="date"
                class="right rightLeft"
                label="日 期">
                <el-date-picker
                  v-model="dataBox.date"
                  type="date"
                  @change="dateBox"
                  :picker-options="pickerOptions"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div class="el-btn-box">
          <el-button size="medium" @click="search('dataBox')" class="el-btn-block" type="danger">搜 索</el-button>
        </div>
      </div>
      <div class="categorys" v-if="categoryBoo">
        <ul>
          <li v-for="(item,index) in categorys" :key="index">
              <div class="btnBox" :class="{'active':item.status}" @click="setType(item.id)">{{item.name}}</div> 
              <div class="moreBox" v-if="item.status">
                <div class="item" v-if="selected!='4'" @click="setSubType(item,itemChild)" v-for="(itemChild,indexChild) in citys" :key="indexChild">{{itemChild.name_cn}}</div>
                <div class="item" v-if="selected=='4'" @click="setSubType(item,itemChild)" v-for="(itemChild,indexChild) in citys" :key="indexChild">{{itemChild.city_name_cn}}</div>
                <div class="noinfo" v-if="citys.length==0">暂无信息</div>
              </div>
          </li>
        </ul>
      </div>
      <div class="pickerBox" v-if="pickerBoo" >
          <v-picker :config="pickerConfig" @selectPicker="selectPicker" @closePicker="pickerBoo=false"></v-picker>
      </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import picker from '../../../components/picker/picker'
    export default {
      name: 'home',
      created() {
        if(this.$route.query.status){
          this.selected=this.$route.query.status
        }

        this.src=require(`../../../assets/images/bg${this.selected}.jpg`);
        this.getData()
      },
      data(){
        return{
            src:require('../../../assets/images/bg1.jpg'),
            mainHeight:{
              height:'0',
              overflow:'auto'
            },
            dataBox:{
              date:''
            },
            pickerOptions:{//日期插件禁止日期
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            rule_data:{
              departure : [{
                  required: true,
                  message : '不能为空！',
                  trigger : 'blur'
              }],
              arrival : [{
                  required: true,
                  message : '不能为空！',
                  trigger : 'blur'
              }],
              date : [{
                  required: true,
                  message : '不能为空！',
              }],
            },
            vuexData: this.$store.state.user.userinfo,
            selected:'1',
            categoryBoo:false,
            siteStatus:1,
            categorys:[],
            citys:[],
            sheetVisible:false,
            pickerBoo:false,
            pickerConfig:{//选择框配置
              state:0,//选中状态 0.国家 1.城市 2.货币
              dataBox:[],//数据
              selectBox:[],//选中状态
              title:'',//标题
            },
        }
      },
      methods: {
        tab(num){
          this.selected=num
          this.src=require(`../../../assets/images/bg${this.selected}.jpg`);
        },
        //获取国家数据
        getData:function(num){
          Indicator.open('加载中...');
          this.$$api_public_countrys({
             data     : {},
             fn       : data => {
                Indicator.close();
                this.categorys = data
                this.categorys.forEach((item,index)=>{
                  if(index==0){
                    this.$set(item,'status',true)
                  }else{
                    this.$set(item,'status',false)
                  }
                })
                this.setType(this.categorys[0].id)
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        },
        //打开站点
        siteSelect(num){
          this.categoryBoo=true
          this.siteStatus=num
        },
        //选择
        setType(country_id){
          this.categorys.forEach((item)=>{
            item.status=false
            if(item.id == country_id){
              item.status=true
            }
          })
          Indicator.open('加载中...');
          if(parseInt(this.selected)!=4){
            this.$$api_public_citys({
               data     : {country_id:country_id},
               fn       : data => {
                  Indicator.close();
                  let citybox = data
                  this.citys =[]
                  citybox.forEach((item)=>{
                    switch(parseInt(this.selected)){
                      case 1:
                        if(item.is_bus==1)
                        this.citys.push(item)
                      break;
                      case 2:
                        if(item.is_train==1)
                        this.citys.push(item)
                      break;
                      case 3:
                        if(item.is_boat==1)
                        this.citys.push(item)
                      break;
                    }
                  })
               },
               errFn    : (err) => {
                  Indicator.close();
                  this.$message.error(err.msg)
               }
            })
          }else{
            this.$$api_public_flight_citys({
               data     : {country_id:country_id},
               fn       : data => {
                  Indicator.close();
                  this.citys = data
               },
               errFn    : (err) => {
                  Indicator.close();
                  this.$message.error(err.msg)
               }
            })
          }
        }, 
        //设置城市
        setSubType(item,itemChild){
          this.categoryBoo=false
          switch(this.siteStatus){
            case 1:
              if(this.selected!=4){
                this.dataBox = Object.assign({}, this.dataBox, {
                    departure : `${itemChild.name_cn} `,
                    depart_city_id:itemChild.id
                })
              }else{
                this.dataBox = Object.assign({}, this.dataBox, {
                    departure : `${itemChild.city_name_cn} `,
                    depart_city_id:itemChild.id
                })
              }
            break;
            case 2:
              if(this.selected!=4){
                  this.dataBox = Object.assign({}, this.dataBox, {
                      arrival : `${itemChild.name_cn} `,
                      arrival_city_id:itemChild.id
                  })
              }else{
                  this.dataBox = Object.assign({}, this.dataBox, {
                      arrival : `${itemChild.city_name_cn} `,
                      arrival_city_id:itemChild.id
                  })
              }
            break;
          }
        },
        dateBox(date){
          this.dataBox.date = date
        },
        search(ref){//搜索
          this.$refs[ref].validate((valid) => {
              if (valid) {
                Indicator.open('加载中！')
                let dataBox =  JSON.parse(JSON.stringify(this.dataBox))
                dataBox.type = this.selected
                delete dataBox.selected
                if(parseInt(this.selected)==4){
                  switch(dataBox.trip_type){
                    case '单程':
                      dataBox.trip_type = 'OW'
                    break;

                    case '往返程':
                      dataBox.trip_type = 'RT'
                    break;
                  }
                  delete dataBox.departure
                  delete dataBox.arrival
                }
                this.$$api_public_ticketSearch_search({
                     data     : dataBox,
                     fn       : data => {
                        Indicator.close();
                        this.toList(data)
                     },
                     errFn    : (err) => {
                        Indicator.close();
                        this.$message.error(err.msg)
                     }
                  })
                
              }
          })
        },
        toList(data){//去列表页
          if(data.length>0){
            this.$set(this.dataBox,'selected',this.selected)
            this.$router.push({
              path:'/home/list',
              query:this.dataBox
            })
          }else{
            this.$message.error('暂时没有车次！请重新选择')
          }
        },
        tripSelect(){
            this.pickerConfig ={
              state:1,//选中状态 0.国家 1.城市 2.货币
              dataBox:[{
                 flex: 1,
                 values: ['单程', '往返程',],
                 className: 'slot1',
              }],//数据
              selectBox:[],//选中状态
              title:'选择往反程',//标题
            }
            this.pickerBoo = true
        },
        selectPicker(data,state){
          this.pickerBoo = false
          this.dataBox = Object.assign({}, this.dataBox, {
              trip_type: data[0]
          })
        },
      },
      components: {
        'v-picker' : picker
      }
    }
    </script>
</script>
<style lang="sass" scoped>
  .container
    background: #fff
    height: 100%
  .ticketTabBox
    position: relative
    .ticketTab
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 40px
      background: rgba(0,0,0,.6)
      li
        display: block
        text-align: center
        line-height: 40px
        font-size: 14px
        color: #fff
      .active
        border: none
        height: 55px
        line-height: 55px
        position: relative
        top: -14px
        background: #fff
        color: #666
        font-size: 16px
        font-weight: bold
        border-radius: 3px 3px 0 0
        &:after,&:before
          content: ''
          position: absolute
          left: -9px
          bottom: 0
          width: 0
          height: 0 
          border-width: 27px 5px
          border-style: solid
          border-color: transparent #fff #fff transparent 
        &:before
          left: auto
          right: -9px
          border-color: transparent transparent #fff #fff 
  .noinfo
    text-align: center
    margin-top: 80px
</style>
