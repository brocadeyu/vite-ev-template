/**
 * @description 存放作战日志，数据日志
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LinkType } from '@/common/enum'
interface WarMissionLog {
  linkType: string
  message: string
  receiver: string
  sender: string
  timeT: number
  timeStr: string
}
interface DataLog {
  message: string
  time: string
  timeStr: string
}
interface LinkStateLog {
  delay: number
  missPercent: number
  speed: number
  speedPercent: number
  type: LinkType
  time: number
}
export const useLogStore = defineStore(
  'log',
  () => {
    const warMissionLog = ref<WarMissionLog[]>([]) //作战任务日志
    const dataLog = ref<DataLog[]>([]) //数据日志
    const linkZHState = ref<LinkStateLog>([]) //综合链状态日志
    const link90XState = ref<LinkStateLog>([]) //90X链状态日志
    const linkJIDSState = ref<LinkStateLog>([]) //JIDS链状态日志
    const linkKUState = ref<LinkStateLog>([]) //KU卫通状态日志

    const pushWarMissionLog = (data) => {
      warMissionLog.value.push(data)
    }
    const pushDataLog = (data) => {
      dataLog.value.push(data)
    }
    const pushStateLog = (data: LinkStateLog) => {
      console.log('ddddddddddd', data)
      switch (data.type) {
        case '综合链':
          linkZHState.value.push(data)
          break
        case '90X链':
          link90XState.value.push(data)
          break
        case 'JIDS链':
          linkJIDSState.value.push(data)
          break
        case 'KU卫通':
          linkKUState.value.push(data)
          break
      }
    }
    return {
      warMissionLog,
      dataLog,
      linkZHState,
      link90XState,
      linkJIDSState,
      linkKUState,
      pushWarMissionLog,
      pushDataLog,
      pushStateLog
    }
  },
  {
    // persist: true
  }
)
