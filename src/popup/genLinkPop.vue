<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'400px'"
    :width="'450px'"
    :is-draggable="true"
  >
    <template #footer>
      <div class="foot-btns">
        <el-button type="primary" size="small" @click="closePopup"
          >取消</el-button
        >
        <el-button type="primary" size="small">保存</el-button>
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
const popupStore = usePopupStore()
const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)

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
