import { Viewer, PrimitiveCollection } from 'cesium'
import * as Cesium from 'cesium'
interface IAddTrackOpt {
  id: string
  positionArr: number[][]
}
export default class TrackMap {
  _viewer: Viewer
  _collection: PrimitiveCollection
  _map: Map<string, any>
  constructor(viewer: Viewer) {
    this._viewer = viewer
    this._collection = new PrimitiveCollection()
    this._viewer.scene.primitives.add(this._collection)
    this._map = new Map()
  }
  addTrack(opt: IAddTrackOpt) {
    const { id, positionArr } = opt
    const geometryInstance = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(
          positionArr.flat()
        ),
        width: 5,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
      })
    })

    // 材质图片，此处用的是图片的base64编码
    // 原图片地址：https://www.freeimg.cn/i/2023/12/11/65767ffac43f3.png
    const image =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAgCAYAAABkS8DlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADSSURBVHja7NYxEoUgDEDBYM39z2qHtZViwMFxt1FJnF/98ZXWWkRE7LWWOOt5Lsm9q/vsbu9Zdtazs/J19O5bs1XPZrwze/6V31zxbOZs1n905Wt2p3f25GzE7ohv6q3nLQCA3xEAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAA8g4AAAD//wMA4WEFTJOT5UIAAAAASUVORK5CYII='

    // 自定义材质
    const material = new Cesium.Material({
      translucent: true,
      fabric: {
        uniforms: {
          color: new Cesium.Color(1.0, 1.0, 1.0, 0.5),
          image: image,
          speed: 5
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

    const trackPrimitive = new Cesium.Primitive({
      geometryInstances: [geometryInstance],
      appearance: new Cesium.PolylineMaterialAppearance({
        material: material
      }),
      asynchronous: false
    })

    this._collection.add(trackPrimitive)
    this._map.set(id, trackPrimitive)
  }
  setAllVisible(flag: boolean) {
    this._collection.show = flag
  }
}
