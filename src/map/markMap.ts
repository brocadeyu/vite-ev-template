import type { Viewer } from 'cesium'
import DynamicPoint from '@/class/dynamicPoint'
import MarkerPoint from '@/class/markerPoint'
export default class MarkMap {
  viewer: Viewer
  markPoint: MarkerPoint
  constructor(viewer: Viewer) {
    this.viewer = viewer
    this.markPoint = new MarkerPoint(viewer)
  }
  addDynamicPoint(opt) {
    const d = new DynamicPoint({ ...opt, viewer: this.viewer })
    d.addToMap()
    return d
  }
}