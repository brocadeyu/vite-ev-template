/**
 * @description 想定
 */
import { EntityType } from '@/common/enum'
import { RawEntity } from './entity'
export interface RawThought {
  name: string
  filepath: string
  jsonData: {
    DataLinkInfo: {
      link: []
      linklink: []
      mission: []
    }
    Entity: RawEntity[]
  }
  time: string
}
