
//http://code.methodswithclass.com/whatdevice-1.js is a dependency


angular.module('sharedModule', []).


.factory('global', ['$sce', function ($sce) {

	var forceMobile = false;

	var isMobile = function () {
		if (checkMobile) return checkMobile(forceMobile);
		else return false;
	}

	var checkDevice = function () {
		if (whatDevice) return whatDevice(forceMobile);
		return "none";
	}

	var isPortrait = function () {

		var width = $(window).width();
		var height = $(window).height();

		//console.log("width " + width + " height " + height);

		if (width < height) {
			return true;
		}

		return false;
	}

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

    return {
    	isMobile:isMobile,
    	checkDevice:checkDevice,
    	isPortrait:isPortrait,
    	getOrientation:getOrientation,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }

    } 

}])

.factory("events", function ($q) {

	var self = this;

	this.events = {};
	this.triggers = {};
	this.defers = {};
	this.promises = {};

	var future = function (name) {

		try {

			self.promises[name].resolve();

			return true;
		}
		catch (e) {

			return false;
		}
	}

	var defer = function (name, _config) {

		self.promises[name] = $q.defer();

		self.promises[name].promise.then(function () {
			
			if (_config) return _config();
			return false;
		});

		return self.promises[name];
	}

	var dispatch = function (name) {

		var result;

		try {

			return self.events[name]();
		}
		catch (e) {

			return false;
		}

	}

	var on = function (name, _event) {

		self.events[name] = _event;

	}

	var createTriggerSet = function (name) {

		console.log("for " + name + " create trigger set");

		self.triggers[name] = [];

		return self.triggers[name];
	}

	var getTriggerSet = function (name) {

		var triggerSet = self.triggers[name];

		if (triggerSet) {

			console.log("for " + name + " get existing trigger set");

			return triggerSet;
		}

		return [];
	}

	var refactorTriggers = function (name) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			triggerSet[i].index = i;
		}
	}

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

	var getTriggerByIndex = function (name, trigger_index) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			if (triggerSet[i].index == trigger_index) {

				return triggerSet[i];
			}
		}

		return {name:"none", index:-1};
	}

	var getTriggerByName = function (name, trigger_name) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			if (triggerSet[i].name == trigger_name) {

				return triggerSet[i];
			}
		}

		return {name:"none", index:-1}; 
	}

	var getTriggerByInput = function (name, input) {

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

	var doesTriggerSetExist = function (name) {

		if (self.triggers[name]) {
			return true;
		}

		return false;
	}

	var doesTriggerExist = function (name, input) {

		var trigger;

		if (doesTriggerSetExist(name)) {

			trigger = getTriggerByInput(name, input);

			console.log("trigger index is " + trigger.index);

			if (trigger.index >= 0) {
				return true;
			}
		}

		return false;
	}

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

	var runTrigger = function (name, input) {

		self.defers[name] = waitForTriggerToExist(name, input);

		self.defers[name].then(function () {

			var trigger = getTriggerByInput(name, input);

			trigger.callback();
		});

	}

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

	var setup = function () {

		this.receiver = function (params) {

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

		this.save = function (params) {

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

	}

	var retrieve = function () {

		this.accum = function (params) {

			var name = params.name;
			var id = params.id;

			var bin = receivers[name];

			for (i in bin) {

				bin[i][id] = params.data;
			}

		}

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

		setup:new setup(),
		retrieve:new retrieve()
	}

})


.directive('onTap', function () {
	return function (scope, element, attrs) {
		return $(element).hammer({
			 	prevent_default: false,
			 	drag_vertical: false
			})
			 .bind("tap", function (ev) {
			   return scope.$apply(attrs['onTap']);
			 });
	};
})

