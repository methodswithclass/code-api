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



	getVersionExt = function (str) {

		var versionArray = str.split(".");
		var version;
		var ext;

		versionArray.map((value, index, array) => {

			if (index == array.length - 1) {

				ext = value;
			}
			else {

				version += "." + value;
			}
		})


		return {
			version:version,
			ext:ext
		}

	}


	var getPackage = function() {

		console.log("check inbound for url", $location.absUrl());

		var raw;
		var urlArray = $location.url().split("/");
		var package;
		var packageName;
		var version;
		var ext;

		packageName = urlArray[1];


		var dashIndex = packageName.search("-");
		var periodIndex = packageName.search(".");

		if (dashIndex != -1) {


			var str = packageName.split("-")[1];

			if (periodIndex != -1) {

				
				var temp = getVersionExt(str);

				version = temp.version;
				ext = temp.ext;
			}

		}


		if (dashIndex != -1 && periodIndex >= dashIndex) {
			package = packageName.split("-")[0];
		}
		else if (periodIndex != -1) {
			package = packageName.split(".")[0];
		}
		else {
			package = urlArray[1];
		}


		window.open("https://code.methodswithclass.com/" + package + "/" + version + "/" + package + "." + ext);


		// send.setup.save({name:"navigate", data:param});

		
	}

	var current = function () {

		return $state.current.name;
	}

	var go = function (state) {
		$state.go(state);
	}
	

	return {
		getPackage:getPackage,
		current:current,
		go:go
	}




}]);