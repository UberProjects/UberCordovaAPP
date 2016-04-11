/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').controller('PendingRideController', [
    '$scope',
    '$cordovaGeolocation',
    'Ride',
    'RideRoutes',
    function ($scope, $cordovaGeolocation, Ride, RideRoutes) {

        $scope.data = {};

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
        };

        $scope.startRide = function(product_id) {
            console.log(product_id);
        };

        $scope.getEstimates();
    }
]);
