<template>
    <div>
        <el-card>
            <el-button plain icon="el-icon-refresh" @click="onRefresh" ></el-button>
            <el-button type="primary" plain @click="onInsertClick" v-if="insertButton">新增</el-button>
            <el-button type="danger" plain @click="onDeleteSelection" :disabled="selection.length < 1" v-if="updateButton">删除</el-button>
            <slot name="header">

            </slot>
        </el-card>
        <br>
        <el-card>
            <slot name="table" v-bind:tableData="tableData">
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
                            v-if="selectionColumn"
                            type="selection"
                            width="55">
                    </el-table-column>

                    <template v-for="(column,key) in columns" v-if="!column.hideTable">

                        <slot :name="'column_' + column.name" v-bind:index="key">
                            <!--注意：自定义列需要绑定key，不绑定可能列变化会出现问题-->
                            <el-table-column
                                    :width="column.width"
                                    :key="key"
                                    :label="column.comment?column.comment:column.name"
                            >
                                <template slot-scope="scope">
                                    <timestamp-table-column
                                            v-if="column.show_type === 'timestamp'"
                                            :value="scope.row[column.name]"></timestamp-table-column>
                                    <images-table-column v-else-if="column.show_type === 'image'"
                                                         :value="scope.row[column.name]"></images-table-column>
                                    <select-column v-else-if="column.show_type === 'select'"
                                                   type="table"
                                                   :options="column.selectOptions"
                                                   :options-url="column.selectOptionsUrl"
                                                   :label-key="column.selectLabel"
                                                   :value-key="column.selectValue"
                                                   :value="scope.row[column.name]"></select-column>
                                    <switch-column
                                            v-else-if="column.show_type === 'switch'"
                                            :value="scope.row[column.name]">
                                    </switch-column>
                                    <div v-else>{{scope.row[column.name]}}</div>

                                </template>
                            </el-table-column>
                        </slot>

                    </template>

                    <slot name="plus_column">
                    </slot>

                    <slot name="action" v-if="actionColumn">
                        <el-table-column label="操作" min-width="200">
                            <template slot-scope="scope">
                                <el-button type="warning" plain @click="onUpdateRow(scope.row)">编辑</el-button>
                                <el-button type="danger" plain @click="onDeleteRows([scope.row])">删除</el-button>
                                <slot name="col-buttons-plus"></slot>
                            </template>
                        </el-table-column>
                    </slot>

                </el-table>
            </slot>

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
        </el-card>


        <el-dialog
                title="添加"
                :visible.sync="visualInsertForm"
        >
            <slot name="insertForm">
                <crud-insert-form
                        @insert-success="onRefresh"
                        :insert-url="insertUrl"
                        :columns="columns"
                        :upload-file-url="uploadFileUrl"
                />
            </slot>
        </el-dialog>

        <el-dialog
                title="更新"
                :visible.sync="visualUpdateForm"
        >
            <slot name="updateForm">
                <crud-update-form
                        @update-success="onRefresh"
                        :form="updateRow"
                        :update-url="updateUrl"
                        :columns="columns"
                        :upload-file-url="uploadFileUrl"
                />
            </slot>
        </el-dialog>
    </div>
</template>

<script>
    import CrudInsertForm from "./CrudInsertForm";
    import CrudUpdateForm from "./CrudUpdateForm";
    import TimestampTableColumn from "./TimestampTableColumn";
    import ImagesTableColumn from "./ImagesTableColumn";
    import SelectColumn from "./SelectColumn";
    import SwitchColumn from "./SwitchColumn";

    export default {
        name: "CrudIndex",
        components: {SwitchColumn, SelectColumn, ImagesTableColumn, TimestampTableColumn, CrudUpdateForm, CrudInsertForm},
        props: {
            selectionColumn: {
              type:Boolean,
              default: true
            },
            actionColumn: {
                type:Boolean,
                default: true
            },
            insertButton: {
                type:Boolean,
                default: true
            },
            updateButton: {
                type:Boolean,
                default: true
            },
            indexUrl: {
                type: String,
                required: true
            },
            insertUrl: {
                type: String,
                required: true

            },
            updateUrl: {
                type: String,
                required: true
            },
            deleteUrl: {
                type: String,
                required: true
            },
            uploadFileUrl: {
                type: String,
                required: true
            },
            primaryName: {
                type: String,
                default: 'id'
            },
            columns: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                // 表格是否显示加载状态
                tableLoading: false,
                // 被选中的rows
                selection: [],
                // 表格的数据
                tableData: [],
                // 待更新的行
                updateRow: {},
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
                    const res = await this.$http.post(this.indexUrl, params)
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
                this.$emit('update', row)
            },

            // 删除选中的rows
            onDeleteSelection() {
                this.onDeleteRows(this.selection)
            },

            onDeleteRows(rows) {
                const ids = rows.map(row => {
                    return row[this.primaryName]
                }).join(',')
                this.$http.delete(this.deleteUrl + '?ids=' + ids).then(
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

</style>
