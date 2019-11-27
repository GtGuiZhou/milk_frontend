<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <template v-for="(column,key) in columns">
                <slot :name="'column_' + column.name">
                    <el-form-item
                            v-if="!column.primary &&  !column.hideUpdate"
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
                </slot>
            </template>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-loading="loading">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //请求前缀

    import ImagesInputColumn from "./ImagesInputColumn";
    import TimestampColumn from "./TimestampColumn";
    import FileColumn from "./FileColumn";
    import RateColumn from "./RateColumn";
    import ArticleColumn from "./ArticleColumn";
    import SelectColumn from "./SelectColumn";
    import SwitchColumn from "./SwitchColumn";

    export default {
        name:"CrudUpdateForm",
        components: {
            SwitchColumn,
            SelectColumn, ArticleColumn, RateColumn, FileColumn, TimestampColumn, ImagesInputColumn},
        props: {
            form: {
                type: Object
            },
            updateUrl: {
                type: String,
            },
            uploadFileUrl: {
                type: String,
                required: true
            },
            columns: {
                type:Array,
                default: []
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
                    await this.$http.post(this.updateUrl,this.form)
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
