(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ae54a"],{"0a36":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"right"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v("权限管理")]),a("el-breadcrumb-item",[t._v("权限列表")])],1),a("el-card",{staticClass:"box-card"},[a("el-table",{staticClass:"user-list-table",attrs:{data:t.rightList,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"权限名称",prop:"authName"}}),a("el-table-column",{attrs:{label:"路径",prop:"path"}}),a("el-table-column",{attrs:{label:"权限等级",prop:""},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.level?a("el-tag",[t._v("一级")]):1==e.row.level?a("el-tag",{attrs:{type:"success"}},[t._v("二级")]):2==e.row.level?a("el-tag",{attrs:{type:"warning"}},[t._v("三级")]):t._e()]}}])})],1)],1)],1)},s=[],l={data:function(){return{rightList:[]}},created:function(){this.getRightList()},methods:{getRightList:function(){var t=this;this.$http.get("rights/list").then((function(e){if(console.log(e),200!==e.data.meta.status)return t.$message.error("获取权限列表失败");t.rightList=e.data.data,t.$message.success("获取权限列表成功")})).catch((function(t){return t}))}}},i=l,n=a("2877"),c=Object(n["a"])(i,r,s,!1,null,"78fa16d4",null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0ae54a.86e9a76d.js.map