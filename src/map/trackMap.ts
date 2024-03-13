import { Viewer, PrimitiveCollection } from 'cesium'
import * as Cesium from 'cesium'
interface IAddTrackOpt {
  id: string
  positionArr: number[][]
}
interface IRemoveTrackOpt {
  id: string
}
export default class TrackMap {
  private _viewer: Viewer
  private _collection: PrimitiveCollection
  private _map: Map<string, any>
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
        width: 3,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
      })
    })

    // 材质图片，此处用的是图片的base64编码
    // 原图片地址：https://www.freeimg.cn/i/2023/12/11/65767ffac43f3.png
    const image =
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAGRFS1hLP2RYUVhxamR3lvqjloqKlv/b57X6////////////////////////////////////////////////////2wBDAWpxcZaDlv+jo///////////////////////////////////////////////////////////////////////////wAARCABjA/IDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIBA//EAB0QAQEBAQADAQEBAAAAAAAAAAABEQISIUFhMVH/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAHBEBAQEBAQEBAQEAAAAAAAAAAAERAhJBIVEx/9oADAMBAAIRAxEAPwDoBZsAHP2bVxj26DntNph7dBz2ukuwxZ1oAjQAAJ6lidq4xesdBz2m0w9ug57Vc35TFnWqARoAAGWbEe1xm3HQc9ptMT26DntNph7dAl2CNgAAJ6lgluKHPabVxn26DntNph7dBPN+VSNS6ACgMs2A0c9ptXGPboOe02mH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'
    // 自定义材质
    const material = new Cesium.Material({
      translucent: true,
      fabric: {
        uniforms: {
          color: new Cesium.Color(1.0, 1.0, 1.0, 0.5),
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
              material.alpha = colorImage.a;
              material.diffuse = colorImage.rgb;
              //material.emission = colorImage.rgb;
              return material;
            }
          `
      }
    })

    const trackPrimitive = new Cesium.Primitive({
      geometryInstances: [geometryInstance],
      appearance: new Cesium.PolylineMaterialAppearance({
        material: material
        // material: Cesium.Material.fromType('PolylineGlow', {
        //   color: Cesium.Color.YELLOW,
        //   glowPower: 0.2,
        //   taperPower: 1.0
        // })
      }),
      asynchronous: false
    })

    this._collection.add(trackPrimitive)
    this._map.set(id, trackPrimitive)
  }
  setAllVisible(flag: boolean) {
    this._collection.show = flag
  }
  removeTrack(opt: IRemoveTrackOpt) {
    const { id } = opt
    const result = this._map.get(id)
    if (result) {
      this._collection.remove(result)
    }
  }
  removeAllTrack() {
    this._collection.removeAll()
  }
}
