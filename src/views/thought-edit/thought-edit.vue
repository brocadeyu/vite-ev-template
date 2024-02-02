<template>
  <CesiumMap></CesiumMap>
</template>
<script setup lang="ts">
import { useCesiumStore } from '@/stores/cesiumStore'
import { onMounted } from 'vue'
const cesiumStore = useCesiumStore()
onMounted(() => {
  // eslint-disable-next-line no-console
  console.log('cesiumStore=>', cesiumStore.cesium)
})
</script>
<style scoped>
.layout {
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tab {
  height: 70vh;
  width: 15vw;
  background-color: cornflowerblue;
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-lr;
  writing-mode: tb-rl;
  font-size: 30px;
  letter-spacing: 31px;
  text-indent: 31px;
  user-select: none;
  border-radius: 10px;
}
</style>
