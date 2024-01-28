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
define(["exports","./defaultValue-4607806f","./DeveloperError-46384437","./Math-6bc63320","./WebGLConstants-f100e3dd"],(function(r,e,n,t,N){"use strict";const E={UNSIGNED_BYTE:N.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:N.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:N.WebGLConstants.UNSIGNED_INT,getSizeInBytes:function(r){switch(r){case E.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case E.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case E.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT}},fromSizeInBytes:function(r){switch(r){case 2:return E.UNSIGNED_SHORT;case 4:return E.UNSIGNED_INT;case 1:return E.UNSIGNED_BYTE}},validate:function(r){return e.defined(r)&&(r===E.UNSIGNED_BYTE||r===E.UNSIGNED_SHORT||r===E.UNSIGNED_INT)},createTypedArray:function(r,e){return r>=t.CesiumMath.SIXTY_FOUR_KILOBYTES?new Uint32Array(e):new Uint16Array(e)},createTypedArrayFromArrayBuffer:function(r,e,n,N){return r>=t.CesiumMath.SIXTY_FOUR_KILOBYTES?new Uint32Array(e,n,N):new Uint16Array(e,n,N)},fromTypedArray:function(r){return r instanceof Uint8Array?E.UNSIGNED_BYTE:r instanceof Uint16Array?E.UNSIGNED_SHORT:r instanceof Uint32Array?E.UNSIGNED_INT:void 0}};var a=Object.freeze(E);r.IndexDatatype=a}));
