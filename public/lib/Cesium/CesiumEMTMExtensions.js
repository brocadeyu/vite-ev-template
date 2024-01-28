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

var CesiumEMTMExtensions=(()=>{var r=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var _=Object.prototype.hasOwnProperty;var f=(t,e)=>{for(var n in e)r(t,n,{get:e[n],enumerable:!0})},g=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let u of s(e))!_.call(t,u)&&u!==n&&r(t,u,{get:()=>e[u],enumerable:!(a=o(e,u))||a.enumerable});return t};var d=t=>g(r({},"__esModule",{value:!0}),t);var C={};f(C,{EMExtensionsMixin:()=>x});var m={_maximumCombinedTextureImageUnits:0,_maximumCubeMapSize:0,_maximumFragmentUniformVectors:0,_maximumTextureImageUnits:0,_maximumRenderbufferSize:0,_maximumTextureSize:0,_maximumVaryingVectors:0,_maximumVertexAttributes:0,_maximumVertexTextureImageUnits:0,_maximumVertexUniformVectors:0,_minimumAliasedLineWidth:0,_maximumAliasedLineWidth:0,_minimumAliasedPointSize:0,_maximumAliasedPointSize:0,_maximumViewportWidth:0,_maximumViewportHeight:0,_maximumTextureFilterAnisotropy:0,_maximumDrawBuffers:0,_maximumColorAttachments:0,_maximumSamples:0,_highpFloatSupported:!1,_highpIntSupported:!1};Object.defineProperties(m,{maximumCombinedTextureImageUnits:{get:function(){return m._maximumCombinedTextureImageUnits}},maximumCubeMapSize:{get:function(){return m._maximumCubeMapSize}},maximumFragmentUniformVectors:{get:function(){return m._maximumFragmentUniformVectors}},maximumTextureImageUnits:{get:function(){return m._maximumTextureImageUnits}},maximumRenderbufferSize:{get:function(){return m._maximumRenderbufferSize}},maximumTextureSize:{get:function(){return m._maximumTextureSize}},maximumVaryingVectors:{get:function(){return m._maximumVaryingVectors}},maximumVertexAttributes:{get:function(){return m._maximumVertexAttributes}},maximumVertexTextureImageUnits:{get:function(){return m._maximumVertexTextureImageUnits}},maximumVertexUniformVectors:{get:function(){return m._maximumVertexUniformVectors}},minimumAliasedLineWidth:{get:function(){return m._minimumAliasedLineWidth}},maximumAliasedLineWidth:{get:function(){return m._maximumAliasedLineWidth}},minimumAliasedPointSize:{get:function(){return m._minimumAliasedPointSize}},maximumAliasedPointSize:{get:function(){return m._maximumAliasedPointSize}},maximumViewportWidth:{get:function(){return m._maximumViewportWidth}},maximumViewportHeight:{get:function(){return m._maximumViewportHeight}},maximumTextureFilterAnisotropy:{get:function(){return m._maximumTextureFilterAnisotropy}},maximumDrawBuffers:{get:function(){return m._maximumDrawBuffers}},maximumColorAttachments:{get:function(){return m._maximumColorAttachments}},maximumSamples:{get:function(){return m._maximumSamples}},highpFloatSupported:{get:function(){return m._highpFloatSupported}},highpIntSupported:{get:function(){return m._highpIntSupported}}});var i=m;function p(t,e){i._maximumCombinedTextureImageUnits=Cesium.ContextLimits._maximumCombinedTextureImageUnits,i._maximumCubeMapSize=Cesium.ContextLimits._maximumCubeMapSize,i._maximumFragmentUniformVectors=Cesium.ContextLimits._maximumFragmentUniformVectors,i._maximumTextureImageUnits=Cesium.ContextLimits._maximumTextureImageUnits,i._maximumRenderbufferSize=Cesium.ContextLimits._maximumRenderbufferSize,i._maximumTextureSize=Cesium.ContextLimits._maximumTextureSize,i._maximumVertexAttributes=Cesium.ContextLimits._maximumVertexAttributes,i._maximumVertexTextureImageUnits=Cesium.ContextLimits._maximumVertexTextureImageUnits,i._maximumVertexUniformVectors=Cesium.ContextLimits._maximumVertexUniformVectors,i._minimumAliasedLineWidth=Cesium.ContextLimits._minimumAliasedLineWidth,i._maximumAliasedLineWidth=Cesium.ContextLimits._maximumAliasedLineWidth,i._minimumAliasedPointSize=Cesium.ContextLimits._minimumAliasedPointSize,i._maximumAliasedPointSize=Cesium.ContextLimits._maximumAliasedPointSize,i._maximumViewportWidth=Cesium.ContextLimits._maximumViewportWidth,i._maximumViewportHeight=Cesium.ContextLimits._maximumViewportHeight,i._highpFloatSupported=Cesium.ContextLimits._highpFloatSupported,i._highpIntSupported=Cesium.ContextLimits._highpIntSupported,i._maximumTextureFilterAnisotropy=Cesium.ContextLimits._maximumTextureFilterAnisotropy,i._maximumDrawBuffers=Cesium.ContextLimits._maximumDrawBuffers,i._maximumColorAttachments=Cesium.ContextLimits._maximumColorAttachments}var x=p;globalThis.CESIUM_VERSION="1.105.2";return d(C);})();
