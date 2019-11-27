<template>
    <div>
        <viewer :images="images">
            <img v-for="(image,index) in images"
                 :key="index" :src="image" style="width: 50px;height: 50px;margin: 3px">

        </viewer>
    </div>
</template>

<script>
    export default {
        name: "ImagesTableColumn",
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        computed: {
            images() {
                return this.value.split(',')
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
