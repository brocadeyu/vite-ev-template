import { RawThought } from '@/interface/thought'

export default class Thought {
  name: string
  time: string
  entities: string[]

  constructor(opt: RawThought) {
    this.name = opt.name
    this.time = opt.time
    this.entities = opt.jsonData.Entity
  }
}
