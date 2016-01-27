/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('RideHomeController', [
  '$scope',
  'RideState',
  '$state',
   function($scope, RideState, $state){
      //Needs to store current ride state and render proper view
      $scope.startNewRide = function(){
        RideState.updateState('new');
        $state.go('tabs.new_ride')
      };

      $scope.startSavedRide = function(){
        RideState.updateState('saved');
        $state.go('tabs.saved_ride')
      };

      $scope.mapCb = function(err, map, position){

        var marker = new google.maps.Marker({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          map: map,
          title: 'You are Here'
        });

        marker.setMap(map);
      };
   }
]);
