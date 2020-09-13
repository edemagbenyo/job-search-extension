const functions = require('firebase-functions');

const got = require('got');
const cheerio = require('cheerio');
const {remoteok} = require('./platforms/remoteok');

exports.getLatestJobs = functions.https.onRequest(async (req, res) => {
  let jobsList=[];
  let userList = req.userList;
  //Get the list of user preference sites
  //do a for in 
  let remoteokJobs = await remoteok(cheerio,got)
  return res.json([...remoteokJobs])
  
})