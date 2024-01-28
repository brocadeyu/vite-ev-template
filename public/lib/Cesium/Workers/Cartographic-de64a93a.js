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
define(["exports","./Cartesian3-2da9bb0a","./Check-d82b20f7","./defaultValue-4607806f","./Math-6bc63320","./DeveloperError-46384437"],(function(e,t,i,n,a,u){"use strict";const r=new t.Cartesian3,d=new t.Cartesian3;function s(e,i,u,s,o){const l=e.x,h=e.y,f=e.z,c=i.x,g=i.y,C=i.z,m=l*l*c*c,p=h*h*g*g,w=f*f*C*C,y=m+p+w,O=Math.sqrt(1/y),M=t.Cartesian3.multiplyByScalar(e,O,r);if(y<s)return isFinite(O)?t.Cartesian3.clone(M,o):void 0;const R=u.x,q=u.y,b=u.z,z=d;z.x=M.x*R*2,z.y=M.y*q*2,z.z=M.z*b*2;let S,v,x,E,V,$,D,I,L,N,P,T=(1-O)*t.Cartesian3.magnitude(e)/(.5*t.Cartesian3.magnitude(z)),j=0;do{T-=j,x=1/(1+T*R),E=1/(1+T*q),V=1/(1+T*b),$=x*x,D=E*E,I=V*V,L=$*x,N=D*E,P=I*V,S=m*$+p*D+w*I-1,v=m*L*R+p*N*q+w*P*b;j=S/(-2*v)}while(Math.abs(S)>a.CesiumMath.EPSILON12);return n.defined(o)?(o.x=l*x,o.y=h*E,o.z=f*V,o):new t.Cartesian3(l*x,h*E,f*V)}function o(e,t,i){this.longitude=n.defaultValue(e,0),this.latitude=n.defaultValue(t,0),this.height=n.defaultValue(i,0)}o.fromRadians=function(e,t,i,a){return i=n.defaultValue(i,0),n.defined(a)?(a.longitude=e,a.latitude=t,a.height=i,a):new o(e,t,i)},o.fromDegrees=function(e,t,i,n){return e=a.CesiumMath.toRadians(e),t=a.CesiumMath.toRadians(t),o.fromRadians(e,t,i,n)};const l=new t.Cartesian3,h=new t.Cartesian3,f=new t.Cartesian3;o.wgs84OneOverRadii=new t.Cartesian3(1/6378137,1/6378137,1/6356752.314245179),o.wgs84OneOverRadiiSquared=new t.Cartesian3(1/40680631590769,1/40680631590769,1/40408299984661.445);const c=a.CesiumMath.EPSILON1;o.fromCartesian=function(e,i,u){const r=n.defined(i)?i.oneOverRadii:this.wgs84OneOverRadii,d=n.defined(i)?i.oneOverRadiiSquared:this.wgs84OneOverRadiiSquared,g=s(e,r,d,n.defined(i)?i._centerToleranceSquared:c,h);if(!n.defined(g))return;let C=t.Cartesian3.multiplyComponents(g,d,l);C=t.Cartesian3.normalize(C,C);const m=t.Cartesian3.subtract(e,g,f),p=Math.atan2(C.y,C.x),w=Math.asin(C.z),y=a.CesiumMath.sign(t.Cartesian3.dot(m,e))*t.Cartesian3.magnitude(m);return n.defined(u)?(u.longitude=p,u.latitude=w,u.height=y,u):new o(p,w,y)},o.toCartesian=function(e,i,n){return t.Cartesian3.fromRadians(e.longitude,e.latitude,e.height,i,n)},o.clone=function(e,t){if(n.defined(e))return n.defined(t)?(t.longitude=e.longitude,t.latitude=e.latitude,t.height=e.height,t):new o(e.longitude,e.latitude,e.height)},o.equals=function(e,t){return e===t||n.defined(e)&&n.defined(t)&&e.longitude===t.longitude&&e.latitude===t.latitude&&e.height===t.height},o.equalsEpsilon=function(e,t,i){return i=n.defaultValue(i,0),e===t||n.defined(e)&&n.defined(t)&&Math.abs(e.longitude-t.longitude)<=i&&Math.abs(e.latitude-t.latitude)<=i&&Math.abs(e.height-t.height)<=i},o.ZERO=Object.freeze(new o(0,0,0)),o.prototype.clone=function(e){return o.clone(this,e)},o.prototype.equals=function(e){return o.equals(this,e)},o.prototype.equalsEpsilon=function(e,t){return o.equalsEpsilon(this,e,t)},o.prototype.toString=function(){return`(${this.longitude}, ${this.latitude}, ${this.height})`},e.Cartographic=o,e.scaleToGeodeticSurface=s}));
