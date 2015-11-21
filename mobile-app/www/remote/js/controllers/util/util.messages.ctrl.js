angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruMessagesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  '$cordovaKeyboard',
  '$ionicScrollDelegate',
  'Restangular',
  '$ionicHistory',
  '$cordovaStatusbar',
  '$ionicPlatform',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
  $ionicModal, $ionicTabsDelegate, $cordovaProgress,
  $stateParams, $cordovaKeyboard, $ionicScrollDelegate,
  Restangular, $ionicHistory, $cordovaStatusbar, $ionicPlatform, LoadingService) {

    $scope.active_relationship = {search_text:'', new_message:''};

    var initActiveRelationships = function() {
      if ($scope.root.vars.last_active_relationship) {
        $scope.active_relationship = $scope.root.vars.last_active_relationship;
      }
      else if ($scope.user.student_relationships && $scope.user.student_relationships.length) {
        $scope.active_relationship = $scope.user.student_relationships[0];
        $scope.root.vars.last_active_relationship = $scope.active_relationship;
      }
    }

    $scope.student_search = {
      search_text: ''
    }


    initActiveRelationships();


    $scope.sendMessageToServer = function(payload) {

        var callbackSuccess = function($scope, processed_user) {
            $scope.user.active_student_sessions = processed_user.active_student_sessions;
            for (var i = 0; i < processed_user.active_student_sessions.length; i++) {
              if ($scope.session.id === processed_user.active_student_sessions[i].id) {
                var updated_messages = $scope.processMessages(processed_user.active_student_sessions[i].messages);
                updated_messages.sort($scope.sortMessageComparator);
                $scope.messages = updated_messages;
              }
            }
        }

        $scope.user.createObj($scope.user, 'messages', payload, $scope, callbackSuccess);
    }




  }

]);

// ARCHIVE -- do not delete! NEED FOR REFERENCE;

// $scope.sendMessage = function (content) {

    //   // $scope.messages.push({
    //   //   'contents':content,
    //   //   'class': 'you', // Try "fadeInUp" if you don't like bounceInUp.
    //   //   'profile_url': $scope.default_img_one
    //   // })

    //   // $scope.new_message.content = '';


    //   var messagePayload = $scope.getMessagePayload(content);
    //   $scope.sendMessageToServer(messagePayload);

    //   // $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();

    //   messagePayload.message.class = 'item-avatar-right animated fadeInUp';
    //   messagePayload.message.profile_url= $scope.user.profile_url;
    //   messagePayload.message.formatted_time = 'a couple seconds ago';
    //   $scope.new_message.content = '';
    //   $scope.messages.push(messagePayload.message);
    //   // $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
    //   $ionicScrollDelegate.$getByHandle('message-scroll').scrollBy(0, 100, true);
    // }

    // $scope.getMessagePayload = function (content) {
    //   var payload = {
    //     message: {
    //       contents: content,
    //       relationship_id: $scope.session.relationship_id,
    //       receiver_id: $scope.session.guru.id,
    //       sender_id: $scope.user.id,
    //       session_id: $scope.session.id
    //     }
    //   }
    //   return payload;
    // }

    // $scope.getMessagesFromServer = function(time_between, one_time, callback) {
    //   console.log('getting message from server');
    //   Restangular
    //     .one('user', $scope.user.id).one('sessions', $scope.session.id).one('messages')
    //     .customGET()
    //     .then(function(response){

    //         console.log('response from server', JSON.stringify(response.plain()));
    //         var server_messages = $scope.processMessages(response.messages);
    //         server_messages.sort($scope.sortMessageComparator);
    //         if (server_messages.length > $scope.messages.length) {
    //           $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
    //         }
    //         $scope.messages = server_messages;
    //         if ($state.current.name === 'root.student-messages' && !one_time) {
    //           $timeout(function() {
    //             $scope.getMessagesFromServer(time_between);
    //           }, time_between);
    //         }

    //         if (callback) {
    //           callback();
    //         }

    //     }, function(err){
    //         console.log(err);
    //         console.log('error...something happened with the server;')
    //   });

    // }

    // $scope.sortedListByObjKey = function(list) {
    //   return list;
    // }

    // $scope.processMessagesFromServer = function(local_messages, server_messages) {
    //   return server_messages;
    //   // for (var i = 0; i < sslocal_messages.length; i++) {

    //   // }
    // }