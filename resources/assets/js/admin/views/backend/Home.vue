<template>
    <div>
        <router-view :key="router_key"></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        computed:{
            router_key(){
                return this.$route.path + Math.random();
            }
        }
    }
</script>
