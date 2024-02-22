import type { Viewer } from 'cesium'
import * as Cesium from 'cesium'
export default class MarkerLine {
  viewer: Viewer
  redLine: any
  // position: Array
  p: [] = []
  pointerPosition: [] = []
  constructor(viewer: Viewer, position: Array) {
    this.p = position
    // console.log('position', position, [
    //   ...this.p,
    //   ...(this.pointerPosition.length
    //     ? this.pointerPosition
    //     : [position[position.length - 2], position[position.length - 1]])
    // ])
    // setInterval(() => {
    //   console.log(this.p.length)
    // }, 2000)

    this.redLine = viewer.entities.add({
      polyline: {
        // This callback updates positions each frame.
        positions: new Cesium.CallbackProperty(() => {
          return Cesium.Cartesian3.fromDegreesArray(
            [
              ...this.p,
              ...(this.pointerPosition.length
                ? this.pointerPosition
                : [this.p[this.p.length - 2], this.p[this.p.length - 1]])
            ],
            Cesium.Ellipsoid.WGS84
          )
        }, false),
        width: 5,
        material: Cesium.Color.RED
      }
    })
    return this
  }
  update(position) {
    this.redLine.polyline.positions = Cesium.Cartesian3.fromDegreesArray(
      position,
      Cesium.Ellipsoid.WGS84
    )
    console.log(this.redLine)
  }
  destroy() {}
}
