/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('users').factory('Users',['$resource',
  function($resource){
    return $resource('users', {},{
      update:{
        method: 'PUT'
      }
    });
  }
]);
