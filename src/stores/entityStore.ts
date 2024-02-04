import Entity from '@/class/entity'
import { RawEntity } from '@/interface/thought'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useEntityStore = defineStore('entity', () => {
  const entities = ref(null)
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

  return { entities, entitiesArr, initEntityStore, resetEntity }
})
