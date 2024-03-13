import { Viewer, PrimitiveCollection } from 'cesium'
import * as Cesium from 'cesium'
interface IAddScanOpt {
  id: string
  position: number[][]
}
export default class ScanMap {
  private _viewer: Viewer
  private _collection: PrimitiveCollection
  private _map: Map<string, any>
  constructor(viewer: Viewer) {
    this._viewer = viewer
    this._collection = new PrimitiveCollection()
    this._viewer.scene.primitives.add(this._collection)
    this._map = new Map()
  }
  addScan(opt: IAddScanOpt) {
    const { id, position } = opt
    // 1.1 雷达的高度
    let length = position[2]
    let positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(
      position[0],
      position[1]
    )
    let modelMatrix = Cesium.Matrix4.multiplyByTranslation(
      Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid),
      new Cesium.Cartesian3(0.0, 0.0, length * 0.9),
      new Cesium.Matrix4()
    )

    let cylinderGeometry = new Cesium.CylinderGeometry({
      length: length * 0.2,
      topRadius: 0.0,
      bottomRadius: length * 200.0,
      vertexFormat:
        Cesium.MaterialAppearance.MaterialSupport.TEXTURED.vertexFormat
    })
    let redCone = new Cesium.GeometryInstance({
      geometry: cylinderGeometry,
      modelMatrix: modelMatrix
    })
    let radar = this._collection.add(
      new Cesium.Primitive({
        geometryInstances: [redCone],
        appearance: new Cesium.MaterialAppearance({
          material: new Cesium.Material({
            fabric: {
              type: 'VtxfShader1',
              uniforms: {
                color: new Cesium.Color(0.0, 1.0, 1.0, 0.5),
                repeat: 10.0,
                thickness: 0.3
              },
              source: `
              uniform vec4 color;
              uniform float repeat;
              uniform float thickness;
              czm_material czm_getMaterial(czm_materialInput materialInput)
              {
              czm_material material = czm_getDefaultMaterial(materialInput);
              float sp = 1.0/repeat;
              vec2 st = materialInput.st;
              float dis = distance(st, vec2(0.5));
              float time = fract(czm_frameNumber/100.0);//0=>1 1s
              float m = mod(dis - czm_frameNumber/3000.0, sp);
              //float a = step(sp*(1.0-thickness), m);
              float lineOuter = 1.0*time;
              float lineInner = 0.0;
              if(time >0.5){
              lineInner = 2.0*time -1.0;
              }
              float a;
              if(dis<lineOuter && dis>lineInner){
              a = 1.0;
              }else{
              a = 0.0;
              }
              //a = smoothstep(0.2,0.8,a);
              material.diffuse = color.rgb;
              material.alpha = a * color.a;
              return material;
                                
              }`
            },
            translucent: true
          }),
          faceForward: false,
          closed: true
        })
      })
    )
    this._map.set(id, radar)
  }
  removeAllScan() {
    this._collection.removeAll()
    this._map = new Map()
  }
}
