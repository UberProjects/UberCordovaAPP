/**
 *
 * Created by Matthias on 12/4/15.
 */

'use strict';

angular.module('users').controller('AuthenticationController',[
  '$scope',
  '$http',
  '$state',
  'Authentication',
  '$ionicHistory',
  'AuthRoutes',
   function($scope, $http, $state, Authentication, $ionicHistory, AuthRoutes){
      $scope.authentication = Authentication;

      $scope.credentials = {};

      if( $scope.authentication.user) $state.go('tabs');

      $scope.signup = function(){
         $state.go('signup');
         //redirect to sign up view
      };

      $scope.finishSignup = function(){
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: false
        });

        AuthRoutes.signup($scope.credentials).then(function(res){
           $state.go('signin');
        }).error(function(err){
            $scope.error = err.message;
        });

      };

      $scope.goToSignin= function(){
        $state.go('signin');
      };

      //TODO determine if extra steps needed to store on device
      $scope.signin = function(){
         $http.post('/v1/auth/signin', $scope.credentials).success(function(response){
             console.log(response);
            window.localStorage['user'] = response;

            $scope.authentication.user = response;

            $state.go('tabs');
             //redirect to main application view
         }).error(function(res){
             $scope.error = res.message;
         });
      };
  }
]);
