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
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="综合链" name="综合链">
            <el-form ref="formRefZHL" :model="formDataZHL">
              <el-form-item
                label="通信方式"
                :rules="[
                  {
                    required: true
                  }
                ]"
              >
                <el-input placeholder="点名呼叫轮询" :disabled="true" />
              </el-form-item>
              <el-form-item
                label="设备列表"
                :rules="[
                  {
                    message: '设备列表不可为空',
                    trigger: 'change',
                    required: true
                  }
                ]"
                prop="targets"
              >
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
              <el-form-item
                label="中心设备"
                :rules="[
                  {
                    required: true,
                    message: '中心设备不可为空',
                    trigger: 'change'
                  }
                ]"
                prop="mainDevice"
              >
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
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="90X链" name="90X链">
            <el-form ref="formRef90X" :model="formData90X">
              <el-form-item
                label="通信方式"
                :rules="[
                  {
                    required: true
                  }
                ]"
              >
                <el-input placeholder="静态时隙分配" :disabled="true" />
              </el-form-item>
              <el-form-item
                label="设备列表"
                :rules="[
                  {
                    message: '设备列表不可为空',
                    trigger: 'change',
                    required: true
                  }
                ]"
                prop="targets"
              >
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
              <el-form-item
                label="中心设备"
                :rules="[
                  {
                    required: true,
                    message: '中心设备不可为空',
                    trigger: 'change'
                  }
                ]"
                prop="mainDevice"
              >
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
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="JIDS链" name="JIDS链">
            <el-form ref="formRefJIDS" :model="formDataJIDS">
              <el-form-item
                label="通信方式"
                :rules="[
                  {
                    required: true
                  }
                ]"
              >
                <el-input placeholder="动态时隙分配" :disabled="true" />
              </el-form-item>
              <el-form-item
                label="设备列表"
                :rules="[
                  {
                    message: '设备列表不可为空',
                    trigger: 'change',
                    required: true
                  }
                ]"
                prop="targets"
              >
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
              <el-form-item
                label="中心设备"
                :rules="[
                  {
                    required: true,
                    message: '中心设备不可为空',
                    trigger: 'change'
                  }
                ]"
                prop="mainDevice"
              >
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
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="KU卫通" name="KU卫通">
            <el-form ref="formRefKU" :model="formDataKu">
              <el-form-item
                label="通信方式"
                :rules="[
                  {
                    required: true
                  }
                ]"
              >
                <el-input placeholder="直连通信" :disabled="true" />
              </el-form-item>
              <el-form-item
                label="设备列表"
                :rules="[
                  {
                    message: '设备列表不可为空',
                    trigger: 'change',
                    required: true
                  }
                ]"
                prop="targets"
              >
                <el-table
                  ref="multipleTableRef"
                  :data="shipDeviceList"
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
              <el-form-item
                label="中心设备"
                :rules="[
                  {
                    required: true,
                    message: '中心设备不可为空',
                    trigger: 'change'
                  }
                ]"
                prop="mainDevice"
              >
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
        <el-button type="primary" size="small" @click="confirmPopup"
          >保存</el-button
        >
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { useEntityStore } from '@/stores/entityStore'
import { useWebSocketStore } from '@/stores/webSocketStore'
import { storeToRefs } from 'pinia'
import { EntityTypeEnum } from '@/common/enum'
import type { FormInstance } from 'element-plus'
const popupStore = usePopupStore()
const entityStore = useEntityStore()
const websocketStore = useWebSocketStore()
const { entitiesArr } = storeToRefs(entityStore)
const formRefZHL = ref<FormInstance>()
const formRef90X = ref<FormInstance>()
const formRefJIDS = ref<FormInstance>()
const formRefKU = ref<FormInstance>()
withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
const activeTab = ref('综合链')
//三种链的可选设备列表为所有设备
const devicesList = computed(() => {
  return entitiesArr.value.map((_) => {
    return { id: _.id }
  })
})
//卫通的可选设备列表为所有船
const shipDeviceList = computed(() => {
  return entitiesArr.value
    .filter((_) =>
      [
        EntityTypeEnum[EntityTypeEnum.中国052C型驱逐舰],
        EntityTypeEnum[EntityTypeEnum.中国052D型驱逐舰]
      ].includes(_.type)
    )
    .map((_) => {
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
  targets: [],
  validaTable: []
})
const formData90X = reactive({
  mainDevice: '',
  targets: [],
  validaTable: []
})
const formDataJIDS = reactive({
  mainDevice: '',
  targets: [],
  validaTable: []
})
const formDataKu = reactive({
  mainDevice: '',
  targets: [],
  validaTable: []
})

const closePopup = () => {
  popupStore.closePop()
}
const confirmPopup = async () => {
  try {
    await formRefZHL.value.validate((valid) => {
      if (!valid) {
        console.log('validFail')
        activeTab.value = '综合链'
        throw 'error'
      }
    })
    await formRef90X.value.validate((valid) => {
      if (!valid) {
        console.log('validFail')
        activeTab.value = '90X链'
        throw 'error'
      }
    })
    await formRefJIDS.value.validate((valid) => {
      if (!valid) {
        console.log('validFail')
        activeTab.value = 'JIDS链'
        throw 'error'
      }
    })
    await formRefKU.value.validate((valid) => {
      if (!valid) {
        console.log('validFail')
        activeTab.value = 'KU卫通'
        throw 'error'
      }
    })
    const param1 = {
      dataLinkType: '综合链',
      // usingKU: this.DataLinkInfo.link[0].usingKU,
      centerTargetId: formDataZHL.mainDevice,
      targets: formDataZHL.targets.map((_) => {
        const entity = entityStore.getEntityById(_.id)
        return {
          ID: entity.id,
          type: entity.getType(),
          lon: entity.position[0],
          lat: entity.position[1],
          alt: entity.position[2]
        }
      })
    }
    const param2 = {
      dataLinkType: '90X链',
      // usingKU: this.DataLinkInfo.link[0].usingKU,
      centerTargetId: formData90X.mainDevice,
      targets: formData90X.targets.map((_) => {
        const entity = entityStore.getEntityById(_.id)
        return {
          ID: entity.id,
          type: entity.getType(),
          lon: entity.position[0],
          lat: entity.position[1],
          alt: entity.position[2]
        }
      })
    }
    const param3 = {
      dataLinkType: 'JIDS链',
      // usingKU: this.DataLinkInfo.link[0].usingKU,
      centerTargetId: formDataJIDS.mainDevice,
      targets: formDataJIDS.targets.map((_) => {
        const entity = entityStore.getEntityById(_.id)
        return {
          ID: entity.id,
          type: entity.getType(),
          lon: entity.position[0],
          lat: entity.position[1],
          alt: entity.position[2]
        }
      })
    }
    const param4 = {
      dataLinkType: 'KU卫通',
      // usingKU: this.DataLinkInfo.link[0].usingKU,
      centerTargetId: formDataKu.mainDevice,
      targets: formDataKu.targets.map((_) => {
        const entity = entityStore.getEntityById(_.id)
        return {
          ID: entity.id,
          type: entity.getType(),
          lon: entity.position[0],
          lat: entity.position[1],
          alt: entity.position[2]
        }
      })
    }
    const d = {
      InteractType: 'baseInter.EntiyInter.VirtualInteract.DataLinkCreate',
      Param: [param1, param2, param3, param4]
    }
    websocketStore.sendMessage(d)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error)
  }
}
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
