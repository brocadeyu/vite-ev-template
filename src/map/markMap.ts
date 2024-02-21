import type { Viewer } from 'cesium'
import DynamicPoint from '@/class/dynamicPoint'
export default class MarkMap {
  viewer: Viewer
  constructor(viewer: Viewer) {
    this.viewer = viewer
  }
  addDynamicPoint(opt) {
    const d = new DynamicPoint({ ...opt, viewer: this.viewer })
    d.addToMap()
    return d
  }
}
