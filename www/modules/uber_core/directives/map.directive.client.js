/**
 * makesure there is a two way binding
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').directive('map', function () {
  return {
    template: '<div style="height: 400px; width: 100%" id="map"></div>',
    replace: true,
    scope:{
      position:'=',
      zoomlevel:'=',
      id:'=',
      callback:'='
    },
    controller: ['$scope', 'Maps', '$cordovaGeolocation', '$element', function ($scope, Maps, $cordovaGeolocation) {

      var id = ($scope.id) ? $scope.id : 'map';
        //the id of the dom object to bind the map to
      var zoomLevel = ($scope.zoomlevel) ? $scope.zoomlevel : 16;
        //The zoom level of the map larger is more zoomed in
      var currentPosition = $scope.position;
        //stores the position to be passed to the callback

      /*
          Determine if the position to render was provided
          or must be acquired through cordova
       */
      if($scope.position){

        Maps.genMap({
          position: currentPosition,
          zoomLevel: zoomLevel
        }, document.getElementById(id), mapCb);

      }else{

        $cordovaGeolocation.getCurrentPosition({
          timeout:1000,
          enableHeightAccuracy:false
        }).then(function(position){
          currentPosition = position;
          Maps.genMap({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            zoomLevel: zoomLevel
          }, document.getElementById(id), mapCb);
        });

      }

      /*
        Once the google maps js is loaded and the position is
        acquired pass off the map to the required controller for additional
        map settings
       */
      function mapCb(err, map){
        $scope.map = map;

        if( $scope.callback){
          $scope.callback(err, map, currentPosition);
        }
      }

    }]
  };
});
