/**
 * @description 存放作战日志，数据日志
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
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
export const useLogStore = defineStore('log', () => {
  const warMissionLog = ref<WarMissionLog[]>([]) //作战任务日志
  const dataLog = ref<DataLog[]>([]) //数据日志

  const pushWarMissionLog = (data) => {
    warMissionLog.value.push(data)
  }
  const pushDataLog = (data) => {
    dataLog.value.push(data)
  }
  return {
    warMissionLog,
    dataLog,
    pushWarMissionLog,
    pushDataLog
  }
})
