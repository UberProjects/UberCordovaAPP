/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').service('Ride',[
    'Notifications',
    'RideRoutes',
    function(Notifications, RideRoutes){

        var _ = window._;
        var rideFriends = [];
        var destination = {};

        this.setRideFriends = function(friends){
           rideFriends = _.map(friends, function(f){
              f.status = 'Waiting for Conformation';
              return f;
           });
           console.log(rideFriends);
        };

        this.setRideDestination = function(destGeo){
           console.log(destGeo);
           if( _.has(destGeo,'geometry.access_points') ){
              destination = destGeo.access_points[0].location;
              console.log(destination);
              return true;
           } else {
              return false;
           }
        };

        this.initialRequestorPos = {};

        this.initRide = function(){
            console.log('running in initRide');
            RideRoutes.initRide(rideFriends, destination).then(function(ret){
                console.log(ret);
            }, function(err){
                console.log(err);
            });
        };

        Notifications.rideStatus(function(rideUpdate){

        });

    }
]);
