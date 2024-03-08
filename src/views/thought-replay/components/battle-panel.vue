<template>
  <div class="bp-container">
    <BaseDocker
      :title="'作战日志'"
      :height="'230px'"
      :width="'400px'"
      icon="log"
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
        <!-- <div class="bp-content"> -->
        <div class="content-tree">
          <el-input
            v-model="queryStr"
            placeholder="输入关键字搜索"
            size="small"
            style="
              --el-input-bg-color: #0c1a39;
              --el-input-border-color: #0e9aa0;
              --el-input-hover-border-color: #16b0b8;
            "
            @input="onQueryChanged"
          />
          <el-tree-v2
            ref="treeRef"
            :data="data"
            :props="props"
            style="
              background-color: #113751;
              --el-tree-node-hover-bg-color: #0e9aa0;
              color: white;
              margin-top: 5px;
              outline: 1px solid #0e9aa0;
              border-radius: 4px;
              height: 100%;
              overflow: hidden;
              --el-font-size-base: 12px;
            "
            :filter-method="filterMethod"
            :height="150"
            empty-text="暂无数据"
          >
            <template #default="{ node }">
              <span style="transform: translateX(-18px)">{{
                node.data.timeStr
              }}</span>
              <span>{{ `T0+${node.data.timeT}` }}</span>
              <span style="margin-left: 5px">{{ node.data.label }}</span>
            </template>
          </el-tree-v2>
        </div>
        <!-- </div> -->
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { ElTreeV2 } from 'element-plus'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'
import { useLogStore } from '@/stores/logStore'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const logStore = useLogStore()
const { warMissionLog } = storeToRefs(logStore)
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
const openReplayChart = () => {
  popupStore.openPop({
    title: '实时监测',
    type: 'replayChart'
  })
}
const queryStr = ref('')
const onQueryChanged = (query: string) => {
  treeRef.value!.filter(query)
}
const setTreeData = (data: any) => {
  treeRef.value?.setData(data)
}
const data = []
const props = {
  value: 'id',
  label: 'id',
  timeT: 'timeT',
  timeStr: 'timeStr',
  children: 'children'
}
const filterMethod = (query: string, node: TreeNode) => {
  return node.label!.includes(query)
}
watch(
  warMissionLog,
  (newVal) => {
    console.log('newVVVVVVV', newVal)
    setTreeData(
      newVal.map((_): any => {
        return {
          id: (_ as any).message,
          label: (_ as any).message,
          timeT: (_ as any).timeT,
          timeStr: (_ as any).timeStr
        }
      })
    )
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style scoped>
.bp-container {
  position: fixed;
  top: 10vh;
  left: 20px;
}
:deep(.el-checkbox__input .el-checkbox__inner) {
  background-color: transparent !important;
  border-color: #119aa0;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: rgb(47, 99, 244) !important;
}
.content-tree {
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 2px;
  padding-left: 2px;
  box-sizing: border-box;
  height: 100%;
}
</style>
