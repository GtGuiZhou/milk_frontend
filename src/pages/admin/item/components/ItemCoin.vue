<template>
    <div  style="margin-bottom: 10px">
        <div>
            <label>项目币种：</label>
            <el-select v-model="value.coin_id" placeholder="请选择">
                <el-option
                        v-for="option in options"
                        :key="option.id"
                        :label="option.name"
                        :value="option.id">
                </el-option>
            </el-select>
            &nbsp;&nbsp;

            <el-button v-if="type === 'delete'" type="danger" icon="el-icon-close" @click="delItemCoin()"></el-button>
            <el-button v-else plain type="primary" @click="addItemCoin()" icon="el-icon-plus"></el-button>
        </div>
        <div style="padding-left: 20px;padding-top: 10px">
            <item-coin-support v-if="type === 'delete'"  :options="options" @add="addSupportItemCoin" type="add" :value="supportItemCoin"></item-coin-support>

            <item-coin-support :options="options" type="delete" v-for="(item,index) in supportItemCoins" :key="index"
                               @delete="delSupportItemCoin" :value="item"></item-coin-support>

        </div>
    </div>
</template>

<script>
    import ItemCoinSupport from "./SupportCoin";
    export default {
        name: "itemCoin",
        components: {ItemCoinSupport},
        props: {
            type: {
                default: 'add'
            },
            value: {
                type: Object,
                required: true,
            },
            options:{
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                supportItemCoin: {
                    coin_id: '', total_number: 0,max_number: 0,min_number: 0,rate: 0
                },
                supportItemCoins: []
            }
        },
        async created(){
            if (this.type === 'delete'){
                this.supportItemCoin.item_coin_id = this.value.id
                this.supportItemCoin.item_id = this.value.item_id
                this.supportItemCoins = await this.$http.get('/admin/support_item_coin/getByItemCoinId?item_coin_id=' + this.value.id)
            }
        },
        methods: {
            addItemCoin() {
                this.$emit('add')
            },

            delItemCoin() {
                this.$emit('delete', this.value)
            },

            async addSupportItemCoin(){
                await this.$http.post('/admin/support_item_coin/insert', this.supportItemCoin)
                this.supportItemCoins = await this.$http.get('/admin/support_item_coin/getByItemCoinId?item_coin_id=' + this.value.id)
                this.supportItemCoin = {item_coin_id: this.value.id,item_id: this.value.item_id,coin_id: '', rate: 0}
            },

            async delSupportItemCoin(item){
                await this.$http.delete('/admin/support_item_coin/delete?ids=' + item.id)
                this.supportItemCoins = await this.$http.get('/admin/support_item_coin/getByItemCoinId?item_coin_id=' + this.value.id)
            }

        }
    }
</script>

<style scoped>

</style>
