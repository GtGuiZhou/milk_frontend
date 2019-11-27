<template>
    <div>
        <crud-index
                index-url="/admin/user_coin_record/index"
                insert-url="/admin/user_coin_record/insert"
                update-url="/admin/user_coin_record/update"
                delete-url="/admin/user_coin_record/delete"
                upload-file-url="/api/file/upload"
                :columns="columns"
                :action-column="false"
                :insert-button="false"
                :update-button="false"
        >
        </crud-index>
    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    export default {
        name: "user_coin_record",
        components: {CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id',primary: true},
                    {name: 'user_id'},
                    {name: 'coin_id'},
                    {name: 'number',comment: '数量'},
                    {name: 'comment',comment: '备注'},
                    {name: 'create_time',comment:'创建时间' ,show_type: 'timestamp'},
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
