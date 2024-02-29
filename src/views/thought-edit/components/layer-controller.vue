<template>
  <div class="lc-container">
    <BaseDocker :title="'图层控制'" :height="'220px'" :width="'200px'">
      <template #content>
        <div class="card-container">
          <el-tree
            :data="data"
            :props="defaultProps"
            style="width: 100%; height: 100%; user-select: none"
            accordion
            show-checkbox
            :default-checked-keys="['模型', '轨迹', '数据链']"
            node-key="label"
            default-expand-all
            check-on-click-node
            @node-click="handleNodeClick"
            @check-change="handleCurrentChange"
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
const cesiumStore = useCesiumStore()
const handleCurrentChange = (node: any, isChecked: boolean) => {
  const nodeLabel = node.label
  switch (nodeLabel) {
    case '模型':
      break
    case '轨迹':
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
const handleNodeClick = (data: Tree) => {
  const nodeLabel = data.label
  switch (nodeLabel) {
    case '模型':
      break
    case '轨迹':
      break
    case '数据链':
      break
    case '综合链':
      break
    case '90X链':
      break
    case 'JIDS链':
      break
    case 'KU卫通':
      break
  }
}

const data: Tree[] = [
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
}
</style>
