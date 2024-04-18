import { defineStore } from 'pinia'
import { ref } from 'vue'
interface MonitorItem {
  platName: string
  online: boolean
  updateTime: string
  devices: any
}
export const useMonitorStore = defineStore('monitor', () => {
  const monitorData = ref<MonitorItem[]>([])
  const setMonitorData = (data) => {
    monitorData.value = data
  }
  return {
    monitorData,
    setMonitorData
  }
})
