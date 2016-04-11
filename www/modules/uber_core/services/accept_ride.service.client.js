/**
 *
 * Created by Matthias on 4/9/16.
 */

angular.module('uber_core').service('AcceptRide',[
    'Notifications',
    '$ionicPopup',
    '$ionicBackdrop',
    'RideRoutes',
    'Ride',
    '$state',
    'Authentication',
    function(Notifications, $ionicPopup, $ionicBackdrop, RideRoutes, Ride, $state, Authentication){
        this.listenForRequest = function(){
            Notifications.appNotifications(function(data){
               $ionicBackdrop.retain();

               var appData = JSON.parse(data.text).payload;

               console.log(data);
               console.log(appData);

               var answerRequest = $ionicPopup.confirm({
                  'title': 'New Ride Request',
                  'template':'Would you like to accept a ride form: ' + appData.requester +  '?'
               });

               answerRequest.then(function(res){
                   $ionicBackdrop.release();
                   navigator.geolocation.getCurrentPosition(function (position) {

                       var location = {
                           lat: position.coords.latitude ,
                           lng: position.coords.longitude
                       };

                       Notifications.newConnectionInfo.then(function(res){
                           Authentication.user.room_uuid = res.room_uuid;
                           Authentication.user.socket_id = res.socket_id;
                           RideRoutes.respondToRideRequest(res, appData.ride_id, location).then(function(resServer){
                               console.log(resServer);
                               if(res){
                                  //Change view
                                  $state.go('tabs.pending_ride');
                                  Ride.setCurrentRide(resServer.data);
                               }
                           }, function(err){
                               //TODO render error
                               console.log(err);
                           });
                       });


                   },function(err){}, { maximumAge: 3000, timeout: 15000, enableHighAccuracy: true });
               });
            });
        };
    }
]);
