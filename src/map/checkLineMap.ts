import { Viewer, PrimitiveCollection, Primitive } from 'cesium'

interface IAddCheckOpt {
  id: string //`device1-device2`
  positionArr: number[][]
}
/**
 * @description 数据链校验连线
 */
export default class CheckLineMap {
  private _viewer: Viewer
  private _collection: PrimitiveCollection
  private _map: Map<string, Primitive>
  constructor(viewer: Viewer) {
    this._viewer = viewer
    this._collection = new PrimitiveCollection()
    this._viewer.scene.primitives.add(this._collection)
    this._map = new Map()
  }
  addCheckLine(opt: IAddCheckOpt) {
    const { id, positionArr } = opt
    const geometryInstance = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(
          positionArr.flat()
        ),
        width: 3,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
      })
    })
    const linkPrimitive = new Cesium.Primitive({
      geometryInstances: [geometryInstance],
      appearance: new Cesium.PolylineMaterialAppearance({
        material: Cesium.Material.fromType('Color', {
          color: new Cesium.Color(0.0, 0.0, 0.0, 1.0)
        })
      }),
      asynchronous: false
    })

    this._collection.add(linkPrimitive)
    this._map.set(id, linkPrimitive)
  }
  setVisibleByType(opt: any) {
    const { flag } = opt
    this.map.forEach((_: Primitive) => {
      _.show = flag
    })
  }
  setAllVisible(flag: boolean) {
    this._collection.show = flag
  }
  removeLink(opt: IRemoveLinkOpt) {
    const { id } = opt
    const result = this._map.get(id)
    if (result) {
      this._collection.remove(result)
    }
  }
  removeAllCheckLine() {
    this._collection.removeAll()
    this._map = new Map()
  }
}
