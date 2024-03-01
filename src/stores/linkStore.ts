/**
 * @description 数据链store，存放数据链链接信息
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
interface LinkInfo {
  targets: string[]
  mainDevice: string
}
export const useLinkStore = defineStore('link', () => {
  const linkConnectInfo = ref<Record<string, LinkInfo>>({})
  const setLinkConnectInfo = (arg: string[]) => {
    linkConnectInfo.value = arg
  }
  return {
    linkConnectInfo,
    setLinkConnectInfo
  }
})
