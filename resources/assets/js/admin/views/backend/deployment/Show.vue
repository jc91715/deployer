<template>
    <div >
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <pre>
                    <code>
                        {{message}}
                    </code>
                </pre>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import store from '@/store'
    export default {
        name: "Show",
        props:['id','project_id','deployment_id'],
        data(){
          return {
              deployment:{},
              message:'',
              time:''
          }
        },
        methods:{
            async showDeployment(){

                const data = await store.dispatch('deploymentShow',{space:this.id,project:this.project_id,deployment:this.deployment_id})
                this.deployment = data.data.deployment
                this.message = data.data.deployment.message

                if(this.deployment.status==1){
                    console.log(this.id)
                    this.time =  setInterval(()=>{
                        const data =   store.dispatch('deploymentShow',{space:this.id,project:this.project_id,deployment:this.deployment_id})
                        data.then(res=>{

                            this.deployment = res.data.deployment
                            this.message = res.data.deployment.message
                        })

                        if(this.deployment.status!=1){
                            clearInterval(this.time)
                        }
                    },2000)
                }else{
                    clearInterval(this.time)
                }
            }
        },
        async created(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(()=>{
                loading.close();
                this.showDeployment()
            },3000)

            // const data = await store.dispatch('deploymentShow',{space:this.id,project:this.project_id,deployment_id:this.deployment_id})
            // this.deployment = data.data.deployment
        }
    }
</script>

<style scoped>

</style>