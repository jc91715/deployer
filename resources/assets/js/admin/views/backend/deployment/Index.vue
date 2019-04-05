<template>
    <div>
        <el-button type="text" @click="dialogFormVisible = true">发布<i class="el-icon-plus"></i></el-button>
        <el-table
                :data="lists"
                height="500"
                border
                style="width: 100%">
            <el-table-column
                    prop="stage"
                    label="分支"
            >
            </el-table-column>
            <el-table-column
                    prop="hash"
                    label="hash"
            >
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新建发布" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="分支" :label-width="formLabelWidth" prop="stage" >
                    <el-input v-model="form.stage" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="hash" :label-width="formLabelWidth" prop="hash">
                    <el-input v-model="form.hash" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click=" submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import store from '@/store'
    export default {
        name: "Index",
        props:['id','project_id'],
        data(){
            return {
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    project_id: this.project_id,
                    stage: '',
                    hash: '',
                },
                rules: {
                    stage: [
                        { required: true, message: '请输入分支名字', trigger: 'blur' }
                    ],
                    hash: [
                        { required: true, message: '请输入hash', trigger: 'blur' }
                    ],
                }
            }
        },
        computed:{
            lists: () => store.state.deployment.list,
            space: () => store.state.space.item,
            project: () => store.state.project.item,
        },
        async beforeRouteEnter (to, from, next) {
            // 等待模型数据加载完毕,才继续进行vue组件的生命周期
            next()
        },
        async created(){
            await store.dispatch('deploymentFetch',{space:this.id,project:this.project_id})
        },
        methods:{
            async submitForm(formName) {
                var state=0
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        state=1
                    } else {
                        return false;
                    }
                });
                if(!state){
                    return
                }
                const { project_id,stage,hash } = this.form

                   const data =await store.dispatch('deploymentStore', {space:this.id,project_id,stage,hash})
                console.log(data)
                    this.$message.success('创建成功')
                console.log(this.id)
                    this.$router.push({name:'projects.deployments.show',params:{id:this.id,project_id:this.project_id,deployment_id:data.data.deployment.id}})




            },
        }
    }
</script>

<style scoped lang="less">
    .box{
        p{

        }
    }
</style>