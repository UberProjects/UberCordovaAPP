/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('RideHomeController', [
    '$scope',
    '$state',
    'RideRoutes',
    '$cordovaGeolocation',
    'uiGmapGoogleMapApi',
    'Ride',
    function ($scope, $state, RideRoutes, $cordovaGeolocation, uiGmapGoogleMapApi, Ride) {
        //Needs to store current ride state and render proper view
        $scope.startNewRide = function () {
            $state.go('tabs.new_ride')
        };

        $scope.startSavedRide = function () {
            $state.go('tabs.saved_ride')
        };

        $scope.myCenter = {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 8,
            reload: false
        };

        uiGmapGoogleMapApi.then(function(maps){
            $cordovaGeolocation.getCurrentPosition({
                timeout: 1000,
                enableHeightAccracy: false
            }).then(function (position) {
                $scope.mapReload = true;
                $scope.myCenter = {
                    center: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    zoom: 15,
                    reload: true
                };
                Ride.initialRequestorPos = $scope.myCenter;
            });
        });


    }
]);
