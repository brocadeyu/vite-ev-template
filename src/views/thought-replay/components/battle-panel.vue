<template>
  <div class="bp-container">
    <BaseDocker
      :title="'作战日志'"
      :height="'230px'"
      :width="'200px'"
      icon="view"
    >
      <template #header>
        <el-button
          type="primary"
          color="#119aa0"
          size="small"
          @click="openReplayChart"
        >
          <el-icon :size="16"><i-ep-PieChart /></el-icon>
        </el-button>
      </template>
      <template #content>
        <div class="bp-content"></div>
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
const popupStore = usePopupStore()
const openReplayChart = () => {
  popupStore.openPop({
    title: '实时监测',
    type: 'replayChart'
  })
}
</script>

<style scoped>
.bp-container {
  position: fixed;
  top: 10vh;
  left: 20px;
}
.bp-content {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 2px;
  padding-right: 2px;
  padding-left: 2px;
  box-sizing: border-box;
}
</style>
