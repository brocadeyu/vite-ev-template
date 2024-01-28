/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.96
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["exports","./Matrix4-097242f7","./Cartesian3-2da9bb0a","./ComponentDatatype-322827fe","./Check-d82b20f7","./defaultValue-4607806f","./DeveloperError-46384437","./Math-6bc63320","./Matrix2-b01495ef"],(function(t,e,n,o,a,r,c,s,u){"use strict";const i={SCALAR:"SCALAR",VEC2:"VEC2",VEC3:"VEC3",VEC4:"VEC4",MAT2:"MAT2",MAT3:"MAT3",MAT4:"MAT4",getMathType:function(t){switch(t){case i.SCALAR:return Number;case i.VEC2:return e.Cartesian2;case i.VEC3:return n.Cartesian3;case i.VEC4:return e.Cartesian4;case i.MAT2:return u.Matrix2;case i.MAT3:return e.Matrix3;case i.MAT4:return e.Matrix4}},getNumberOfComponents:function(t){switch(t){case i.SCALAR:return 1;case i.VEC2:return 2;case i.VEC3:return 3;case i.VEC4:case i.MAT2:return 4;case i.MAT3:return 9;case i.MAT4:return 16}},getAttributeLocationCount:function(t){switch(t){case i.SCALAR:case i.VEC2:case i.VEC3:case i.VEC4:return 1;case i.MAT2:return 2;case i.MAT3:return 3;case i.MAT4:return 4}},getGlslType:function(t){switch(t){case i.SCALAR:return"float";case i.VEC2:return"vec2";case i.VEC3:return"vec3";case i.VEC4:return"vec4";case i.MAT2:return"mat2";case i.MAT3:return"mat3";case i.MAT4:return"mat4"}}};var C=Object.freeze(i);const M=1/256,f={octEncodeInRange:function(t,e,n){if(n.x=t.x/(Math.abs(t.x)+Math.abs(t.y)+Math.abs(t.z)),n.y=t.y/(Math.abs(t.x)+Math.abs(t.y)+Math.abs(t.z)),t.z<0){const t=n.x,e=n.y;n.x=(1-Math.abs(e))*s.CesiumMath.signNotZero(t),n.y=(1-Math.abs(t))*s.CesiumMath.signNotZero(e)}return n.x=s.CesiumMath.toSNorm(n.x,e),n.y=s.CesiumMath.toSNorm(n.y,e),n},octEncode:function(t,e){return f.octEncodeInRange(t,255,e)}},d=new e.Cartesian2,h=new Uint8Array(1);function m(t){return h[0]=t,h[0]}f.octEncodeToCartesian4=function(t,e){return f.octEncodeInRange(t,65535,d),e.x=m(d.x*M),e.y=m(d.x),e.z=m(d.y*M),e.w=m(d.y),e},f.octDecodeInRange=function(t,e,o,a){if(a.x=s.CesiumMath.fromSNorm(t,o),a.y=s.CesiumMath.fromSNorm(e,o),a.z=1-(Math.abs(a.x)+Math.abs(a.y)),a.z<0){const t=a.x;a.x=(1-Math.abs(a.y))*s.CesiumMath.signNotZero(t),a.y=(1-Math.abs(t))*s.CesiumMath.signNotZero(a.y)}return n.Cartesian3.normalize(a,a)},f.octDecode=function(t,e,n){return f.octDecodeInRange(t,e,255,n)},f.octDecodeFromCartesian4=function(t,e){const n=256*t.x+t.y,o=256*t.z+t.w;return f.octDecodeInRange(n,o,65535,e)},f.octPackFloat=function(t){return 256*t.x+t.y};const y=new e.Cartesian2;function A(t){return t>>1^-(1&t)}f.octEncodeFloat=function(t){return f.octEncode(t,y),f.octPackFloat(y)},f.octDecodeFloat=function(t,e){const n=t/256,o=Math.floor(n),a=256*(n-o);return f.octDecode(o,a,e)},f.octPack=function(t,e,n,o){const a=f.octEncodeFloat(t),r=f.octEncodeFloat(e),c=f.octEncode(n,y);return o.x=65536*c.x+a,o.y=65536*c.y+r,o},f.octUnpack=function(t,e,n,o){let a=t.x/65536;const r=Math.floor(a),c=65536*(a-r);a=t.y/65536;const s=Math.floor(a),u=65536*(a-s);f.octDecodeFloat(c,e),f.octDecodeFloat(u,n),f.octDecode(r,s,o)},f.compressTextureCoordinates=function(t){return 4096*(4095*t.x|0)+(4095*t.y|0)},f.decompressTextureCoordinates=function(t,e){const n=t/4096,o=Math.floor(n);return e.x=o/4095,e.y=(t-4096*o)/4095,e},f.zigZagDeltaDecode=function(t,e,n){const o=t.length;let a=0,c=0,s=0;for(let u=0;u<o;++u)a+=A(t[u]),c+=A(e[u]),t[u]=a,e[u]=c,r.defined(n)&&(s+=A(n[u]),n[u]=s)},f.dequantize=function(t,e,n,a){const r=C.getNumberOfComponents(n);let c;switch(e){case o.ComponentDatatype.BYTE:c=127;break;case o.ComponentDatatype.UNSIGNED_BYTE:c=255;break;case o.ComponentDatatype.SHORT:c=32767;break;case o.ComponentDatatype.UNSIGNED_SHORT:c=65535;break;case o.ComponentDatatype.INT:c=2147483647;break;case o.ComponentDatatype.UNSIGNED_INT:c=4294967295}const s=new Float32Array(a*r);for(let e=0;e<a;e++)for(let n=0;n<r;n++){const o=e*r+n;s[o]=Math.max(t[o]/c,-1)}return s},f.decodeRGB565=function(t,e){const n=t.length;r.defined(e)||(e=new Float32Array(3*n));const o=1/31;for(let a=0;a<n;a++){const n=t[a],r=n>>11,c=n>>5&63,s=31&n,u=3*a;e[u]=r*o,e[u+1]=.015873015873015872*c,e[u+2]=s*o}return e},t.AttributeCompression=f}));
