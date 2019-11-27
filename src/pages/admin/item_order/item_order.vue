<template>
    <div>
        <crud-index
                index-url="/admin/item_order/index"
                insert-url="/admin/item_order/insert"
                update-url="/admin/item_order/update"
                delete-url="/admin/item_order/delete"
                upload-file-url="/api/file/upload"
                :columns="columns"
                :actionColumn="false"
                ref="crud"
        >
            <template v-slot:header>
                <el-button type="warning" @click="releaseCoin($refs.crud.selection)">发放选中币种</el-button>
            </template>
            <template v-slot:plus_column>
                <el-table-column
                        width="120"
                        label="发放币种"
                >
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status == 0" type="success" plain @click="releaseCoin([scope.row])">发放</el-button>
                        <label v-else>已发放</label>
                    </template>
                </el-table-column>
            </template>
        </crud-index>
    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    export default {
        name: "item_order",
        components: {CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id', primary: true},
                    {name: 'item_id',comment: '项目'},
                    {name: 'user_id',comment: '用户'},
                    {name: 'item_coin_id',comment: '项目币种ID',width:100},
                    {name: 'item_coin_number',comment: '投资数量'},
                    {name: 'item_coin_rate',comment: '兑换比例'},
                    {name: 'support_coin_id',comment: '支持币种ID',width:100},
                    {name: 'support_number',comment: '支付数量'},
                    {name: 'handle_fee',comment: '手续费'},
                    {name: 'total_support_number',comment: '总支付数量'},
                    {name: 'status',comment: '状态',show_type: "select",selectOptions: [{id:0,name: '待发放'},{id:1,name:'已发放'}],selectLabel: 'name',selectValue: 'id'},
                    {name: 'create_time',comment: '支付时间',show_type: "timestamp",},
                ]
            }
        },
        methods: {
            releaseCoin(rows) {
                const ids = rows.map(row => {
                    return row.id
                }).join(',')
                this.$http.delete('/admin/item_order/releaseCoin/?ids=' + ids).then(
                    () => {
                        this.$message.success('发放成功')
                        this.$refs.crud.onRefresh()
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>