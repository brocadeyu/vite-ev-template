<template>
  <CesiumMap></CesiumMap>
  <controlBar></controlBar>
</template>
<script setup lang="ts">
import controlBar from './components/control-bar.vue'
import { useWebSocketStore } from '@/stores/webSocketStore'
import { WS_EVENT } from '@/common/enum'
import { ElMessage } from 'element-plus'
const websocketStore = useWebSocketStore()
onMounted(() => {
  websocketStore.connect('ws://localhost:12000/hsdb/101')
  websocketStore.addEventListener(WS_EVENT.onopen, () => {
    // eslint-disable-next-line no-console
    console.log('连接websocket')
  })
  websocketStore.addEventListener(WS_EVENT.onclose, () => {
    // eslint-disable-next-line no-console
    console.log('断开websocket')
  })
  websocketStore.addEventListener(WS_EVENT.onerror, () => {
    ElMessage.error(`websocket出错!`)
  })
})

onBeforeUnmount(() => {
  websocketStore.disconnect()
})
</script>
<style scoped></style>
