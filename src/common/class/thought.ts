import { RawThought } from '@/common/interface/thought'
import { RawEntity } from '@/common/interface/entity'
export default class Thought {
  name: string
  createTime: string
  lastEditTime: string
  id: number
  entities: RawEntity[]
  dataLinkInfo: any
  filePath: string
  constructor(opt?: RawThought) {
    this.name = opt?.name || ''
    this.createTime = opt?.jsonData.createTime || ''
    this.lastEditTime = opt?.jsonData.lastEditTime || ''
    this.id = opt?.id || 0
    this.entities = opt?.jsonData.Entity || []
    this.dataLinkInfo = opt?.jsonData.DataLinkInfo || {}
    this.filePath = opt?.filepath || ''
  }
}
