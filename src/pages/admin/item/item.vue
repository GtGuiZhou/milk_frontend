<template>
    <div>
        <crud-index
                index-url="/admin/item/index"
                insert-url="/admin/item/insert"
                update-url="/admin/item/update"
                delete-url="/admin/item/delete"
                upload-file-url="/api/file/upload"
                :columns="columns"
                ref="crud"
        >
            <template v-slot:plus_column>
                <el-table-column
                        width="120"
                        label="项目币种管理"
                >
                    <template slot-scope="scope">
                        <el-button type="success" plain @click="editCoin(scope.row)">编辑币种</el-button>
                    </template>
                </el-table-column>
<
            </template>
        </crud-index>

        <el-dialog
                width="1450px"
                title="项目币种管理"
                :visible.sync="visualCoinManager"
        >
            <item-coin :options="coinOptions" @add="addItemCoin" type="add" :value="itemCoin"></item-coin>
            <item-coin readonly :options="coinOptions" type="delete" v-for="(item,index) in itemCoins" :key="index"
                       @delete="delItemCoin" :value="item"></item-coin>
        </el-dialog>


    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    import CrudInsertForm from "../../../components/crud/CrudInsertForm";
    import ItemCoin from "./components/ItemCoin";
    import SupportCoin from "./components/SupportCoin";

    export default {
        name: "item",
        components: {SupportCoin, ItemCoin, CrudInsertForm, CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id', primary: true},
                    {name: 'image', comment: '项目图片', show_type: "image"},
                    {name: 'video', comment: '项目视频', show_type: 'file'},
                    {name: 'lv', comment: '评级', show_type: 'rate', default: 0},
                    {name: 'handle_fee', comment: '手续费', show_type: "number", default: 0},
                    {name: 'duration', comment: '周期', show_type: "number", default: 0},
                    {
                        name: 'begin_time',
                        comment: '开始时间',
                        show_type: "timestamp",
                        default: new Date().getTime() / 1000,
                        width: 100
                    },
                    {name: 'rule', comment: '投资规则', show_type: "article", hideTable: true},
                    {name: 'description', comment: '详情', show_type: "article", hideTable: true},
                    {name: 'comment', comment: '说明', show_type: "article", hideTable: true},
                ],
                coinOptions: [],
                itemCoin: {coin_id: '',support_coin_id: ''},
                itemCoins: [],
                editRow: null,
                visualCoinManager: false,
                visualSupportCoinManager: false
            }
        },
        mounted() {
            this.getCoinList()
        },
        methods: {
            getCoinList() {
                this.$http.get("/admin/coin/index?size=all").then(res => this.coinOptions = res.list)
            },
            async editCoin(row) {
                this.editRow = row
                this.itemCoin.item_id = row.id
                this.itemCoins = await this.$http.get('/admin/item_coin/getByItemId?item_id=' + this.editRow.id)
                this.visualCoinManager = true
            },
            async addItemCoin() {
                await this.$http.post('/admin/item_coin/insert', this.itemCoin)
                this.itemCoins = await this.$http.get('/admin/item_coin/getByItemId?item_id=' + this.editRow.id)
                this.itemCoin = {item_id: this.editRow.id, coin_id: '', number: 0}
            },
            async delItemCoin(item) {
                await this.$http.delete('/admin/item_coin/delete?ids=' + item.id)
                this.itemCoins = await this.$http.get('/admin/item_coin/getByItemId?item_id=' + this.editRow.id)
            },

        }
    }
</script>

<style scoped>

</style>
