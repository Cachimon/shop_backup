(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a726107"],{1276:function(t,e,a){"use strict";var r=a("d784"),n=a("44e7"),o=a("825a"),i=a("1d80"),s=a("4840"),l=a("8aa5"),c=a("50c4"),d=a("14c3"),u=a("9263"),f=a("d039"),p=[].push,g=Math.min,h=4294967295,v=!f((function(){return!RegExp(h,"y")}));r("split",2,(function(t,e,a){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,a){var r=String(i(this)),o=void 0===a?h:a>>>0;if(0===o)return[];if(void 0===t)return[r];if(!n(t))return e.call(r,t,o);var s,l,c,d=[],f=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),g=0,v=new RegExp(t.source,f+"g");while(s=u.call(v,r)){if(l=v.lastIndex,l>g&&(d.push(r.slice(g,s.index)),s.length>1&&s.index<r.length&&p.apply(d,s.slice(1)),c=s[0].length,g=l,d.length>=o))break;v.lastIndex===s.index&&v.lastIndex++}return g===r.length?!c&&v.test("")||d.push(""):d.push(r.slice(g)),d.length>o?d.slice(0,o):d}:"0".split(void 0,0).length?function(t,a){return void 0===t&&0===a?[]:e.call(this,t,a)}:e,[function(e,a){var n=i(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,n,a):r.call(String(n),e,a)},function(t,n){var i=a(r,t,this,n,r!==e);if(i.done)return i.value;var u=o(t),f=String(this),p=s(u,RegExp),m=u.unicode,b=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(v?"y":"g"),x=new p(v?u:"^(?:"+u.source+")",b),_=void 0===n?h:n>>>0;if(0===_)return[];if(0===f.length)return null===d(x,f)?[f]:[];var I=0,y=0,S=[];while(y<f.length){x.lastIndex=v?y:0;var w,E=d(x,v?f:f.slice(y));if(null===E||(w=g(c(x.lastIndex+(v?0:y)),f.length))===I)y=l(f,y,m);else{if(S.push(f.slice(I,y)),S.length===_)return S;for(var L=1;L<=E.length-1;L++)if(S.push(E[L]),S.length===_)return S;y=I=w}}return S.push(f.slice(I)),S}]}),!v)},"14c3":function(t,e,a){var r=a("c6b6"),n=a("9263");t.exports=function(t,e){var a=t.exec;if("function"===typeof a){var o=a.call(t,e);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return n.call(t,e)}},"159b":function(t,e,a){var r=a("da84"),n=a("fdbc"),o=a("17c2"),i=a("9112");for(var s in n){var l=r[s],c=l&&l.prototype;if(c&&c.forEach!==o)try{i(c,"forEach",o)}catch(d){c.forEach=o}}},"17c2":function(t,e,a){"use strict";var r=a("b727").forEach,n=a("a640"),o=a("ae40"),i=n("forEach"),s=o("forEach");t.exports=i&&s?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,e,a){"use strict";var r=a("23e7"),n=a("17c2");r({target:"Array",proto:!0,forced:[].forEach!=n},{forEach:n})},"44e7":function(t,e,a){var r=a("861d"),n=a("c6b6"),o=a("b622"),i=o("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==n(t))}},6547:function(t,e,a){var r=a("a691"),n=a("1d80"),o=function(t){return function(e,a){var o,i,s=String(n(e)),l=r(a),c=s.length;return l<0||l>=c?t?"":void 0:(o=s.charCodeAt(l),o<55296||o>56319||l+1===c||(i=s.charCodeAt(l+1))<56320||i>57343?t?s.charAt(l):o:t?s.slice(l,l+2):i-56320+(o-55296<<10)+65536)}};t.exports={codeAt:o(!1),charAt:o(!0)}},"7a00":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v("商品管理")]),a("el-breadcrumb-item",[t._v("添加商品")])],1),a("el-card",{staticClass:"box-card"},[a("el-alert",{attrs:{title:"添加商品信息",type:"info","show-icon":"",closable:!1,center:""}}),a("el-steps",{staticClass:"add-steps",staticStyle:{"font-size":"12px"},attrs:{active:t.activeIndex-0,"finish-status":"success","align-center":""}},[a("el-step",{attrs:{title:"基本信息"}}),a("el-step",{attrs:{title:"商品参数"}}),a("el-step",{attrs:{title:"商品属性"}}),a("el-step",{attrs:{title:"商品图片"}}),a("el-step",{attrs:{title:"商品内容"}}),a("el-step",{attrs:{title:"完成"}})],1),a("el-form",{ref:"addRef",attrs:{model:t.addGoodsInfo,rules:t.addGoodsRules,"label-width":"100px","label-position":"top"}},[a("el-tabs",{attrs:{"tab-position":"left","before-leave":t.beforeTabLeave},on:{"tab-click":t.tabClick},model:{value:t.activeIndex,callback:function(e){t.activeIndex=e},expression:"activeIndex"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[a("el-form-item",{attrs:{label:"商品名称：",prop:"goods_name"}},[a("el-input",{model:{value:t.addGoodsInfo.goods_name,callback:function(e){t.$set(t.addGoodsInfo,"goods_name",e)},expression:"addGoodsInfo.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格：",prop:"goods_price"}},[a("el-input",{model:{value:t.addGoodsInfo.goods_price,callback:function(e){t.$set(t.addGoodsInfo,"goods_price",e)},expression:"addGoodsInfo.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品重量：",prop:"goods_weight"}},[a("el-input",{attrs:{type:"number"},model:{value:t.addGoodsInfo.goods_weight,callback:function(e){t.$set(t.addGoodsInfo,"goods_weight",e)},expression:"addGoodsInfo.goods_weight"}})],1),a("el-form-item",{attrs:{label:"商品数量：",prop:"goods_number"}},[a("el-input",{attrs:{type:"number"},model:{value:t.addGoodsInfo.goods_number,callback:function(e){t.$set(t.addGoodsInfo,"goods_number",e)},expression:"addGoodsInfo.goods_number"}})],1),a("el-form-item",{attrs:{label:"商品分类：",prop:"goods_cat"}},[a("el-cascader",{staticStyle:{position:"relative"},attrs:{options:t.cateList,props:t.cateProps,clearable:""},model:{value:t.addGoodsInfo.goods_cat,callback:function(e){t.$set(t.addGoodsInfo,"goods_cat",e)},expression:"addGoodsInfo.goods_cat"}})],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},t._l(t.manyAttrList,(function(e,r){return a("el-form-item",{key:e.attr_id,attrs:{label:e.attr_name,prop:"attr_value"}},[a("el-checkbox-group",{model:{value:e.attr_vals,callback:function(a){t.$set(e,"attr_vals",a)},expression:"item.attr_vals"}},t._l(e.attr_vals,(function(t,e){return a("el-checkbox",{attrs:{label:t,border:""}})})),1)],1)})),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},t._l(t.onlyAttrList,(function(e,r){return a("el-form-item",{attrs:{label:e.attr_name}},[a("el-input",{model:{value:e.attr_vals,callback:function(a){t.$set(e,"attr_vals",a)},expression:"item.attr_vals"}})],1)})),1),a("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[a("el-upload",{attrs:{headers:t.imgUploadHeaders,action:t.uploadPathPrefix+"upload","on-preview":t.imgPreview,"on-remove":t.imgRemove,"file-list":t.imgList,"list-type":"picture","on-success":t.imgUploadSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1),a("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[a("quill-editor",{model:{value:t.addGoodsInfo.goods_introduce,callback:function(e){t.$set(t.addGoodsInfo,"goods_introduce",e)},expression:"addGoodsInfo.goods_introduce"}})],1),a("el-tab-pane",{attrs:{label:"完成",name:"5"}},[a("el-alert",{attrs:{title:"添加商品成功，"+t.timeOut+"s后将跳转到商品页面",type:"success","show-icon":"",closable:!1}})],1)],1)],1),a("div",{staticClass:"step-btn"},[a("el-button",{attrs:{type:"primary",disabled:"0"===t.activeIndex},on:{click:t.lastStep}},[t._v("上一步")]),t.activeIndex<4?a("el-button",{attrs:{type:"primary"},on:{click:t.nextStep}},[t._v("下一步")]):a("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("添加商品")])],1)],1),a("el-dialog",{attrs:{title:"图片预览",visible:t.showImgPreview,width:"50%"},on:{"update:visible":function(e){t.showImgPreview=e}}},[a("img",{attrs:{src:t.imgPreviewSrc,alt:""}})])],1)},n=[],o=(a("c740"),a("4160"),a("a15b"),a("a434"),a("ac1f"),a("1276"),a("159b"),a("2ef0")),i={data:function(){return{uploadPathPrefix:"http://www.cachimon.top:8888/api/private/v1/",imgPathPrefix:"http://www.cachimon.top:8888/",activeIndex:0,addGoodsInfo:{goods_name:"",goods_price:"",goods_number:"",goods_weight:"",goods_cat:[],goods_introduce:"",pics:[],attrs:[]},addGoodsRules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品重量",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_cat:[{required:!0,message:"请选择商品分类",trigger:"blur"}]},cateProps:{expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children"},cateList:[],onlyAttrList:[],manyAttrList:[],imgUploadHeaders:{Authorization:window.sessionStorage.getItem("token")},imgList:[],showImgPreview:!1,imgPreviewSrc:"",ifSumited:!1,timeOut:3}},created:function(){this.getCateList(),this.addGoodsInfo.pics=[]},methods:{getCateList:function(){var t=this;this.$http.get("categories").then((function(e){if(200!==e.data.meta.status)return t.$message.error("获取分类列表失败");t.cateList=e.data.data}))},lastStep:function(){this.activeIndex=this.activeIndex-1+""},beforeTabLeave:function(t,e){return"0"===this.activeIndex&&0===this.addGoodsInfo.goods_cat.length?(this.$message.error("请选择分类列表"),!1):"5"!==t||this.ifSumited?void 0:(this.$message.error("请先提交商品信息"),!1)},nextStep:function(){if("0"===this.activeIndex&&0===this.addGoodsInfo.goods_cat.length)return this.$message.error("请选择分类列表");this.activeIndex=this.activeIndex-0+1+"";var t=this.activeIndex-0;this.nextStepMethod(t)},nextStepMethod:function(t){var e=this;1===t?0===this.manyAttrList.length&&this.$http.get("categories/".concat(this.addGoodsInfo.goods_cat[this.addGoodsInfo.goods_cat.length-1],"/attributes"),{params:{sel:"many"}}).then((function(t){if(200!==t.data.meta.status)return e.$message.error("获取参数失败");t.data.data.forEach((function(t){t.attr_vals=(t.attr_vals||" ").split(" "),t.showAddTagInput=!1,t.newTag=""})),e.manyAttrList=t.data.data})).catch((function(t){return t})):2===t&&0===this.onlyAttrList.length&&this.$http.get("categories/".concat(this.addGoodsInfo.goods_cat[this.addGoodsInfo.goods_cat.length-1],"/attributes"),{params:{sel:"only"}}).then((function(t){if(200!==t.data.meta.status)return e.$message.error("获取属性失败");e.onlyAttrList=t.data.data})).catch((function(t){return t}))},tabClick:function(){var t=this.activeIndex-0;this.nextStepMethod(t)},imgPreview:function(t){this.imgPreviewSrc=this.imgPathPrefix+t.response.data.tmp_path,this.showImgPreview=!0},imgRemove:function(t,e){var a=t.response.data.tmp_path,r=this.addGoodsInfo.pics.findIndex((function(t){return t.pic===a}));this.addGoodsInfo.pics.splice(r,1)},imgUploadSuccess:function(t){var e={pic:t.data.tmp_path};this.addGoodsInfo.pics.push(e)},submit:function(){var t=this;this.$refs.addRef.validate((function(e){if(!e)return t.$message.error("请完成填写相关项");var a=o.cloneDeep(t.addGoodsInfo);a.goods_cat=a.goods_cat.join(","),t.manyAttrList.forEach((function(t){var e={attr_id:t.attr_id,attr_value:t.attr_vals.join(" ")};a.attrs.push(e)})),t.onlyAttrList.forEach((function(t){var e={attr_id:t.attr_id,attr_value:t.attr_vals};a.attrs.push(e)})),t.$http.post("goods",a).then((function(e){if(201!==e.data.meta.status)return t.$message.error("添加商品失败");t.ifSumited=!0,t.activeIndex="5";var a=setInterval((function(){t.timeOut--,t.timeOut<=1&&(clearInterval(a),t.$router.push("/goods"))}),1e3)}))}))}}},s=i,l=(a("8f77"),a("2877")),c=Object(l["a"])(s,r,n,!1,null,"282772bb",null);e["default"]=c.exports},"8aa5":function(t,e,a){"use strict";var r=a("6547").charAt;t.exports=function(t,e,a){return e+(a?r(t,e).length:1)}},"8f77":function(t,e,a){"use strict";var r=a("d940"),n=a.n(r);n.a},9263:function(t,e,a){"use strict";var r=a("ad6d"),n=a("9f7f"),o=RegExp.prototype.exec,i=String.prototype.replace,s=o,l=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=n.UNSUPPORTED_Y||n.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],u=l||d||c;u&&(s=function(t){var e,a,n,s,u=this,f=c&&u.sticky,p=r.call(u),g=u.source,h=0,v=t;return f&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),v=String(t).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==t[u.lastIndex-1])&&(g="(?: "+g+")",v=" "+v,h++),a=new RegExp("^(?:"+g+")",p)),d&&(a=new RegExp("^"+g+"$(?!\\s)",p)),l&&(e=u.lastIndex),n=o.call(f?a:u,v),f?n?(n.input=n.input.slice(h),n[0]=n[0].slice(h),n.index=u.lastIndex,u.lastIndex+=n[0].length):u.lastIndex=0:l&&n&&(u.lastIndex=u.global?n.index+n[0].length:e),d&&n&&n.length>1&&i.call(n[0],a,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(n[s]=void 0)})),n}),t.exports=s},"9f7f":function(t,e,a){"use strict";var r=a("d039");function n(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=n("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=n("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a15b:function(t,e,a){"use strict";var r=a("23e7"),n=a("44ad"),o=a("fc6a"),i=a("a640"),s=[].join,l=n!=Object,c=i("join",",");r({target:"Array",proto:!0,forced:l||!c},{join:function(t){return s.call(o(this),void 0===t?",":t)}})},a434:function(t,e,a){"use strict";var r=a("23e7"),n=a("23cb"),o=a("a691"),i=a("50c4"),s=a("7b0b"),l=a("65f0"),c=a("8418"),d=a("1dde"),u=a("ae40"),f=d("splice"),p=u("splice",{ACCESSORS:!0,0:0,1:2}),g=Math.max,h=Math.min,v=9007199254740991,m="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var a,r,d,u,f,p,b=s(this),x=i(b.length),_=n(t,x),I=arguments.length;if(0===I?a=r=0:1===I?(a=0,r=x-_):(a=I-2,r=h(g(o(e),0),x-_)),x+a-r>v)throw TypeError(m);for(d=l(b,r),u=0;u<r;u++)f=_+u,f in b&&c(d,u,b[f]);if(d.length=r,a<r){for(u=_;u<x-r;u++)f=u+r,p=u+a,f in b?b[p]=b[f]:delete b[p];for(u=x;u>x-r+a;u--)delete b[u-1]}else if(a>r)for(u=x-r;u>_;u--)f=u+r-1,p=u+a-1,f in b?b[p]=b[f]:delete b[p];for(u=0;u<a;u++)b[u+_]=arguments[u+2];return b.length=x-r+a,d}})},a640:function(t,e,a){"use strict";var r=a("d039");t.exports=function(t,e){var a=[][t];return!!a&&r((function(){a.call(null,e||function(){throw 1},1)}))}},ac1f:function(t,e,a){"use strict";var r=a("23e7"),n=a("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==n},{exec:n})},ad6d:function(t,e,a){"use strict";var r=a("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},c740:function(t,e,a){"use strict";var r=a("23e7"),n=a("b727").findIndex,o=a("44d2"),i=a("ae40"),s="findIndex",l=!0,c=i(s);s in[]&&Array(1)[s]((function(){l=!1})),r({target:"Array",proto:!0,forced:l||!c},{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),o(s)},d784:function(t,e,a){"use strict";a("ac1f");var r=a("6eeb"),n=a("d039"),o=a("b622"),i=a("9263"),s=a("9112"),l=o("species"),c=!n((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),d=function(){return"$0"==="a".replace(/./,"$0")}(),u=o("replace"),f=function(){return!!/./[u]&&""===/./[u]("a","$0")}(),p=!n((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var a="ab".split(t);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));t.exports=function(t,e,a,u){var g=o(t),h=!n((function(){var e={};return e[g]=function(){return 7},7!=""[t](e)})),v=h&&!n((function(){var e=!1,a=/a/;return"split"===t&&(a={},a.constructor={},a.constructor[l]=function(){return a},a.flags="",a[g]=/./[g]),a.exec=function(){return e=!0,null},a[g](""),!e}));if(!h||!v||"replace"===t&&(!c||!d||f)||"split"===t&&!p){var m=/./[g],b=a(g,""[t],(function(t,e,a,r,n){return e.exec===i?h&&!n?{done:!0,value:m.call(e,a,r)}:{done:!0,value:t.call(a,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:d,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),x=b[0],_=b[1];r(String.prototype,t,x),r(RegExp.prototype,g,2==e?function(t,e){return _.call(t,this,e)}:function(t){return _.call(t,this)})}u&&s(RegExp.prototype[g],"sham",!0)}},d940:function(t,e,a){},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-4a726107.9cc70833.js.map