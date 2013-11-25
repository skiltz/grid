angular.module('mean.systems').controller('SystemsController', ['$scope', '$routeParams', '$location', 'Global', 'Systems', function ($scope, $routeParams, $location, Global, System) {
    $scope.global = Global;

    $scope.create = function() {
        var system = new System({
            title: this.title,
            content: this.content,
            logo : this.logo,
            website : this.website,
            author : this.author,
            version : this.version,
            playable : this.playable,
            OS : this.OS
        });
        system.$save(function(response) {
            $location.path("systems/" + response._id);
        });

        this.title = "";
        this.content = "";
        this.logo = "";
        this.website = "";
        this.author = "";
        this.version = "";
        this.playable = "";
        this.OS = [];
    };

    $scope.remove = function(system) {
        if (system) {
            system.$remove();  

            for (var i in $scope.system) {
                if ($scope.system[i] == system) {
                    $scope.system.splice(i, 1);
                }
            }
        }
        else {
            $scope.system.$remove();
            $location.path('systems');
        }
    };

    $scope.update = function() {
        var system = $scope.system;
        if (!system.updated) {
            system.updated = [];
        }
        system.updated.push(new Date().getTime());

        system.$update(function() {
            $location.path('systems/' + system._id);
        });
    };

    $scope.find = function() {
        System.query(function(systems) {
            $scope.systems = systems;
        });
    };

    $scope.findOne = function() {
        System.get({
            systemId: $routeParams.systemId
        }, function(system) {
            $scope.system = system;
        });
    };
}]);