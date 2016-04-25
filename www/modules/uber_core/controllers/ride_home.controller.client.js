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
    'uiGmapLogger',
    function ($scope, $state, RideRoutes, $cordovaGeolocation, uiGmapGoogleMapApi, Ride, uiGmapLogger) {
        //Needs to store current ride state and render proper view

        $scope.startNewRide = function () {
            $state.go('tabs.new_ride')
        };

        $scope.startSavedRide = function () {
            $state.go('tabs.saved_ride')
        };

        $scope.myCenter = {
            center: {
                latitude: 40.0132878490935,
                longitude: -105.26357889999997
            },
            zoom: 15,
            reload: false
        };

        Ride.initialRequestorPos = {
            center: {
                latitude: 40.0132878490935,
                longitude: -105.26357889999997
            },
            zoom: 15,
            reload: false
        };

        uiGmapGoogleMapApi.then(function(maps){
            uiGmapLogger.currentLevel = uiGmapLogger.LEVELS.debug;
            console.log('Maps ready');
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('Position: ', position);
                $scope.mapReload = true;
                $scope.myCenter = {
                    center: {
                        latitude: position.coords.latitude ,
                        longitude: position.coords.longitude
                    },
                    zoom: 15,
                    reload: true
                };
                console.log($scope.myCenter);
                Ride.initialRequestorPos = $scope.myCenter;
            }, function(err){
                console.log(err);
            },{ maximumAge: 3000, timeout: 15000, enableHighAccuracy: true });
        });


    }
]);
