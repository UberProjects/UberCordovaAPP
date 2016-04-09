/**
 * TODO find a better place to store the user object
 * Normally the server embeds this stuff
 * Created by Matthias on 12/4/15.
 */

angular.module('users').factory('Authentication',[
  function(){

    var _this = this;
    var user_data = null;
    if (window.localStorage['user']) {
        user_data = JSON.parse(window.localStorage['user']);
    }

    _this._data = {
      user: user_data
    };

    return _this._data;
  }
]);
