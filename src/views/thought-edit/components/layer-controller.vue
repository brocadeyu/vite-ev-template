<template>
  <div class="lc-container">
    <BaseDocker :title="'图层控制'" :height="'220px'" :width="'200px'">
      <template #content>
        <div class="card-container">
          <el-tree
            :data="data"
            :props="defaultProps"
            style="width: 100%; height: 100%"
            accordion
            show-checkbox
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
interface Tree {
  label: string
  children?: Tree[]
}
const handleNodeClick = (data: Tree) => {
  console.log(data)
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
