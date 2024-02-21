<template>
  <base-docker
    :title="title"
    :show-footer="true"
    :height="'400px'"
    :width="'450px'"
    :is-draggable="true"
    :bg="data.modelInfo.img"
  >
    <template #content>
      <el-form :inline="true" :model="formData" class="entity-form">
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
            <el-form-item label="名称">
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
                  <el-button type="primary" size="small" @click="pickPoint">
                    <el-icon size="16"><i-ep-location /></el-icon>
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="航线">
              <el-table
                size="small"
                :show-header="false"
                height="80"
                width="200"
                :data="[
                  { index: 0, pos: '119,20' },
                  { index: 1, pos: '120,30' }
                ]"
                style="--el-table-border-color: none"
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
                <el-table-column prop="pos" label="位置" />
              </el-table> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="装备配置">
              <div v-for="(item, index) in equipmentConfig" :key="index">
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
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </template>
  </base-docker>
</template>

<script setup lang="ts">
import BaseDocker from '../components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import { useCesiumStore } from '@/stores/cesiumStore'
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
const props = withDefaults(
  defineProps<{
    title?: string
    data: any
  }>(),
  { title: '' }
)
import { reactive } from 'vue'

const formData = reactive({
  type: '',
  name: '',
  position: [],
  path: '',
  equipment: ''
})
const equipmentConfig = reactive([
  { name: '短波电台', isHas: false, isUse: false },
  { name: '对空超短波电台', isHas: false, isUse: false },
  { name: '对海超短波电台', isHas: false, isUse: false },
  { name: '微波电台', isHas: false, isUse: false },
  { name: '卫星通信设备', isHas: false, isUse: false }
])
const popupStore = usePopupStore()
const cesiumStore = useCesiumStore()
const closePopup = () => {
  popupStore.closePop()
}
const pickPoint = () => {
  cesiumStore.cesium.eventHandler.register({
    type: 'LeftClick',
    id: 'pickEntityPoint',
    callBack: (e) => {
      console.log('点击地图', e)
      formData.position = [e.position[0], e.position[1], 3000]
      cesiumStore.cesium.eventHandler.remove({
        type: 'LeftClick',
        id: 'pickEntityPoint'
      })
    }
  })
}
onMounted(() => {
  console.log('daa', props.data)
  formData.type = props.data.modelInfo.type
  formData.position = [props.data.position[0], props.data.position[1], 3000]
  // const cartographicCenter = new Cesium.Cartographic(
  //   Cesium.Math.toRadians(props.data.position[0]),
  //   Cesium.Math.toRadians(props.data.position[1]),
  //   0
  // )
  // const scanColor = new Cesium.Color(1.0, 0.0, 0.0, 1)
  // const dyPoint = cesiumStore.cesium.markMap.addDynamicPoint({
  //   cartographicCenter,
  //   maxRadius: 150000,
  //   scanColor,
  //   duration: 4000
  // })
  // console.log('dyPoint', dyPoint)
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
