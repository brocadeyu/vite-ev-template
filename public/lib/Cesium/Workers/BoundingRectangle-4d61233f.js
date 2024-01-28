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
define(["exports","./Matrix4-097242f7","./Cartographic-de64a93a","./Check-d82b20f7","./defaultValue-4607806f","./Transforms-96990627","./Rectangle-86ccddaa"],(function(t,e,n,i,h,a,r){"use strict";function d(t,e,n,i){this.x=h.defaultValue(t,0),this.y=h.defaultValue(e,0),this.width=h.defaultValue(n,0),this.height=h.defaultValue(i,0)}d.packedLength=4,d.pack=function(t,e,n){return n=h.defaultValue(n,0),e[n++]=t.x,e[n++]=t.y,e[n++]=t.width,e[n]=t.height,e},d.unpack=function(t,e,n){return e=h.defaultValue(e,0),h.defined(n)||(n=new d),n.x=t[e++],n.y=t[e++],n.width=t[e++],n.height=t[e],n},d.fromPoints=function(t,e){if(h.defined(e)||(e=new d),!h.defined(t)||0===t.length)return e.x=0,e.y=0,e.width=0,e.height=0,e;const n=t.length;let i=t[0].x,a=t[0].y,r=t[0].x,u=t[0].y;for(let e=1;e<n;e++){const n=t[e],h=n.x,d=n.y;i=Math.min(h,i),r=Math.max(h,r),a=Math.min(d,a),u=Math.max(d,u)}return e.x=i,e.y=a,e.width=r-i,e.height=u-a,e};const u=new a.GeographicProjection,c=new n.Cartographic,o=new n.Cartographic;d.fromRectangle=function(t,n,i){if(h.defined(i)||(i=new d),!h.defined(t))return i.x=0,i.y=0,i.width=0,i.height=0,i;const a=(n=h.defaultValue(n,u)).project(r.Rectangle.southwest(t,c)),f=n.project(r.Rectangle.northeast(t,o));return e.Cartesian2.subtract(f,a,f),i.x=a.x,i.y=a.y,i.width=f.x,i.height=f.y,i},d.clone=function(t,e){if(h.defined(t))return h.defined(e)?(e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e):new d(t.x,t.y,t.width,t.height)},d.union=function(t,e,n){h.defined(n)||(n=new d);const i=Math.min(t.x,e.x),a=Math.min(t.y,e.y),r=Math.max(t.x+t.width,e.x+e.width),u=Math.max(t.y+t.height,e.y+e.height);return n.x=i,n.y=a,n.width=r-i,n.height=u-a,n},d.expand=function(t,e,n){n=d.clone(t,n);const i=e.x-n.x,h=e.y-n.y;return i>n.width?n.width=i:i<0&&(n.width-=i,n.x=e.x),h>n.height?n.height=h:h<0&&(n.height-=h,n.y=e.y),n},d.intersect=function(t,e){const n=t.x,i=t.y,h=e.x,r=e.y;return n>h+e.width||n+t.width<h||i+t.height<r||i>r+e.height?a.Intersect.OUTSIDE:a.Intersect.INTERSECTING},d.equals=function(t,e){return t===e||h.defined(t)&&h.defined(e)&&t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},d.prototype.clone=function(t){return d.clone(this,t)},d.prototype.intersect=function(t){return d.intersect(this,t)},d.prototype.equals=function(t){return d.equals(this,t)},t.BoundingRectangle=d}));
