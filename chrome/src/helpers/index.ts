import {createJobsTable} from '../dom/jobs'

export function syncCacheStore(key:string, objectToStore:[], callback: ()=>void) {
  var jsonstr = JSON.stringify(objectToStore);
  var i = 0;
  // var storageObj : {[k:string]:any}={};
  var storageObj : Record<string,any>={};

  while(jsonstr.length > 0) {
      var index: string = key + "_" + i++;

      var valueLength = chrome.storage.sync.QUOTA_BYTES_PER_ITEM /2;
      let quotaFixSize = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - index.length -2

      var segment: string = jsonstr.substr(0, valueLength); 
      while(byteSize(segment) > quotaFixSize){
        segment = jsonstr.substr(0, --valueLength);
      }
      storageObj[index] = segment;
      jsonstr = jsonstr.substr(valueLength);
  }

    emptyCache(key);

    //Temp fix to cache emptying before saving
    setTimeout(() => {
      chrome.storage.sync.set(storageObj, callback);
    }, 200);
}
export function getCacheStore(key: string, container: HTMLTableSectionElement): string{
  
  let index=0;
  // let compoKey = 
  chrome.storage.sync.get(null,(result)=>{
    let allCache:string = "";
    for(let i=0; i<Object.keys(result).length;i++){
      if(result[key+"_"+i]){
        allCache += result[key + "_" + i]
      }
    }
    const jobs = JSON.parse(allCache)
    createJobsTable(container,jobs)
  })
  return "";
}

/**
 * Empty cache from storage with provided key
 * @param key 
 */
function emptyCache(key: string): void{
  chrome.storage.sync.get(null,(result): string =>{
    let allCache:string = "";
    for(let i=0; i<Object.keys(result).length;i++){
      if(result[key+"_"+i]){
        chrome.storage.sync.remove(key+"_"+i,()=>undefined)
      }
    } 
    return "done"; 
  })
}

function byteSize(str: string): number{
  return new Blob([str]).size;
}