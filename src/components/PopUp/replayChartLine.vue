<template>
  <BaseDocker
    :title="title"
    :show-footer="true"
    :height="'410px'"
    :width="'1000px'"
    :is-draggable="true"
  >
    <template #header>
      <div style="color: gray">
        链路：
        <el-select
          v-model="displayType"
          type="primary"
          color="#119aa0"
          size="small"
          style="width: 110px"
          @change="displaySelectionChange"
        >
          <el-option
            v-for="(item, index) in displayTypeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </template>
    <template #content>
      <div ref="lineChartRef" class="mission-content"></div>
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
const { dataLog, linkZHState, link90XState, linkJIDSState, linkKUState } =
  storeToRefs(logStore)
const lineChartRef = ref<HTMLElement>()
const displayType = ref('综合链')
const displayTypeOptions = [
  {
    label: '综合链',
    value: '综合链'
  },
  {
    label: '90X链',
    value: '90X链'
  },
  {
    label: 'JIDS链',
    value: 'JIDS链'
  },
  {
    label: 'KU卫通',
    value: 'KU卫通'
  }
]
let echartsInstance = null
withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: '' }
)

const closePopup = () => {
  popupStore._showLine = false
}
const initEcharts = () => {
  echartsInstance = echarts.init(lineChartRef.value)
}
const colors = ['#5470C6', '#91CC75', '#EE6666', '#1E7666']
// let now = new Date(1997, 9, 3)
// let oneDay = 24 * 3600 * 1000
// let value = Math.random() * 1000
// const randomData = () => {
//   now = new Date(+now + oneDay)
//   value = value + Math.random() * 21 - 10
//   return {
//     name: now.toString(),
//     value: [
//       [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
//       Math.round(value)
//     ]
//   }
// }
// for (var i = 0; i < 1000; i++) {
//   data.push(randomData())
// }
const displaySelectionChange = () => {
  setEchartsData()
}
const setEchartsData = () => {
  let data = []
  switch (displayType.value) {
    case '综合链':
      data = linkZHState.value
      break
    case '90X链':
      data = link90XState.value
      break
    case 'JIDS链':
      data = linkJIDSState.value
      break
    case 'KU卫通':
      data = linkKUState.value
      break
  }
  const option = {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          formatter: function (params) {
            if (params.axisDimension === 'y') {
              return `${Math.round(params.value)}`
            } else {
              return `T0+${params.value / 1000 || '0'}s`
            }
          },
          margin: 5
        }
      }
    },
    grid: {
      right: '20%'
    },
    legend: {
      data: ['时延', '带宽占用率', '丢包率', '速率']
    },
    xAxis: [
      {
        type: 'time',
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#7ec7ff',
          interval: 0,
          formatter: function (params) {
            // return params;
            // console.log(params)
            return `T0+${String(params / 1000)}s`
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '时延',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0]
          }
        },
        axisLabel: {
          formatter: '{value} ms'
        }
      },
      {
        type: 'value',
        name: '带宽占用率',
        position: 'right',
        alignTicks: true,
        offset: 80,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel: {
          formatter: '{value}%'
        }
      },
      {
        type: 'value',
        name: '丢包率',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2]
          }
        },
        axisLabel: {
          formatter: '{value}%'
        }
      },
      {
        type: 'value',
        name: '速率',
        offset: 50,
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[3]
          }
        },
        axisLabel: {
          formatter: '{value}kb/s'
        }
      }
    ],
    series: [
      {
        name: '时延',
        type: 'line',
        yAxisIndex: 0,
        showSymbol: false,
        smooth: true,
        data: data.map((_) => {
          return { name: _.time, value: [_.time, _.delay] }
        })
      },
      {
        name: '带宽占用率',
        type: 'line',
        yAxisIndex: 1,
        showSymbol: false,
        smooth: true,
        data: data.map((_) => {
          return { name: _.time, value: [_.time, _.missPercent] }
        })
      },
      {
        name: '丢包率',
        type: 'line',
        yAxisIndex: 2,
        showSymbol: false,
        smooth: true,
        data: data.map((_) => {
          return { name: _.time, value: [_.time, _.speed] }
        })
      },
      {
        name: '速率',
        type: 'line',
        yAxisIndex: 3,
        showSymbol: false,
        smooth: true,
        data: data.map((_) => {
          return { name: _.time, value: [_.time, _.speedPercent] }
        })
      }
    ]
  }
  echartsInstance?.setOption(option)
}
// let timer
// let t = 0

watch(
  dataLog,
  (newVal) => {
    console.log('newVVVVVVV', newVal)
    let data = []
    switch (displayType.value) {
      case '综合链':
        data = linkZHState.value
        break
      case '90X链':
        data = link90XState.value
        break
      case 'JIDS链':
        data = linkJIDSState.value
        break
      case 'KU卫通':
        data = linkKUState.value
        break
    }
    echartsInstance?.setOption({
      series: [
        {
          name: '时延',
          type: 'line',
          yAxisIndex: 0,
          data: data.map((_) => {
            return { name: _.time, value: [_.time, _.delay] }
          })
        },
        {
          name: '带宽占用率',
          type: 'line',
          yAxisIndex: 1,
          data: data.map((_) => {
            return { name: _.time, value: [_.time, _.missPercent] }
          })
        },
        {
          name: '丢包率',
          type: 'line',
          yAxisIndex: 2,
          data: data.map((_) => {
            return { name: _.time, value: [_.time, _.speed] }
          })
        },
        {
          name: '速率',
          type: 'line',
          yAxisIndex: 3,
          data: data.map((_) => {
            return { name: _.time, value: [_.time, _.speedPercent] }
          })
        }
      ]
    })
  },
  {
    immediate: true,
    deep: true
  }
)
onMounted(() => {
  initEcharts()
  setEchartsData()
  // timer = setInterval(() => {
  //   data.push({
  //     delay: 1 + 1 * Math.random(),
  //     missPercent: Math.random(),
  //     speed: 1 * Math.random(),
  //     speedPercent: Math.random(),
  //     time: t
  //   })
  //   t += 1000
  //   if (data.length > 20) {
  //     data.shift()
  //   }
  //   echartsInstance.setOption({
  //     series: [
  //       {
  //         name: '时延',
  //         type: 'line',
  //         yAxisIndex: 0,
  //         data: data.map((_) => {
  //           return { name: _.time, value: [_.time, _.delay] }
  //         })
  //       },
  //       {
  //         name: '带宽占用率',
  //         type: 'line',
  //         yAxisIndex: 1,
  //         data: data.map((_) => {
  //           return { name: _.time, value: [_.time, _.missPercent] }
  //         })
  //       },
  //       {
  //         name: '丢包率',
  //         type: 'line',
  //         yAxisIndex: 2,
  //         data: data.map((_) => {
  //           return { name: _.time, value: [_.time, _.speed] }
  //         })
  //       },
  //       {
  //         name: '速率',
  //         type: 'line',
  //         yAxisIndex: 3,
  //         data: data.map((_) => {
  //           return { name: _.time, value: [_.time, _.speedPercent] }
  //         })
  //       }
  //     ]
  //   })
  // }, 1000)
})
onBeforeUnmount(() => {
  // clearInterval(timer)
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
