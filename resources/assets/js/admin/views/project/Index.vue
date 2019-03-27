<template>
    <div class="post-index">
        dd
        <div v-for="list in lists">
            <h1>{{list.stage}}</h1>
        </div>
    </div>
</template>

<script>
    import store from '../../store'
    export default {
        name: "index",
        computed:{
            lists: () => store.state.project.list
        },
        async beforeRouteEnter (to, from, next) {
            // 等待模型数据加载完毕,才继续进行vue组件的生命周期
            await store.dispatch('projectFetch',{id:1})
            next()
        },
        created(){
        }
    }
</script>

<style scoped>
    .post-index{
        text-align: center;
    }
</style>