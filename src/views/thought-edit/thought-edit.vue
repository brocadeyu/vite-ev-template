<template>
  <CesiumMap></CesiumMap>
  <modelSource></modelSource>
  <entityManager></entityManager>
</template>
<script setup lang="ts">
import modelSource from './components/model-source.vue'
import entityManager from './components/entity-manager.vue'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { onMounted } from 'vue'
import { useEntityStore } from '@/stores/entityStore'
import { onBeforeUnmount } from 'vue'
const cesiumStore = useCesiumStore()
const thoughtStore = useThoughtStore()
const entityStore = useEntityStore()
onMounted(() => {
  // // eslint-disable-next-line no-console
  // console.log('cesiumStore=>', cesiumStore.cesium)
  // // eslint-disable-next-line no-console
  // console.log('thoughtStore=>', thoughtStore.thought)
  entityStore.initEntityStore(thoughtStore.thought.entities) //根据thought初始化entityStore
  entityStore.entitiesArr.forEach((_) => {
    cesiumStore.cesium.modelMap.addModel(_ as any)
  })
})
onBeforeUnmount(() => {
  entityStore.resetEntity()
  cesiumStore.resetCesium()
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
