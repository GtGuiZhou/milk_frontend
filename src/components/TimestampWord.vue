<template>
    <label>
        {{_timestamp}}
    </label>
</template>

<script>
    export default {
        name: "TimestampWord",
        props: {
          value: {
              required: true
          }
        },
        data() {
            return {}
        },
        computed: {
            _timestamp() {
                let val = parseInt(this.value)
                if (!val) {
                    return ''
                } else {
                    return  this.formatTime(val,'Y/M/D h:m:s')
                }
            }
        },
        methods: {
            formatTime(number, format) {
                var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
                var returnArr = [];

                var date = new Date(number * 1000);
                returnArr.push(date.getFullYear());
                returnArr.push(this.formatNumber(date.getMonth() + 1));
                returnArr.push(this.formatNumber(date.getDate()));

                returnArr.push(this.formatNumber(date.getHours()));
                returnArr.push(this.formatNumber(date.getMinutes()));
                returnArr.push(this.formatNumber(date.getSeconds()));

                for (var i in returnArr) {
                    format = format.replace(formateArr[i], returnArr[i]);
                }
                return format;
            },
            formatNumber(n) {
                n = n.toString()
                return n[1] ? n : '0' + n
            }

        }
    }
</script>

<style scoped>

</style>
