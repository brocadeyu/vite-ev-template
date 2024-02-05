<template>
  <div class="em-container">
    <BaseDocker :title="'想定管理'" :height="'250px'" :width="'200px'">
      <template #header>
        <el-checkbox v-model="showPath" label="轨迹显隐" />
      </template>
      <template #content>
        <el-input
          v-model="queryStr"
          placeholder="输入关键字搜索"
          @input="onQueryChanged"
        />
        <el-tree-v2
          ref="treeRef"
          :data="data"
          :props="props"
          :filter-method="filterMethod"
          :height="150"
        />
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { ref } from 'vue'
import { ElTreeV2 } from 'element-plus'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'
import { useEntityStore } from '@/stores/entityStore'
import { watch } from 'vue'
const showPath = ref(true)
const queryStr = ref('')
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
const props = {
  value: 'id',
  label: 'id',
  children: 'children'
}
const data = []
const entityStore = useEntityStore()
const setTreeData = (data: any) => {
  treeRef.value?.setData(data)
}

const onQueryChanged = (query: string) => {
  treeRef.value!.filter(query)
}
const filterMethod = (query: string, node: TreeNode) => {
  return node.label!.includes(query)
}
watch(
  entityStore.entitiesArr,
  (newVal) => {
    setTreeData(
      newVal.map((_): any => {
        return {
          id: (_ as any).id,
          label: (_ as any).id
        }
      })
    )
  },
  {
    immediate: true
  }
)
defineExpose({
  setTreeData
})
</script>

<style scoped>
.em-container {
  position: fixed;
  top: 45vh;
  left: 20px;
}
:deep(.el-checkbox__input .el-checkbox__inner) {
  background-color: transparent !important;
  border-color: #119aa0;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: rgb(47, 99, 244) !important;
}
</style>
