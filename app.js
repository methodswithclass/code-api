
var past = "past";
var current = "current";
var development = "development";

var app = angular.module("app", ['parallaxModule', 'stateModule'])


.config(['$locationProvider', 'runtime.stateProvider', function ($locationProvider, runtimeProvider) {

	$locationProvider.html5Mode(true);

	var states = runtimeProvider.states;

	for (var i = 0; i < states.length; i++) {
	  runtimeProvider.addState(states[i]);
	}
}]).

run(function (states) {

	states.go("home");
})


.factory("data", function () {

	var modules = [
	{
		name:"parallax",
		description:"parallax scrolling angular module. Scrolls an image or DOM element at reduced rate compared to document scroll. Takes image source or child element id as input.",
		versions:[
		{
			number:"1",
			src:"parallax-1.js",
			status:past
		},
		{
			number:"2",
			src:"parallax-2.js",
			status:past
		},
		{
			number:"2.1",
			src:"parallax-2.1.js",
			status:current
		}
		]
	},
	{
		name:"classes",
		description:"all purpose css library. allows you to style any element anyway you want without making a special class for it.",
		versions:[
		{
			number:"1",
			src:"classes.css",
			status:current
		}
		]
	},
	{
		name:"shared",
		description:"contains several services for any angular project. includes a generic events service and a generic service to send and receive any kind of object or data within an angular app",
		versions:[
		{
			number:"1",
			src:"shared-1.js",
			status:past
		},
		{
			number:"2",
			src:"shared-2.js",
			status:current
		}
		]
	},
	{
		name:"console",
		description:"prints out console.log() entries to a visible area on screen. useful for mobile debugging. output is scrollable. contains angular directive and service.",
		versions:[
		{
			number:"1",
			src:"console-1.js",
			status:current
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

})

.controller("controller", ['$scope', 'data', function ($scope, data) {

	var self = this;

	self.modules = data.modules;

}])

// .directive("footer", function () {

// 	return {
// 		scope:false,
// 		link:function ($scope, element, attr) {

// 			var outer;
// 			var footer;
// 			var inner;

// 			var setHeight = function () {

// 				outer = $("#footerouter");
// 				footer = $(element);
// 				inner = $("#footerinner");

// 				footer.css({height:$(window).height()});
// 				//inner.css({bottom:"10%"});
// 			}

// 			setTimeout(function () {

// 				setHeight();
// 			}, 300);

// 			$(window).on("resize", setHeight());
// 		}
// 	}

// })

.directive("mainPage", function () {

	return {
		scope:false,
		link:function ($scope, element, attr) {

			$(element).on("click", function () {

				window.open("http://www.methodswithclass.com", "_blank");
			})

		}
	}
})

.directive("download", function () {

	return {

		scope:false,
		link:function ($scope, element, attr) {

			$(element).on("click", function () {

				window.open("http://code.methodswithclass.com/" + $scope.version.src, "_blank");
			})
		}
	}

})

.directive("open", function (states) {

	return {

		scope:false,
		link:function ($scope, element, attr) {

			$(element).on("click", function () {

				states.go($scope.module.name);

			})
		}
	}
})