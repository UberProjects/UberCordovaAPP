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
            });
        }

    }
}]);
