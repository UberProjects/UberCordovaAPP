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
   function($scope, $http, $state, Authentication, $ionicHistory){
      $scope.authentication = Authentication;

      if( $scope.authentication.user) $state.go('');

      $scope.signup = function(){
         $state.go('signup');
         //redirect to sign up view
      };

      $scope.finishSignup = function(){
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: false
        });

        $state.go('tabs');
      };

      $scope.goToSignin= function(){
        $state.go('signin');
      };

      //TODO determine if extra steps needed to store on device
      $scope.signin = function(){
         $http.post('/v1/auth/signin', $scope.credentials).success(function(response){
            window.localStorage['user'] = response;

            $scope.authentication.user = response;

            $state.go('tabs');
             //redirect to main application view
         });
      };
  }
]);
