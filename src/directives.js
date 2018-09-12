
app.directive("doc", ['data', "general", function (data, general) {

	return {
		restrict:"E",
		scope:false,
		replace:true,
		templateUrl:"assets/views/doc.html",
		link:function ($scope, element, attr) {


			$scope.trustHtml = function (html) {

				return general.renderHtml(html)
			}

		}
	}

}])


.directive("block", ["$stateParams", "states", function ($stateParams, states) {

	return {
		resrict:"E",
		scope:{
			type:"@",
			data:"="
		},
		replace:true,
		template:"<div ng-include='getContentUrl()'></div>",
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function () {

				return "assets/views/" + $scope.type + ".html";
			}


			$scope.openVariable = function (variable) {

				if ($scope.type == "variables") {

					states.go("variable", {module:$stateParams.module, variable:variable})
				}
			}

		}
	}

}])

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

				window.open("/api/" + $scope.module.name +  "/" + $scope.version.number + "/" + $scope.version.src, "_blank");


				// window.open("/api/" + $scope.version.src, "_blank");
			})
		}
	}

})

.directive("open", ["states", function (states) {

	return {

		scope:false,
		link:function ($scope, element, attr) {

			$(element).on("click", function () {

				states.go("module", {module:$scope.module.name});

				$("#body").scrollTo(0);

			})
		}
	}
}])

.directive("home", ["states", function (states) {

	return {

		scope:false,
		link:function ($scope, element, attr) {

			$(element).on("click", function () {

				states.go("home");

				$("#body").scrollTo(0);

			})
		}
	}

}]);