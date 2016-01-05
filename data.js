app.factory("data", function () {

	var modules = [
	{
		name:"parallax",
		description:{
			s:"parallax scrolls an image or HTML element",
			l:"angular module that scrolls an image or DOM element at reduced rate compared to document scroll. Takes image source or child element as input."
		},
		versions:[
		{
			number:"2",
			src:"parallax-2.js",
			status:depricated
		},
		{
			number:"2.1",
			src:"parallax-2.1.js",
			status:production
		}
		]
	},
	{
		name:"classes",
		description:{
			s:"the last css library you'll ever need",
			l:"a flat css library that provides individual classes for each style point. this allows for an element to carry whatever classes it needs and reduces the burden on extensive singleton classes or heavy-duty css document engineering."
		},
		versions:[
		{
			number:"1",
			src:"classes.css",
			status:production
		}
		]
	},
	{
		name:"shared",
		description:{
			s:"general utility for a web app",
			l:"contains several services for any angular project. an events service to call functions from other parts of an app, a service to send and receive generic kinds of objects or data to different parts of an app"
		},
		versions:[
		{
			number:"1",
			src:"shared-1.js",
			status:production
		},
		{
			number:"2",
			src:"shared-2.js",
			status:production
		}
		]
	},
	{
		name:"console",
		description:{
			s:"debug on mobile",
			l:"prints out the console to a visible area on screen. designed for mobile debugging. output is scrollable"
		},
		versions:[
		{
			number:"1",
			src:"console-1.js",
			status:production
		}
		]
	}
	]

	var getModuleByName = function (name) {

		for (i in modules) {

			if (name == modules[i].name) {

				return modules[i];
			}
		}

		return {name:"none"};
	}

	return {
		modules:modules,
		getModuleByName:getModuleByName
	}

});