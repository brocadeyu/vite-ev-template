import Entity from '@/class/entity'
import { RawEntity } from '@/common/interface/thought'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IAddEntityOpt } from '@/common/interface/entity'
export const useEntityStore = defineStore('entity', () => {
  const entities = ref({})
  const initEntityStore = (rawList?: RawEntity[]) => {
    entities.value = {}
    rawList.forEach((_) => {
      const convertPath = _.Behaviour[0].Points.map((_) => {
        return [_[0], _[1], _[2]]
      }) //根据原始格式转换格式
      const opt: IAddEntityOpt = {
        id: _.EntityMC,
        type: _.EntityName,
        position: [_.Pos[1], _.Pos[0], _.Pos[2]],
        equipment: _.Equipment,
        path: convertPath
      }
      const t = new Entity(opt)
      entities.value[_.id] = t
    })
  }
  const resetEntity = () => {
    entities.value = {}
  }
  const entitiesArr: Entity[] = computed(() => {
    return Object.values(entities.value)
  })
  const addEntity = (opt: IAddEntityOpt) => {
    const t = new Entity(opt)
    entities.value[opt.id] = t
  }
  const getEntityById: (id: string) => Entity = (id) => {
    return entities.value[id]
  }
  const removeEntityById = (id: string) => {
    const target = entities.value[id]
    if (target) {
      delete entities.value[id]
    }
  }

  return {
    entities,
    entitiesArr,
    initEntityStore,
    resetEntity,
    addEntity,
    removeEntityById,
    getEntityById
  }
})
