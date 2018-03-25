
app.directive("doc", ['data', function (data) {

	return {
		restrict:"E",
		scope:false,
		replace:true,
		templateUrl:"assets/views/doc.html",
		link:function ($scope, element, attr) {

		}
	}

}])


.directive("block", function () {

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

		}
	}

})

.directive("p", function () {

	return {

		restrict:"E",
		scope:{
			data:"="
		},
		replace:true,
		templateUrl:"assets/views/paragraph.html",
		link:function ($scope, element, attr) {

			
		}
	}
})

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

				$("#body").scrollTo(0);

			})
		}
	}
})

.directive("home", function (states) {

	return {

		scope:false,
		link:function ($scope, element, attr) {

			$(element).on("click", function () {

				states.go("home");

				$("#body").scrollTo(0);

			})
		}
	}

});