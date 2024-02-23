import Entity from '@/class/entity'
import { RawEntity } from '@/interface/thought'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IAddEntityOpt } from '@/interface/entity'
export const useEntityStore = defineStore('entity', () => {
  const entities = ref({})
  const initEntityStore = (rawList?: RawEntity[]) => {
    entities.value = {}
    rawList.forEach((_) => {
      const t = new Entity(_)
      entities.value[_.id] = t
    })
  }
  const resetEntity = () => {
    entities.value = {}
  }
  const entitiesArr = computed(() => {
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
