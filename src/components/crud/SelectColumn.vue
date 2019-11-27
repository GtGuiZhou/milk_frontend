<template>
    <span>
        <el-select
                v-if="type === 'form'"
                v-model="formValue" placeholder="请选择">
            <el-option
                    v-for="(item,index) in localOptions"
                    :key="index"
                    :label="item[labelKey]"
                    :value="item[valueKey].toString()">
            </el-option>
        </el-select>
        <span v-if="type === 'table'">
            {{tableValue}}
        </span>
    </span>
</template>

<script>
    export default {
        name: "SelectColumn",
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            type: {
                type: String,
                default: 'form'
            },
            value: {
                default: ''
            },
            options: {
                type: Array,
                default: []
            },
            optionsUrl: {
                type: String,
                default: null
            },
            labelKey: {
                type: String,
                default: 'label'
            },
            valueKey: {
                type: String,
                default: 'value'
            }
        },
        computed: {
            localOptions() {
                return this.options ? this.options : this.remoteOptions
            },
            formValue: {
                get() {
                    return this.value.toString()
                },
                set(val) {
                    this.$emit('change', val)
                },
            },
            tableValue() {
                const option = this.localOptions.find(option => {
                    console.log(option[this.valueKey],this.value)
                    console.log(option[this.valueKey] == this.value)
                    return option[this.valueKey] == this.value
                })
                console.log(option)
                return option?option[this.labelKey]:'';
            }
        },
        data() {
            return {
                remoteOptions: []
            }
        },
        mounted() {
            this.loadRemoteOptions()
        },
        methods: {
            loadRemoteOptions() {
                if (this.optionsUrl) {
                    this.$http.get(this.optionsUrl).then(
                        res => {
                            this.remoteOptions = res
                        }
                    )
                }
            }
        }
    }
</script>

<style scoped>

</style>
