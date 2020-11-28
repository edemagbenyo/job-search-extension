const functions = require('firebase-functions');

const got = require('got');
const cheerio = require('cheerio');
const {remoteok} = require('./platforms/remoteok');
// const {remoteco} = require('./platforms/remoteco');
// const {weworkremotely} = require('./platforms/weworkremotely');
const {remotive} = require('./platforms/remotive');

exports.getLatestJobs = functions.https.onRequest(async (req, res) => {
  let jobsList=[];
  let userList = req.userList;
  //Get the list of user preference sites
  //do a for in 
  console.log("gettings remote jobs")
  let remoteokJobs = await remoteok(cheerio,got,req.query.position_name)
  let remotiveJobs = await remotive(cheerio,got,req.query.position_name)
  console.log(`Remotive jobs ${remotiveJobs}`)
  return res.json([...remoteokJobs, ...remotiveJobs])
  
})