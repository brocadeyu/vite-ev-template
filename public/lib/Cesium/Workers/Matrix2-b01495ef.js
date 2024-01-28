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
define(["exports","./Matrix4-097242f7","./Check-d82b20f7","./defaultValue-4607806f","./DeveloperError-46384437"],(function(n,t,e,r,u){"use strict";function o(n,t,e,u){this[0]=r.defaultValue(n,0),this[1]=r.defaultValue(e,0),this[2]=r.defaultValue(t,0),this[3]=r.defaultValue(u,0)}o.packedLength=4,o.pack=function(n,t,e){return e=r.defaultValue(e,0),t[e++]=n[0],t[e++]=n[1],t[e++]=n[2],t[e++]=n[3],t},o.unpack=function(n,t,e){return t=r.defaultValue(t,0),r.defined(e)||(e=new o),e[0]=n[t++],e[1]=n[t++],e[2]=n[t++],e[3]=n[t++],e},o.packArray=function(n,t){const e=n.length,u=4*e;r.defined(t)?(Array.isArray(t)||t.length===u)&&t.length!==u&&(t.length=u):t=new Array(u);for(let r=0;r<e;++r)o.pack(n[r],t,4*r);return t},o.unpackArray=function(n,t){const e=n.length;r.defined(t)?t.length=e/4:t=new Array(e/4);for(let r=0;r<e;r+=4){const e=r/4;t[e]=o.unpack(n,r,t[e])}return t},o.clone=function(n,t){if(r.defined(n))return r.defined(t)?(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t):new o(n[0],n[2],n[1],n[3])},o.fromArray=o.unpack,o.fromColumnMajorArray=function(n,t){return o.clone(n,t)},o.fromRowMajorArray=function(n,t){return r.defined(t)?(t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3],t):new o(n[0],n[1],n[2],n[3])},o.fromScale=function(n,t){return r.defined(t)?(t[0]=n.x,t[1]=0,t[2]=0,t[3]=n.y,t):new o(n.x,0,0,n.y)},o.fromUniformScale=function(n,t){return r.defined(t)?(t[0]=n,t[1]=0,t[2]=0,t[3]=n,t):new o(n,0,0,n)},o.fromRotation=function(n,t){const e=Math.cos(n),u=Math.sin(n);return r.defined(t)?(t[0]=e,t[1]=u,t[2]=-u,t[3]=e,t):new o(e,-u,u,e)},o.toArray=function(n,t){return r.defined(t)?(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t):[n[0],n[1],n[2],n[3]]},o.getElementIndex=function(n,t){return 2*n+t},o.getColumn=function(n,t,e){const r=2*t,u=n[r],o=n[r+1];return e.x=u,e.y=o,e},o.setColumn=function(n,t,e,r){const u=2*t;return(r=o.clone(n,r))[u]=e.x,r[u+1]=e.y,r},o.getRow=function(n,t,e){const r=n[t],u=n[t+2];return e.x=r,e.y=u,e},o.setRow=function(n,t,e,r){return(r=o.clone(n,r))[t]=e.x,r[t+2]=e.y,r};const a=new t.Cartesian2;o.setScale=function(n,t,e){const r=o.getScale(n,a),u=t.x/r.x,i=t.y/r.y;return e[0]=n[0]*u,e[1]=n[1]*u,e[2]=n[2]*i,e[3]=n[3]*i,e};const i=new t.Cartesian2;o.setUniformScale=function(n,t,e){const r=o.getScale(n,i),u=t/r.x,a=t/r.y;return e[0]=n[0]*u,e[1]=n[1]*u,e[2]=n[2]*a,e[3]=n[3]*a,e};const c=new t.Cartesian2;o.getScale=function(n,e){return e.x=t.Cartesian2.magnitude(t.Cartesian2.fromElements(n[0],n[1],c)),e.y=t.Cartesian2.magnitude(t.Cartesian2.fromElements(n[2],n[3],c)),e};const f=new t.Cartesian2;o.getMaximumScale=function(n){return o.getScale(n,f),t.Cartesian2.maximumComponent(f)};const s=new t.Cartesian2;o.setRotation=function(n,t,e){const r=o.getScale(n,s);return e[0]=t[0]*r.x,e[1]=t[1]*r.x,e[2]=t[2]*r.y,e[3]=t[3]*r.y,e};const l=new t.Cartesian2;o.getRotation=function(n,t){const e=o.getScale(n,l);return t[0]=n[0]/e.x,t[1]=n[1]/e.x,t[2]=n[2]/e.y,t[3]=n[3]/e.y,t},o.multiply=function(n,t,e){const r=n[0]*t[0]+n[2]*t[1],u=n[0]*t[2]+n[2]*t[3],o=n[1]*t[0]+n[3]*t[1],a=n[1]*t[2]+n[3]*t[3];return e[0]=r,e[1]=o,e[2]=u,e[3]=a,e},o.add=function(n,t,e){return e[0]=n[0]+t[0],e[1]=n[1]+t[1],e[2]=n[2]+t[2],e[3]=n[3]+t[3],e},o.subtract=function(n,t,e){return e[0]=n[0]-t[0],e[1]=n[1]-t[1],e[2]=n[2]-t[2],e[3]=n[3]-t[3],e},o.multiplyByVector=function(n,t,e){const r=n[0]*t.x+n[2]*t.y,u=n[1]*t.x+n[3]*t.y;return e.x=r,e.y=u,e},o.multiplyByScalar=function(n,t,e){return e[0]=n[0]*t,e[1]=n[1]*t,e[2]=n[2]*t,e[3]=n[3]*t,e},o.multiplyByScale=function(n,t,e){return e[0]=n[0]*t.x,e[1]=n[1]*t.x,e[2]=n[2]*t.y,e[3]=n[3]*t.y,e},o.multiplyByUniformScale=function(n,t,e){return e[0]=n[0]*t,e[1]=n[1]*t,e[2]=n[2]*t,e[3]=n[3]*t,e},o.negate=function(n,t){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},o.transpose=function(n,t){const e=n[0],r=n[2],u=n[1],o=n[3];return t[0]=e,t[1]=r,t[2]=u,t[3]=o,t},o.abs=function(n,t){return t[0]=Math.abs(n[0]),t[1]=Math.abs(n[1]),t[2]=Math.abs(n[2]),t[3]=Math.abs(n[3]),t},o.equals=function(n,t){return n===t||r.defined(n)&&r.defined(t)&&n[0]===t[0]&&n[1]===t[1]&&n[2]===t[2]&&n[3]===t[3]},o.equalsArray=function(n,t,e){return n[0]===t[e]&&n[1]===t[e+1]&&n[2]===t[e+2]&&n[3]===t[e+3]},o.equalsEpsilon=function(n,t,e){return e=r.defaultValue(e,0),n===t||r.defined(n)&&r.defined(t)&&Math.abs(n[0]-t[0])<=e&&Math.abs(n[1]-t[1])<=e&&Math.abs(n[2]-t[2])<=e&&Math.abs(n[3]-t[3])<=e},o.IDENTITY=Object.freeze(new o(1,0,0,1)),o.ZERO=Object.freeze(new o(0,0,0,0)),o.COLUMN0ROW0=0,o.COLUMN0ROW1=1,o.COLUMN1ROW0=2,o.COLUMN1ROW1=3,Object.defineProperties(o.prototype,{length:{get:function(){return o.packedLength}}}),o.prototype.clone=function(n){return o.clone(this,n)},o.prototype.equals=function(n){return o.equals(this,n)},o.prototype.equalsEpsilon=function(n,t){return o.equalsEpsilon(this,n,t)},o.prototype.toString=function(){return`(${this[0]}, ${this[2]})\n(${this[1]}, ${this[3]})`},n.Matrix2=o}));
