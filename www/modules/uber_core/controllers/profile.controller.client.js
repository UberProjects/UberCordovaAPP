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
      //TODO move all signout logic to one place and should wipe all app data
      $scope.signout = function(){
          console.log('running');
           AuthRoutes.signout().then(function(res){
              Authentication.user = null;
              localStorage['user'] = null;
              $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: false
              });
              $state.go('signin');
          });
      };
  }
]);
