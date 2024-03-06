/**
 * @description 公共弹窗
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
interface ISetMissionOpt {
  type: '动态' | '静态' | '导入'
  mission: any[]
}
export const useMissionStore = defineStore('mission', () => {
  const isGenFlag = ref(false) //是否生成标志，实际为是否显示，默认不显示，点击生成操作后，才会显示
  const isDirtyFlag = ref(false) //脏标志，当前计划是否为旧的
  const dynamicMission = ref([])
  const staticMission = ref([])
  const importMission = ref([])
  const setMissionByType = (opt: ISetMissionOpt) => {
    const { type, mission } = opt
    switch (type) {
      case '静态':
        staticMission.value = mission
        break
      case '动态':
        dynamicMission.value = mission
        break
      case '导入':
        break
    }
  }
  const getMission = () => {
    return {
      staticMission: staticMission.value,
      dynamicMission: dynamicMission.value
    }
  }
  return {
    isGenFlag,
    isDirtyFlag,
    dynamicMission,
    staticMission,
    importMission,
    setMissionByType,
    getMission
  }
})
