/**
 *
 * Created by Matthias on 2/10/16.
 */

angular.module('uber_core').factory('RideRoutes', ['$http', 'SERVER', 'Authentication', function($http, SERVER, Authentication){
    return {
        getProducts: function (location) {
            return $http.post(SERVER + '/ride/getUberProductLocations', {pos:location, user: Authentication.user});
        },
        getProduct: function (product_id) {
            return $http.post(SERVER + '/ride/getUberProductById', {product_id: product_id, user: Authentication.user});
        },
        checkFriend: function(friend){
            return $http.post(SERVER + '/ride/checkFriend', {friend:friend, user: Authentication.user});
        },
        getEstimatedPrice: function (start_pos, end_pos) {
            return $http.post(SERVER + '/ride/getUberEstimatedPrice', {start_pos: start_pos, end_pos: end_pos, user: Authentication.user});
        },
        requestRide: function (start_pos, end_pos, product_id) {
            return $http.post(SERVER + '/ride/requestUberRide', {start_pos: start_pos, end_pos: end_pos, product_id: product_id, user: Authentication.user});
        },
        getRequestedRide: function (request_id) {
            return $http.post(SERVER + '/ride/getUberRequestedRide', {request_id: request_id, user: Authentication.user});
        }
    }
}]);
