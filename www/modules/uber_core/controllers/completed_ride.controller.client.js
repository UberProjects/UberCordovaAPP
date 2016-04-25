/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('CompletedRideController', [
  '$scope',
  'Authentication',
  'Ride',
  function($scope, Authentication, Ride){

      $scope.dividedPrice = 0;

      $scope.launchPaypal = function() {
          console.log('Launching Paypal In-App Browser');
          window.cordova.InAppBrowser.open('https://www.paypal.com/signin/', '_blank', 'location=no');
      };

      $scope.launchVenmo = function() {
          console.log('Launching Venmo In-App Browser');
          window.cordova.InAppBrowser.open('https://m.venmo.com/account/sign-in/', '_blank', 'location=no');
      };

      $scope.calculatePrices = function() {
          console.log('TEST!!!!');
          var friends = Ride.getCurrentRide();
          var numFriends = friends.ride_users.length;
          console.log(numFriends);
          console.log(friends);
          $scope.dividedPrice = Number($scope.price) / (numFriends + 1);
      }

  }
]);
