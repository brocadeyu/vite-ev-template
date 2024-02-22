import type { Viewer, ScreenSpaceEventHandler, Cartesian3 } from 'cesium'
interface EventParam {
  type: 'LeftClick' | 'LeftDoubleClick' | 'MouseMove'
  id: string
  callBack?: (
    e:
      | ScreenSpaceEventHandler.PositionedEventCallback
      | ScreenSpaceEventHandler.MotionEventCallback
      | ScreenSpaceEventHandler.WheelEventCallback
      | ScreenSpaceEventHandler.TwoPointEventCallback
      | ScreenSpaceEventHandler.TwoPointMotionEventCallback
  ) => void
}
interface EventItem {
  id: string
  fn: (
    e:
      | ScreenSpaceEventHandler.PositionedEventCallback
      | ScreenSpaceEventHandler.MotionEventCallback
      | ScreenSpaceEventHandler.WheelEventCallback
      | ScreenSpaceEventHandler.TwoPointEventCallback
      | ScreenSpaceEventHandler.TwoPointMotionEventCallback
  ) => void
}
import * as Cesium from 'cesium'
export default class EventHandler {
  viewer: Viewer
  _cesiumScreenHandler: ScreenSpaceEventHandler
  eventMap: Map<string, EventItem[]>
  _timer: null
  constructor(viewer: Viewer) {
    this.viewer = viewer
    this.eventMap = new Map()
    this._cesiumScreenHandler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene.canvas
    )
  }
  register(opt: EventParam) {
    const { type, id, callBack } = opt
    const eventType = this.getCesiumEventType(type)
    //未注册此类事件则注册监听
    if (!this.eventMap.get(eventType)) {
      this.eventMap.set(eventType, [])
      this._cesiumScreenHandler.setInputAction((e) => {
        if (this._timer) {
          clearTimeout(this._timer)
        }
        // console.log('eee', e)
        let param = e
        const worldCoords = this.screenCoordinate2World(
          e.position || e.endPosition
        )
        const cartoCoords = this.worldCoordinate2Carto(worldCoords)
        if (
          [
            Cesium.ScreenSpaceEventType.LEFT_CLICK,
            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
            Cesium.ScreenSpaceEventType.MOUSE_MOVE
          ].includes(eventType)
        ) {
          param = { position: cartoCoords }
        }
        if (eventType === Cesium.ScreenSpaceEventType.LEFT_CLICK) {
          this._timer = setTimeout(() => {
            this.eventMap.get(eventType).forEach((_) => {
              _.fn(param)
            })
          }, 200)
        } else {
          this.eventMap.get(eventType).forEach((_) => {
            _.fn(param)
          })
        }
      }, eventType)
    }
    const eventArr = this.eventMap.get(eventType)
    //移除同id监听事件，防止重复监听
    this.remove({ type, id })
    eventArr.push({ id, fn: callBack })
  }
  remove(opt: EventParam) {
    // console.log('remove', opt)
    const { type, id } = opt
    const eventType = this.getCesiumEventType(type)
    const eventArr = this.eventMap.get(eventType)
    // console.log('eventArr', eventArr)
    let index = eventArr.findIndex((_) => _.id === id)
    // console.log('index', index)
    if (index !== -1) {
      eventArr.splice(index, 1)
    }
  }
  getCesiumEventType(type) {
    switch (type) {
      case 'LeftClick':
        return Cesium.ScreenSpaceEventType.LEFT_CLICK
        break
      case 'LeftDoubleClick':
        return Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        break
      case 'MouseMove':
        return Cesium.ScreenSpaceEventType.MOUSE_MOVE
        break
    }
  }
  /**
   *@description 屏幕坐标转世界坐标
   */
  screenCoordinate2World(coord): Cartesian3 | undefined {
    return this.viewer.scene.globe.pick(
      this.viewer.camera.getPickRay(coord),
      this.viewer.scene
    )
  }
  /**
   * @description 世界坐标转地理坐标
   */
  worldCoordinate2Carto(cartesian): number[] | undefined {
    if (cartesian === undefined) return undefined
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
    const lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3)
    const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3)
    const height = cartographic.height
    return [Number(lng), Number(lat), height]
  }
}
