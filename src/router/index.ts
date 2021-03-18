import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

import Home from '../pages/home/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '控制台首页', icon: 'DashboardOutlined' }
  },
  {
    path: '/article',
    name: 'ArticleIndex',
    component: () => import('@/pages/article/index.vue'),
    meta: { title: '文章管理', icon: 'CoffeeOutlined' }
  },
  {
    path: '/ads',
    name: 'AdsIndex',
    component: () => import('@/pages/ads/index.vue'),
    meta: { title: '广告管理', icon: 'AppstoreOutlined' }
  },
  {
    path: '/system',
    name: 'SystemIndex',
    component: () => import('@/pages/system/index.vue'),
    meta: { title: '系统管理', icon: 'SettingOutlined' }
  },
  {
    path: '/account',
    name: 'AccountIndex',
    component: () => import('@/pages/account/index.vue'),
    meta: { title: '管理系统登录', layout: 'null', icon: 'AppstoreOutlined' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorIndex',
    component: () => import('@/pages/error/index.vue'),
    meta: { title: '访问出错了', layout: 'null', icon: 'AppstoreOutlined' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
