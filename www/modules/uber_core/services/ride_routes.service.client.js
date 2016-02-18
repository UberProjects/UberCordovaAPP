/**
 *
 * Created by Matthias on 2/10/16.
 */

angular.module('uber_core').factory('RideRoutes', ['$http', 'SERVER', function($http, SERVER){
    return {
        getProducts: function (location) {
            return $http.post(SERVER + '/ride/getUberProductLocations', {pos:location});
        },
        checkFriend: function(friend){
            return $http.post(SERVER + '/ride/checkFriend', {friend:friend});
        }
    }
}]);
