<template>
    <div class="form">
      <div class="container">
          <div class="topBox">
            <div class="name">{{dataBox.departure}} 
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiaojiantou"></use>
              </svg>
              {{dataBox.arrival}} 
            </div>
            <div class="box clearfix">
              <el-button class="fl" @click="setDateBack()">< 前一天</el-button>
              <el-date-picker
                  class="listTime"
                  v-model="dataBox.date"
                  type="date"
                  @change="setDate"
                  placeholder="选择日期">
              </el-date-picker>
              <el-button class="fr" @click="setDateNext()">后一天 ></el-button>
            </div>
          </div>
          <div class="mainHeight" >
              <div class="loadmore">
                <ul>
                  <li v-if="dataBox.selected!=4" v-for="item in list" class="flex" @click="seat(item)">
                      <div class="left flexLi">
                        <p class="name">{{item.train_num}}</p>
                        <div class="price red">{{item.depart_time}}</div>
                        <p>{{item.arrive_time}}</p>
                      </div>
                      <div class="center flexLi">
                        <p>{{item.duration}}</p>
                        <p class="fa">
                          <svg class="icon" aria-hidden="true">
                              <use xlink:href="#icon-shifazhan" ></use>
                          </svg>
                          {{item.departure}}
                        </p>
                        <p>
                          <svg class="icon" aria-hidden="true">
                              <use xlink:href="#icon-zhongdianzhan" ></use>
                          </svg>
                          {{item.arrival}}
                        </p>
                        <p>公司：{{item.t_shop_name}}</p>
                      </div>
                      <div class="right red">¥ {{item.price}}</div>
                  </li>
                  <li v-if="dataBox.selected==4" v-for="item in list" class="flex" @click="seat(item)">
                      <div class="left flexLi">
                        <p class="name">{{item.train_num}}</p>
                        <div class="price red">{{item.depart_time}}</div>
                        <p>{{item.arrive_time}}</p>
                      </div>
                      <div class="center flexLi">
                        <p>{{item.duration}}</p>
                        <p class="fa">
                          <svg class="icon" aria-hidden="true">
                              <use xlink:href="#icon-shifazhan" ></use>
                          </svg>
                          {{item.departure}}
                        </p>
                        <p>
                          <svg class="icon" aria-hidden="true">
                              <use xlink:href="#icon-zhongdianzhan" ></use>
                          </svg>
                          {{item.arrival}}
                        </p>
                      </div>
                      <div class="right red">¥ {{item.price}}</div>
                  </li>
                </ul>
              </div>
          </div>
      </div>
      <div class="selectBox flex">
         <el-button class="flexLi" :class="{'active':setTab==1,'down':upDown1}" @click="setUp(1)">出发时间<i></i></el-button>
         <el-button class="flexLi" :class="{'active':setTab==2,'down':upDown2}" @click="setUp(2)">票价<i></i></el-button>
      </div>
      <el-dialog
        title="选择坐席"
        :visible.sync="dialogVisible"
        size="large">
        <ul class="Seating">
          <li class="flex" v-for="item in seatList.spec">
            <div class="name">{{item.name}}</div>
            <div class="price red">¥{{item.price}}</div>
            <el-button @click="toDetail(item)" size="small" type="danger" class="fr">预定</el-button>
          </li>
        </ul>
      </el-dialog>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui';
    export default {
      name: 'home',
      methods :{
      },
      created() {
        this.mainHeight.height = document.documentElement.clientHeight-135 +'px';
        this.getList()
        console.log(this.dataBox)
      },
      data(){
        return{
            mainHeight:{
              height:'0',
              overflow:'auto'
            },
            dataBox:this.$route.query,
            dialogVisible:false,
            selected:'2',
            allLoaded: false,
            pageNum: 1,
            list:[],
            seatList:[],
            seatData:{},
            topStatus:'',
            setTab:1,
            upDown1:false,
            upDown2:false,
        }
      },
      methods: {
        getList(){
            Indicator.open('加载中！')
            let dataBox =  JSON.parse(JSON.stringify(this.dataBox))
            dataBox.type = dataBox.selected
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
                    this.list=data
                 },
                 errFn    : (err) => {
                    Indicator.close();
                    this.$message.error(err.msg)
                 }
            })
        },
        setDate(date){
          this.dataBox = Object.assign({}, this.dataBox, {
              date: date
          })
          this.getList()
        },

        addDate(date,days){
          var d=new Date(date);
          d.setDate(d.getDate()+days);
          var month=d.getMonth()+1;
          var day = d.getDate();
          if(month<10){
            month = "0"+month;
          }
          if(day<10){
            day = "0"+day;
          }
          var val = d.getFullYear()+"-"+month+"-"+day;
          return val;
        },
        //前一天
        setDateBack(){
          this.dataBox = Object.assign({}, this.dataBox, {
              date: this.addDate(this.dataBox.date,-1)
          })
          this.getList()
        },
        //后一天
        setDateNext(){
          this.dataBox = Object.assign({}, this.dataBox, {
              date: this.addDate(this.dataBox.date,1)
          })
          this.getList()
        },
        sortBy(attr,rev){
            //第二个参数没有传递 默认升序排列
            if(rev ==  undefined){
                rev = 1;
            }else{
                rev = (rev) ? 1 : -1;
            }
            return function(a,b){
                a = a[attr];
                b = b[attr];
                if(a < b){
                    return rev * -1;
                }
                if(a > b){
                    return rev * 1;
                }
                return 0;
            }
        },
        setUp(num){
          this.setTab=num
          if(num==1){
            this.upDown1=!this.upDown1
            this.list.sort(this.sortBy('depart_time',!this.upDown1)) 
          }else{
            this.upDown2=!this.upDown2
            this.list.sort(this.sortBy('price',!this.upDown2)) 
          }
        }, 
        //打开坐席
        seat(item){
          this.dialogVisible = true;
          this.seatList = item
          this.seatData = Object.assign({}, this.seatData, {
              seatTime: item.depart_time,
              train_num: item.train_num,
          })
        }, 
        toDetail(item){
          let subData = JSON.parse(JSON.stringify(this.seatList))
          delete subData.spec
          subData = Object.assign({}, subData, {
              specPrice: item.price,
              specName: item.name,
              specChildren_price: item.children_price,
              specStatus: item.status,
              date:this.dataBox.date,
              selected : this.dataBox.selected
          })
          this.$store.dispatch('get_listTickey',{
              listTickey:subData
          }).then(()=>{
            this.$router.push({
              path:'/pay/detail',
            })
          })
        }     
      },
      components: {}
    }
    </script>
