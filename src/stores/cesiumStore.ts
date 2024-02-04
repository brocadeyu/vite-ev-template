import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import CesiumMap from '@/map/cesiumMap'
export const useCesiumStore = defineStore('cesium', () => {
  const cesium = shallowRef<CesiumMap>(null)
  const initCesiumStore = (element) => {
    const instance = new CesiumMap(element)
    cesium.value = instance
  }
  const resetCesium = () => {
    cesium.value = null
  }

  return { cesium, initCesiumStore, resetCesium }
})
