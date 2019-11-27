<template>
    <div>
        <el-button plain icon="el-icon-refresh" @click="onRefresh"></el-button>
        <el-button type="primary" plain @click="formVisible = true;isUpdateForm=false">新增</el-button>
        <el-button type="danger" plain @click="onDeleteSelection" :disabled="selection.length < 1">删除</el-button>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                @selection-change="onSelectionChange"
                row-key="id"
                :tree-props="{children: 'sub_rule', hasChildren: 'hasSubRule'}"
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
            ></el-table-column>
            <el-table-column
                    prop="url"
                    label="路径"
            ></el-table-column>
            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit"
                               @click="isUpdateForm = true;form = scope.row;formVisible = true"></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="onDeleteRow(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin: 10px">
            <el-pagination
                    @size-change="size => loadData({size:size,index:this.page.index})"
                    @current-change="index => loadData({size:this.page.size,index:index})"
                    :current-page="this.page.index"
                    :page-sizes="[10, 20, 50, 100, 'all']"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.page.total">
            </el-pagination>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="formVisible"
                width="600px"
        >
            <el-form ref="form" :model="form" label-width="80px" label-position="left">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="父级规则">
                    <el-select v-model="form.pid" filterable  placeholder="请选择">
                        <el-option
                                v-for="item in [{id:0,name:'无'}].concat(tableData)"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="路径">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="!isUpdateForm" @click="onFormSave">保存</el-button>
                    <el-button type="primary" v-else @click="onFormUpdate">更新</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    //请求前缀
    const request_prefix = '/rule'
    export default {
        name: "rule",
        data() {
            return {
                // 表单是用来更新还是新增
                isUpdateForm: false,
                // 是否显示表单
                formVisible: false,
                // 表单加载框
                formLoading: false,
                // 显示表单（只在前端显示用）
                form: {
                    name: '',
                    url: '',
                    pid: 0
                },
                // 提交表单（发到后台去，跟随form变动，便于在提交之前进行数据修改）
                submitForm: null,
                // 被选中的rows
                selection: [],
                // 表格的数据
                tableData: [],
                // 分页设定
                page: {
                    size: 10,
                    index: 1,
                    total: 0,
                    pid:0
                }
            }
        },
        created() {
            this.loadData()
        },
        watch: {
            form:{
                handler(val){
                    this.submitForm = val
                },
                deep: true
            },

        },
        methods: {
            /**
             * 初始化加载数据
             */
            loadData() {
                this.$request.get(request_prefix + '/tree').then(
                    res => {
                        this.tableData = res.data
                    }
                )
            },

            // 在上传单图之前进行检测
            beforeUploadSingleImage(file) {
                if (file.size > 2097152) {
                    this.$message.warning('上传文件不能大于2m')
                    return false
                }
            },

            // 成功上传单张图
            successUploadSingleImage(res) {
                this.form.image = res.data
            },

            // 重新加载数据
            onRefresh() {
                this.loadData()
            },

            // 当选中rows修改时，将这些选中的rows保存到selection中
            onSelectionChange(selection){
                this.selection = selection
            },

            // 删除选中的rows
            onDeleteSelection(){
                this.onDeleteRow(this.selection.map(item => {
                    return item.id
                }))
            },


            // 删除一行内容
            onDeleteRow(ids) {
                if (ids instanceof Array) {
                    ids = ids.join(',')
                }
                this.$request(request_prefix + '/delete?ids=' + ids).then(
                    () => {
                        this.$message.success('删除成功')
                        this.loadData()
                    }
                )
            },

            // 保存表单中的内容
            onFormSave() {
                this.formLoading = true
                this.$request.post(request_prefix + '/save', this.submitForm).then(
                    () => {
                        this.$message.success('保存成功')
                        this.formVisible = false
                        this.loadData()
                        this.formLoading = false
                    }
                ).catch(
                    () => {
                        this.formLoading = false
                    }
                )
            },

            // 将表单内容更新到后台
            onFormUpdate() {
                this.formLoading = true
                this.$request.put(request_prefix + '/update', this.submitForm).then(
                    () => {
                        this.$message.success('更新成功')
                        this.formVisible = false
                        this.loadData()
                        this.formLoading = false
                    }
                ).catch(
                    () => {
                        this.formLoading = false
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>