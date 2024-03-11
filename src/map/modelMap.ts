import { Viewer, PrimitiveCollection } from 'cesium'
import * as Cesium from 'cesium'

import FLIGHT from '@/assets/model/Mi171ZC.gltf'
import SHIP from '@/assets/model/052DQZJZC.gltf'
import { EntityType } from '@/common/enum'

interface IAddModelOpt {
  position: number[]
  type: EntityType
  id: string
}
interface IRemoveModelOpt {
  id: string
}
interface IUpdateModelPosOpt {
  id: string
  position: number[]
  heading?: string
  pitch?: string
  roll?: string
}
export default class ModelMap {
  private _viewer: Viewer
  private _collection: PrimitiveCollection
  private _map: Map<string, any>
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
  async addModel(opt: IAddModelOpt) {
    return new Promise((resolve) => {
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
        maximumScale: 700,
        silhouetteColor: Cesium.Color.YELLOW,
        silhouetteSize: 3,
        colorBlendMode: Cesium.ColorBlendMode.REPLACE,
        color: Cesium.Color.RED
      })
      // console.log('构造promise')
      // model.readyPromise.then(() => {
      //   console.log('rrrrresolve')

      // })
      this._collection.add(model)
      this._map.set(id, model)
      resolve()
    })
  }
  updateModelPosition(opt: IUpdateModelPosOpt) {
    const { id, position, heading, pitch, roll } = opt
    let model = this._map.get(id)
    if (model) {
      const p = Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2]
      )
      let hpRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      let fixedFrame = Cesium.Transforms.localFrameToFixedFrameGenerator(
        'north',
        'west'
      )
      model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        p,
        hpRoll,
        Cesium.Ellipsoid.WGS84,
        fixedFrame,
        p
      )
    }
  }
  removeModel(opt: IRemoveModelOpt) {
    const { id } = opt
    const result = this._map.get(id)
    if (result) {
      this._collection.remove(result)
    }
  }
  setAllVisible(flag: boolean) {
    this._collection.show = flag
  }
  removeAllModel() {
    this._collection.removeAll()
  }
}
