/**
 *
 * Created by Matthias on 12/4/15.
 */

angular.module('uber_core').service('RideState',[function(){

  var observerCallbacks = [];
  var state = 'home';

  this.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  this.getState = function(){
    return state;
  };

  this.updateState = function(newState){
    state = newState;
    notifyObservers();
  };

}]);
