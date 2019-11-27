<template>
    <div>
        <div ref="editorElem" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
        name: "ArticleColumn",
        model: {
          prop: "value",
          event: "change"
        },
        props: {
            uploadUrl: {
                type: String,
                required: true
            },
          value: {
              props: {
                  default: ''
              }
          }
        },
        data() {
            return {
                editor: null
            }
        },
        watch: {
          value: function (val) {
              if (this.editor) this.editor.txt.html(val)
          }
        },
        mounted () {
            this.editor = new E(this.$refs.editorElem)
            // 配置chang事件
            this.editor.customConfig.onchange =  (html) => {
                // html 即变化之后的内容
                // html = xss(html)// 防止xss攻击
                this.$emit('change',html)
            }
            // 配置上传
            this.editor.customConfig.customUploadImg =  (files, insert) => {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法

                // 上传代码返回结果之后，将图片插入到编辑器中
                files.forEach(file => {
                    this.$http.upload(this.uploadUrl,file).then(
                        res => {
                            insert(res)
                        }
                    )
                })
            }
            this.editor.create()
            this.editor.txt.html(this.value)
        },
        methods: {}
    }
</script>

<style scoped>

</style>
