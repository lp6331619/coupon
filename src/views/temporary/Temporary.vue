<template>
    <div class="home">
    </div>
</template>
<script>
    export default {
        created() {
            this.$router.push('/home?tokenExpired=0')
        },
        data() {
            return {
                
            }
        },
    }
</script>
</script>
<style>
    
</style>
