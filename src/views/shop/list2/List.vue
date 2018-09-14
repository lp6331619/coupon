<template>
    <div class="form">
      <div class="container">
          <ul class="topBox flex">
            <li class="flexLi" :class="" @click="categoryBoo=true">分类：{{cotegoryText}}</li>
            <li class="flexLi" :class="{'active':upDown2}" @click="setUp(2)">默认排序</li>
          </ul>
          <div class="mainHeight" :style="mainHeight" >
              <mt-loadmore 
                class="loadmore"
                :bottom-method="loadBottom" 
                :bottom-all-loaded="allLoaded" 
                :max-distance="150"
                :auto-fill="false"
                @top-status-change="handleBottomChange" 
                ref="loadmoreOne">
                <ul>
                  <li v-for="item in list" class="" @click="toDetail(item.id)">
                      <img :src="item.url[0]" alt="">
                      <div class="name overflow">{{item.name}}
                      <div class="price red">¥{{item.price}}</div>
                      </div>
                  </li>
                </ul>
                <div slot="top" class="mint-loadmore-top">
                  <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                  <span v-show="topStatus === 'loading'">Loading...</span>
                </div>
              </mt-loadmore>
              <div class="noContent" v-if="list.length==0">
                暂无内容
              </div>
          </div>
      </div>
      <div class="categorys" v-if="categoryBoo">
        <ul>
          <li v-for="(item,index) in categorys" :key="index">
              <div class="btnBox" :class="{'active':item.status}" @click="setType(item)">{{item.name}}</div> 
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui';
    export default {
      name: 'home',
      created() {
        this.mainHeight.height = document.documentElement.clientHeight-60 +'px';
        this.getList(this.dataBox);
        //默认选中分类
        this.categorys[this.dataBox.type-1] = Object.assign({}, this.categorys[this.dataBox.type-1], {
            status: true,
        })
        this.cotegoryText = this.categorys[this.dataBox.type-1].name
      },
      data(){
        return{
            dataBox : this.$route.query,
            mainHeight:{
              height:'0',
              overflow:'auto'
            },
            selected:'1',
            allLoaded: false,
            pageNum: 1,
            list:[],
            topStatus:'',
            setTab:1,
            upDown1:false,
            upDown2:false,

            cotegoryText:'按类别',
            categoryBoo:false,
            categorys:[
              {status:false,name:'吃',id:1},
              {status:false,name:'住',id:2},
              {status:false,name:'行',id:3},
              {status:false,name:'娱',id:4},
              {status:false,name:'购',id:5},
              {status:false,name:'游',id:6},
              {status:false,name:'景点',id:7},
              {status:false,name:'通讯',id:8},
              {status:false,name:'金融',id:9},
              {status:false,name:'其他',id:10},
            ]
        }
      },
      methods: {
        tab(num){
          this.selected=num
        },
        setType(item){
          this.categorys.forEach((value)=>{
            value.status=false
            if(item.id == value.id){
              value.status=true
            }
            this.categoryBoo=false
            this.cotegoryText = item.name
            this.getList({type:item.id,country_id:this.dataBox.country_id});
          })
        },
        getList(item){
            Indicator.open('加载中！')
            this.dataBox.size=10
            this.$$api_product_goods({
                 data     : item,
                 fn       : data => {

                     this.list = data
                     this.list.forEach((item)=>{
                        if(item.imgs.length>0){
                          if(item.imgs[item.imgs.length-1] == ','){
                            item.imgs = item.imgs.slice(0,item.imgs.length-1)
                          }
                          let urlBox = item.imgs.split(',')
                          this.$set(item,'url',urlBox)
                        }
                     })
                     Indicator.close()
                     
                 },
                 errFn    : (err) => {
                     Indicator.close();
                     this.$message.error(err.msg)
                 }
            })
        },//下啦
        handleBottomChange(item){
        },
        loadBottom(){
            this.allLoaded = true;// 若数据已全部获取完毕
            this.pageNum++;
            Indicator.open('加载中...')
            this.$$api_product_goods({
                data  : {type:this.$route.query.type,country_id:this.dataBox.country_id, page:this.pageNum,size:10},
                fn    : data => {
                  Indicator.close()
                  let listBox = data
                  if(listBox.length>0){
                    this.allLoaded = false;
                    listBox.forEach((item)=>{
                       if(item.imgs.length>0){
                         if(item.imgs[item.imgs.length-1] == ','){
                           item.imgs = item.imgs.slice(0,item.imgs.length-1)
                         }
                         let urlBox = item.imgs.split(',')
                         this.$set(item,'url',urlBox)
                       }
                    })
                    this.list.push(...listBox)
                  }else{
                    this.allLoaded = true;
                    this.$message.error('没有更多啦！')
                  }
                  this.$refs.loadmoreOne.onBottomLoaded();
               },
               errFn    : (err) => {
                  this.allLoaded = false;
                  this.$message.error('没有更多啦！')
               }
            })
        },
        toDetail(id){
          this.$router.push({
            path:'/home/detail2',
            query:{ id : id }
          })
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
        //排列
        setUp(num){
          this.setTab=num
          if(num==1){
            this.upDown1=!this.upDown1
          }else{
            this.upDown2=!this.upDown2
            this.list.sort(this.sortBy('price',!this.upDown1)) 
          }
        },       
      },
      components: {}
    }
    </script>
</script>
<style lang="sass" scoped>
  .categorys
    ul
      text-align: center
      li
        border-bottom: 1px solid #eee
        .btnBox
          background: #fff
        .active
          background: #eee
      .btnBox
        width: 100%
  .topBox
    position: relative
    z-index: 10
    box-shadow: 0 0 4px rgba(0,0,0,.2)
    line-height: 50px
    text-align: center
    background: #fff
    li
      position: relative
      &:after
        content: ''
        position: relative
        top: -2px
        left: 5px
        display: inline-block
        width: 7px
        height: 7px
        border: 1px solid #666
        border-width: 0 0 1px 1px
        transform: rotate(-45deg)
        -webkit-transform: rotate(-45deg)
      &:before
        content: ''
        display: block
        position: absolute
        left: 0
        top: 15px
        bottom: 15px
        width: 1px
        background: #ddd
      &:first-child:before
        display: none
      &:first-child:after
        display: none
      &.active:after
        border-width: 1px 1px 0 0
        top: 0
  .loadmore
    li
      margin-top: 10px
      background: #fff
      &:nth-child(1)
        margin: 0
      .name
        position: relative
        padding-right: 100px
        padding-left: 15px
        line-height: 50px
        font-size: 16px
      .price
        position: absolute
        right: 10px
        top: 0
      img
        width: 100%
  .noContent
    text-align: center
    line-height: 200px
     
</style>
