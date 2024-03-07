/**
 * @description 数据链store，存放数据链链接信息
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LinkType } from '@/common/enum'
interface LinkInfo {
  linkTo: string[]
  mainDevice: string
  selection: string[]
  targetDevices: any[]
}
// interface ISetLinkArg {
//   type: LinkType
//   info: LinkInfo
// }
export const useLinkStore = defineStore('link', () => {
  const linkConnectInfo = ref<Record<LinkType, LinkInfo>>({})
  const linklink = ref([])
  const setLinkConnectInfo = (type: LinkType, arg: LinkInfo) => {
    // const { type, info } = arg
    linkConnectInfo.value[type] = arg
  }
  const setLinkLinkInfo = (arg: any[]) => {
    linklink.value = arg
  }
  return {
    linkConnectInfo,
    setLinkConnectInfo,
    setLinkLinkInfo,
    linklink
  }
})
