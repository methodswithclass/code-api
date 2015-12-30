
//http://code.methodswithclass.com/whatdevice-1.js is a dependency


angular.module('sharedModule', []).


.factory('global', ['$window', '$sce', '$location', 'events', function($window, $sce, $location, events) {

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

	var dispatch = function (name) {

		return self.events[name]();
	}

	var on = function (name, _event) {

		self.events[name] = _event;
	}

	return {
		on:on,
		dispatch:dispatch
	}

})

.factory("send", function () {

	var receivers = {};

	var names = [];

	var checkName = function (_name) {

		for (i in names) {

			if (_name == names[i]) {

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

	var accum = function (params) {

		var name = params.name;
		var id = params.id;

		var bin = receivers[name];

		//console.log("accum: " + name + " id: " + id);
		//console.log(params.data);
		//console.log("bin length " + bin.length);

		for (i in bin) {

			bin[i][id] = params.data;
		}

	}

	var receiver = function (params) {

		var name = params.name;

		var bin;

		if (!checkName(name)) {

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

	return {

		accum:accum,
		receiver:receiver
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

