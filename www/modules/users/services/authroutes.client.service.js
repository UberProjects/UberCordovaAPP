/**
 *
 * Created by Matthias on 2/3/16.
 */

angular.module('users').factory('AuthRoutes',['$http','SERVER', function($http, SERVER){
  return {
    signup: function(userInfo){
      return $http.post(SERVER + '/auth/signup', userInfo)
    },
    signin: function(userLoginInfo){
      return $http.post(SERVER + '/auth/signin', userLoginInfo).then(function(result){
        return result.data;
      })
    },
    singout: function(){
      return $http.get(SERVER + '/auth/signout').then(function(result){
        return result.data;
      })
    }
  };
}]);
