(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2218ae"],{cb92:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"图片"}},[r("el-input",{model:{value:e.form.image,callback:function(t){e.$set(e.form,"image",t)},expression:"form.image"}})],1),r("el-form-item",{attrs:{label:"分组"}},[r("el-input",{model:{value:e.form.group,callback:function(t){e.$set(e.form,"group",t)},expression:"form.group"}})],1),r("el-form-item",{attrs:{label:"链接"}},[r("el-input",{model:{value:e.form.link,callback:function(t){e.$set(e.form,"link",t)},expression:"form.link"}})],1),r("el-form-item",[r("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即修改")])],1)],1)],1)},i=[],o=(r("63ff"),r("becb")),a="/api/test/update",l="crud_update_form",s={name:l,props:{form:{type:Object}},data:function(){return{loading:!1}},methods:{onSubmit:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,this.$http.post(a,this.form);case 4:this.$notify.success("修改成功"),this.$emit("update-success");case 6:return e.prev=6,this.loading=!1,e.finish(6);case 9:case"end":return e.stop()}}),e,this,[[1,,6,9]])})));function t(){return e.apply(this,arguments)}return t}()}},u=s,c=r("4e82"),m=Object(c["a"])(u,n,i,!1,null,"f3ee1ac2",null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d2218ae.59516af0.js.map