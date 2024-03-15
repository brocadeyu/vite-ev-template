<!-- eslint-disable camelcase -->
<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'410px'"
    :width="'600px'"
    :is-draggable="true"
  >
    <template #header>
      <el-button
        type="primary"
        color="#119aa0"
        size="small"
        @click="openConfirm"
      >
        <el-icon :size="16"><i-ep-Close /></el-icon>
      </el-button>
    </template>
    <template #content>
      <div class="mission-content">
        <el-tabs
          v-if="isGen"
          v-model="activeTab"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="静态" name="static">
            <el-scrollbar height="278px">
              <draggable
                :list="staticList"
                :animation="150"
                item-key="order"
                class="list-group"
                ghost-class="ghost"
              >
                <template #item="{ element }">
                  <div
                    class="list-group-item"
                    :class="{ 'import-item': element.isfight }"
                  >
                    <div class="item-left">T0+:</div>
                    <div class="item-center">
                      <el-input-number
                        v-model="element.time"
                        :min="0"
                        :max="9999"
                        size="small"
                        style="
                          --el-fill-color-blank: #0c1a39;
                          --el-border-color: #0e9aa0;
                          --el-border-color-hover: #16b0b8;
                          --el-fill-color-light: #119aa0;
                          --el-border-color: #0e9aa0;
                          --el-text-color-regular: #b9b5b5;
                        "
                        controls-position="right"
                      />
                    </div>
                    <div class="item-right">
                      <el-input
                        v-model="element.message"
                        size="small"
                        style="
                          --el-input-bg-color: #0c1a39;
                          --el-input-border-color: #0e9aa0;
                          --el-input-hover-border-color: #16b0b8;
                          --el-text-color-regular: #b9b5b5;
                        "
                        placeholder="Please input"
                      />
                    </div>
                    <div class="item-btn">
                      <el-button
                        type="danger"
                        size="small"
                        @click="deleteItem(element, 's')"
                      >
                        <el-icon :size="12"><i-ep-Delete /></el-icon
                      ></el-button>
                    </div>
                  </div>
                </template>
              </draggable>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="动态" name="dynamic">
            <el-scrollbar height="278px">
              <draggable
                :list="dynamicList"
                :animation="150"
                item-key="order"
                class="list-group"
                ghost-class="ghost"
              >
                <template #item="{ element }">
                  <div class="list-group-item">
                    <div class="item-left">T0+:</div>
                    <div class="item-center">
                      <el-input-number
                        v-model="element.time"
                        :min="0"
                        :max="9999"
                        size="small"
                        controls-position="right"
                        style="
                          --el-fill-color-blank: #0c1a39;
                          --el-border-color: #0e9aa0;
                          --el-border-color-hover: #16b0b8;
                          --el-fill-color-light: #119aa0;
                          --el-border-color: #0e9aa0;
                          --el-text-color-regular: #b9b5b5;
                        "
                      />
                    </div>
                    <div class="item-right">
                      <el-input
                        v-model="element.message"
                        size="small"
                        style="
                          --el-input-bg-color: #0c1a39;
                          --el-input-border-color: #0e9aa0;
                          --el-input-hover-border-color: #16b0b8;
                          --el-text-color-regular: #b9b5b5;
                        "
                        placeholder="Please input"
                      />
                    </div>
                    <div class="item-btn">
                      <el-button
                        type="danger"
                        size="small"
                        @click="deleteItem(element, 'd')"
                      >
                        <el-icon :size="12"><i-ep-Delete /></el-icon
                      ></el-button>
                    </div>
                  </div>
                </template>
              </draggable>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
        <el-empty
          v-if="!isGen && !isGening"
          description="点击生成以加载默认作战计划"
        >
          <el-button
            type="primary"
            size="small"
            color="#119aa0"
            @click="handleGen"
            >生成</el-button
          >
        </el-empty>
        <el-skeleton
          v-if="isGening"
          :rows="9"
          animated
          style="--el-skeleton-color: #5e6570; --el-skeleton-to-color: #235297"
        />
      </div>
    </template>
    <template #footer>
      <div class="foot-btns">
        <!-- <el-button
          type="primary"
          color="transparent"
          size="small"
          @click="closePopup"
          >取消
        </el-button> -->
        <!-- <el-button type="primary" size="small">生成</el-button> -->
        <el-button
          v-if="isGen"
          type="primary"
          color="#119aa0"
          size="small"
          @click="handleImport"
          >导入</el-button
        >
        <el-button
          v-if="isGen"
          type="primary"
          size="small"
          color="#119aa0"
          :disabled="false"
          @click="handleSave"
          >保存</el-button
        >
        <el-button
          v-if="isGen"
          type="primary"
          color="#119aa0"
          size="small"
          @click="handleDown"
          >下发</el-button
        >
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import { ElMessage, ElMessageBox } from 'element-plus'
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

