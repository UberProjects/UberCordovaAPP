/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('CompletedRideController', [
  '$scope',
  'Authentication',
  function($scope, Authentication){

      $scope.launchPaypal = function() {
          console.log('Launching Paypal In-App Browser');
          window.cordova.InAppBrowser.open('https://m.paypal.com/login', '_blank', 'location=no');
      };

      $scope.launchVenmo = function() {
          console.log('Launching Venmo In-App Browser');
          window.cordova.InAppBrowser.open('https://m.venmo.com/login', '_blank', 'location=no');
      };

  }
]);
