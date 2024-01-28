define(["exports","./Cartesian3-529c236c","./Cartographic-dbefb6fa","./defaultValue-f6d5e6da","./Ellipsoid-8e26549b","./Math-355606c6"],(function(t,e,i,o,a,r){"use strict";function n(t){this._ellipsoid=o.defaultValue(t,a.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}Object.defineProperties(n.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),n.mercatorAngleToGeodeticLatitude=function(t){return r.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-t))},n.geodeticLatitudeToMercatorAngle=function(t){t>n.MaximumLatitude?t=n.MaximumLatitude:t<-n.MaximumLatitude&&(t=-n.MaximumLatitude);const e=Math.sin(t);return.5*Math.log((1+e)/(1-e))},n.MaximumLatitude=n.mercatorAngleToGeodeticLatitude(Math.PI),n.prototype.project=function(t,i){const a=this._semimajorAxis,r=t.longitude*a,u=n.geodeticLatitudeToMercatorAngle(t.latitude)*a,d=t.height;return o.defined(i)?(i.x=r,i.y=u,i.z=d,i):new e.Cartesian3(r,u,d)},n.prototype.unproject=function(t,e){const a=this._oneOverSemimajorAxis,r=t.x*a,u=n.mercatorAngleToGeodeticLatitude(t.y*a),d=t.z;return o.defined(e)?(e.longitude=r,e.latitude=u,e.height=d,e):new i.Cartographic(r,u,d)},t.WebMercatorProjection=n}));
