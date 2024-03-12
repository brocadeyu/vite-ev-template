<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'200px'"
    :width="'370px'"
    :is-draggable="false"
  >
    <template #content>
      <div class="st-content">
        <el-form ref="formRef" :inline="true" :model="formData" class="st-form">
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="想定名称"
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
        </el-form>
      </div>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button type="primary" size="small" @click="closePopup"
          >取消
        </el-button>
        <el-button type="primary" size="small" @click="onSave">保存</el-button>
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import moment from 'moment'
import BaseDocker from '@/components/BaseDocker.vue'
import { usePopupStore } from '@/stores/popupStore'
import type { FormInstance } from 'element-plus'
import { useThoughtStore } from '@/stores/thougthStore'
import { useLinkStore } from '@/stores/linkStore'
import { useMissionStore } from '@/stores/missionStore'
import { useEntityStore } from '@/stores/entityStore'
import { saveCreateThought } from '@/api/thought'
import { ElMessage } from 'element-plus'
import router from '@/router'
const popupStore = usePopupStore()
const thoughtStore = useThoughtStore()
const linkStore = useLinkStore()
const missionStore = useMissionStore()
const entityStore = useEntityStore()
withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '123') {
    callback(new Error('名称已存在!'))
  } else {
    callback()
  }
}
const formRef = ref<FormInstance>()
const onSave = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      onSaveCreate()
    }
  })
}
const onSaveCreate = async () => {
  try {
    if (entityStore.entitiesArr.length === 0) {
      return ElMessage.warning('请先添加数据')
    }
    const linkObj = linkStore.linkConnectInfo
    const jMission = missionStore.staticMission
    const dMission = missionStore.dynamicMission
    const drMission = missionStore.importMission
    let convertLink = []
    let convertMission = []
    let convertEntityArr = entityStore.entitiesArr.map((_) => {
      return {
        EntityName: _.type,
        EntityMC: _.id,
        id: _.id,
        Pos: [_.position[1], _.position[0], _.position[2]],
        WorkFre: '150',
        Ges: [0, 0, 0],
        SenderPower: '1',
        AntennaePower: '2',
        Behaviour: [
          {
            Type: _.getType() === 'AIR' ? 'FlyAlongAirPath' : 'AlongThePath',
            Points: _.path
          }
        ],
        Equipment: _.equipment
      }
    })
    convertMission = convertLink.concat(jMission, dMission, drMission)
    Object.keys(linkObj).forEach((k) => {
      const linkItem = linkObj[k]
      convertLink.push({
        targetDevices: [],
        centerTargetId: linkItem.mainDevice,
        linkTo: linkItem.linkTo,
        selection: linkItem.selection,
        dataLinkType: k
      })
    })
    const jsonData = {
      DataLinkInfo: {
        link: convertLink,
        mission: convertMission,
        linklink: linkStore.linklink
      },
      Entity: convertEntityArr,
      ScenarioName: formData.name,
      createTime: moment().format(),
      lastEditTime: ''
    }
    const param = {
      id: thoughtStore.thought.id,
      name: formData.name,
      jsonData: jsonData
    }
    // console.log('param', param)
    await saveCreateThought(param)
    popupStore.closePop()
    router.replace({ path: '/thought/overview' })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error)
  }
}

const formData = reactive({
  name: ''
})
const closePopup = () => {
  popupStore.closePop()
}
</script>

<style scoped>
.foot-btns {
  display: flex;
  justify-content: flex-end;
  margin-right: 2px;
}
.st-content {
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.st-form .el-input {
  /* --el-input-width: 110px; */
  --el-input-bg-color: #0c1a39;
  --el-disabled-bg-color: #0c1a39;
  --el-input-hover-border-color: #16b0b8;
  --el-input-border-color: #0e9aa0;
  --el-disabled-border-color: #0d6e71;
  --el-fill-color-light: transparent;
  --el-color-info: white;
}
</style>
