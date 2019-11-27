<template>
    <el-switch
            v-model="_value"
            active-color="#ff4949"
            inactive-color="#13ce66">
    </el-switch>
</template>

<script>
    export default {
        name: "SwitchColumn",
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                default: ''
            }
        },
        data() {
            return {}
        },
        computed: {
            _value: {
                get() {
                    return !this.value
                },
                set(val) {
                    this.$emit('change', !this.value)
                },
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>