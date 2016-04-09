/**
 *
 * Created by Matthias on 12/4/15.
 */
'use strict';

var app = angular.module(
  ApplicationConfiguration.applicationModuleName,
  ApplicationConfiguration.applicationModuleVendorDependencies
);

app.constant('SERVER','http://localhost:81000/v1');

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    window.location.hash = '#/signin';

    var push = new Ionic.Push({
        "debug":true
    });

    push.register(function(token) {
        // Log out your device token (Save this!)
        console.log("Got Token:",token.token);
    });

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

