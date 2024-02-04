import { RawThought } from '@/interface/thought'
import { RawEntity } from '@/interface/thought'
export default class Thought {
  name: string
  time: string
  entities: RawEntity[]

  constructor(opt?: RawThought) {
    this.name = opt?.name || ''
    this.time = opt?.time || ''
    this.entities = opt?.jsonData.Entity || []
  }
}
