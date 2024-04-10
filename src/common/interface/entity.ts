import { EntityType } from '@/common/enum'
export interface IAddEntityOpt {
  id: string
  type: EntityType
  position: number[]
  path: any[]
  equipment: any[]
  params: any
}

/**
 * @description 实体
 */
export interface RawEntity {
  id: string
  Pos: number[]
  EntityMC: string
  EntityName: EntityType
  AntennaePower: string
  Behaviour: []
  Equipment: []
  Params: any
}
