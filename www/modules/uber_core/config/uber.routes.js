/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
      var dirRoot = 'modules/uber_core/views/';

      $stateProvider.state('tabs', {
          url: '/main',
          templateUrl: dirRoot + 'main.client.view.html',
          controller: 'UberController'
      }).state('tabs.ride_home', {
          url: '/ride_home',
          views: {
              'ride-tab': {
                  controller: 'RideHomeController',
                  templateUrl: dirRoot + 'ride_home.client.view.html'
              }
          }
      }).state('tabs.new_ride', {
          url: '/new_ride',
          views: {
              'ride-tab': {
                  controller: 'NewRideController',
                  templateUrl: dirRoot + 'new_ride.client.view.html'
              }
          }
      }).state('tabs.ride_destination', {
          url: '/ride_destination',
          views: {
              'ride-tab': {
                  controller: 'RideDestination',
                  templateUrl: dirRoot + 'ride_destination.client.view.html'
              }
          }
      }).state('tabs.current_ride', {
          url: '/current_ride',
          views: {
              'ride-tab': {
                  templateUrl: dirRoot + 'current_ride.client.view.html',
                  controller: 'CurrentRideController'
              }
          }
      }).state('tabs.pending_ride', {
          url: '/pending_ride_ride',
          views: {
              'ride-tab': {
                  templateUrl: dirRoot + 'pending_ride.client.view.html',
                  controller: 'PendingRideController'
              }
          }
      }).state('tabs.ride_final', {
          url: '/ride_final',
          views: {
              'ride-tab': {
                  templateUrl: dirRoot + 'ride_final.client.view.html',
                  controller: 'RideFinalController'
              }
          }
      }).state('tabs.saved_ride', {
          url: '/saved_ride',
          views: {
              'ride-tab': {
                  templateUrl: dirRoot + 'saved_ride.client.view.html',
                  controller: 'SavedRideController'
              }
          }
      }).state('tabs.completed_ride', {
          url: '/completed_ride',
          views: {
              'ride-tab': {
                  templateUrl: dirRoot + 'completed_ride.client.view.html',
                  controller: 'CompletedRideController'
              }
          }
      }).state('tabs.ride_history', {
          url: '/ride_history',
          views: {
              'history-tab': {
                  templateUrl: dirRoot + 'ride_history.client.view.html',
                  controller: 'RideHistoryController'
              }
          }
      }).state('tabs.profile', {
          url: '/profile',
          views: {
              'profile-tab': {
                  templateUrl: dirRoot + 'profile.client.view.html',
                  controller: 'ProfileController'
              }
          }
      }).state('tabs.test_uber', {
          url: '/test_uber',
          views: {
              'ride-tab': {
                  templateUrl: dirRoot + 'test_uber.client.view.html',
                  controller: 'TestUberController'
              }
          }
      }).state('tabs.aboutus',{
            url:'/aboutus',
            views: {
                'profile-tab': {
                    templateUrl: dirRoot + 'aboutus.html',
                    controller: 'ProfileController'
                }
            }
        })
  }
]);


