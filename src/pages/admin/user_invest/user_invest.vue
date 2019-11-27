<template>
    <div>
        <crud-index
                index-url="/admin/user_invest/index"
                insert-url="/admin/user_invest/insert"
                update-url="/admin/user_invest/update"
                delete-url="/admin/user_invest/delete"
                upload-file-url="/api/file/upload"
                :columns="columns"
        >
        </crud-index>
    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    export default {
        name: "user_invest",
        components: {CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id',primary: true},
                    {name: 'user_id'},
                    {name: 'coin_id'},
                    {name: 'number',comment: '充值数量'},
                    {name: 'status',comment: '状态',show_type: "select",selectOptions: [{id: -1,name: '审核失败'},{id:0,name: '待审核'},{id:1,name:'审核成功'}],selectLabel: 'name',selectValue: 'id'},
                    {name: 'create_time',comment: '创建时间',show_type:"timestamp"},
                    {name: 'comment',comment: '备注'},
                ]
            }
        },

        methods: {}
    }
</script>

<style scoped>

</style>
