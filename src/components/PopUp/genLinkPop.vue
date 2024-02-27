<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'435px'"
    :width="'450px'"
    :is-draggable="true"
  >
    <template #content>
      <div class="gen-content">
        <el-tabs type="border-card">
          <el-tab-pane label="综合链">
            <el-form :model="formDataZHL">
              <el-form-item label="通信方式">
                <el-input placeholder="点名呼叫轮询" :disabled="true" />
              </el-form-item>
              <el-form-item label="中心设备">
                <el-select
                  v-model="formDataZHL.mainDevice"
                  placeholder="请选择主设备"
                  no-data-text="请勾选设备列表"
                >
                  <el-option
                    v-for="(item, index) in formDataZHL.targets"
                    :key="index"
                    :label="item.id"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="设备列表">
                <el-table
                  ref="multipleTableRef"
                  :data="devicesList"
                  height="185"
                  :header-cell-style="{
                    fontSize: '12px',
                    height: '20px',
                    padding: '2px 0px',
                    color: 'white',
                    backgroundColor: '#2b4859',
                    borderBottom: '0.5px #143275 solid'
                  }"
                  :cell-style="{
                    color: '#fff',
                    height: '20px',
                    padding: '2px 0px',
                    fontSize: '12px',
                    borderBottom: '0.5px #143275 solid'
                  }"
                  :row-style="{
                    fontSize: '20px',
                    height: '20px',
                    backgroundColor: '#0b1a38',
                    color: 'white'
                  }"
                  empty-text="暂无数据"
                  @selection-change="selectionChangeZHL"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column
                    :align="'center'"
                    property="id"
                    label="装备"
                  />
                </el-table>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="90X链">
            <el-form :model="formData90X">
              <el-form-item label="通信方式">
                <el-input placeholder="静态时隙分配" :disabled="true" />
              </el-form-item>
              <el-form-item label="中心设备">
                <el-select
                  v-model="formData90X.mainDevice"
                  placeholder="请选择主设备"
                  no-data-text="请勾选设备列表"
                >
                  <el-option
                    v-for="(item, index) in formData90X.targets"
                    :key="index"
                    :label="item.id"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="设备列表">
                <el-table
                  ref="multipleTableRef"
                  :data="devicesList"
                  height="185"
                  :header-cell-style="{
                    fontSize: '12px',
                    height: '20px',
                    padding: '2px 0px',
                    color: 'white',
                    backgroundColor: '#2b4859',
                    borderBottom: '0.5px #143275 solid'
                  }"
                  :cell-style="{
                    color: '#fff',
                    height: '20px',
                    padding: '2px 0px',
                    fontSize: '12px',
                    borderBottom: '0.5px #143275 solid'
                  }"
                  :row-style="{
                    fontSize: '20px',
                    height: '20px',
                    backgroundColor: '#0b1a38',
                    color: 'white'
                  }"
                  empty-text="暂无数据"
                  @selection-change="selectionChange90X"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column
                    :align="'center'"
                    property="id"
                    label="装备"
                  />
                </el-table>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="JIDS链">
            <el-form :model="formDataJIDS">
              <el-form-item label="通信方式">
                <el-input placeholder="动态时隙分配" :disabled="true" />
              </el-form-item>
              <el-form-item label="中心设备">
                <el-select
                  v-model="formDataJIDS.mainDevice"
                  placeholder="请选择主设备"
                  no-data-text="请勾选设备列表"
                >
                  <el-option
                    v-for="(item, index) in formDataJIDS.targets"
                    :key="index"
                    :label="item.id"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="设备列表">
                <el-table
                  ref="multipleTableRef"
                  :data="devicesList"
                  height="185"
                  :header-cell-style="{
                    fontSize: '12px',
                    height: '20px',
                    padding: '2px 0px',
                    color: 'white',
                    backgroundColor: '#2b4859',
                    borderBottom: '0.5px #143275 solid'
                  }"
                  :cell-style="{
                    color: '#fff',
                    height: '20px',
                    padding: '2px 0px',
                    fontSize: '12px',
                    borderBottom: '0.5px #143275 solid'
                  }"
                  :row-style="{
                    fontSize: '20px',
                    height: '20px',
                    backgroundColor: '#0b1a38',
                    color: 'white'
                  }"
                  empty-text="暂无数据"
                  @selection-change="selectionChangeJIDS"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column
                    :align="'center'"
                    property="id"
                    label="装备"
                  />
                </el-table>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="卫通">
            <el-form :model="formDataKu">
              <el-form-item label="通信方式">
                <el-input placeholder="直连通信" :disabled="true" />
              </el-form-item>
              <el-form-item label="中心设备">
                <el-select
                  v-model="formDataKu.mainDevice"
                  placeholder="请选择主设备"
                  no-data-text="请勾选设备列表"
                >
                  <el-option
                    v-for="(item, index) in formDataKu.targets"
                    :key="index"
                    :label="item.id"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="设备列表">
                <el-table
                  ref="multipleTableRef"
                  :data="devicesList"
                  height="185"
                  :header-cell-style="{
                    fontSize: '12px',
                    height: '20px',
                    padding: '2px 0px',
                    color: 'white',
                    backgroundColor: '#2b4859',
                    borderBottom: '0.5px #143275 solid'
                  }"
                  :cell-style="{
                    color: '#fff',
                    height: '20px',
                    padding: '2px 0px',
                    fontSize: '12px',
                    borderBottom: '0.5px #143275 solid'
                  }"
                  :row-style="{
                    fontSize: '20px',
                    height: '20px',
                    backgroundColor: '#0b1a38',
                    color: 'white'
                  }"
                  empty-text="暂无数据"
                  @selection-change="selectionChangeKu"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column
                    :align="'center'"
                    property="id"
                    label="装备"
                  />
                </el-table>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button type="primary" size="small" @click="closePopup"
          >取消</el-button
        >
        <el-button type="primary" size="small">保存</el-button>
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { useEntityStore } from '@/stores/entityStore'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const entityStore = useEntityStore()
const { entitiesArr } = storeToRefs(entityStore)
const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
// const devicesList = ref([])
const devicesList = computed(() => {
  return entitiesArr.value.map((_) => {
    return { id: _.id }
  })
})

