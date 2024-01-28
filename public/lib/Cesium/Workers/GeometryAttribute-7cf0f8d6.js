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
define(["exports","./Matrix4-097242f7","./Cartesian3-2da9bb0a","./Cartographic-de64a93a","./Check-d82b20f7","./defaultValue-4607806f","./DeveloperError-46384437","./Matrix2-b01495ef","./WebGLConstants-f100e3dd","./Transforms-96990627","./Rectangle-86ccddaa"],(function(t,e,a,n,r,i,o,s,u,I,N){"use strict";var c=Object.freeze({NONE:0,TRIANGLES:1,LINES:2,POLYLINES:3});const l={POINTS:u.WebGLConstants.POINTS,LINES:u.WebGLConstants.LINES,LINE_LOOP:u.WebGLConstants.LINE_LOOP,LINE_STRIP:u.WebGLConstants.LINE_STRIP,TRIANGLES:u.WebGLConstants.TRIANGLES,TRIANGLE_STRIP:u.WebGLConstants.TRIANGLE_STRIP,TRIANGLE_FAN:u.WebGLConstants.TRIANGLE_FAN,isLines:function(t){return t===l.LINES||t===l.LINE_LOOP||t===l.LINE_STRIP},isTriangles:function(t){return t===l.TRIANGLES||t===l.TRIANGLE_STRIP||t===l.TRIANGLE_FAN},validate:function(t){return t===l.POINTS||t===l.LINES||t===l.LINE_LOOP||t===l.LINE_STRIP||t===l.TRIANGLES||t===l.TRIANGLE_STRIP||t===l.TRIANGLE_FAN}};var T=Object.freeze(l);function L(t){t=i.defaultValue(t,i.defaultValue.EMPTY_OBJECT),this.attributes=t.attributes,this.indices=t.indices,this.primitiveType=i.defaultValue(t.primitiveType,T.TRIANGLES),this.boundingSphere=t.boundingSphere,this.geometryType=i.defaultValue(t.geometryType,c.NONE),this.boundingSphereCV=t.boundingSphereCV,this.offsetAttribute=t.offsetAttribute}L.computeNumberOfVertices=function(t){let e=-1;for(const a in t.attributes)if(t.attributes.hasOwnProperty(a)&&i.defined(t.attributes[a])&&i.defined(t.attributes[a].values)){const n=t.attributes[a];e=n.values.length/n.componentsPerAttribute}return e};const f=new n.Cartographic,E=new a.Cartesian3,p=new e.Matrix4,b=[new n.Cartographic,new n.Cartographic,new n.Cartographic],C=[new e.Cartesian2,new e.Cartesian2,new e.Cartesian2],d=[new e.Cartesian2,new e.Cartesian2,new e.Cartesian2],m=new a.Cartesian3,y=new I.Quaternion,h=new e.Matrix4,A=new s.Matrix2;L._textureCoordinateRotationPoints=function(t,r,i,o){let u;const c=N.Rectangle.center(o,f),l=n.Cartographic.toCartesian(c,i,E),T=I.Transforms.eastNorthUpToFixedFrame(l,i,p),L=e.Matrix4.inverse(T,p),x=C,S=b;S[0].longitude=o.west,S[0].latitude=o.south,S[1].longitude=o.west,S[1].latitude=o.north,S[2].longitude=o.east,S[2].latitude=o.south;let P=m;for(u=0;u<3;u++)n.Cartographic.toCartesian(S[u],i,P),P=e.Matrix4.multiplyByPointAsVector(L,P,P),x[u].x=P.x,x[u].y=P.y;const G=I.Quaternion.fromAxisAngle(a.Cartesian3.UNIT_Z,-r,y),R=e.Matrix3.fromQuaternion(G,h),_=t.length;let g=Number.POSITIVE_INFINITY,O=Number.POSITIVE_INFINITY,w=Number.NEGATIVE_INFINITY,V=Number.NEGATIVE_INFINITY;for(u=0;u<_;u++)P=e.Matrix4.multiplyByPointAsVector(L,t[u],P),P=e.Matrix3.multiplyByVector(R,P,P),g=Math.min(g,P.x),O=Math.min(O,P.y),w=Math.max(w,P.x),V=Math.max(V,P.y);const M=s.Matrix2.fromRotation(r,A),v=d;v[0].x=g,v[0].y=O,v[1].x=g,v[1].y=V,v[2].x=w,v[2].y=O;const F=x[0],W=x[2].x-F.x,Y=x[1].y-F.y;for(u=0;u<3;u++){const t=v[u];s.Matrix2.multiplyByVector(M,t,t),t.x=(t.x-F.x)/W,t.y=(t.y-F.y)/Y}const B=v[0],k=v[1],z=v[2],D=new Array(6);return e.Cartesian2.pack(B,D),e.Cartesian2.pack(k,D,2),e.Cartesian2.pack(z,D,4),D},t.Geometry=L,t.GeometryAttribute=function(t){t=i.defaultValue(t,i.defaultValue.EMPTY_OBJECT),this.componentDatatype=t.componentDatatype,this.componentsPerAttribute=t.componentsPerAttribute,this.normalize=i.defaultValue(t.normalize,!1),this.values=t.values},t.GeometryType=c,t.PrimitiveType=T}));
