//WebStorm jetbrains
//
//
//

//dependecies
const rp = require('request-promise');
//const request = require('request');
const $ = require('cheerio');
const jsdom = require('jsdom');
const memeParse = require('./memeParse');

const url = 'https://old.reddit.com/r/memes/';    
const { JSDOM } = jsdom;

//-------------------------------------------
// memeFind
// Descr:
// this method uses the old subreddit meme page to obtain the post urls 
// and uses memeParse to find the image url of the posts
// >>>>>>>>>>
// Input: N/a
// Output: Array of url strings
//-------------------------------------------

const memeFind = function(){
  return rp(url)
    .then(function(html) {    
    
        const dom = new JSDOM(html);
        var memeUrls = dom.window.document.querySelectorAll('a.title.may-blank');
        var memes = [];
        var temp = '';

        //console.log(memeUrls[1].attributes.href.value);
        for (let i = 0; i < 25; i++) {                            //find all possible meme posts on 1st page of meme subreddit
            temp = memeParse('https://old.reddit.com' + memeUrls[i].attributes.href.value)
            console.log(temp);
            memes.push(temp);
          }
        console.log(memes[1]);
        return memes;
        /*
        return Promise.all(
            memeUrls.map(function(url) {                            //for each entry in memeUrls find the image of meme
            return memeParse('https://www.reddit.com' + url);
            console.log("It works!");
            })
        );*/
    })

    .catch(function(err) {      //handle error and print error statement
      console.log(err);
   });
  

}

var potato = memeFind();        //test run
