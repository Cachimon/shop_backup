<template>
  <div class="add">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert title="添加商品信息" type="info" show-icon :closable="false" center></el-alert>
      <el-steps
        :active="activeIndex - 0"
        finish-status="success"
        align-center
        class="add-steps"
        style="font-size: 12px"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addGoodsInfo"
        :rules="addGoodsRules"
        label-width="100px"
        ref="addRef"
        label-position="top"
      >
        <!--是rules不是rule-->
        <el-tabs
          tab-position="left"
          v-model="activeIndex"
          :before-leave="beforeTabLeave"
          @tab-click="tabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称：" prop="goods_name">
              <el-input v-model="addGoodsInfo.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格：" prop="goods_price">
              <el-input v-model="addGoodsInfo.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量：" prop="goods_weight">
              <el-input v-model="addGoodsInfo.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量：" prop="goods_number">
              <el-input v-model="addGoodsInfo.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类：" prop="goods_cat">
              <el-cascader
                style="position: relative"
                :options="cateList"
                :props="cateProps"
                v-model="addGoodsInfo.goods_cat"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="(item, index) in manyAttrList"
              :label="item.attr_name"
              prop="attr_value"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox v-for="(item1, index) in item.attr_vals" :label="item1" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="(item, index) in onlyAttrList" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :headers="imgUploadHeaders"
              :action="uploadPathPrefix + 'upload'"
              :on-preview="imgPreview"
              :on-remove="imgRemove"
              :file-list="imgList"
              list-type="picture"
              :on-success="imgUploadSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addGoodsInfo.goods_introduce"></quill-editor>
          </el-tab-pane>
          <el-tab-pane label="完成" name="5">
            <el-alert :title="'添加商品成功，' + timeOut + 's后将跳转到商品页面'" type="success" show-icon :closable='false'></el-alert>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div class="step-btn">
        <el-button type="primary" :disabled="activeIndex === '0'" @click="lastStep">上一步</el-button>
        <el-button type="primary" v-if="activeIndex < 4" @click="nextStep">下一步</el-button>
        <el-button type="primary" v-else @click="submit">添加商品</el-button>
      </div>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="showImgPreview" width="50%">
      <img :src="imgPreviewSrc" alt />
    </el-dialog>
  </div>
