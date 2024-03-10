<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { AnimateLocation } from '@/common/helper'
import { useCesiumStore } from '@/stores/cesiumStore'
import { onBeforeRouteUpdate } from 'vue-router'
import { useRoute } from 'vue-router'
const cesiumStore = useCesiumStore()
const route = useRoute()
onMounted(async () => {
  const el: HTMLElement = document.getElementById('cesiumContainer')
  cesiumStore.initCesiumStore(el)
  // eslint-disable-next-line no-console
  console.log('🚀🚀🚀【cesium init success】')
  cesiumStore.cesium.setLookAt(AnimateLocation.Horizon)
  switch (route.name) {
    case '登录':
      cesiumStore.cesium.globeRoute.start(1.0)
      break
    case '数据链模拟':
      cesiumStore.cesium
        .setAnimateTo({
          ...AnimateLocation.Center,
          delay: 200,
          duration: 2.5
        })
        .then(() => {
          cesiumStore.cesium.globeRoute.start(2.0)
        })
      break
  }
  if (['新建想定', '想定编辑', '想定回放'].includes(route.name)) {
    cesiumStore.cesium
      .setAnimateTo({
        ...AnimateLocation.Close,
        delay: 200,
        duration: 2
      })
      .then(() => {
        cesiumStore.cesium.setFrameRateShow(true)
      })
  } else {
    cesiumStore.cesium.setFrameRateShow(false)
  }
})
onBeforeRouteUpdate((to) => {
  cesiumStore.cesium.globeRoute.stop()
  // console.log('to', to.name, 'from', from.name)
  if (to.name === '登录') {
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
  if (to.name === '数据链模拟') {
    cesiumStore.cesium
      .setAnimateTo({
        ...AnimateLocation.Center,
        delay: 200,
        duration: 2
      })
      .then(() => {
        cesiumStore.cesium.globeRoute.start(1.0)
      })
  }
  if (['新建想定', '想定编辑', '想定回放'].includes(to.name)) {
    cesiumStore.cesium
      .setAnimateTo({
        ...AnimateLocation.Close,
        delay: 200,
        duration: 2
      })
      .then(() => {
        cesiumStore.cesium.setFrameRateShow(true)
      })
  } else {
    cesiumStore.cesium.setFrameRateShow(false)
  }
})
</script>

<style scoped>
::v-deep(.cesium-viewer-bottom) {
  visibility: hidden;
}
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: -1;
  top: 0;
}
</style>
