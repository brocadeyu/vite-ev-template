import { RawThought } from '@/common/interface/thought'
import { RawEntity } from '@/common/interface/entity'
export default class Thought {
  name: string
  time: string
  entities: RawEntity[]
  dataLinkInfo: any
  constructor(opt?: RawThought) {
    this.name = opt?.name || ''
    this.time = opt?.time || ''
    this.entities = opt?.jsonData.Entity || []
    this.dataLinkInfo = opt?.jsonData.DataLinkInfo || {}
  }
}
