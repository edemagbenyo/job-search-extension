
export let apiURL: string = ""
switch ('ENV') {
  case "production" as unknown:
    apiURL = "https://us-central1-job-ext.cloudfunctions.net/getLatestJobs"
    break;
  default:
    apiURL = "http://localhost:5001/job-ext/us-central1/getLatestJobs"
    break;
}