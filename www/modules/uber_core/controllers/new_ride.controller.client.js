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
    //Needs to matain current ride status and adjust child views accordingly
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

    $scope.addNumber = contactHelper.contactInput;

    contactHelper.addFriendsListener(function(friendsList){
        $scope.data.friends = friendsList;
    });

    $scope.addFromContactsList = function(){
        navigator.contacts.find(
            [navigator.contacts.fieldType.displayName],
            gotContacts,
            errorHandler);

        function errorHandler(e) {
            console.log("errorHandler: "+e);
        }

        function gotContacts(c) {
            console.log("gotContacts, number of results "+c.length);
            picDiv = document.querySelector("#pictures");
            for(var i=0, len=c.length; i<len; i++) {
                console.dir(c[i]);
                if(c[i].photos && c[i].photos.length > 0) {
                    picDiv.innerHTML += "<img src='"+c[i].photos[0].value+"'>";
                }
            }
        }
    };

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
