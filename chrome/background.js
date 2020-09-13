chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: '*' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == 'getlatestjobs') {
      var url = 'http://localhost:5001/job-ext/us-central1/getLatestJobs';
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(({jobs})=>{
          console.log("jobs...",jobs)
          sendResponse(jobs)
          return jobs
        })
        .catch(error => console.log('error!!!',error))
      return true;  // Will respond asynchronously.
    }
  });