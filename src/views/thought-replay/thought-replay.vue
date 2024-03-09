<template>
  <div>
    <!-- <CesiumMap></CesiumMap> -->
    <controlBar></controlBar>
    <loadingMask ref="loadingMaskRef"></loadingMask>
    <battlePanel></battlePanel>
    <dataPanel></dataPanel>
  </div>
</template>
<script setup lang="ts">
import controlBar from './components/control-bar.vue'
import loadingMask from './components/loading-mask.vue'
import battlePanel from './components/battle-panel.vue'
import dataPanel from './components/data-panel.vue'
import { useWebSocketStore } from '@/stores/webSocketStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { useEntityStore } from '@/stores/entityStore'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useLogStore } from '@/stores/logStore'
import { WS_EVENT } from '@/common/enum'
import { ElMessage } from 'element-plus'
import { getNowTimeStr } from '@/common/helper'
const loadingMaskRef = ref(null)
const websocketStore = useWebSocketStore()
const thoughtStore = useThoughtStore()
const entityStore = useEntityStore()
const cesiumStore = useCesiumStore()
const logStore = useLogStore()
const initSendMessage = () => {
  const thought = thoughtStore.thought
  let data = {
    InteractType: 'baseInter.FederationInteract.SimFileSetInteract',
    SimFileName: thought.filePath + '/' + thought.name + '.json'
  }
  websocketStore.sendMessage(data)
}
const sendCloseMessage = () => {
  const data = {
    InteractType: 'baseInter.FederationInteract.SimControlInter',
    StateCtrl: '13'
  }
  websocketStore.sendMessage(data)
}
onMounted(() => {
  entityStore.initEntityStore(thoughtStore.thought.entities) //根据thought初始化entityStore
  entityStore.entitiesArr.forEach((_) => {
    cesiumStore.cesium.modelMap.addModel(_ as any)
    // cesiumStore.cesium.trackMap.addTrack({ id: _.id, positionArr: _.path })
  })
  websocketStore.connect('ws://localhost:12000/hsdb/101')
  websocketStore.addEventListener(WS_EVENT.onopen, () => {
    // eslint-disable-next-line no-console
    console.log('连接websocket')
    initSendMessage()
  })
  websocketStore.addEventListener(WS_EVENT.onclose, () => {
    // eslint-disable-next-line no-console
    console.log('断开websocket')
  })
  websocketStore.addEventListener(WS_EVENT.onerror, () => {
    ElMessage.error(`websocket出错!`)
  })
  websocketStore.addEventListener(WS_EVENT.initialSuccess, () => {
    // eslint-disable-next-line no-console
    console.log('初始化加载想定成功')
    loadingMaskRef.value.endProgress()
  })
  websocketStore.addEventListener(WS_EVENT.dataMessage, (data) => {
    // eslint-disable-next-line no-console
    console.log('数据日志', data)
    const message = JSON.parse(data.Message)
    if (message.length) {
      const m = message[0].message
      logStore.pushDataLog({ message: m, timeStr: getNowTimeStr() })
    }
  })
  websocketStore.addEventListener(WS_EVENT.missionMessage, (data) => {
    // eslint-disable-next-line no-console
    console.log('作战任务日志', data)
    data.Message.forEach((_) => {
      logStore.pushWarMissionLog({ ..._, timeStr: getNowTimeStr() })
    })
  })
  websocketStore.addEventListener(WS_EVENT.positonMessage, (data) => {
    // eslint-disable-next-line no-console
    // console.log('推送位置', data)
    const convertPosition = [
      Number(data.Lon),
      Number(data.Lat),
      Number(data.Alt)
    ]
    const opt = {
      id: data.objName,
      position: convertPosition
    }
    entityStore.updateEntityPosition(opt)
    const opt1 = {
      id: data.objName,
      position: convertPosition,
      heading: data.Yaw || '0',
      pitch: data.Pitch || '0',
      roll: data.Roll || '0'
    }
    cesiumStore.cesium.modelMap.updateModelPosition(opt1)
  })
})

onBeforeUnmount(() => {
  sendCloseMessage()
  websocketStore.disconnect()
})
</script>
<style scoped></style>
