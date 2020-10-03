type Job = {
  site: string,
  link: string,
  company: string,
  title: string
}
export const createJobsTable = function(jobs: Job[]){
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