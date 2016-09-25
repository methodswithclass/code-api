/***********************************************************************************
 
		Console Module v1

		AngularJS library with no other dependencies	

		prints out the console to a visible area on screen. designed for mobile debugging. output is scrollable

		contents:
		console service
		console directive
		

		Methods with Class, LLC, 2015


***********************************************************************************/


// load this module into your project
var consoleModule = angular.module("consoleModule", [])


.factory("con", function() {

	var total = 1000;
	var history = [];

	var count = 0;

	var registered = false;

	var conCont;
	var thisCon;

	var register = function (thisConsole) {

		//console.log("register");

		registered = true;

		conCont = thisConsole;
		thisCon = conCont.prev();
	}

	var isRegistered = function () {

		return registered;
	}

	var isVisible = function () {

		return thisCon && thisCon.is(":visible");
	}
		
	var refresh = function () {
			
		for (var i = 1; i < history.length; i++) {
			history[i-1] = history[i];
		}
		
		history.splice(history.length-1, 1);
	}

	var setHTML = function (html) {

		$(thisCon).html(html);

		$(thisCon).scrollTop(9999999);
	}
		
	var print = function () {

		var string = "";
		
		setHTML(string);
		
		for (i in history) {

			string += history[i] + "<br>";	
		}

		setHTML(string);
	}

	var log = function (text) {
		
		if (isVisible()) {

			history[history.length] = count++ + "&nbsp; &nbsp;" + text;
			
			if (history.length == total)
				refresh();
			
			print();
		
		}
		else {
			//console.log("is not visible");
		}
		
	}

	var attachToConsole = function () {
	    var oldLog = console.log;
	    console.log = function (message) {
	       	log.apply(console, arguments);
	        oldLog.apply(console, arguments);
	    };
	}

	var attach = function () {

		if (isVisible()) { 

			attachToConsole();
		
			window.onerror = function (msg, url, linenumber) {
				log("Error: " + msg + ", in " + url + " at " + linenumber);
			}
		}
	}

	return {
		register:register,
		isRegistered:isRegistered,
		isVisible:isVisible,
		attach:attach,
		log:log
	}

})


// add this directive to your html
.directive("console", function () {

	var link = function ($scope, element, attr) {

		// the attribute is required for it to show on screen
		var vis = attr.vis;

		if (vis == "show") {
			element.show();
		}
		else {
			element.hide();
		}

	}

	return {
		template:"<div class='console scrollY touch' id='consoleInner'></div><div class='console' id='consoleContainer'></div>",
		link:link
	}
});