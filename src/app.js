var app = angular.module("app", ['parallaxModule', 'stateModule'])


.config(['$locationProvider', 'runtime.stateProvider', function ($locationProvider, runtimeProvider) {

	$locationProvider.html5Mode(true);

	var states = runtimeProvider.states;

	for (var i = 0; i < states.length; i++) {
	  runtimeProvider.addState(states[i]);
	}
}])

.run(["states",function (states) {

	
	// states.getPackage();

	states.go("home");
}]);




getAngularModules(app);