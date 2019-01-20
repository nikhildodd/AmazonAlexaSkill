/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.  It's intended to be used at an MLH Localhost
 * Workshop.
 *
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/mlh/mlh-localhost-hacking-with-alexa
 **/

'use strict';

const memeFind = require('./memeFind');

// List of meme urls
var MEMES = memeFind();

var handlers = {
  'LaunchRequest': function () { this.emit('GetMeme'); },
  'GetNewMemeIntent': function () { this.emit('GetMeme'); },
  'GetMeme': function() {
    // Randomly select a fact from the array
    const memeIndex = Math.floor(Math.random() * MEMES.length);
    const randomMeme = MEMES[memeIndex];

    // Create speech output
    const speechOutput = "Here's your meme: " + randomMeme;
    this.emit(':tellWithCard', speechOutput, "Major League Hacking (MLH) Facts", randomMeme);
  }
};

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
