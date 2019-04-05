<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-form :model="form" :rules="rules" ref="form" label-position="top">
                    <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name" >
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库地址" :label-width="formLabelWidth" prop="repository" >
                        <el-input v-model="form.repository" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="服务器选择" prop="server_id">
                        <el-select v-model="form.server_id" placeholder="请选择服务器" >
                            <el-option :label="server.name" :value="server.id" v-for="(server,index) in servers" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务选择" prop="task_ids">
                        <select name=""  class="multi-select" id="recipe_id" multiple="multiple">
                            <option :value="task.id" v-for="(task,index) in tasks" :key="index">{{task.name}}</option>
                        </select>
                    </el-form-item>
                    <el-form-item label="项目配置" :label-width="formLabelWidth" prop="env">
                        <el-input v-model="form.env" autocomplete="off" type="hidden"></el-input>
                        <codemirror v-model="form.env" :options="cmOptions"></codemirror>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')" :loading="loading">提交</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                    <input type="hidden" name="recipe_id_order[]" id="recipe_id_order">
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
    require('@/lib/vendor/lou/multi-select/css/multi-select.css')
    require('@/lib/vendor/lou/multi-select/js/jquery.multi-select.js')

    export default {
        name: "Create.vue",
        props:['id'],
        data(){
            return {
                formLabelWidth: '120px',
                form:{
                    space_id:this.id,
                    server_id:'',
                    task_ids:[],
                    name:'',
                    env:'',
                    repository:''
                },
                loading:false,
                rules: {
                    name: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' }
                    ],
                    repository: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' }
                    ],
                    server_id: [
                        { required: true, message: '请选择服务器', trigger: 'blur' }
                    ],
                    task_ids: [
                        { required: true, message: '请选择任务', trigger: 'blur' }
                    ],
                    env: [
                        { required: true, message: '请输入项目环境配置', trigger: 'blur' }
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
        computed:{
            servers:()=>store.state.space.item.servers,
            tasks:()=>store.state.space.item.tasks,
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
                this.loading = true
                const {  space_id,name,env,server_id,task_ids,repository } = this.form
                try {
                    await store.dispatch('projectStore', { space_id,name,env,server_id,task_ids,repository})
                    this.$message.success('创建成功')
                    this.$router.push({name:'spaces.show',params:{id:this.id},query:{activeName:'first'}})
                }catch (e) {

                }
                this.loading = false


            },
        },
        beforeCreate(){



        },
        async created(){
            await store.dispatch('spaceShow',{id:this.id})
            var vm=this
            console.log(this)
            this.$nextTick(()=>{
                $('.multi-select').multiSelect({
                    keepOrder: true,
                    afterSelect: function (value) {
                        var orderId = this.$container.attr('id').replace(/^ms\-/, '') + '_order';
                        var getVal = $('#' + orderId).val();
                        console.log(getVal)
                        var getValArray = getVal.split(',');
                        getValArray.push(value);
                        var newValArray = getValArray.filter(function (x) {
                            return x != '';
                        });

                        console.log(newValArray)
                        var newVal = newValArray.join(',');
                        vm.form.task_ids=_.cloneDeep(newVal).split(',')
                        $('#' + orderId).val(newVal);
                    },
                    afterDeselect: function (value) {
                        var orderId = this.$container.attr('id').replace(/^ms\-/, '') + '_order';
                        var getVal = $('#' + orderId).val();
                        var getValArray = getVal.split(',');
                        var newValArray = getValArray.filter(function (x) {
                            return x != value && x != '';
                        });

                        var newVal = newValArray.join(',');
                        vm.form.task_ids=_.cloneDeep(newVal).split(',')
                        $('#' + orderId).val(newVal);
                    }
                });
            })
        }
    }
</script>

<style scoped>

</style>