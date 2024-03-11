import { Viewer } from 'cesium'
import GlobeImg from '@/assets/globe.jpg'
import ModelMap from './modelMap'
import MarkMap from './markMap'
import EventHandler from './eventHandler'
import TrackMap from './trackMap'
import LinkMap from './linkMap'
import GlobalRotate from './globeRotate'
import MessageMap from './messageMap'
import BoardMap from './boardMap'
import * as Cesium from 'cesium'
export default class CesiumMap {
  viewer: Viewer
  modelMap: ModelMap
  markMap: MarkMap
  trackMap: TrackMap
  linkMap: LinkMap
  eventHandler: EventHandler
  globeRoute: GlobalRotate
  messageMap: MessageMap
  boardMap: BoardMap
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
      showAnimate: true
    }
    this.viewer = new Viewer(container, opt)
    let imageryProvider = new Cesium.SingleTileImageryProvider({
      url: GlobeImg
    })
    this.viewer.imageryLayers.addImageryProvider(imageryProvider)

    this.viewer.scene.globe.depthTestAgainstTerrain = false
    this.viewer.scene.globe.enableLighting = true
    this.modelMap = new ModelMap(this.viewer)
    this.markMap = new MarkMap(this.viewer)
    this.trackMap = new TrackMap(this.viewer)
    this.linkMap = new LinkMap(this.viewer)
    this.globeRoute = new GlobalRotate(this.viewer)
    this.eventHandler = new EventHandler(this.viewer)
    this.messageMap = new MessageMap(this.viewer)
    this.boardMap = new BoardMap(this.viewer)
    this.addMapTiles()
    window.viewer = this.viewer
    return this
  }
  setLookAt({ destination, orientation }) {
    this.viewer.camera.setView({
      destination: destination as any,
      orientation: orientation
    })
  }
  setFrameRateShow(flag: boolean) {
    this.viewer.scene.debugShowFramesPerSecond = flag
  }
  setAnimateTo({ destination, orientation, duration, delay }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.viewer.camera.flyTo({
          destination: destination as any,
          orientation: orientation,
          duration: duration
        })
        resolve()
      }, delay)
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
  clearLayerData() {
    this.linkMap.removeAllLink()
    this.modelMap.removeAllModel()
    this.trackMap.removeAllTrack()
    this.boardMap.removeAllLabel()
  }
}
