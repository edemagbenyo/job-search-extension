
const table = document.querySelector('table');
const body = document.querySelector('body');
const job_position_input = document.querySelector('#job_position_input');
const job_position_form = document.querySelector("#job_position_form");
const flash_job_position = document.querySelector(".flash_job_position");
const loading =  document.querySelector('.loading')

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
  result["job_sites"].forEach((val) => {
    const chbx = document.querySelector(`#${val}`);
    chbx.checked = true;
  });
});

chrome.runtime.sendMessage({contentScriptQuery:'getlatestjobs'},(jobs)=>{
  
  if(jobs){
    loading.style.visibility='hidden'
  }
  let tbody = table.querySelector('tbody');

  console.log("result jobs",jobs)

  for(let job of jobs){
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let div = document.createElement('div');
    let view_btn = document.createElement('a');

    let company = document.createElement('span');
    let link = document.createElement('a');

    company.setAttribute('class','company')
    let site = document.createElement('label');

    view_btn.setAttribute('class','view_btn')
    view_btn.textContent="View "
    view_btn.style.color="#FFFFFF"
    view_btn.style.maxHeight="30px"
    view_btn.style.lineHeight="30px"
    view_btn.style.padding="5px"
    view_btn.setAttribute('target','_blank')
    view_btn.setAttribute('href',job.link)

    site.textContent=job.site
    company.textContent = job.company;
    company.append(site)
    link.textContent=job.title
    
    div.append(company)
    div.append(link)
    td.append(div)
    td.append(view_btn)
    tr.append(td)
    tbody.append(tr)
  }

})

load_saved_positions()