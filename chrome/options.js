const radios = document.querySelectorAll("input[type=radio]");
const positions = document.querySelector(".positions");
const new_job_position_input = document.querySelector(
  "#new_job_position_input"
);
const new_job_position_form = document.querySelector("#new_job_position_form");
const flash_job_position = document.querySelector(".flash_job_position");
const job_sites = document.querySelector(".job_sites");
const job_dates = document.querySelector(".job_dates");

chrome.storage.sync.get(["job_position"], (result) => {
  new_job_position_input.value = result["job_position"];
});
chrome.storage.sync.get(["job_sites"], (result) => {
  result["job_sites"].forEach((val) => {
    const chbx = document.querySelector(`#${val}`);
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

job_sites.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    //update site in storage
    chrome.storage.sync.get(["job_sites"], (result) => {
      let job_sites = result["job_sites"];
      if (!e.target.checked) {
        const pos = job_sites.indexOf(e.target.value);
        job_sites.splice(pos,1)
      } else {
        job_sites = result["job_sites"]
          ? [...result["job_sites"], e.target.value]
          : [e.target.value];
      }
      chrome.storage.sync.set({ job_sites: job_sites }, (updated) => {});
    });
  }
});

const caseTitle = (str) => {
  let arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
};
