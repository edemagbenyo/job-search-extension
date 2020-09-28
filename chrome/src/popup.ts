const table = document.querySelector('table') as HTMLTableElement;
const body = document.querySelector('body') as HTMLBodyElement;
const job_position_input = document.querySelector('#job_position_input') as HTMLInputElement;
const job_position_form = document.querySelector("#job_position_form") as HTMLFormElement;
// // const flash_job_position = document.querySelector(".flash_job_position") as HTMLSpanElement;
const loading =  document.querySelector('.loading') as HTMLParagraphElement;

function load_saved_positions(){
  chrome.storage.sync.get(['job_position'],(result)=>{
    job_position_input.value= Object.keys(result).length!==0 && result.job_position
  })
}

//create new position
job_position_form.addEventListener("submit", (e) => {
  //save position in storage
  e.preventDefault();
  chrome.storage.sync.set(
    { job_position: job_position_input.value },
    () => {
      loading.style.visibility = "visible";
      loading.textContent = "Loading...";
      
    }
  );
});

chrome.storage.sync.get(["job_sites"], (result) => {
  result["job_sites"].forEach((val: string) => {
    const chbx = document.querySelector(`#${val}`) as HTMLInputElement;
    chbx.checked = true;
  });
});

chrome.runtime.sendMessage({contentScriptQuery:'getlatestjobs'},(jobs)=>{
  
  if(jobs){
    loading.style.visibility='hidden'
  }
  let tbody = table.querySelector('tbody') as HTMLTableSectionElement;

  for(let job of jobs){
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent=job
    tr.append(td)
    tbody.append(tr)
  }

})

load_saved_positions()