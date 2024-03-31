<template>
  <div
    class="tc-contianer"
    :class="{ 'position-hide ': !_showLine || isShootCuting }"
  >
    <replayChartLine ref="chartRef" :title="'数据日志折线图'"></replayChartLine>
  </div>
</template>
<script setup lang="ts">
import replayChartLine from '@/components/PopUp/replayChartLine.vue'
import { usePopupStore } from '@/stores/popupStore'
import { storeToRefs } from 'pinia'
const chartRef = ref(null)
const popupStore = usePopupStore()
const { _showLine } = storeToRefs(popupStore)
const isShootCuting = ref(false)
const getBatch = async () => {
  isShootCuting.value = true
  const res = await chartRef.value.getBatchShootCut()
  isShootCuting.value = false
  return res
}
defineExpose({
  getBatch
})
</script>

<style scoped>
.tc-contianer {
  /* background-color: red; */
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  left: 50%;
  top: 50%;
}
.position-hide {
  transform: translateY(100vh);
}
</style>
