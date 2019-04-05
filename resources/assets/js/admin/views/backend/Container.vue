<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

                <el-submenu index="1">
                    <template slot="title">空间</template>
                    <el-menu-item :index="'1-'+(index+1)" v-for="(list,index) in lists" :key="index" @click="to_space(list.id)">{{list.name}}</el-menu-item>

                </el-submenu>
                <el-menu-item index="2">
                    <el-button type="text" @click="dialogFormVisible = true">新建空间<i class="el-icon-plus"></i></el-button>

                </el-menu-item>
                <el-menu-item index="3" style="float: right">
                    <el-button type="text" @click="logout">退出</el-button>

                </el-menu-item>

            </el-menu>


        </el-header>
        <el-main>
            <el-dialog title="新建空间" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="空间名称" :label-width="formLabelWidth" prop="name" >
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="空间详情" :label-width="formLabelWidth" prop="desc">
                        <el-input v-model="form.desc" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click=" submitForm('form')">确 定</el-button>
                </div>
            </el-dialog>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
    import store from '@/store'
    export default {
        data(){
            return {
                activeIndex: '1',
                formLabelWidth: '120px',
                dialogFormVisible: false,
                rules: {
                    name: [
                        { required: true, message: '请输入空间名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入空间描述', trigger: 'blur' }
                    ]
                },
                form: {
                    name: '',
                    desc: ''
                },
            }
        },
        computed:{
            lists: () => store.state.space.list,

        },
        async beforeRouteEnter (to, from, next) {
            // 等待模型数据加载完毕,才继续进行vue组件的生命周期
            await store.dispatch('spaceFetch')
            next()
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                localStorage.removeItem('token')
                this.$router.push({name:'login'})
            },
            to_space(id){
                this.$router.push({name:'spaces.show',params:{id:id}})
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
                const { name, desc } = this.form
                try {
                    await store.dispatch('spaceStore',{name,desc})
                    this.dialogFormVisible = false
                    this.intForm()
                    await store.dispatch('spaceFetch',{id:1})
                    this.$message.success('创建成功')
                }catch (e) {

                }


            },
            intForm(){
                this.form = {
                    name: '',
                    desc: ''
                }
            }
        }
    }
</script>