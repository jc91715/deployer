<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content">

                    <div style="margin: 100px;"></div>
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="formLabelAlign">
                        <el-form-item label="用户名"
                                      prop="username"
                                      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
                            <el-input v-model="formLabelAlign.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码"
                                      prop="password"
                                      :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },

    ]"
                        >
                            <el-input type="password" v-model="formLabelAlign.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('formLabelAlign')">提交</el-button>
                        </el-form-item>
                    </el-form>
                    </div>
            </el-col>
        </el-row>


    </div>

</template>

<script>
    import store from '../store'
    export default {
        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    grant_type: "password",
                    client_id: "2",
                    client_secret: "khSMMkbUclhrDIrgqM6BU3atPUUyi0y3xZ2TwzZb",
                    username: '',
                    password: '',
                    type: ''
                }
            };
        },
        methods:{
            async submitForm(formName) {

                 this.$refs[formName].validate((valid) => {
                    if (valid) {

                    } else {

                        return false;
                    }
                });
                const { username, password } = this.formLabelAlign
                try{
                    await store.dispatch('attemptLogin',{username,password})
                    this.$message.success('欢迎回来~')
                    this.$router.push({ name: 'project' })
                }catch (e) {
                    this.$message.error('账号密码错误！')
                }

            },
        }
    }
</script>

<style scoped lang="scss">
    .login{
        h1{
            font-size: 32px;
        }
    }
</style>