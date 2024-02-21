<template>
  <base-docker
    :title="title"
    :show-footer="true"
    :height="'330px'"
    :width="'450px'"
    :is-draggable="true"
    :bg="data.modelInfo.img"
  >
    <template #content>
      <el-form :inline="true" :model="formData" class="entity-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-input v-model="formData.type" disabled clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input
                v-model="formData.name"
                placeholder="请输入名称"
                clearable
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
              >
                <template #append>
                  <el-button type="primary" size="small" @click="pickPoint">
                    <el-icon size="20"><i-ep-location /></el-icon>
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="航线">
              <el-input
                v-model="formData.path"
                placeholder="请输入名称"
                clearable
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="装备配置">
              <el-input
                v-model="formData.equipment"
                placeholder="请输入名称"
                clearable
              /> </el-form-item
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
  const cartographicCenter = new Cesium.Cartographic(
    Cesium.Math.toRadians(props.data.position[0]),
    Cesium.Math.toRadians(props.data.position[1]),
    0
  )
  const scanColor = new Cesium.Color(1.0, 0.0, 0.0, 1)
  const dyPoint = cesiumStore.cesium.markMap.addDynamicPoint({
    cartographicCenter,
    maxRadius: 150000,
    scanColor,
    duration: 4000
  })
  console.log('dyPoint', dyPoint)
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
</style>
