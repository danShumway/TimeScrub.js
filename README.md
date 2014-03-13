TimeScrub.js
============

TimeScrub.js is a middleware application that allows simulations to record multiple steps along time and save those steps for later recalling.

To use, follow the following template.

var timescrub = require('timescrub');
var yourVariable = new timescrub.app();

//best fed JSON objects, but timescrub will try to work with anything, with varying degrees of success.
yourVariable.AddWatch(objectToWatch, "nameInStorage");

//In the gameloop.
yourVariable.Watch();

//And when you want to save.
yourVariable.Save("filename.json", function() { }); //Works via callback.

//And load...  Gives you a variable with the JSON in it.
yourVariable.Read("filename.json", function() { console.log(yourVariable.data); }); //Works via callback.
