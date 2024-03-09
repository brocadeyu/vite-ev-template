import { createRouter, createWebHashHistory } from 'vue-router'
import { useCesiumStore } from '@/stores/cesiumStore'
import { AnimateLocation } from '@/common/helper'
import type { RouteRecordRaw } from 'vue-router'
const login = () => import('@/views/log-in/login-in.vue')
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
    path: '/login',
    component: login,
    name: '登录'
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach((to, from) => {
  const cesiumStore = useCesiumStore()
  cesiumStore.cesium.globeRoute.stop()
  if (from.path === '/') {
    cesiumStore.cesium.setLookAt(AnimateLocation.Horizon)
  }
  if (to.path === '/thought/overview') {
    cesiumStore.cesium
      .setAnimateTo({
        ...AnimateLocation.Center,
        delay: 200,
        duration: 2.5
      })
      .then(() => {
        cesiumStore.cesium.globeRoute.start(2.0)
      })
  }
  if (to.path === '/login') {
    cesiumStore.cesium
      .setAnimateTo({
        ...AnimateLocation.Horizon,
        delay: 200,
        duration: 2
      })
      .then(() => {
        cesiumStore.cesium.globeRoute.start(1.0)
      })
  }
  if (
    to.path.includes('thought/edit') ||
    to.path.includes('thought/replay') ||
    to.path.includes('thought/create')
  ) {
    cesiumStore.cesium.setFrameRateShow(true)
    cesiumStore.cesium.setAnimateTo({
      ...AnimateLocation.Close,
      delay: 200,
      duration: 2.5
    })
  } else {
    cesiumStore.cesium.setFrameRateShow(false)
  }
  // console.log(cesiumStore.cesium)
  // console.log('to', to.path)
  // console.log('from', from.path)

  document.title = to.name as string
})

export default router
