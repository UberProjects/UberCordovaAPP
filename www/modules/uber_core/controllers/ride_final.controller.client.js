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
            console.log('RESTARTED!!!!');
            var currentRide = Ride.getCurrentRide();

            var friendStatus = currentRide.ride_users;

            var nextFriend = currentRide.ride_users.filter(function (friend) {
                return friend.status == 'next';
            });

            var pickedUp = friendStatus.filter(function (friend) {
                return friend.status == 'picked_up';
            });

            $scope.data.displayStatus = {pickedUp: []};
            pickedUp.forEach(function (friend) {
                $scope.data.displayStatus.pickedUp.push(friend)
            });
            console.log($scope.data.displayStatus.pickedUp);

            var nextLocation = null;
            var finalRoute = false;
            if (nextFriend.length != 0) {
                nextLocation = nextFriend[0].location;
                $scope.data.displayStatus.nextLocation = nextFriend[0].phone;
            } else {
                finalRoute = true;
                nextLocation = currentRide.destination;
                $scope.data.displayStatus.nextLocation = 'Final Destination';
            }

            //about 500 ft
            var latPadding = Math.abs(nextLocation.lat/36400 * 3);

            //about 500 ft
            var lngPadding = Math.abs(nextLocation.lng/28820);

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
                    console.log(nextLocation.lat + latPadding + ' > ' + lat + '&&' + (nextLocation.lat - latPadding) + '<' + lat + '&&' +
                    nextLocation.lng + lngPadding + '>' + long + '&&' + (nextLocation.lng - lngPadding) + '<' +long);
                    if (nextLocation.lat + latPadding > lat && nextLocation.lat - latPadding < lat &&
                        nextLocation.lng + lngPadding > long && nextLocation.lng - lngPadding < long) {
                        RideRoutes.updateRide(currentRide).then(function (res) {
                            // Need to show the progress here
                            Ride.setCurrentRide(res.data.message.ride);
                            watch.clearWatch();
                            console.log('Cleared Watch');
                            console.log(finalRoute);
                            if (!finalRoute) {
                                $scope.watchPosition();
                            }
                        })
                    }
                    console.log(lat);
                    console.log(long);
                });
        };

        $scope.watchPosition();

    }
]);
