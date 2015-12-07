/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').directive('homeMap', function(){
  return {
    templateUrl:'modules/uber_core/partials/home-map.html',
    controller: ['$scope', '$window', '$q', '$ionicLoading', '$compile', function($scope, $window, $q){
      function getPosition() {
        var deferred = $q.defer();
        $window.navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position);
          $scope.$apply(function() {
            deferred.resolve({
              latitude : position.coords.latitude,
              longitude : position.coords.longitude,
              accuracy  : position.coords.accuracy
            });
          })
        }, function(error) {
          deferred.reject(error);

        });
        return deferred.promise;
      }

      //TODO refactor
      getPosition().then(function(res){
        function initialize() {
          var myLatlng = new google.maps.LatLng(res.latitude,res.longitude);

          var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById("homeMap"),
            mapOptions);

          //Marker + infowindow + angularjs compiled ng-click
          var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
          var compiled = $compile(contentString)($scope);

          var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });

          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });

          $scope.map = map;
          console.log('Google working');
        }

        window.google.maps.event.addDomListener(window, 'load', initialize);


      });
    }]
  };
});
