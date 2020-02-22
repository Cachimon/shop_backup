<template>
  <div class="login-container">
    <div class="logo">
      <img src=@/assets/logo.png alt="">
    </div>
    <el-form class="login-form" :rules="rules" ref="loginForm" :model="formInline" :hide-required-asterisk="false">
      <el-form-item prop="username">
        <el-input prefix-icon="iconfont icon-user"  v-model="formInline.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="iconfont icon-3702mima" type="password" v-model="formInline.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "LoginForm",//必须在引号内
  data() {
      return {
        formInline: {
          username: 'admin',
          password: '123456'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      resetLoginForm(){
        this.$refs.loginForm.resetFields()
      },
      login(){
        this.$refs.loginForm.validate(valid => {
          if(!valid) return
          
          this.$http.post('login', this.formInline).then( res => {
            //console.log(res.data.data.token)
            if(res.data.meta.status !== 200) return this.$message.error('登录失败！')
            window.sessionStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
            this.$message({
              message: '登录成功！',
              type: 'success',
              duration: 500
            })
          })
        })
      },
      
    }
}
</script>
<style lang="scss" scoped>
.login-container{
  position: absolute;
  left: 50%;
  top: 50%;
  height: 300px;
  width: 400px;
  transform: translate(-50%, -50%);
  background: #eee;
  .logo{
    position: absolute;
    height: 120px;
    width: 120px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    padding: 10px;
    background: #fff;
    img{
      border-radius: 50%;
      vertical-align: middle;
      background: #eee;
    }
  }
  .login-form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
  
}
</style>