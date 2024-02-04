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
  id: string
  Pos: number[]
  EntityMC: string
  EntityName: string
  AntennaePower: string
  Behaviour: []
  Equipment: []
}
