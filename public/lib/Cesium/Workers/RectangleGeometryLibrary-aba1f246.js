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
define(["exports","./Cartesian3-2da9bb0a","./Cartographic-de64a93a","./defaultValue-4607806f","./DeveloperError-46384437","./Transforms-96990627","./Math-6bc63320","./Matrix2-b01495ef","./Rectangle-86ccddaa"],(function(t,n,a,e,r,o,s,i,c){"use strict";const g=Math.cos,u=Math.sin,h=Math.sqrt,l={computePosition:function(t,n,a,r,o,s,i){const c=n.radiiSquared,l=t.nwCorner,C=t.boundingRectangle;let d=l.latitude-t.granYCos*r+o*t.granXSin;const S=g(d),M=u(d),w=c.z*M;let X=l.longitude+r*t.granYSin+o*t.granXCos;const Y=S*g(X),f=S*u(X),m=c.x*Y,p=c.y*f,x=h(m*Y+p*f+w*M);if(s.x=m/x,s.y=p/x,s.z=w/x,a){const n=t.stNwCorner;e.defined(n)?(d=n.latitude-t.stGranYCos*r+o*t.stGranXSin,X=n.longitude+r*t.stGranYSin+o*t.stGranXCos,i.x=(X-t.stWest)*t.lonScalar,i.y=(d-t.stSouth)*t.latScalar):(i.x=(X-C.west)*t.lonScalar,i.y=(d-C.south)*t.latScalar)}}},C=new i.Matrix2;let d=new n.Cartesian3;const S=new a.Cartographic;let M=new n.Cartesian3;const w=new o.GeographicProjection;function X(t,a,e,r,o,s,c){const g=Math.cos(a),u=r*g,h=e*g,l=Math.sin(a),S=r*l,X=e*l;d=w.project(t,d),d=n.Cartesian3.subtract(d,M,d);const Y=i.Matrix2.fromRotation(a,C);d=i.Matrix2.multiplyByVector(Y,d,d),d=n.Cartesian3.add(d,M,d),s-=1,c-=1;const f=(t=w.unproject(d,t)).latitude,m=f+s*X,p=f-u*c,x=f-u*c+s*X,R=Math.max(f,m,p,x),G=Math.min(f,m,p,x),b=t.longitude,y=b+s*h,O=b+c*S,P=b+c*S+s*h;return{north:R,south:G,east:Math.max(b,y,O,P),west:Math.min(b,y,O,P),granYCos:u,granYSin:S,granXCos:h,granXSin:X,nwCorner:t}}l.computeOptions=function(t,n,a,e,r,o,i){let g,u=t.east,h=t.west,l=t.north,C=t.south,d=!1,Y=!1;l===s.CesiumMath.PI_OVER_TWO&&(d=!0),C===-s.CesiumMath.PI_OVER_TWO&&(Y=!0);const f=l-C;g=h>u?s.CesiumMath.TWO_PI-h+u:u-h;const m=Math.ceil(g/n)+1,p=Math.ceil(f/n)+1,x=g/(m-1),R=f/(p-1),G=c.Rectangle.northwest(t,o),b=c.Rectangle.center(t,S);0===a&&0===e||(b.longitude<G.longitude&&(b.longitude+=s.CesiumMath.TWO_PI),M=w.project(b,M));const y=R,O=x,P=c.Rectangle.clone(t,r),W={granYCos:y,granYSin:0,granXCos:O,granXSin:0,nwCorner:G,boundingRectangle:P,width:m,height:p,northCap:d,southCap:Y};if(0!==a){const t=X(G,a,x,R,0,m,p);l=t.north,C=t.south,u=t.east,h=t.west,W.granYCos=t.granYCos,W.granYSin=t.granYSin,W.granXCos=t.granXCos,W.granXSin=t.granXSin,P.north=l,P.south=C,P.east=u,P.west=h}if(0!==e){a-=e;const t=c.Rectangle.northwest(P,i),n=X(t,a,x,R,0,m,p);W.stGranYCos=n.granYCos,W.stGranXCos=n.granXCos,W.stGranYSin=n.granYSin,W.stGranXSin=n.granXSin,W.stNwCorner=t,W.stWest=n.west,W.stSouth=n.south}return W},t.RectangleGeometryLibrary=l}));
