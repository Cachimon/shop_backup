<template>
  <div class="params">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            style="position: relative"
            :options="cateList"
            :props="cateProps"
            v-model="cateSelected"
            @change="cateChange"
          ></el-cascader>
        </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="tabChange">
        <el-tab-pane label="动态参数" name="many"></el-tab-pane>
        <el-tab-pane label="静态属性" name="only"></el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col style="text-align: left">
          <el-button
            type="primary"
            @click="addAttr"
            size="small"
            :disabled="cateSelected.length === 0"
          >添加{{addAttrBtnLabel}}</el-button>
        </el-col>
      </el-row>
      <el-table :data="attrList" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row clas="add-new-tag">
              <el-tag
                v-for="(val, index) in scope.row.attr_vals"
                closable
                @close="attrTagClose(scope.row, index)"
              >{{val}}</el-tag>
              <el-button
                size="small"
                @click="addNewTag(scope.row)"
                v-if="!scope.row.showAddTagInput"
              >+ New Tag</el-button>
              <el-input
                ref="newInput"
                class="input-new-tag"
                :value="scope.row.newTag"
                v-model="scope.row.newTag"
                v-else
                size="small"
                @change="handleInputConfirm(scope.row)"
              ></el-input><!--@keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"-->
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column :label="activeName == 'many' ? '参数名称' : '属性名称'" prop="attr_name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editAttr(scope.row)"
            >编辑</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeAttrById(scope.row.attr_id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="'添加' + addAttrFormTitle"
      :visible.sync="showAddAttrForm"
      width="50%"
      @close="addFormClose"
    >
      <el-form :model="addAttrInfo" :rules="addAttrRules" label-width="80px" ref="addAttrRef">
        <!--是rules不是rule-->
        <el-form-item :label="addAttrFormTitle" prop="attr_name">
          <el-input v-model="addAttrInfo.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddAttrForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd(addAttrInfo)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="'修改' + addAttrFormTitle" :visible.sync="showeEditAttrForm" width="50%">
      <el-form :model="editAttrInfo" :rules="addAttrRules" label-width="80px" ref="editAttrForm">
        <!--是rules不是rule-->
        <el-form-item :label="addAttrFormTitle" prop="attr_name">
          <el-input v-model="editAttrInfo.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showeEditAttrForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(editAttrInfo)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cateSelected: [],
      cateList: [],
      cateProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      activeName: "many",
      attrList: [],
      showAddTagInput: false,
      newTag: "",
      showAddAttrForm: false,
      addAttrInfo: {
        attr_name: ""
      },
      addAttrRules: {
        attr_name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      showeEditAttrForm: false,
      editAttrInfo: {
        attr_name: ""
      }
    };
  },
  created() {
    this.getCateList();
  },
  computed: {
    addAttrBtnLabel() {
      if (this.activeName === "only") {
        return "属性";
      } else {
        return "参数";
      }
    },
    addAttrFormTitle() {
      if (this.activeName === "only") {
        return "静态属性";
      } else {
        return "动态参数";
      }
    }
  },
  methods: {
    getCateList() {
      this.$http.get("categories").then(res => {
        if(res.data.meta.status !== 200)
          return this.$message.error("获取分类列表失败")
        this.cateList = res.data.data;
      });
    },
    getAttrList() {
      this.$http
        .get(
          `categories/${
            this.cateSelected[this.cateSelected.length - 1]
          }/attributes`,
          { params: { sel: this.activeName } }
        )
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("获取参数失败");
          res.data.data.forEach(item => {
            item.attr_vals = (item.attr_vals || " ").split(" ");
            item.showAddTagInput = false;
            item.newTag = "";
          });
          this.attrList = res.data.data;
        })
        .catch(err => err);
    },
    cateChange(val) {
      if (val.length === 0) return;
      this.getAttrList();
    },
    tabChange(tab) {
      if (this.cateSelected.length === 0) return;
      this.getAttrList();
    },
    attrTagClose(attr, index) {
      this.$confirm("此操作将永久删除该属性值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          attr.attr_vals.splice(index, 1); //直接在原值中删除
          this.updateParams(attr);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addNewTag(attr) {
      attr.showAddTagInput = true;
      //this.$refs.newTagInput.focused =true
      //console.log(this.$refs.newInput)
      // $nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会指定回调函数中的代码
      this.$nextTick(_ => {
        //this.$refs.newInput.$refs.input.focus()
        this.$refs.newInput.focus();
      });
    },
    handleInputConfirm(attr) {
      if (attr.newTag.length === 0) return (attr.showAddTagInput = false);
      attr.attr_vals.push(attr.newTag);
      this.updateParams(attr);
      this.$refs.newInput.clear();
      attr.showAddTagInput = false;
    },
    //更新参数的方法
    updateParams(attr) {
      this.$http
        .put(`categories/${attr.cat_id}/attributes/${attr.attr_id}`, {
          attr_name: attr.attr_name,
          attr_sel: attr.attr_sel,
          attr_vals: attr.attr_vals.join(" ")
        })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error(`更新${this.addAttrBtnLabel}失败`);
          this.$message.success(`更新${this.addAttrBtnLabel}成功`);
        })
        .catch(err => err);
    },
    addAttr() {
      this.showAddAttrForm = true;
    },
    addFormClose() {
      this.$refs.addAttrRef.resetFields();
    },
    confirmAdd(addInfo) {
      this.$refs.addAttrRef.validate(valid => {
        if (!valid) return;
        this.$http
          .post(
            `categories/${
              this.cateSelected[this.cateSelected.length - 1]
            }/attributes`,
            {
              attr_name: addInfo.attr_name,
              attr_sel: this.activeName
            }
          )
          .then(res => {
            if (res.data.meta.status !== 201)
              return this.$message.error(`添加${this.addAttrBtnLabel}失败`);
            this.$message.success(`添加${this.addAttrBtnLabel}成功`);
            this.showAddAttrForm = false;
            this.getAttrList();
          })
          .catch(err => err);
      });
    },
    removeAttrById(id) {
      this.$confirm(
        `此操作将永久删除该${this.addAttrBtnLabel}, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http
            .delete(
              `categories/${
                this.cateSelected[this.cateSelected.length - 1]
              }/attributes/${id}`
            )
            .then(res => {
              if (res.data.meta.status !== 200)
                return this.$message.error(`删除${this.addAttrBtnLabel}失败`);
              this.$message.success(`删除${this.addAttrBtnLabel}成功`);
              this.getAttrList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editAttr(attr) {
      this.editAttrInfo.attr_name = attr.attr_name;
      this.editAttrInfo.cat_id = attr.cat_id;
      this.editAttrInfo.attr_id = attr.attr_id;
      this.editAttrInfo.attr_sel = attr.attr_sel;
      this.editAttrInfo.attr_vals = attr.attr_vals;
      this.showeEditAttrForm = true;
    },
    confirmEdit(editAttrInfo) {
      this.$refs.editAttrForm.validate(valid => {
        if (!valid) return;
        this.updateParams(editAttrInfo);
        this.getAttrList();
        this.showeEditAttrForm = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cat_opt {
  margin: 15px 0;
  position: relative;
  text-align: left;
}
.el-cascader {
  .el-cascader-menu__list {
    height: 200px;
    overflow: scroll;
  }
}

.el-tag {
  margin: 10px;
}

.input-new-tag {
  width: 120px;
}
.el-input__inner {
  width: 100px;
}
.input-new-tag {
  width: 120px;
}
</style>
