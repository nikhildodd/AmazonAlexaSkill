const rp = require('request-promise');
const $ = require('cheerio');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


const memeParse = function(url) {
    rp(url)
        .then(function(html) {
            const dom = new JSDOM(html);
            var memeImage = dom.window.document.querySelector('img.preview');
            //console.log("Hi!");
            console.log(memeImage.attributes.src.value);
            return(memeImage.attributes.src.value);
        })
        .catch(function(err) {
          //handle error
        });
    
};

module.exports = memeParse;