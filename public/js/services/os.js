//Systems service used for articles REST endpoint
angular.module('mean.os').factory("OS", ['$resource', function($resource) {
    return $resource('os/:osId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);