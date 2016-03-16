/**
 *
 * Created by Matthias on 12/4/15.
 */

'use strict';

var ApplicationConfiguration = (function(){

  var applicationModuleName = 'UberWithFriends';

  var applicationModuleVendorDependencies = [
    'ui.router',
    'ngResource',
    'ngCordova',
    'ionic',
    'ngCordovaOauth',
    'btford.socket-io',
    //'jett.ionic.filter.bar'
  ];

  var registerModule = function(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();
