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
                    window.push_token_promise.then(function(token){
                        $scope.credentials.push_token = token;
                    });
                    AuthRoutes.signup($scope.credentials).then(function (response) {
                        window.localStorage['user'] = JSON.stringify(response);
                        $state.go('tabs');
                    }, function (err) {
                        $scope.error = 'Error: ' + JSON.stringify(err);
                    });
                }
            });


        };


        //TODO determine if extra steps needed to store on device
        $scope.signin = function () {

            $http.post(SERVER + '/auth/signin', $scope.credentials).success(function (response) {
                console.log(response);
                window.localStorage['user'] = JSON.stringify(response);
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
