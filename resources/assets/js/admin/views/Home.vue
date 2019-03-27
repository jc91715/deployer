<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            adminRouter(name){
              return Laravel.router('api.admin.'+name)
            },
        }

    }
</script>
