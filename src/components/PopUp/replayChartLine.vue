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
          >取消
        </el-button>
        <!-- <el-button type="primary" size="small">生成</el-button> -->
        <el-button v-if="isGenFlag" type="primary" size="small">导入</el-button>
        <el-button
          v-if="isGenFlag"
          type="primary"
          size="small"
          :disabled="!isDirtyFlag"
          >保存</el-button
        >
        <el-button v-if="isGenFlag" type="primary" size="small">下发</el-button>
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import draggable from 'vuedraggable'
import { usePopupStore } from '@/stores/popupStore'
import { useMissionStore } from '@/stores/missionStore'
import type { TabsPaneContext } from 'element-plus'
import { arraysAreEqual } from '@/common/helper'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const missionStore = useMissionStore()
const activeTab = ref('static')

const isDirtyFlag = ref(false)
const isGenFlag = ref(false)
const isGening = ref(false) //是否正在生成
const staticList = ref([])
const dynamicList = ref([])

const drag = ref(false)
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}
const handleGen = () => {
  isGening.value = true
  setTimeout(
    () => {
      isGening.value = false
      isGenFlag.value = true
    },
    2000 + 1000 * Math.random()
  )
}
const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
const { staticMission, dynamicMission } = storeToRefs(missionStore)

watch(
  () => staticList.value,
  (newVal) => {
    if (!arraysAreEqual(staticMission.value, newVal)) {
      isDirtyFlag.value = true
    } else {
      isDirtyFlag.value = false
    }
  },
  {
    // immediate: true,
    deep: true
  }
)

const closePopup = () => {
  popupStore._showLine = false
}
onMounted(() => {
  isGenFlag.value = missionStore.isGenFlag
  isDirtyFlag.value = missionStore.isDirtyFlag
  staticList.value = JSON.parse(JSON.stringify(staticMission.value))
  dynamicList.value = JSON.parse(JSON.stringify(dynamicMission.value))
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
::v-deep(.el-tabs__item) {
  --el-text-color-primary: #245b94;
}
::v-deep(.el-tabs__nav-wrap::after) {
  --el-border-color-light: #133757;
}
::v-deep(.el-input-number.is-controls-right .el-input-number__increase) {
  border-color: #64a7b9;
  bottom: 0px;
}
::v-deep(.el-input-number.is-controls-right .el-input-number__decrease) {
  border-color: #64a7b9;
  bottom: 0px;
}
::v-deep(.el-tabs .el-tabs__content .el-tab-pane) {
  height: 100%;
}
::v-deep(.el-input-number__decrease) {
  color: white;
}
::v-deep(.el-input-number__increase) {
  color: white;
}
::v-deep(.el-input-number__decrease.is-disabled) {
  color: #3d4b6c;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  /* height: 100%; */
  /* background-color: #215570; */
  display: flex;
  flex-direction: column;
}

.list-group-item {
  cursor: move;
  height: 40px;
  display: flex;
}
.item-left {
  flex: 1;
  color: #b9b5b5;
  margin-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.item-center {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-right {
  flex: 7;
  color: white;
  /* border: 2px solid beige; */
  /* border-radius: 4px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  margin: 5px 12px;
  padding: 10px;
}

.list-group-item i {
  cursor: pointer;
}
</style>
