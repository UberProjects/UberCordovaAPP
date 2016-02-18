/**
 *
 * Created by Matthias on 2/10/16.
 * Provides access to clients socket id and handles socket messages
 */

angular.module('uber_core').factory('Notifications',[
    'socketFactory',
    '$window',
    '$cordovaGeolocation',
    'SERVER',
    '$q',
    function(socketFactory, $window, $cordovaGeolocation, SERVER, $q){

        var myIoSocket = $window.io('http://localhost:3000');

        var socket = socketFactory({
            ioSocket: myIoSocket
        });

        var socketDef = $q.defer();

        socket.on('socket_id', function(res){
            socketDef.resolve(res);
        });

        function socketInit(type){
            return function(cb){
                socket.on(type, cb);
            }
        }

        return {
            chatMessage: socketInit('chat_message'),
            friendsStatus: socketInit('friends_status'),
            newConnectionInfo: socketDef.promise
        }

}]);
