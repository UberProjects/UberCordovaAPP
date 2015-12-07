/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('users').config(['$httpProvider',
  function($httpProvider){
    $httpProvider.interceptors.push(['$q','$location', 'Authentication',
      function($q, $location, Authentication){
        return{
          responseError: function(rejection){
            switch( rejection.status ){
              case 401:
                    Authentication.user = null;
                    $location.path('signin');
                    break;
              case 403:
                    break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);
