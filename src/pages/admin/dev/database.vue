<template>
    <div>
        <el-card>
            <el-form :inline="true">
                <el-form-item label="表名">
                    <el-input v-model="form.table_name"></el-input>
                </el-form-item>
                <el-form-item label="编码">
                    <el-input v-model="form.charset"></el-input>
                </el-form-item>
                <el-form-item label="存储引擎">
                    <el-input v-model="form.engine"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.comment"></el-input>
                </el-form-item>
            </el-form>

            <el-input placeholder="请输入内容" v-model="frontendRootPath">
                <template slot="prepend">前端代码保存路径</template>
            </el-input>
            <br>
            <el-input placeholder="请输入内容" v-model="backendRootPath">
                <template slot="prepend">后端代码保存路径</template>
            </el-input>
            <br>
            <br>
            <div>
                <el-button type="primary" @click="onGenerateClick">全部生成</el-button>
                <el-button type="success" @click="buildFrontendCode">前端生成</el-button>
                <el-button type="warning" @click="buildBackendCode">后端生成</el-button>
                <el-button type="error" @click="onBuildTableClick">数据库生成</el-button>
            </div>
        </el-card>
        <el-card>
            <el-button type="success" plain @click="onInsertClick()">新增一行</el-button>
            <el-button type="success" plain @click="onInsertClick('id','int unsigned','number','',true,true,true,false)">新增主键</el-button>
            <el-button type="success" plain @click="onInsertClick('','varchar(25)','text','',false,false,false,false)">varchar(25)</el-button>
            <el-button type="success" plain @click="onInsertClick('','varchar(255)','text','',false,false,false,false)">varchar(255)</el-button>
            <el-button type="success" plain @click="onInsertClick('','varchar(2000)','text','',false,false,false,false)">varchar(2000)</el-button>
            <el-button type="success" plain @click="onInsertClick('','tinyint','switch','',false,false,false,false)">新增开关</el-button>
            <el-button type="success" plain @click="onInsertClick('image','varchar(255)','image','',false,false,false,false)">单图</el-button>
            <el-button type="success" plain @click="onInsertClick('images','varchar(2000)','images','',false,false,false,false)">多图</el-button>
            <el-button type="success" plain @click="onInsertClick('create_time','int','number','创建时间',false,false,false,false)">创建时间</el-button>
            <el-button type="success" plain @click="onInsertClick('','int unsigned','number','',false,false,false,false)">int unsigned</el-button>
            <br>
            <br>
            <el-table
                    stripe
                    border
                    :data="form.columns"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="字段名称"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" :ref="'name-' + scope.$index"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="数据类型"
                >
                    <template slot-scope="scope">
                        <el-autocomplete
                                :fetch-suggestions="queryType"
                                v-model="scope.row.type"></el-autocomplete>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="ui_type"
                        label="显示类型"
                >
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.ui_type" placeholder="请选择显示类型">
                            <el-option
                                    v-for="item in uiTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="comment"
                        label="备注"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.comment"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="default"
                        label="默认值"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.default"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100px"
                        prop="primary"
                        label="主键"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.primary"
                                active-color="#13ce66"
                                inactive-color="#eeeeee">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100px"
                        prop="unique"
                        label="唯一"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.unique"
                                active-color="#13ce66"
                                inactive-color="#eeeeee">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100px"
                        prop="is_null"
                        label="允许空值"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.is_null"
                                active-color="#13ce66"
                                inactive-color="#eeeeee">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100px"
                        prop="auto_increment"
                        label="自增"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.auto_increment"
                                active-color="#13ce66"
                                inactive-color="#eeeeee">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" @click="onDeleteRow(scope)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
        <el-card>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="Sql" name="sql">
                    <el-input
                            type="textarea"
                            autosize
                            v-model="sql">
                    </el-input>
                </el-tab-pane>
                <el-tab-pane label="前端主界面" name="frontend-main">
                    <el-input
                            type="textarea"
                            autosize
                            v-model="frontendCode">
                    </el-input>
                </el-tab-pane>
                <el-tab-pane label="前端新增表单" name="frontend-insert">
                    <el-input
                            type="textarea"
                            autosize
                            v-model="insertFormCode">
                    </el-input>
                </el-tab-pane>
                <el-tab-pane label="前端更新表单" name="frontend-update">
                    <el-input
                            type="textarea"
                            autosize
                            v-model="updateFormCode">
                    </el-input>
                </el-tab-pane>
                <el-tab-pane label="后端管理" name="backend-admin">
                    <el-input
                            type="textarea"
                            autosize
                            v-model="adminControllerCode">
                    </el-input>
                </el-tab-pane>
                <el-tab-pane label="后端用户" name="backend-user">
                    <el-input
                            type="textarea"
                            autosize
                            v-model="userControllerCode">
                    </el-input>
                </el-tab-pane>
                <el-tab-pane label="后端公共模型" name="backend-common-model">
                    <el-input
                            type="textarea"
                            autosize
                            v-model="commonModelCode">
                    </el-input>
                </el-tab-pane>
            </el-tabs>

        </el-card>

    </div>
