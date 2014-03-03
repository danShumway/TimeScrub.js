//timescrub.js
var timescrub = require('./app.js');
var scrubber = new timescrub.app();

//I want to have a test file I can run in node.
var objects = new Array();
var log = new Array();
var stageDimensions = {x: 500, y: 500};

//Constructor for an object.
var makeObject = function(x, y) {
	this.x = x;
	this.y = y;
	this.xDirection = 1;
	this.yDirection = 1;

	this.trace = function()
	{
		return { "x" : this.x, "y" : this.y };
	}
}

//Set up the objects.
function Setup()
{
	for(var i = 0; i < 10; i++)
	{
		objects.push(new makeObject(Math.random()*500, Math.random()*500));
	}

	scrubber.AddWatch(objects, "objects");
}

function GameLoop()
{
	for(var i = 0; i<objects.length; i++)
	{
		//Swap x direction when you go off the stage.
		if(objects[i].x > stageDimensions || objects[i].x < 0)
			objects[i].xDirection *= -1;

		//Swap y direction when you go off the stage.
		if(objects[i].y > stageDimensions || objects[i].y < 0)
			objects[i].yDirection *= -1;

		objects[i].x += objects[i].xDirection;
		objects[i].y += objects[i].yDirection;

		log[i] = objects[i].trace();
	}
}
//And so on.

//Actually run the code.
//What's nice is that we're not doing anything with view, so we can ignore
//anything like framerate, etc...
//We assume we're using fixed framerate and there will never be any lag.

//So I can just say.
Setup();
for(var i = 0; i < 200; i++)
{
	GameLoop();
	//What do I want to log?
	//Push(objects)
	scrubber.Watch();
}

scrubber.Save("test.json", function(){ console.log("success"); });