const selectionChangeZHL = (e: string[]) => {
  formDataZHL.targets = e
  if (e.indexOf(formDataZHL.mainDevice) === -1) {
    formDataZHL.mainDevice = ''
  }
}
const selectionChange90X = (e: string[]) => {
  formData90X.targets = e
  if (e.indexOf(formData90X.mainDevice) === -1) {
    formData90X.mainDevice = ''
  }
}
const selectionChangeJIDS = (e: string[]) => {
  formDataJIDS.targets = e
  if (e.indexOf(formDataJIDS.mainDevice) === -1) {
    formDataJIDS.mainDevice = ''
  }
}
const selectionChangeKu = (e: string[]) => {
  formDataKu.targets = e
  if (e.indexOf(formDataKu.mainDevice) === -1) {
    formDataKu.mainDevice = ''
  }
}

const formDataZHL = reactive({
  mainDevice: '',
  targets: []
})
const formData90X = reactive({
  mainDevice: '',
  targets: []
})
const formDataJIDS = reactive({
  mainDevice: '',
  targets: []
})
const formDataKu = reactive({
  mainDevice: '',
  targets: []
})
const handleSelectionChange = (e) => {
  console.log('eee', e)
}

const closePopup = () => {
  popupStore.closePop()
}
onMounted(() => {})
</script>

<style scoped>
.gen-content {
  height: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  box-sizing: border-box;
}
.tab-card {
  height: 100%;
}
::v-deep(.el-tabs) {
  height: 100%;
  --el-bg-color-overlay: #215570;
  --el-color-primary: white;
  --el-fill-color-light: #0b1a39;
  --el-border-color: #0b1a39;
}
::v-deep(.el-tabs .el-tabs__content) {
  height: calc(100% - 70px);
}
::v-deep(.el-tabs--border-card .el-tabs__header) {
  border-color: transparent;
}
::v-deep(.el-form) {
  --el-text-color-regular: white;
}
::v-deep(.el-input) {
  --el-disabled-bg-color: transparent;
  --el-disabled-text-color: white;
}
::v-deep(.el-select) {
  --el-fill-color-blank: transparent;
  --el-border-color: white;
  --el-text-color-placeholder: white;
}
::v-deep(.el-table) {
  width: 100%;
  color: black;
  --el-table-border-color: none;
  --el-table-bg-color: var(--el-fill-color-light);
}
::v-deep(.el-table .el-checkbox) {
  --el-checkbox-checked-bg-color: transparent;
  --el-checkbox-bg-color: transparent;
}

.tx-fs {
  height: 20px;
  padding-bottom: 10px;
}
.foot-btns {
  display: flex;
  justify-content: flex-end;
}
.row-style {
  height: 35px;
}
.col-style {
  display: flex;
  align-items: center;
}
</style>
