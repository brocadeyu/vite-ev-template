<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'410px'"
    :width="'600px'"
    :is-draggable="true"
  >
    <template #content>
      <div class="mission-content"></div>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button
          type="primary"
          color="transparent"
          size="small"
          @click="closePopup"
          >关闭
        </el-button>
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

const closePopup = () => {
  popupStore._showLine = false
}
onMounted(() => {
  // console.log('静态', staticList.value)
  // console.log('动态', dynamicList.value)
})
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
