
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
});