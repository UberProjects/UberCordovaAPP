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
                AuthRoutes.signup($scope.credentials).success(function (res) {
                    //TODO just save the user and redirect to tabs sigin for testing in ios
                    $state.go('signin');
                }).error(function(err){
                    $scope.err = 'Error' + JSON.stringify(err);
                });
            });

        };


        //TODO determine if extra steps needed to store on device
        $scope.signin = function () {
            $http.post(SERVER + '/auth/signin', $scope.credentials).success(function (response) {
                window.localStorage['user'] = response;

                $scope.authentication.user = response;

                $state.go('tabs');
                //redirect to main application view
            }).error(function (res) {
                $scope.error = res.message;
            });
        };

    }
]);
