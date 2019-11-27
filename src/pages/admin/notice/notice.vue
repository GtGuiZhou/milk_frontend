<template>
    <div>
        <crud-index
                index-url="/admin/notice/index"
                insert-url="/admin/notice/insert"
                update-url="/admin/notice/update"
                delete-url="/admin/notice/delete"
                upload-file-url="/api/file/upload"
                :columns="columns"
                ref="crud"
        >
            <template v-slot:table="props">
                <el-card
                        style="width: 300px;height: 400px;overflow-y: hidden;position: relative"
                        v-for="(notice,index) in props.tableData" :key="index"
                >
                    <div v-html="notice.content" style="max-height: 300px;overflow-y: hidden"></div>
                    <div>
                        ...
                    </div>
                    <div style="position: absolute;bottom: 5px;left: 0;width: 100%">
                        <div style="text-align: right;padding: 15px">
                            <el-button plain type="success"  @click="$refs.crud.onUpdateRow(notice)">编辑</el-button>
                            <el-button plain type="danger"@click="$refs.crud.onDeleteRows([notice])" >删除</el-button>
                        </div>
                    </div>
                </el-card>
                <div v-if="props.tableData.length < 1" style="text-align: center;color: gray">
                    <small>暂无内容</small>
                </div>
            </template>
        </crud-index>
    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    import TimestampWord from "../../../components/TimestampWord";
    export default {
        name: "notice",
        components: {TimestampWord, CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id',primary: true},
                    {name: 'content',comment: '内容',show_type: 'article'},
                    {name: 'create_time',comment: '创建时间',show_type: 'timestamp',hideInsert:true,hideUpdate: true},
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
