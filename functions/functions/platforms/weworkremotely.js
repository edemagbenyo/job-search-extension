
const buildLink = function(position){

  return "remote-"+position.toLowerCase().split(" ").join("-")+"-jobs"

}

exports.weworkremotely = async function(cheerio, got,position_name){
  const built_position_name = position_name ? buildLink(position_name) :""
   const getJobs = await got("https://weworkremotely.com/remote-jobs/search?utf8=%E2%9C%93&term="+built_position_name)
   const response = await getJobs;
    const $ = cheerio.load(response.body);
    let list = [];
    const body = $('body')
    let jobs = body.find('li.feature');
    console.log(jobs)
    for(let job in jobs){
      let td = jobs[job];
      console.log(td)
      let info;
      // if(typeof td ==='object' && td.type=='tag' &&  td.name== 'tr'){
      //   let title = $(jobs[job]).find('td.company_and_position h2').text()
      //   let position = $(jobs[job]).find('a.preventLink');
      //   let companyA = $(jobs[job]).find('a.companyLink');
      //   let time = $(jobs[job]).find('td.time a time').attr('datetime')
      //   let company = companyA.text()
      //   let link = "https://remoteok.io" + position.attr('href')
      //    info= {title,company,link,site:"remoteOK",time}
      // }

      list.push(info)
    }
    return list
  
}