import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const thoughtMain = () => import('@/views/thought-main.vue')
const thoughtOverview = () =>
  import('@/views/thought-overview/thought-overview.vue')
const thoughtEdit = () => import('@/views/thought-edit/thought-edit.vue')
const thoughtReplay = () => import('@/views/thought-replay/thought-replay.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/thought',
    component: thoughtMain,
    children: [
      {
        path: 'overview',
        component: thoughtOverview,
        name: '数据链模拟'
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
    path: '/:catchAll(.*)',
    redirect: '/thought/overview'
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
