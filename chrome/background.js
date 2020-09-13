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
      let position = result["job_position"];
      var url =
        "http://localhost:5001/job-ext/us-central1/getLatestJobs?position_name=" +
        position;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((jobs) => {
          sendResponse(jobs);
          return jobs;
        })
        .catch((error) => console.log("error!!!", error));
      return true; // Will respond asynchronously.
    }
  });
});
