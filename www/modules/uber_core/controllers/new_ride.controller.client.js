/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('NewRideController', [
  '$scope',
  'Authentication',
  '$ionicPopup',
  '$state',
  'Notifications',
  'FriendsContact',
  function($scope, Authentication, $ionicPopup, $state, Notifications, FriendsContact){
    $scope.data = {
      number:'',
      showDelete: false,
      friendsList: [],
      products:[]
    };

    Notifications.newConnectionInfo.then(function(id){
        console.log(id);
    });

    var contactHelper = new FriendsContact($scope);

    $scope.addToRide = contactHelper.addToRide;
    $scope.searchForFriend = contactHelper.searchForFriend;
    $scope.removeFromRide = contactHelper.removeFromRide;


    contactHelper.addFriendsListener(function(friendsList){
        $scope.data.friends = friendsList;
    });

    contactHelper.searchListener(function(searchList){
      $scope.data.searchList = searchList;
    });

    $scope.continue = function(){
      //TODO add logic for calling server and creating new ride
      $state.go('tabs.pending_ride')
    };

    $scope.completedRide = function() {
        console.log('GOING TO COMPLETED');
        $state.go('tabs.completed_ride');
    };

    //TODO make this better
    function validNumber(num){
      return num.length > 0
    }
  }
]);
