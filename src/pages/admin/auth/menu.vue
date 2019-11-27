<template>
    <div>
        <el-button type="primary" plain @click="formVisible = true;isUpdateForm = false">新增</el-button>
        <el-table
                border
                :data="tableData"
                stripe
                row-key="id"
                default-expand-all
                :tree-props="{children: 'sub_menu', hasChildren: 'hasSubMenu'}"
                style="width: 100%">
            <el-table-column
                    v-for="(field,key) in tableFields"
                    :key="key"
                    :prop="field.prop"
                    :label="field.label"
            >
            </el-table-column>
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

        <el-dialog
                :title="formVisible === 1?'新增':'编辑'"
                :visible.sync="formVisible"
                width="600px"
        >
            <el-form ref="form" :model="form" label-width="60px" label-position="left" v-loading="formLoading">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="父级">
                    <el-cascader
                            v-model="form.pid"
                            :options="[{name:'无',id:0}].concat(tableData)"
                            :props="{ expandTrigger: 'hover',value:'id','label':'name',children:'sub_menu',checkStrictly: true}"
                    >
                    </el-cascader>
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
        name: "menu",
        data() {
            return {
                tableFields: [
                    {prop: 'name', label: "菜单名称"},
                    {prop: 'icon', label: "图标"},
                    {prop: 'url', label: "链接"},
                ],
                tableData: [],
                isUpdateForm: false,
                formVisible: false,
                formLoading: false,
                form: {
                    id: '',
                    name: '',
                    url: '',
                    pid: '0',
                }
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.$request.get('/menu/index').then(
                    res => {
                        this.tableData = res.data
                    }
                )
                this.$store.dispatch('getMenu')
            },

            onDeleteRow(ids) {
                if (ids instanceof Array) {
                    ids = ids.join(',')
                }
                this.$request('/menu/delete?ids=' + ids).then(
                    () => {
                        this.$message.success('删除成功')
                        this.loadData()
                    }
                )
            },

            onFormSave() {
                this.formLoading = true
                this.$request.post('/menu/save', this.form).then(
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
                let [submitForm]  = [this.form].concat([])
                delete submitForm.sub_menu
                this.$request.put('/menu/update', submitForm).then(
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