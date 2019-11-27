export default function (tableName, columns) {
    const insertUrl = '/admin/' + tableName + '/insert'
    const componentName = tableName + '_insert_form'
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
    const insertUrl = '${insertUrl}'
    const componentName = '${componentName}'

    // 初始化表单
    const initForm =  {
        image: '',
        group: '',
        link: ''
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

</style>`
}