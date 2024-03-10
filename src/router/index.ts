import { createRouter, createWebHashHistory } from 'vue-router'
import { useCesiumStore } from '@/stores/cesiumStore'
import { AnimateLocation } from '@/common/helper'
import type { RouteRecordRaw } from 'vue-router'
const dataLink = () => import('@/views/dataLink/index.vue')
const login = () => import('@/views/log-in/login-in.vue')
const thoughtMain = () => import('@/views/thought-main.vue')
const thoughtOverview = () =>
  import('@/views/thought-overview/thought-overview.vue')
const thoughtEdit = () => import('@/views/thought-edit/thought-edit.vue')
const thoughtReplay = () => import('@/views/thought-replay/thought-replay.vue')
const simulateSend = () => import('@/views/simulate-send/simulate-send.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dataLink',
    component: dataLink,
    children: [
      {
        path: 'thought',
        component: thoughtMain,
        children: [
          {
            path: 'overview',
            component: thoughtOverview,
            name: '数据链模拟'
          },
          {
            path: 'create',
            component: thoughtEdit,
            name: '新建想定'
          },
          {
            path: 'edit/:thoughtName',
            component: thoughtEdit,
            name: '想定编辑'
          },
          {
            path: 'replay/:thoughtName',
            component: thoughtReplay,
            name: '想定回放'
          }
        ]
      },
      {
        path: 'login',
        component: login,
        name: '登录'
      }
    ]
  },
  {
    path: '/simulateSend',
    component: simulateSend,
    name: '模拟发送'
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/dataLink/login'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach((to) => {
  // cesiumStore.cesium?.setFrameRateShow(false)
  document.title = to.name as string
})

export default router
