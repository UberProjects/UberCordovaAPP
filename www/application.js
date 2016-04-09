/**
 *
 * Created by Matthias on 12/4/15.
 */
'use strict';

var app = angular.module(
    ApplicationConfiguration.applicationModuleName,
    ApplicationConfiguration.applicationModuleVendorDependencies
);

app.constant('SERVER','http://localhost:8100/v1');

app.run(function($ionicPlatform, $q) {
  $ionicPlatform.ready(function() {

    window.location.hash = '#/signin';

    window.push_data_cb = [];
        //Horrible horrible hack
    var push = new Ionic.Push({
        "debug":true,
        "onNotification": function(data){
            for( var i in window.push_data_cb ){
                window.push_data_cb[i](data);
            }
        }
    });

    var tokenDef = $q.defer();
    push.register(function(token) {
       tokenDef.resolve(token);
    });

    window.push_token_promise = tokenDef.promise;

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

});

