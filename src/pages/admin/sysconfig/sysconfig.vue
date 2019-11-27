<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="简洁模式">
                <el-card>
                    <el-button type="primary" @click="refresh">刷新配置</el-button>
                    <el-button type="warning" @click="submit">保存配置</el-button>
                </el-card>
                <br>
                <el-card>
                    <el-card>
                <span class="config-item">
                    <label>邀请赠送币种：</label>
                    <select-column
                            label-key="name"
                            value-key="id"
                            :options="coinOptions"
                            v-model="configs.inviteCoin"
                    ></select-column>
                </span>

                        <span class="config-item">
                    <label>邀请赠送币种数量：</label>
                    <el-input-number v-model="configs.inviteCoinNumber"
                    ></el-input-number>
                </span>

                        <div class="config-item" style="display: flex">
                            <label>邀请赠送文字提示：</label>
                            <el-input
                                    type="textarea"
                                    autosize
                                    style="width: 500px"
                                    v-model="configs.inviteCoinTip"
                            >
                            </el-input>
                        </div>
                    </el-card>
                    <br>
                    <el-card>
                <span>
                    <label>充值地址：</label>
                <el-input
                        style="width: 500px"
                        v-model="configs.invsetAddress"
                >
                </el-input>
                </span>
                    </el-card>
                    <br>
                    <el-card>
                        <label>联系我们：</label>
                        <article-column v-model="configs.contactContent" upload-url="/api/file/upload"></article-column>
                    </el-card>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="列表模式">
                <crud-index
                        index-url="/admin/sys_config/index"
                        insert-url="/admin/sys_config/insert"
                        update-url="/admin/sys_config/update"
                        delete-url="/admin/sys_config/delete"
                        upload-file-url="/api/file/upload"
                        :columns="columns"
                        ref="crud"
                ></crud-index>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    import Layout from "../layout";
    import SelectColumn from "../../../components/crud/SelectColumn";
    import CrudInsertForm from "../../../components/crud/CrudInsertForm";
    import ArticleColumn from "../../../components/crud/ArticleColumn";

    export default {
        name: "sysconfig",
        components: {ArticleColumn, CrudInsertForm, SelectColumn, Layout, CrudIndex},
        data() {
            return {
                configs: {
                    inviteCoin: '',
                    inviteCoinNumber: 0,
                    inviteCoinTip: ''
                },
                coinOptions: [],
                columns: [
                    {name: 'id', primary: true},
                    {name: 'key', comment: '配置名称'},
                    {name: 'value', comment: '值'},
                    {name: 'comment', comment: '备注'},
                ]
            }
        },
        mounted() {
            this.$http.get("/admin/coin/index?size=all").then(res => this.coinOptions = res.list)
            this.$http.get("/admin/sys_config/getConfigs?size=all").then(res => this.configs = res)
        },
        methods: {
            setConfig(key, value, comment) {
                // todo:这里要做成队列的才安全
                this.configs[key] = value
                this.$http.put("/admin/sys_config/set", {key, value, comment})
                    .then(() => this.$notify.success(comment + '配置更新成功'))
            },

            submit() {
                this.$http.post("/admin/sys_config/saveConfigs", {configs: this.configs})
                    .then(() => this.$notify.success('配置更新成功'))
            },

            async refresh() {
                await this.$http.post('/admin/sys_config/refresh')
                this.$http.get("/admin/sys_config/index?size=all").then(res => this.configs = res)
            }
        }
    }
</script>

<style scoped>
    .config-cell {
        display: flex;
        justify-content: left;
    }

    .config-item {
        margin: 10px;
    }
</style>
