define(["./defaultValue-f6d5e6da","./RequestType-735c98f2","./createTaskProcessorWorker","./EV_IndexedDBProvider-596d1bfc","./DeveloperError-c85858c1"],(function(e,r,a,t,s){"use strict";let o;function d(e){const r=self.webkitPostMessage||self.postMessage;try{r({workerType:e.requestType,dataName:e.keyName,workerTaskID:e.workerTaskID,data:void 0})}catch(e){r({})}}function n(e,r){let a=self.webkitPostMessage||self.postMessage;try{a({workerType:e.requestType,dataName:e.keyName,workerTaskID:e.workerTaskID,level:e.level,x:e.x,y:e.y,upsample:e.upsample,data:r})}catch(e){a({})}}return a((function(a,s){const i=a.indexedDB;let k=a.taskData;k.workerTaskID=a.workerTaskID,e.defined(o)?e.defined(o.iDB)?k.requestType==r.RequestType.TERRAIN?o.downloadTerrainData("EVIDB",1,"terrain",k,d,n):k.requestType==r.RequestType.IMAGERY&&o.downloadTerrainData("EVIDB",1,"imagery",k,d,n):d(k):(o=new t.EV_IndexedDBProvider(i),o.createIDB("EVIDB",1,["model","imagery","terrain","3DTile"]),d(k))}))}));
