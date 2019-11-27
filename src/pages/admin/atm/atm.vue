<template>
    <div>
        <crud-index
                :insert-button="false"
                index-url="/admin/user_atm/index"
                insert-url="/admin/user_atm/insert"
                update-url="/admin/user_atm/update"
                delete-url="/admin/user_atm/delete"
                upload-file-url="/api/file/upload"
                :columns="columns"
        >
        </crud-index>

    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    export default {
        name: "atm",
        components: {CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id',primary: true},
                    {name: 'user_id'},
                    {name: 'coin_id'},
                    {name: 'number',comment: '充值数量'},
                    {name: 'status',comment: '状态',show_type: "select",selectOptions: [{id: -1,name: '审核失败'},{id:0,name: '待审核'},{id:1,name:'已发放'}],selectLabel: 'name',selectValue: 'id'},
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
