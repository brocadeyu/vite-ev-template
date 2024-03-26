<template>
  <div>
    <!-- <CesiumMap></CesiumMap> -->
    <modelSource></modelSource>
    <entityManager ref="entityManaRef"></entityManager>
    <layerController></layerController>
  </div>
</template>
<script setup lang="ts">
import modelSource from './components/model-source.vue'
import entityManager from './components/entity-manager.vue'
import layerController from './components/layer-controller.vue'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { WS_EVENT } from '@/common/enum'
import { useWebSocketStore } from '@/stores/webSocketStore'
import { onMounted, ref } from 'vue'
import { useEntityStore } from '@/stores/entityStore'
import { useLinkStore } from '@/stores/linkStore'
import { useMissionStore } from '@/stores/missionStore'
import { onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
const websocketStore = useWebSocketStore()
const cesiumStore = useCesiumStore()
const thoughtStore = useThoughtStore()
const entityStore = useEntityStore()
const linkStore = useLinkStore()
const missionStore = useMissionStore()
const entityManaRef = ref(null)
onMounted(async () => {
  requestIdleCallback(async () => {
    // console.log('初始化开始')
    await asyncInitEntity()
    // await asyncInitModelTrack()
    await Promise.allSettled([
      asyncInitModelTrack(),
      asyncInitLink(),
      asyncInitMission(),
      asyncInitWS()
    ]).then(() => {
      setLayerVisible()
    })
    console.log('初始化完成')
  })
})
const asyncInitEntity = async () => {
  return new Promise((resolve) => {
    // console.log('asyncInitEntity')
    entityStore.initEntityStore(thoughtStore.thought.entities) //根据thought初始化entityStore
    entityManaRef.value.setTreeData(
      entityStore.entitiesArr.map((_) => {
        return {
          id: (_ as any).id,
          label: (_ as any).id
        }
      })
    )
    // console.log('asyncInitEntity sucess')
    resolve()
  })
}
const asyncInitModelTrack = async () => {
  // console.log('asyncInitModelTrack')
  let promiseArr = []
  entityStore.entitiesArr.forEach((_) => {
    promiseArr.push(cesiumStore.cesium.modelMap.addModel(_ as any))
    cesiumStore.cesium.trackMap.addTrack({ id: _.id, positionArr: _.path })
    cesiumStore.cesium.boardMap.addBoard({ id: _.id, position: _.position })
    let wt = _.equipment.find((_) => _.name === '卫星通信设备')
    if (wt?.isHas && wt?.isUse) {
      cesiumStore.cesium.scanMap.addScan({ id: _.id, position: _.position })
    }
  })
  await Promise.allSettled(promiseArr)
}
const asyncInitLink = async () => {
  return new Promise((resolve) => {
    // console.log('asyncInitLink')
    thoughtStore.thought.dataLinkInfo.link?.forEach((_) => {
      const arg = {
        linkTo: _.linkTo,
        mainDevice: _.centerTargetId,
        selection: _.selection,
        targetDevices: _.targetDevices
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
    if (thoughtStore.thought.dataLinkInfo?.linklink) {
      linkStore.setLinkLinkInfo(thoughtStore.thought.dataLinkInfo.linklink)
    }
    // console.log('asyncInitLink sucess')
    resolve()
  })
}
const asyncInitMission = async () => {
  return new Promise((resolve) => {
    // console.log('asyncInitMission')
    let staticMission = []
    let dynamicMission = []
    thoughtStore.thought.dataLinkInfo.mission?.forEach((_) => {
      if (_.isAuto) {
        dynamicMission.push(_)
      } else {
        staticMission.push(_)
      }
    })
    missionStore.setMissionByType({ type: '静态', mission: staticMission })
    missionStore.setMissionByType({ type: '动态', mission: dynamicMission })
    // console.log('asyncInitMission sucess')
    resolve()
  })
}
const asyncInitWS = async () => {
  return new Promise((resolve) => {
    // console.log('asyncInitWS')
    websocketStore.connect('ws://localhost:12000/hsdb/101')
    websocketStore.addEventListener(WS_EVENT.onopen, () => {
      // eslint-disable-next-line no-console
      console.log('连接websocket')
    })
    websocketStore.addEventListener(WS_EVENT.onclose, () => {
      // eslint-disable-next-line no-console
      console.log('断开websocket')
    })
    websocketStore.addEventListener(WS_EVENT.onerror, () => {
      ElMessage.error(`websocket出错!`)
    })
    websocketStore.addEventListener(WS_EVENT.validateLinkRes, (data) => {
      cesiumStore.cesium.checkLineMap.removeAllCheckLine()
      cesiumStore.cesium.linkMap.setVisibleAllId()
      const filterData = data.filter((_) => !_.isLinkLink)
      // console.log('校验数据链结果：', filterData)
      if (filterData.length) {
        ElMessage.warning('链路断链')
        filterData.forEach((_) => {
          const deviceArr = _.link.split('-')
          const entityOne = entityStore.getEntityById(deviceArr[0])
          const entityTwo = entityStore.getEntityById(deviceArr[1])
          cesiumStore.cesium.linkMap.setVisibleById({
            id: `${deviceArr[0]}-${deviceArr[1]}`,
            flag: false
          })
          cesiumStore.cesium.linkMap.setVisibleById({
            id: `${deviceArr[1]}-${deviceArr[0]}`,
            flag: false
          })
          cesiumStore.cesium.checkLineMap.addCheckLine({
            id: _,
            positionArr: [entityOne.position, entityTwo.position]
          })
        })
      } else {
        ElMessage.success('链路通畅')
      }
    })
    // console.log('asyncInitWS sucess')
    resolve()
  })
}
const setLayerVisible = () => {
  cesiumStore.cesium.modelMap.setAllVisible(true)
  cesiumStore.cesium.boardMap.setAllVisible(true)
  cesiumStore.cesium.trackMap.setAllVisible(true)
  cesiumStore.cesium.linkMap.setVisibleByType({
    type: '综合链',
    flag: true
  })
  cesiumStore.cesium.linkMap.setVisibleByType({
    type: '90X链',
    flag: true
  })
  cesiumStore.cesium.linkMap.setVisibleByType({
    type: 'JIDS链',
    flag: true
  })
  cesiumStore.cesium.scanMap.setAllVisible(true)
}
onBeforeUnmount(() => {
  entityStore.resetEntity()
  linkStore.resetLink()
  // cesiumStore.resetCesium()
  websocketStore.disconnect()
})
</script>
<style scoped></style>
