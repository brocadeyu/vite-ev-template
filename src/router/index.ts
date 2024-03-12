import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const dataLink = () => import('@/views/dataLink/index')
const login = () => import('@/views/dataLink/log-in/login-in.vue')
const thoughtIndex = () => import('@/views/dataLink/thought/thought-index.vue')
const thoughtOverview = () =>
  import('@/views/dataLink/thought/thought-overview/thought-overview.vue')
const thoughtEdit = () =>
  import('@/views/dataLink/thought/thought-edit/thought-edit.vue')
const thoughtReplay = () =>
  import('@/views/dataLink/thought/thought-replay/thought-replay.vue')
const simulateSend = () => import('@/views/simulateSend/index.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dataLink',
    component: dataLink,
    children: [
      {
        path: 'thought',
        component: thoughtIndex,
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
  document.title = to.name as string
})

export default router
