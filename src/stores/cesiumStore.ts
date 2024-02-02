import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
export const useCesiumStore = defineStore('cesium', () => {
  const cesium = shallowRef(null)
  function initCesiumStore(c) {
    cesium.value = c
  }

  return { cesium, initCesiumStore }
})
