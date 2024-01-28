/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.105.2
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

define(["./when-14cc665a","./createTaskProcessorWorker"],function(T,I){"use strict";function x(e){var c=e.width,g=e.height,a=Math.ceil(e.radius),r=e.isTrendsHeatmap,v=1-e.blur,o=new OffscreenCanvas(c,g),t=o.getContext("2d"),h=m(a,v,r),s=e.data,w=s.length;if(r)for(var l=0;l<w;l++){var n=s[l];t.globalAlpha=n.value;var i=n.x-a,f=n.y-a;t.drawImage(h,i,f)}else{var b=h.getContext("2d",{willReadFrequently:!0}),p=b.getImageData(0,0,a*2,a*2);const P=p.data.slice();for(var l=0;l<w;l++){var n=s[l];t.globalAlpha=n.value;var i=n.x-a,f=n.y-a;const S=P.slice();var C=new ImageData(S,a*2,a*2),u=C.data,y=t.getImageData(i,f,a*2,a*2),H=y.data;for(let d=2;d<u.length;d+=4)u[d]=u[d]*n.value+H[d];b.putImageData(C,0,0),t.drawImage(h,i,f)}}return{imageData:t.getImageData(0,0,c,g),radius:a}}function m(e,c,g){var a=new OffscreenCanvas(e*2,e*2),r=a.getContext("2d"),v=e,o=e;r.beginPath(),r.arc(v,o,e,0,2*Math.PI,!1);var t=r.createRadialGradient(v,o,e*c,v,o,e);return g?(t.addColorStop(0,"rgba(0,0,0,1)"),t.addColorStop(1,"rgba(0,0,0,0.1)")):(t.addColorStop(0,"rgba(0,0,255,1)"),t.addColorStop(1,"rgba(0,0,25,0.1)")),r.fillStyle=t,r.fill(),a}var D=I(x);return D});
