<template>
    <div>
        <crud-index
                index-url="/admin/coin/index"
                insert-url="/admin/coin/insert"
                update-url="/admin/coin/update"
                delete-url="/admin/coin/delete"
                upload-file-url="/api/file/upload"
                :columns="columns"
        >
        </crud-index>
    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    export default {
        name: "coin",
        components: {CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id',primary: true},
                    {name: 'image',comment:'币种图片',show_type:'image'},
                    {name: 'name',comment:'币种名称'},
                    {name: 'invest_visual',comment:'充值币种',show_type: 'switch'}
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
