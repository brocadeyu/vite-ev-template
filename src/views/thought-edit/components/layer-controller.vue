<template>
  <div class="lc-container">
    <BaseDocker :title="'图层控制'" :height="'230px'" :width="'200px'">
      <template #content>
        <div class="card-container">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            style="
              width: 100%;
              height: 100%;
              user-select: none;
              background-color: #113751;
              --el-tree-node-hover-bg-color: #0e9aa0;
              border-radius: 4px;
              outline: 1px solid #0e9aa0;
              color: white;
            "
            accordion
            show-checkbox
            :default-checked-keys="['模型', '轨迹', '数据链']"
            node-key="label"
            default-expand-all
            :expand-on-click-node="false"
            check-on-click-node
            @check-change="handleNodeCheckChange"
          />
        </div>
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { useCesiumStore } from '@/stores/cesiumStore'
interface Tree {
  label: keyof typeof NodeLabel
  children?: Tree[]
}
enum NodeLabel {
  '模型',
  '轨迹',
  '数据链',
  '综合链',
  '90X链',
  'JIDS链',
  'KU卫通'
}
const treeData: Tree[] = [
  {
    label: '模型'
  },
  {
    label: '轨迹'
  },
  {
    label: '数据链',
    children: [
      {
        label: '综合链'
      },
      {
        label: '90X链'
      },
      {
        label: 'JIDS链'
      },
      {
        label: 'KU卫通'
      }
    ]
  }
]
const defaultProps = {
  children: 'children',
  label: 'label'
}
const cesiumStore = useCesiumStore()

const handleNodeCheckChange = (node: any, isChecked: boolean) => {
  const nodeLabel = node.label
  switch (nodeLabel) {
    case '模型':
      cesiumStore.cesium.modelMap.setAllVisible(isChecked)
      break
    case '轨迹':
      cesiumStore.cesium.trackMap.setAllVisible(isChecked)
      break
    // case '数据链':
    //   break
    case '综合链':
      cesiumStore.cesium.linkMap.setVisibleByType({
        type: '综合链',
        flag: isChecked
      })
      break
    case '90X链':
      cesiumStore.cesium.linkMap.setVisibleByType({
        type: '90X链',
        flag: isChecked
      })
      break
    case 'JIDS链':
      cesiumStore.cesium.linkMap.setVisibleByType({
        type: 'JIDS链',
        flag: isChecked
      })
      break
    case 'KU卫通':
      break
  }
}
</script>

<style scoped>
.lc-container {
  position: fixed;
  top: 45vh;
  right: 220px;
}
.card-container {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 2px;
  padding-right: 2px;
  padding-left: 2px;
  box-sizing: border-box;
}

:deep(.el-tree-node:focus .el-tree-node__content) {
  background-color: transparent;
}
:deep(.el-tree .el-tree-node__content:hover) {
  background-color: #0e9aa0 !important;
}
:deep(.el-checkbox__input .el-checkbox__inner) {
  background-color: #113751 !important;
  border-color: #0e6c71;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #113751 !important;
}
</style>
