import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../views/Home.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login-v3',
    hidden: true,
    meta: {
      name: '登录v2',
    },
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      name: '登录v2',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/login-v3',
    name: 'loginV3',
    hidden: true,
    meta: {
      name: '登录v3',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginV3.vue'),
  },
  {
    path: '/console',
    name: 'Console',
    meta: {
      name: '控制台',
      icon: 'console',
    },
    component: () => import('../views/Layout'),
    children: [
      {
        path: '/console',
        name: 'Index',
        meta: {
          name: '首页',
        },
        component: () => import('../views/Console'),
      },
    ],
  },
  {
    path: '/info',
    name: 'Info',
    meta: {
      name: '信息管理',
      icon: 'menu',
    },
    component: () => import('../views/Layout'),
    children: [
      {
        path: '/infoIndex',
        name: 'InfoIndex',
        meta: {
          name: '信息列表',
        },
        component: () => import('../views/Info/index'),
      },
      {
        path: '/infoCategory',
        name: 'InfoCategory',
        meta: {
          name: '信息分类',
        },
        component: () => import('../views/Info/Category'),
      },
      {
        path: '/detailed',
        name: 'InfoDetailed',
        hidden: true,
        meta: {
          name: '信息详情',
        },
        component: () => import('../views/Info/Detailed'),
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      name: '用户管理',
      icon: 'menu',
    },
    component: () => import('../views/Layout'),
    children: [
      {
        path: '/userIndex',
        name: 'UserIndex',
        meta: {
          name: '用户列表',
        },
        component: () => import('../views/User/index'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
