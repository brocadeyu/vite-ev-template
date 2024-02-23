import { EntityType } from '@/enums/entity'
export interface IAddEntityOpt {
  id: string
  type: EntityType
  position: number[]
  path: any[]
  equipment: any[]
}
