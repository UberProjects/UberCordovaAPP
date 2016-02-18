/**
 *
 * Created by Matthias on 2/17/16.
 */

angular.module('uber_core').factory('FriendsContact', [
    '$ionicPopup',
    'RideRoutes',
    '$q',
    function ($ionicPopup, RideRoutes, $q) {

    function validateUser(){

    }

    return function ($scope) {
        $scope.popup = {
            input : ''
        };

        var friendsList = [];
        var listeners = [];

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
                                name:'',
                                phoneNumber:''
                            });
                            update();
                            pop.close();
                            e.preventDefault();
                        }
                    }
                ]
            });
        };

        this.addFriendsListener = function(cb){
            listeners.push(cb);
        };

        function update(){
            for(var i in listeners){
                listeners[i](friendsList);
            }
        }

        function getStatus(friend){
            var newFriend = friend;
            friendsList.push(newFriend);
            update();

            RideRoutes.checkFriend(friend).then(function(res){
               var data = res.data.message;
               if(data.status == 'KNOWN'){
                   newFriend.status = 'Current Member';
                   newFriend.name = data.name;
                   newFriend.phoneNumber = data.phoneNumber;
               }else if(data.status == 'UNKNOWN'){
                   newFriend.status = 'Unknown User';
               }else{
                   newFriend.status = data.status;
               }
               update();
            }, function(err){
               console.log(err);
            })
        }

    };
}]);
