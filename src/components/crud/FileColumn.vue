<template>
    <div>
        <div>
            <el-button icon="el-icon-upload"
                       plain type="success" @click="selectFile">点击上传
            </el-button>
            <input hidden ref="selectFile" multiple type="file" @change="upload"/>
            <viewer :images="fileArr" style="display: flex;justify-content: left;margin: 10px 0">
                <div v-for="(file,index) in fileArr"
                     :key="index"
                     :style="{width:imgWidth,height:imgHeight,position: 'relative',lineHeight:'0',marginRight:'5px'}">
                    <img :src="type === 'file'?fileIcon:file" >
                    <div class="cross" @click="handleDelete(index)">
                        <i class="el-icon-error"></i>

                    </div>
                </div>
            </viewer>
        </div>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import FileIcon from '../../assets/file.png'
    export default {
        name: "FileColumn",
        model: {
            prop: 'files',
            event: 'change'
        },
        props: {
            files: {
                type: String,
                default: ""
            },
            imgWidth: {
                type: String,
                default: "100px"
            },
            imgHeight: {
                type: String,
                default: "100px"
            },
            maxSize: {
                type: Number,
                default: 5242880
            },
            uploadUrl: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'file'
            }
        },
        data() {
            return {
                fileIcon: FileIcon,
                fileArr: this.getfileArr()
            }
        },
        watch: {
            files: function (val){
                this.fileArr = this.getfileArr()
            }
        },
        methods: {
            getfileArr() {
              return !this.files?[]:this.files.split(',')
            },
            selectFile() {
                this.$refs.selectFile.click()
            },
            upload(e) {
                let {files} = e.target;
                if (!files.length) {
                    return
                }

                files = files.length === 1 ? [files[0]] : [].slice.call(files);

                if (this.isOversize(files, this.maxSize)) {
                    Message.error('图片大小超过限制')
                    return
                }

                for (const file of files) {
                    this.uploadImage(file)
                }

                if (this.$refs.selectFile)
                    this.$refs.selectFile.value = ''
            },

            isOversize(files, maxSize) {
                return files.some(file => file.size > maxSize);
            },

            handleDelete(index) {
                this.fileArr.splice(index, 1)
                this.$emit('change',this.fileArr.join(','))
            },

            uploadImage(file) {
                return this.$http.upload(this.uploadUrl, file).then(
                    res => {
                        this.fileArr.push(res)
                        this.$emit('change',this.fileArr.join(','))
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .cross {
        position: absolute;
        right: 2px;
        top: 2px;
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
</style>
