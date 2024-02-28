/**
 * @description 公共弹窗
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  IOpenAddEntityPopProps,
  IOpenEditEntityPopProps
} from '@/common/interface/popup'

interface IOpenPop {
  type: string
  title: string
  showMask?: boolean
  data?: IOpenAddEntityPopProps | IOpenEditEntityPopProps
}
export const usePopupStore = defineStore('popup', () => {
  const _showPop = ref(false)
  const _title = ref('')
  const _showMask = ref(false)
  const _data = ref(null)
  const _type = ref('')

  const openPop = (param: IOpenPop) => {
    const { title, data, showMask, type } = param
    _showPop.value = true
    _title.value = title
    _type.value = type
    if (showMask) {
      _showMask.value = true
    }
    _data.value = data
  }
  const closePop = () => {
    _showPop.value = false
    _title.value = ''
    _showMask.value = false
    _data.value = null
    _type.value = ''
  }
  return { _showPop, _showMask, _title, _data, _type, openPop, closePop }
})
