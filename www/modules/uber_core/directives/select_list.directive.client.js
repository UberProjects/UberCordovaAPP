/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').directive('selectList', function(){
  return {
    scope:{
      friends: '='
    },
    templateUrl:'modules/uber_core/partials/select_list.client.html'
  };
});
