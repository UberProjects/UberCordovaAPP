# UberCordovaAPP
Cordova Application for "Uber with friends" using ionic as the ui frame work.

##Application Structure

  - package.json stores information about npm packages and versions
  - bower.json stores information about angular dependencies
  - www (main ui folder)
    - lib: angular front end dependencies
    - application.js entry point for angular kinda like main
    - config.js contains angular configuration i.e Module name and dpes
    - index.html contains app js and css deps and base angular html
    - modules contains application logic broken down into modules
      - uber_core main applicaiton logic and views
        - config contains angular congiruation and routes
          - uber.routes.js angular routes for various components
        - controllers controlls interaction with various views
            - compleated_ride.controller.client.js
            - current_ride.controller.client.js
            - new_ride.controller.client.js
            - pending_ride.controller.client.js
            - profile.controller.client.js
            - ride_history.controller.client.js
            - ride_home.controller.client.js
            - ride_request.controller.client.js
            - saved_ride.controller.client.js
            - uber.controller.js (entry point for module)
        - css additional style information for various components
        - directives (individual compoents not tied to any view)
            - friend_view.directive.client.js
            - home_map.directive.client.js (possibly integrate with map.directive)
            - map.directive.client.js
            - select_list.directive.client.js
        - partials views for the directives
            - friend_list_item.client.html
            - firend_view.client.html
            - home-map.html
            - map.client.html
            - selected_list.client.html
        - services application logic that supports controllers
            - finished_ride.service.client.js
            - friend.service.client.js
            - maps.service.client.js
            - ride_request.client.js
            - ride.service.client.js
            - saved_ride.service.client.js
            - uber.service.client.js
        - views what gets shown in the application
          - compleated_ride.client.view.html
          - current_ride.client.view.html
          - main.client.view.html
          - new_ride.client.view.html
          - pending_ride.client.view.html
          - profile.client.view.html
          - ride_history.client.view.html
          - ride_home.client.view.html
          - ride_request.client.html
          - saved_ride.client.view.html
        - uber.cleint.module.js entry point for module incldues deps
      - users logic for providing user support and authentication
        - config
        - controllers
        - css
        - services
        - views
        user.client.module.js

##Component and application description
General information on what each part of the application is for and what will
need to be completed and what will be required of the back end.

###Uber Core
Main application logic is loaded after successful login in or sign up.
first route called is /main which then loads the first default tab /new_ride.

Each tab contains a subset of views defined in
uber_core/config/uber.routes.client.js

** Note that for tabs to work correctly with ionic routes must be defined in
this manner **

```javascript
/*
  The main application view is a collection of ionic tabs
  there is a main tab view that holds all of the other tabs
  and controlls routeing to each tab

  Each indivudal tab i.e rides must have the sate name tab.my_tab name
  Sub tabs or extra views inside the tab i.e new_ride will transition to pending
  ride must have the same view name i.e all views defined as ride-tab
  will be rendered in that tab in the main application. For a demo run
  the cordova app and try it out.
*/
$stateProvider.state('tabs.your_tab_view',{ //note not indivdual tab
  url:'/angular_route',
  templateUrl: modules/module_name/views/yourView.html,
  controller: 'AngularController' //Note do not use ng-contoller="" in html
}).sate('tabs.individual_tab',{
  url: '/ride_home',
  views:{
    'ride-tab':{
        controller: 'AngularController',
        templateUrl: modules/**/**/view.html
    }
  }//Actual indivual tab that will be shown
}).state('tabs.sub_tab',{
  url: '/route',
  views:{
    'ride-tab':{
      controller: 'AngularController',
      templateUrl: modules/**/**/view.html
    }
  }
});
```
####Uber Core Main
This part of the application will load all the other tabs
and control the transition between them.

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular url defined as /main
    - Controller
      - uber.controller.js loaded on transition
    - Services
      - ride.service.client.js
    - Views
      - main.client.view.html

While ionic can maintain tab history at some point the
ride_state service directive will need to be used to
allow the rides tab to load rides in progress and
ride request from friends.

