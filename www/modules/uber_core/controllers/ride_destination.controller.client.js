/**
 *
 * Created by Matthias on 4/9/16.
 */

angular.module('uber_core').controller('RideDestination',[
    '$scope',
    'Ride',
    'uiGmapGoogleMapApi',
    function($scope, Ride, uiGmapGoogleMapApi){
        $scope.markerOptions = {
           label:'You are here'
        };
        $scope.mapInit = Ride.initialRequestorPos;
        $scope.options = {scrollwheel: false};
        var events = {
            places_changed: function (searchBox) {
                console.log(searchBox.getPlaces());
            }
        };
        $scope.searchbox = {
            template:'modules/uber_core/partials/google_searchbox.client.html',
            events:events,
            position:'bottom-right',
            parentDiv:'mapSearchBox',
            options:{
               autocomplete:true
            }
        };
    }
]);
