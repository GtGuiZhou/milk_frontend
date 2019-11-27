export default function (tableName, columns) {
    const updateUrl = '/admin/' + tableName + '/update'
    const componentName = tableName + '_update_form'
    let formFields = ''
    for (const column of columns) {
        const label = column['comment']?column['comment']:column['name'];
        const field = column['name'];
        switch (column['ui_type']) {
            case 'date':
                break;
            case 'number':
                formFields += `
                <el-form-item label="${label}">
                     <el-input-number v-model="form.${field}" ></el-input-number>
                </el-form-item>
`
                break;
            default:
                formFields += `
                <el-form-item label="${label}">
                    <el-input v-model="form.${field}"></el-input>
                </el-form-item>
`
        }
    }

    return `<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            ${formFields}
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-loading="loading">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //请求前缀
    const updateUrl = '${updateUrl}'
    const componentName = '${componentName}'

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

</style>`
}