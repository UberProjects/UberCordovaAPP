/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').service('Maps', [ '$window', '$q', function($window, $q){
  var googleUrl = 'https://maps.googleapis.com/maps/api/js?' +
                  'key=AIzaSyC54BQZh1ODmeqbMXZ8NvuNTmiVymBz0oE&callback=',
      mapsDefer = $q.defer();

  $window.googleMapsInit = mapsDefer.resolve;

  var asyncLoad = function(asyncUrl, callbackName){
    var script = document.createElement('script');
    script.src = asyncUrl + callbackName;
    document.body.appendChild(script);
  };

  asyncLoad(googleUrl, 'googleMapsInit');

  this.genMap = function(settings, element, cb){
    mapsDefer.promise.then(function(){

      var map = new google.maps.Map(element, {
        center: settings.position,
        zoom: settings.zoomLevel
      });

      cb(null, map);

    });
  };

}]);
