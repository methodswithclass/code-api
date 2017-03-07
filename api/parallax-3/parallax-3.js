/***********************************************************************************
  
		Parallax Module v2.1

		AngularJS library with no other dependencies	

		scrolls an image or DOM element at reduced rate compared to document scroll. 
		Takes image source or child element as input.

		contents:
		parallax scrolling directive


		Methods with Class, LLC, 2015


***********************************************************************************/



// import this module into your project
angular.module("parallaxModule", [])


// determines whether current device can use parallax scrolling. IE and mobile devices return false.
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


// add this directive to the element you want to add a parallax scrolling element too
.directive('parallax', ['device', '$window', function (device, $window) {


	// link function, see below for parameters
	var link = function ($scope, element, attr) {


		(function() {

			console.log("parallax-3 is running");
		})();


	}


	return {
		scope:{
			name:"@", //identifier. optional. for debugging
			src:"@", //image source. optional. required if inner is not defined, can't be both
			inner:"@", // child element id. optional. required if src is not defined, can't be both
			scroll:"@", // overflow:scroll element id. required. nothing will work unless this module can detect scrolling and the top of the document is different than the top of the window
			top:"=", // boolean. optional. if a parallax scrolling element has a zero offset when loaded, it may be desired to have this behavior
			factor:"="
		},
		link:link
	};


}]);

