import { apiURL } from "@lib/config";

export async function getJobs(position: string): Promise<any> {
  let url: string = `${apiURL}?position_name=${position}`;
  try {
    const raw = await fetch(url);
    const response = raw.json();
    return response;
  } catch (error) {
    new Error(`Error ha${error} happened`);
  }
}
