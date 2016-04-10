/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('UberController', [
  '$scope',
  'Authentication',
  '$ionicHistory',
  '$state',
  'AcceptRide',
  function($scope, Authentication, $ionicHistory, $state, AcceptRide){

    AcceptRide.listenForRequest();

  }
]);
