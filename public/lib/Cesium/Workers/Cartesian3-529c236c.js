define(["exports","./defaultValue-f6d5e6da","./Math-355606c6"],(function(n,e,t){"use strict";function r(n,t,r){this.x=e.defaultValue(n,0),this.y=e.defaultValue(t,0),this.z=e.defaultValue(r,0)}r.fromSpherical=function(n,t){e.defined(t)||(t=new r);const a=n.clock,u=n.cone,i=e.defaultValue(n.magnitude,1),o=i*Math.sin(u);return t.x=o*Math.cos(a),t.y=o*Math.sin(a),t.z=i*Math.cos(u),t},r.fromElements=function(n,t,a,u){return e.defined(u)?(u.x=n,u.y=t,u.z=a,u):new r(n,t,a)},r.clone=function(n,t){if(e.defined(n))return e.defined(t)?(t.x=n.x,t.y=n.y,t.z=n.z,t):new r(n.x,n.y,n.z)},r.fromCartesian4=r.clone,r.packedLength=3,r.pack=function(n,t,r){return r=e.defaultValue(r,0),t[r++]=n.x,t[r++]=n.y,t[r]=n.z,t},r.unpack=function(n,t,a){return t=e.defaultValue(t,0),e.defined(a)||(a=new r),a.x=n[t++],a.y=n[t++],a.z=n[t],a},r.packArray=function(n,t){const a=n.length,u=3*a;e.defined(t)?(Array.isArray(t)||t.length===u)&&t.length!==u&&(t.length=u):t=new Array(u);for(let e=0;e<a;++e)r.pack(n[e],t,3*e);return t},r.unpackArray=function(n,t){const a=n.length;e.defined(t)?t.length=a/3:t=new Array(a/3);for(let e=0;e<a;e+=3){const a=e/3;t[a]=r.unpack(n,e,t[a])}return t},r.fromArray=r.unpack,r.maximumComponent=function(n){return Math.max(n.x,n.y,n.z)},r.minimumComponent=function(n){return Math.min(n.x,n.y,n.z)},r.minimumByComponent=function(n,e,t){return t.x=Math.min(n.x,e.x),t.y=Math.min(n.y,e.y),t.z=Math.min(n.z,e.z),t},r.maximumByComponent=function(n,e,t){return t.x=Math.max(n.x,e.x),t.y=Math.max(n.y,e.y),t.z=Math.max(n.z,e.z),t},r.clamp=function(n,e,r,a){const u=t.CesiumMath.clamp(n.x,e.x,r.x),i=t.CesiumMath.clamp(n.y,e.y,r.y),o=t.CesiumMath.clamp(n.z,e.z,r.z);return a.x=u,a.y=i,a.z=o,a},r.magnitudeSquared=function(n){return n.x*n.x+n.y*n.y+n.z*n.z},r.magnitude=function(n){return Math.sqrt(r.magnitudeSquared(n))};const a=new r;r.distance=function(n,e){return r.subtract(n,e,a),r.magnitude(a)},r.distanceSquared=function(n,e){return r.subtract(n,e,a),r.magnitudeSquared(a)},r.normalize=function(n,e){const t=r.magnitude(n);return e.x=n.x/t,e.y=n.y/t,e.z=n.z/t,e},r.dot=function(n,e){return n.x*e.x+n.y*e.y+n.z*e.z},r.multiplyComponents=function(n,e,t){return t.x=n.x*e.x,t.y=n.y*e.y,t.z=n.z*e.z,t},r.divideComponents=function(n,e,t){return t.x=n.x/e.x,t.y=n.y/e.y,t.z=n.z/e.z,t},r.add=function(n,e,t){return t.x=n.x+e.x,t.y=n.y+e.y,t.z=n.z+e.z,t},r.subtract=function(n,t,a){return e.defined(a)||(a=new r),a.x=n.x-t.x,a.y=n.y-t.y,a.z=n.z-t.z,a},r.multiplyByScalar=function(n,e,t){return t.x=n.x*e,t.y=n.y*e,t.z=n.z*e,t},r.divideByScalar=function(n,e,t){return t.x=n.x/e,t.y=n.y/e,t.z=n.z/e,t},r.negate=function(n,e){return e.x=-n.x,e.y=-n.y,e.z=-n.z,e},r.abs=function(n,e){return e.x=Math.abs(n.x),e.y=Math.abs(n.y),e.z=Math.abs(n.z),e};const u=new r;r.lerp=function(n,e,t,a){return r.multiplyByScalar(e,t,u),a=r.multiplyByScalar(n,1-t,a),r.add(u,a,a)};const i=new r,o=new r;r.angleBetween=function(n,e){r.normalize(n,i),r.normalize(e,o);const t=r.dot(i,o),a=r.magnitude(r.cross(i,o,i));return Math.atan2(a,t)};const c=new r;r.mostOrthogonalAxis=function(n,e){const t=r.normalize(n,c);return r.abs(t,t),e=t.x<=t.y?t.x<=t.z?r.clone(r.UNIT_X,e):r.clone(r.UNIT_Z,e):t.y<=t.z?r.clone(r.UNIT_Y,e):r.clone(r.UNIT_Z,e)},r.projectVector=function(n,e,t){const a=r.dot(n,e)/r.dot(e,e);return r.multiplyByScalar(e,a,t)},r.equals=function(n,t){return n===t||e.defined(n)&&e.defined(t)&&n.x===t.x&&n.y===t.y&&n.z===t.z},r.equalsArray=function(n,e,t){return n.x===e[t]&&n.y===e[t+1]&&n.z===e[t+2]},r.equalsEpsilon=function(n,r,a,u){return n===r||e.defined(n)&&e.defined(r)&&t.CesiumMath.equalsEpsilon(n.x,r.x,a,u)&&t.CesiumMath.equalsEpsilon(n.y,r.y,a,u)&&t.CesiumMath.equalsEpsilon(n.z,r.z,a,u)},r.cross=function(n,e,t){const r=n.x,a=n.y,u=n.z,i=e.x,o=e.y,c=e.z,s=a*c-u*o,f=u*i-r*c,l=r*o-a*i;return t.x=s,t.y=f,t.z=l,t},r.midpoint=function(n,e,t){return t.x=.5*(n.x+e.x),t.y=.5*(n.y+e.y),t.z=.5*(n.z+e.z),t},r.fromDegrees=function(n,e,a,u,i){return n=t.CesiumMath.toRadians(n),e=t.CesiumMath.toRadians(e),r.fromRadians(n,e,a,u,i)};let s=new r,f=new r;r.wgs84RadiiSquared=new r(40680631590769,40680631590769,40408299984661.445),r.fromRadians=function(n,t,a,u,i){a=e.defaultValue(a,0);const o=e.defined(u)?u.radiiSquared:this.wgs84RadiiSquared,c=Math.cos(t);s.x=c*Math.cos(n),s.y=c*Math.sin(n),s.z=Math.sin(t),s=r.normalize(s,s),r.multiplyComponents(o,s,f);const l=Math.sqrt(r.dot(s,f));return f=r.divideByScalar(f,l,f),s=r.multiplyByScalar(s,a,s),e.defined(i)||(i=new r),r.add(f,s,i)},r.fromDegreesArray=function(n,t,a){const u=n.length;e.defined(a)?a.length=u/2:a=new Array(u/2);for(let e=0;e<u;e+=2){const u=n[e],i=n[e+1],o=e/2;a[o]=r.fromDegrees(u,i,0,t,a[o])}return a},r.fromRadiansArray=function(n,t,a){const u=n.length;e.defined(a)?a.length=u/2:a=new Array(u/2);for(let e=0;e<u;e+=2){const u=n[e],i=n[e+1],o=e/2;a[o]=r.fromRadians(u,i,0,t,a[o])}return a},r.fromDegreesArrayHeights=function(n,t,a){const u=n.length;e.defined(a)?a.length=u/3:a=new Array(u/3);for(let e=0;e<u;e+=3){const u=n[e],i=n[e+1],o=n[e+2],c=e/3;a[c]=r.fromDegrees(u,i,o,t,a[c])}return a},r.fromRadiansArrayHeights=function(n,t,a){const u=n.length;e.defined(a)?a.length=u/3:a=new Array(u/3);for(let e=0;e<u;e+=3){const u=n[e],i=n[e+1],o=n[e+2],c=e/3;a[c]=r.fromRadians(u,i,o,t,a[c])}return a},r.ZERO=Object.freeze(new r(0,0,0)),r.ONE=Object.freeze(new r(1,1,1)),r.UNIT_X=Object.freeze(new r(1,0,0)),r.UNIT_Y=Object.freeze(new r(0,1,0)),r.UNIT_Z=Object.freeze(new r(0,0,1)),r.prototype.clone=function(n){return r.clone(this,n)},r.prototype.equals=function(n){return r.equals(this,n)},r.prototype.equalsEpsilon=function(n,e,t){return r.equalsEpsilon(this,n,e,t)},r.prototype.toString=function(){return`(${this.x}, ${this.y}, ${this.z})`},n.Cartesian3=r}));
