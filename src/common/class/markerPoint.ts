import type { CustomDataSource, Viewer } from 'cesium'
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
        width: 40,
        height: 43,
        scale: 0.8,
        pixelOffset: new Cesium.Cartesian2(0, -10),
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
