<template>
    <div>
        <el-form ref="form" :model="form" label-width="40px">
            <el-card class="login-card">
                <h2 class="title">登录</h2>
                <el-form-item label="账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" show-password @keyup.enter="onSubmit()"></el-input>
                </el-form-item>
                <div style="text-align: center">
                    <el-button type="primary" @click="onSubmit">登陆系统</el-button>
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
                    username: 'admin',
                    password: 'cs123456'
                }
            }
        },
        methods: {
            onSubmit(){
                this.$http.post('/admin/admin/login',this.form).then(
                    res => {
                        console.log(this.$router.options.routes)
                        // this.$store.commit('setUser',res.data.user)
                        this.$router.replace('/admin')
                        return
                        // 有bug，从其他网站网页进来也会返回
                        if(this.$router.options.routes.length > 0){
                            this.$router.back() // 不用担心上一个页面是login页面，进而导致死循环，因为vuerouter不允许跳转同一个页面
                        } else {

                        }
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
