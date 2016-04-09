/**
 *
 * Created by Irakli on 2/23/16.
 */

angular.module('uber_core').controller('TestUberController', [
    '$scope',
    'RideState',
    '$state',
    'RideRoutes',
    'Authentication',
    function($scope, RideState, $state, RideRoutes, Authentication){
        $scope.authentication = Authentication;

        $scope.testUber = function(){
            console.log($scope.authentication.user);
            var coordinates = {
                'latitude': 37.775818,
                'longitude': -122.418028,
            };
            RideRoutes.getProducts(coordinates).then(function (res) {
                console.log(res.data.message);
                console.log('PRODUCT BY ID BEFORE');
                RideRoutes.getProduct(res.data.message.products[0].product_id).then(function(res2) {
                    console.log('PRODUCT BY ID');
                    console.log(res2.data.message);
                });
                console.log('PRODUCT BY ID AFTER');
            });
            console.log('TEST WAS CALLED');
        };

        $scope.getEstimate = function() {
            var start_pos = {
                'lat': 39.7392360,
                'long': -104.9902510
            };

            var end_pos = {
                'lat': 40.0149860,
                'long': -105.2705460
            };
            console.log('ESTIMATE WAS CALLED');

            RideRoutes.getEstimatedPrice(start_pos, end_pos).then(function (res) {
                var product_id = res.data.message.prices[0].product_id;
                RideRoutes.requestRide(start_pos, end_pos, product_id).then(function (res2) {
                    console.log(res2.data.message);
                    RideRoutes.getRequestedRide(res2.data.message.request_id).then(function (res3) {
                        console.log(res3.data.message);
                    });
                });
                console.log(res.data.message);
            })
        }

    }
]);
