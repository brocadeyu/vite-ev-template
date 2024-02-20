import { Viewer } from 'cesium'
import GlobeImg from '@/assets/globe.jpg'
import ModelMap from './modelMap'
import EventHandler from './eventHandler'
import * as Cesium from 'cesium'
export default class CesiumMap {
  viewer: Viewer
  modelMap: ModelMap
  eventHandler: EventHandler
  constructor(container: HTMLElement) {
    const opt = {
      mapProjection: new Cesium.GeographicProjection(),
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      selectionIndicator: false,
      sceneModePicker: false,
      timeline: false,
      navigationHelpButton: false,
      scene3DOnly: true,
      terrainProvider: new Cesium.EllipsoidTerrainProvider(),
      imageryProvider: new Cesium.SingleTileImageryProvider({
        credit: '底图',
        url: GlobeImg
      })
    }
    this.viewer = new Viewer(container, opt)
    this.viewer.scene.globe.depthTestAgainstTerrain = false
    this.viewer.scene.debugShowFramesPerSecond = true
    this.viewer.scene.globe.enableLighting = true
    this.showAnimate()
    this.modelMap = new ModelMap(this.viewer)
    this.eventHandler = new EventHandler(this.viewer)
    return this
  }
  showAnimate() {
    this.viewer.camera.setView({
      destination: {
        x: 286850313.5092089,
        y: -105350803.77203512,
        z: 236040672.12223575
      } as any,
      orientation: {
        heading: 6.187303349122516,
        pitch: -1.497708627296662,
        roll: 6.27872411448609
      }
    })
    setTimeout(() => {
      this.viewer.camera.flyTo({
        destination: {
          x: -6835837.089677762,
          y: 19280520.53515957,
          z: 9537996.04319683
        } as any,
        orientation: {
          heading: 6.203259646936969,
          pitch: -1.5004745514729665,
          roll: 6.281777930582315
        },
        duration: 1.5
      })
    }, 1000)
  }
}
