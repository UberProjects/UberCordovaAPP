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
        console.log(Authentication.user);
        if (Authentication.user != null) {
            $state.go('tabs');
        }

        $scope.signup = function () {
            $state.go('signup');
            //redirect to sign up view
        };

        $scope.finishSignup = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: false
            });

            var redirect_uri = 'http://localhost/callback';
            var client_id = 'F23Rp_lYXaXkZr_XLFbghHRlNh92ILKk';

            var browserRef = window.cordova.InAppBrowser.open('https://login.uber.com/oauth/authorize?client_id=' +
                client_id + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=request', '_blank',
                'location=no,clearsessioncache=yes,clearcache=yes');

            browserRef.addEventListener('loadstart', function(event) {
                if((event.url).indexOf(redirect_uri) === 0) {
                    browserRef.removeEventListener('exit', function(event) {});
                    browserRef.close();
                    var responseParameters = event.url.split(/[?#]/)[1];
                    $scope.credentials.uber_access = {authorization_code: responseParameters.split('=')[1]};

                    AuthRoutes.signup($scope.credentials).then(function (response) {
                        window.localStorage['user'] = JSON.stringify(response);
                        $state.go('tabs');
                    }, function (err) {
                        $scope.error = 'Error: ' + JSON.stringify(err);
                    });
                }
            });


            /*$cordovaOauth.uber('F23Rp_lYXaXkZr_XLFbghHRlNh92ILKk', ['profile']).then(function (result) {
                $scope.credentials.uber_access = result;
                AuthRoutes.signup($scope.credentials).then(function (res) {
                    window.localStorage['user'] = response;
                    $state.go('tabs');
                },function(err){
                    console.log('FIRST ERROR');
                    $scope.error = 'Error: ' + JSON.stringify(err);
                    console.log($scope.error);
                });
            }, function(err){
                console.log('SECOND ERROR');
                $scope.error = 'Error: ' + JSON.stringify(err);
                console.log($scope.error);
            });*/

        };


        //TODO determine if extra steps needed to store on device
        $scope.signin = function () {
            $http.post(SERVER + '/auth/signin', $scope.credentials).success(function (response) {
                console.log(response);
                window.localStorage['user'] = JSON.stringify(response);
                $scope.authentication.user = response;

                $state.go('tabs');
                //redirect to main application view
            }).error(function (res) {
                $scope.error = res.message;
            });
        };

    }
]);
