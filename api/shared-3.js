/***********************************************************************************
  
		Shared Module v3

		AngularJS library with no other dependencies	

		contains several services for any angular project.
		
		contents:
		device checking
		linear equation general solution
		call functions setup in one place of an application from another
		send data around within an application
		

		Methods with Class, LLC, 2016


***********************************************************************************/


// load this module into your project
angular.module('sharedModule', [])


.factory('global', ['$sce', function ($sce) {

	// angular wrapper for the above function
	var isMobile = function () {
		return mcshared.checkMobile();
	}

	// angular wrapper for the above function
	var checkDevice = function () {
	 	return mcshared.whatDevice();
	}

	// boolean check whether the device is in portait or lanscape view
	var isPortrait = function () {

		var width = $(window).width();
		var height = $(window).height();

		//console.log("width " + width + " height " + height);

		if (width < height) {
			return true;
		}

		return false;
	}

	// if you want to retrieve data from an object depending on state, name your keys "port" and "land", then call this function
	var getOrientation = function () {

		if (isPortrait()) {
			return {
				is:"port",
				isNot:"land"
			}
		}
		else {
			return {
				is:"land",
				isNot:"port"
			}
		}
	}

	// generally solves a system of two linear equations of the form y = mx + b
	// inputs are two sets of y and x points, returns slope, m, and y = b when x = 0
	var linear = function (params) {

		var y1 = params.y1;
		var y2 = params.y2;
		var x1 = params.x1;
		var x2 = params.x2;
		var m;
		var b;

		if (x2 != x1) {
			m = (y2-y1)/(x2-x1);
			b = x1*m + y1;
		}
		else {
			m = 0;
			b = 0;
		}

		return {
			m:m,
			b:b
		}

	}

	

    return {
    	isMobile:isMobile,
    	checkDevice:checkDevice,
    	isPortrait:isPortrait,
    	getOrientation:getOrientation,
    	linear:linear,
    	util:util,
		renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    } 

}])


// this module saves callbacks and runs them later, possibly from a different part of the app
// simple callback functionality
// promise callback functionality
// callback chaining functionality
.factory("events", function ($q) {

	var self = this;

	this.events = {};
	this.triggers = {};
	this.defers = {};
	this.promises = {};

	// runs a saved promise
	var future = function (name) {

		try {

			self.promises[name].resolve();

			return true;
		}
		catch (e) {

			return false;
		}
	}

	// saves and returns a promise that will be run later, optional config callback will be run before promise is resolved
	var defer = function (name, _config) {

		self.promises[name] = $q.defer();

		self.promises[name].promise.then(function () {
			
			if (_config) return _config();
			return false;
		});

		return self.promises[name];
	}

	// runs a saved simple callback
	var dispatch = function (name) {

		var result;

		try {

			return self.events[name]();
		}
		catch (e) {

			return false;
		}

	}

	// saves a simple callback
	var on = function (name, _event) {

		self.events[name] = _event;

	}

	// create a set of callacks, triggers, to be chained
	var createTriggerSet = function (name) {

		console.log("for " + name + " create trigger set");

		self.triggers[name] = [];

		return self.triggers[name];
	}

	// get a trigger set by its name
	var getTriggerSet = function (name) {

		var triggerSet = self.triggers[name];

		if (triggerSet) {

			console.log("for " + name + " get existing trigger set");

			return triggerSet;
		}

		return [];
	}

	// change index of all triggers in set to be sequential
	var refactorTriggers = function (name) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			triggerSet[i].index = i;
		}
	}

	// sort triggers
	var sortTriggers = function (name) {

		var triggerSet = getTriggerSet(name);

		if (triggerSet.length > 1) {

			triggerSet.sort(function(a,b) {

				if (a.index == b.index) {
					return a.sub - b.sub;
				}

				return a.index - b.index;
			});

			refactorTriggers(name);

		}

	}

	// internal function to get trigger by its index
	var getTriggerByIndex = function (name, trigger_index) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			if (triggerSet[i].index == trigger_index) {

				return triggerSet[i];
			}
		}

		return {name:"none", index:-1};
	}

	// internal function to get trigger by its name
	var getTriggerByName = function (name, trigger_name) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			if (triggerSet[i].name == trigger_name) {

				return triggerSet[i];
			}
		}

		return {name:"none", index:-1}; 
	}

	// public function to get trigger by either input
	var getTrigger = function (name, input) {

		var trigger;

		//console.log("getting trigger in set " + name + " with id " + input);

		if (input >= 0) {

			trigger = getTriggerByIndex(name, input);
		}
		else if (input.length > 0) {
			trigger = getTriggerByName(name, input);
		}
		else {

			trigger = {name:"none", index:-1};
		}

		return trigger;
	}

	// test whether trigger set already exists
	var doesTriggerSetExist = function (name) {

		if (self.triggers[name]) {
			return true;
		}

		return false;
	}

	// test whether trigger already exists
	var doesTriggerExist = function (name, input) {

		var trigger;

		if (doesTriggerSetExist(name)) {

			trigger = getTrigger(name, input);

			console.log("trigger index is " + trigger.index);

			if (trigger.index >= 0) {
				return true;
			}
		}

		return false;
	}

	// add a trigger to a set or create one to add it to
	var addTrigger = function (name, params) {

		var triggerSet;

		if (doesTriggerSetExist(name)) {
			triggerSet = getTriggerSet(name);
		}
		else {

			triggerSet = createTriggerSet(name);
		}

		if (params)  {

			console.log("add trigger " + name + " with name " + params.name);
			
			triggerSet.push(params);
			
			sortTriggers(name);
		}
		else {
			console.log("no set to add to _or_ no trigger to add");
		}
	}

	// run set of chained triggers between indecies
	var runTriggers = function (name, params) {

		var low = params.low;
		var high;

		if (low instanceof Number) {
			high = params.high;
		}
		else if (params.all) {
			low = 0;
			high = triggerSet.length-1;
		}

		var deferred = $q.defer();

		var promise = deferred.promise;

		for (var i = low; i <= high; i++) {

			promise.then(function (result) {

				var trigger = getTriggerByIndex(name, i);

				if (trigger.name != "none"){

					console.log("run trigger " + trigger.name);

					trigger.callback();
				}
				else {
					console.log("no trigger to run");
				}

				return true;
			});
		}

		deferred.resolve();
	}

	// pause chaining while trigger in set does not exist
	var waitForTriggerToExist = function (name, input) {

		return $q(function (resolve) {

			console.log("waiting for " + input + " in set " + name + " to exist");

			var wait = setInterval(function () {

				if (doesTriggerExist(name, input)) {

					clearInterval(wait);
					wait = null;
					resolve();
				}

			}, 100);

		});
	}

	// run individual trigger
	var runTrigger = function (name, input) {

		self.defers[name] = waitForTriggerToExist(name, input);

		self.defers[name].then(function () {

			var trigger = getTriggerByInput(name, input);

			trigger.callback();
		});

	}

	// delete all triggers
	var clearTriggers = function (name) {

		self.triggers[name] = [];
	} 

	return {
		on:on,
		dispatch:dispatch,
		defer:defer,
		future:future,
		addTrigger:addTrigger,
		runTriggers:runTriggers,
		runTrigger:runTrigger,
		clearTriggers:clearTriggers
	}

})

