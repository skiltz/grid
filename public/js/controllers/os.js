angular.module('mean.os').controller('OSController', ['$scope', '$routeParams', '$location', 'Global', 'OS', function ($scope, $routeParams, $location, Global, OS) {
    $scope.global = Global;

    $scope.create = function() {
        var os = new OS({
            title: this.title,
            arch: this.arch,
            logo: this.logo,
            website: this.website,
            author: this.author,
            version: this.version
        });
        os.$save(function(response) {
            $location.path("os/" + response._id);
        });

        this.title = "";
        this.arch = "";
        this.logo = "";
        this.website = "";
        this.author = "";
        this.version = "";
    };

    $scope.remove = function(os) {
        if (os) {
            os.$remove();  

            for (var i in $scope.os) {
                if ($scope.os[i] == os) {
                    $scope.os.splice(i, 1);
                }
            }
        }
        else {
            $scope.os.$remove();
            $location.path('os');
        }
    };

    $scope.update = function() {
        var os = $scope.os;
        if (!os.updated) {
            os.updated = [];
        }
        os.updated.push(new Date().getTime());

        os.$update(function() {
            $location.path('os/' + os._id);
        });
    };

    $scope.find = function() {
        OS.query(function(os) {
            $scope.os = os;
        });
    };

    $scope.findOne = function() {
        OS.get({
            osId: $routeParams.osId
        }, function(os) {
            $scope.os = os;
        });
    };
}]);