const isDiff = ref(false)
const { isGenFlag, isDown } = storeToRefs(missionStore)
const isGen = ref(false)
const oldIsGen = ref(false)
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
      isGen.value = true
    },
    2000 + 1000 * Math.random()
  )
}
const handleImport = async () => {
  try {
    const opt = {
      types: [
        {
          description: 'json',
          accept: {
            'application/json': ['.json']
          }
        }
      ],
      excludeAcceptAllOption: true,
      multiple: false
    }
    const [fileHandle] = await window.showOpenFilePicker(opt)
    const fileData = await fileHandle.getFile()
    let reader = new FileReader()
    reader.readAsText(fileData, 'UTF-8')
    reader.onload = (e) => {
      // eslint-disable-next-line camelcase
      let file_string = e.target.result
      // eslint-disable-next-line camelcase
      const jsonData = JSON.parse(`${file_string}`)
      console.log('导入文件内容', jsonData)
      // this.DataLinkInfo.link[this.dataLinkUseCur].mission.push(...jsonData);

      jsonData.forEach((_) => {
        if (_.isAuto) {
          dynamicList.value.push({ ..._, isfight: true })
        } else {
          staticList.value.push({ ..._, isfight: true })
        }
      })
    }
  } catch (error) {
    // console.log('error', error)
  }
}
const deleteItem: (e: any, type: 's' | 'd') => void = (e, type) => {
  // console.log(e)
  let arr = type === 's' ? staticList.value : dynamicList.value
  let valueToRemove = e
  let index = arr.indexOf(valueToRemove)
  if (index !== -1) {
    arr.splice(index, 1)
  }
}
const openConfirm = () => {
  if (isGen.value === false || isDown.value) return closePopup()
  ElMessageBox.confirm('还未下发作战任务，确认退出吗？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    title: '警告'
  })
    .then(() => {
      closePopup()
    })
    .catch(() => {})
}
//保存
const handleSave = () => {
  isGenFlag.value = true
  isDown.value = false
  staticMission.value = JSON.parse(JSON.stringify(staticList.value))
  dynamicMission.value = JSON.parse(JSON.stringify(dynamicList.value))
  ElMessage({
    type: 'success',
    grouping: true,
    message: '保存成功'
  })
}
//下发
const handleDown = () => {
  handleSave()
  isDown.value = true
  ElMessage({
    type: 'success',
    grouping: true,
    message: '下发成功'
  })
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
    // console.log(
    //   toRaw(newVal),
    //   Array.from(staticMission.value.map((_) => toRaw(_)))
    // )
    if (
      !arraysAreEqual(
        Array.from(staticMission.value.map((_) => toRaw(_))),
        toRaw(newVal)
      )
    ) {
      // console.log('数组不相等')
      isDown.value = false
    } else {
      // console.log('数组相等')
      isDown.value = true
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const closePopup = () => {
  popupStore.closePop()
}
onMounted(() => {
  oldIsGen.value = missionStore.isGenFlag
  isGen.value = missionStore.isGenFlag
  //isDiff.value = missionStore.isDiff
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
  margin-top: 5px;
}
.import-item {
  background-color: #227276;
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
  /* margin: 5px 12px; */
  padding: 10px;
}
.item-btn {
  width: 50px;
  color: white;
  /* border: 2px solid beige; */
  /* border-radius: 4px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  /* margin: 5px 12px; */
  /* padding: 10px; */
}

.list-group-item i {
  cursor: pointer;
}
</style>
