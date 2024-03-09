import type { Viewer } from 'cesium'
import * as Cesium from 'cesium'
export default class GlobalRotate {
  private viewer: Viewer = null
  private callback: () => void
  constructor(_viewer: Viewer) {
    this.viewer = _viewer
  }
  public start(rate: number = 0.01) {
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
