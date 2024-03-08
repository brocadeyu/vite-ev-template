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
  public start(rate: number = 1) {
    this.callback = () => {
      this.viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, rate * 0.00007)
    }
    this.viewer.clock.onTick.addEventListener(this.callback)
  }
  public setRate(rate: number) {
    this.stop()
    this.start(rate)
  }

  public stop() {
    this.viewer.clock.onTick.removeEventListener(this.callback)
  }
}
