import { Viewer, PrimitiveCollection } from 'cesium'
import * as Cesium from 'cesium'

import FLIGHT from '@/assets/model/Mi171ZC.gltf'
import SHIP from '@/assets/model/052DQZJZC.gltf'
import { EntityType } from '@/enums/entity'

interface IAddModelOpt {
  position: number[]
  type: EntityType
  id: string
}
export default class ModelMap {
  _viewer: Viewer
  _collection: PrimitiveCollection
  _map: Map<string, any>
  constructor(viewer: Viewer) {
    this._viewer = viewer
    this._collection = new PrimitiveCollection()
    this._viewer.scene.primitives.add(this._collection)
    this._map = new Map()
  }
  getModelUrlByType(type: EntityType) {
    switch (type) {
      case '武装直升机':
        return FLIGHT
        break
      case '侦察直升机':
        return FLIGHT
        break
      case '中国052C型驱逐舰':
        return SHIP
        break
      case '中国052D型驱逐舰':
        return SHIP
        break
    }
  }
  addModel(opt: IAddModelOpt) {
    const { position, type, id } = opt
    const p = Cesium.Cartesian3.fromDegrees(
      position[0],
      position[1],
      position[2]
    )
    const headingPositionRoll = new Cesium.HeadingPitchRoll()
    const fixedFrameTransform =
      Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west')
    const modelUrl = this.getModelUrlByType(type)
    let model = Cesium.Model.fromGltf({
      url: modelUrl,
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
