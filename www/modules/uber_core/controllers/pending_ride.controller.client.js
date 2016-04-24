/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('PendingRideController', [
    '$scope',
    '$state',
    '$cordovaGeolocation',
    'Ride',
    'RideRoutes',
    function ($scope, $state, $cordovaGeolocation, Ride, RideRoutes) {

        $scope.data = {};

        $scope.joineded_friends = Ride.getCurrentRide();

        $scope.getEstimates = function() {
            var start_pos = {
                'lat': 39.7392360,
                'long': -104.9902510
            };

            var end_pos = {
                'lat': 40.0149860,
                'long': -105.2705460
            };

            RideRoutes.getEstimatedPrice(start_pos, end_pos).then(function (res) {
                console.log(res.data.message);
                $scope.data.rideEstimates = res.data.message.prices;
            });
            console.log('TEST');
            console.log(Ride.getCurrentRide());
        };

        $scope.startRide = function(product_id) {
            console.log(product_id);
            console.log(Ride.getCurrentRide());
            $scope.joined_friends = Ride.getCurrentRide();
            RideRoutes.startRide($scope.joined_friends, product_id).then(function (res) {
                console.log(res.data.message);
                Ride.setCurrentRide(res.data.message.ride_data);
                $state.go('tabs.ride_final');
            });
        };

        $scope.getEstimates();

        //var watchOptions = {
        //    timeout : 3000,
        //    enableHighAccuracy: false // may cause errors if true
        //};
        //
        //var watch = $cordovaGeolocation.watchPosition(watchOptions);
        //watch.then(
        //    null,
        //    function(err) {
        //        // error
        //    },
        //    function(position) {
        //        var lat  = position.coords.latitude;
        //        var long = position.coords.longitude;
        //        console.log(lat);
        //        console.log(long);
        //    });
    }
]);
