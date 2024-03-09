<template>
  <div v-if="_showLine" class="tc-contianer">
    <replayChartLine :title="'数据日志折线图'"></replayChartLine>
  </div>
</template>
<script setup lang="ts">
import replayChartLine from '@/components/PopUp/replayChartLine.vue'
import { usePopupStore } from '@/stores/popupStore'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const { _showLine } = storeToRefs(popupStore)
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
</style>
