(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e2697"],{"7f1c":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"图片"}},[n("el-input",{model:{value:e.form.image,callback:function(t){e.$set(e.form,"image",t)},expression:"form.image"}})],1),n("el-form-item",{attrs:{label:"分组"}},[n("el-input",{model:{value:e.form.group,callback:function(t){e.$set(e.form,"group",t)},expression:"form.group"}})],1),n("el-form-item",{attrs:{label:"链接"}},[n("el-input",{model:{value:e.form.link,callback:function(t){e.$set(e.form,"link",t)},expression:"form.link"}})],1),n("el-form-item",{attrs:{label:"自动重置"}},[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#eeeeee"},model:{value:e.autoReset,callback:function(t){e.autoReset=t},expression:"autoReset"}})],1),n("el-form-item",[n("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即创建")]),n("el-button",{on:{click:e.onReset}},[e._v("重置")])],1)],1)],1)},i=[],r=(n("63ff"),n("becb")),s="/api/test/insert",a="crud_insert_form",l={image:"",group:"",link:""},u={name:a,data:function(){return{form:this.$until.jsonClone(l),loading:!1,autoReset:!0}},methods:{onSubmit:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,this.$http.post(s,this.form);case 4:this.$notify.success("新增成功"),this.autoReset&&this.onReset(),this.$emit("insert-success");case 7:return e.prev=7,this.loading=!1,e.finish(7);case 10:case"end":return e.stop()}}),e,this,[[1,,7,10]])})));function t(){return e.apply(this,arguments)}return t}(),onReset:function(){this.form=this.$until.jsonClone(l)}}},c=u,m=n("4e82"),f=Object(m["a"])(c,o,i,!1,null,"c25d8f2e",null);t["default"]=f.exports}}]);
//# sourceMappingURL=chunk-2d0e2697.987ff267.js.map