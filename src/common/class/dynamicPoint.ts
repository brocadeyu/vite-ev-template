/* eslint-disable camelcase */
import * as Cesium from 'cesium'
import type { Viewer } from 'cesium'
import DynamicPointShader from '@/shaders/DynamicPoint.glsl'
export default class DynamicPoint {
  _instance: any
  viewer: Viewer
  constructor(opt: {
    viewer: Viewer
    cartographicCenter
    maxRadius
    scanColor
    duration
  }) {
    const { viewer, cartographicCenter, maxRadius, scanColor } = opt
    this.viewer = viewer
    const _Cartesian3Center =
      Cesium.Cartographic.toCartesian(cartographicCenter)
    const _Cartesian4Center = new Cesium.Cartesian4(
      _Cartesian3Center.x,
      _Cartesian3Center.y,
      _Cartesian3Center.z,
      1
    )
    const _CartograhpicCenter1 = new Cesium.Cartographic(
      cartographicCenter.longitude,
      cartographicCenter.latitude,
      cartographicCenter.height + 500
    )
    const _Cartesian3Center1 =
      Cesium.Cartographic.toCartesian(_CartograhpicCenter1)
    const _Cartesian4Center1 = new Cesium.Cartesian4(
      _Cartesian3Center1.x,
      _Cartesian3Center1.y,
      _Cartesian3Center1.z,
      1
    )
    const _scratchCartesian4Center = new Cesium.Cartesian4()
    const _scratchCartesian4Center1 = new Cesium.Cartesian4()
    const _scratchCartesian3Normal = new Cesium.Cartesian3()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    this._instance = new Cesium.PostProcessStage({
      fragmentShader: DynamicPointShader,
      uniforms: {
        u_scanCenterEC: function () {
          const temp = Cesium.Matrix4.multiplyByVector(
            _this.viewer.camera._viewMatrix,
            _Cartesian4Center,
            _scratchCartesian4Center
          )
          return temp
        },
        u_scanPlaneNormalEC: function () {
          const temp = Cesium.Matrix4.multiplyByVector(
            _this.viewer.camera._viewMatrix,
            _Cartesian4Center,
            _scratchCartesian4Center
          )
          const temp1 = Cesium.Matrix4.multiplyByVector(
            _this.viewer.camera._viewMatrix,
            _Cartesian4Center1,
            _scratchCartesian4Center1
          )
          _scratchCartesian3Normal.x = temp1.x - temp.x
          _scratchCartesian3Normal.y = temp1.y - temp.y
          _scratchCartesian3Normal.z = temp1.z - temp.z
          Cesium.Cartesian3.normalize(
            _scratchCartesian3Normal,
            _scratchCartesian3Normal
          )
          return _scratchCartesian3Normal
        },
        u_radius: function () {
          return maxRadius
        },
        u_scanColor: scanColor
      }
    })
    return this
  }
  addToMap() {
    this.viewer.scene.postProcessStages.add(this._instance)
  }
  destroy() {
    this.viewer.scene.postProcessStages.remove(this._instance)
  }
}
