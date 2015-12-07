/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('users').config(['$stateProvider', function($stateProvider){
  var dirRoot = 'modules/users/views/';
  $stateProvider.
  state('profile',{
    url:'/settings/profile',
    templateUrl: dirRoot + 'settings/edit-profile.client.view.html'
  }).
  state('passwords',{
    url:'/settings/password',
    templateUrl: dirRoot + 'settings/change-password.client.view.html'
  }).
  state('accounts',{
    url:'/settings/accounts',
    templateUrl: dirRoot + 'settings/social-accounts.client.view.html'
  }).
  state('signin',{
    url:'/signin',
    templateUrl: dirRoot + 'authentication/signin.client.view.html'
  }).
  state('signup',{
    url:'/signup',
    templateUrl: dirRoot + 'authentication/signup.client.view.html'
  }).
  state('forgot',{
    url:'/password/forgot',
    templateUrl: dirRoot + 'password/forgot-password.client.view.html'
  }).
  state('reset-invalid',{
    url:'/password/reset/invalid',
    templateUrl: dirRoot + 'password/reset-password-invalid.client.view.html'
  }).
  state('reset-success',{
    url:'/password/reset/success',
    templateUrl: dirRoot + 'password/reset-password-success.client.view.html'
  }).
  state('reset',{
    url:'/password/reset/:token',
    templateUrl: dirRoot + 'password/reset-password.client.view.html'
  })
}]);
