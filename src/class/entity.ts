import { RawEntity } from '@/interface/thought'

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
  type: string
  position: []
  path: []
  constructor(opt: RawEntity) {
    this.id = opt.id
    this.type = opt.EntityName
    this.position = opt.Pos
    // this.type = opt.type
  }
}
