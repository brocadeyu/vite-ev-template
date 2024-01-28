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
define(["exports","./Cartesian3-2da9bb0a","./Matrix4-097242f7","./Check-d82b20f7","./defaultValue-4607806f","./DeveloperError-46384437","./Math-6bc63320"],(function(n,e,a,t,r,i,s){"use strict";function o(n,a){this.normal=e.Cartesian3.clone(n),this.distance=a}o.fromPointNormal=function(n,a,t){const i=-e.Cartesian3.dot(a,n);return r.defined(t)?(e.Cartesian3.clone(a,t.normal),t.distance=i,t):new o(a,i)};const c=new e.Cartesian3;o.fromCartesian4=function(n,a){const t=e.Cartesian3.fromCartesian4(n,c),i=n.w;return r.defined(a)?(e.Cartesian3.clone(t,a.normal),a.distance=i,a):new o(t,i)},o.getPointDistance=function(n,a){return e.Cartesian3.dot(n.normal,a)+n.distance};const l=new e.Cartesian3;o.projectPointOntoPlane=function(n,a,t){r.defined(t)||(t=new e.Cartesian3);const i=o.getPointDistance(n,a),s=e.Cartesian3.multiplyByScalar(n.normal,i,l);return e.Cartesian3.subtract(a,s,t)};const f=new a.Matrix4,C=new a.Cartesian4,d=new e.Cartesian3;o.transform=function(n,t,r){const i=n.normal,s=n.distance,c=a.Matrix4.inverseTranspose(t,f);let l=a.Cartesian4.fromElements(i.x,i.y,i.z,s,C);l=a.Matrix4.multiplyByVector(c,l,l);const u=e.Cartesian3.fromCartesian4(l,d);return l=a.Cartesian4.divideByScalar(l,e.Cartesian3.magnitude(u),l),o.fromCartesian4(l,r)},o.clone=function(n,a){return r.defined(a)?(e.Cartesian3.clone(n.normal,a.normal),a.distance=n.distance,a):new o(n.normal,n.distance)},o.equals=function(n,a){return n.distance===a.distance&&e.Cartesian3.equals(n.normal,a.normal)},o.ORIGIN_XY_PLANE=Object.freeze(new o(e.Cartesian3.UNIT_Z,0)),o.ORIGIN_YZ_PLANE=Object.freeze(new o(e.Cartesian3.UNIT_X,0)),o.ORIGIN_ZX_PLANE=Object.freeze(new o(e.Cartesian3.UNIT_Y,0)),n.Plane=o}));
