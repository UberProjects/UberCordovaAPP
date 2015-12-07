/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('UberController', [
  '$scope',
  'Authentication',
  '$ionicHistory',
  '$state',
  'RideState',
  function($scope, Authentication, $ionicHistory, $state, RideState){

    $scope.rideState = 'home';

    var updateState = function(){
      $scope.rideState = RideState.getState();
    };

    RideState.registerObserverCallback(updateState);

    //TODO see if this will ever be useful
    $scope.processState = function(){
      switch( $scope.rideState ){
        case 'new':
              $state.go('tabs.new_ride');
              break;
        case 'saved':
              $state.go('tabs.saved_ride');
              break;
        case 'pending':
              $state.go('tabs.pending_ride');
              break;
        case 'inprogress':
              $state.go('tabs.current_ride');
              break;
        case 'finished':
              $state.go('tabs.completed_ride');
              break;
        case 'home':
              $state.go('tabs.ride_home');
              break;
        default:
              $state.go('tabs.ride_home');
              //TODO add some error msg
              break;
      }
    }

  }
]);