</script>
<style lang="sass" scoped>
  .topBox
    padding: 10px 0
    font-size: 18px
    text-align: center
    background: #333
    color: #fff
    .icon
      font-size: 25px
    .box
      margin-top: 10px
      padding: 0 10px
      .el-button
        background: none
        border: none
        color: #fff
      .listTime
        width: 125px
  .mainHeight
    padding-bottom: 45px
  .selectBox
    position: fixed
    left: 0
    right: 0
    bottom: 0
    background: #f0f0f0
    .el-button
      width: 50%
      line-height: 25px
      margin-left: 0
      border: none
      background: #f0f0f0
      i
        margin-left: 5px
        position: relative 
        &:before
          content: ''
          width: 0
          height: 0
          position: absolute
          top: -3px
          border-width: 5px
          border-style: solid
          border-color: transparent transparent #9b9b9b transparent
        &:after
          content: ''
          width: 4px
          height: 8px
          position: absolute
          top: 7px
          left: 3px
          background: #9b9b9b
      &.active
        color: #ff5255
        i:before
          border-color: transparent transparent #ff5255 transparent
        i:after
          background: #ff5255
      &.down
        i:before
          top: 11px
          border-color: #9b9b9b transparent transparent transparent
        i:after
          top: 3px
        &.active
          i:before
            border-color: #ff5255 transparent transparent transparent
  .loadmore
    background: #fff
    li
      padding: 10px 0 10px 15px
      position: relative
      &:after
        content: ''
        position: absolute
        left: 15px
        right: 0
        bottom: 0
        height: 1px
        background: #eee;
      .center
        flex: 2
      .right
        width: 100px
        line-height: 60px
        text-align: right
        padding-right: 15px
        font-size: 18px
      p
        color: #9b9b9b
  .el-button
    border-radius: 2px
  .Seating
    max-height: 300px
    overflow-y: auto
    li
      padding-bottom: 15px
      line-height: 28px
      justify-content: space-between
      .name
        width: 60%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
      .price
        width: 20%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
</style>
