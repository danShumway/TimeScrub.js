var fs = require('fs');

var app = function()
{
	this.watching = new Array();
	this.data = {};
	this.numSteps = 0;


	this.AddWatch = function(toWatch, recallName)
	{
		this.watching.push(toWatch);
		this.watching[this.watching.length - 1]._timescrub_recall_name = recallName;
	}

	this.convertToJSON = function(object)
	{

		var toReturn = {};
		//For each property in the object
		for(var property in object)
		{
			//Make sure you're not infringing on prototype.
			if(object.hasOwnProperty(property))
			{
				//Don't use our own internal terms.
				if(property != "_timescrub_recall_name")
				{
					//And recurse into sub-objects.
					if(typeof object[property] == typeof {})
						toReturn[property] = this.convertToJSON(object[property]);
					else
						toReturn[property] = object[property];
				}
			}
		}

		return toReturn;
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
			this.data[this.numSteps][this.watching[i]._timescrub_recall_name] = this.convertToJSON(this.watching[i]);
		}

		//And yes, we have another step recorded.
		this.numSteps++;
	}


	//We now have data, which has the exported state of all of our objects.
	//Let's export it!
	this.Save = function(fileName, fireOff, _context)
	{
		var toWrite = JSON.stringify(this.data);
		var thisReference = this;
		fs.writeFile(fileName, toWrite, function(err) { 
			if(err) 
				console.log("error"); 
			else
			{
				//Success, fire off the function.
				if(fireOff != undefined) {
					if(_context != undefined) {
						fireOff.call(_context);
					} else {
						fireOff.call();
					}
				}
			}
		});
	}

	//
	this.Read = function(fileName, fireOff, _context)
	{
		var thisReference = this;
		fs.readFile(fileName, 'utf8', function (err, data){
			if(err) {
				console.log('Error: ' + err);
				return;
			}
			else
			{
				thisReference.data = JSON.parse(data);
				//Fire out an event if it's necessary.
				if(fireOff != undefined) {
					if(_context != undefined) {
						fireOff.call(_context);
					} else {
						fireOff.call();
					}
				}
			}
		});
	}

	this.GetTick = function(tickNumber)
	{
		return this.data[tickNumber];
	}
}



exports.app = app;