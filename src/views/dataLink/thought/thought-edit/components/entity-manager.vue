<template>
  <div class="em-container">
    <BaseDocker
      :title="'实体管理'"
      :height="'250px'"
      :width="'232px'"
      :show-footer="true"
      icon="edit"
    >
      <!-- <template #header>
        <el-checkbox
          v-model="showPath"
          label="轨迹显隐"
          @change="reverseTrackShow"
        />
      </template> -->
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
          <el-button
            type="primary"
            size="small"
            color="#119aa0"
            @click="openLinkGenPop"
            >批量挂载
          </el-button>
          <el-button
            type="primary"
            size="small"
            color="#119aa0"
            @click="sendValidateLink"
            >链路校验
          </el-button>
          <el-button
            type="primary"
            size="small"
            color="#119aa0"
            @click="openWarPlanPop"
            >作战计划
          </el-button>
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
import { useWebSocketStore } from '@/stores/webSocketStore'
import { useLinkStore } from '@/stores/linkStore'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { EntityType } from '@/common/enum'
import { useCesiumStore } from '@/stores/cesiumStore'
// const showPath = ref(true)
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
const websocketStore = useWebSocketStore()
const linkStore = useLinkStore()
const { entitiesArr } = storeToRefs(entityStore)
const setTreeData = (data: any) => {
  treeRef.value?.setData(data)
}

// const reverseTrackShow = (e: boolean) => {
//   cesiumStore.cesium.trackMap.setAllVisible(e)
// }
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
          const entity = entityStore.getEntityById(data.id)
          popupStore.openPop({
            title: '编辑实体',
            type: 'createEntity',
            data: {
              position: entity.position,
              type: entity.type,
              name: entity.id,
              path: entity.path,
              equipment: entity.equipment
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
          const id = data.id
          entityStore.removeEntityById(id)
          cesiumStore.cesium.modelMap.removeModel({ id })
          cesiumStore.cesium.boardMap.removeLabelById(id)
          cesiumStore.cesium.trackMap.removeTrack({ id })
          cesiumStore.cesium.scanMap.removeScanById(id)
        }
      }
    ]
  })
}
const openLinkGenPop = () => {
  popupStore.openPop({
    title: '批量挂载数据链设备',
    type: 'genLink'
  })
}
const sendValidateLink = () => {
  const convertTargets = entitiesArr.value.map((_) => {
    const equipts = _.equipment
      .filter((E) => E.isHas && E.isUse)
      .map((EE) => EE.name)
    return {
      ID: _.id,
      type: _.getType(),
      lon: _.position[0],
      lat: _.position[1],
      alt: _.position[2],
      Equipment: equipts
    }
  })
  const convertLink = []
  const linkObj = linkStore.linkConnectInfo
  Object.keys(linkObj).forEach((k) => {
    const linkItem = linkObj[k]
    convertLink.push({
      centerTargetId: linkItem.mainDevice,
      dataLinkType: k,
      links: linkItem.linkTo
    })
  })
  const convertLinklink = {}
  linkStore.linklink.forEach((_) => {
    const key0 = Object.keys(_)[0]
    convertLinklink[key0] = _[key0]
  })
  const data = {
    InteractType: 'baseInter.EntiyInter.VirtualInteract.DataLinkCheck',
    Param: {
      targets: convertTargets,
      link: convertLink,
      linklink: convertLinklink
    }
  }
  // console.log('发送校验数据链', data)
  websocketStore.sendMessage(data)
}
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
  justify-content: space-between;
  .el-button {
    margin-left: 0;
  }
}
</style>
