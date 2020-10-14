export function filterByDate(exec: (date:string)=>void){
  
  chrome.storage.sync.get(['job_date'],function(result){
    let date = result.job_date;
    //Get todays date

    //Add number of days in job_date to it

    // Do filtering of all date less or equal to the new date
    exec(date)
  })
}