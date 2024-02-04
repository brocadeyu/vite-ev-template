import Entity from '@/class/entity'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useEntityStore = defineStore('entity', () => {
  const entities = ref(null)
  function initEntityStore(rawList?) {
    entities.value = {}
    rawList.forEach((_) => {
      const t = new Entity(_)
      entities.value[_.id] = t
    })
  }

  return { entities, initEntityStore }
})
