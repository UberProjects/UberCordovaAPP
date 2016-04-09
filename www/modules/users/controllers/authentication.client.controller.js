/**
 *
 * Created by Matthias on 12/4/15.
 */

'use strict';

angular.module('users').controller('AuthenticationController', [
    '$scope',
    '$http',
    '$state',
    'Authentication',
    '$ionicHistory',
    'AuthRoutes',
    '$cordovaOauth',
    'SERVER',
    function ($scope, $http, $state, Authentication, $ionicHistory, AuthRoutes, $cordovaOauth, SERVER) {
        $scope.authentication = Authentication;

        $scope.credentials = {};

        if (Authentication.user != null) $state.go('tabs');

        $scope.signup = function () {
            $state.go('signup');
            //redirect to sign up view
        };

        $scope.finishSignup = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: false
            });

            $cordovaOauth.uber('F23Rp_lYXaXkZr_XLFbghHRlNh92ILKk', ['profile']).then(function (result) {
                $scope.credentials.uber_access = result;

                window.push_token_promise.then(function(token){
                    $scope.credentials.push_token = token;
                });
                AuthRoutes.signup($scope.credentials).then(function (res) {
                    window.localStorage['user'] = response;
                    $state.go('tabs');
                },function(err){
                    $scope.error = 'Error: ' + JSON.stringify(err);
                });
            }, function(err){
                $scope.error = 'Error: ' + JSON.stringify(err);
            });

        };


        //TODO determine if extra steps needed to store on device
        $scope.signin = function () {

            $http.post(SERVER + '/auth/signin', $scope.credentials).then(function (response) {
                window.localStorage['user'] = response;
                $scope.authentication.user = response;

                window.push_token_promise.then(function(token){
                    $http.put(SERVER + '/users/update_push_token', {push_token:token}).then(function(response){
                        console.log(response);
                    }, function(err){
                        console.log(err);
                    });
                    //Must always update when running on dev devices
                });

                $state.go('tabs');
                //redirect to main application view
            },function (res) {
                $scope.error = res.message;
            });
        };

    }
]);
