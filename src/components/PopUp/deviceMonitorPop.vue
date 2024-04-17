<!-- eslint-disable camelcase -->
<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'410px'"
    :width="'600px'"
    :is-draggable="true"
  >
    <template #header>
      <el-button type="primary" color="#119aa0" size="small" @click="closePop">
        <el-icon :size="16"><i-ep-Close /></el-icon>
      </el-button>
    </template>
    <template #content>
      <div class="mission-content"></div>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button type="primary" color="#119aa0" size="small" @click="() => {}"
          >导入</el-button
        >
        <el-button
          type="primary"
          size="small"
          color="#119aa0"
          :disabled="false"
          @click="() => {}"
          >保存</el-button
        >
        <el-button type="primary" color="#119aa0" size="small" @click="() => {}"
          >下发</el-button
        >
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
const closePop = () => {
  popupStore.closePop()
}
</script>

<style scoped>
.foot-btns {
  display: flex;
  justify-content: flex-end;
  margin-right: 2px;
}
.mission-content {
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}
</style>
