import { Viewer } from 'cesium'
import GlobeImg from '@/assets/globe.jpg'
import ModelMap from './modelMap'
import MarkMap from './markMap'
import EventHandler from './eventHandler'
import TrackMap from './trackMap'
import LinkMap from './linkMap'
import GlobalRotate from './globeRotate'
import * as Cesium from 'cesium'
export default class CesiumMap {
  viewer: Viewer
  modelMap: ModelMap
  markMap: MarkMap
  trackMap: TrackMap
  linkMap: LinkMap
  eventHandler: EventHandler
  globeRoute: GlobalRotate
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
      }),
      showAnimate: true
    }
    this.viewer = new Viewer(container, opt)
    this.viewer.scene.globe.depthTestAgainstTerrain = false
    this.viewer.scene.debugShowFramesPerSecond = true
    this.viewer.scene.globe.enableLighting = true
    this.modelMap = new ModelMap(this.viewer)
    this.markMap = new MarkMap(this.viewer)
    this.trackMap = new TrackMap(this.viewer)
    this.linkMap = new LinkMap(this.viewer)
    this.globeRoute = new GlobalRotate(this.viewer)
    this.eventHandler = new EventHandler(this.viewer)
    this.addMapTiles()
    window.viewer = this.viewer
    return this
  }
  showAnimate() {
    return new Promise((resolve) => {
      this.viewer.camera.setView({
        destination: {
          x: -2775228.521737669,
          y: 6118815.6230553435,
          z: 2526085.2443369217
        } as any,
        orientation: {
          heading: 4.95312641800974,
          pitch: -0.16600374861841782,
          roll: 6.281036009973748
        }
      })
      setTimeout(() => {
        this.viewer.camera.flyTo({
          destination: {
            x: -2775228.521737669,
            y: 6118815.6230553435,
            z: 2526085.2443369217
          } as any,
          orientation: {
            heading: 4.953770358299834,
            pitch: -0.44044659744233394,
            roll: 6.2808419049263895
          },
          duration: 4
        })
        resolve()
      }, 500)
    })
  }
  addMapTiles() {
    const evLayerManager = new Cesium.EV_LayerManager(this.viewer.scene)
    evLayerManager.add({
      name: 'world_dem_800_mct_65', // 图层名称
      url: 'http://192.167.0.133:8088', // GIS-Server地址dddddddddddddddddddddddddddddd
      type: Cesium.EV_LayerType.DEM // 图层类型
      // tileType: imageData.tileType,                       //投影类型
      // queryParam: imageData.queryParam                    //请求参数
    })
    evLayerManager.add({
      name: '中国影像15米',
      url: 'http://192.167.0.133:8088',

      type: Cesium.EV_LayerType.IMAGE,
      tileType: Cesium.EV_TileAlgorithmType.WGS84,
      format: 'image/png',
      imageOption: {
        type: 'image',
        minLevel: 0,
        maxLevel: 20
      }
    })
  }
}
