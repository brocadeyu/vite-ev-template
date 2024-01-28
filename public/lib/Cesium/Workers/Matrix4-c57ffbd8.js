define(["exports","./defaultValue-f6d5e6da","./Math-355606c6","./Cartesian3-529c236c","./Matrix3-31d1f01f","./RuntimeError-9b4ce3fb"],(function(n,t,e,r,a,u){"use strict";function i(n,e){this.x=t.defaultValue(n,0),this.y=t.defaultValue(e,0)}i.fromElements=function(n,e,r){return t.defined(r)?(r.x=n,r.y=e,r):new i(n,e)},i.clone=function(n,e){if(t.defined(n))return t.defined(e)?(e.x=n.x,e.y=n.y,e):new i(n.x,n.y)},i.fromCartesian3=i.clone,i.fromCartesian4=i.clone,i.packedLength=2,i.pack=function(n,e,r){return r=t.defaultValue(r,0),e[r++]=n.x,e[r]=n.y,e},i.unpack=function(n,e,r){return e=t.defaultValue(e,0),t.defined(r)||(r=new i),r.x=n[e++],r.y=n[e],r},i.packArray=function(n,e){const r=n.length,a=2*r;t.defined(e)?(Array.isArray(e)||e.length===a)&&e.length!==a&&(e.length=a):e=new Array(a);for(let t=0;t<r;++t)i.pack(n[t],e,2*t);return e},i.unpackArray=function(n,e){const r=n.length;t.defined(e)?e.length=r/2:e=new Array(r/2);for(let t=0;t<r;t+=2){const r=t/2;e[r]=i.unpack(n,t,e[r])}return e},i.fromArray=i.unpack,i.maximumComponent=function(n){return Math.max(n.x,n.y)},i.minimumComponent=function(n){return Math.min(n.x,n.y)},i.minimumByComponent=function(n,t,e){return e.x=Math.min(n.x,t.x),e.y=Math.min(n.y,t.y),e},i.maximumByComponent=function(n,t,e){return e.x=Math.max(n.x,t.x),e.y=Math.max(n.y,t.y),e},i.clamp=function(n,t,r,a){const u=e.CesiumMath.clamp(n.x,t.x,r.x),i=e.CesiumMath.clamp(n.y,t.y,r.y);return a.x=u,a.y=i,a},i.magnitudeSquared=function(n){return n.x*n.x+n.y*n.y},i.magnitude=function(n){return Math.sqrt(i.magnitudeSquared(n))};const o=new i;i.distance=function(n,t){return i.subtract(n,t,o),i.magnitude(o)},i.distanceSquared=function(n,t){return i.subtract(n,t,o),i.magnitudeSquared(o)},i.normalize=function(n,t){const e=i.magnitude(n);return t.x=n.x/e,t.y=n.y/e,t},i.dot=function(n,t){return n.x*t.x+n.y*t.y},i.cross=function(n,t){return n.x*t.y-n.y*t.x},i.multiplyComponents=function(n,t,e){return e.x=n.x*t.x,e.y=n.y*t.y,e},i.divideComponents=function(n,t,e){return e.x=n.x/t.x,e.y=n.y/t.y,e},i.add=function(n,t,e){return e.x=n.x+t.x,e.y=n.y+t.y,e},i.subtract=function(n,t,e){return e.x=n.x-t.x,e.y=n.y-t.y,e},i.multiplyByScalar=function(n,t,e){return e.x=n.x*t,e.y=n.y*t,e},i.divideByScalar=function(n,t,e){return e.x=n.x/t,e.y=n.y/t,e},i.negate=function(n,t){return t.x=-n.x,t.y=-n.y,t},i.abs=function(n,t){return t.x=Math.abs(n.x),t.y=Math.abs(n.y),t};const c=new i;i.lerp=function(n,t,e,r){return i.multiplyByScalar(t,e,c),r=i.multiplyByScalar(n,1-e,r),i.add(c,r,r)};const s=new i,l=new i;i.angleBetween=function(n,t){return i.normalize(n,s),i.normalize(t,l),e.CesiumMath.acosClamped(i.dot(s,l))};const f=new i;function y(n,e,r,a){this.x=t.defaultValue(n,0),this.y=t.defaultValue(e,0),this.z=t.defaultValue(r,0),this.w=t.defaultValue(a,0)}i.mostOrthogonalAxis=function(n,t){const e=i.normalize(n,f);return i.abs(e,e),t=e.x<=e.y?i.clone(i.UNIT_X,t):i.clone(i.UNIT_Y,t)},i.equals=function(n,e){return n===e||t.defined(n)&&t.defined(e)&&n.x===e.x&&n.y===e.y},i.equalsArray=function(n,t,e){return n.x===t[e]&&n.y===t[e+1]},i.equalsEpsilon=function(n,r,a,u){return n===r||t.defined(n)&&t.defined(r)&&e.CesiumMath.equalsEpsilon(n.x,r.x,a,u)&&e.CesiumMath.equalsEpsilon(n.y,r.y,a,u)},i.ZERO=Object.freeze(new i(0,0)),i.ONE=Object.freeze(new i(1,1)),i.UNIT_X=Object.freeze(new i(1,0)),i.UNIT_Y=Object.freeze(new i(0,1)),i.prototype.clone=function(n){return i.clone(this,n)},i.prototype.equals=function(n){return i.equals(this,n)},i.prototype.equalsEpsilon=function(n,t,e){return i.equalsEpsilon(this,n,t,e)},i.prototype.toString=function(){return`(${this.x}, ${this.y})`},y.fromElements=function(n,e,r,a,u){return t.defined(u)?(u.x=n,u.y=e,u.z=r,u.w=a,u):new y(n,e,r,a)},y.fromColor=function(n,e){return t.defined(e)?(e.x=n.red,e.y=n.green,e.z=n.blue,e.w=n.alpha,e):new y(n.red,n.green,n.blue,n.alpha)},y.clone=function(n,e){if(t.defined(n))return t.defined(e)?(e.x=n.x,e.y=n.y,e.z=n.z,e.w=n.w,e):new y(n.x,n.y,n.z,n.w)},y.packedLength=4,y.pack=function(n,e,r){return r=t.defaultValue(r,0),e[r++]=n.x,e[r++]=n.y,e[r++]=n.z,e[r]=n.w,e},y.unpack=function(n,e,r){return e=t.defaultValue(e,0),t.defined(r)||(r=new y),r.x=n[e++],r.y=n[e++],r.z=n[e++],r.w=n[e],r},y.packArray=function(n,e){const r=n.length,a=4*r;t.defined(e)?(Array.isArray(e)||e.length===a)&&e.length!==a&&(e.length=a):e=new Array(a);for(let t=0;t<r;++t)y.pack(n[t],e,4*t);return e},y.unpackArray=function(n,e){const r=n.length;t.defined(e)?e.length=r/4:e=new Array(r/4);for(let t=0;t<r;t+=4){const r=t/4;e[r]=y.unpack(n,t,e[r])}return e},y.fromArray=y.unpack,y.maximumComponent=function(n){return Math.max(n.x,n.y,n.z,n.w)},y.minimumComponent=function(n){return Math.min(n.x,n.y,n.z,n.w)},y.minimumByComponent=function(n,t,e){return e.x=Math.min(n.x,t.x),e.y=Math.min(n.y,t.y),e.z=Math.min(n.z,t.z),e.w=Math.min(n.w,t.w),e},y.maximumByComponent=function(n,t,e){return e.x=Math.max(n.x,t.x),e.y=Math.max(n.y,t.y),e.z=Math.max(n.z,t.z),e.w=Math.max(n.w,t.w),e},y.clamp=function(n,t,r,a){const u=e.CesiumMath.clamp(n.x,t.x,r.x),i=e.CesiumMath.clamp(n.y,t.y,r.y),o=e.CesiumMath.clamp(n.z,t.z,r.z),c=e.CesiumMath.clamp(n.w,t.w,r.w);return a.x=u,a.y=i,a.z=o,a.w=c,a},y.magnitudeSquared=function(n){return n.x*n.x+n.y*n.y+n.z*n.z+n.w*n.w},y.magnitude=function(n){return Math.sqrt(y.magnitudeSquared(n))};const d=new y;y.distance=function(n,t){return y.subtract(n,t,d),y.magnitude(d)},y.distanceSquared=function(n,t){return y.subtract(n,t,d),y.magnitudeSquared(d)},y.normalize=function(n,t){const e=y.magnitude(n);return t.x=n.x/e,t.y=n.y/e,t.z=n.z/e,t.w=n.w/e,t},y.dot=function(n,t){return n.x*t.x+n.y*t.y+n.z*t.z+n.w*t.w},y.multiplyComponents=function(n,t,e){return e.x=n.x*t.x,e.y=n.y*t.y,e.z=n.z*t.z,e.w=n.w*t.w,e},y.divideComponents=function(n,t,e){return e.x=n.x/t.x,e.y=n.y/t.y,e.z=n.z/t.z,e.w=n.w/t.w,e},y.add=function(n,t,e){return e.x=n.x+t.x,e.y=n.y+t.y,e.z=n.z+t.z,e.w=n.w+t.w,e},y.subtract=function(n,t,e){return e.x=n.x-t.x,e.y=n.y-t.y,e.z=n.z-t.z,e.w=n.w-t.w,e},y.multiplyByScalar=function(n,t,e){return e.x=n.x*t,e.y=n.y*t,e.z=n.z*t,e.w=n.w*t,e},y.divideByScalar=function(n,t,e){return e.x=n.x/t,e.y=n.y/t,e.z=n.z/t,e.w=n.w/t,e},y.negate=function(n,t){return t.x=-n.x,t.y=-n.y,t.z=-n.z,t.w=-n.w,t},y.abs=function(n,t){return t.x=Math.abs(n.x),t.y=Math.abs(n.y),t.z=Math.abs(n.z),t.w=Math.abs(n.w),t};const x=new y;y.lerp=function(n,t,e,r){return y.multiplyByScalar(t,e,x),r=y.multiplyByScalar(n,1-e,r),y.add(x,r,r)};const m=new y;y.mostOrthogonalAxis=function(n,t){const e=y.normalize(n,m);return y.abs(e,e),t=e.x<=e.y?e.x<=e.z?e.x<=e.w?y.clone(y.UNIT_X,t):y.clone(y.UNIT_W,t):e.z<=e.w?y.clone(y.UNIT_Z,t):y.clone(y.UNIT_W,t):e.y<=e.z?e.y<=e.w?y.clone(y.UNIT_Y,t):y.clone(y.UNIT_W,t):e.z<=e.w?y.clone(y.UNIT_Z,t):y.clone(y.UNIT_W,t)},y.equals=function(n,e){return n===e||t.defined(n)&&t.defined(e)&&n.x===e.x&&n.y===e.y&&n.z===e.z&&n.w===e.w},y.equalsArray=function(n,t,e){return n.x===t[e]&&n.y===t[e+1]&&n.z===t[e+2]&&n.w===t[e+3]},y.equalsEpsilon=function(n,r,a,u){return n===r||t.defined(n)&&t.defined(r)&&e.CesiumMath.equalsEpsilon(n.x,r.x,a,u)&&e.CesiumMath.equalsEpsilon(n.y,r.y,a,u)&&e.CesiumMath.equalsEpsilon(n.z,r.z,a,u)&&e.CesiumMath.equalsEpsilon(n.w,r.w,a,u)},y.ZERO=Object.freeze(new y(0,0,0,0)),y.ONE=Object.freeze(new y(1,1,1,1)),y.UNIT_X=Object.freeze(new y(1,0,0,0)),y.UNIT_Y=Object.freeze(new y(0,1,0,0)),y.UNIT_Z=Object.freeze(new y(0,0,1,0)),y.UNIT_W=Object.freeze(new y(0,0,0,1)),y.prototype.clone=function(n){return y.clone(this,n)},y.prototype.equals=function(n){return y.equals(this,n)},y.prototype.equalsEpsilon=function(n,t,e){return y.equalsEpsilon(this,n,t,e)},y.prototype.toString=function(){return`(${this.x}, ${this.y}, ${this.z}, ${this.w})`};const h=new Float32Array(1),w=new Uint8Array(h.buffer),p=new Uint32Array([287454020]),z=68===new Uint8Array(p.buffer)[0];function M(n,e,r,a,u,i,o,c,s,l,f,y,d,x,m,h){this[0]=t.defaultValue(n,0),this[1]=t.defaultValue(u,0),this[2]=t.defaultValue(s,0),this[3]=t.defaultValue(d,0),this[4]=t.defaultValue(e,0),this[5]=t.defaultValue(i,0),this[6]=t.defaultValue(l,0),this[7]=t.defaultValue(x,0),this[8]=t.defaultValue(r,0),this[9]=t.defaultValue(o,0),this[10]=t.defaultValue(f,0),this[11]=t.defaultValue(m,0),this[12]=t.defaultValue(a,0),this[13]=t.defaultValue(c,0),this[14]=t.defaultValue(y,0),this[15]=t.defaultValue(h,0)}function C(n){return n>0?1:n<0?-1:0}y.packFloat=function(n,e){return t.defined(e)||(e=new y),h[0]=n,z?(e.x=w[0],e.y=w[1],e.z=w[2],e.w=w[3]):(e.x=w[3],e.y=w[2],e.z=w[1],e.w=w[0]),e},y.unpackFloat=function(n){return z?(w[0]=n.x,w[1]=n.y,w[2]=n.z,w[3]=n.w):(w[0]=n.w,w[1]=n.z,w[2]=n.y,w[3]=n.x),h[0]},M.packedLength=16,M.computeReflection=function(n,e,r,a,u){return t.defined(u)||(u=new M),u[0]=1-2*n*n,u[1]=-2*n*e,u[2]=-2*n*r,u[3]=0,u[4]=-2*e*n,u[5]=1-2*e*e,u[6]=-2*e*r,u[7]=0,u[8]=-2*r*n,u[9]=-2*r*e,u[10]=1-2*r*r,u[11]=0,u[12]=-2*a*n,u[13]=-2*a*e,u[14]=-2*a*r,u[15]=1,u},M.computeObliquePerspective=function(n,t,e){const r=M.inverse(e,new M),a=M.inverseTranspose(t,new M),u=M.multiplyByVector(a,n,new y),i=new y(C(u.x),C(u.y),1,1),o=M.multiplyByVector(r,i,new y),c=2/y.dot(u,o),s=[u.x*c,u.y*c,u.z*c+1,u.w*c];return new M(e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],s[0],s[1],s[2],s[3],e[3],e[7],e[11],e[15])},M.pack=function(n,e,r){return r=t.defaultValue(r,0),e[r++]=n[0],e[r++]=n[1],e[r++]=n[2],e[r++]=n[3],e[r++]=n[4],e[r++]=n[5],e[r++]=n[6],e[r++]=n[7],e[r++]=n[8],e[r++]=n[9],e[r++]=n[10],e[r++]=n[11],e[r++]=n[12],e[r++]=n[13],e[r++]=n[14],e[r]=n[15],e},M.unpack=function(n,e,r){return e=t.defaultValue(e,0),t.defined(r)||(r=new M),r[0]=n[e++],r[1]=n[e++],r[2]=n[e++],r[3]=n[e++],r[4]=n[e++],r[5]=n[e++],r[6]=n[e++],r[7]=n[e++],r[8]=n[e++],r[9]=n[e++],r[10]=n[e++],r[11]=n[e++],r[12]=n[e++],r[13]=n[e++],r[14]=n[e++],r[15]=n[e],r},M.packArray=function(n,e){const r=n.length,a=16*r;t.defined(e)?(Array.isArray(e)||e.length===a)&&e.length!==a&&(e.length=a):e=new Array(a);for(let t=0;t<r;++t)M.pack(n[t],e,16*t);return e},M.unpackArray=function(n,e){const r=n.length;t.defined(e)?e.length=r/16:e=new Array(r/16);for(let t=0;t<r;t+=16){const r=t/16;e[r]=M.unpack(n,t,e[r])}return e},M.clone=function(n,e){if(t.defined(n))return t.defined(e)?(e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e):new M(n[0],n[4],n[8],n[12],n[1],n[5],n[9],n[13],n[2],n[6],n[10],n[14],n[3],n[7],n[11],n[15])},M.fromArray=M.unpack,M.fromColumnMajorArray=function(n,t){return M.clone(n,t)},M.fromRowMajorArray=function(n,e){return t.defined(e)?(e[0]=n[0],e[1]=n[4],e[2]=n[8],e[3]=n[12],e[4]=n[1],e[5]=n[5],e[6]=n[9],e[7]=n[13],e[8]=n[2],e[9]=n[6],e[10]=n[10],e[11]=n[14],e[12]=n[3],e[13]=n[7],e[14]=n[11],e[15]=n[15],e):new M(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],n[12],n[13],n[14],n[15])},M.fromRotationTranslation=function(n,e,a){return e=t.defaultValue(e,r.Cartesian3.ZERO),t.defined(a)?(a[0]=n[0],a[1]=n[1],a[2]=n[2],a[3]=0,a[4]=n[3],a[5]=n[4],a[6]=n[5],a[7]=0,a[8]=n[6],a[9]=n[7],a[10]=n[8],a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,a):new M(n[0],n[3],n[6],e.x,n[1],n[4],n[7],e.y,n[2],n[5],n[8],e.z,0,0,0,1)},M.fromTranslationQuaternionRotationScale=function(n,e,r,a){t.defined(a)||(a=new M);const u=r.x,i=r.y,o=r.z,c=e.x*e.x,s=e.x*e.y,l=e.x*e.z,f=e.x*e.w,y=e.y*e.y,d=e.y*e.z,x=e.y*e.w,m=e.z*e.z,h=e.z*e.w,w=e.w*e.w,p=c-y-m+w,z=2*(s-h),C=2*(l+x),b=2*(s+h),g=-c+y-m+w,O=2*(d-f),V=2*(l-x),q=2*(d+f),N=-c-y+m+w;return a[0]=p*u,a[1]=b*u,a[2]=V*u,a[3]=0,a[4]=z*i,a[5]=g*i,a[6]=q*i,a[7]=0,a[8]=C*o,a[9]=O*o,a[10]=N*o,a[11]=0,a[12]=n.x,a[13]=n.y,a[14]=n.z,a[15]=1,a},M.fromTranslationRotationScale=function(n,t){return M.fromTranslationQuaternionRotationScale(n.translation,n.rotation,n.scale,t)},M.fromTranslation=function(n,t){return M.fromRotationTranslation(a.Matrix3.IDENTITY,n,t)},M.fromScale=function(n,e){return t.defined(e)?(e[0]=n.x,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n.y,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=n.z,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e):new M(n.x,0,0,0,0,n.y,0,0,0,0,n.z,0,0,0,0,1)},M.fromUniformScale=function(n,e){return t.defined(e)?(e[0]=n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e):new M(n,0,0,0,0,n,0,0,0,0,n,0,0,0,0,1)},M.fromRotation=function(n,e){return t.defined(e)||(e=new M),e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=0,e[4]=n[3],e[5]=n[4],e[6]=n[5],e[7]=0,e[8]=n[6],e[9]=n[7],e[10]=n[8],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};const b=new r.Cartesian3,g=new r.Cartesian3,O=new r.Cartesian3;M.fromCamera=function(n,e){const a=n.position,u=n.direction,i=n.up;r.Cartesian3.normalize(u,b),r.Cartesian3.normalize(r.Cartesian3.cross(b,i,g),g),r.Cartesian3.normalize(r.Cartesian3.cross(g,b,O),O);const o=g.x,c=g.y,s=g.z,l=b.x,f=b.y,y=b.z,d=O.x,x=O.y,m=O.z,h=a.x,w=a.y,p=a.z,z=o*-h+c*-w+s*-p,C=d*-h+x*-w+m*-p,V=l*h+f*w+y*p;return t.defined(e)?(e[0]=o,e[1]=d,e[2]=-l,e[3]=0,e[4]=c,e[5]=x,e[6]=-f,e[7]=0,e[8]=s,e[9]=m,e[10]=-y,e[11]=0,e[12]=z,e[13]=C,e[14]=V,e[15]=1,e):new M(o,c,s,z,d,x,m,C,-l,-f,-y,V,0,0,0,1)},M.computePerspectiveFieldOfView=function(n,t,e,r,a){const u=1/Math.tan(.5*n),i=u/t,o=(r+e)/(e-r),c=2*r*e/(e-r);return a[0]=i,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=u,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=o,a[11]=-1,a[12]=0,a[13]=0,a[14]=c,a[15]=0,a},M.computeOrthographicOffCenter=function(n,t,e,r,a,u,i){let o=1/(t-n),c=1/(r-e),s=1/(u-a);const l=-(t+n)*o,f=-(r+e)*c,y=-(u+a)*s;return o*=2,c*=2,s*=-2,i[0]=o,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=c,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=s,i[11]=0,i[12]=l,i[13]=f,i[14]=y,i[15]=1,i},M.computePerspectiveOffCenter=function(n,t,e,r,a,u,i){const o=2*a/(t-n),c=2*a/(r-e),s=(t+n)/(t-n),l=(r+e)/(r-e),f=-(u+a)/(u-a),y=-2*u*a/(u-a);return i[0]=o,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=c,i[6]=0,i[7]=0,i[8]=s,i[9]=l,i[10]=f,i[11]=-1,i[12]=0,i[13]=0,i[14]=y,i[15]=0,i},M.computeInfinitePerspectiveOffCenter=function(n,t,e,r,a,u){const i=2*a/(t-n),o=2*a/(r-e),c=(t+n)/(t-n),s=(r+e)/(r-e),l=-2*a;return u[0]=i,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=o,u[6]=0,u[7]=0,u[8]=c,u[9]=s,u[10]=-1,u[11]=-1,u[12]=0,u[13]=0,u[14]=l,u[15]=0,u},M.computeViewportTransformation=function(n,e,r,a){t.defined(a)||(a=new M),n=t.defaultValue(n,t.defaultValue.EMPTY_OBJECT);const u=t.defaultValue(n.x,0),i=t.defaultValue(n.y,0),o=t.defaultValue(n.width,0),c=t.defaultValue(n.height,0);e=t.defaultValue(e,0);const s=.5*o,l=.5*c,f=.5*((r=t.defaultValue(r,1))-e),y=s,d=l,x=f,m=u+s,h=i+l,w=e+f;return a[0]=y,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=d,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=x,a[11]=0,a[12]=m,a[13]=h,a[14]=w,a[15]=1,a},M.computeView=function(n,t,e,a,u){return u[0]=a.x,u[1]=e.x,u[2]=-t.x,u[3]=0,u[4]=a.y,u[5]=e.y,u[6]=-t.y,u[7]=0,u[8]=a.z,u[9]=e.z,u[10]=-t.z,u[11]=0,u[12]=-r.Cartesian3.dot(a,n),u[13]=-r.Cartesian3.dot(e,n),u[14]=r.Cartesian3.dot(t,n),u[15]=1,u},M.toArray=function(n,e){return t.defined(e)?(e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e):[n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],n[12],n[13],n[14],n[15]]},M.getElementIndex=function(n,t){return 4*n+t},M.getColumn=function(n,t,e){const r=4*t,a=n[r],u=n[r+1],i=n[r+2],o=n[r+3];return e.x=a,e.y=u,e.z=i,e.w=o,e},M.setColumn=function(n,t,e,r){const a=4*t;return(r=M.clone(n,r))[a]=e.x,r[a+1]=e.y,r[a+2]=e.z,r[a+3]=e.w,r},M.getRow=function(n,t,e){const r=n[t],a=n[t+4],u=n[t+8],i=n[t+12];return e.x=r,e.y=a,e.z=u,e.w=i,e},M.setRow=function(n,t,e,r){return(r=M.clone(n,r))[t]=e.x,r[t+4]=e.y,r[t+8]=e.z,r[t+12]=e.w,r},M.setTranslation=function(n,t,e){return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=t.x,e[13]=t.y,e[14]=t.z,e[15]=n[15],e};const V=new r.Cartesian3;M.setScale=function(n,t,e){const r=M.getScale(n,V),a=t.x/r.x,u=t.y/r.y,i=t.z/r.z;return e[0]=n[0]*a,e[1]=n[1]*a,e[2]=n[2]*a,e[3]=n[3],e[4]=n[4]*u,e[5]=n[5]*u,e[6]=n[6]*u,e[7]=n[7],e[8]=n[8]*i,e[9]=n[9]*i,e[10]=n[10]*i,e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e};const q=new r.Cartesian3;M.setUniformScale=function(n,t,e){const r=M.getScale(n,q),a=t/r.x,u=t/r.y,i=t/r.z;return e[0]=n[0]*a,e[1]=n[1]*a,e[2]=n[2]*a,e[3]=n[3],e[4]=n[4]*u,e[5]=n[5]*u,e[6]=n[6]*u,e[7]=n[7],e[8]=n[8]*i,e[9]=n[9]*i,e[10]=n[10]*i,e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e};const N=new r.Cartesian3;M.getScale=function(n,t){return t.x=r.Cartesian3.magnitude(r.Cartesian3.fromElements(n[0],n[1],n[2],N)),t.y=r.Cartesian3.magnitude(r.Cartesian3.fromElements(n[4],n[5],n[6],N)),t.z=r.Cartesian3.magnitude(r.Cartesian3.fromElements(n[8],n[9],n[10],N)),t};const S=new r.Cartesian3;M.getMaximumScale=function(n){return M.getScale(n,S),r.Cartesian3.maximumComponent(S)};const U=new r.Cartesian3;M.setRotation=function(n,t,e){const r=M.getScale(n,U);return e[0]=t[0]*r.x,e[1]=t[1]*r.x,e[2]=t[2]*r.x,e[3]=n[3],e[4]=t[3]*r.y,e[5]=t[4]*r.y,e[6]=t[5]*r.y,e[7]=n[7],e[8]=t[6]*r.z,e[9]=t[7]*r.z,e[10]=t[8]*r.z,e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e};const E=new r.Cartesian3;M.getRotation=function(n,t){const e=M.getScale(n,E);return t[0]=n[0]/e.x,t[1]=n[1]/e.x,t[2]=n[2]/e.x,t[3]=n[4]/e.y,t[4]=n[5]/e.y,t[5]=n[6]/e.y,t[6]=n[8]/e.z,t[7]=n[9]/e.z,t[8]=n[10]/e.z,t},M.multiply=function(n,t,e){const r=n[0],a=n[1],u=n[2],i=n[3],o=n[4],c=n[5],s=n[6],l=n[7],f=n[8],y=n[9],d=n[10],x=n[11],m=n[12],h=n[13],w=n[14],p=n[15],z=t[0],M=t[1],C=t[2],b=t[3],g=t[4],O=t[5],V=t[6],q=t[7],N=t[8],S=t[9],U=t[10],E=t[11],T=t[12],R=t[13],A=t[14],k=t[15],B=r*z+o*M+f*C+m*b,I=a*z+c*M+y*C+h*b,L=u*z+s*M+d*C+w*b,$=i*z+l*M+x*C+p*b,W=r*g+o*O+f*V+m*q,_=a*g+c*O+y*V+h*q,j=u*g+s*O+d*V+w*q,v=i*g+l*O+x*V+p*q,P=r*N+o*S+f*U+m*E,Y=a*N+c*S+y*U+h*E,Z=u*N+s*S+d*U+w*E,F=i*N+l*S+x*U+p*E,X=r*T+o*R+f*A+m*k,D=a*T+c*R+y*A+h*k,Q=u*T+s*R+d*A+w*k,J=i*T+l*R+x*A+p*k;return e[0]=B,e[1]=I,e[2]=L,e[3]=$,e[4]=W,e[5]=_,e[6]=j,e[7]=v,e[8]=P,e[9]=Y,e[10]=Z,e[11]=F,e[12]=X,e[13]=D,e[14]=Q,e[15]=J,e},M.add=function(n,t,e){return e[0]=n[0]+t[0],e[1]=n[1]+t[1],e[2]=n[2]+t[2],e[3]=n[3]+t[3],e[4]=n[4]+t[4],e[5]=n[5]+t[5],e[6]=n[6]+t[6],e[7]=n[7]+t[7],e[8]=n[8]+t[8],e[9]=n[9]+t[9],e[10]=n[10]+t[10],e[11]=n[11]+t[11],e[12]=n[12]+t[12],e[13]=n[13]+t[13],e[14]=n[14]+t[14],e[15]=n[15]+t[15],e},M.subtract=function(n,t,e){return e[0]=n[0]-t[0],e[1]=n[1]-t[1],e[2]=n[2]-t[2],e[3]=n[3]-t[3],e[4]=n[4]-t[4],e[5]=n[5]-t[5],e[6]=n[6]-t[6],e[7]=n[7]-t[7],e[8]=n[8]-t[8],e[9]=n[9]-t[9],e[10]=n[10]-t[10],e[11]=n[11]-t[11],e[12]=n[12]-t[12],e[13]=n[13]-t[13],e[14]=n[14]-t[14],e[15]=n[15]-t[15],e},M.multiplyTransformation=function(n,t,e){const r=n[0],a=n[1],u=n[2],i=n[4],o=n[5],c=n[6],s=n[8],l=n[9],f=n[10],y=n[12],d=n[13],x=n[14],m=t[0],h=t[1],w=t[2],p=t[4],z=t[5],M=t[6],C=t[8],b=t[9],g=t[10],O=t[12],V=t[13],q=t[14],N=r*m+i*h+s*w,S=a*m+o*h+l*w,U=u*m+c*h+f*w,E=r*p+i*z+s*M,T=a*p+o*z+l*M,R=u*p+c*z+f*M,A=r*C+i*b+s*g,k=a*C+o*b+l*g,B=u*C+c*b+f*g,I=r*O+i*V+s*q+y,L=a*O+o*V+l*q+d,$=u*O+c*V+f*q+x;return e[0]=N,e[1]=S,e[2]=U,e[3]=0,e[4]=E,e[5]=T,e[6]=R,e[7]=0,e[8]=A,e[9]=k,e[10]=B,e[11]=0,e[12]=I,e[13]=L,e[14]=$,e[15]=1,e},M.multiplyByMatrix3=function(n,t,e){const r=n[0],a=n[1],u=n[2],i=n[4],o=n[5],c=n[6],s=n[8],l=n[9],f=n[10],y=t[0],d=t[1],x=t[2],m=t[3],h=t[4],w=t[5],p=t[6],z=t[7],M=t[8],C=r*y+i*d+s*x,b=a*y+o*d+l*x,g=u*y+c*d+f*x,O=r*m+i*h+s*w,V=a*m+o*h+l*w,q=u*m+c*h+f*w,N=r*p+i*z+s*M,S=a*p+o*z+l*M,U=u*p+c*z+f*M;return e[0]=C,e[1]=b,e[2]=g,e[3]=0,e[4]=O,e[5]=V,e[6]=q,e[7]=0,e[8]=N,e[9]=S,e[10]=U,e[11]=0,e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e},M.multiplyByTranslation=function(n,t,e){const r=t.x,a=t.y,u=t.z,i=r*n[0]+a*n[4]+u*n[8]+n[12],o=r*n[1]+a*n[5]+u*n[9]+n[13],c=r*n[2]+a*n[6]+u*n[10]+n[14];return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=i,e[13]=o,e[14]=c,e[15]=n[15],e},M.multiplyByScale=function(n,t,e){const r=t.x,a=t.y,u=t.z;return 1===r&&1===a&&1===u?M.clone(n,e):(e[0]=r*n[0],e[1]=r*n[1],e[2]=r*n[2],e[3]=n[3],e[4]=a*n[4],e[5]=a*n[5],e[6]=a*n[6],e[7]=n[7],e[8]=u*n[8],e[9]=u*n[9],e[10]=u*n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e)},M.multiplyByUniformScale=function(n,t,e){return e[0]=n[0]*t,e[1]=n[1]*t,e[2]=n[2]*t,e[3]=n[3],e[4]=n[4]*t,e[5]=n[5]*t,e[6]=n[6]*t,e[7]=n[7],e[8]=n[8]*t,e[9]=n[9]*t,e[10]=n[10]*t,e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],e},M.multiplyByVector=function(n,t,e){const r=t.x,a=t.y,u=t.z,i=t.w,o=n[0]*r+n[4]*a+n[8]*u+n[12]*i,c=n[1]*r+n[5]*a+n[9]*u+n[13]*i,s=n[2]*r+n[6]*a+n[10]*u+n[14]*i,l=n[3]*r+n[7]*a+n[11]*u+n[15]*i;return e.x=o,e.y=c,e.z=s,e.w=l,e},M.multiplyByPointAsVector=function(n,t,e){const r=t.x,a=t.y,u=t.z,i=n[0]*r+n[4]*a+n[8]*u,o=n[1]*r+n[5]*a+n[9]*u,c=n[2]*r+n[6]*a+n[10]*u;return e.x=i,e.y=o,e.z=c,e},M.multiplyByPoint=function(n,t,e){const r=t.x,a=t.y,u=t.z,i=n[0]*r+n[4]*a+n[8]*u+n[12],o=n[1]*r+n[5]*a+n[9]*u+n[13],c=n[2]*r+n[6]*a+n[10]*u+n[14];return e.x=i,e.y=o,e.z=c,e},M.multiplyByScalar=function(n,t,e){return e[0]=n[0]*t,e[1]=n[1]*t,e[2]=n[2]*t,e[3]=n[3]*t,e[4]=n[4]*t,e[5]=n[5]*t,e[6]=n[6]*t,e[7]=n[7]*t,e[8]=n[8]*t,e[9]=n[9]*t,e[10]=n[10]*t,e[11]=n[11]*t,e[12]=n[12]*t,e[13]=n[13]*t,e[14]=n[14]*t,e[15]=n[15]*t,e},M.negate=function(n,t){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t[4]=-n[4],t[5]=-n[5],t[6]=-n[6],t[7]=-n[7],t[8]=-n[8],t[9]=-n[9],t[10]=-n[10],t[11]=-n[11],t[12]=-n[12],t[13]=-n[13],t[14]=-n[14],t[15]=-n[15],t},M.transpose=function(n,t){const e=n[1],r=n[2],a=n[3],u=n[6],i=n[7],o=n[11];return t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=e,t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=r,t[9]=u,t[10]=n[10],t[11]=n[14],t[12]=a,t[13]=i,t[14]=o,t[15]=n[15],t},M.abs=function(n,t){return t[0]=Math.abs(n[0]),t[1]=Math.abs(n[1]),t[2]=Math.abs(n[2]),t[3]=Math.abs(n[3]),t[4]=Math.abs(n[4]),t[5]=Math.abs(n[5]),t[6]=Math.abs(n[6]),t[7]=Math.abs(n[7]),t[8]=Math.abs(n[8]),t[9]=Math.abs(n[9]),t[10]=Math.abs(n[10]),t[11]=Math.abs(n[11]),t[12]=Math.abs(n[12]),t[13]=Math.abs(n[13]),t[14]=Math.abs(n[14]),t[15]=Math.abs(n[15]),t},M.equals=function(n,e){return n===e||t.defined(n)&&t.defined(e)&&n[12]===e[12]&&n[13]===e[13]&&n[14]===e[14]&&n[0]===e[0]&&n[1]===e[1]&&n[2]===e[2]&&n[4]===e[4]&&n[5]===e[5]&&n[6]===e[6]&&n[8]===e[8]&&n[9]===e[9]&&n[10]===e[10]&&n[3]===e[3]&&n[7]===e[7]&&n[11]===e[11]&&n[15]===e[15]},M.equalsEpsilon=function(n,e,r){return r=t.defaultValue(r,0),n===e||t.defined(n)&&t.defined(e)&&Math.abs(n[0]-e[0])<=r&&Math.abs(n[1]-e[1])<=r&&Math.abs(n[2]-e[2])<=r&&Math.abs(n[3]-e[3])<=r&&Math.abs(n[4]-e[4])<=r&&Math.abs(n[5]-e[5])<=r&&Math.abs(n[6]-e[6])<=r&&Math.abs(n[7]-e[7])<=r&&Math.abs(n[8]-e[8])<=r&&Math.abs(n[9]-e[9])<=r&&Math.abs(n[10]-e[10])<=r&&Math.abs(n[11]-e[11])<=r&&Math.abs(n[12]-e[12])<=r&&Math.abs(n[13]-e[13])<=r&&Math.abs(n[14]-e[14])<=r&&Math.abs(n[15]-e[15])<=r},M.getTranslation=function(n,t){return t.x=n[12],t.y=n[13],t.z=n[14],t},M.getMatrix3=function(n,t){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t};const T=new a.Matrix3,R=new a.Matrix3,A=new y,k=new y(0,0,0,1);M.inverse=function(n,t){const r=n[0],i=n[4],o=n[8],c=n[12],s=n[1],l=n[5],f=n[9],d=n[13],x=n[2],m=n[6],h=n[10],w=n[14],p=n[3],z=n[7],C=n[11],b=n[15];let g=h*b,O=w*C,V=m*b,q=w*z,N=m*C,S=h*z,U=x*b,E=w*p,B=x*C,I=h*p,L=x*z,$=m*p;const W=g*l+q*f+N*d-(O*l+V*f+S*d),_=O*s+U*f+I*d-(g*s+E*f+B*d),j=V*s+E*l+L*d-(q*s+U*l+$*d),v=S*s+B*l+$*f-(N*s+I*l+L*f),P=O*i+V*o+S*c-(g*i+q*o+N*c),Y=g*r+E*o+B*c-(O*r+U*o+I*c),Z=q*r+U*i+$*c-(V*r+E*i+L*c),F=N*r+I*i+L*o-(S*r+B*i+$*o);g=o*d,O=c*f,V=i*d,q=c*l,N=i*f,S=o*l,U=r*d,E=c*s,B=r*f,I=o*s,L=r*l,$=i*s;const X=g*z+q*C+N*b-(O*z+V*C+S*b),D=O*p+U*C+I*b-(g*p+E*C+B*b),Q=V*p+E*z+L*b-(q*p+U*z+$*b),J=S*p+B*z+$*C-(N*p+I*z+L*C),G=V*h+S*w+O*m-(N*w+g*m+q*h),H=B*w+g*x+E*h-(U*h+I*w+O*x),K=U*m+$*w+q*x-(L*w+V*x+E*m),nn=L*h+N*x+I*m-(B*m+$*h+S*x);let tn=r*W+i*_+o*j+c*v;if(Math.abs(tn)<e.CesiumMath.EPSILON21){if(a.Matrix3.equalsEpsilon(M.getMatrix3(n,T),R,e.CesiumMath.EPSILON7)&&y.equals(M.getRow(n,3,A),k))return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=0,t[11]=0,t[12]=-n[12],t[13]=-n[13],t[14]=-n[14],t[15]=1,t;throw new u.RuntimeError("matrix is not invertible because its determinate is zero.")}return tn=1/tn,t[0]=W*tn,t[1]=_*tn,t[2]=j*tn,t[3]=v*tn,t[4]=P*tn,t[5]=Y*tn,t[6]=Z*tn,t[7]=F*tn,t[8]=X*tn,t[9]=D*tn,t[10]=Q*tn,t[11]=J*tn,t[12]=G*tn,t[13]=H*tn,t[14]=K*tn,t[15]=nn*tn,t},M.inverseTransformation=function(n,t){const e=n[0],r=n[1],a=n[2],u=n[4],i=n[5],o=n[6],c=n[8],s=n[9],l=n[10],f=n[12],y=n[13],d=n[14],x=-e*f-r*y-a*d,m=-u*f-i*y-o*d,h=-c*f-s*y-l*d;return t[0]=e,t[1]=u,t[2]=c,t[3]=0,t[4]=r,t[5]=i,t[6]=s,t[7]=0,t[8]=a,t[9]=o,t[10]=l,t[11]=0,t[12]=x,t[13]=m,t[14]=h,t[15]=1,t};const B=new M;M.inverseTranspose=function(n,t){return M.inverse(M.transpose(n,B),t)},M.IDENTITY=Object.freeze(new M(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)),M.ZERO=Object.freeze(new M(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)),M.COLUMN0ROW0=0,M.COLUMN0ROW1=1,M.COLUMN0ROW2=2,M.COLUMN0ROW3=3,M.COLUMN1ROW0=4,M.COLUMN1ROW1=5,M.COLUMN1ROW2=6,M.COLUMN1ROW3=7,M.COLUMN2ROW0=8,M.COLUMN2ROW1=9,M.COLUMN2ROW2=10,M.COLUMN2ROW3=11,M.COLUMN3ROW0=12,M.COLUMN3ROW1=13,M.COLUMN3ROW2=14,M.COLUMN3ROW3=15,Object.defineProperties(M.prototype,{length:{get:function(){return M.packedLength}}}),M.prototype.clone=function(n){return M.clone(this,n)},M.prototype.equals=function(n){return M.equals(this,n)},M.equalsArray=function(n,t,e){return n[0]===t[e]&&n[1]===t[e+1]&&n[2]===t[e+2]&&n[3]===t[e+3]&&n[4]===t[e+4]&&n[5]===t[e+5]&&n[6]===t[e+6]&&n[7]===t[e+7]&&n[8]===t[e+8]&&n[9]===t[e+9]&&n[10]===t[e+10]&&n[11]===t[e+11]&&n[12]===t[e+12]&&n[13]===t[e+13]&&n[14]===t[e+14]&&n[15]===t[e+15]},M.prototype.equalsEpsilon=function(n,t){return M.equalsEpsilon(this,n,t)},M.prototype.toString=function(){return`(${this[0]}, ${this[4]}, ${this[8]}, ${this[12]})\n(${this[1]}, ${this[5]}, ${this[9]}, ${this[13]})\n(${this[2]}, ${this[6]}, ${this[10]}, ${this[14]})\n(${this[3]}, ${this[7]}, ${this[11]}, ${this[15]})`},n.Cartesian2=i,n.Cartesian4=y,n.Matrix4=M}));
