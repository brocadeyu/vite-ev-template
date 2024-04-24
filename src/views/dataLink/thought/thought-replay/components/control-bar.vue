<template>
  <div class="cb-container">
    <div class="cb-content">
      <el-button circle size="small" color="transparent" @click="reversePlay">
        <el-icon :size="24">
          <i-ep-VideoPause v-if="isPlaying" />
          <i-ep-VideoPlay v-else />
        </el-icon>
      </el-button>
      步长:
      <el-select
        v-model="stepSize"
        placeholder="Select"
        size="small"
        style="
          width: 140px;
          --el-fill-color-blank: transparent;
          --el-text-color-regular: white;
        "
        color="#119aa0"
        @change="handleStepSizeChange"
      >
        <el-option
          v-for="item in stepOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button size="small" color="#119aa0" @click="sendRequestGenDoc"
        >生成文档</el-button
      >
      <el-button size="small" color="#119aa0" @click="toSimulateSend"
        >模拟发送</el-button
      >
      <el-button size="small" color="#119aa0" @click="openDeviceMonitorView"
        >设备监控</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebSocketStore } from '@/stores/webSocketStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { useEntityStore } from '@/stores/entityStore'
import { usePopupStore } from '@/stores/popupStore'
import { useRouter } from 'vue-router'
import { screenShot } from '@/common/helper'
import { ElLoading } from 'element-plus'
import { WS_EVENT } from '@/common/enum'
// import { WS_EVENT } from '@/common/enum'
let loadingInstance = null

const websocketStore = useWebSocketStore()
const thoughtStore = useThoughtStore()
const router = useRouter()
const entityStore = useEntityStore()
const popupStore = usePopupStore()
const stepSize = ref('200')
const stepOptions = [
  {
    value: '200',
    label: '200ms'
  },
  {
    value: '1000',
    label: '1000ms'
  }
]
const isStart = ref(false) //是否开始播放
const isPlaying = ref(false) //是否播放中
const reversePlay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    !isStart.value && startPlay()
    isStart.value && continuePlay()
  } else {
    pausePlay()
  }
  if (!isStart.value) {
    isStart.value = true
  }
}
const startPlay = () => {
  const data = {
    InteractType: 'baseInter.FederationInteract.SimControlInter',
    StateCtrl: '10',
    StepTime: stepSize.value
  }
  websocketStore.sendMessage(data)
  // eslint-disable-next-line no-console
  console.log('开始播放')
}
const continuePlay = () => {
  const data = {
    InteractType: 'baseInter.FederationInteract.SimControlInter',
    StateCtrl: '12'
  }
  websocketStore.sendMessage(data)
  // eslint-disable-next-line no-console
  console.log('继续播放')
}
const pausePlay = () => {
  const thought = thoughtStore.thought
  const data = {
    InteractType: 'baseInter.FederationInteract.SimControlInter',
    StateCtrl: '11',
    SimFileName: thought.filePath + '/' + thought.name + '.json'
  }
  websocketStore.sendMessage(data)
  // eslint-disable-next-line no-console
  console.log('暂停播放')
}
const handleStepSizeChange = (val) => {
  const data = {
    InteractType: 'baseInter.FederationInteract.SimControlInter',
    StepTime: val
  }
  websocketStore.sendMessage(data)
  // eslint-disable-next-line no-console
  console.log('设置步长', val)
}
const sendRequestGenDoc = async () => {
  loadingInstance = ElLoading.service({ fullscreen: true, text: '生成文档中' })
  console.log('发送生成文档消息')
  let data = {
    InteractType: 'baseInter.EntiyInter.VirtualInteract.CreateDoc'
  }
  // console.log(data)
  websocketStore.sendMessage(data)
  // const dataBase64 = await screenShot(document.getElementById('gentChartId'))
  // console.log('输出图片', dataBase64)
}
const toSimulateSend = () => {
  const list = entityStore.entitiesArr.map((_) => _.id)
  console.log('simulateSend-query-deviceList', list)
  sessionStorage.setItem('simulateSend-deviceList', JSON.stringify(list))
  const url = router.resolve({
    path: '/simulateSend'
  })
  window.open(url.href)
}
const openDeviceMonitorView = () => {
  popupStore.openPop({
    title: '设备监控',
    type: 'deviceMonitor'
  })
}
onMounted(() => {
  websocketStore.addEventListener(WS_EVENT.genDocSuccess, () => {
    console.log('文档生成成功！！！')
    if (loadingInstance) {
      nextTick(() => {
        // Loading should be closed asynchronously
        loadingInstance.close()
      })
    }
  })
})
</script>

<style scoped>
.cb-container {
  position: fixed;
  top: 10vh;
  right: 7vw;
}
.cb-content {
  height: 40px;
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #35ecfe6e;
  border-radius: 5px;
  padding: 0 5px;
  color: white;
}
.el-button {
  margin-left: 0px;
}

:deep(.el-select__placeholder) {
  color: white;
}
</style>
