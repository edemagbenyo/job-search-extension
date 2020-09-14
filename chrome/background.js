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
      var url =
        "https://us-central1-job-ext.cloudfunctions.net/getLatestJobs?position_name=" +
        request.position_name;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((jobs) => {
          console.log(jobs)
          sendResponse(jobs);
          return jobs;
        })
        .catch((error) => console.log("error!!!", error));
      return true; // Will respond asynchronously.
    }
  });
});
