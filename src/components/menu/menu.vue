<template>
    <menu class="bar bar-tab">
        <router-link to="/home" class="tab-item" > 
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouye" v-if="state == `/home`"></use>
                <use xlink:href="#icon-shouyehui" v-else></use>
            </svg>
            <span class="tab-label" :class="{'active' : state == `/home`}">首页</span>
        </router-link>
        <router-link to="/" class="tab-item"> 
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhaodao" v-if="state == `/order`"></use>
                <use xlink:href="#icon-zhaodaohui" v-else></use>
            </svg>
            <span class="tab-label" :class="{'active' : state == `/order`}">找到</span>
        </router-link>
        <router-link to="/traveler" class="tab-item" > 
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaofeiquanhui-copy" v-if="state == `/traveler`"></use>
                <use xlink:href="#icon-xiaofeiquanhui" v-else></use>
            </svg>
            <span class="tab-label" :class="{'active' : state == `/product`}">消费劵</span>
        </router-link>
        <router-link to="/user" class="tab-item" > 
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wode" v-if="state == `/user`"></use>
                <use xlink:href="#icon-wodehui" v-else></use>
            </svg>
            <span class="tab-label" :class="{'active' : state == `/user`}">我的</span>
        </router-link>
    </menu>
</template> 
<script>
export default {
  name: 'menu',
  created(){
    
  },
  data () {
    return {
        state : this.$router.history.current.path
    }
  },
  methods: {
     
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
    .bar{position:fixed;right: 0;left: 0;z-index: 10;height: 44px;padding-right: 10px;padding-left: 10px;background-color: #fff;border-top: 1px solid #eee;-webkit-backface-visibility: hidden;backface-visibility: hidden;}
    .bar:after{content: '';position: absolute;left: 0;bottom: 0;right: auto;top: auto;height: 1px;width: 100%;background-color: #e7e7e7;display: block;z-index: 15;-webkit-transform-origin: 50% 100%;transform-origin: 50% 100%;}
    .bar-tab{bottom: 0;width: 100%;height: 54px;padding: 0;table-layout: fixed;}
    .bar-tab:after{display: none;}
    .bar-tab .tab-item{position: relative;display: table-cell;width: 1%;height: 54px;color: #666;text-align: center;vertical-align: middle;}
    .bar-tab .tab-item .tab-label{color:#999}
    .bar-tab .tab-item .tab-label.active,
    .bar-tab .tab-item .tab-label:active{color: #333;}
    .bar-tab .tab-item .badge{position: absolute;top: 2px;left: 50%;z-index: 100;height:16px;min-width:16px;padding: 0 4px;font-size: 12px;line-height:16px;color: white;vertical-align: top;background: red;border-radius: 10px;margin-left: 2px;}
    .bar-tab .tab-item .icon{top: 3px;width: 24px;height: 24px;font-size: 20px;line-height: 24px;padding-top: 0;padding-bottom: 0;}
    .bar-tab .tab-item .icon ~ .tab-label{display: block;font-size: 11px;position: relative;top: 1px;}
</style>
