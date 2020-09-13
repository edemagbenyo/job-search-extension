
const buildLink = function(){

}

exports.remoteok = async function(cheerio, got){
   const getJobs = await got("https://remoteok.io/")
   
   const response = await getJobs;
    const $ = cheerio.load(response.body);
    let list = [];
    const body = $('body')
    let jobs = body.find('tr.job td.company_and_position');
    for(let job in jobs){
      let td = jobs[job];
      let info;
      if(typeof td ==='object' && td.type=='tag' &&  td.name== 'td'){
        let title = $(jobs[job]).children('h2').text()
        let position = $(jobs[job]).find('a.preventLink');
        let companyA = $(jobs[job]).find('a.companyLink');
        let company = companyA.text()
        let link = "https://remoteok.io" + position.attr('href')
         info= {title,company,link,site:"remoteOK"}
      }

      list.push(info)
    }
    return list
  
}