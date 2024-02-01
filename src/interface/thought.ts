/**
 * @description 想定
 */
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
/**
 * @description 实体
 */
export interface RawEntity {
  EntityMC: string
  AntennaePower: string
  Behaviour: []
  Equipment: []
}