Note that ionicHistory is cleared before this view is loaded
to prevent navigation back to the login page.

####Ride
A collection of views and controllers that form the ride logic.
From creating a new ride to showing the final results when the ride
is over. This is the heart of the application and could be potentially
made into it's own module.

#####Ride Home
This is the first view that is loaded by default on the ride tab
and will show the option to create a new ride or select a saved one.

Additionally this should show a map with the current users location and
the position of near by uber cars if their api allows it.

Currently there is a individual directive for this map to be rendered on this
screen however a general purpose map directive to be use though out the application
should be created.

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular url defined as /ride_home
    - Controller
      - ride_home.controller.js
    - Directive
      - home_map.directive.client.js (possibly replace with map.directive)
      - map.directive.client.js
    - Services
      - maps.service.client.js
    - Views
      - ride_home.client.view.html

TODO:
  - Fix layout through css
  - Merge home_map with map
  - create a general map directive should take in array of
    objects to create and an option to display a path

#####New Ride
Allows user to select individuals from their contacts list or
manually input users by phone number.

Currently allows users to manually input numbers.
Numbers stored in $scope.data.number

Uses ionicPopup get get number. Ideally this would be its own
service or factory.

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular url defined as /new_ride
    - Controller
      - new_ride.controller.client.js
    - Directives
      - select_list.directive.client.js
      - ride.directive.client.js (Need to create)
    - Services
      - potentially ride.service.client.js
    - Views
      - new_ride.client.view.html

