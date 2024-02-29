<template>
  <CesiumMap></CesiumMap>
  <modelSource></modelSource>
  <entityManager ref="entityManaRef"></entityManager>
  <layerController></layerController>
</template>
<script setup lang="ts">
import modelSource from './components/model-source.vue'
import entityManager from './components/entity-manager.vue'
import layerController from '@/views/thought-edit/components/layer-controller.vue'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { WS_EVENT } from '@/common/enum'
import { useWebSocketStore } from '@/stores/webSocketStore'
import { onMounted, ref } from 'vue'
import { useEntityStore } from '@/stores/entityStore'
import { onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
const websocketStore = useWebSocketStore()
const cesiumStore = useCesiumStore()
const thoughtStore = useThoughtStore()
const entityStore = useEntityStore()
const entityManaRef = ref(null)
onMounted(() => {
  requestIdleCallback(() => {
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
    thoughtStore.thought.dataLinkInfo.link?.forEach((_) => {
      _.linkTo.forEach((i: any) => {
        const deviceArr = i.split('-')
        const entityOne = entityStore.getEntityById(deviceArr[0])
        const entityTwo = entityStore.getEntityById(deviceArr[1])
        cesiumStore.cesium.linkMap.addLink({
          id: i,
          positionArr: [entityOne.position, entityTwo.position]
        })
      })
    })
    websocketStore.connect('ws://localhost:12000/hsdb/101')
    websocketStore.on(WS_EVENT.onopen, () => {
      // eslint-disable-next-line no-console
      console.log('连接websocket')
    })
    websocketStore.on(WS_EVENT.onclose, () => {
      // eslint-disable-next-line no-console
      console.log('断开websocket')
    })
    websocketStore.on(WS_EVENT.onerror, () => {
      ElMessage.error(`websocket出错!`)
    })
  })
})
onBeforeUnmount(() => {
  entityStore.resetEntity()
  cesiumStore.resetCesium()
  websocketStore.disconnect()
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
