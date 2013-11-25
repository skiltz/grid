//Systems service used for articles REST endpoint
angular.module('mean.systems').factory("Systems", ['$resource', function($resource) {
    return $resource('systems/:systemId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);