/**
 * Created by Matthias on 12/4/15.
 */
'use strict';

angular.module('users').controller('PasswordController', [
'$scope',
    '$http',
    '$state',
    'Authentication',
    '$ionicHistory',
    'AuthRoutes',
    '$cordovaOauth',
    'SERVER',
    function ($scope, $http, $state) {
    	$scope.changePass = function (){
    		$state.go('forgot')
    	}
    }
]);