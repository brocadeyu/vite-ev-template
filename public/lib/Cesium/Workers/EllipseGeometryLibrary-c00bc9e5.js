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
define(["exports","./Cartesian3-2da9bb0a","./Math-6bc63320","./Matrix4-097242f7","./Transforms-96990627"],(function(a,t,e,n,i){"use strict";const r={},s=new t.Cartesian3,o=new t.Cartesian3,l=new i.Quaternion,c=new n.Matrix3;function C(a,e,r,C,y,u,m,h,x,M){const f=a+e;t.Cartesian3.multiplyByScalar(C,Math.cos(f),s),t.Cartesian3.multiplyByScalar(r,Math.sin(f),o),t.Cartesian3.add(s,o,s);let z=Math.cos(a);z*=z;let _=Math.sin(a);_*=_;const d=u/Math.sqrt(m*z+y*_)/h;return i.Quaternion.fromAxisAngle(s,d,l),n.Matrix3.fromQuaternion(l,c),n.Matrix3.multiplyByVector(c,x,M),t.Cartesian3.normalize(M,M),t.Cartesian3.multiplyByScalar(M,h,M),M}const y=new t.Cartesian3,u=new t.Cartesian3,m=new t.Cartesian3,h=new t.Cartesian3;r.raisePositionsToHeight=function(a,e,n){const i=e.ellipsoid,r=e.height,s=e.extrudedHeight,o=n?a.length/3*2:a.length/3,l=new Float64Array(3*o),c=a.length,C=n?c:0;for(let e=0;e<c;e+=3){const o=e+1,c=e+2,x=t.Cartesian3.fromArray(a,e,y);i.scaleToGeodeticSurface(x,x);const M=t.Cartesian3.clone(x,u),f=i.geodeticSurfaceNormal(x,h),z=t.Cartesian3.multiplyByScalar(f,r,m);t.Cartesian3.add(x,z,x),n&&(t.Cartesian3.multiplyByScalar(f,s,z),t.Cartesian3.add(M,z,M),l[e+C]=M.x,l[o+C]=M.y,l[c+C]=M.z),l[e]=x.x,l[o]=x.y,l[c]=x.z}return l};const x=new t.Cartesian3,M=new t.Cartesian3,f=new t.Cartesian3;r.computeEllipsePositions=function(a,n,i){const r=a.semiMinorAxis,s=a.semiMajorAxis,o=a.rotation,l=a.center,c=8*a.granularity,h=r*r,z=s*s,_=s*r,d=t.Cartesian3.magnitude(l),O=t.Cartesian3.normalize(l,x);let p=t.Cartesian3.cross(t.Cartesian3.UNIT_Z,l,M);p=t.Cartesian3.normalize(p,p);const w=t.Cartesian3.cross(O,p,f);let P=1+Math.ceil(e.CesiumMath.PI_OVER_TWO/c);const T=e.CesiumMath.PI_OVER_TWO/(P-1);let I=e.CesiumMath.PI_OVER_TWO-P*T;I<0&&(P-=Math.ceil(Math.abs(I)/T));const g=n?new Array(3*(P*(P+2)*2)):void 0;let E=0,V=y,A=u;const R=4*P*3;let W=R-1,S=0;const B=i?new Array(R):void 0;let b,Q,v,G,H;for(I=e.CesiumMath.PI_OVER_TWO,V=C(I,o,w,p,h,_,z,d,O,V),n&&(g[E++]=V.x,g[E++]=V.y,g[E++]=V.z),i&&(B[W--]=V.z,B[W--]=V.y,B[W--]=V.x),I=e.CesiumMath.PI_OVER_TWO-T,b=1;b<P+1;++b){if(V=C(I,o,w,p,h,_,z,d,O,V),A=C(Math.PI-I,o,w,p,h,_,z,d,O,A),n){for(g[E++]=V.x,g[E++]=V.y,g[E++]=V.z,v=2*b+2,Q=1;Q<v-1;++Q)G=Q/(v-1),H=t.Cartesian3.lerp(V,A,G,m),g[E++]=H.x,g[E++]=H.y,g[E++]=H.z;g[E++]=A.x,g[E++]=A.y,g[E++]=A.z}i&&(B[W--]=V.z,B[W--]=V.y,B[W--]=V.x,B[S++]=A.x,B[S++]=A.y,B[S++]=A.z),I=e.CesiumMath.PI_OVER_TWO-(b+1)*T}for(b=P;b>1;--b){if(I=e.CesiumMath.PI_OVER_TWO-(b-1)*T,V=C(-I,o,w,p,h,_,z,d,O,V),A=C(I+Math.PI,o,w,p,h,_,z,d,O,A),n){for(g[E++]=V.x,g[E++]=V.y,g[E++]=V.z,v=2*(b-1)+2,Q=1;Q<v-1;++Q)G=Q/(v-1),H=t.Cartesian3.lerp(V,A,G,m),g[E++]=H.x,g[E++]=H.y,g[E++]=H.z;g[E++]=A.x,g[E++]=A.y,g[E++]=A.z}i&&(B[W--]=V.z,B[W--]=V.y,B[W--]=V.x,B[S++]=A.x,B[S++]=A.y,B[S++]=A.z)}I=e.CesiumMath.PI_OVER_TWO,V=C(-I,o,w,p,h,_,z,d,O,V);const N={};return n&&(g[E++]=V.x,g[E++]=V.y,g[E++]=V.z,N.positions=g,N.numPts=P),i&&(B[W--]=V.z,B[W--]=V.y,B[W--]=V.x,N.outerPositions=B),N},a.EllipseGeometryLibrary=r}));
