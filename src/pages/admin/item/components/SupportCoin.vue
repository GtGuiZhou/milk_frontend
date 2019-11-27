<template>
    <div style="margin-bottom: 10px">
        <label>支持币种：</label>
        <el-select v-model="value.coin_id" placeholder="请选择">
            <el-option
                    v-for="option in options"
                    :key="option.id"
                    :label="option.name"
                    :value="option.id">
            </el-option>
        </el-select>
        &nbsp;&nbsp;
        <label>硬顶数量：</label>
        <el-input-number
                v-model="value.total_number"
        ></el-input-number>
        &nbsp;&nbsp;
        <label>最低数量：</label>
        <el-input-number
                v-model="value.min_number"
        ></el-input-number>
        &nbsp;&nbsp;
        <label>最高数量：</label>
        <el-input-number
                v-model="value.max_number"
        ></el-input-number>
        &nbsp;&nbsp;
        <label>比例：</label>
        <el-input-number
                v-model="value.rate"
        ></el-input-number>
        &nbsp;&nbsp;
        <el-button v-if="type === 'delete'" type="danger" icon="el-icon-close" @click="delItemCoin()"></el-button>
        <el-button v-else plain type="primary" @click="addItemCoin()" icon="el-icon-plus"></el-button>
    </div>
</template>

<script>
    export default {
        name: "itemCoinSupport",
        props: {
            type: {
                default: 'add'
            },
            value: {
                type: Object,
                required: true,
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {}
        },
        methods: {
            addItemCoin() {
                this.$emit('add')
            },

            delItemCoin() {
                this.$emit('delete', this.value)
            }
        }
    }
</script>

<style scoped>

</style>
