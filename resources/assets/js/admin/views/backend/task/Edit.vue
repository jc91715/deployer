<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-form :model="form" :rules="rules" ref="form" label-position="top">
                    <el-form-item label="任务名称" :label-width="formLabelWidth" prop="name" >
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="任务配置" :label-width="formLabelWidth" prop="code">
                        <el-input v-model="form.code" autocomplete="off" type="hidden"></el-input>
                        <codemirror v-model="form.code" :options="cmOptions"></codemirror>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">更新</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>

    </div>
</template>

<script>
    import store from '@/store'
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/monokai.css'


    export default {
        name: "Edit.vue",
        props:['id','task_id'],
        data(){
            return {
                formLabelWidth: '120px',
                form:{
                    space_id:this.id,
                    name:'',
                    code:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入任务名称', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入任务配置', trigger: 'blur' }
                    ]
                },
                cmOptions: {
                    // codemirror options
                    tabSize: 4,
                    mode: 'text/x-php',
                    styleActiveLine: true,
                    theme: 'monokai',
                    lineNumbers: true,
                    line: true,
                    // more codemirror options, 更多 codemirror 的高级配置...
                }
            }
        },
        components: {
            codemirror
        },
        methods:{
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
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
                const { space_id,name,code } = this.form
                // try {
                    await store.dispatch('taskUpdate', {space_id,task_id:this.task_id, name, code})
                    this.$message.success('更新成功')
                    this.$router.push({name:'spaces.show',params:{id:this.id},query:{activeName:'third'}})
                // }catch (e) {
                //
                // }



            },
        },
        async created(){
            const data = await store.dispatch('taskShow',{space:this.id,task_id:this.task_id})
            const { space_id,name,code} = data.data.task
            const form = { space_id,name,code}
            this.form = form
        }
    }
</script>

<style scoped>

</style>