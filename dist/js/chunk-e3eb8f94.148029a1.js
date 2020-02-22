(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e3eb8f94"],{"15df":function(t,e,a){},"2bac":function(t,e,a){"use strict";var n=a("15df"),i=a.n(n);i.a},6706:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"categories"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v("商品管理")]),a("el-breadcrumb-item",[t._v("商品分类")])],1),a("el-card",{staticClass:"box-card"},[a("el-row",[a("el-col",{staticStyle:{"text-align":"left"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.addCate}},[t._v("添加分类")])],1)],1),a("tree-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"treeTable",staticClass:"tree-table",attrs:{data:t.treeData,columns:t.treeColumns,border:"","show-index":"","index-text":"#","selection-type":!1,"expand-type":!1,"element-loading-text":"加载中","element-loading-spinner":"el-icon-loading"},scopedSlots:t._u([{key:"ifValid",fn:function(t){return[t.row.cat_deleted?a("i",{staticClass:"el-icon-error",staticStyle:{color:"red"}}):a("i",{staticClass:"el-icon-success",staticStyle:{color:"lightgreen"}})]}},{key:"rank",fn:function(e){return[0===e.row.cat_level?a("el-tag",[t._v("一级")]):t._e(),1===e.row.cat_level?a("el-tag",{attrs:{type:"success"}},[t._v("二级")]):t._e(),2===e.row.cat_level?a("el-tag",{attrs:{type:"warning"}},[t._v("三级")]):t._e()]}},{key:"operation",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return t.editCate(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return t.removeCateById(e.row.cat_id)}}},[t._v("删除")])]}}])}),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.queryInfo.pagesize,"page-sizes":[5,8,12,15],layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"添加分类",visible:t.showAddForm,width:"50%"},on:{"update:visible":function(e){t.showAddForm=e},close:t.addFormClose}},[a("el-form",{ref:"addRef",attrs:{model:t.addInfo,rules:t.addRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"分类名称：",prop:"cat_name"}},[a("el-input",{model:{value:t.addInfo.cat_name,callback:function(e){t.$set(t.addInfo,"cat_name",e)},expression:"addInfo.cat_name"}})],1),a("el-form-item",{attrs:{label:"父级分类："}},[a("el-cascader",{staticStyle:{position:"relative"},attrs:{options:t.cateList,props:t.cateProps,clearable:""},on:{change:t.cateChange},model:{value:t.cateSelected,callback:function(e){t.cateSelected=e},expression:"cateSelected"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.showAddForm=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.confirmAdd(t.addInfo)}}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改分类",visible:t.showEditForm,width:"50%"},on:{"update:visible":function(e){t.showEditForm=e}}},[a("el-form",{ref:"editRef",attrs:{model:t.editInfo,rules:t.addRules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"分类名称",prop:"cat_name"}},[a("el-input",{model:{value:t.editInfo.cat_name,callback:function(e){t.$set(t.editInfo,"cat_name",e)},expression:"editInfo.cat_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.showEditForm=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.confirmEdit(t.editInfo)}}},[t._v("确 定")])],1)],1)],1)},i=[],o={data:function(){return{queryInfo:{type:3,pagenum:1,pagesize:5},total:0,currentPage:1,treeData:[],treeColumns:[{label:"分类名称",prop:"cat_name"},{label:"是否有效",prop:"cat_deleted",type:"template",template:"ifValid"},{label:"排序",prop:"cat_level",type:"template",template:"rank"},{label:"操作",type:"template",template:"operation"}],showAddForm:!1,addInfo:{cat_name:""},addRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},cateSelected:[],cateList:[],cateProps:{checkStrictly:!0,expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children"},showEditForm:!1,editInfo:{cat_id:0,cat_name:""},loading:!0}},created:function(){this.getCateList()},methods:{getCateList:function(){var t=this;this.$http.get("categories",{params:this.queryInfo}).then((function(e){if(200!==e.data.meta.status)return t.$message.error("获取商品分类失败");t.treeData=e.data.data.result,t.total=e.data.data.total,t.$nextTick((function(){t.loading=!1}))})).catch((function(t){return t}))},handleSizeChange:function(t){var e=this;this.queryInfo.pagesize=t,this.loading=!0,this.getCateList(),this.$nextTick((function(){e.loading=!1}))},handleCurrentChange:function(t){var e=this;this.loading=!0,this.queryInfo.pagenum=t,this.getCateList(),this.$nextTick((function(){e.loading=!1}))},editCate:function(t){this.editInfo.cat_name=t.cat_name,this.editInfo.cat_id=t.cat_id,this.showEditForm=!0},confirmEdit:function(t){var e=this;this.$refs.editRef.validate((function(a){a&&e.$http.put("categories/".concat(t.cat_id),{cat_name:t.cat_name}).then((function(t){if(200!==t.data.meta.status)return e.$message.error("修改参数失败");e.showEditForm=!1,e.getCateList(),e.$message.success("修改参数成功")})).catch((function(t){return t}))}))},removeCateById:function(t){var e=this;this.$confirm("此操作将永久删除该分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$http.delete("categories/".concat(t)).then((function(t){if(200!==t.data.meta.status)return e.$message.error("删除失败");e.$message({type:"success",message:"删除成功!"}),e.getCateList()})).catch((function(t){return t}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},addCate:function(){var t=this;this.$http.get("categories",{params:{type:2}}).then((function(e){if(200!==e.data.meta.status)return t.$message.error("获取分类列表失败");t.cateList=e.data.data})),this.showAddForm=!0},addFormClose:function(){this.$refs.addRef.resetFields(),this.cateSelected=[]},confirmAdd:function(t){var e=this;this.$refs.addRef.validate((function(t){t&&e.$http.post("categories",{cat_pid:0===e.cateSelected.length?0:e.cateSelected[e.cateSelected.length-1],cat_name:e.addInfo.cat_name,cat_level:e.cateSelected.length}).then((function(t){console.log(t),201!==t.data.meta.status&&e.$message.error("添加分类失败"),e.$message.success("添加分类成功"),e.showAddForm=!1,e.getCateList()}))}))},cateChange:function(t){console.log(t)}}},r=o,s=(a("2bac"),a("2877")),c=Object(s["a"])(r,n,i,!1,null,"0bd93c54",null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-e3eb8f94.148029a1.js.map