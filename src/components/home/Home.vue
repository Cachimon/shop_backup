<template>
  <div class="home-container">
    <el-container class="home-container">
      <el-header>
        <div>
          <img src=@/assets/heima.png alt="">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container class="aside-container">
        <el-aside ref="asideRef" :width="isCollapse ? '64px' : '180px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            unique-opened
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuItem"
              :key="item.id + ''"
              class="first-level-menu"
            >
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span slot="title">{{item.authName}}</span>
              </template>
              <el-menu-item
                :index="'/' + subItem.id"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      menuItem: [],
      iconsObj: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao"
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ""
    };
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    
  },
  mounted() {
    //this.collapse()
  },
  methods: {
    getMenuList(){
      this.$http.get("menus").then(res => {
      this.menuItem = res.data.data;
    });
    },
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.$router.push(activePath)
      this.activePath = activePath
    },
    //collapse(){
    //  console.log(parseFloat(this.$refs.asideRef.width))
    //  if(parseFloat(this.$refs.asideRef.width) <= 200) this.isCollapse = true
    //}
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    }
  }
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  width: 100%;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img{
      height: 100%;
      width: auto;
    }
    span {
      margin-left: 15px;
    }
  }
}
.aside-container{
  width: 100%;
}
.el-aside {
  background-color: #333744;
  //width: 15% !important;
  .el-menu {
    border-right: none;
    text-align: left;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>