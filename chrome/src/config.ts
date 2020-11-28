
export let apiURL: string = ""
const env = JSON.parse('ENV')
switch (env) {
  case "production" as unknown:
    apiURL = "https://us-central1-job-ext.cloudfunctions.net/getLatestJobs"
    break;
  case "development" as unknown:
    apiURL = "http://localhost:5001/job-ext/us-central1/getLatestJobs"
    break;
  case "testing" as unknown:
    apiURL = "http://localhost:5001/job/ext/tesingURL"
    break;
  default:
    apiURL = "http://localhost:5001/job-ext/us-central1/getLatestJobs"
    break;
}