define(["./defaultValue-f6d5e6da","./Ellipsoid-8e26549b","./ArcType-26a3f38d","./Transforms-ff941892","./Cartesian3-529c236c","./Color-e59d77f0","./ComponentDatatype-ab629b88","./GeometryAttribute-50e472dc","./GeometryAttributes-1e4ddcd2","./IndexDatatype-58eb7805","./Math-355606c6","./PolylinePipeline-33453448","./Cartographic-dbefb6fa","./Interval-d6c8d27a","./DeveloperError-c85858c1","./Matrix3-31d1f01f","./Matrix4-c57ffbd8","./RuntimeError-9b4ce3fb","./Rectangle-98b0bef0","./combine-0c102d93","./RequestType-735c98f2","./WebGLConstants-7f557f93","./Matrix2-e4a4609a","./EllipsoidGeodesic-8ac7b85d","./EllipsoidRhumbLine-81dc828b","./IntersectionTests-01432fe7","./Plane-06f34fae"],(function(e,o,t,r,l,n,i,a,s,p,c,d,y,u,f,h,C,T,g,m,P,_,E,B,A,b,k){"use strict";function D(e,o,t,r,l,i,a){const s=d.PolylinePipeline.numberOfPoints(e,o,l);let p;const c=t.red,y=t.green,u=t.blue,f=t.alpha,h=r.red,C=r.green,T=r.blue,g=r.alpha;if(n.Color.equals(t,r)){for(p=0;p<s;p++)i[a++]=n.Color.floatToByte(c),i[a++]=n.Color.floatToByte(y),i[a++]=n.Color.floatToByte(u),i[a++]=n.Color.floatToByte(f);return a}const m=(h-c)/s,P=(C-y)/s,_=(T-u)/s,E=(g-f)/s;let B=a;for(p=0;p<s;p++)i[B++]=n.Color.floatToByte(c+p*m),i[B++]=n.Color.floatToByte(y+p*P),i[B++]=n.Color.floatToByte(u+p*_),i[B++]=n.Color.floatToByte(f+p*E);return B}function G(r){const i=(r=e.defaultValue(r,e.defaultValue.EMPTY_OBJECT)).positions,a=r.colors,s=e.defaultValue(r.colorsPerVertex,!1);this._positions=i,this._colors=a,this._colorsPerVertex=s,this._arcType=e.defaultValue(r.arcType,t.ArcType.GEODESIC),this._granularity=e.defaultValue(r.granularity,c.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=e.defaultValue(r.ellipsoid,o.Ellipsoid.WGS84),this._workerName="createSimplePolylineGeometry";let p=1+i.length*l.Cartesian3.packedLength;p+=e.defined(a)?1+a.length*n.Color.packedLength:1,this.packedLength=p+o.Ellipsoid.packedLength+3}G.pack=function(t,r,i){let a;i=e.defaultValue(i,0);const s=t._positions;let p=s.length;for(r[i++]=p,a=0;a<p;++a,i+=l.Cartesian3.packedLength)l.Cartesian3.pack(s[a],r,i);const c=t._colors;for(p=e.defined(c)?c.length:0,r[i++]=p,a=0;a<p;++a,i+=n.Color.packedLength)n.Color.pack(c[a],r,i);return o.Ellipsoid.pack(t._ellipsoid,r,i),i+=o.Ellipsoid.packedLength,r[i++]=t._colorsPerVertex?1:0,r[i++]=t._arcType,r[i]=t._granularity,r},G.unpack=function(t,r,i){let a;r=e.defaultValue(r,0);let s=t[r++];const p=new Array(s);for(a=0;a<s;++a,r+=l.Cartesian3.packedLength)p[a]=l.Cartesian3.unpack(t,r);s=t[r++];const c=s>0?new Array(s):void 0;for(a=0;a<s;++a,r+=n.Color.packedLength)c[a]=n.Color.unpack(t,r);const d=o.Ellipsoid.unpack(t,r);r+=o.Ellipsoid.packedLength;const y=1===t[r++],u=t[r++],f=t[r];return e.defined(i)?(i._positions=p,i._colors=c,i._ellipsoid=d,i._colorsPerVertex=y,i._arcType=u,i._granularity=f,i):new G({positions:p,colors:c,ellipsoid:d,colorsPerVertex:y,arcType:u,granularity:f})};const L=new Array(2),w=new Array(2),V={positions:L,height:w,ellipsoid:void 0,minDistance:void 0,granularity:void 0};return G.createGeometry=function(o){const y=o._positions,u=o._colors,f=o._colorsPerVertex,h=o._arcType,C=o._granularity,T=o._ellipsoid,g=c.CesiumMath.chordLength(C,T.maximumRadius),m=e.defined(u)&&!f;let P;const _=y.length;let E,B,A,b,k=0;if(h===t.ArcType.GEODESIC||h===t.ArcType.RHUMB){let o,r,l;h===t.ArcType.GEODESIC?(o=c.CesiumMath.chordLength(C,T.maximumRadius),r=d.PolylinePipeline.numberOfPoints,l=d.PolylinePipeline.generateArc):(o=C,r=d.PolylinePipeline.numberOfPointsRhumbLine,l=d.PolylinePipeline.generateRhumbArc);const i=d.PolylinePipeline.extractHeights(y,T),a=V;if(h===t.ArcType.GEODESIC?a.minDistance=g:a.granularity=C,a.ellipsoid=T,m){let t=0;for(P=0;P<_-1;P++)t+=r(y[P],y[P+1],o)+1;E=new Float64Array(3*t),A=new Uint8Array(4*t),a.positions=L,a.height=w;let s=0;for(P=0;P<_-1;++P){L[0]=y[P],L[1]=y[P+1],w[0]=i[P],w[1]=i[P+1];const o=l(a);if(e.defined(u)){const e=o.length/3;b=u[P];for(let o=0;o<e;++o)A[s++]=n.Color.floatToByte(b.red),A[s++]=n.Color.floatToByte(b.green),A[s++]=n.Color.floatToByte(b.blue),A[s++]=n.Color.floatToByte(b.alpha)}E.set(o,k),k+=o.length}}else if(a.positions=y,a.height=i,E=new Float64Array(l(a)),e.defined(u)){for(A=new Uint8Array(E.length/3*4),P=0;P<_-1;++P){k=D(y[P],y[P+1],u[P],u[P+1],g,A,k)}const e=u[_-1];A[k++]=n.Color.floatToByte(e.red),A[k++]=n.Color.floatToByte(e.green),A[k++]=n.Color.floatToByte(e.blue),A[k++]=n.Color.floatToByte(e.alpha)}}else{B=m?2*_-2:_,E=new Float64Array(3*B),A=e.defined(u)?new Uint8Array(4*B):void 0;let o=0,t=0;for(P=0;P<_;++P){const r=y[P];if(m&&P>0&&(l.Cartesian3.pack(r,E,o),o+=3,b=u[P-1],A[t++]=n.Color.floatToByte(b.red),A[t++]=n.Color.floatToByte(b.green),A[t++]=n.Color.floatToByte(b.blue),A[t++]=n.Color.floatToByte(b.alpha)),m&&P===_-1)break;l.Cartesian3.pack(r,E,o),o+=3,e.defined(u)&&(b=u[P],A[t++]=n.Color.floatToByte(b.red),A[t++]=n.Color.floatToByte(b.green),A[t++]=n.Color.floatToByte(b.blue),A[t++]=n.Color.floatToByte(b.alpha))}}const G=new s.GeometryAttributes;G.position=new a.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:E}),e.defined(u)&&(G.color=new a.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:A,normalize:!0})),B=E.length/3;const x=2*(B-1),I=p.IndexDatatype.createTypedArray(B,x);let R=0;for(P=0;P<B-1;++P)I[R++]=P,I[R++]=P+1;return new a.Geometry({attributes:G,indices:I,primitiveType:a.PrimitiveType.LINES,boundingSphere:r.BoundingSphere.fromPoints(y)})},function(t,r){return e.defined(r)&&(t=G.unpack(t,r)),t._ellipsoid=o.Ellipsoid.clone(t._ellipsoid),G.createGeometry(t)}}));
