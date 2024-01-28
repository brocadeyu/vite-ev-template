define(["./defaultValue-f6d5e6da","./Ellipsoid-8e26549b","./ArcType-26a3f38d","./Transforms-ff941892","./Cartesian3-529c236c","./ComponentDatatype-ab629b88","./EllipsoidTangentPlane-1b5b6a0a","./GeometryAttribute-50e472dc","./GeometryAttributes-1e4ddcd2","./GeometryInstance-1d11f88d","./GeometryOffsetAttribute-2579b8d2","./GeometryPipeline-ee4333dd","./IndexDatatype-58eb7805","./Math-355606c6","./PolygonGeometryLibrary-687929a2","./PolygonPipeline-c6721c42","./Cartographic-dbefb6fa","./Interval-d6c8d27a","./DeveloperError-c85858c1","./Matrix3-31d1f01f","./Matrix4-c57ffbd8","./RuntimeError-9b4ce3fb","./Rectangle-98b0bef0","./combine-0c102d93","./RequestType-735c98f2","./WebGLConstants-7f557f93","./AxisAlignedBoundingBox-a6aa8040","./IntersectionTests-01432fe7","./Plane-06f34fae","./Matrix2-e4a4609a","./AttributeCompression-d2ca507e","./EncodedCartesian3-94199dac","./arrayRemoveDuplicates-0d8dde26","./EllipsoidRhumbLine-81dc828b"],(function(e,t,i,r,o,n,a,l,s,y,u,p,d,c,g,f,h,m,b,P,E,A,_,G,L,T,H,v,C,x,D,O,I,w){"use strict";const R=[],S=[];function k(e,t,r,o,u){const p=a.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,R);let c,h;f.PolygonPipeline.computeWindingOrder2D(p)===f.WindingOrder.CLOCKWISE&&(p.reverse(),t=t.slice().reverse());let m=t.length,b=0;if(o)for(c=new Float64Array(2*m*3),h=0;h<m;h++){const e=t[h],i=t[(h+1)%m];c[b++]=e.x,c[b++]=e.y,c[b++]=e.z,c[b++]=i.x,c[b++]=i.y,c[b++]=i.z}else{let o=0;if(u===i.ArcType.GEODESIC)for(h=0;h<m;h++)o+=g.PolygonGeometryLibrary.subdivideLineCount(t[h],t[(h+1)%m],r);else if(u===i.ArcType.RHUMB)for(h=0;h<m;h++)o+=g.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[h],t[(h+1)%m],r);for(c=new Float64Array(3*o),h=0;h<m;h++){let o;u===i.ArcType.GEODESIC?o=g.PolygonGeometryLibrary.subdivideLine(t[h],t[(h+1)%m],r,S):u===i.ArcType.RHUMB&&(o=g.PolygonGeometryLibrary.subdivideRhumbLine(e,t[h],t[(h+1)%m],r,S));const n=o.length;for(let e=0;e<n;++e)c[b++]=o[e]}}m=c.length/3;const P=2*m,E=d.IndexDatatype.createTypedArray(m,P);for(b=0,h=0;h<m-1;h++)E[b++]=h,E[b++]=h+1;return E[b++]=m-1,E[b++]=0,new y.GeometryInstance({geometry:new l.Geometry({attributes:new s.GeometryAttributes({position:new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c})}),indices:E,primitiveType:l.PrimitiveType.LINES})})}function M(e,t,r,o,u){const p=a.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,R);let c,h;f.PolygonPipeline.computeWindingOrder2D(p)===f.WindingOrder.CLOCKWISE&&(p.reverse(),t=t.slice().reverse());let m=t.length;const b=new Array(m);let P=0;if(o)for(c=new Float64Array(2*m*3*2),h=0;h<m;++h){b[h]=P/3;const e=t[h],i=t[(h+1)%m];c[P++]=e.x,c[P++]=e.y,c[P++]=e.z,c[P++]=i.x,c[P++]=i.y,c[P++]=i.z}else{let o=0;if(u===i.ArcType.GEODESIC)for(h=0;h<m;h++)o+=g.PolygonGeometryLibrary.subdivideLineCount(t[h],t[(h+1)%m],r);else if(u===i.ArcType.RHUMB)for(h=0;h<m;h++)o+=g.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[h],t[(h+1)%m],r);for(c=new Float64Array(3*o*2),h=0;h<m;++h){let o;b[h]=P/3,u===i.ArcType.GEODESIC?o=g.PolygonGeometryLibrary.subdivideLine(t[h],t[(h+1)%m],r,S):u===i.ArcType.RHUMB&&(o=g.PolygonGeometryLibrary.subdivideRhumbLine(e,t[h],t[(h+1)%m],r,S));const n=o.length;for(let e=0;e<n;++e)c[P++]=o[e]}}m=c.length/6;const E=b.length,A=2*(2*m+E),_=d.IndexDatatype.createTypedArray(m+E,A);for(P=0,h=0;h<m;++h)_[P++]=h,_[P++]=(h+1)%m,_[P++]=h+m,_[P++]=(h+1)%m+m;for(h=0;h<E;h++){const e=b[h];_[P++]=e,_[P++]=e+m}return new y.GeometryInstance({geometry:new l.Geometry({attributes:new s.GeometryAttributes({position:new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c})}),indices:_,primitiveType:l.PrimitiveType.LINES})})}function N(r){const n=r.polygonHierarchy,a=e.defaultValue(r.ellipsoid,t.Ellipsoid.WGS84),l=e.defaultValue(r.granularity,c.CesiumMath.RADIANS_PER_DEGREE),s=e.defaultValue(r.perPositionHeight,!1),y=s&&e.defined(r.extrudedHeight),u=e.defaultValue(r.arcType,i.ArcType.GEODESIC);let p=e.defaultValue(r.height,0),d=e.defaultValue(r.extrudedHeight,p);if(!y){const e=Math.max(p,d);d=Math.min(p,d),p=e}this._ellipsoid=t.Ellipsoid.clone(a),this._granularity=l,this._height=p,this._extrudedHeight=d,this._arcType=u,this._polygonHierarchy=n,this._perPositionHeight=s,this._perPositionHeightExtrude=y,this._offsetAttribute=r.offsetAttribute,this._workerName="createPolygonOutlineGeometry",this.packedLength=g.PolygonGeometryLibrary.computeHierarchyPackedLength(n,o.Cartesian3)+t.Ellipsoid.packedLength+8}N.pack=function(i,r,n){return n=e.defaultValue(n,0),n=g.PolygonGeometryLibrary.packPolygonHierarchy(i._polygonHierarchy,r,n,o.Cartesian3),t.Ellipsoid.pack(i._ellipsoid,r,n),n+=t.Ellipsoid.packedLength,r[n++]=i._height,r[n++]=i._extrudedHeight,r[n++]=i._granularity,r[n++]=i._perPositionHeightExtrude?1:0,r[n++]=i._perPositionHeight?1:0,r[n++]=i._arcType,r[n++]=e.defaultValue(i._offsetAttribute,-1),r[n]=i.packedLength,r};const V=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),B={polygonHierarchy:{}};return N.unpack=function(i,r,n){r=e.defaultValue(r,0);const a=g.PolygonGeometryLibrary.unpackPolygonHierarchy(i,r,o.Cartesian3);r=a.startingIndex,delete a.startingIndex;const l=t.Ellipsoid.unpack(i,r,V);r+=t.Ellipsoid.packedLength;const s=i[r++],y=i[r++],u=i[r++],p=1===i[r++],d=1===i[r++],c=i[r++],f=i[r++],h=i[r];return e.defined(n)||(n=new N(B)),n._polygonHierarchy=a,n._ellipsoid=t.Ellipsoid.clone(l,n._ellipsoid),n._height=s,n._extrudedHeight=y,n._granularity=u,n._perPositionHeight=d,n._perPositionHeightExtrude=p,n._arcType=c,n._offsetAttribute=-1===f?void 0:f,n.packedLength=h,n},N.fromPositions=function(t){return new N({polygonHierarchy:{positions:(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions},height:t.height,extrudedHeight:t.extrudedHeight,ellipsoid:t.ellipsoid,granularity:t.granularity,perPositionHeight:t.perPositionHeight,arcType:t.arcType,offsetAttribute:t.offsetAttribute})},N.createGeometry=function(t){const i=t._ellipsoid,o=t._granularity,a=t._polygonHierarchy,s=t._perPositionHeight,y=t._arcType,d=g.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(a,!s,i);if(0===d.length)return;let h;const m=[],b=c.CesiumMath.chordLength(o,i.maximumRadius),P=t._height,E=t._extrudedHeight;let A,_;if(t._perPositionHeightExtrude||!c.CesiumMath.equalsEpsilon(P,E,0,c.CesiumMath.EPSILON2))for(_=0;_<d.length;_++){if(h=M(i,d[_],b,s,y),h.geometry=g.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(h.geometry,P,E,i,s),e.defined(t._offsetAttribute)){const e=h.geometry.attributes.position.values.length/3;let i=new Uint8Array(e);t._offsetAttribute===u.GeometryOffsetAttribute.TOP?i=i.fill(1,0,e/2):(A=t._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,i=i.fill(A)),h.geometry.attributes.applyOffset=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}m.push(h)}else for(_=0;_<d.length;_++){if(h=k(i,d[_],b,s,y),h.geometry.attributes.position.values=f.PolygonPipeline.scaleToGeodeticHeight(h.geometry.attributes.position.values,P,i,!s),e.defined(t._offsetAttribute)){const e=h.geometry.attributes.position.values.length;A=t._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1;const i=new Uint8Array(e/3).fill(A);h.geometry.attributes.applyOffset=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}m.push(h)}const G=p.GeometryPipeline.combineInstances(m)[0],L=r.BoundingSphere.fromVertices(G.attributes.position.values);return new l.Geometry({attributes:G.attributes,indices:G.indices,primitiveType:G.primitiveType,boundingSphere:L,offsetAttribute:t._offsetAttribute})},function(i,r){return e.defined(r)&&(i=N.unpack(i,r)),i._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),N.createGeometry(i)}}));
