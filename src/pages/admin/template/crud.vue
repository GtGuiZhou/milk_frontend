<template>
    <div>
        <crud-index
                index-url="/api/test/index"
                insert-url="/api/test/insert"
                update-url="/api/test/update"
                delete-url="/api/test/delete"
                upload-file-url="/api/file/upload"
                :columns="columns"
        >
        </crud-index>
    </div>
</template>

<script>
    import CrudIndex from "../../../components/crud/CrudIndex";
    export default {
        name: "crud",
        components: {CrudIndex},
        data() {
            return {
                columns: [
                    {name: 'id',primary: true},
                    {name: 'image',comment: '图片',show_type: 'image'},
                    {name: 'group',comment: '分组'},
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
