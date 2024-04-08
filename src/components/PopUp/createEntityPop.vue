<template>
  <base-docker
    :title="title"
    :show-footer="true"
    :height="'500px'"
    :width="'480px'"
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
                v-model="formData.fakeType"
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
          <el-col :span="24">
            <el-form-item :label="`航线`">
              <el-table
                size="small"
                :scrollbar-always-on="true"
                height="125"
                :data="formData.path"
                style="
                  --el-table-border-color: none;
                  --el-table-bg-color: #0b1a38;
                "
                :header-cell-style="{
                  fontSize: '12px',
                  height: '40px',
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
                <el-table-column prop="index" label="序号" :align="'center'">
                  <template #default="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="pos"
                  :label="`位置（${formData.path.length})`"
                  :align="'center'"
                  width="120"
                >
                </el-table-column>
                <el-table-column :align="'center'" width="160">
                  <template #header>
                    <div style="display: flex">
                      <el-button
                        type="primary"
                        size="small"
                        color="#119aa0"
                        :class="{ 'mark-point-active': isPickPathStatus }"
                        @click="editPath"
                        >标绘<el-icon :size="16"><i-ep-Aim /></el-icon
                      ></el-button>
                      <el-button
                        type="primary"
                        size="small"
                        color="#119aa0"
                        @click="resetPath"
                        >重置<el-icon :size="16"><i-ep-RefreshRight /></el-icon
                      ></el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table> </el-form-item
          ></el-col>
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
        <el-row>
          <el-col :span="24">
            <el-form-item label="电台参数">
              <el-button
                type="primary"
                color="#119aa0"
                size="small"
                @click="showParamSet"
                >设置</el-button
              >
            </el-form-item></el-col
          >
          <el-dialog
            v-model="dialogFormVisible"
            title="电台参数设置"
            width="700"
            align-center
            :show-close="false"
            style="--el-bg-color: #448fa2; --el-input-bg-color: white"
          >
            <el-form :model="form">
              综合链
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工作频率" :label-width="formLabelWidth">
                    <el-input
                      v-model="form.name"
                      autosize
                      autocomplete="off"
                      style="--el-input-bg-color: white"
                    /> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="8PSK" value="8PSK" />
                      <el-option label="16QAM" value="16QAM" />
                      <el-option label="32QAM" value="32QAM" />
                      <el-option label="64QAM" value="64QAM" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="传输速率" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option
                        label="短波定频1120~4053bps"
                        value="短波定频1120~4053bps"
                      />
                      <el-option
                        label="短波跳频500~2200bps"
                        value="短波跳频500~2200bps"
                      />
                      <el-option
                        label="超短波定频12667bps"
                        value="超短波定频12667bps"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"
                  ><el-form-item label="工作模式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="TDMA-时分多址" value="TDMA-时分多址" />
                      <el-option label="动态TDMA" value="动态TDMA" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item label="消息格式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="F序列" value="8PSK" />
                      <el-option label="FJ序列" value="FJ序列" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-form>
            <el-form :model="form">
              90X链
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工作频率" :label-width="formLabelWidth">
                    <el-input
                      v-model="form.name"
                      autosize
                      autocomplete="off"
                      style="--el-input-bg-color: white"
                    /> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="8PSK" value="8PSK" />
                      <el-option label="16QAM" value="16QAM" />
                      <el-option label="32QAM" value="32QAM" />
                      <el-option label="64QAM" value="64QAM" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="传输速率" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option
                        label="短波定频1120~4053bps"
                        value="短波定频1120~4053bps"
                      />
                      <el-option
                        label="短波跳频500~2200bps"
                        value="短波跳频500~2200bps"
                      />
                      <el-option
                        label="超短波定频12667bps"
                        value="超短波定频12667bps"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"
                  ><el-form-item label="工作模式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="TDMA-时分多址" value="TDMA-时分多址" />
                      <el-option label="动态TDMA" value="动态TDMA" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item label="消息格式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="F序列" value="8PSK" />
                      <el-option label="FJ序列" value="FJ序列" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-form>
            <el-form :model="form">
              JIDS链
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工作频率" :label-width="formLabelWidth">
                    <el-input
                      v-model="form.name"
                      autosize
                      autocomplete="off"
                      style="--el-input-bg-color: white"
                    /> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="8PSK" value="8PSK" />
                      <el-option label="16QAM" value="16QAM" />
                      <el-option label="32QAM" value="32QAM" />
                      <el-option label="64QAM" value="64QAM" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="传输速率" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option
                        label="短波定频1120~4053bps"
                        value="短波定频1120~4053bps"
                      />
                      <el-option
                        label="短波跳频500~2200bps"
                        value="短波跳频500~2200bps"
                      />
                      <el-option
                        label="超短波定频12667bps"
                        value="超短波定频12667bps"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"
                  ><el-form-item label="工作模式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="TDMA-时分多址" value="TDMA-时分多址" />
                      <el-option label="动态TDMA" value="动态TDMA" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item label="消息格式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="F序列" value="8PSK" />
                      <el-option label="FJ序列" value="FJ序列" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-form>
            <el-form :model="form">
              短波、超短波、微波
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工作频率" :label-width="formLabelWidth">
                    <el-input
                      v-model="form.name"
                      autosize
                      autocomplete="off"
                      style="--el-input-bg-color: white"
                    /> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="出联方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="定频" value="定频" />
                      <el-option label="跳频" value="跳频" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="调制方式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="8PSK" value="8PSK" />
                      <el-option label="16QAM" value="16QAM" />
                      <el-option label="32QAM" value="32QAM" />
                      <el-option label="64QAM" value="64QAM" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12">
                  <el-form-item label="传输速率" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option
                        label="短波定频1120~4053bps"
                        value="短波定频1120~4053bps"
                      />
                      <el-option
                        label="短波跳频500~2200bps"
                        value="短波跳频500~2200bps"
                      />
                      <el-option
                        label="超短波定频12667bps"
                        value="超短波定频12667bps"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"
                  ><el-form-item label="工作模式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="TDMA-时分多址" value="TDMA-时分多址" />
                      <el-option label="动态TDMA" value="动态TDMA" />
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item label="消息格式" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a zone"
                    >
                      <el-option label="F序列" value="8PSK" />
                      <el-option label="FJ序列" value="FJ序列" />
                    </el-select> </el-form-item
                ></el-col>
              </el-row>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  @click="dialogFormVisible = false"
                >
                  保存
                </el-button>
              </div>
            </template>
          </el-dialog>
        </el-row>
      </el-form>
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
        <el-button type="primary" color="#119aa0" size="small" @click="onSave"
          >保存</el-button
        >
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
import { useLinkStore } from '@/stores/linkStore'
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
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
const formRef = ref<FormInstance>()
const formData = reactive({
  type: '' as EntityType,
  fakeType: '',
  name: '',
  position: [],
  path: [],
  equipment: [
    { name: '短波电台', isHas: false, isUse: false },
    { name: '对空超短波电台', isHas: false, isUse: false },
    { name: '对海超短波电台', isHas: false, isUse: false },
    { name: '微波电台', isHas: false, isUse: false },
    { name: '卫星通信设备', isHas: false, isUse: false },
    { name: '综合链设备', isHas: false, isUse: false },
    { name: '90X链设备', isHas: false, isUse: false },
    { name: 'JIDS链设备', isHas: false, isUse: false }
  ]
})
const isPickPointStatus = ref(false) //是否开启地图选点状态
const isPickPathStatus = ref(false) //是否开启地图选路径状态
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
const linkStore = useLinkStore()
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
        cesiumStore.cesium.boardMap.removeLabelById(props.data.name)
        cesiumStore.cesium.scanMap.removeScanById(props.data.name)
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
      cesiumStore.cesium.boardMap.addBoard({
        id: formData.name,
        position: formData.position
      })
      cesiumStore.cesium.trackMap.addTrack({
        id: formData.name,
        positionArr: formData.path.map((_) => [_.pos[0], _.pos[1], 3000])
      })
      let wt = formData.equipment.find((_) => _.name === '卫星通信设备')
      if (wt?.isHas && wt?.isUse) {
        cesiumStore.cesium.scanMap.addScan({
          id: formData.name,
          position: formData.position
        })
        linkStore.linkConnectInfo['KU卫通'].selection.push(formData.name)
      } else {
        cesiumStore.cesium.scanMap.removeScanById(formData.name)
        linkStore.linkConnectInfo['KU卫通'].selection =
          linkStore.linkConnectInfo['KU卫通'].selection.filter(
            (_) => _ !== formData.name
          )
      }
      let zhl = formData.equipment.find((_) => _.name === '综合链设备')
      if (zhl?.isHas && zhl?.isUse) {
        linkStore.linkConnectInfo['综合链'].selection.push(formData.name)
      } else {
        linkStore.linkConnectInfo['综合链'].selection =
          linkStore.linkConnectInfo['综合链'].selection.filter(
            (_) => _ !== formData.name
          )
      }
      let l90x = formData.equipment.find((_) => _.name === '90X链设备')
      if (l90x?.isHas && l90x?.isUse) {
        linkStore.linkConnectInfo['90X链'].selection.push(formData.name)
      } else {
        linkStore.linkConnectInfo['90X链'].selection =
          linkStore.linkConnectInfo['90X链'].selection.filter(
            (_) => _ !== formData.name
          )
      }
      let jids = formData.equipment.find((_) => _.name === 'JIDS链设备')
      if (jids?.isHas && jids?.isUse) {
        linkStore.linkConnectInfo['JIDS链'].selection.push(formData.name)
      } else {
        linkStore.linkConnectInfo['JIDS链'].selection =
          linkStore.linkConnectInfo['JIDS链'].selection.filter(
            (_) => _ !== formData.name
          )
      }

      closePopup()
    }
  })
}
const showParamSet = () => {
  dialogFormVisible.value = true
}

