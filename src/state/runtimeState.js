stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};

    var states = [
    {
        name:"home",
        url:"/",
        templateUrl:"assets/views/home.html",
        controller:['$scope', 'data', function ($scope, data) {

            var self = this;

            self.modules = data.modules;

        }],
        controllerAs:"main"
    },
    {
        name:"parallax",
        url:"/docs/parallax",
        templateUrl:"assets/views/module.html",
        controller:function ($scope, data) {

            $scope.module = data.getModuleByName("parallax");

        }
    },
    {
        name:"classes",
        url:"/docs/classes",
        templateUrl:"assets/views/module.html",
        controller:function ($scope, data) {

            $scope.module = data.getModuleByName("classes");

        }
    },
    {
        name:"shared",
        url:"/docs/shared",
        templateUrl:"assets/views/module.html",
        controller:function ($scope, data) {

            $scope.module = data.getModuleByName("shared");

        }
    },
    {
        name:"console",
        url:"/docs/console",
        templateUrl:"assets/views/module.html",
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

            var self = this;

            self.states = states;

        }

        return new service();
    
    };

    provider.addState = addState;
    provider.states = states;

    return provider;
});