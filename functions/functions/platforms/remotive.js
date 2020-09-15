const buildLink = function (position) {
  return "search=" + position.toLowerCase().split(" ").join("+");
};

exports.remotive = async function (cheerio, got, position_name) {
  const built_position_name = position_name ? buildLink(position_name) : "";
  console.log("position_name",built_position_name)
  try{
    const getJobs = await got(
      "https://remotive.io/remote-jobs?" + built_position_name
    );
    const response = await getJobs;
    const $ = cheerio.load(response.body);
    let list = [];
    const body = $("body");
    let jobs = body.find("li.job-list-item");
    // console.log(jobs)
    for (let job in jobs) {
      let li = jobs[job];
      let info;
      if (typeof li === "object" && li.type === "tag" && li.name === "li") {
        let title = $(jobs[job]).find("div.position a").text();
        let time = $(jobs[job]).find(".job-date span").text();
        let company = $(jobs[job]).find(".company span").first().text();
        let link = "https://remotive.io" + $(jobs[job]).find("div.position a").attr("href");
        info = { title, company, link, site: "Remote.co", time };
        if(title!==""){
          list.push(info);
        }
      }
    }
    return list;
  }catch(error){
    console.log(`${error} occured!!!`)
  }
};
