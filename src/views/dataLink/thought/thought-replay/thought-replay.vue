<template>
  <div>
    <!-- <CesiumMap></CesiumMap> -->
    <controlBar></controlBar>
    <loadingMask ref="loadingMaskRef"></loadingMask>
    <battlePanel @click-chart-btn="showGantChart"></battlePanel>
    <dataPanel></dataPanel>
    <networkDevice></networkDevice>
    <gantChart></gantChart>
    <trendChart ref="trendRef"></trendChart>
    <layerController></layerController>
  </div>
</template>
<script setup lang="ts">
import layerController from '../thought-edit/components/layer-controller.vue'
import controlBar from './components/control-bar.vue'
import loadingMask from './components/loading-mask.vue'
import battlePanel from './components/battle-panel.vue'
import dataPanel from './components/data-panel.vue'
import gantChart from './components/gant-chart.vue'
import trendChart from './components/trend-chart.vue'
import networkDevice from './components/network-device.vue'
import { useWebSocketStore } from '@/stores/webSocketStore'
import { useThoughtStore } from '@/stores/thougthStore'
import { useEntityStore } from '@/stores/entityStore'
import { useCesiumStore } from '@/stores/cesiumStore'
import { useLinkStore } from '@/stores/linkStore'
import { useLogStore } from '@/stores/logStore'
import { WS_EVENT } from '@/common/enum'
import { ElMessage } from 'element-plus'
import { getNowTimeStr } from '@/common/helper'
import { screenShot } from '@/common/helper'
const loadingMaskRef = ref(null)
const trendRef = ref(null)
const websocketStore = useWebSocketStore()
const thoughtStore = useThoughtStore()
const entityStore = useEntityStore()
const cesiumStore = useCesiumStore()
const linkStore = useLinkStore()
const logStore = useLogStore()
const showGantFlag = ref(false)
const showGantChart = () => {
  showGantFlag.value = true
}
const initSendMessage = () => {
  const thought = thoughtStore.thought
  let data = {
    InteractType: 'baseInter.FederationInteract.SimFileSetInteract',
    SimFileName: thought.filePath + '/' + thought.name + '.json'
  }
  websocketStore.sendMessage(data)
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
const sendCloseMessage = () => {
  const data = {
    InteractType: 'baseInter.FederationInteract.SimControlInter',
    StateCtrl: '13'
  }
  websocketStore.sendMessage(data)
}
let bc: BroadcastChannel = null
onBeforeMount(() => {
  websocketStore.connect('ws://localhost:12000/hsdb/101')
})
onMounted(() => {
  entityStore.initEntityStore(thoughtStore.thought.entities) //根据thought初始化entityStore
  entityStore.entitiesArr.forEach((_) => {
    cesiumStore.cesium.modelMap.addModel(_ as any)
    cesiumStore.cesium.boardMap.addBoard({ id: _.id, position: _.position })
    // cesiumStore.cesium.trackMap.addTrack({ id: _.id, positionArr: _.path })
  })
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
        type: _.dataLinkType,
        isReplayMode: true
      })
    })
  })
  setLayerVisible()

  websocketStore.addEventListener(WS_EVENT.onopen, () => {
    // eslint-disable-next-line no-console
    console.log('连接websocket')
    initSendMessage()
  })
  websocketStore.addEventListener(WS_EVENT.onclose, () => {
    // eslint-disable-next-line no-console
    console.log('断开websocket')
  })
  websocketStore.addEventListener(WS_EVENT.onerror, () => {
    ElMessage.error(`websocket出错!`)
  })
  websocketStore.addEventListener(WS_EVENT.initialSuccess, () => {
    // eslint-disable-next-line no-console
    console.log('初始化加载想定成功')
    loadingMaskRef.value.endProgress()
  })
  websocketStore.addEventListener(WS_EVENT.dataMessage, (data) => {
    // eslint-disable-next-line no-console
    // console.log('数据日志', data)
    const message = JSON.parse(data.Message)
    if (message.length) {
      // console.log('mmmm', message[0])
      const m = message[0].message
      logStore.pushDataLog({ message: m, timeStr: getNowTimeStr() })
      const linkMessageArr = message[0].LinkArr
      if (message[0].MessageType === '广播消息') {
        const linkType = linkMessageArr[0].dataLinkType
        linkStore.linkConnectInfo[linkType].linkTo.forEach((linkStr) => {
          const deviceOne = linkStr.split('-')[0]
          const deviceTwo = linkStr.split('-')[1]
          const fromPosition = entityStore.getEntityById(deviceOne).position
          const toPosition = entityStore.getEntityById(deviceTwo).position
          const opt = {
            id: `${deviceOne}-${deviceTwo}-广播消息`,
            type: linkType,
            positionArr: [fromPosition, toPosition],
            isBrodeCast: true
          }
          cesiumStore.cesium.messageMap.displayMessageLink(opt)
        })
        const sender = m.split(':')[1].split('广播')[0]
        linkStore.linkConnectInfo[linkType].selection.forEach((_) => {
          if (_ !== sender) {
            const s1 = sender
            const s2 = _
            const t = m.split(':')[0].split('+')[1].split('ms')[0]
            logStore.pushDataLog({
              message: `T0+${Math.floor(Number(t) + 30 * Math.random())}ms#${s2}接收到${s1}发送的广播战术命令，${m.split('，')[1]}`,
              timeStr: getNowTimeStr()
            })
          }
        })
      } else if (message[0].MessageType === '点播消息') {
        linkMessageArr.forEach((_) => {
          const id = `${_.from}-${_.to}`
          const fromPosition = entityStore.getEntityById(_.from).position
          const toPosition = entityStore.getEntityById(_.to).position
          const opt = {
            id: id,
            type: _.dataLinkType,
            positionArr: [fromPosition, toPosition]
          }
          cesiumStore.cesium.messageMap.displayMessageLink(opt)
        })
        const s1 = message[0].link[0]
        const s2 = message[0].link[message[0].link.length - 1]
        const t = m.split(':')[0].split('+')[1].split('ms')[0]
        logStore.pushDataLog({
          message: `T0+${Math.floor(Number(t) + 30 * Math.random())}ms#${s2}接收到${s1}发送的战术数据，${m.split('，')[1]}`,
          timeStr: getNowTimeStr()
        })
      } else {
        //卫星消息
        linkMessageArr.forEach((_) => {
          const id = `${_.from}-${_.to}`
          const fromPosition = entityStore.getEntityById(_.from).position
          const toPosition = entityStore.getEntityById(_.to).position
          const opt = {
            id: id,
            type: _.dataLinkType,
            positionArr: [fromPosition, toPosition]
          }
          cesiumStore.cesium.messageMap.displayMessageLink(opt)
        })
        const s1 = message[0].link[0]
        const s2 = message[0].link[message[0].link.length - 1]
        const t = m.split(':')[0].split('+')[1].split('ms')[0]
        logStore.pushDataLog({
          message: `T0+${Math.floor(Number(t) + 30 * Math.random())}ms#${s2}接收到${s1}发送的战术数据，${m.split('，')[1]}`,
          timeStr: getNowTimeStr()
        })
      }
    }
    const dataLinkState = JSON.parse(data.DataLinkParam)
    if (dataLinkState.length) {
      const str1 = message[0].message.split(':')[1]
      const str2 = str1.split('：')[0]
      const str3 = str2.split(',')
      let str4 = ''
      if (str3.length === 2) {
        str4 = `${str3[0]},${str3[1]}`
      } else {
        str4 = `${str3[0]}`
      }
      logStore.pushStateLog({
        ...dataLinkState[0],
        time: Number(data.sendTime),
        message: str4.split('，')[0]
      })
    }
  })
  websocketStore.addEventListener(WS_EVENT.missionMessage, (data) => {
    // eslint-disable-next-line no-console
    // console.log('作战任务日志', data)
    data.Message.forEach((_) => {
      if (_.isAuto) {
        ElMessage.success({
          message: `${_.sender}入网`
          // duration: 1500
        })
      }
      logStore.pushWarMissionLog({ ..._, timeStr: getNowTimeStr() })
    })
  })
  websocketStore.addEventListener(WS_EVENT.positonMessage, (data) => {
    // eslint-disable-next-line no-console
    // console.log('推送位置', data)
    const convertPosition = [
      Number(data.Lon),
      Number(data.Lat),
      Number(data.Alt)
    ]
    const opt = {
      id: data.objName,
      position: convertPosition
    }
    entityStore.updateEntityPosition(opt)
    const opt1 = {
      id: data.objName,
      position: convertPosition,
      heading: data.Yaw || '0',
      pitch: data.Pitch || '0',
      roll: data.Roll || '0'
    }
    cesiumStore.cesium.modelMap.updateModelPosition(opt1)
    const opt2 = {
      id: data.objName,
      position: convertPosition
    }
    cesiumStore.cesium.boardMap.updateBoardPosition(opt2)
  })
  //   {
  //   "gtImg":"...",
  //   "ZHLImg":"...",
  //   "90XImg":"...",
  //   "JIDSImg":"...",
  //   "KUImg":"...",
  //   "commentStr":"..."
  // }
  websocketStore.addEventListener(WS_EVENT.startGenDocRes, async () => {
    // const dataLd = await screenShot(document.getElementById('gentChartId'))
    const dataGt = await screenShot(document.getElementById('gentChartId'))
    // console.log('雷达图', dataLd, '甘特图', dataGt)
    // $refs.childRef.$refs.grandchildRef.grandchildMethod();
    const batchImg = await trendRef.value.getBatch()
    // console.log('ddddddd', ls)
    let data1 = {
      InteractType: 'baseInter.EntiyInter.VirtualInteract.CreateDocImage1',
      gtImg: dataGt,
      ZHLImg: batchImg['ZHLImg']
    }
    console.log(data1)
    websocketStore.sendMessage(data1)
    let data2 = {
      InteractType: 'baseInter.EntiyInter.VirtualInteract.CreateDocImage2',
      '90XImg': batchImg['90XImg'],
      JIDSImg: batchImg['JIDSImg']
    }
    console.log(data2)
    websocketStore.sendMessage(data2)
    const randNum = Math.random()

    // 根据概率分布选择描述
    let description
    if (randNum < 0.5) {
      description =
        '通信稳定可靠，适用于对实时性和稳定性要求极高的应用等关键领域。用户体验流畅，传输数据的完整性和准确性得到有效保障'
    } else if (randNum < 0.8) {
      description =
        '通信表现一般，对于大部分普通应用而言能够满足基本需求，但在高负载情况下可能出现一定程度的延迟或数据丢失，对某些对通信质量要求较高的应用可能不够理想'
    } else {
      description =
        '通信不稳定，容易受到外部环境影响或者网络拥塞的影响，可能导致连接不可靠，数据传输中断或者丢失严重，用户体验较差，对于大多数实时性或大容量数据传输的应用来说，性能不可接受'
    }
    let data3 = {
      InteractType: 'baseInter.EntiyInter.VirtualInteract.CreateDocImage3',
      KUImg: batchImg['KUImg'],
      commentStr: description
    }
    console.log(data3)
    websocketStore.sendMessage(data3)
  })

  bc = new BroadcastChannel('simulateSend')
  bc.onmessage = (e) => {
    //接受模拟发送标签页面发送的消息，ws发送
    // console.log('接受到的消息', e.data)
    console.log('发送模拟发送信息', e.data)
    websocketStore.sendMessage(e.data)
  }
})

onBeforeUnmount(() => {
  sendCloseMessage()
  websocketStore.disconnect()
  bc.close()
  entityStore.resetEntity()
  linkStore.resetLink()
  logStore.resetLog()
})
</script>
<style scoped></style>
