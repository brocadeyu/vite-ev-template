import { EntityType } from '@/enums/entity'
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
