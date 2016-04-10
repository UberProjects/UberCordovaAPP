/**
 *
 * Created by Matthias on 2/17/16.
 * TODO add a way to send request to friend to download app / make temp apps
 */

angular.module('uber_core').factory('FriendsContact', [
    '$ionicPopup',
    'RideRoutes',
    '$q',
    '$window',
    'Ride',
    function ($ionicPopup, RideRoutes, $q, $window, Ride) {

        return function ($scope) {

            $scope.popup = {
                input: ''
            };

            var friendsList = [];
            var listeners = [];

            var searchList = [];
            var searchListeners = [];

            this.contactInput = function () {
                var pop = $ionicPopup.show({
                    template: '<input type="text" ng-model="popup.input">',
                    title: 'Enter Number or User Name',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: 'Add',
                            type: 'button-positive',
                            onTap: function (e) {
                                getStatus({
                                    id: $scope.popup.input,
                                    status: 'Searching...',
                                    name: '',
                                    phoneNumber: '',
                                    inDb: false
                                });
                                update();
                                pop.close();
                                e.preventDefault();
                            }
                        }
                    ]
                });
            };

            this.removeFromRide = function(friend){
                var index = friendsList.indexOf(friend);
                if (index > -1) {
                    friendsList.splice(index, 1);
                }
                update();
            };

            this.addToRide = function(friend){
                getStatus(friend);
            };

            this.searchForFriend = function(searchTerm){

                clearSearchList();

                // find all contacts with 'searchTerm' in any name field
                var options      = new ContactFindOptions();
                options.filter   = searchTerm;
                options.multiple = true;
                options.hasPhoneNumber = true;
                var fields       = ["displayName", "name", "nickname", "phoneNumbers"];

                navigator.contacts.find(fields, gotContacts, errorHandler, options);

                function errorHandler(e) {
                    e.preventDefault();
                    console.log("errorHandler: "+e);
                }

                function gotContacts(c) {
                    for (var i = 0, len = c.length; i < len; i++) {

                        console.dir(c[i]);
                        console.log('Number' + c[i].phoneNumbers[0].value);
                        var newFriend = {
                            id: c[i].id,
                            status: 'Searching...',
                            name: c[i].name.formatted,
                            phoneNumber: c[i].phoneNumbers[0].value,
                            inDd: false
                        };
                        searchList.push(newFriend);
                        updateSearchList();
                    }
                }
            };

            this.addFriendsListener = function (cb) {
                listeners.push(cb);
            };

            this.searchListener = function (cb) {
                searchListeners.push(cb);
            };

            function update() {
                for (var i in listeners) {
                    listeners[i](friendsList);
                }
            }

            function updateSearchList() {
                for (var i in searchListeners) {
                    searchListeners[i](searchList);
                }
            }

            function clearSearchList() {
                searchList = [];
            }

            function getStatus(friend) {
                var newFriend = friend;
                friendsList.push(newFriend);
                update();

                RideRoutes.checkFriend(friend).then(function (res) {
                    var data = res.data.message;
                    if (data.status == 'KNOWN') {
                        newFriend.status = 'Current Member';
                        newFriend.name = data.name;
                        newFriend.id = data.id;
                        newFriend.phoneNumber = data.phoneNumber;
                        newFriend.inDb = true;
                    } else if (data.status == 'UNKNOWN') {
                        newFriend.status = 'Unknown User';
                        newFriend.inDb = false;
                    } else {
                        newFriend.status = data.status;
                    }
                    update();
                }, function (err) {
                    console.log(err);
                })
            }

            this.initRide = function(){

                var inDb = [];
                friendsList.forEach(function(f){
                   if(f.inDb) inDb.push(f);
                });

                if( inDb.length > 0 ){
                   Ride.rideFriends = inDb;
                } else {
                   //TODO warn user
                }
            }
        };
    }]);
