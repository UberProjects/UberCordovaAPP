/**
 *
 * Created by Matthias on 2/10/16.
 */

angular.module('uber_core').factory('RideRoutes', ['$http', 'SERVER', 'Authentication', function($http, SERVER, Authentication){
    return {
        checkFriend: function(friend){
            return $http.post(SERVER + '/ride/checkFriend', {friend:friend, user: Authentication.user});
        },
        initRide: function(friends, dest, startPos){
            return $http.post(SERVER + '/ride/initRide', {
                friends: friends,
                destination: dest,
                start: startPos.center,
                user: Authentication.user
            });
        },
        respondToRideRequest: function(response, ride_id, location){
            return $http.post(SERVER + '/ride/respondToRideRequest',{
               response: response,
               location: location,
               ride_id: ride_id,
               user: Authentication.user
            })
        },
        startRide: function(data, product_id) {
            return $http.post(SERVER + '/ride/startRide', {
                data: data,
                product_id: product_id,
                user: Authentication.user
            });
        },
        updateRide: function(data) {
            return $http.post(SERVER + '/ride/updateUberDestination', {
                data: data,
                user: Authentication.user
            });
        },
        getEstimatedPrice: function (start_pos, end_pos) {
            return $http.post(SERVER + '/ride/getUberEstimatedPrice', {start_pos: start_pos, end_pos: end_pos, user: Authentication.user});
        },
        requestRide: function (start_pos, end_pos, product_id) {
            return $http.post(SERVER + '/ride/requestUberRide', {start_pos: start_pos, end_pos: end_pos, product_id: product_id, user: Authentication.user});
        },
        getRequestedRide: function (request_id) {
            return $http.post(SERVER + '/ride/getUberRequestedRide', {request_id: request_id, user: Authentication.user});
        },
        patchRequestedRide: function (request_id, end_pos) {
            return $http.post(SERVER + '/ride/patchUberRequestedRide', {request_id: request_id, end_pos: end_pos, user: Authentication.user});
        },
        deleteRequestedRide: function (request_id) {
            return $http.post(SERVER + '/ride/deleteUberRequestedRide', {request_id: request_id, user: Authentication.user});
        }

    }
}]);