const editPath = () => {
  if (isPickPointStatus.value) return
  isPickPathStatus.value = true
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
      isPickPathStatus.value = false
      tooltipStore.closeToolTip()
    }
  })
}
const resetPath = () => {
  formData.path.splice(1)
  trackLine.updateLinePosition(
    formData.path
      .map((_) => {
        return _.pos
      })
      .flat() as any
  )
}
let dyPoint: any
const pickPoint = () => {
  if (isPickPathStatus.value) return
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
const getFakeTypeFromType = (type: EntityType) => {
  let result = ''
  switch (type) {
    case '武装直升机':
      result = 'h-6k轰炸机'
      break
    case '侦察直升机':
      result = '预警直升机'
      break

    case '中国052C型驱逐舰':
      result = '中国052C型驱逐舰'
      break

    case '中国052D型驱逐舰':
      result = '中国052D型驱逐舰'
      break
  }
  return result
}
onMounted(() => {
  formData.type = props.data.type
  formData.fakeType = getFakeTypeFromType(props.data.type)
  formData.position = [
    Number(props.data.position[0].toFixed(3)),
    Number(props.data.position[1].toFixed(3)),
    3000
  ]
  if ('name' in props.data) {
    //编辑
    //IOpenEditEntityPopProps
    formData.name = props.data.name
    formData.equipment = JSON.parse(JSON.stringify(props.data.equipment))
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
  if (['武装直升机', '侦察直升机'].includes(props.data.type)) {
    formData.equipment = formData.equipment.filter(
      (_) => _.name !== '卫星通信设备'
    )
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
  --el-text-color-regular: rgb(232, 232, 232);
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
:deep(.el-table .cell) {
  overflow: visible;
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
  border: 2px solid #00f3fe;
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
