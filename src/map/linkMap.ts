import { Viewer, PrimitiveCollection, Primitive } from 'cesium'
import { LinkType } from '@/common/enum'
import * as Cesium from 'cesium'
interface IAddLinkOpt {
  id: string //`device1-device2`
  positionArr: number[][]
  type: LinkType
  isReplayMode?: boolean //是否为回放模式，回放模式使用浅色直线连接
}
interface IRemoveLinkOpt {
  id: string
}

interface ISetVisibleTypeOpt {
  type: LinkType
  flag: boolean
}
interface ISetVisibleByIdOpt {
  id: string
  flag: boolean
}
/**
 * @description 存放链连线
 */
export default class LinkMap {
  private _viewer: Viewer
  private _collection: PrimitiveCollection
  private _map: Map<string, Primitive>
  private _Zmap: Map<string, Primitive>
  private _9map: Map<string, Primitive>
  private _Jmap: Map<string, Primitive>
  constructor(viewer: Viewer) {
    this._viewer = viewer
    this._collection = new PrimitiveCollection()
    this._viewer.scene.primitives.add(this._collection)
    this._map = new Map()
    this._Zmap = new Map()
    this._9map = new Map()
    this._Jmap = new Map()
  }
  addLink(opt: IAddLinkOpt) {
    const { id, positionArr, type, isReplayMode } = opt
    const geometryInstance = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(
          positionArr.flat()
        ),
        width: 3,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
      })
    })

    const material = this.getMaterialByType(type, isReplayMode)
    const linkPrimitive = new Cesium.Primitive({
      geometryInstances: [geometryInstance],
      appearance: new Cesium.PolylineMaterialAppearance({
        material: material
      }),
      asynchronous: false
    })

    this._collection.add(linkPrimitive)
    this._map.set(id, linkPrimitive)
    const typeMap = this.getCacheFromType(type)
    typeMap.set(id, linkPrimitive)
  }
  private getCacheFromType(type: LinkType) {
    switch (type) {
      case '综合链':
        return this._Zmap
      case '90X链':
        return this._9map
      case 'JIDS链':
        return this._Jmap
    }
  }
  private getMaterialByType(type: LinkType, isReplayMode) {
    if (isReplayMode) {
      switch (type) {
        case '综合链':
          return Cesium.Material.fromType('Color', {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.2)
          })
        case '90X链':
          return Cesium.Material.fromType('Color', {
            color: new Cesium.Color(0.0, 1.0, 0.0, 0.2)
          })
        case 'JIDS链':
          return Cesium.Material.fromType('Color', {
            color: new Cesium.Color(0.0, 0.0, 1.0, 0.2)
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
          speed: 3
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
  setVisibleByType(opt: ISetVisibleTypeOpt) {
    const { type, flag } = opt
    const typeMap = this.getCacheFromType(type)
    typeMap.forEach((_: Primitive) => {
      _.show = flag
    })
  }
  setVisibleById(opt: ISetVisibleByIdOpt) {
    const { id, flag } = opt
    const result = this._map.get(id)
    if (result) {
      result.show = flag
    }
  }
  setVisibleAllId() {
    this._map.forEach((_) => {
      _.show = true
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
  removeAllLink() {
    this._collection.removeAll()
    this._map = new Map()
    this._Zmap = new Map()
    this._Jmap = new Map()
    this._9map = new Map()
  }
}
