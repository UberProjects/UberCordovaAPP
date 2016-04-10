/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').service('Ride',[
    'Notifications',
    'RideRoutes',
    function(Notifications, RideRoutes){

        this.rideFriends = [];

        this.initialRequestorPos = {};

        this.initRide = function(){

        };

    }
]);
