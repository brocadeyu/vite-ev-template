import { RawEntity } from '@/common/interface/entity'
import { IAddEntityOpt } from '@/common/interface/entity'
import WZImg from '@/assets/model/wzzsj.png'
import ZCImg from '@/assets/model/zczsj.png'
import SHIP052C from '@/assets/model/052c.png'
import SHIP052D from '@/assets/model/052d.png'
import { EntityType } from '@/common/enum'
/**
 * @description 实体
 * @id id {string}
 * @type 类型(武装直升机/船)
 * @position 位置[]
 * @path 轨迹
 * @equipment 装(xxx电台)
 */
export default class Entity {
  id: string
  type: EntityType
  position: []
  path: []
  equipment: []
  constructor(opt: IAddEntityOpt) {
    const { id, type, position, path, equipment } = opt
    this.id = id
    this.type = type
    this.position = position
    this.path = path
    this.equipment = equipment
  }
  getEntityImg(): string {
    switch (this.type) {
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
}
