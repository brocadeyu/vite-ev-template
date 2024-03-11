import { Viewer, LabelCollection } from 'cesium'
interface IAddBoardOpt {
  id: string
  text: string
  position: number[]
}
interface IUpdateBoardOpt {
  id: string
  text: string
  position: number[]
}
export default class BoardMap {
  _viewer: Viewer
  _collection: LabelCollection
  _map: Map<string, any>
  constructor(viewer) {
    this._viewer = viewer
    this._collection = new LabelCollection()
    this._viewer.scene.primitives.add(this._collection)
    this._map = new Map()
  }
  addBoard(opt: IAddBoardOpt) {
    const { id, text, position } = opt
    const label = this._collection.add({
      text: id,
      position: Cesium.Cartesian3.fromDegrees(...position),
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      pixelOffset: new Cesium.Cartesian2(3.0, -50),

      font: '14pt Source Han Sans CN',
      showBackground: true,
      fillColor: new Cesium.Color.fromBytes(91, 211, 216, 255),
      backgroundColor: new Cesium.Color.fromBytes(11, 26, 57, 255)
    })
    this._map.set(id, label)
  }
  updateBoardPosition(opt: IUpdateBoardOpt) {
    const { id, position } = opt
    const label = this._map.get(id)
    if (label) {
      label.position = Cesium.Cartesian3.fromDegrees(...position)
    }
  }
  removeAllLabel() {
    this._collection.removeAll()
    this._map = new Map()
  }
}
