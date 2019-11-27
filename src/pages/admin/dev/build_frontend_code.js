export default function (tableName, columns) {
    const indexUrl = '/admin/' + tableName + '/index'
    const deleteUrl= '/admin/' + tableName + '/delete'
    const componentName = tableName
    const insertFormName = `${tableName}_insert_form`
    const updateFormName = `${tableName}_update_form`
    let primaryName = 'id'
    let tableColCode = ''
    for (const column of columns) {
        if (column['primary']) {
            primaryName = column['name']
        }

        switch (column['ui_type']) {
            case 'date':
                break;
            default:
                tableColCode += `
                    <el-table-column
                    prop="${column['name']}"
                    label="${column['comment']?column['comment']:column['name']}"
                    ></el-table-column>
`
        }
    }

    return `<template>
    <div>
        <el-button plain icon="el-icon-refresh" @click="onRefresh"></el-button>
        <el-button type="primary" plain @click="onInsertClick">新增</el-button>
        <el-button type="danger" plain @click="onDeleteSelection" :disabled="selection.length < 1">删除</el-button>
        <el-table
                v-loading="tableLoading"
                element-loading-text="加载中..."
                :data="tableData"
                stripe
                style="width: 100%"
                el-table-column
                @selection-change="onSelectionChange"
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            ${tableColCode}
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="warning" @click="onUpdateRow(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="onDeleteRows([scope.row])">删除</el-button>
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
                title="添加"
                :visible.sync="visualInsertForm"
        >
            <insert_form @close="visualInsertForm = false" @insert-success="onRefresh"></insert_form>
        </el-dialog>

        <el-dialog
                title="更新"
                :visible.sync="visualUpdateForm"
        >
            <update_form @close="visualUpdateForm = false"
                              @update-success="onRefresh"
                              :form="updateRow"></update_form>
        </el-dialog>
    </div>
</template>

<script>
    //请求前缀
    const indexUrl = '${indexUrl}'
    const deleteUrl = '${deleteUrl}'
    const primaryName = '${primaryName}'
    const componentName = '${componentName}'

    // 导入组件
    import insert_form from "./${insertFormName}";
    import update_form from "./${updateFormName}";

    export default {
        name: componentName,
        components: {
            insert_form,
            update_form
        },
        data() {
            return {
                // 表格是否显示加载状态
                tableLoading: false,
                // 被选中的rows
                selection: [],
                // 表格的数据
                tableData: [],
                // 待更新行
                updateRow: null,
                visualInsertForm: false,
                visualUpdateForm: false,
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
        methods: {
            /**
             * 初始化加载数据
             * @param page 分页对象
             * @param where 查询条件
             */
            async loadData(page = this.page, where = {}) {
                this.tableLoading = true
                try {
                    const params = {
                        index: this.page.index,
                        size: this.page.size
                    }
                    const res = await this.$http.post(indexUrl, params)
                    this.tableData = res.list
                    this.page.total = res.total
                } finally {
                    this.tableLoading = false
                }
            },

            // 重新加载数据
            onRefresh() {
                this.loadData()
            },

            // 当选中rows修改时，将这些选中的rows保存到selection中
            onSelectionChange(selection) {
                this.selection = selection
            },

            // 新增按钮点击
            onInsertClick() {
                this.visualInsertForm = true
            },

            // 编辑按钮点击
            onUpdateRow(row) {
                this.visualUpdateForm = true
                this.updateRow = row
            },

            // 删除选中的rows
            onDeleteSelection() {
                this.onDeleteRows(this.selection)
            },

            onDeleteRows(rows) {
                const ids = rows.map(row => {
                    return row[primaryName]
                }).join(',')
                this.$http.delete(deleteUrl +'?ids=' + ids).then(
                    () => {
                        this.$message.success('删除成功')
                        this.loadData()
                    }
                )
            },


        }
    }
</script>

<style scoped>

</style>`
}