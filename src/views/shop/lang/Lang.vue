<template>
    <div class="country">
        <ul>
          <li @click="toHome(item.name,item.id)" v-for="(item,index) in countrys"><div class="name">{{item.name}}</div></li>
        </ul>
    </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
    export default {
      name: 'lang',
      created() {
        this.getList()
      },
      data(){
        return{
          countrys:[]
        }
      },
      methods: {
          toHome(num,id){
            this.$router.push('/home?country='+num+'&country_id='+id)
          },
          getList(){
            Indicator.open('加载中...');
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
          }
      },
      components: {
      }
    }
    </script>
</script>
<style lang="sass" scoped>
  @import "../../../assets/scss/_mixin.scss";
  .country
    height: 100%
    background: #fff
    ul
      padding-bottom: 10px
      @include flex
      li
        width: 33.33%
        padding: 10px 10px 0
        .name
          border: 1px solid #ddd
          padding: 10px
          text-align: center
      
        
</style>
