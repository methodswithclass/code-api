stateModule.factory("states", ['$q', 'runtime.state', '$state', '$transitions', function ($q, runtime, $state, $transitions) {

	var prevState;

	var states = runtime.states;

	$transitions.onStart({}, function($trans) {

			//console.log(toState);	  

			prevState = $trans.$from().name;

			console.log("to state", $trans.$to());
	});

	$transitions.onSuccess({}, function($trans) {

			console.log("successfully changed to state", $trans.$to());
	});

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