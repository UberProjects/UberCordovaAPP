/**
 *
 * Created by Matthias on 4/24/16.
 */

angular.module('uber_core').directive('rideStateMap', ['Ride', 'uiGmapGoogleMapApi', 'uiGmapLogger', 'Authentication', function (Ride, uiGmapGoogleMapApi, uiGmapLogger, Authentication) {
    return {
        templateUrl: 'modules/uber_core/partials/ride_map.html',
        link: function ($scope) {

            uiGmapGoogleMapApi.then(function (maps) {

                uiGmapLogger.currentLevel = uiGmapLogger.LEVELS.debug;
                $scope.markerControl = {};
                $scope.mapInit = Ride.initialRequestorPos;

                $scope.options = {scrollwheel: false};
                $scope.mapOptions = {};

                $scope.markersConfig = {
                    models: [{
                        id: Authentication.user._id,
                        location: {
                            latitude: Ride.initialRequestorPos.center.latitude,
                            longitude: Ride.initialRequestorPos.center.longitude
                        },
                        title: 'You Are Here',
                        icon: 'https://maps.google.com/mapfiles/ms/icons/blue.png'
                    }],
                    fit: true,
                    dorebuildAll: true,
                    markerControl: {}
                };

                console.log($scope.markersConfig);


                Ride.addListener(function (updatedRide) {
                    if (Object.keys(updatedRide).length != 0) {
                        var markers = [];
                        updatedRide.ride_users.forEach(function (user) {
                            var icon = 'https://maps.google.com/mapfiles/ms/icons/';
                            switch (user.status) {
                                case 'waiting':
                                    icon += 'red.png';
                                    break;
                                case 'next':
                                    icon += 'yellow.png';
                                    break;
                                case 'picked_up':
                                    icon += 'green.png';
                                    break;
                                default:
                                    icon += 'caution.png';
                                    break;
                            }

                            markers.push({
                                id: user.user_id,
                                location: {
                                    latitude: user.location.lat,
                                    longitude: user.location.lng
                                },
                                title: user.phone,
                                icon: icon
                            });

                        });

                        markers.push({
                            id: 'destination',
                            location: {
                                latitude: updatedRide.destination.lat,
                                longitude: updatedRide.destination.lng
                            },
                            title: 'Destination',
                            icon: 'https://maps.google.com/mapfiles/ms/icons/arrow.png'
                        });
                        markers.push({
                            id: 'start',
                            location: {
                                latitude: updatedRide.start_location.lat,
                                longitude: updatedRide.start_location.lng
                            },
                            title: 'start',
                            icon: 'https://maps.google.com/mapfiles/ms/icons/blue.png'
                        });
                        $scope.markersConfig.models = markers;
                        //console.log('Marker Controll');
                        //console.log($scope.markersConfig.markerControl);
                        //$scope.markerControl.updateModels($scope.markersConfig.models);
                    }
                });

            });

        }
    }
}]);
