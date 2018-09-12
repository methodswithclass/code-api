stateModule.factory("states", ['$q', 'runtime.state', '$state', '$transitions', "$location", function ($q, runtime, $state, $transitions, $ocation) {

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



	var getVersionExt = function (str) {

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


		var urlArray = $location.url().split("/");
		var pack;
		var packName;
		var version;
		var ext;

		packName = urlArray[1];
		
		var dashIndex = packName.search("-");
		var periodIndex = packName.search(".");

		if (dashIndex != -1) {


			var str = packName.split("-")[1];

			if (periodIndex != -1) {

				
				var temp = getVersionExt(str);

				version = temp.version;
				ext = temp.ext;
			}

		}


		if (dashIndex != -1 && periodIndex >= dashIndex) {
			pack = packName.split("-")[0];
		}
		else if (periodIndex != -1) {
			pack = packName.split(".")[0];
		}
		else {
			pack = urlArray[1];
		}


		if (pack == "classes") {

			version == "2.0";
			ext = "css";
		}


		window.open("https://code.methodswithclass.com/" + pack + "/" + version + "/" + pack + "." + ext);

	}

	var current = function () {

		return $state.current.name;
	}

	var go = function (state, data) {
		console.log("go to", state, data);

		if (state == "home") {
			$state.go(state);
		}
		else {
			$state.go(state, data)
		}

		
	}
	

	return {
		getPackage:getPackage,
		current:current,
		go:go
	}




}]);