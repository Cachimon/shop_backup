<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="3">
          <el-button type="primary" @click="addRole">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe class="role-list-table">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1, i1) in scope.row.children"
              :class="['bottom-border', 'v-center', i1===0?'top-border':'']"
            >
              <el-col :span="6">
                <el-tag closable @close="tagClose1(scope.row, item1.id)">{{item1.authName}}</el-tag>
              </el-col>
              <el-col :span="18">
                <el-row
                  v-for="(item2, i2) in item1.children"
                  :class="{'top-border': i2!==0, 'v-center': true}"
                >
                  <el-col :span="8">
                    <el-tag
                      type="success"
                      closable
                      @close="tagClose1(scope.row, item2.id)"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                  <el-col :span="16">
                    <el-row>
                      <el-tag
                        type="warning"
                        closable
                        @close="tagClose1(scope.row, item3.id)"
                        v-for="(item3, i3) in item2.children"
                      >{{item3.authName}}</el-tag>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="290px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRole(scope.row)"
            >编辑</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRoleById(scope.row.id)"
            >删除</el-button>
            <!-- 分配权限按钮 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="setRight(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑角色" :visible.sync="showEditForm" width="50%">
      <el-form :model="editInfo" :rules="editRules" label-width="80px" ref="editRef">
        <!--是rules不是rule-->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editInfo.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editInfo.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(editInfo)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加角色" :visible.sync="showAddForm" width="50%" @close="addFormClose">
      <el-form :model="addInfo" :rules="addRules" label-width="80px" ref="addRef">
        <!--是rules不是rule-->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addInfo.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addInfo.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd(addInfo)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配权限" :visible.sync="showSetForm" width="50%" @close="setFormClose">
      <el-form ref="setRef">
        <!--是rules不是rule-->
        <el-tree
          :data="setTreeData"
          show-checkbox
          node-key="id"
          :props="setTreeProps"
          default-expand-all
          :default-checked-keys="originalRight"
          ref="setTreeRef"
        ></el-tree>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmSet">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleList: [],
      showEditForm: false,
      editInfo: {
        id: 0,
        roleName: "",
        roleDesc: ""
      },
      editRules: {
        roleName: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ]
      },
      showAddForm: false,
      addInfo: {
        roleName: "",
        roleDesc: ""
      },
      addRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      showSetForm: false,
      setTreeData: [],
      originalRight: [],
      setTreeProps: {
        label: "authName",
        children: "children"
      },
      selectedRight: [],
      setFormId: 0
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      this.$http.get("roles").then(rolesList => {
        if (rolesList.data.meta.status !== 200)
          return this.$message.error("获取角色数据失败！");

        this.roleList = rolesList.data.data;
      });
    },
    addRole() {
      this.showAddForm = true
      
    },
    addFormClose(){
      
      this.$refs.addRef.resetFields()
      
    },
    confirmAdd(){
      this.$refs.addRef.validate(valid => {
        if(!valid) return
        this.$http.post('roles', this.addInfo).then(res => {
          if(res.data.meta.status !== 201)
            return this.$message.error("添加角色失敗")
          this.showAddForm = false
          this.getRoleList()
          this.$message.success("添加角色成功")
        })
      })
    },
    editRole(role) {
      console.log(role);
      this.editInfo.id = role.id;
      this.editInfo.roleName = role.roleName;
      this.editInfo.roleDesc = role.roleDesc;
      this.showEditForm = true;
    },
    confirmEdit(editInfo) {
      this.$refs.editRef.validate(valid => {
        if (!valid) return;
        this.$http
          .put("roles/" + this.editInfo.id, {
            roleName: this.editInfo.roleName,
            roleDesc: this.editInfo.roleDesc
          })
          .then(res => {
            if (res.data.meta.status !== 200)
              return this.$message.error(res.data.meta.msg);
            this.showEditForm = false;
            this.getRoleList();
            this.$message.success("编辑角色成功！");
          })
          .catch(err => {
            return err;
          });
      });
    },
    removeRoleById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("roles/" + id)
            .then(res => {
              console.log(res);
              if (res.data.meta.status !== 200)
                return this.$message.error("删除失败");
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getRoleList();
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
    setFormClose() {
      this.originalRight = [];
    },
    getRoleRight(node) {
      if (!node.children) {
        this.originalRight.push(node.id);
        return;
      }
      node.children.forEach((value, index) => {
        this.getRoleRight(value);
      });
    },
    setRight(role) {
      //获取原有权限
      this.setFormId = role.id;
      this.getRoleRight(role);
      //获取权限列表
      this.$http
        .get("rights/tree")
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("获取权限列表失败");
          this.setTreeData = res.data.data;
        })
        .catch(err => err);
      //this.setTreeData = role.children
      this.showSetForm = true;
    },
    confirmSet() {
      this.selectedRight = [
        ...this.$refs.setTreeRef.getHalfCheckedKeys(),
        ...this.$refs.setTreeRef.getCheckedKeys()
      ].join(",");
      this.$http
        .post(`roles/${this.setFormId}/rights`, {
          rids: this.selectedRight
        })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("分配权限失败");
          this.showSetForm = false;
          this.getRoleList();
          this.$message.success("设置权限成功");
          this.originalRight = [];
        });
    },
    tagClose1(role, rightId) {
      console.log(role, rightId);
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete(`roles/${role.id}/rights/${rightId}`)
            .then(res => {
              console.log(res);
              if (res.data.meta.status !== 200)
                return this.$message.error("删除权限失败");
              role.children = res.data.data;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => err);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  }
};
</script>
<style lang="scss" scoped>
.role-list-table {
  .el-tag {
    margin: 10px;
  }
}
.top-border {
  border-top: 1px solid #eee;
}
.bottom-border {
  border-bottom: 1px solid #eee;
}
.v-center {
  display: flex;
  align-items: center;
}
</style>
