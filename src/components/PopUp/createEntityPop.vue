<template>
  <base-docker
    :title="title"
    :show-footer="true"
    :height="'400px'"
    :width="'450px'"
    :is-draggable="true"
    :bg="getEntityImgByType(data.type)"
  >
    <template #content>
      <el-form
        ref="formRef"
        :inline="true"
        :model="formData"
        class="entity-form"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-input
                v-model="formData.type"
                disabled
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="名称"
              prop="name"
              :rules="[
                {
                  required: true,
                  message: '名称不可为空',
                  trigger: 'change'
                },
                {
                  validator: validatePass2,
                  trigger: 'change'
                }
              ]"
            >
              <el-input
                v-model="formData.name"
                placeholder="请输入名称"
                clearable
                size="small"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="位置">
              <el-input
                :value="formData.position"
                disabled
                :placeholder="`经度:${data.position[0]},纬度:${data.position[1]}`"
                clearable
                size="small"
              >
                <template #append>
                  <el-button
                    :class="{ 'mark-point-active': isPickPointStatus }"
                    type="primary"
                    size="small"
                    @click="pickPoint"
                  >
                    <el-icon size="16"><i-ep-location /></el-icon>
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item :label="`航线 (${formData.path.length}) `">
              <el-table
                size="small"
                :show-header="false"
                :scrollbar-always-on="true"
                height="80"
                :data="formData.path"
                style="
                  --el-table-border-color: none;
                  --el-table-bg-color: transparent;
                "
                :header-cell-style="{
                  fontSize: '12px',
                  height: '20px',
                  color: 'white',
                  backgroundColor: '#2b4859',
                  borderBottom: '0.5px #143275 solid'
                }"
                :cell-style="{
                  color: '#fff',
                  height: '20px',
                  fontSize: '12px',
                  borderBottom: '0.5px #143275 solid'
                }"
                :row-style="{
                  fontSize: '20px',
                  height: '20px',
                  backgroundColor: '#0b1a38',
                  color: 'white'
                }"
              >
                <!-- <el-table-column prop="index" label="序号" /> -->
                <el-table-column
                  prop="pos"
                  label="位置"
                  width="170"
                  :align="'center'"
                />
              </el-table> </el-form-item
          ></el-col>
          <el-col :span="9">
            <el-form-item>
              <el-button type="primary" size="small" @click="editPath"
                >{{ isPickPointStatus ? '标绘' : '标绘'
                }}<el-icon :size="16"><i-ep-editPen /></el-icon
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="装备配置">
              <div v-for="(item, index) in formData.equipment" :key="index">
                <el-checkbox v-model="item.isHas" size="small">{{
                  item.name
                }}</el-checkbox>
                <el-switch
                  v-model="item.isUse"
                  size="small"
                  :disabled="!item.isHas"
                  active-color="#13ce66"
                  inactive-color="#d7d7d7"
                >
                </el-switch>
              </div> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button type="primary" size="small" @click="closePopup"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="onSave">保存</el-button>
      </div>
    </template>
  </base-docker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useEntityStore } from '@/stores/entityStore'
import { useToolTipStore } from '@/stores/tooltipStore'
import { onMounted } from 'vue'
import {
  IOpenAddEntityPopProps,
  IOpenEditEntityPopProps
} from '@/common/interface/popup'
import { getEntityImgByType } from '@/common/helper'
const props = withDefaults(
  defineProps<{
    title?: string
    data: IOpenAddEntityPopProps | IOpenEditEntityPopProps
  }>(),
  { title: '' }
)
import { reactive, ref, computed } from 'vue'
import MarkerLine from '@/common/class/markerLine'
import type { FormInstance } from 'element-plus'
import { EntityType } from '@/common/enum'
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '123') {
    callback(new Error('名称已存在!'))
  } else {
    callback()
  }
}
const formRef = ref<FormInstance>()
const formData = reactive({
  type: '' as EntityType,
  name: '',
  position: [],
  path: [],
  equipment: [
    { name: '短波电台', isHas: false, isUse: false },
    { name: '对空超短波电台', isHas: false, isUse: false },
    { name: '对海超短波电台', isHas: false, isUse: false },
    { name: '微波电台', isHas: false, isUse: false },
    { name: '卫星通信设备', isHas: false, isUse: false }
  ]
})
const isPickPointStatus = ref(false) //是否开启地图选点状态
const trackPointArr = computed(() => {
  return formData.path
    .map((_) => {
      return _.pos
    })
    .flat()
})
const popupStore = usePopupStore()
const cesiumStore = useCesiumStore()
const entityStore = useEntityStore()
const tooltipStore = useToolTipStore()
let trackLine: MarkerLine
const closePopup = () => {
  popupStore.closePop()
  cesiumStore.cesium.markMap.markPoint.remove(dyPoint)
  trackLine.destroy()
}
const onSave = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if ('name' in props.data) {
        //编辑
        entityStore.removeEntityById(props.data.name)
        cesiumStore.cesium.modelMap.removeModel({ id: props.data.name })
        cesiumStore.cesium.trackMap.removeTrack({ id: props.data.name })
      } else {
        //新增
      }
      const opt = {
        id: formData.name,
        type: formData.type,
        position: formData.position,
        path: formData.path.map((_) => [_.pos[0], _.pos[1], 3000]),
        equipment: formData.equipment
      }
      entityStore.addEntity(opt)
      cesiumStore.cesium.modelMap.addModel({
        id: formData.name,
        position: formData.position,
        type: formData.type
      })
      cesiumStore.cesium.trackMap.addTrack({
        id: formData.name,
        positionArr: formData.path.map((_) => [_.pos[0], _.pos[1], 3000])
      })
      closePopup()
    }
  })
}

