var timescrub = require('./app.js');
var scrubber = new timescrub.app();

scrubber.Read("test.json", function(){ console.log(scrubber.data[1].objects); });