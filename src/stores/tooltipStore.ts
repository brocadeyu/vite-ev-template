/**
 * @description 公共tooltip
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
interface IShowToolTip {
  text: string
}
export const useToolTipStore = defineStore('tooltip', () => {
  const _isShowToolTip = ref(false)
  const _text = ref('')

  const showTooltip = (param: IShowToolTip) => {
    const { text } = param
    _isShowToolTip.value = true
    _text.value = text
  }
  const closeToolTip = () => {
    _isShowToolTip.value = false
    _text.value = ''
  }
  return { showTooltip, closeToolTip, _text, _isShowToolTip }
})
