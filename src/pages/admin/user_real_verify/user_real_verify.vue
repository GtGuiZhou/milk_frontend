<template>
    <div>
        <crud-index
                index-url="/admin/user_real_verify/index"
                insert-url="/admin/user_real_verify/insert"
                update-url="/admin/user_real_verify/update"
                delete-url="/admin/user_real_verify/delete"
                upload-file-url="/api/file/upload"
                :selection-column="false"
                :columns="columns"
                ref="crud"
        >
            <template slot="action">
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <el-button type="success" plain @click="adopt(scope.row)">通过</el-button>
                        <el-button type="danger" plain @click="reject(scope.row)">拒绝</el-button>
                    </template>
                </el-table-column>
            </template>
        </crud-index>
    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    export default {
        name: "user_real_verify",
        components: {CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id',primary: true},
                    {name: 'user_id'},
                    {name: 'images',comment:'身份证正反面',show_type:"image"},
                    {name: 'status_text',comment:'状态',show_type:"enum"},
                    {name: 'create_time',comment:'提交时间',show_type:"timestamp"},
                ]
            }
        },
        methods: {
            async adopt(row){
                await this.$http.put('/admin/user_real_verify/adopt?id=' + row.id)
                this.$refs.crud.onRefresh()
            },
            async reject(row){
                await this.$http.put('/admin/user_real_verify/reject?id=' + row.id)
                this.$refs.crud.onRefresh()
            },
        }
    }
</script>

<style scoped>

</style>
