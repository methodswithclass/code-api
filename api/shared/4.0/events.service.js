


(function(window) {


	var events = {};
	var triggers = {};
	var defers = {};
	var promises = {};

	// runs a saved promise
	var future = function (name) {

		try {

			promises[name].resolve();

			return true;
		}
		catch (e) {

			return false;
		}
	}

	// saves and returns a promise that will be run later, optional config callback will be run before promise is resolved
	var defer = function (name, _config) {

		promises[name] = $q.defer();

		promises[name].promise.then(function () {
			
			if (_config) return _config();
			return false;
		});

		return promises[name];
	}

	// runs a saved simple callback
	var dispatch = function (name) {

		var result;

		try {

			return events[name]();
		}
		catch (e) {

			return false;
		}

	}

	// saves a simple callback
	var on = function (name, _event) {

		events[name] = _event;

	}

	// create a set of callacks, triggers, to be chained
	var createTriggerSet = function (name) {

		console.log("for " + name + " create trigger set");

		triggers[name] = [];

		return triggers[name];
	}

	// get a trigger set by its name
	var getTriggerSet = function (name) {

		var triggerSet = triggers[name];

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

		if (triggers[name]) {
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

		defers[name] = waitForTriggerToExist(name, input);

		defers[name].then(function () {

			var trigger = getTriggerByInput(name, input);

			trigger.callback();
		});

	}

	// delete all triggers
	var clearTriggers = function (name) {

		triggers[name] = [];
	} 

	
	window.mcevents = {
		on:on,
		dispatch:dispatch,
		defer:defer,
		future:future,
		addTrigger:addTrigger,
		runTriggers:runTriggers,
		runTrigger:runTrigger,
		clearTriggers:clearTriggers
	}


})(window)