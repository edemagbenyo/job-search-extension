const radios = document.querySelectorAll("input[type=radio]");
const positions = document.querySelector(".positions");
const new_job_position_input = document.querySelector(
  "#new_job_position_input"
) as HTMLInputElement;
const new_job_position_form = document.querySelector("#new_job_position_form") as HTMLFormElement;
const flash_job_position = document.querySelector(".flash_job_position") as HTMLSpanElement;
const job_sites = document.querySelector(".job_sites") as HTMLTableRowElement;
const job_dates = document.querySelector(".job_dates") as HTMLTableRowElement;

chrome.storage.sync.get(["job_position"], (result) => {
  new_job_position_input.value = result["job_position"];
});
chrome.storage.sync.get(["job_sites"], (result) => {
  result["job_sites"].forEach((val:string) => {
    const chbx = document.querySelector(`#${val}`) as HTMLInputElement;
    chbx.checked = true;
  });
});

//create new position
new_job_position_form.addEventListener("submit", (e) => {
  //save position in storage
  e.preventDefault();
  chrome.storage.sync.set(
    { job_position: new_job_position_input.value },
    () => {
      flash_job_position.style.visibility = "visible";
      flash_job_position.textContent = "Job position updated!";
      setTimeout(() => {
        flash_job_position.style.visibility = "hidden";
      }, 3000);
    }
  );
});

job_sites.addEventListener("change", (e: Event = {} as Event) => {
  const eTarget = e.target as HTMLInputElement;
  if (eTarget.type === "checkbox") {
    //update site in storage
    chrome.storage.sync.get(["job_sites"], (result) => {
      let job_sites = result["job_sites"];
      if (!eTarget.checked) {
        const pos = job_sites.indexOf(eTarget.value);
        job_sites.splice(pos,1)
      } else {
        job_sites = result["job_sites"]
          ? [...result["job_sites"], eTarget.value]
          : [eTarget.value];
      }
      chrome.storage.sync.set({ job_sites: job_sites }, ():void => {});
    });
  }
});

const caseTitle = (str: string): string => {
  let arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
};