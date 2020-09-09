
const table = document.querySelector('table');
const body = document.querySelector('body');
chrome.runtime.sendMessage({contentScriptQuery:'getlatestjobs'},(jobs)=>{
  
  if(jobs){
    const loading = document.querySelector(".loading");
    loading.remove()
  }
  let tbody = table.querySelector('tbody');

  for(let job of jobs){
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent=job
    tr.append(td)
    tbody.append(tr)
  }

})
