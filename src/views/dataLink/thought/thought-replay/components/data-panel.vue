<template>
  <div class="dp-container">
    <BaseDocker
      :title="'数据日志'"
      :height="'230px'"
      :width="'650px'"
      icon="log"
    >
      <template #header>
        <div>
          <el-button
            type="primary"
            color="#119aa0"
            size="small"
            @click="goFullScreen"
          >
            <el-icon :size="16"><i-epFullScreen /></el-icon>
          </el-button>
          <el-button
            type="primary"
            color="#119aa0"
            size="small"
            @click="openDataChart"
          >
            <el-icon :size="16"><i-ep-DataAnalysis /></el-icon>
          </el-button>
        </div>
      </template>
      <template #content>
        <div ref="dpRef" class="dp-content">
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
                /* background-color: #113751; */
                background-color: black;
                /* --el-tree-node-hover-bg-color: #0e9aa0; */
                --el-tree-node-hover-bg-color: #393939;
                color: white;
                margin-top: 5px;
                outline: 1px solid #0e9aa0;
                border-radius: 4px;
                height: 100%;
                overflow: hidden;
                --el-font-size-base: 12px;
                --el-text-color-secondary: #119aa0;
                --el-scrollbar-opacity: 0.8;
              "
              :filter-method="filterMethod"
              :height="isFullscreen ? 1000 : 150"
              empty-text="暂无数据"
            >
              <template #default="{ node }">
                <span style="transform: translateX(-18px); color: #15b1b7"
                  >>{{ node.data.timeStr }}</span
                >
                <span style="color: #dbdb32"
                  >{{
                    node.data.label.includes('#')
                      ? node.data.label
                          .split('#')[0]
                          .replace(/JIDS链/g, 'JIXX链')
                      : node.data.label
                          .split(':')[0]
                          .replace(/JIDS链/g, 'JIXX链')
                  }}:</span
                >
                <span
                  v-if="!node.data.label.includes('$')"
                  style="margin-left: 5px; color: #13d713"
                  >{{ node.data.link.replace(/JIDS链/g, 'JIXX链') }},{{
                    node.data.label.includes('#')
                      ? node.data.label.split('#')[1]
                      : node.data.label.split(':').length === 2
                        ? node.data.label.split(':')[1]
                        : `${node.data.label.split(':')[1]}${node.data.label.split(':')[2]}`
                  }}</span
                >
                <span v-else style="margin-left: 5px; color: #13d713"
                  >{{ node.data.link.replace(/JIDS链/g, 'JIXX链') }},{{
                    node.data.label.split('#')[1].split('$')[0]
                  }}
                  <span
                    style="color: red"
                    @click="
                      clickDownloadFile(
                        node.data.label.split('#')[1].split('$')[1]
                      )
                    "
                    >{{
                      getFileName(node.data.label.split('#')[1].split('$')[1])
                    }}</span
                  >
                </span>
              </template>
            </el-tree-v2>
          </div>
        </div>
      </template>
    </BaseDocker>
  </div>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { ElTreeV2 } from 'element-plus'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'
import { useLogStore } from '@/stores/logStore'
import { usePopupStore } from '@/stores/popupStore'
import { storeToRefs } from 'pinia'
import { useFullscreen } from '@vueuse/core'
const dpRef = ref<HTMLElement | null>(null)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { isFullscreen, enter, exit, toggle } = useFullscreen(dpRef)
const queryStr = ref('')
const logStore = useLogStore()
const popupStore = usePopupStore()
const { dataLog } = storeToRefs(logStore)
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
const onQueryChanged = (query: string) => {
  treeRef.value!.filter(query)
}
const goFullScreen = () => {
  toggle()
}
const getFileName = (m) => {
  const file = window.fileMap.get(m)
  return file.name
}
const clickDownloadFile = (m) => {
  // console.log('下载mmmmmmmmmmm', m)
  const file = window.fileMap.get(m)
  if (!file) return
  const blob = new Blob([file], { type: file.type })
  // 创建一个链接元素
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = file.name

  // 将链接元素添加到文档中
  document.body.appendChild(a)

  // 模拟点击下载链接
  a.click()

  // 清理
  URL.revokeObjectURL(a.href)
  a.remove()
}
const data = []
const props = {
  value: 'id',
  label: 'id',
  timeStr: 'timeStr',
  children: 'children',
  link: 'link'
}
const filterMethod = (query: string, node: TreeNode) => {
  return node.label!.includes(query)
}
const setTreeData = (data: any) => {
  treeRef.value?.setData(data)
}
const openDataChart = () => {
  popupStore._showLine = true
}
watch(
  dataLog,
  (newVal) => {
    // console.log('newVVVVVVV', newVal)
    setTreeData(
      newVal.map((_): any => {
        return {
          id: _.message,
          label: _.message,
          timeStr: _.timeStr,
          link: _.link
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
.dp-container {
  position: fixed;
  top: 37vh;
  left: 20px;
}
:deep(.el-checkbox__input .el-checkbox__inner) {
  background-color: transparent !important;
  border-color: #119aa0;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: rgb(47, 99, 244) !important;
}
:deep(.el-virtual-scrollbar) {
  opacity: 1;
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
.dp-content {
  height: 100%;
}
</style>
