/**
 *
 * Created by Matthias on 2/10/16.
 */

angular.module('uber_core').factory('RideRoutes', ['$http', 'SERVER', 'Authentication', function($http, SERVER, Authentication){
    return {
        checkFriend: function(friend){
            return $http.post(SERVER + '/ride/checkFriend', {friend:friend, user: Authentication.user});
        },
        initRide: function(friends, dest){
            return $http.post(SERVER + '/ride/initRide', {
                friends: friends,
                destination: dest,
                user: Authentication.user
            });
        }

    }
}]);
