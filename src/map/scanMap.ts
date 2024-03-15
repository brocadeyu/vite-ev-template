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
    let ellipseGeometry = new Cesium.EllipseGeometry({
      center: positionOnEllipsoid,
      semiMajorAxis: 300000.0,
      semiMinorAxis: 300000.0
    })
    let redCone = new Cesium.GeometryInstance({
      geometry: ellipseGeometry,
      modelMatrix: modelMatrix
    })
    let radar = this._collection.add(
      new Cesium.GroundPrimitive({
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
              vec3 hsb2rgb(vec3 hsb) {
                  float hue = hsb.x;
                  float saturation = hsb.y;
                  float brightness = hsb.z;
                  
                  float chroma = brightness * saturation;
                  float hueScaled = hue * 6.0;
                  float x = chroma * (1.0 - abs(mod(hueScaled, 2.0) - 1.0));
                  float m = brightness - chroma;
                  
                  vec3 rgb;
                  
                  if (hueScaled >= 0.0 && hueScaled < 1.0) {
                      rgb = vec3(chroma, x, 0.0);
                  } else if (hueScaled >= 1.0 && hueScaled < 2.0) {
                      rgb = vec3(x, chroma, 0.0);
                  } else if (hueScaled >= 2.0 && hueScaled < 3.0) {
                      rgb = vec3(0.0, chroma, x);
                  } else if (hueScaled >= 3.0 && hueScaled < 4.0) {
                      rgb = vec3(0.0, x, chroma);
                  } else if (hueScaled >= 4.0 && hueScaled < 5.0) {
                      rgb = vec3(x, 0.0, chroma);
                  } else {
                      rgb = vec3(chroma, 0.0, x);
                  }
                  
                  return rgb + vec3(m);
              }
              czm_material czm_getMaterial(czm_materialInput materialInput)
              {
              czm_material material = czm_getDefaultMaterial(materialInput);
              float sp = 1.0/repeat;
              vec2 st = materialInput.st;
              float dis1 = distance(st, vec2(0.5));
              vec2 iResolution = vec2(1.0,1.0);
              vec2 p = (2.0*st.xy-iResolution.xy)/iResolution.y;
              float time = fract(czm_frameNumber/100.0);//0=>1 1s
              float r = length(p) * 0.9;
	            vec3 color = hsb2rgb(vec3(0.24, 0.7, 0.4));
              float a = pow(r, 2.0);
              float b = sin(r * 0.8 - 1.6);
              float c = sin(r - 0.010);
              float s = sin(a - time * 3.0 + b) * c;
              color *= abs(1.0 / (s * 10.8)) - 0.01;
              if(dis1>0.4)discard;
	            vec4 fragColor = vec4(color, 1.);
              material.diffuse = color;
              material.alpha = 0.2;
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
  removeScanById(id) {
    const scan = this._map.get(id)
    if (scan) {
      this._collection.remove(scan)
    }
  }
  removeAllScan() {
    this._collection.removeAll()
    this._map = new Map()
  }
  setAllVisible(flag: boolean) {
    this._collection.show = flag
  }
}
