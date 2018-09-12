stateModule.provider("runtime.state", ["$stateProvider", function ($stateProvider) {
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
        name:"module",
        url:"/docs/:module",
        params:{module:null},
        templateUrl:"assets/views/module.html",
        controller:["$scope", "data", "general", "$stateParams", function ($scope, data, general, $stateParams) {

            console.log("controller for module");

            $scope.module = data.getModuleByName($stateParams.module);

            $scope.trustHtml = function (html) {

                return general.renderHtml(html)
            }

        }]
    },
    {
        name:"variable",
        url:"/docs/:module/variable/:variable",
        params:{module:null, variable:null},
        templateUrl:"assets/views/variable.html",
        controller:["$scope", "data", "general", "$stateParams", 'states', function ($scope, data, general, $stateParams, states) {

            console.log("controller for module variable");

            $("#body").scrollTo(0);

            var dataKeys = [
                "name",
                "id",
                "id",
                "name"
            ]

            var objectKeys = [
                "doc",
                "items",
                "sets",
                "items"
            ]

            var values = [
                "modules", 
                $stateParams.module, 
                "variables", 
                $stateParams.variable
            ]

            $scope.data = data.getItem({
                module:$stateParams.module, 
                dataKeys:dataKeys, 
                objectKeys:objectKeys, 
                values:values
            });

            console.log("data", $scope.data);

            $scope.backToModule = function () {

                states.go("module", {module:$stateParams.module});
            }


            $scope.moduleName = function () {

                return $stateParams.module;
            }

            $scope.trustHtml = function (html) {

                return general.renderHtml(html)
            }

        }]
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
}]);