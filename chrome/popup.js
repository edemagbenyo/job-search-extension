
const table = document.querySelector('table');
const body = document.querySelector('body');
const job_position_input = document.querySelector('#job_position_input');

function load_saved_positions(){
  chrome.storage.sync.get(['job_position'],(result)=>{
    console.log(Object.keys(result))
    job_position_input.value= Object.keys(result).length!==0 && result.job_position
  })
}

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

load_saved_positions()