const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const got = require('got');
const cheerio = require('cheerio');

exports.getLatestJobs = functions.https.onRequest(async (req, res) => {
  const vgmUrl = 'https://www.indeed.com/jobs?q=Software%20Engineer';

  got(vgmUrl).then(response => {
    const $ = cheerio.load(response.body);
    //get jobs on the page
    const jobs =  $('h2 a','.result');
    let list = [];
    // console.log($('h2 a','.result')[0].attribs.title)
    for(let job in jobs){
      if(jobs[job].attribs && 'title' in jobs[job].attribs ){
        list.push(jobs[job].attribs.title)
      }
    }
    res.json({jobs:list})
  }).catch(err => {
    console.log(err);
  });
})