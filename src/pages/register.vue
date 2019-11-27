<template>
    <div>
        <el-form ref="form" :model="form" label-width="40px">
            <el-card class="login-card">
                <h2 class="title">注册</h2>
                <el-form-item label="账号">
                    <el-input v-model="form.username" ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" show-password @keyup.enter="onSubmit()"></el-input>
                </el-form-item>
                <div style="text-align: center">
                    <el-button type="primary" @click="onSubmit">注册账号</el-button>
                </div>
            </el-card>
        </el-form>

        <div class="footer">
            <!--            Power by <a href="http://www.guotao.pro">GtGuiZhou</a>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit(){
                this.$http.post('/admin/admin/register',this.form).then(
                    res => {
                        this.$notify.success('注册成功')
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .login-card {
        width: 500px;
        margin: 200px auto;
    }

    .footer{
        text-align: center;
        width: 100%;
        color: gray;
    }

    .title{
        color: gray;
        margin: 20px;
        text-align: center;
    }

    .footer a{
        text-decoration: none;
        color: black;
    }
</style>