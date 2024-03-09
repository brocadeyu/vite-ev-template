<template>
  <div>
    <BaseHeader :title="computeTitle">
      <div class="header-btn">
        <el-button
          v-if="!['数据链模拟', '想定回放'].includes(computeTitle)"
          type="primary"
          size="small"
          color="#119aa0"
          @click="saveThought"
          >保存</el-button
        >
        <el-button
          v-if="computeTitle !== '数据链模拟'"
          type="primary"
          size="small"
          color="#119aa0"
          @click="back"
          >返回</el-button
        >
        <el-button type="primary" size="small" color="#119aa0" @click="logout"
          >退出</el-button
        >
      </div>
    </BaseHeader>
    <ToolTip></ToolTip>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePopupStore } from '@/stores/popupStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { useLinkStore } from '@/stores/linkStore'
import { useMissionStore } from '@/stores/missionStore'
import { useEntityStore } from '@/stores/entityStore'
import { saveUpdateThought } from '@/api/thought'
const route = useRoute()
const router = useRouter()
const popupStore = usePopupStore()
const thoughtStore = useThoughtStore()
const linkStore = useLinkStore()
const missionStore = useMissionStore()
const entityStore = useEntityStore()
const computeTitle = computed(() => {
  return route.name as string
})
const back = () => {
  router.back()
}
const logout = () => {
  router.replace({
    path: '/login'
  })
}
const saveThought = () => {
  //保存想定：编辑直接调用接口保存，新建则调用打开弹窗，在弹框内输入名称，后调用保存接口
  if (route.name === '新建想定') {
    popupStore.openPop({
      title: '保存想定',
      type: 'saveThought',
      showMask: true
    })
  } else if (route.name === '想定编辑') {
    onSaveUpdate()
  }
}

const onSaveUpdate = async () => {
  try {
    console.log('更新想定保存')
    console.log(entityStore.entitiesArr)
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
        SendPower: '1',
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
        targetDevices: linkItem.targetDevices,
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
        linklink: linkStore.linklink,
        isDistribute: true
      },
      Entity: convertEntityArr,
      ScenarioName: thoughtStore.thought.name
    }
    const param = {
      id: thoughtStore.thought.id,
      name: thoughtStore.thought.name,
      jsonData: jsonData
    }

    console.log('param', param)
    await saveUpdateThought(param)
    popupStore.closePop()
    router.replace({ path: '/thought/overview' })
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<style scoped>
.header-btn {
  width: 100%;
  /* background-color: red; */
  display: flex;
  justify-content: flex-end;
  padding: 0 30px;
  transform: translateY(-3px);
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
