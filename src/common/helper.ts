import { EntityType } from '@/common/enum'
import WZImg from '@/assets/model/wzzsj.png'
import ZCImg from '@/assets/model/zczsj.png'
import SHIP052C from '@/assets/model/052c.png'
import SHIP052D from '@/assets/model/052d.png'
export const getEntityImgByType: (type: EntityType) => string = (type) => {
  switch (type) {
    case '武装直升机':
      return WZImg
      break
    case '侦察直升机':
      return ZCImg
      break
    case '中国052C型驱逐舰':
      return SHIP052C
      break
    case '中国052D型驱逐舰':
      return SHIP052D
      break
  }
}

// 判断两个数组是否相等的函数
export function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    console.log('数组长度不相同')
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
      return false
    }
  }
  return true
}
