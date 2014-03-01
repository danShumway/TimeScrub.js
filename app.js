var fs = require('fs');

var app = function()
{
	this.watching = new Array();
	this.data = {};
	this.numSteps = 0;


	this.AddWatch = function(toWatch, recallName)
	{
		this.watching.push(toWatch);
		this.watching._timescrub_recall_name = recallName;
	}

	//Watch function.  This should make some stuff and stuff.
	this.Watch = function()
	{
		//We're on a new step, so increment that.
		this.data[this.numSteps] = {};

		//For right now, we're only doing full backups.
		this.data[this.numSteps]._timescrub_full_backup = true;
		//Which step is this?
		this.data[this.numSteps]._timescrub_step_number = this.numSteps;
		//Write out the data.
		for(var i = 0; i < this.watching.length; i++) {
			//Make the variable to hold it.
			this.data[this.numSteps][this.watching[i]._timescrub_recall_name] = {};
			//Go through all the properties.
			for(var property in this.watching[i]) {
				//Avoid including prototype.
				if(this.watching[i].hasOwnProperty(property)) {
					//Avoid including object name.
					if(property != "_timescrub_recall_name") {
						this.data[this.numSteps][this.watching[i]._timescrub_recall_name][property] = this.watching[i][property];
					}
				}
			}
		}

		//And yes, we have another step recorded.
		this.numSteps++;
	}


	//We now have data, which has the exported state of all of our objects.
	//Let's export it!
	this.Save = function(fileName)
	{
		var toWrite = JSON.stringify(this.data);
		fs.writeFile(fileName, toWrite, function(err) { if(!err) console.log("success"); });
	}
}



exports.app = app;