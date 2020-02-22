<template>
  <div class="categories">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col style="text-align: left">
          <el-button type="primary" @click="addCate">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table
        :data="treeData"
        :columns="treeColumns"
        border
        show-index
        index-text="#"
        :selection-type="false"
        :expand-type="false"
        class="tree-table"
        ref="treeTable"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
      >
        <template v-slot:ifValid="scope">
          <i class="el-icon-success" style="color: lightgreen" v-if="!scope.row.cat_deleted"></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>
        <template v-slot:rank="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag v-if="scope.row.cat_level === 1" type="success">二级</el-tag>
          <el-tag v-if="scope.row.cat_level === 2" type="warning">三级</el-tag>
        </template>
        <template v-slot:operation="scope">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCate(scope.row)">编辑</el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeCateById(scope.row.cat_id)"
          >删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="queryInfo.pagesize"
        :page-sizes="[5, 8, 12, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加分类" :visible.sync="showAddForm" width="50%" @close="addFormClose">
      <el-form :model="addInfo" :rules="addRules" label-width="100px" ref="addRef">
        <!--是rules不是rule-->
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addInfo.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            style="position: relative"
            :options="cateList"
            :props="cateProps"
            v-model="cateSelected"
            @change="cateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd(addInfo)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改分类" :visible.sync="showEditForm" width="50%">
      <el-form :model="editInfo" :rules="addRules" label-width="80px" ref="editRef">
        <!--是rules不是rule-->
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editInfo.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(editInfo)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      currentPage: 1,
      treeData: [],
      treeColumns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          type: "template",
          template: "ifValid"
        },
        {
          label: "排序",
          prop: "cat_level",
          type: "template",
          template: "rank"
        },
        {
          label: "操作",
          type: "template",
          template: "operation"
        }
      ],
      showAddForm: false,
      addInfo: {
        cat_name: ""
      },
      addRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      cateSelected: [],
      cateList: [],
      cateProps: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      showEditForm: false,
      editInfo: {
        cat_id: 0,
        cat_name: ""
      },
      loading: true
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    getCateList() {
      /*let loadingInstance = this.$loading({
        target: this.$refs.treeTable,
        fullscreen: false,
        lock: true
      });*/
      this.$http
        .get("categories", { params: this.queryInfo })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("获取商品分类失败");
          this.treeData = res.data.data.result;
          this.total = res.data.data.total;
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.loading = false;
          });
        })
        .catch(err => err);
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.loading = true;
      this.getCateList();

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.queryInfo.pagenum = val;
      this.getCateList();
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        this.loading = false;
      });
    },
    editCate(cate) {
      this.editInfo.cat_name = cate.cat_name;
      this.editInfo.cat_id = cate.cat_id;
      this.showEditForm = true;
    },
    confirmEdit(editInfo) {
      this.$refs.editRef.validate(valid => {
        if (!valid) return;
        this.$http
          .put(`categories/${editInfo.cat_id}`, {
            cat_name: editInfo.cat_name
          })
          .then(res => {
            if (res.data.meta.status !== 200)
              return this.$message.error("修改参数失败");
            this.showEditForm = false;
            this.getCateList();
            this.$message.success("修改参数成功");
          })
          .catch(err => err);
      });
    },
    removeCateById(cateId) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete(`categories/${cateId}`)
            .then(res => {
              if (res.data.meta.status !== 200)
                return this.$message.error("删除失败");
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getCateList();
            })
            .catch(err => {
              return err;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addCate() {
      this.$http.get("categories", { params: { type: 2 } }).then(res => {
        if (res.data.meta.status !== 200)
          return this.$message.error("获取分类列表失败");
        this.cateList = res.data.data;
      });
      this.showAddForm = true;
    },
    addFormClose() {
      this.$refs.addRef.resetFields();
      this.cateSelected = [];
    },
    confirmAdd(addInfo) {
      this.$refs.addRef.validate(valid => {
        if (!valid) return;
        this.$http
          .post("categories", {
            cat_pid:
              this.cateSelected.length === 0
                ? 0
                : this.cateSelected[this.cateSelected.length - 1],
            cat_name: this.addInfo.cat_name,
            cat_level: this.cateSelected.length
          })
          .then(res => {
            console.log(res);
            if (res.data.meta.status !== 201)
              this.$message.error("添加分类失败");
            this.$message.success("添加分类成功");
            this.showAddForm = false;
            this.getCateList();
          });
      });
    },
    cateChange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.tree-table {
  margin-top: 20px;
}
</style>
