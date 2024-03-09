<template>
  <div v-if="_showGant" class="gt-contianer">
    <replayChartPop :title="'链路占用甘特图'"></replayChartPop>
  </div>
</template>
<script setup lang="ts">
import replayChartPop from '@/components/PopUp/replayChartGant.vue'
import { usePopupStore } from '@/stores/popupStore'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const { _showGant } = storeToRefs(popupStore)
</script>

<style scoped>
.gt-contianer {
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
