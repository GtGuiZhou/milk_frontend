<template>
    <div >
        <el-date-picker
                v-model="_timestamp"
                value-format="timestamp"
                type="datetime"
                placeholder="选择日期时间">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "TimestampColumn",
        model: {
            prop: 'timestamp',
            event: 'change'
        },
        props: {
          timestamp: {
              required: true
          }
        },
        computed: {
            _timestamp: {
                get() {
                    const val = parseInt(this.timestamp)
                    if (!val) {
                        return 0
                    }
                    return val * 1000
                },
                set(val) {
                    this.$emit('change',val / 1000)
                },
            },
        },
        methods: {
            change (t){
                console.log(t)
                this.$emit('change',parseInt(t / 1000))
            }
        }
    }
</script>

<style scoped>

</style>
