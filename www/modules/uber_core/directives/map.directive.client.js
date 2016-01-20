/**
 * TODO add position array var and ability to generate a route
 * makesure there is a two way binding
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').directive('map', function () {
  return {
    template: '<div style="height: 400px; width: 100%" id="map"></div>',
    replace: true,
    controller: ['$scope', 'Maps', '$cordovaGeolocation', '$element', function ($scope, Maps, $cordovaGeolocation, $element) {

      $cordovaGeolocation.getCurrentPosition({
        timeout: 1000,
        enableHeighAccuracy: false
      }).then(function (position) {

        Maps.genMap({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoomLevel: 16
        }, document.getElementById('map'), function (err, map) {
          $scope.map = map;

          var marker = new google.maps.Marker({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            map: map,
            title: 'You are Here'
          });

          marker.setMap(map);
        });

      });


    }]
  };
});
