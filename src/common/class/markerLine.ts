import type { Viewer } from 'cesium'
import * as Cesium from 'cesium'
export default class MarkerLine {
  viewer: Viewer
  redLine: any
  linePositionArr: [] = []
  pointerPosition: [] = []
  constructor(viewer: Viewer, position: Array) {
    this.linePositionArr = position
    this.pointerPosition = [
      this.linePositionArr[this.linePositionArr.length - 2],
      this.linePositionArr[this.linePositionArr.length - 1]
    ]
    this.viewer = viewer
    this.redLine = viewer.entities.add({
      polyline: {
        // This callback updates positions each frame.
        positions: new Cesium.CallbackProperty(() => {
          return Cesium.Cartesian3.fromDegreesArray(
            [...this.linePositionArr, ...this.pointerPosition],
            Cesium.Ellipsoid.WGS84
          )
        }, false),
        width: 5,
        material: Cesium.Color.RED
      }
    })
    return this
  }
  /**
   * @description 更新线数据
   * @param p
   */
  updateLinePosition(p) {
    this.linePositionArr = p
    if (p.length === 2) {
      this.pointerPosition = [p[p.length - 2], p[p.length - 1]]
    }
  }
  /**
   * @description 更新鼠标地理位置
   * @param p
   */
  updatePointerPosition(p) {
    this.pointerPosition = p
  }
  destroy() {
    this.viewer.entities.remove(this.redLine)
  }
}
