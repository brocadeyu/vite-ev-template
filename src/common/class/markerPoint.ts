import type { CustomDataSource, Viewer } from 'cesium'
import * as Cesium from 'cesium'
import LocateImg from '@/assets/locate.png'
export default class MarkerPoint {
  viewer: Viewer
  collection: CustomDataSource
  constructor(viewer: Viewer) {
    this.viewer = viewer
    this.collection = new Cesium.CustomDataSource('markPoint')
    this.viewer.dataSources.add(this.collection)
  }
  addItem(opt) {
    const { position } = opt
    return this.collection.entities.add({
      position: Cesium.Cartesian3.fromDegrees(position[0], position[1]),
      billboard: {
        image: LocateImg,
        width: 42,
        height: 40,
        scale: 1.0,
        pixelOffset: new Cesium.Cartesian2(0, -15),
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    })
  }
  remove(item) {
    const result = this.collection.entities.contains(item)
    if (result) {
      this.collection.entities.remove(item)
    }
  }
  updatePosition(opt) {
    const { position, item } = opt
    item.position = Cesium.Cartesian3.fromDegrees(position[0], position[1])
  }
}
