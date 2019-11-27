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
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="image"
                    label="图片"
            >
                <template slot-scope="scope">
                    <el-image
                            :file-list="fileList"
                            style="width: 100px; height: 100px"
                            :src="scope.row.image.thumb "
                            fit="fit">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="链接"
            ></el-table-column>
            <el-table-column
                    prop="group"
                    label="分组"
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
                    @size-change="size => loadData({size:size,index:page.index})"
                    @current-change="index => loadData({size:page.size,index:index})"
                    :current-page="page.index"
                    :page-sizes="[10, 20, 50, 100, 'all']"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="formVisible"
                width="600px"
        >
            <el-form ref="form" :model="form" label-width="60px" label-position="left">
                <el-form-item label="图片">
                    <el-upload
                            name="image"
                            drag
                            list-type="picture"
                            :on-success="successUploadBanner"
                            :before-upload="beforeUploadBanner"
                            :action="$uploadImageUrl + '?thumb=200'"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2m</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分组">
                    <el-input v-model="form.group"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="form.link"></el-input>
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
    export default {
        name: "banner",
        data() {
            return {
                tableFields: [
                    {prop: 'image', label: "图片"},
                    {prop: 'group', label: "分组"},
                    {prop: 'link', label: "链接"},
                ],
                isUpdateForm: false,
                formVisible: false,
                formLoading: false,
                selection: [],
                tableData: [],
                page: {
                    size: 10,
                    index: 1,
                    total: 0,
                },
                form: {
                    image: '',
                    group: '',
                    link: ''
                }
            }
        },
        created() {
            this.loadData()
        },
        computed: {
            fileList() {
                return [this.form.image]
            }
        },
        methods: {
            loadData(page = this.page, where = {}) {
                this.$request.post('/banner/index', {page, where}).then(
                    res => {
                        this.tableData = res.data.list
                        this.page = res.data.page
                    }
                )
            },
            beforeUploadBanner(file) {
                if (file.size > 2097152) {
                    this.$message.warning('上传文件不能大于2m')
                    return false
                }
            },
            successUploadBanner(res) {
                this.form.image = res.data
            },

            onRefresh() {
                this.loadData()
            },

            onSelectionChange(selection){
                this.selection = selection
            },

            onDeleteSelection(){
                this.onDeleteRow(this.selection.map(item => {
                    return item.id
                }))
            },

            onDeleteRow(ids) {
                if (ids instanceof Array) {
                    ids = ids.join(',')
                }
                this.$request('/banner/delete?ids=' + ids).then(
                    () => {
                        this.$message.success('删除成功')
                        this.loadData()
                    }
                )
            },

            onFormSave() {
                this.formLoading = true
                this.$request.post('/banner/save', this.form).then(
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
            onFormUpdate() {
                this.formLoading = true
                this.$request.put('/banner/update', this.form).then(
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