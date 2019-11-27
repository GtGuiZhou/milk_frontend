<template>
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
            <el-table-column
                    prop="id"
                    label="id"
            ></el-table-column>

            <el-table-column
                    prop="username"
                    label="用户名"
            ></el-table-column>
            <el-table-column
                    prop="nickname"
                    label="昵称"
            ></el-table-column>

            <el-table-column
                    prop="email"
                    label="邮箱"
            ></el-table-column>

            <el-table-column
                    prop="email"
                    label="电话"
            ></el-table-column>


            <el-table-column
                    prop="login_fail_count"
                    label="登录失败次数"
            ></el-table-column>

            <el-table-column
                    prop="login_ip"
                    label="登录ip"
            ></el-table-column>

            <el-table-column
                    width="280"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="success" @click="lottery(scope.row)" plain>中奖</el-button>
                    <el-button type="warning" @click="onUpdateRow(scope.row)" plain>编辑</el-button>
                    <el-button type="danger" @click="onDeleteRows([scope.row])" plain>删除</el-button>
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
            <crud_insert_form @close="visualInsertForm = false" @insert-success="onRefresh"></crud_insert_form>
        </el-dialog>

        <el-dialog
                title="更新"
                :visible.sync="visualUpdateForm"
        >
            <crud_update_form @close="visualUpdateForm = false"
                              @update-success="onRefresh"
                              :form="updateRow"></crud_update_form>
        </el-dialog>

        <el-dialog
                title="更新"
                :visible.sync="visualLotteryForm"
        >
            <label>中奖币种：</label>
            <el-select   placeholder="请选择赠送币种"
                      v-model="lotteryCoin"
            >
                <el-option
                        v-for="option in coinOptions"
                        :key="option.id"
                        :label="option.name"
                        :value="option.id">
                </el-option>
            </el-select>
            &nbsp;
            <label>中奖币种数量：</label>
            <el-input-number  v-model="lotteryCoinNumber"></el-input-number>
            &nbsp;
            <el-button @click="submitLottery" type="primary" >提交中奖</el-button>
        </el-dialog>
    </div>
</template>

<script>
    //请求前缀
    const indexUrl = '/admin/user/index'
    const deleteUrl = '/admin/user/delete'
    const primaryName = 'id'
    const componentName = 'user'

    // 导入组件
    import crud_insert_form from "./user_insert_form";
    import crud_update_form from "./user_update_form";

    export default {
        name: componentName,
        components: {
            crud_insert_form,
            crud_update_form
        },
        data() {
            return {
                coinOptions: [],
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
                visualLotteryForm: false,
                lotteryCoinNumber: '',
                lotteryCoin: 0,
                // 分页设定
                page: {
                    size: 10,
                    index: 1,
                    total: 0,
                }
            }
        },
        created() {
            this.$http.get("/admin/coin/index?size=all").then(res => this.coinOptions = res.list)
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
                this.$http.delete(deleteUrl + '?ids=' + ids).then(
                    () => {
                        this.$message.success('删除成功')
                        this.loadData()
                    }
                )
            },

            lottery(row){
                this.updateRow = row
                this.visualLotteryForm = true
            },

            submitLottery(){
                this.$http.post('/admin/user/lottery',{
                    user_id: this.updateRow.id,
                    coin_id: this.lotteryCoin,
                    number:  this.lotteryCoinNumber
                }).then(() => this.$notify.success('中奖执行成功'))
            }

        }
    }
</script>

<style scoped>

</style>
