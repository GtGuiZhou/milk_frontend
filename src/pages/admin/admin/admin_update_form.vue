<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.adminname"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-loading="loading">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //请求前缀
    const updateUrl = '/admin/admin/update'
    const componentName = 'admin_update_form'

    export default {
        name:componentName,
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            async onSubmit(){
                this.loading = true
                try {
                    await this.$http.post(updateUrl,this.form)
                    this.$notify.success('修改成功')
                    this.$emit('update-success')
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style scoped>

</style>