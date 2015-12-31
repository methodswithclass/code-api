
angular.module("parallaxModule", [])

.factory("device", function () {

	var valid = function() {

		if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Safari') != -1) {

			return true;
		}

		return false;
	}

	return {
		valid:valid
	}


})

.factory("parallax.service", ['device', function (device) {


	var standardHeight = 1650;
	var standardWidth = 900;
	var scrollHeight;
	var scrollWidth;


	var scrollFactor;
	var windowFactor;
	var elemHeight;
	var elemOffset;
	var spaceHeight;
	var spaceOffset;
	var spread;
	var minimum;
	var value;


	var scroll;
	var space;
	var elem;

	var checkElements = function () {

		console.log("scroll" + $(scroll)[0]);
		console.log("space " + $(space)[0]);
		console.log("parallax " + $(elem)[0]);

		if ($(scroll)[0] && $(space)[0] && $(elem)[0]) {

			return true;
		}

		return false;
	}

	var getValues = function (params) {

		console.log("space id " + params.space);

		scroll = $("#" + params.scroll);
		space = $("#space" + params.space);
		elem = $("#parallax" + params.name);

		if (checkElements()) {
			elemHeight = elem.height();
			elemOffset = elem.offset().top - scroll.offset().top;
			spaceHeight = space.height();
			spaceOffset = space.offset().top - scroll.offset().top;

			minimum = -params.bottom*(elemHeight - spaceHeight);
			spread = 0.9*(elemHeight - spaceHeight);

			return true;
		}

		console.log("no elements");

		return false;
	}

	var set = function (params) {

		if (device.valid() && getValues(params)) { //check if browser is ie or not

			if (params.top)	{
				value = params.factor*spaceOffset/1200*spread + minimum;
			}
			else {
				value = -params.factor*(1-spaceOffset/1200)*spread + minimum;
			}

			elem.css({"bottom":value});

		}
		else {

			elem.css({"bottom":minimum});
		}
		
	}

	var imageAdjust = function () {

		var self = this;

		var img;
		var space;

		var aspect;

		var goodAspect = function (width, height) {

			if (Math.abs(width/height - aspect) < 0.01) {
				return true;
			}

			return false;
		}

		var checkHeight = function (height) {

	        if (height < space.height()) {

	            return "under";
	        }
	        else if (height > space.height()*1.2) {

	            return "over";
	        }

	        return "good";

	    }

	    var checkWidth = function (width) {

	        if (width < space.width()) {
	            return "under";
	        }
	        else if (width > space.width()*1.5) {

	            return "over";
	        }

	        return "good";
	    }

	    self.fix = function (params) {

	    	img = $("#img" + params.name);
	    	space = $("#space" + params.space);

	    	if ($(img)[0]) {

		    	if (params.first) aspect = img.width()/img.height();

		        var height = space.height()*1.2;
		        var width = height*aspect;
		        
		        if (checkWidth(width) == "under") {
		            console.log("width under " + name);
		            width = space.width();
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }
		        else if (checkWidth(width) == "over") {
		            console.log("width over " + name);
		            width = space.width()*1.2;
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }
		       
		       	
		       	if (checkWidth(width) && checkHeight(height)) {
		       		console.log("image good");
		       		if (goodAspect(width, height)) {
		       			console.log("aspect is good " + name + " " + aspect);
		       		}
		       		else {
			       		console.log("aspect is bad " + name + " " + aspect);
			       	}
		       	}

		        img.css({height:height, width:width});
	    	}
	        
	    }

	}


	return {
		getValues:getValues,
		set:set,
		imageAdjust:imageAdjust
	}

}])

.directive('parallax', ['parallax.service', '$window', function (parallax, $window) {

	var link = function ($scope, element, attr) {

		var width = $(element).width();
		var height = $(element).height();

		var inner = document.createElement("div");
		$(inner).addClass("fixed height150 width z-minus-100");
		$(element).append(inner);


		var img = document.createElement("img");
		$(img).addClass("absolute height80 width-auto");
		$(inner).append(img);

		$scope.top = $(inner).position().top;

		$scope.$watch("top", function (newValue, oldValue) {

			return newValue*0.8;

		});

	}

	return {
		scope:{
			src:"@"
		},
		link:link
	};

}]);