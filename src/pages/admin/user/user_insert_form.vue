<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="自动重置">
                <el-switch
                        v-model="autoReset"
                        active-color="#13ce66"
                        inactive-color="#eeeeee">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-loading="loading">立即创建</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //请求前缀
    const insertUrl = '/admin/user/insert'
    const componentName = 'user_insert_form'

    // 初始化表单
    const initForm =  {
        username: '',
        password: ''
    }
    export default {
        name:componentName,
        data() {
            return {
                form: this.$until.jsonClone(initForm),
                loading: false,
                autoReset: true
            }
        },
        methods: {
            async onSubmit(){
                this.loading = true
                try {
                    await this.$http.post(insertUrl,this.form)
                    this.$notify.success('新增成功')
                    if (this.autoReset)
                        this.onReset()
                    this.$emit('insert-success')
                } finally {
                    this.loading = false
                }
            },
            onReset(){
                this.form = this.$until.jsonClone(initForm)
            }
        }
    }
</script>

<style scoped>

</style>