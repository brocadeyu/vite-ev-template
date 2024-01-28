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
define(["exports","./Cartesian3-2da9bb0a","./Cartographic-de64a93a","./defaultValue-4607806f","./DeveloperError-46384437","./Rectangle-86ccddaa","./Math-6bc63320"],(function(e,t,i,a,o,r,n){"use strict";function u(e){this._ellipsoid=a.defaultValue(e,r.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}Object.defineProperties(u.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),u.mercatorAngleToGeodeticLatitude=function(e){return n.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-e))},u.geodeticLatitudeToMercatorAngle=function(e){e>u.MaximumLatitude?e=u.MaximumLatitude:e<-u.MaximumLatitude&&(e=-u.MaximumLatitude);const t=Math.sin(e);return.5*Math.log((1+t)/(1-t))},u.MaximumLatitude=u.mercatorAngleToGeodeticLatitude(Math.PI),u.prototype.project=function(e,i){const o=this._semimajorAxis,r=e.longitude*o,n=u.geodeticLatitudeToMercatorAngle(e.latitude)*o,d=e.height;return a.defined(i)?(i.x=r,i.y=n,i.z=d,i):new t.Cartesian3(r,n,d)},u.prototype.unproject=function(e,t){const o=this._oneOverSemimajorAxis,r=e.x*o,n=u.mercatorAngleToGeodeticLatitude(e.y*o),d=e.z;return a.defined(t)?(t.longitude=r,t.latitude=n,t.height=d,t):new i.Cartographic(r,n,d)},e.WebMercatorProjection=u}));
