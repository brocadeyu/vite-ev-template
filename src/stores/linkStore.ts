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
  const linkConnectInfo = ref<Record<LinkType, LinkInfo>>({
    综合链: {
      linkTo: [],
      mainDevice: [],
      selection: [],
      targetDevices: []
    },
    '90X链': {
      linkTo: [],
      mainDevice: [],
      selection: [],
      targetDevices: []
    },
    JIDS链: {
      linkTo: [],
      mainDevice: [],
      selection: [],
      targetDevices: []
    },
    KU卫通: {
      linkTo: [],
      mainDevice: [],
      selection: [],
      targetDevices: []
    }
  })
  const linklink = ref([])
  const setLinkConnectInfo = (type: LinkType, arg: LinkInfo) => {
    // const { type, info } = arg
    linkConnectInfo.value[type] = arg
  }
  const setLinkLinkInfo = (arg: any[]) => {
    linklink.value = arg
  }
  const resetLink = () => {
    linkConnectInfo.value = {
      综合链: {
        linkTo: [],
        mainDevice: [],
        selection: [],
        targetDevices: []
      },
      '90X链': {
        linkTo: [],
        mainDevice: [],
        selection: [],
        targetDevices: []
      },
      JIDS链: {
        linkTo: [],
        mainDevice: [],
        selection: [],
        targetDevices: []
      },
      KU卫通: {
        linkTo: [],
        mainDevice: [],
        selection: [],
        targetDevices: []
      }
    }
    linklink.value = []
  }
  return {
    linkConnectInfo,
    setLinkConnectInfo,
    setLinkLinkInfo,
    linklink,
    resetLink
  }
})
