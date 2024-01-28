define(["exports","./Transforms-ff941892","./Cartesian3-529c236c","./ComponentDatatype-ab629b88","./defaultValue-f6d5e6da","./Ellipsoid-8e26549b","./GeometryAttribute-50e472dc","./GeometryAttributes-1e4ddcd2","./GeometryOffsetAttribute-2579b8d2","./IndexDatatype-58eb7805","./Math-355606c6"],(function(t,i,e,n,a,o,r,s,u,m,l){"use strict";const f=new e.Cartesian3(1,1,1),c=Math.cos,d=Math.sin;function C(t){t=a.defaultValue(t,a.defaultValue.EMPTY_OBJECT);const i=a.defaultValue(t.radii,f),n=a.defaultValue(t.innerRadii,i),o=a.defaultValue(t.minimumClock,0),r=a.defaultValue(t.maximumClock,l.CesiumMath.TWO_PI),s=a.defaultValue(t.minimumCone,0),u=a.defaultValue(t.maximumCone,l.CesiumMath.PI),m=Math.round(a.defaultValue(t.stackPartitions,10)),c=Math.round(a.defaultValue(t.slicePartitions,8)),d=Math.round(a.defaultValue(t.subdivisions,128));this._radii=e.Cartesian3.clone(i),this._innerRadii=e.Cartesian3.clone(n),this._minimumClock=o,this._maximumClock=r,this._minimumCone=s,this._maximumCone=u,this._stackPartitions=m,this._slicePartitions=c,this._subdivisions=d,this._offsetAttribute=t.offsetAttribute,this._workerName="createEllipsoidOutlineGeometry"}C.packedLength=2*e.Cartesian3.packedLength+8,C.pack=function(t,i,n){return n=a.defaultValue(n,0),e.Cartesian3.pack(t._radii,i,n),n+=e.Cartesian3.packedLength,e.Cartesian3.pack(t._innerRadii,i,n),n+=e.Cartesian3.packedLength,i[n++]=t._minimumClock,i[n++]=t._maximumClock,i[n++]=t._minimumCone,i[n++]=t._maximumCone,i[n++]=t._stackPartitions,i[n++]=t._slicePartitions,i[n++]=t._subdivisions,i[n]=a.defaultValue(t._offsetAttribute,-1),i};const _=new e.Cartesian3,p=new e.Cartesian3,h={radii:_,innerRadii:p,minimumClock:void 0,maximumClock:void 0,minimumCone:void 0,maximumCone:void 0,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0,offsetAttribute:void 0};C.unpack=function(t,i,n){i=a.defaultValue(i,0);const o=e.Cartesian3.unpack(t,i,_);i+=e.Cartesian3.packedLength;const r=e.Cartesian3.unpack(t,i,p);i+=e.Cartesian3.packedLength;const s=t[i++],u=t[i++],m=t[i++],l=t[i++],f=t[i++],c=t[i++],d=t[i++],y=t[i];return a.defined(n)?(n._radii=e.Cartesian3.clone(o,n._radii),n._innerRadii=e.Cartesian3.clone(r,n._innerRadii),n._minimumClock=s,n._maximumClock=u,n._minimumCone=m,n._maximumCone=l,n._stackPartitions=f,n._slicePartitions=c,n._subdivisions=d,n._offsetAttribute=-1===y?void 0:y,n):(h.minimumClock=s,h.maximumClock=u,h.minimumCone=m,h.maximumCone=l,h.stackPartitions=f,h.slicePartitions=c,h.subdivisions=d,h.offsetAttribute=-1===y?void 0:y,new C(h))},C.createGeometry=function(t){const e=t._radii;if(e.x<=0||e.y<=0||e.z<=0)return;const f=t._innerRadii;if(f.x<=0||f.y<=0||f.z<=0)return;const C=t._minimumClock,_=t._maximumClock,p=t._minimumCone,h=t._maximumCone,y=t._subdivisions,k=o.Ellipsoid.fromCartesian3(e);let b=t._slicePartitions+1,A=t._stackPartitions+1;b=Math.round(b*Math.abs(_-C)/l.CesiumMath.TWO_PI),A=Math.round(A*Math.abs(h-p)/l.CesiumMath.PI),b<2&&(b=2),A<2&&(A=2);let x=0,P=1;const v=f.x!==e.x||f.y!==e.y||f.z!==e.z;let M=!1,w=!1;v&&(P=2,p>0&&(M=!0,x+=b),h<Math.PI&&(w=!0,x+=b));const V=y*P*(A+b),g=new Float64Array(3*V),E=2*(V+x-(b+A)*P),G=m.IndexDatatype.createTypedArray(V,E);let O,D,I,T,z=0;const L=new Array(A),R=new Array(A);for(O=0;O<A;O++)T=p+O*(h-p)/(A-1),L[O]=d(T),R[O]=c(T);const N=new Array(y),B=new Array(y);for(O=0;O<y;O++)I=C+O*(_-C)/(y-1),N[O]=d(I),B[O]=c(I);for(O=0;O<A;O++)for(D=0;D<y;D++)g[z++]=e.x*L[O]*B[D],g[z++]=e.y*L[O]*N[D],g[z++]=e.z*R[O];if(v)for(O=0;O<A;O++)for(D=0;D<y;D++)g[z++]=f.x*L[O]*B[D],g[z++]=f.y*L[O]*N[D],g[z++]=f.z*R[O];for(L.length=y,R.length=y,O=0;O<y;O++)T=p+O*(h-p)/(y-1),L[O]=d(T),R[O]=c(T);for(N.length=b,B.length=b,O=0;O<b;O++)I=C+O*(_-C)/(b-1),N[O]=d(I),B[O]=c(I);for(O=0;O<y;O++)for(D=0;D<b;D++)g[z++]=e.x*L[O]*B[D],g[z++]=e.y*L[O]*N[D],g[z++]=e.z*R[O];if(v)for(O=0;O<y;O++)for(D=0;D<b;D++)g[z++]=f.x*L[O]*B[D],g[z++]=f.y*L[O]*N[D],g[z++]=f.z*R[O];for(z=0,O=0;O<A*P;O++){const t=O*y;for(D=0;D<y-1;D++)G[z++]=t+D,G[z++]=t+D+1}let S=A*y*P;for(O=0;O<b;O++)for(D=0;D<y-1;D++)G[z++]=S+O+D*b,G[z++]=S+O+(D+1)*b;if(v)for(S=A*y*P+b*y,O=0;O<b;O++)for(D=0;D<y-1;D++)G[z++]=S+O+D*b,G[z++]=S+O+(D+1)*b;if(v){let t=A*y*P,i=t+y*b;if(M)for(O=0;O<b;O++)G[z++]=t+O,G[z++]=i+O;if(w)for(t+=y*b-b,i+=y*b-b,O=0;O<b;O++)G[z++]=t+O,G[z++]=i+O}const U=new s.GeometryAttributes({position:new r.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:g})});if(a.defined(t._offsetAttribute)){const i=g.length,e=t._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,a=new Uint8Array(i/3).fill(e);U.applyOffset=new r.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:a})}return new r.Geometry({attributes:U,indices:G,primitiveType:r.PrimitiveType.LINES,boundingSphere:i.BoundingSphere.fromEllipsoid(k),offsetAttribute:t._offsetAttribute})},t.EllipsoidOutlineGeometry=C}));
