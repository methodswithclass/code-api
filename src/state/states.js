stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', function ($q, runtime, $state, $rootScope) {

	var prevState;

	var states = runtime.states;

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams) {

			//console.log(toState);	  

			prevState = fromState;

			console.log(toState);
		}
	);

	var current = function () {

		return $state.current.name;
	}

	var go = function (state) {
		$state.go(state);
	}
	

	return {
		current:current,
		go:go
	}




}]);