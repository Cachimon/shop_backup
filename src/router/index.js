import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('components/login/Login')//不可加大括号
const Home = () => import('components/home/Home')//不可加大括号
const Welcome = () => import('views/welcome/Welcome')//不可加大括号
const Users = () => import('views/user/Users')//不可加大括号
const Roles = () => import('views/power/Roles')//不可加大括号
const Rights = () => import('views/power/Rights')//不可加大括号
const Goods = () => import('views/goods/Goods')//不可加大括号
const Add = () => import('views/goods/Add')//不可加大括号
const Edit = () => import('views/goods/Edit')//不可加大括号
const Params = () => import('views/goods/Params')//不可加大括号
const Categories = () => import('views/goods/Categories')//不可加大括号
const Orders = () => import('views/order/Order')//不可加大括号
const Reports = () => import('views/report/Reports')//不可加大括号

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [//是数组不是对象
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/goods',
        component: Goods
      },
      {
        path: '/goods/add',
        component: Add
      },{
        path: '/goods/edit/:id',
        component: Edit
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/categories',
        component: Categories
      },
      {
        path: '/orders',
        component: Orders
      },
      {
        path: '/reports',
        component: Reports
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})



export default router
