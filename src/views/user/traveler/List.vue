<template>
    <div class="form">
        <!-- @close="closeTraveler" @setTraveler="setTraveler" -->
        <v-traveler :config="travelerConfit" :setTraveler="setTraveler"></v-traveler>
    </div>
</template>
<script>
    import traveler from '../../../components/traveler/traveler'
    export default {
      methods :{
        
      },
      created() {
        
      },
      data(){
        return{
          travelerConfit:{
            url:false
          }
        }
      },
      methods: {
        closeTraveler(){

        },
        setTraveler(data){
          console.log(data)
        }
      },
      components: {
        'v-traveler' : traveler
      }
    }
    </script>
</script>
<style lang="sass" scoped>
  
</style>
