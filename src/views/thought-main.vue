<template>
  <BaseHeader :title="computeTitle">
    <div class="header-btn">
      <el-button
        v-if="!['数据链模拟', '想定回放'].includes(computeTitle)"
        type="primary"
        size="small"
        @click="saveThought"
        >保存</el-button
      >
      <el-button
        v-if="computeTitle !== '数据链模拟'"
        type="primary"
        size="small"
        @click="back"
        >返回</el-button
      >
    </div>
  </BaseHeader>
  <ToolTip></ToolTip>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePopupStore } from '@/stores/popupStore'
const route = useRoute()
const router = useRouter()
const popupStore = usePopupStore()
const computeTitle = computed(() => {
  return route.name as string
})
const back = () => {
  router.back()
}
const saveThought = () => {
  popupStore.openPop({
    title: '保存想定',
    type: 'saveThought',
    showMask: true
  })
}
</script>

<style scoped>
.header-btn {
  width: 100%;
  /* background-color: red; */
  display: flex;
  justify-content: flex-end;
  padding: 0 30px;
  transform: translateY(-3px);
  align-items: center;
}
</style>
