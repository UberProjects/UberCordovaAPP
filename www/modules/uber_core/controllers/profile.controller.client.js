/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('ProfileController',[
  '$scope',
  'AuthRoutes',
  '$state',
  'Authentication',
  '$ionicHistory',
  function($scope, AuthRoutes, $state, Authentication, $ionicHistory){
      $scope.signout = function(){
          console.log('running');
           AuthRoutes.singout().then(function(res){
              Authentication.user = null;
              $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: false
              });
              $state.go('signin');
          });
      };
  }
]);
