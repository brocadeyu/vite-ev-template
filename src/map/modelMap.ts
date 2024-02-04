import { RawEntity } from '@/interface/thought'
import { Viewer, PrimitiveCollection } from 'cesium'
import * as Cesium from 'cesium'
import flightUrl from '@/assets/model/Mi171ZC.gltf'
export default class ModelMap {
  _viewer: Viewer
  _collection: PrimitiveCollection
  _map: Map
  constructor(viewer: Viewer) {
    this._viewer = viewer
    this._collection = new PrimitiveCollection()
    this._viewer.scene.primitives.add(this._collection)
    this._map = new Map()
  }
  getModelUrlByType(type: string) {
    switch (type) {
      case '武装直升机':
        break

      default:
        break
    }
  }
  addModel(opt: RawEntity) {
    const { position, id } = opt
    const p = Cesium.Cartesian3.fromDegrees(
      position[1],
      position[0],
      position[2]
    )
    const headingPositionRoll = new Cesium.HeadingPitchRoll()
    const fixedFrameTransform =
      Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west')

    let model = Cesium.Model.fromGltf({
      url: flightUrl,
      modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
        p,
        headingPositionRoll,
        Cesium.Ellipsoid.WGS84,
        fixedFrameTransform
      ),
      minimumPixelSize: 50,
      scale: 5,
      maximumScale: 800
    })
    this._collection.add(model)
    this._map.set(id, model)
  }
}
