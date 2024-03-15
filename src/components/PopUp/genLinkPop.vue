<!-- eslint-disable no-debugger -->
<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'445px'"
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
                <el-input placeholder="静态时隙分配" :disabled="true" />
              </el-form-item>
              <el-form-item
                label="关联实体"
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
                  ref="tableRefZHL"
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
                <el-input placeholder="点名呼叫轮询" :disabled="true" />
              </el-form-item>
              <el-form-item
                label="关联实体"
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
                  ref="tableRef90X"
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
                label="关联实体"
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
                  ref="tableRefJIDS"
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
                label="关联实体"
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
                  ref="tableRefKU"
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
        <el-button
          type="primary"
          color="transparent"
          size="small"
          @click="closePopup"
          >取消</el-button
        >
        <el-button
          type="primary"
          color="#119aa0"
          size="small"
          :loading="saveLoadStatus"
          @click="confirmPopup"
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
import { useMissionStore } from '@/stores/missionStore'
import { storeToRefs } from 'pinia'
import { EntityTypeEnum, WS_EVENT } from '@/common/enum'
import type { FormInstance } from 'element-plus'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useLinkStore } from '@/stores/linkStore'
import { ElMessage } from 'element-plus'
const popupStore = usePopupStore()
const entityStore = useEntityStore()
const websocketStore = useWebSocketStore()
const cesiumStore = useCesiumStore()
const missionStore = useMissionStore()
const linkStore = useLinkStore()
const { entitiesArr } = storeToRefs(entityStore)
const formRefZHL = ref<FormInstance>()
const formRef90X = ref<FormInstance>()
const formRefJIDS = ref<FormInstance>()
const formRefKU = ref<FormInstance>()

const tableRefZHL = ref<FormInstance>()
const tableRef90X = ref<FormInstance>()
const tableRefJIDS = ref<FormInstance>()
const tableRefKU = ref<FormInstance>()
withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
const activeTab = ref('综合链')
const saveLoadStatus = ref(false)
let saveTimer = null
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

const closePopup = () => {
  popupStore.closePop()
}
const confirmPopup = async () => {
  saveLoadStatus.value = true
  try {
    await formRefZHL.value.validate((valid) => {
      if (!valid) {
        activeTab.value = '综合链'
        throw 'error'
      }
    })
    await formRef90X.value.validate((valid) => {
      if (!valid) {
        activeTab.value = '90X链'
        throw 'error'
      }
    })
    await formRefJIDS.value.validate((valid) => {
      if (!valid) {
        activeTab.value = 'JIDS链'
        throw 'error'
      }
    })
    await formRefKU.value.validate((valid) => {
      if (!valid) {
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
    saveTimer = setTimeout(() => {
      saveLoadStatus.value = false
      ElMessage.error(`超时`)
    }, 5000)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error)
    saveLoadStatus.value = false
  }
}
onMounted(() => {
  const param1 = linkStore.linkConnectInfo['综合链']
  param1?.selection?.forEach((_) => {
    tableRefZHL.value.toggleRowSelection(
      devicesList.value.find((item) => {
        return _ === item.id
      }),
      true
    )
  })
  param1 && (formDataZHL.mainDevice = param1.mainDevice)

  const param2 = linkStore.linkConnectInfo['90X链']
  param2?.selection?.forEach((_) => {
    tableRef90X.value.toggleRowSelection(
      devicesList.value.find((item) => {
        return _ === item.id
      }),
      true
    )
  })
  param2 && (formData90X.mainDevice = param2.mainDevice)

  const param3 = linkStore.linkConnectInfo['JIDS链']
  param3?.selection?.forEach((_) => {
    tableRefJIDS.value.toggleRowSelection(
      devicesList.value.find((item) => {
        return _ === item.id
      }),
      true
    )
  })
  param3 && (formDataJIDS.mainDevice = param3.mainDevice)

  const param4 = linkStore.linkConnectInfo['KU卫通']
  param4?.selection?.forEach((_) => {
    tableRefKU.value.toggleRowSelection(
      shipDeviceList.value.find((item) => {
        return _ === item.id
      }),
      true
    )
  })
  param4 && (formDataKu.mainDevice = param4?.mainDevice)

  websocketStore.addEventListener(WS_EVENT.createLink, (data) => {
    console.log('接收到的createLink数据====>', data)
    cesiumStore.cesium.linkMap.removeAllLink()
    data.link.forEach((_: any) => {
      //0处理数据链挂载设备信息
      _.targetDevices.forEach((item) => {
        const entity = entityStore.getEntityById(item.ID)
        item.device.forEach((d) => {
          const e = entity.equipment.find((i) => d === i.name)
          e.isHas = true
          e.isUse = true
        })
      })
      let arg
      if (_.dataLinkType === '综合链') {
        arg = {
          linkTo: _.linkTo,
          mainDevice: formDataZHL.mainDevice,
          selection: formDataZHL.targets.map((item) => item.id),
          targetDevices: _.targetDevices
        }
      } else if (_.dataLinkType === '90X链') {
        arg = {
          linkTo: _.linkTo,
          mainDevice: formData90X.mainDevice,
          selection: formData90X.targets.map((item) => item.id),
          targetDevices: _.targetDevices
        }
      } else if (_.dataLinkType === 'JIDS链') {
        arg = {
          linkTo: _.linkTo,
          mainDevice: formDataJIDS.mainDevice,
          selection: formDataJIDS.targets.map((item) => item.id),
          targetDevices: _.targetDevices
        }
      } else if (_.dataLinkType === 'KU卫通') {
        arg = {
          linkTo: _.linkTo,
          mainDevice: formDataKu.mainDevice,
          selection: formDataKu.targets.map((item) => item.id),
          targetDevices: _.targetDevices
        }
      }
      linkStore.setLinkConnectInfo(_.dataLinkType, arg) //设置数据链连接信息
      _.linkTo.forEach((i: any) => {
        const deviceArr = i.split('-')
        const entityOne = entityStore.getEntityById(deviceArr[0])
        const entityTwo = entityStore.getEntityById(deviceArr[1])
        cesiumStore.cesium.linkMap.addLink({
          id: i,
          positionArr: [entityOne.position, entityTwo.position],
          type: _.dataLinkType
        })
      })
    })
    linkStore.setLinkLinkInfo(data.linklink) //设置数据链linklink信息
    //处理linklink信息
    data.linklink.forEach((_) => {
      const entityStr = _['综合链'] || _['90X链'] || _['JIDS链']
      const entityArr = entityStr.split('-')
      const deviceArr = _.device.split('-')
      // console.log('entityArr', entityArr, 'deviceArr', deviceArr)
      entityArr.forEach((i, index) => {
        const entity = entityStore.getEntityById(i)
        const e = entity.equipment.find(
          (eItem) => eItem.name === deviceArr[index]
        )
        e.isHas = true
        e.isUse = true
      })
    })
    let staticMission = []
    let dynamicMission = []
    data.mission?.forEach((_) => {
      if (_.isAuto) {
        dynamicMission.push(_)
      } else {
        staticMission.push(_)
      }
    })
    missionStore.setMissionByType({ type: '静态', mission: staticMission })
    missionStore.setMissionByType({ type: '动态', mission: dynamicMission })
    saveLoadStatus.value = false
    clearTimeout(saveTimer)
    closePopup()
  })
})
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
