/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').service('Ride',[
    'Notifications',
    'RideRoutes',
    'Authentication',
    function(Notifications, RideRoutes, Authentication){

        var _ = window._;
        var rideFriends = [];
        var destination = {};
        this.initialRequestorPos = {};
        var currentRide = {};

        this.setRideFriends = function(friends){
           rideFriends = _.map(friends, function(f){
              f.status = 'Waiting for Conformation';
              return f;
           });
           console.log(rideFriends);
        };

        this.setRideDestination = function(destGeo){
           if( _.has(destGeo,'geometry.access_points') ){
              destination = destGeo.geometry.access_points[0].location;
               //TODO iterate though access_points to find the best one
              return true;
           } else {
              return false;
           }
        };


        this.initRide = function(){

            var localInitPos = this.initialRequestorPos;
            Notifications.newConnectionInfo.then(function(res){
                Authentication.user.room_uuid = res.room_uuid;
                Authentication.user.socket_id = res.socket_id;
                RideRoutes.initRide(rideFriends, destination, localInitPos).then(function(ret){
                    console.log(ret);
                }, function(err){
                    console.log(err);
                });
            });

        };

        Notifications.rideStatus(function(rideUpdate){
            console.log('Ride Updated!!!!!!!!', rideUpdate);
            currentRide = rideUpdate;
        });

        this.setCurrentRide = function(ride){
           currentRide = ride;
        };

    }
]);