TODO:
  - Fix CSS
  - Show delete button for list item. See example [here](http://ionicframework.com/docs/api/directive/ionList/)
  - Move popup logic to a better location
  - Add support for loading contacts from device
  - Make call to server to create new ride (will require a lot of server work)
  - Create/use ride directive
  - After server creates ride load pending view
  - Create texting abilities to notify friends

#####Saved Ride (No work done)
Allows users to select saved rides they have already taken.

Should reuse select_list directive to show users that you want
to add.

A lot of work for rides will need to be done on the server to support this.

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular url defined as /saved_ride
    - Controller
      - saved_ride.controller.client.js
    - Directives
      - select_list.directive.client.js
    - Services
      - Should make a new one that interacts with ride routes on controller
    - Views
      - saved_ride.client.view.html

TODO:
  - Edit CSS
  - Modify select list directive to support rendering (might be fine as is)
  - Add support for adding contacts from device (Cordova stuff most likely)
  - After server creates ride load pending view (same feature as new_ride)
  - Create/use ride directive
  - Create texting abilities to notify friends

#####Pending Ride
Will show:
  - map of friends who have accepted and current route
  - list of friends and their status
  - Start ride button

A lot of server work will need to be done here to support
push notifications for updating friends status. Allow communication between friends.
Update status for the map. Texting both the friends and the driver. Saving rides.

Note friends list should allow you to click on your friend and bring up a view with
their location, a message box, option to cancel, and status

A friends service or factory should be created to interact with friends routes on
server

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular url defined as /pending_ride_ride
    - Controller
      - pending_ride.controller.client.js
    - Directives
      - friend_view.directive.client.js
      - map.directive.client.js
    - Services
      - friend.service.client.js
      - ride service (TODO)
    - Views
      - pending_ride.cleint.view.html
TODO:
  - Complete view and css
  - Incorporate map directive
  - create friends service to interact with server see angular [resource](https://docs.angularjs.org/api/ngResource/service/$resource)
  - Create texting abilities
  - Create/use ride directive
  - Extensive back end work

#####Current Ride
Will show current ride status. Location of driver and allows for communication with
friends.

Needs to use map.
Needs to support canceling and updating (possible stretch for updating)

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular route /current_ride
    - Controller
      - current_ride.controller.client.js
    - Directives
      - friend_view.directive.client.js
      - map.directive.client.js
    - Services
      - ride service (To create)
      - friends service (To create)
    - Views
      - current_ride.client.view.html
TODO:
 - Complete view and css
 - Incorporate map directive
 - Create/use ride service
 - Incorporate friends service

#####Completed Ride
Will show that the ride was completed and allow requester to
get payment from friends.

Finish button will send user back to new rides.
This ride will now show up in history.
Allow the option to save this ride.

Possibly create a directive to show most of this information
so that it can also be rendered in history.

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular route /completed_ride
    - Controller
      - completed_ride.controller.client.jsdfs
    - Directives
      - friends_view.directive
      - finished_ride (todo)
    - Services
      - Friends service
      - Rides service
    - Views
      - completed_ride.controller.client.js

TODO:
  - Complete view and css
  - Wire up with back end using services
  - On server add rides to payments routes or create different routes

####Profile
Various information about the user and app settings.

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular route: /profile
    - Controller
      - profile.controller.client.js
    - Directives
      - User
    - Services
      - Settings
    - Views
      - profile.client.view.html
TODO:
 - Complete view and css
 - Determine useful cordova settings
 - Integrate with user module to allow for changing password, ect

####History
Shows rides the user has taken and allows them to see info
like current payment status.

Should use finished_ride directive that was can also be used in
the completed ride veiw

Relevant files:
  - uber_core
    - Config
      - uber.routes.js angular route /ride_history
    - Controller
      - ride_history.controller.client.js
    - Directives
      - possible finished_ride directive
    - Services
      - Rides or payments
    - Views
      - ride_history.client.view.html

TODO:
  - Complete view and css
  - Use/ Complete finished_ride directive
  - Integrate with payments
  - Create a directive for displaying a list of rides

###User
Provides views for logging in and setting up accounts.

Relevant files:
  - users:
    - Config
      - users.client.routes.js /signin and signup are the angular routes
    - Controller
      - authentication.client.controller.js provides signin and signup logic
    - Views
      - authentication
        - signin.client.view.html
        - signup.client.view.html

TODO:
  - Allow signin to actually work and only on login redirect to home
  - Wire up signup (server logic should be there already)
  - Complete the README for this section to include all other user features

##General Application information and help
This section will be dedicated to general help on the application
as well as useful links. Feel free to add more info as you learn
more about angular.

###Application info
to run the app simply install ionic npm install -g ionic
and run ionic serve. This will start a server and open
a web page to the application.

**Note any changes made to the application will be live
reloaded on the web page**

**Note that if you create new assets you need to include them
in the index.html file**

###Angular info
ng-book is a good general resource for learning angular concepts.
Ask me and I can point you to a copy.

####Controllers
These control what is presented on the view and can call services to
perform backend calls or other logic.

Helpful links:
[Making a skinny controller](https://scotch.io/tutorials/making-skinny-angularjs-controllers)

General Form:
```javacript
/*
  This is a simple controller for and allows you to interact
  with the scope of your view or directive. To my knolege all
  controllers need the $scope variable to interact with view
  components. Anything scope variable modified on the view
  will be updated in the controller at the same time.
  Because of how ionic works it is best to create all variales
  inside of a object i.e $scope.data. If you wanted a name variable
  do $scope.data = {
      name: ''
  };
*/
angular.module('module_name').controller('ControllerName',[
 '$scope',
 'Service',
 function($scope, Service){
     $scope.data = {};
 }
]);
```

#####Directives
These are used to create reuseable components on the view
and can even contain their own controller. The scopeing with
directives is a little tricky but there are plenty of online
examples of how to create one.

Examples:
[Creating angular Directives](http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-i-the-fundamentals)

#####Routes
Ionic uses angular-ui-router to provide navigation.

This is managed by $state and to transition to a new view
use $state.go('signin'); for example

General Route example:
```javascript
angular.module('module_name').config([
  '$stateProvider',
  '$urlRouteProvider',
  function($stateProvider, $urlRouteProvider){
      $stateProvider.
      state('state_name',{
        url:'/angular_url',
        templateUrl: 'location/to/html',
        controller: 'optional can be incldued in html'
      })
  }
]);
```

###Ionic info
Ionic is our front end ui frame work and is pretty well documented.

Helpful links:
[List of components](http://ionicframework.com/docs/api/)
[Input Types](http://ionicframework.com/html5-input-types/)

