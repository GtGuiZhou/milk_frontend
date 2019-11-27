<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <template v-for="(column,key) in columns">
                <el-form-item
                        v-if="!column.primary && !column.hideInsert"
                        :key="key"
                        :label="column.comment?column.comment:column.name">
                    <slot :name="'column_' + column.name" v-bind:form="form">
                        <!--普通输入组件-->
                        <el-input v-if="!column.show_type" v-model="form[column.name]"></el-input>
                        <!--图片组件-->
                        <file-column v-if="column.show_type === 'image'"
                                     v-model="form[column.name]"
                                     type="image"
                                     :upload-url="uploadFileUrl"
                        ></file-column>
                        <file-column v-if="column.show_type === 'file'"
                                     v-model="form[column.name]"
                                     type="file"
                                     :upload-url="uploadFileUrl"
                        ></file-column>
                        <!--数字-->
                        <el-input-number
                                v-if="column.show_type === 'number'"
                                v-model="form[column.name]"
                        ></el-input-number>
                        <!--时间戳-->
                        <timestamp-column
                                v-if="column.show_type === 'timestamp'"
                                v-model="form[column.name]"
                        ></timestamp-column>
                        <!--文章-->
                        <article-column
                                :upload-url="uploadFileUrl"
                                v-if="column.show_type === 'article'"
                                v-model="form[column.name]"
                        ></article-column>
                        <!--评级-->
                        <rate-column
                                v-model="form[column.name]"
                                v-if="column.show_type === 'rate'"></rate-column>
                        <!--选择-->
                        <switch-column
                                v-if="column.show_type === 'switch'"
                                v-model="form[column.name]"></switch-column>
                        <select-column
                                :options-url="column.selectOptionsUrl"
                                :label-key="column.selectLabel"
                                :value-key="column.selectValue"
                                :options="column.selectOptions"
                                v-model="form[column.name]"
                                v-if="column.show_type === 'select'"
                        ></select-column>
                    </slot>
                </el-form-item>

            </template>
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
    import ImagesInputColumn from "./ImagesInputColumn";
    import TimestampColumn from "./TimestampColumn";
    import FileColumn from "./FileColumn";
    import RateColumn from "./RateColumn";
    import ArticleColumn from "./ArticleColumn";
    import SelectColumn from "./SelectColumn";
    import SwitchColumn from "./SwitchColumn";

    export default {
        name: "CrudInsertForm",
        components: {
            SwitchColumn,
            SelectColumn, ArticleColumn, RateColumn, FileColumn, TimestampColumn, ImagesInputColumn},
        props: {
            insertUrl: {
                type: String,
            },
            uploadFileUrl: {
                type: String,
            },
            columns: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                form: this.getInitForm(),
                loading: false,
                autoReset: true
            }
        },
        watch: {
            columns: function (columns) {
                this.onReset()
            }
        },
        mounted() {
            this.onReset()
        },
        methods: {
            async onSubmit() {
                this.loading = true
                try {
                    await this.$http.post(this.insertUrl, this.form)
                    this.$notify.success('新增成功')
                    if (this.autoReset)
                        this.onReset()
                    this.$emit('insert-success')
                } finally {
                    this.loading = false
                }
            },
            getInitForm() {
                let form = {}
                for (const column of this.columns) {
                    if (!column.primary && !column.hideInsert) {
                        form[column.name] = column.default ? column.default : ''
                    }
                }
                return form
            },
            onReset() {
                this.form = this.getInitForm()
            }
        }
    }
</script>

<style scoped>

</style>
