<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import CesiumMap from '@/map/cesiumMap'
import { useCesiumStore } from '@/stores/cesiumStore'
const cesiumStore = useCesiumStore()
onMounted(() => {
  const instance = new CesiumMap(document.getElementById('cesiumContainer'))
  cesiumStore.initCesiumStore(instance)
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
}
</style>
