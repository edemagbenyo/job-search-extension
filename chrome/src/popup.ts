import {createJobsTable} from './dom/jobs'
import { syncStore } from './helpers/index';


const table = document.querySelector('table') as HTMLTableElement;
const body = document.querySelector('body') as HTMLBodyElement;
const job_position_input = document.querySelector('#job_position_input') as HTMLInputElement;
const job_position_form = document.querySelector("#job_position_form") as HTMLFormElement;
// const flash_job_position = document.querySelector(".flash_job_position") as HTMLSpanElement;
const loading =  document.querySelector('.loading') as HTMLParagraphElement;
const tbody = table.querySelector("tbody") as HTMLTableSectionElement;


let saved_job_position: string="";
const options = document.querySelector(".options") as HTMLAnchorElement;
//Open options page
options.addEventListener("click", (e) => {
  e.preventDefault();
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  }
});
function load_saved_positions() {
  chrome.storage.sync.get(["job_position"], (result) => {
   
      if(Object.keys(result).length > 0) {
        job_position_input.value = result.job_position
        loading.style.display = "block";

        get_latest_jobs(result.job_position||"");
        
      } else{

      }
    saved_job_position = Object.keys(result).length !== 0 && result.job_position;  
  });
}

function get_latest_jobs(position_name: string = '') {
  chrome.storage.sync.get(['jobs_cache'],(result)=>{
    console.log("saved jobs...",result)
    console.log("saved jobs...")
  });

  chrome.runtime.sendMessage(
    { contentScriptQuery: "getlatestjobs", position_name },
    (jobs) => {
      if (jobs) {
        loading.style.display = "none";
      }
        //store jobs in localstorage
        const lastJobs: string="";
        syncStore('job_cache',jobs,()=>{
          console.log("it is done!!!")
        })
        chrome.storage.sync.set({jobs_cache: JSON.stringify(jobs) } as {jobs_cache: string})
      
        createJobsTable(tbody, jobs);
    }
  );
}


//create new position
job_position_form.addEventListener("submit", (e) => {
  //save position in storage
  e.preventDefault();
  chrome.storage.sync.set({ job_position: job_position_input.value }, () => {
    get_latest_jobs(job_position_input.value);
    loading.style.display = "block";
  });
});

// chrome.storage.sync.get(["job_sites"], (result) => {
//   console.log("list of sites",result)
//   result["job_sites"].forEach((val="") => {
//     const chbx = document.querySelector(`#${val}`) as HTMLInputElement;
//     chbx.checked = true;
//   });
// });


load_saved_positions();