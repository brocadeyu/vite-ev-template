import type { Viewer } from 'cesium'
import { Cartesian3 } from 'cesium'
import { JulianDate } from 'cesium'
import * as Cesium from 'cesium'
export default class GlobalRotate {
  private viewer: Viewer = null
  private callback: () => void
  previousTime: any
  spinRate: 0.001
  constructor(_viewer: Viewer) {
    this.viewer = _viewer
    this.previousTime = Date.now()
  }
  public start() {
    // this.previousTime = Date.now()
    this.callback = () => {
      this.viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.001)
    }
    this.viewer.clock.onTick.addEventListener(this.callback)
    window.viewer = this.viewer
  }

  public stop() {
    this.viewer.clock.onTick.removeEventListener(this.callback)
  }
}
