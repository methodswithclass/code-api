app.directive("mainPage", function () {

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

				window.open("http://code.methodswithclass.com/api/" + $scope.version.src, "_blank");
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