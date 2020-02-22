<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @input="queryChange" @clear="queryClose">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe class="user-list-table">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="queryInfo.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="showAddUserForm" width="50%">
      <el-form :model="addUserInfo" :rules="addUserRules" label-width="70px" ref="addUserRef">
        <!--是rules不是rule-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addUserInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddUserForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="更新用户" :visible.sync="showEditForm" width="50%">
      <el-form :model="editInfo" :rules="editRules" label-width="70px" ref="eiditRef">
        <!--是rules不是rule-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(editInfo)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="showAssignRoleForm" width="50%">
      <el-form :model="userInfo" label-width="96px" class="role-form">
        <!--是rules不是rule-->
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.roleName}}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAssignRoleForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }

      cb(new Error("请输入合法的邮箱"));
    };

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };
    return {
      query: "",
      userList: [],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      total: 0,
      timer: null,
      showAddUserForm: false,
      addUserInfo: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      showEditForm: false,
      editInfo: {
        id: "",
        email: "",
        mobile: "",
        username: ""
      },
      editRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      showAssignRoleForm: false,
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色Id值
      selectedRoleId: "",
      currentPage: 1,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$http
        .get("users", { params: this.queryInfo })
        .then(data => {
          //参数传入params
          let res = data.data;
          if (res.meta.status !== 200)
            return this.$message.error("获取列表失败");
          this.total = res.data.total;
          this.userList = res.data.users;
        })
        .catch(err => {
          return err;
        });
    },
    queryChange(e){
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryInfo.query = e
        this.getUserList()
      }, 1000)
    },
    queryClose(){
      this.queryInfo.query = ''
      //this.getUserList()
    },
    userStateChanged(user) {
      console.log(user.id);
      this.$http
        .put("users/" + user.id + "/state/" + user.mg_state, {
          params: { uId: user.id, type: !user.mg_state }
        })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error(res.data.meta.msg);
          this.$message.success(res.data.meta.msg);
          this.getUserList();
        })
        .catch(err => {
          return err;
        });
    },
    addUser() {
      this.showAddUserForm = true;
    },
    confirmAddUser() {
      this.$refs.addUserRef.validate(valid => {
        if (!valid) return;
        this.$http
          .post("users", this.addUserInfo)
          .then(res => {
            console.log(res);
            if (res.data.meta.status !== 201)
              return this.$message.error(res.data.meta.msg);
            this.$message.success("创建用户成功！");
            this.showAddUserForm = false;
            this.getUserList();
          })
          .catch(err => {
            return err;
          });
      });
    },
    confirmEdit() {
      console.log("confirm");
    },
    editUser(user) {
      console.log(user);
      this.editInfo.id = user.id;
      this.editInfo.username = user.username;
      this.editInfo.email = user.email;
      this.editInfo.mobile = user.mobile;
      this.showEditForm = true;
    },
    confirmEdit(user) {
      console.log(user);
      this.$refs.eiditRef.validate(valid => {
        if (!valid) return;
        this.$http
          .put("users/" + user.id, {
            email: user.email,
            mobile: user.mobile
          })
          .then(res => {
            if (res.data.meta.status !== 200)
              return this.$message.error("res.data.meta.msg");
            this.$message.success("更新用户成功");
            this.showEditForm = false;
            this.getUserList();
          })
          .catch(err => {
            return err;
          });
      });
    },
    removeUserById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("users/" + id)
            .then(res => {
              console.log(res);
              if (res.data.meta.status !== 200)
                return this.$message.error("删除失败");
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getUserList();
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
    setRole(user) {
      this.$http
        .get("users/" + user.id)
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error("获取用户数据失败！");
          this.$http
            .get("roles")
            .then(rolesList => {
              if (rolesList.data.meta.status !== 200)
                return this.$message.error("获取用户数据失败！");
              this.rolesList = rolesList.data.data;
              this.userInfo = res.data.data;
              this.showAssignRoleForm = true;
              for (let item of rolesList.data.data) {
                if (item.id === this.userInfo.rid)
                  this.userInfo.roleName = item.roleName;
              }
            })
            .catch(err => {
              return err;
            });
        })
        .catch(err => {
          return err;
        });
    },
    confirmRole() {
      //this.userInfo.rid = this.selectedRoleId
      this.$http
        .put("users/" + this.userInfo.id + "/role", {
          rid: this.selectedRoleId
        })
        .then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error(res.data.meta.msg);
          this.showAssignRoleForm = false;
          this.$message.success(res.data.meta.msg);
          this.getUserList();
        })
        .catch(err => {
          return err;
        });
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      //console.log(this.queryInfo.pagesize)
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pagenum = val
      this.getUserList()
    }
  }
};
</script>
<style lang="scss" scoped>
.el-dialog {
  text-align: left;
}
.role-form {
  text-align: left !important;
}
#role-form-item {
  text-align: left;
  .el-form-item__label {
    text-align: left !important;
  }
}
</style>
