/**
 * Created by irakli on 4/21/16.
 */

angular.module('uber_core').controller('RideFinalController', [
    '$scope',
    '$cordovaGeolocation',
    'Ride',
    'RideRoutes',
    function ($scope, $cordovaGeolocation, Ride, RideRoutes) {

        $scope.data = {};

        $scope.joineded_friends = Ride.getCurrentRide();

        $scope.watchPosition = function () {
            var currentRide = Ride.getCurrentRide();

            var nextFriend = currentRide.ride_users.filter(function (friend) {
                return friend.status == 'next';
            })[0];

            //about 500 ft
            var latPadding = nextFriend.location.lat/36400 * 3;

            //about 500 ft
            var lngPadding = nextFriend.location.lng/28820;

            var watchOptions = {
                timeout : 8000,
                enableHighAccuracy: false // may cause errors if true
            };

            var watch = $cordovaGeolocation.watchPosition(watchOptions);
            watch.then(
                null,
                function(err) {
                    console.log(err);
                },
                function(position) {
                    var lat  = position.coords.latitude;
                    var long = position.coords.longitude;
                    if (nextFriend.location.lat + latPadding > lat && nextFriend.location.lat - latPadding < lat &&
                        nextFriend.location.lng + lngPadding > long && nextFriend.location.lng - lngPadding < long) {
                        RideRoutes.updateRide(currentRide).then(function (res) {
                            // Need to show the progress here
                            console.log(res.data.message);
                        })
                    }
                    console.log(lat);
                    console.log(long);
                });
        };

        $scope.watchPosition();

    }
]);
