stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};

    var states = [
    {
        name:"home",
        url:"/",
        templateUrl:"views/home.html"
    },
    {
        name:"parallax",
        url:"/docs/parallax",
        templateUrl:"views/parallax.html",
        controller:function ($scope, data) {

            $scope.module = data.getModuleByName("parallax");

        }
    },
    {
        name:"classes",
        url:"/docs/console",
        templateUrl:"views/classes.html",
        controller:function ($scope, data) {

            $scope.module = data.getModuleByName("classes");

        }
    },
    {
        name:"shared",
        url:"/docs/shared",
        templateUrl:"views/shared.html",
        controller:function ($scope, data) {

            $scope.module = data.getModuleByName("shared");

        }
    },
    {
        name:"console",
        url:"/docs/console",
        templateUrl:"views/console.html",
        controller:function ($scope, data) {

            $scope.module = data.getModuleByName("console");

        }
    }
    ];

    var addState = function(state) { 

        console.log("add state " + state.name);

        $stateProvider.state(state);
    }

    provider.$get = function () {

        var service = function () {


        }

        return new service();
    
    };

    provider.addState = addState;
    provider.states = states;

    return provider;
});