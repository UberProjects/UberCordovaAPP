/**
 *
 * Created by Matthias on 4/9/16.
 */

angular.module('uber_core').service('AcceptRide',[
    'Notifications',
    '$ionicPopup',
    '$ionicBackdrop',
    function(Notifications, $ionicPopup, $ionicBackdrop){
        this.listenForRequest = function(){
            Notifications.appNotifications(function(data){
               $ionicBackdrop.retain();
               var answerRequest = $ionicPopup.confirm({
                  'title':'Ride Request',
                  'template':'Would you like to accept a ride form: ' + '?'
               });

               answerRequest.then(function(res){
                   $ionicBackdrop.release();
                   if(res){
                      console.log('takes a ride');
                   } else {
                      console.log('Does not take a ride');
                   }
               });
            });
        };
    }
]);
