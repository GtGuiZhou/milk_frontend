<template>
    <div>
        <el-button plain icon="el-icon-refresh" @click="onRefresh"></el-button>
        <el-button type="primary" plain @click="onInsertClick">新增</el-button>
        <el-button type="danger" plain @click="onDeleteSelection" :disabled="selection.length < 1">删除</el-button>
        <el-table
                default-expand-all
                :data="tableData"
                stripe
                style="width: 100%"
                row-key="id"
                :tree-props="{children: 'sub_role', hasChildren: 'hasSubRole'}"
        >
            <el-table-column
                    prop="name"
                    label="角色名称"
            >
            </el-table-column>

            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit"
                               @click="onUpdateClick(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="onDeleteRow(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin: 10px" v-if="page">
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
                @open="openForm"
                :title="isUpdateForm?'编辑':'新增'"
                :visible.sync="formVisible"
                width="600px"
                @close="resetForm"
        >
            <el-form ref="form" :model="form" label-width="80px" label-position="left" >
                <el-form-item label="角色名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="父级角色">
                    <el-tree
                            :data="tableData"
                            default-expand-all
                            :props="{value:'id','label':'name',children:'sub_role'}"
                            @node-click="onParentRoleClick">
                         <span slot-scope="{ node, data }">
                             <span>
                                 {{data.name}}
                                 <i class="el-icon-check" v-if="data.id === form.pid"></i>
                             </span>
                         </span>
                    </el-tree>
                </el-form-item>
                <el-form-item label="权限规则">
                    <el-checkbox
                            v-for="rule in selectRoleRules"
                            :key="rule.id"
                            v-model="rule.checked">{{rule.name}}</el-checkbox>
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
    const request_prefix = '/role'
    // 初始表单
    const initForm =  {
        name:'',
        pid: '0',
        rules: []
    }
    export default {
        name: "role",
        data() {
            return {
                // 表单是用来更新还是新增
                isUpdateForm: false,
                // 是否显示表单
                formVisible: false,
                // 表单加载框
                formLoading: false,
                // 具体表单内容
                form: initForm,
                // 被选中的rows
                selection: [],
                // 表格的数据
                tableData: [],
                parentRoleRules: [],
                // 分页设定
                page: {
                    size: 10,
                    index: 1,
                    total: 0,
                }
            }
        },
        created() {
            this.loadData()
        },
        computed:{
          selectRoleRules: {
              get() {
                  return this.parentRoleRules.map((item) => {
                      if (this.form.rules.find(findItem => {
                          findItem.id === item.id
                      })) {
                          item.checked = true
                      } else {
                          item.checked = false
                      }

                      return item
                  })
              },

              set(val){
                  console.log(val)
                    this.form.rules = val.filter(item => {return item.checked})
              }
          }
        },
        methods: {

            openForm(){
                this.loadFormPidRules()
            },

            onParentRoleClick(parent){
                this.form.pid = parent.id
                this.loadFormPidRules()
            },

            loadFormPidRules(){
                if (this.form.pid === 0){
                    // 获取所有权限
                    this.$request.post('/rule/index',{page:{index:1,size:'all'}}).then(
                        res => {
                            this.parentRoleRules = res.data.list
                        }
                    )
                } else {
                    // 获取指定角色的权限
                    this.$request.get('/role/rules?id='+this.form.pid).then(
                        res => {
                            this.parentRoleRules = res.data
                        }
                    )
                }
            },

            /**
             * 初始化加载数据
             * @param page 分页对象
             * @param where 查询条件
             */
            loadData(page = this.page, where = {}) {
                this.$request.post(request_prefix + '/index', {page, where}).then(
                    res => {
                        this.tableData = res.data.list
                        this.page = res.data.page
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

            // 新增按钮点击
            onInsertClick(){
                this.formVisible = true
                this.isUpdateForm = false
            },

            // 编辑按钮点击
            onUpdateClick(row){
                this.form = row
                this.formVisible = true
                this.isUpdateForm = true
            },

            // 重置表单
            resetForm(){
                this.form = initForm
            },

            // 保存表单中的内容
            onFormSave() {
                this.formLoading = true
                this.$request.post(request_prefix + '/save', this.form).then(
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
                this.$request.put(request_prefix + '/update', this.form).then(
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