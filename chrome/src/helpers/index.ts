export function syncStore(key:string, objectToStore:{}, callback: ()=>void) {
  var jsonstr = JSON.stringify(objectToStore);
  var i = 0;
 
  // var storageObj : {[k:string]:any}={};
  var storageObj : Record<string,any>={};

  // split jsonstr into chunks and store them in an object indexed by `key_i`
  while(jsonstr.length > 0) {
      var index: string = key + "_" + i++;

      // since the key uses up some per-item quota, see how much is left for the value
      // also trim off 2 for quotes added by storage-time `stringify`
      var valueLength = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - index.length - 2;

      // trim down segment so it will be small enough even when run through `JSON.stringify` again at storage time
      var segment:string = jsonstr.substr(0, valueLength);           
      while(JSON.stringify(segment).length > valueLength)
          segment = jsonstr.substr(0, --valueLength);

      storageObj[index] = segment;
      jsonstr = jsonstr.substr(valueLength);
  }

  // store all the chunks
  chrome.storage.sync.set(storageObj, callback);
}
export function getStore(key: string){

}