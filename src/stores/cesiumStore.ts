import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import CesiumMap from '@/map/cesiumMap'
export const useCesiumStore = defineStore('cesium', () => {
  const cesium = shallowRef(null)
  function initCesiumStore(element) {
    const instance = new CesiumMap(element)
    cesium.value = instance
  }

  return { cesium, initCesiumStore }
})
