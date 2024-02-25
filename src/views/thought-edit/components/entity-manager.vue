<template>
  <div class="em-container">
    <BaseDocker
      :title="'想定管理'"
      :height="'250px'"
      :width="'200px'"
      :show-footer="true"
    >
      <template #header>
        <el-checkbox
          v-model="showPath"
          label="轨迹显隐"
          @change="reverseTrackShow"
        />
      </template>
      <template #content>
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
            "
            :filter-method="filterMethod"
            :height="150"
            empty-text="暂无数据"
            @node-contextmenu="openContextMenu"
          />
        </div>
      </template>
      <template #footer>
        <div class="foot-btns">
          <el-button type="primary" size="small" @click="openLinkGenPop"
            >链生成</el-button
          >
          <el-button type="primary" size="small" @click="openLinkCheckPop"
            >链校验</el-button
          >
          <el-button type="primary" size="small" @click="openWarPlanPop"
            >计划</el-button
          >
        </div>
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import { ref } from 'vue'
import { ElTreeV2 } from 'element-plus'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'
import { useEntityStore } from '@/stores/entityStore'
import { usePopupStore } from '@/stores/popupStore'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { EntityType } from '@/enums/entity'
import { useCesiumStore } from '@/stores/cesiumStore'
const showPath = ref(true)
const queryStr = ref('')
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
const props = {
  value: 'id',
  label: 'id',
  children: 'children'
}
interface ITreeNodeData {
  id: EntityType
  label: string
}
const data = []
const entityStore = useEntityStore()
const popupStore = usePopupStore()
const cesiumStore = useCesiumStore()
const setTreeData = (data: any) => {
  treeRef.value?.setData(data)
}

const reverseTrackShow = (e: boolean) => {
  cesiumStore.cesium.trackMap.setAllVisible(e)
}
const openContextMenu = (e, data: ITreeNodeData) => {
  e.preventDefault()
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: '编辑',
        svgIcon: '#icon-bianji',
        svgProps: {
          color: '#f60'
        },
        onClick: () => {
          console.log(data)
          const entity = entityStore.getEntityById(data.id)
          console.log('entity', entity)
          popupStore.openPop({
            title: '编辑实体',
            type: 'createEntity',
            data: {
              position: entity.position,
              type: entity.type,
              name: entity.id
            }
          })
        }
      },
      {
        label: '删除',
        svgIcon: '#icon-ziyuanxhdpi',
        svgProps: {
          color: '#f60'
        },
        onClick: () => {
          console.log(data)
          const id = data.id
          entityStore.removeEntityById(id)
        }
      }
    ]
  })
}
const openLinkGenPop = () => {
  popupStore.openPop({
    title: '数据链生成',
    type: 'genLink'
  })
}
const openLinkCheckPop = () => {}
const openWarPlanPop = () => {
  popupStore.openPop({
    title: '作战计划',
    type: 'warPlan'
  })
}
const onQueryChanged = (query: string) => {
  treeRef.value!.filter(query)
}
const filterMethod = (query: string, node: TreeNode) => {
  return node.label!.includes(query)
}
const { entitiesArr } = storeToRefs(entityStore)
watch(
  entitiesArr,
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
.foot-btns {
  display: flex;
}
</style>
