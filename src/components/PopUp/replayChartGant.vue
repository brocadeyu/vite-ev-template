<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'410px'"
    :width="'600px'"
    :is-draggable="true"
  >
    <template #content>
      <div ref="gantChartRef" class="mission-content"></div>
    </template>
    <template #footer>
      <div class="foot-btns">
        <el-button
          type="primary"
          color="transparent"
          size="small"
          @click="closePopup"
          >关闭
        </el-button>
      </div>
    </template>
  </BaseDocker>
</template>

<script setup lang="ts">
import BaseDocker from '@/components/BaseDocker.vue'
import * as echarts from 'echarts'
import { usePopupStore } from '@/stores/popupStore'
import { useLogStore } from '@/stores/logStore'
import { storeToRefs } from 'pinia'
const popupStore = usePopupStore()
const logStore = useLogStore()
const { warMissionLog } = storeToRefs(logStore)
const gantChartRef = ref<HTMLElement>()
let echartsInstance = null
withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)
const closePopup = () => {
  popupStore._showGant = false
}
const initEcharts = () => {
  echartsInstance = echarts.init(gantChartRef.value)
}
const setEchartsData = () => {
  let deviceList, maxTime, data
  if (warMissionLog.value.length) {
    deviceList = [...new Set(warMissionLog.value.map((item) => item.sender))] //去重后设备列表
    maxTime = Math.max(
      ...warMissionLog.value.map((item) => {
        return item.timeT + 20
      })
    )
    data = warMissionLog.value.map((item) => {
      return {
        value: [
          deviceList.indexOf(item.sender),
          item.timeT,
          item.timeT + 20,
          item.message
        ],
        itemStyle: { color: '#1abc9c' }
      }
    })
    console.log('data=====', data, maxTime, deviceList)
  } else {
    deviceList = []
    maxTime = 20
    data = []
  }
  const option = {
    tooltip: {
      position: function (point, params, dom, rect, size) {
        // 固定在鼠标右上
        return [point[0] + 30, point[1] + 30]
      }
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        height: 10,
        bottom: 10,
        start: 0,
        end: 999,
        showDetail: false
      },
      {
        type: 'inside',
        id: 'insideX',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        start: 0,
        end: 30,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        zoomLock: true,
        width: 10,
        top: 30,
        right: 15,
        bottom: 30,
        start: 0,
        end: 80,
        handleSize: 0,
        showDetail: false
      },
      {
        type: 'inside',
        id: 'insideY',
        yAxisIndex: 0,
        start: 0,
        end: 10,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
      }
    ],
    grid: {
      // height: 300,
      // bottom: 100
      top: 20,
      right: 50,
      left: 80,
      bottom: 50
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: maxTime,
      scale: true,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      data: [...deviceList],
      type: 'category',
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: { show: false },
      min: 0,
      max: 5
    },
    series: [
      // 矩形
      {
        type: 'custom',
        renderItem: function (params, api) {
          // 数据格式 [2, 3, 4]
          // 2为y轴索引
          const categoryIndex = api.value(0)
          // 3,4为矩形起始 末尾坐标
          const start = api.coord([api.value(1), categoryIndex])
          const end = api.coord([api.value(2), categoryIndex])
          const height = api.size([0, 1])[1] * 0.2

          const rectShape = echarts.graphic.clipRectByRect(
            {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height
            },
            {
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height
            }
          )

          return (
            rectShape && {
              type: 'rect',
              transition: ['shape'],
              shape: rectShape,
              style: api.style()
            }
          )
        },
        yAxisIndex: 0,
        itemStyle: {
          opacity: 0.8
        },
        encode: {
          x: [-1] // 使其不受datazoom控制
        },
        data: data
      }
    ]
  }
  // const option = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //   },
  //   yAxis: {
  //     type: 'value'
  //   },
  //   series: [
  //     {
  //       data: [150, 230, 224, 218, 135, 147, 260],
  //       type: 'line'
  //     }
  //   ]
  // }
  echartsInstance.setOption(option)
}
onMounted(() => {
  initEcharts()
  setEchartsData()
})
</script>

<style scoped>
.foot-btns {
  display: flex;
  justify-content: flex-end;
  margin-right: 2px;
}
.mission-content {
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}
</style>
