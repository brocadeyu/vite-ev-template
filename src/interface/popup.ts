import { EntityType } from '@/enums/entity'

export interface IOpenAddEntityPopProps {
  position: number[]
  type: EntityType
}

export interface IOpenEditEntityPopProps {
  name: string
  position: number[]
  type: EntityType
  path: any
  equipment: []
}
