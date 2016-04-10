/**
 *
 * Created by Matthias on 4/9/16.
 */

angular.module('uber_core').controller('RideDestination',[
    '$scope',
    'Ride',
    'uiGmapGoogleMapApi',
    '$state',
    function($scope, Ride, uiGmapGoogleMapApi, $state){

        $scope.markerOptions = {

           label:'You are here'
        };

        $scope.mapInit = Ride.initialRequestorPos;
        $scope.options = {scrollwheel: false};

        var events = {
            places_changed: function (searchBox) {
                var places = searchBox.getPlaces();
                if( places.length == 1 ){
                     if( ! Ride.setRideDestination(places[0])){
                         //TODO render error
                         console.log('No geo coords found');
                     }
                } else if(places.length != 1){
                    console.log('No places found??');
                    //TODO render error
                }
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

        $scope.continue = function(){
            Ride.initRide();
            $state.go('tabs.pending_ride');
        }
    }
]);
