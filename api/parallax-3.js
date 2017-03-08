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


		var fix = function (params) {

			var img = params.img;
	    	var space = params.space;
	    	var aspect;
	    	var height;
	    	var width;

			var goodAspect = function (width, height) {
				if (Math.abs(width/height - aspect) < 0.01) return true;
				return false;
			}

			var checkHeight = function (height) {
		        if (height < space.height()) return "under";
		        else if (height > space.height()*1.2) return "over";
		        return "good";
		    }

		    var checkWidth = function (width) {
		        if (width < space.width()) return "under";
		        else if (width > space.width()*1.5) return "over";
		        return "good";
		    }

	    	if ($(img)[0]) {

		    	aspect = img.width()/img.height();

		        height = space.height()*1.2;
		        width = height*aspect;
		        
		        if (checkWidth(width) == "under") {
		            //console.log("width under " + name);
		            width = space.width();
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                //console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }
		        else if (checkWidth(width) == "over") {
		            //console.log("width over " + name);
		            width = space.width()*1.2;
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                //console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }

		        img.css({height:height, width:width});
	    	}
	        
	    }


	    var runFix = function () {

	    	fix({space:$(element), first:true});
	    }

	    setTimeout(function () {
			runFix();
		}, 200);


		angular.element($window).bind('resize', function () {
			runFix();
		});


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