const editPath = () => {
  if (isPickPointStatus.value) return
  isPickPointStatus.value = true
  tooltipStore.showTooltip({ text: '单击标绘，右击结束' })
  cesiumStore.cesium.eventHandler.register({
    type: 'LeftClick',
    id: 'pickEditPathPoint',
    callBack: (e) => {
      formData.path.push({
        index: 0,
        pos: [e.position[0], e.position[1]]
      })
      trackLine.updateLinePosition(
        formData.path
          .map((_) => {
            return _.pos
          })
          .flat() as any
      )
      //取出path绘制线
      //cesiumStore.cesium.markMap.markTools.addLine()
    }
  })

  cesiumStore.cesium.eventHandler.register({
    type: 'MouseMove',
    id: 'getDynamicPoint',
    callBack: (e) => {
      trackLine.updatePointerPosition([e.position[0], e.position[1]] as any)
    }
  })
  cesiumStore.cesium.eventHandler.register({
    type: 'RightClick',
    id: 'endEditPath',
    callBack: (e) => {
      formData.path.push({
        index: 0,
        pos: [e.position[0], e.position[1]]
      })
      trackLine.updateLinePosition(
        formData.path
          .map((_) => {
            return _.pos
          })
          .flat() as any
      )
      cesiumStore.cesium.eventHandler.remove({
        type: 'LeftClick',
        id: 'pickEditPathPoint'
      })
      cesiumStore.cesium.eventHandler.remove({
        type: 'MouseMove',
        id: 'getDynamicPoint'
      })
      cesiumStore.cesium.eventHandler.remove({
        type: 'RightClick',
        id: 'endEditPath'
      })
      isPickPointStatus.value = false
      tooltipStore.closeToolTip()
    }
  })
}
let dyPoint: any
const pickPoint = () => {
  if (isPickPointStatus.value) return
  isPickPointStatus.value = true
  tooltipStore.showTooltip({ text: '单击地球，选取点位' })
  cesiumStore.cesium.eventHandler.register({
    type: 'LeftClick',
    id: 'pickEntityPoint',
    callBack: (e) => {
      formData.position = [e.position[0], e.position[1], 3000]
      cesiumStore.cesium.markMap.markPoint.updatePosition({
        item: dyPoint,
        position: [e.position[0], e.position[1]]
      })
      formData.path[0] = { index: 0, pos: [e.position[0], e.position[1]] }
      trackLine.updateLinePosition(
        formData.path
          .map((_) => {
            return _.pos
          })
          .flat() as any
      )
      cesiumStore.cesium.eventHandler.remove({
        type: 'LeftClick',
        id: 'pickEntityPoint'
      })
      isPickPointStatus.value = false
      tooltipStore.closeToolTip()
    }
  })
}
onMounted(() => {
  formData.type = props.data.type
  formData.position = [
    Number(props.data.position[0].toFixed(3)),
    Number(props.data.position[1].toFixed(3)),
    3000
  ]
  if ('name' in props.data) {
    //编辑
    //IOpenEditEntityPopProps
    formData.name = props.data.name
    // console.log(' props.data.equipment', props.data.equipment)
    formData.equipment = props.data.equipment
    // formData.path = props.data.path
    props.data.path.forEach((_) => {
      formData.path.push({
        index: 0,
        pos: [Number(_[0].toFixed(3)), Number(_[1].toFixed(3))]
      })
    })
  } else {
    //新增
    formData.path.push({
      index: 0,
      pos: [
        Number(props.data.position[0].toFixed(3)),
        Number(props.data.position[1].toFixed(3))
      ]
    })
  }
  dyPoint = cesiumStore.cesium.markMap.markPoint.addItem({
    position: [props.data.position[0], props.data.position[1]]
  })
  trackLine = new MarkerLine(
    cesiumStore.cesium.viewer,
    trackPointArr.value as any
  )
})
</script>

<style scoped>
.foot-btns {
  display: flex;
  justify-content: flex-end;
}
.entity-form {
  padding: 15px;
  color: white;
}
.entity-form .el-input {
  /* --el-input-width: 110px; */
  --el-input-bg-color: #0c1a39;
  --el-disabled-bg-color: #0c1a39;
  --el-input-hover-border-color: #16b0b8;
  --el-input-border-color: #0e9aa0;
  --el-disabled-border-color: #0d6e71;
  --el-fill-color-light: transparent;
  --el-color-info: white;
}
.mark-point-active {
  position: relative;
}
.card-active {
  border-color: rgb(0, 128, 255);
  position: relative;
}
.mark-point-active::before,
.mark-point-active::after {
  content: '';
  position: absolute;
  top: -7px;
  left: -7px;
  right: -7px;
  bottom: -7px;
  border: 2px solid gold;
  transition: all 0.5s;
  animation: clippath 3s infinite linear;
  border-radius: 7px;
}

.mark-point-active:after {
  animation: clippath 3s infinite -1.5s linear;
}
@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 80% 0);
  }

  25% {
    clip-path: inset(0 80% 0 0);
  }
  50% {
    clip-path: inset(80% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 80%);
  }
}
.entity-form .el-input .el-button {
  display: flex;
}
.entity-form .el-input-group__append .el-input-group__prepend {
  background-color: red;
}

.entity-form .el-select {
  --el-select-width: 110px;
}

.el-table {
  --el-table-row-hover-bg-color: rgb(28, 62, 113);
}
:deep(.el-table__empty-block) {
  background-color: #0b1a39;
}

:deep(.el-checkbox__input .el-checkbox__inner) {
  background-color: transparent !important;
  border-color: #119aa0;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: rgb(47, 99, 244) !important;
}
</style>
