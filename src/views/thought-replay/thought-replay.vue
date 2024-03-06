<template>
  <CesiumMap></CesiumMap>
  <controlBar></controlBar>
</template>
<script setup lang="ts">
import controlBar from './components/control-bar.vue'
import { useWebSocketStore } from '@/stores/webSocketStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { WS_EVENT } from '@/common/enum'
import { ElMessage } from 'element-plus'
const websocketStore = useWebSocketStore()
const thoughtStore = useThoughtStore()
const initSendMessage = () => {
  const thought = thoughtStore.thought
  let data = {
    InteractType: 'baseInter.FederationInteract.SimFileSetInteract',
    // status: 'start',
    SimFileName: thought.filePath + '/' + thought.name + '.json'
  }
  websocketStore.sendMessage(data)
}
onMounted(() => {
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
    console.log('初始化加载想定成功')
  })
})

onBeforeUnmount(() => {
  websocketStore.disconnect()
})
</script>
<style scoped></style>