</template>
<script>
let _ = require("lodash");
export default {
  data() {
    return {
      goodsID: 0,
      uploadPathPrefix: "http://localhost:8888/api/private/v1/",
      imgPathPrefix: "http://localhost:8888/",
      activeIndex: 0,
      addGoodsInfo: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        goods_introduce: "",
        pics: [],
        attrs: []
      },
      addGoodsRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ]
      },
      cateProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      cateList: [],
      onlyAttrList: [],
      manyAttrList: [],
      imgUploadHeaders: {
        Authorization: window.sessionStorage.getItem("token")
      },
      imgList: [],
      showImgPreview: false,
      imgPreviewSrc: "",
      ifSumited: false,
      timeOut: 3
    };
  },
  created() {
    this.getCateList();
    this.addGoodsInfo.pics = [];
    this.getGoodsInfo()
  },
  methods: {
    getGoodsInfo(){
      this.goodsID = this.$route.params.id
      this.$http.get(`goods/${this.goodsID}`).then(res => {
        console.log(res)
        if(res.data.meta.status !== 200)
          return this.$message.error("获取商品信息失败")
        let goodsInfo = res.data.data
        this.addGoodsInfo.goods_name = goodsInfo.goods_name
        this.addGoodsInfo.goods_price = goodsInfo.goods_price
        this.addGoodsInfo.goods_number = goodsInfo.goods_number
        this.addGoodsInfo.goods_weight = goodsInfo.goods_weight
        this.addGoodsInfo.goods_introduce = goodsInfo.goods_introduce
        this.addGoodsInfo.goods_pics = goodsInfo.goods_pics
        this.addGoodsInfo.goods_cat = [goodsInfo.cat_one_id]
        if(goodsInfo.cat_two_id) this.addGoodsInfo.goods_cat.push(goodsInfo.cat_two_id)
        if(goodsInfo.cat_three_id) this.addGoodsInfo.goods_cat.push(goodsInfo.cat_three_id)
      })
    },
    getCateList() {
      this.$http.get("categories").then(res => {
        if (res.data.meta.status !== 200)
          return this.$message.error("获取分类列表失败");
        this.cateList = res.data.data;
      });
    },
    lastStep() {
      this.activeIndex = this.activeIndex - 1 + "";
    },
    beforeTabLeave(n, o) {
      if (
        this.activeIndex === "0" &&
        this.addGoodsInfo.goods_cat.length === 0
      ) {
        //return this.$message.error('请选择分类列表')
        this.$message.error("请选择分类列表");
        return false;
      }
      if (n === "5" && !this.ifSumited) {
        this.$message.error("请先提交商品信息");
        return false;
      }
    },
    nextStep() {
      if (
        this.activeIndex === "0" &&
        this.addGoodsInfo.goods_cat.length === 0
      ) {
        //return this.$message.error('请选择分类列表')
        return this.$message.error("请选择分类列表");
      }
      this.activeIndex = this.activeIndex - 0 + 1 + "";
      let currentIndex = this.activeIndex - 0;
      //this.nextStepMethod(currentIndex);
    },
    nextStepMethod(currentIndex) {
      if (currentIndex === 1) {
        if (this.manyAttrList.length === 0) {
          this.$http
            .get(
              `categories/${
                this.addGoodsInfo.goods_cat[
                  this.addGoodsInfo.goods_cat.length - 1
                ]
              }/attributes`,
              { params: { sel: "many" } }
            )
            .then(res => {
              if (res.data.meta.status !== 200)
                return this.$message.error("获取参数失败");
              res.data.data.forEach(item => {
                item.attr_vals = (item.attr_vals || " ").split(" ");
                item.showAddTagInput = false;
                item.newTag = "";
              });
              this.manyAttrList = res.data.data;
            })
            .catch(err => err);
        }
      } else if (currentIndex === 2) {
        if (this.onlyAttrList.length === 0) {
          this.$http
            .get(
              `categories/${
                this.addGoodsInfo.goods_cat[
                  this.addGoodsInfo.goods_cat.length - 1
                ]
              }/attributes`,
              { params: { sel: "only" } }
            )
            .then(res => {
              if (res.data.meta.status !== 200)
                return this.$message.error("获取属性失败");
              this.onlyAttrList = res.data.data;
            })
            .catch(err => err);
        }
      }
    },
    tabClick() {
      let currentIndex = this.activeIndex - 0;
      //this.nextStepMethod(currentIndex);
    },
    imgPreview(file) {
      this.imgPreviewSrc = this.imgPathPrefix + file.response.data.tmp_path;
      this.showImgPreview = true;
    },
    imgRemove(file, fileList) {
      const removePic = file.response.data.tmp_path;
      const removeIndex = this.addGoodsInfo.pics.findIndex(item => {
        return item.pic === removePic;
      });
      this.addGoodsInfo.pics.splice(removeIndex, 1);
    },
    imgUploadSuccess(res) {
      const pic = { pic: res.data.tmp_path };
      this.addGoodsInfo.pics.push(pic);
    },
    submit() {
      this.$refs.addRef.validate(valid => {
        if (!valid) return this.$message.error("请完成填写相关项");
        const submitInfo = _.clone(this.addGoodsInfo);
        submitInfo.goods_cat = submitInfo.goods_cat.join(",");
        this.manyAttrList.forEach(item => {
          let attr = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(" ")
          };
          submitInfo.attrs.push(attr);
        });
        this.onlyAttrList.forEach(item => {
          let attr = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          };
          submitInfo.attrs.push(attr);
        });
        this.$http.post("goods", submitInfo).then(res => {
          if (res.data.meta.status !== 201)
            return this.$message.error("添加商品失败");
          this.ifSumited = true;
          this.activeIndex = "5";
          let timer = setInterval(() => {
            this.timeOut--
            if(this.timeOut <= 1){
              clearInterval(timer)
              this.$router.push("/goods")
            }
          },1000)
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-steps {
  margin: 20px 0;
}
.el-form {
  text-align: left;
}
.el-cascader {
  width: 100%;
}
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.step-btn {
  margin-top: 20px;
}
</style>
