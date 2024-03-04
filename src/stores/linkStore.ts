/**
 * @description 数据链store，存放数据链链接信息
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LinkType } from '@/common/enum'
interface LinkInfo {
  targets: string[]
  mainDevice: string
}
interface ISetLinkArg {
  type: LinkType
  info: LinkInfo
}
export const useLinkStore = defineStore('link', () => {
  const linkConnectInfo = ref<Record<LinkType, LinkInfo>>({})
  const setLinkConnectInfo = (arg: ISetLinkArg) => {
    const { type, info } = arg
    linkConnectInfo.value[type] = info
  }
  return {
    linkConnectInfo,
    setLinkConnectInfo
  }
})
