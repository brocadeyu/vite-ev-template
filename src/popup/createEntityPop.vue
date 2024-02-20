<template>
  <base-docker
    :title="title"
    :show-footer="true"
    :height="'250px'"
    :width="'200px'"
  >
    <template #footer>
      <div class="foot-btns">
        <el-button type="primary" size="small" @click="closePopup"
          >取消</el-button
        >
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </template>
  </base-docker>
</template>

<script setup lang="ts">
import BaseDocker from '../components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
const popupStore = usePopupStore()
const closePopup = () => {
  popupStore.closePop()
}
</script>

<style scoped>
.foot-btns {
  display: flex;
  justify-content: flex-end;
}
</style>
