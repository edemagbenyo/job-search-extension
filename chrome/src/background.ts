import { apiURL } from "./config";

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "*" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
chrome.storage.sync.get(["job_position"], (result) => {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.contentScriptQuery == "getlatestjobs") {
      let url: string =`${apiURL}?position_name=${request.position_name}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((jobs) => {
          console.log("opened positions",jobs)
          chrome.runtime.sendMessage('report reply',(e)=>{
            console.log("Getting the information.");
            const name = e;
            sendResponse(jobs);
          })
          return jobs;
        })
        .catch((error) => {
          console.log("we have an error",chrome.runtime.lastError)
           new Error(`Error ha${error} happened`)
          });
      return true; // Will respond asynchronously.
    }
  });
});
