const buildLink = function (position) {
  return "search_keywords=" + position.toLowerCase().split(" ").join("+");
};

exports.remoteco = async function (cheerio, got, position_name) {
  const built_position_name = position_name ? buildLink(position_name) : "";
  console.log("position_name",built_position_name)
  try{
    const getJobs = await got(
      "https://remote.co/remote-jobs/search/?" + built_position_name
    );
    const response = await getJobs;
    const $ = cheerio.load(response.body);
    let list = [];
    const body = $("body div.job_listings");
    let jobs = body.find("ul li.job_listing");
    // console.log(jobs)
    for (let job in jobs) {
      let li = jobs[job];
      console.log("li",li.type)
      let info;
      // if (typeof li === "object" && li.type == "tag" && li.name == "tr") {
      //   let title = $(jobs[job]).find("h3").text();
      //   let time = $(jobs[job]).find(".date time").attr("datetime");
      //   let company = $(jobs[job]).find(".company strong").text();
      //   let link = $(jobs[job]).find("a").attr("href");
      //   info = { title, company, link, site: "Remote.co", time };
      // }
  
      list.push(info);
    }
    return list;
  }catch(error){
    console.log(`${error} occured!!!`)
  }
};
