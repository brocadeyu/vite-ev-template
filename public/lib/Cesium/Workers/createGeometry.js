define(["./defaultValue-f6d5e6da","./PrimitivePipeline-5cafc258","./createTaskProcessorWorker","./Transforms-ff941892","./Cartesian3-529c236c","./Math-355606c6","./Cartographic-dbefb6fa","./Ellipsoid-8e26549b","./Interval-d6c8d27a","./DeveloperError-c85858c1","./Matrix3-31d1f01f","./Matrix4-c57ffbd8","./RuntimeError-9b4ce3fb","./Rectangle-98b0bef0","./combine-0c102d93","./RequestType-735c98f2","./ComponentDatatype-ab629b88","./WebGLConstants-7f557f93","./GeometryAttribute-50e472dc","./Matrix2-e4a4609a","./GeometryAttributes-1e4ddcd2","./GeometryPipeline-ee4333dd","./AttributeCompression-d2ca507e","./EncodedCartesian3-94199dac","./IndexDatatype-58eb7805","./IntersectionTests-01432fe7","./Plane-06f34fae","./WebMercatorProjection-03b5db31"],(function(e,t,r,n,o,i,s,a,c,u,l,f,m,p,d,y,b,P,k,C,g,h,x,G,M,T,W,q){"use strict";const v={};function A(t){let r=v[t];return e.defined(r)||("object"==typeof exports?v[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,v[r]=e}))),r}return r((function(r,n){const o=r.subTasks,i=o.length,s=new Array(i);for(let t=0;t<i;t++){const r=o[t],n=r.geometry,i=r.moduleName;if(e.defined(i)){const e=A(i);s[t]=e(n,r.offset)}else s[t]=n}return Promise.all(s).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
