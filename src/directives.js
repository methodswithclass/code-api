
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


.directive("block", ["$stateParams", "states", "general", "data", function ($stateParams, states, general, data) {

	return {
		resrict:"E",
		scope:{
			type:"@",
			data:"=",
			parent:"=",
			misc:"="
		},
		replace:true,
		template:"<div ng-include='getContentUrl()'></div>",
		link:function ($scope, element, attr) {

			var dataKeys;
			var objectKeys;
			var values;
			var variableData;

			$scope.getContentUrl = function () {

				return "assets/views/" + $scope.type + ".html";
			}


			$scope.openVariable = function (variable) {

				// var $mod = getModule(mod.id);

				// console.log("open variable\ndata:\n", $scope.data, "\nparent:\n", $scope.parent);

				if ($scope.data.id == "variables" || $scope.parent.id == "variables") {

					objectKeys = [
		                "doc",
		                "items",
		                "sets",
		                "items"
		            ]

					dataKeys = [
		                "name",
		                "id",
		                "id",
		                "name"
		            ]

		            values = [
		                "modules", 
		                $stateParams.module,
		                "variables", 
		                variable.name
		            ]

		        }
		        else if ($scope.data.id == "functions" || $scope.parent.id == "functions") {

		        	// console.log("parent", $scope.data);

		        	var inputoutput = ($scope.data.name.text == "returns" ? "output" : $scope.data.name.text.slice(0, $scope.data.name.text.length-1)) + ".items";

		        	objectKeys = [
		                "doc",
		                "items",
		                "sets",
		                "items",
		                inputoutput
		            ]

		        	dataKeys = [
		                "name",
		                "id",
		                "id",
		                "name",
		                "name"
		            ]

		            values = [
		                "modules",
		                $scope.misc.parent.name,
		                "functions",
		                $scope.misc.function.name,
		                variable.name
		            ]


		        }


		        variableData = data.getItem({
	                module:$stateParams.module, 
	                dataKeys:dataKeys, 
	                objectKeys:objectKeys, 
	                values:values
	            });


	            states.go("variable", {module:$stateParams.module, variable:variable.name, variableData:{misc:$scope.misc, data:variableData}})

			}

			$scope.trustHtml = function (html) {

				return general.renderHtml(html)
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