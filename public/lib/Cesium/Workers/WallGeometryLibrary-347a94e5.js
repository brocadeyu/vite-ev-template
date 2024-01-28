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
define(["exports","./arrayRemoveDuplicates-91fccd80","./Cartesian3-2da9bb0a","./Cartographic-de64a93a","./defaultValue-4607806f","./Math-6bc63320","./PolylinePipeline-26d2ab82"],(function(e,t,i,n,o,r,a){"use strict";const s={};function l(e,t){return r.CesiumMath.equalsEpsilon(e.latitude,t.latitude,r.CesiumMath.EPSILON10)&&r.CesiumMath.equalsEpsilon(e.longitude,t.longitude,r.CesiumMath.EPSILON10)}const h=new n.Cartographic,c=new n.Cartographic;const g=new Array(2),u=new Array(2),p={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};s.computePositions=function(e,s,d,y,f,m){const P=function(e,r,a,s){const g=(r=t.arrayRemoveDuplicates(r,i.Cartesian3.equalsEpsilon)).length;if(g<2)return;const u=o.defined(s),p=o.defined(a),d=new Array(g),y=new Array(g),f=new Array(g),m=r[0];d[0]=m;const P=e.cartesianToCartographic(m,h);p&&(P.height=a[0]),y[0]=P.height,f[0]=u?s[0]:0;let C=y[0]===f[0],A=1;for(let t=1;t<g;++t){const i=r[t],o=e.cartesianToCartographic(i,c);p&&(o.height=a[t]),C=C&&0===o.height,l(P,o)?P.height<o.height&&(y[A-1]=o.height):(d[A]=i,y[A]=o.height,f[A]=u?s[t]:0,C=C&&y[A]===f[A],n.Cartographic.clone(o,P),++A)}return C||A<2?void 0:(d.length=A,y.length=A,f.length=A,{positions:d,topHeights:y,bottomHeights:f})}(e,s,d,y);if(!o.defined(P))return;s=P.positions,d=P.topHeights,y=P.bottomHeights;const C=s.length,A=C-2;let w,b;const v=r.CesiumMath.chordLength(f,e.maximumRadius),M=p;if(M.minDistance=v,M.ellipsoid=e,m){let e,t=0;for(e=0;e<C-1;e++)t+=a.PolylinePipeline.numberOfPoints(s[e],s[e+1],v)+1;w=new Float64Array(3*t),b=new Float64Array(3*t);const i=g,n=u;M.positions=i,M.height=n;let o=0;for(e=0;e<C-1;e++){i[0]=s[e],i[1]=s[e+1],n[0]=d[e],n[1]=d[e+1];const t=a.PolylinePipeline.generateArc(M);w.set(t,o),n[0]=y[e],n[1]=y[e+1],b.set(a.PolylinePipeline.generateArc(M),o),o+=t.length}}else M.positions=s,M.height=d,w=new Float64Array(a.PolylinePipeline.generateArc(M)),M.height=y,b=new Float64Array(a.PolylinePipeline.generateArc(M));return{bottomPositions:b,topPositions:w,numCorners:A}},e.WallGeometryLibrary=s}));
