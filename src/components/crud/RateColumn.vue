<template>
    <div>
        <el-rate v-model="_value"></el-rate>
    </div>
</template>

<script>
    export default {
        name: "RateColumn",
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                default: 0
            }
        },
        data() {
            return {}
        },
        computed: {
            _value: {
                get() {
                    const val = parseInt(this.value)
                    if (!val) {
                        return 0
                    }
                    return val
                },
                set(val) {
                    this.$emit('change', val)
                },
            }
        }
    }
</script>

<style scoped>

</style>
