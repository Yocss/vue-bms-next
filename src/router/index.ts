import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '控制台', icon: 'dashboard' }
  },
  {
    path: '/account',
    name: 'AccountIndex',
    component: () => import('@/pages/account/index.vue'),
    meta: { title: '管理系统登录', layout: 'null' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorIndex',
    component: () => import('@/pages/error/index.vue'),
    meta: { title: '访问出错了', layout: 'null' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
