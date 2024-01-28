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
define(["exports","./Matrix4-097242f7","./Cartesian3-2da9bb0a","./Check-d82b20f7","./OrientedBoundingBox-422eb266"],(function(n,t,e,r,a){"use strict";const i={},o=new e.Cartesian3,u=new e.Cartesian3,s=new e.Cartesian3,c=new e.Cartesian3,C=new a.OrientedBoundingBox;function m(n,r,a,i,u){const s=e.Cartesian3.subtract(n,r,o),c=e.Cartesian3.dot(a,s),C=e.Cartesian3.dot(i,s);return t.Cartesian2.fromElements(c,C,u)}i.validOutline=function(n){const r=a.OrientedBoundingBox.fromPoints(n,C).halfAxes,i=t.Matrix3.getColumn(r,0,u),o=t.Matrix3.getColumn(r,1,s),m=t.Matrix3.getColumn(r,2,c),d=e.Cartesian3.magnitude(i),g=e.Cartesian3.magnitude(o),l=e.Cartesian3.magnitude(m);return!(0===d&&(0===g||0===l)||0===g&&0===l)},i.computeProjectTo2DArguments=function(n,r,i,o){const m=a.OrientedBoundingBox.fromPoints(n,C),d=m.halfAxes,g=t.Matrix3.getColumn(d,0,u),l=t.Matrix3.getColumn(d,1,s),f=t.Matrix3.getColumn(d,2,c),x=e.Cartesian3.magnitude(g),B=e.Cartesian3.magnitude(l),M=e.Cartesian3.magnitude(f),P=Math.min(x,B,M);if(0===x&&(0===B||0===M)||0===B&&0===M)return!1;let b,h;return P!==B&&P!==M||(b=g),P===x?b=l:P===M&&(h=l),P!==x&&P!==B||(h=f),e.Cartesian3.normalize(b,i),e.Cartesian3.normalize(h,o),e.Cartesian3.clone(m.center,r),!0},i.createProjectPointsTo2DFunction=function(n,t,e){return function(r){const a=new Array(r.length);for(let i=0;i<r.length;i++)a[i]=m(r[i],n,t,e);return a}},i.createProjectPointTo2DFunction=function(n,t,e){return function(r,a){return m(r,n,t,e,a)}},n.CoplanarPolygonGeometryLibrary=i}));
