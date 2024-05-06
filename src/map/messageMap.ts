import { LinkType } from '@/common/enum'
import { Viewer, PrimitiveCollection } from 'cesium'
import * as Cesium from 'cesium'
//数据链通讯消息链路连线
interface DisplayMessageLinkOpt {
  id: string
  positionArr: number[][]
  type: LinkType
  isBrodeCast?: boolean //是否是广播消息，广播消息,链路闪烁
}
export default class MessageMap {
  private _viewer: Viewer
  private _collectionZHL: PrimitiveCollection
  private _collection90X: PrimitiveCollection
  private _collectionJIDS: PrimitiveCollection
  private _collectionKU: PrimitiveCollection
  constructor(viewer: Viewer) {
    this._viewer = viewer
    this._collectionZHL = new PrimitiveCollection()
    this._collection90X = new PrimitiveCollection()
    this._collectionJIDS = new PrimitiveCollection()
    this._collectionKU = new PrimitiveCollection()

    this._viewer.scene.primitives.add(this._collectionZHL)
    this._viewer.scene.primitives.add(this._collection90X)
    this._viewer.scene.primitives.add(this._collectionJIDS)
    this._viewer.scene.primitives.add(this._collectionKU)
  }
  displayMessageLink(opt: DisplayMessageLinkOpt) {
    const { positionArr, type, isBrodeCast } = opt
    // console.log('id, positionArr, type', id, positionArr, type)
    const geometryInstance = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(
          positionArr.flat()
        ),
        width: 3,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
      })
    })

    const material = this.getMaterialByType(type, isBrodeCast)
    // console.log('meterial', material)
    const linkPrimitive = new Cesium.Primitive({
      geometryInstances: [geometryInstance],
      appearance: new Cesium.PolylineMaterialAppearance({
        material: material
      }),
      asynchronous: false
    })
    this.getCollectionFromType(type).add(linkPrimitive)
    setTimeout(() => {
      this.getCollectionFromType(type).remove(linkPrimitive)
    }, 2500)
  }
  private getCollectionFromType(type: LinkType) {
    switch (type) {
      case '综合链':
        return this._collectionZHL
      case '90X链':
        return this._collection90X
      case 'JIDS链':
        return this._collectionJIDS
      case 'KU卫通':
        return this._collectionKU
    }
  }
  private getMaterialByType(type: LinkType, isBrodeCast) {
    if (isBrodeCast) {
      switch (type) {
        case '综合链':
          return Cesium.Material.fromType('Color', {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.8)
          })
        case '90X链':
          return Cesium.Material.fromType('Color', {
            color: new Cesium.Color(0.0, 1.0, 0.0, 0.8)
          })
        case 'JIDS链':
          return Cesium.Material.fromType('Color', {
            color: new Cesium.Color(0.0, 0.0, 1.0, 0.8)
          })
        case 'KU卫通':
          return Cesium.Material.fromType('Color', {
            color: new Cesium.Color(1.0, 1.0, 1.0, 0.8)
          })
      }
    } else {
      switch (type) {
        case '综合链':
          return this.getMaterialByColor([1.0, 0.0, 0.0, 0.5])
        case '90X链':
          return this.getMaterialByColor([0.0, 1.0, 0.0, 0.5])
        case 'JIDS链':
          return this.getMaterialByColor([0.0, 0.0, 1.0, 0.5])
        case 'KU卫通':
          return this.getMaterialByColor([1.0, 1.0, 1.0, 0.5])
      }
    }
  }
  private getMaterialByColor(color: number[]) {
    const image =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAgCAYAAABkS8DlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADSSURBVHja7NYxEoUgDEDBYM39z2qHtZViwMFxt1FJnF/98ZXWWkRE7LWWOOt5Lsm9q/vsbu9Zdtazs/J19O5bs1XPZrwze/6V31zxbOZs1n905Wt2p3f25GzE7ohv6q3nLQCA3xEAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAA8g4AAAD//wMA4WEFTJOT5UIAAAAASUVORK5CYII='

    return new Cesium.Material({
      translucent: true,
      fabric: {
        uniforms: {
          color: new Cesium.Color(...color),
          image: image,
          speed: 6
        },
        source: `
            czm_material czm_getMaterial(czm_materialInput materialInput) {
              czm_material material = czm_getDefaultMaterial(materialInput);
              vec2 st = materialInput.st;
              float st_map_s = fract(st.s - speed * czm_frameNumber * 0.001);
              vec4 colorImage = texture(image, vec2(st_map_s, st.t));
              vec4 fragColor;
              fragColor.rgb = color.rgb / 1.0;
              material.alpha = colorImage.a * color.a;
              material.diffuse = fragColor.rgb;
              material.emission = fragColor.rgb;
              return material;
            }
          `
      }
    })
  }
}
