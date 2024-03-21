<template>
  <div
    v-if="isInSide && _isShowToolTip"
    class="tool-tip"
    :style="{ left: left, top: top }"
  >
    {{ _text }}
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@/utils/hooks'
import { useToolTipStore } from '@/stores/tooltipStore'
import { storeToRefs } from 'pinia'
const tooltipStore = useToolTipStore()
const { _text, _isShowToolTip } = storeToRefs(tooltipStore)
const { x, y, isInSide } = useMouse()
const left = computed(() => {
  return `${x.value + 12}px`
})
const top = computed(() => {
  return `${y.value + 12}px`
})
</script>

<style scoped>
.tool-tip {
  height: 40px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b1a39;
  border: 2px solid #119aa0;
  font-size: 16px;
  color: white;
  border-radius: 5px;
  position: fixed;
  z-index: 10;
}
</style>
