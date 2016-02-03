/**
 *
 * Created by Matthias on 2/3/16.
 */

angular.module('users').factory('AuthRoutes',['$http', function($http){
  return {
    signup: function(userInfo){
      return $http.post('/v1/auth/signup', userInfo).then(function(result){
        return result.data;
      })
    },
    signin: function(userLoginInfo){
      return $http.post('/v1/auth/signin', userLoginInfo).then(function(result){
        return result.data;
      })
    },
    singout: function(){
      return $http.get('/v1/auth/signout').then(function(result){
        return result.data;
      })
    }
  };
}]);