</template>

<script>
    import buildFrontendCode from "./build_frontend_code";
    import buildInsertFormCode from "./build_insert_form_code";
    import buildUpdateFormCode from "./build_update_form_code";
    import build_admin_controller from "./build_admin_controller";
    import build_user_controller from "./build_user_controller";
    import build_common_model from "./build_common_model";
    import cookies from 'js-cookie'
    import until from "../../../common/until";

    const initForm = {
        table_name: '',
        table_comment: '',
        engine: 'InnoDB',
        charset: 'utf8mb4',
        comment: '',
        columns: [
            // Object.assign({}, initField)
        ]
    }
    let refreshSqlTimer
    let unwatch
    export default {
        name: "database",
        data() {
            return {
                uiTypeOptions: [
                    {value: 'text', label: '文本'},
                    {value: 'number', label: '数值'},
                    {value: 'switch', label: '开关'},
                    {value: 'date', label: '日期'},
                    {value: 'image', label: '单图'},
                    {value: 'images', label: '多图'},
                ],
                activeName: 'sql',
                form: JSON.parse(JSON.stringify(initForm)),
                sql: '',
                frontendCode: '',
                insertFormCode: '',
                updateFormCode: '',
                adminControllerCode: '',
                userControllerCode: '',
                commonModelCode: '',
                backendRootPath: '',
                frontendRootPath: ''
            }
        },
        created() {
            this.watchForm()

            if (cookies.get('frontendRootPath')) this.frontendRootPath = cookies.get('frontendRootPath')
            if (cookies.get('backendRootPath')) this.backendRootPath = cookies.get('backendRootPath')
        },
        watch: {
            frontendRootPath: function (val) {
                cookies.set('frontendRootPath', val)
            },
            backendRootPath: function (val) {
                cookies.set('backendRootPath', val)
            }
        },
        methods: {
            watchForm() {
                this.$watch('form', (newVal, oldVal) => {
                    this.sql = this.computedSql()
                    this.frontendCode = buildFrontendCode(this.form.table_name, this.form.columns)
                    this.insertFormCode = buildInsertFormCode(this.form.table_name, this.form.columns)
                    this.updateFormCode = buildUpdateFormCode(this.form.table_name, this.form.columns)
                    this.adminControllerCode = build_admin_controller(this.form.table_name)
                    this.userControllerCode = build_user_controller(this.form.table_name)
                    this.commonModelCode = build_common_model(this.form.table_name)
                }, {deep: true})
            },

            computedSql() {
                let columnsSql = "";
                for (const column of this.form.columns) {
                    let autoIncrement = column['auto_increment'] ? 'auto_increment' : '';
                    let _default = column['default'] ? "default " + column['default'] : '';
                    let primary = column['primary'] ? "primary key" : '';
                    let is_null = column['is_null'] ? "null" : 'not null';
                    columnsSql += `\`${column['name']}\` ${column['type']} ${primary} ${autoIncrement} ${_default} ${is_null} comment '${column['comment']}',
                    `
                }

                let uniqueSql = "";
                for (const column of this.form.columns) {
                    if (column['unique']) {
                        uniqueSql += `constraint ${this.form.table_name}_uinde unique (${column['name']}),
                        `;
                    }
                }
                uniqueSql = uniqueSql.split(',')
                uniqueSql.pop()
                uniqueSql = uniqueSql.join(',')
                return `create table ${this.form.table_name}
(
    ${columnsSql}
    ${uniqueSql}
)
ENGINE=${this.form.engine} DEFAULT CHARSET=${this.form.charset} comment '${this.form.comment}';
                `;
            },

            onBuildTableClick() {
                if (this.form.table_name.length < 1) {
                    this.$notify.error('表名不能为空')
                    return
                }
                this.$http.post('/dev/database/exec', {sql: this.sql}).then(
                    () => {
                        // unwatch()
                        this.form = JSON.parse(JSON.stringify(initForm))
                        this.sql = ''
                        this.$notify.success('创建成功')
                        // this.watchForm()
                    }
                )
            },

            buildFrontendCode() {
                const rootPath = this.frontendRootPath
                const pageDir = rootPath + '/' + this.form.table_name
                this.$http.post('/dev/code/build', {
                    force: false,
                    directors: [
                        pageDir
                    ],
                    files: [
                        {path: pageDir + '/' + this.form.table_name  + '.vue', code: this.frontendCode},
                        {path: pageDir + '/' + this.form.table_name  + '_insert_form.vue', code: this.insertFormCode},
                        {path: pageDir + '/' + this.form.table_name  + '_update_form.vue', code: this.updateFormCode},
                    ]
                })
            },

            buildBackendCode() {
                const rootPath = this.backendRootPath
                const camelCaseTableName = until.camelCase(this.form.table_name)
                this.$http.post('/dev/code/build', {
                    force: false,
                    directors: [],
                    files: [
                        {path: rootPath + '/admin/controller/' + camelCaseTableName  + '.php', code: this.adminControllerCode},
                        {path: rootPath + '/user/controller/' + camelCaseTableName + '.php', code: this.userControllerCode},
                        {path: rootPath + '/common/model/' + camelCaseTableName + 'Model.php', code: this.commonModelCode},
                    ]
                })
            },

            // 建立数据库和生成前端代码
            onGenerateClick() {
                // 创建数据库表
                this.onBuildTableClick()
                // 创建前端代码
                this.buildFrontendCode()
                // 创建后端代码
                this.buildBackendCode()
            },

            onDeleteRow(row) {
                this.form.columns.splice(row.$index, 1)
                console.log(row)
            },
            onInsertClick(name = '', type = '', ui_type = 'text', comment = '', primary = false, unique = false, auto_increment = false, is_null = false, _default = '') {
                for (const column of this.form.columns) {
                    if (column['name'] == name) {
                        this.$notify.error('该字段已存在')
                        return
                    }
                }
                let form = {name, type, ui_type, comment, primary, unique, auto_increment, is_null, default: _default}
                this.form.columns.push(form)
            },
            queryType(queryString, cb) {
                var restaurants = [
                    {'value': 'int'},
                    {'value': 'int unsigned'},
                    {'value': 'tinyint'},
                    {'value': 'varchar(255)'},
                    {'value': 'text'},
                    {'value': 'float'},
                    {'value': `enum('0','1','2','3')`},
                    {'value': 'set'},
                    {'value': 'datetime'},
                    {'value': 'date'},
                    {'value': 'timestamp'}
                ];
                var results = queryString ? restaurants.filter(
                    item => {
                        item = item.value
                        return item.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || queryString.toLowerCase().indexOf(item.toLowerCase()) >= 0
                    }
                ) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            }
        }
    }
</script>

<style scoped>

</style>