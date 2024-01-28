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
define(["exports","./defaultValue-4607806f","./DeveloperError-46384437"],(function(e,t,r){"use strict";const o={};function n(e,t,r){return`Expected ${r} to be typeof ${t}, actual typeof was ${e}`}o.typeOf={},o.defined=function(e,o){if(!t.defined(o))throw new r.DeveloperError(function(e){return`${e} is required, actual value was undefined`}(e))},o.typeOf.func=function(e,t){if("function"!=typeof t)throw new r.DeveloperError(n(typeof t,"function",e))},o.typeOf.string=function(e,t){if("string"!=typeof t)throw new r.DeveloperError(n(typeof t,"string",e))},o.typeOf.number=function(e,t){if("number"!=typeof t)throw new r.DeveloperError(n(typeof t,"number",e))},o.typeOf.number.lessThan=function(e,t,n){if(o.typeOf.number(e,t),t>=n)throw new r.DeveloperError(`Expected ${e} to be less than ${n}, actual value was ${t}`)},o.typeOf.number.lessThanOrEquals=function(e,t,n){if(o.typeOf.number(e,t),t>n)throw new r.DeveloperError(`Expected ${e} to be less than or equal to ${n}, actual value was ${t}`)},o.typeOf.number.greaterThan=function(e,t,n){if(o.typeOf.number(e,t),t<=n)throw new r.DeveloperError(`Expected ${e} to be greater than ${n}, actual value was ${t}`)},o.typeOf.number.greaterThanOrEquals=function(e,t,n){if(o.typeOf.number(e,t),t<n)throw new r.DeveloperError(`Expected ${e} to be greater than or equal to ${n}, actual value was ${t}`)},o.typeOf.object=function(e,t){if("object"!=typeof t)throw new r.DeveloperError(n(typeof t,"object",e))},o.typeOf.bool=function(e,t){if("boolean"!=typeof t)throw new r.DeveloperError(n(typeof t,"boolean",e))},o.typeOf.bigint=function(e,t){if("bigint"!=typeof t)throw new r.DeveloperError(n(typeof t,"bigint",e))},o.typeOf.number.equals=function(e,t,n,f){if(o.typeOf.number(e,n),o.typeOf.number(t,f),n!==f)throw new r.DeveloperError(`${e} must be equal to ${t}, the actual values are ${n} and ${f}`)},e.Check=o}));
