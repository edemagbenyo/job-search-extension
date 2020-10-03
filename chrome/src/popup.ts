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
  chrome.runtime.sendMessage(
    { contentScriptQuery: "getlatestjobs", position_name },
    (jobs) => {
      if (jobs) {
        tbody.innerHTML = "";
        loading.style.display = "none";
      }

      for (let job of jobs) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let div = document.createElement("div");
        let view_btn = document.createElement("a");

        let company = document.createElement("span");
        let link = document.createElement("a");

        company.setAttribute("class", "company");
        let site = document.createElement("label");

        view_btn.setAttribute("class", "view_btn");
        view_btn.textContent = "View ";
        view_btn.style.color = "#FFFFFF";
        view_btn.style.maxHeight = "30px";
        view_btn.style.lineHeight = "30px";
        view_btn.style.padding = "5px";
        view_btn.setAttribute("target", "_blank");
        view_btn.setAttribute("href", job.link);

        site.textContent = job.site;
        if (job.site == "remoteOK") {
          site.style.backgroundColor = "#000000";
        }
        company.textContent = job.company;
        company.append(site);

        link.setAttribute("target", "_blank");
        link.setAttribute("href", job.link);
        link.textContent = job.title;

        div.append(company);
        div.append(link);
        td.append(div);
        td.append(view_btn);
        tr.append(td);
        tbody.append(tr);
      }
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