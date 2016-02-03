/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('ProfileController',[
  '$scope',
  'AuthRoutes',
  '$state',
  function($scope, AuthRoutes, $state){
      $scope.signout = function(){
          console.log('running');
           AuthRoutes.singout().then(function(res){
              console.log(res);
              $state.go('signin');
          });
      };
  }
]);
