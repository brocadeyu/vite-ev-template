<template>
  <CesiumMap></CesiumMap>
  <modelSource></modelSource>
  <entityManager ref="entityManaRef"></entityManager>
</template>
<script setup lang="ts">
import modelSource from './components/model-source.vue'
import entityManager from './components/entity-manager.vue'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { onMounted, ref } from 'vue'
import { useEntityStore } from '@/stores/entityStore'
import { onBeforeUnmount } from 'vue'
const cesiumStore = useCesiumStore()
const thoughtStore = useThoughtStore()
const entityStore = useEntityStore()
const entityManaRef = ref(null)
onMounted(() => {
  entityStore.initEntityStore(thoughtStore.thought.entities) //根据thought初始化entityStore
  entityManaRef.value.setTreeData(
    entityStore.entitiesArr.map((_) => {
      return {
        id: (_ as any).id,
        label: (_ as any).id
      }
    })
  )
  entityStore.entitiesArr.forEach((_) => {
    cesiumStore.cesium.modelMap.addModel(_ as any)
    cesiumStore.cesium.trackMap.addTrack({ id: _.id, positionArr: _.path })
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
