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
define(["exports","./Check-d82b20f7","./defaultValue-4607806f","./Math-6bc63320"],(function(e,n,t,d){"use strict";const i=d.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,n,d,f){if(!t.defined(e))return;d=t.defaultValue(d,!1);const u=t.defined(f),s=e.length;if(s<2)return e;let l,c,r,a=e[0],h=0,o=-1;for(l=1;l<s;++l)c=e[l],n(a,c,i)?(t.defined(r)||(r=e.slice(0,l),h=l-1,o=0),u&&f.push(l)):(t.defined(r)&&(r.push(c),h=l,u&&(o=f.length)),a=c);return d&&n(e[0],e[s-1],i)&&(u&&(t.defined(r)?f.splice(o,0,h):f.push(s-1)),t.defined(r)?r.length-=1:r=e.slice(0,-1)),t.defined(r)?r:e}}));