.factory("send", function () {

	var saved = {};
	var savedNames = [];

	var receivers = {};
	var names = [];

	var checkArray = function (_item, array) {

		for (i in array) {

			if (_item == array[i]) {

				return true;
			}
		}

		return false;
	}

	var isArray = function (array) {

		if( Object.prototype.toString.call( array ) === '[object Array]' ) {
		   return true;
		}

		return false;
	}

	// an operation to send data back to a receiver
	var back = function () {


		// setup a named key/value object to receive data at a later time
		this.setup = function (params) {

			var name = params.name;

			var bin;

			if (!checkArray(name, names)) {

				bin = []; //create new receiver array for this name
			}
			else {
				bin = receivers[name]; // retrieve existing receiver array for this name
			}

			//console.log("receive " + name + " bin size: " + bin.length);

			bin[bin.length] = params.receiver;

			receivers[name] = bin; //reassign bin to receiver

			names[names.length] = name;
		}

		// save data to the key/value pair object setup before
		this.add = function (params) {

			var name = params.name;
			var id = params.id;

			var bin = receivers[name];

			for (i in bin) {

				bin[i][id] = params.data;
			}

		}

	}

	// save data to be retrieved later
	var save = function () {

		// add data to an array to be retrieved later
		this.add = function (params) {

			var name = params.name;

			var bin;

			if (!checkArray(name, savedNames)) {

				bin = []; //create new receiver array for this name
			}
			else {
				bin = saved[name]; // retrieve existing receiver array for this name
			}

			//console.log("receive " + name + " bin size: " + bin.length);

			bin[bin.length] = params.data;

			saved[name] = bin; //reassign bin to receiver

			savedNames[savedNames.length] = name;

		}
		

		// retrieve the array of data
		this.get = function (params) {

			var name = params.name;

			var bin = saved[name];

			if (bin) {
				return bin;
			}

			return "none";

		}

	}

	

	return {
		back:new back(),
		save:new save()
	}

})

.factory("react", function () {

	var saves = {};
	var names = [];

	var r = function (name) {

		for (i in names) {

			if (name == names[i]) {

				return true;
			}
		}

		return false;
	}

	var obs = function (input) {


		var self = this;
		var o = [];
		self.name = input.name || "";
		self.state = input.state || null;
		var subs = [];

		console.log(self.name, "observable")

		var notify = function () {

			//console.log(self.name, "notify");

			for (i in subs) {
				subs[i](self.state);
			}
		}

		self.subscribe = function (callback) {

			//console.log(self.name, "subscribe");

			subs.push(callback);

			//notify();
		}

		self.setState = function (state) {

			//console.log(self.name, "set state", state);

			self.state = state;

			notify();
		}

	}

	var observable = function (input) {

		if (!r(input.name)) {
			saves[input.name] = new obs(input);
			names[names.length] = input.name;
		}
		else {
			saves[input.name].setState(input.state);
		}
	}

	var subscribe = function (input) {

		if (r(input.name)) {
			saves[input.name].subscribe(input.callback);
		}
		else {
			saves[input.name] = new obs(input);
			saves[input.name].subscribe(input.callback);
			names[names.length] = input.name;
		}

	}

	var push = function (input) {

		if (r(input.name)) {
			saves[input.name].setState(input.state);
		}
		else {
			console.log("no name at push (" + input.name + ")");
		}
	}

	return {
		observable:observable,
		subscribe:subscribe,
		push:push
	}
})

