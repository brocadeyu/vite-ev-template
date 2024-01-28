define(["exports","./Matrix4-c57ffbd8","./Cartesian3-529c236c","./Matrix3-31d1f01f","./OrientedBoundingBox-a33d01bf"],(function(n,t,e,r,a){"use strict";const i={},o=new e.Cartesian3,u=new e.Cartesian3,s=new e.Cartesian3,c=new e.Cartesian3,C=new a.OrientedBoundingBox;function m(n,r,a,i,u){const s=e.Cartesian3.subtract(n,r,o),c=e.Cartesian3.dot(a,s),C=e.Cartesian3.dot(i,s);return t.Cartesian2.fromElements(c,C,u)}i.validOutline=function(n){const t=a.OrientedBoundingBox.fromPoints(n,C).halfAxes,i=r.Matrix3.getColumn(t,0,u),o=r.Matrix3.getColumn(t,1,s),m=r.Matrix3.getColumn(t,2,c),g=e.Cartesian3.magnitude(i),l=e.Cartesian3.magnitude(o),d=e.Cartesian3.magnitude(m);return!(0===g&&(0===l||0===d)||0===l&&0===d)},i.computeProjectTo2DArguments=function(n,t,i,o){const m=a.OrientedBoundingBox.fromPoints(n,C),g=m.halfAxes,l=r.Matrix3.getColumn(g,0,u),d=r.Matrix3.getColumn(g,1,s),f=r.Matrix3.getColumn(g,2,c),x=e.Cartesian3.magnitude(l),M=e.Cartesian3.magnitude(d),B=e.Cartesian3.magnitude(f),P=Math.min(x,M,B);if(0===x&&(0===M||0===B)||0===M&&0===B)return!1;let w,h;return P!==M&&P!==B||(w=l),P===x?w=d:P===B&&(h=d),P!==x&&P!==M||(h=f),e.Cartesian3.normalize(w,i),e.Cartesian3.normalize(h,o),e.Cartesian3.clone(m.center,t),!0},i.createProjectPointsTo2DFunction=function(n,t,e){return function(r){const a=new Array(r.length);for(let i=0;i<r.length;i++)a[i]=m(r[i],n,t,e);return a}},i.createProjectPointTo2DFunction=function(n,t,e){return function(r,a){return m(r,n,t,e,a)}};var g=i;n.CoplanarPolygonGeometryLibrary=g}));
