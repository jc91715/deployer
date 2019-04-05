<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-form :model="form" :rules="rules" ref="form" label-position="top">
                    <el-form-item label="服务器名称" :label-width="formLabelWidth" prop="name" >
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器配置" :label-width="formLabelWidth" prop="content">
                        <el-input v-model="form.name" autocomplete="off" type="hidden"></el-input>
                        <codemirror v-model="form.content" :options="cmOptions"></codemirror>
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
        props:['id','server_id'],
        data(){
            return {
                formLabelWidth: '120px',
                form:{
                    space_id:this.id,
                    name:'',
                    content:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入服务器名称', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入服务器配置', trigger: 'blur' }
                    ]
                },
                cmOptions: {
                    // codemirror options
                    tabSize: 4,
                    mode: 'text/x-yaml',
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
                const { space_id,name,content } = this.form

                await store.dispatch('serverUpdate', {space_id,server_id:this.server_id, name, content})
                this.$message.success('更新成功')
                this.$router.push({name:'spaces.show',params:{id:this.id},query:{activeName:'second'}})

            },
        },
       async created(){
            const data = await store.dispatch('serverShow',{space:this.id,server_id:this.server_id})
            const { space_id,name,content} = data.data.server
            const form = { space_id,name,content}
            this.form = form
        }
    }
</script>

<style scoped>

</style>