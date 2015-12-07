/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('NewRideController', [
  '$scope',
  'Authentication',
  '$ionicPopup',
  '$state',
  function($scope, Authentication, $ionicPopup, $state ){
    //Needs to matain current ride status and adjust child views accordingly
    $scope.friends = [];
    $scope.data = {
      number:'',
      showDelete: false
    };

    //TODO find better place to put this
    $scope.addNumber = function(){
      var pop = $ionicPopup.show({
        template: '<input type="tel" ng-model="data.number">',
        title:'Enter Number',
        scope: $scope,
        buttons:[
          {text: 'Cancel'},
          {
            text: 'Add',
            type:'button-positive',
            onTap: function(e){
              if(validNumber($scope.data.number)){
                $scope.friends.push({
                  phoneNumber: $scope.data.number
                });
                $scope.data.number = '';
                pop.close();
              }else{
                e.preventDefault();
              }
            }
          }
        ]
      });
    };

    $scope.addFromContactsList = function(){
      //This will probally need a service or factory
      //associated with it
    };

    $scope.continue = function(){
      //TODO add logic for calling server and creating new ride
      $state.go('tabs.pending_ride')
    };

    //TODO make this better
    function validNumber(num){
      return num.length > 0
    }
  }
]);
