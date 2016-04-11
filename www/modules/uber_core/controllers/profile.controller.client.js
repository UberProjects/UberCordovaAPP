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
      $scope.authentication = Authentication;

      $scope.credentials = {};

      if (Authentication.user != null) $state.go('tabs');

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
          }, function(err){
               console.log(err);
          });
      };

      //TODO: finish about us and yourprofile tabs!!
      $scope.aboutus = function(){
        $state.go('aboutus');
      };

      $scope.userinfo = function(){
        $("div.userinfocontainer").html("<p>$scope.authentication.user</p>");
      };
  }
]);
