/**
 * TODO find a better place to store the user object
 * Normally the server embeds this stuff
 * Created by Matthias on 12/4/15.
 */

angular.module('users').factory('Authentication',[
  function(){


    var _this = this;

    _this._data = {
      user: window.localStorage['user']
    };

    return _this._data;
  }
]);
