angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentMessagesController', [

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
  function($scope, $state, $timeout, $localstorage,
  $ionicModal, $ionicTabsDelegate, $cordovaProgress,
  $stateParams, $cordovaKeyboard, $ionicScrollDelegate, Restangular) {
    $scope.hide_footer = false;
    $scope.default_img_one = "https://scontent-a-lax.xx.fbcdn.net/hphotos-xpf1/t31.0-8/10562663_885963074765104_3921025689053196901_o.jpg";
    $scope.default_img_two = "https://scontent-a-lax.xx.fbcdn.net/hphotos-xpa1/t31.0-8/10520798_883807624993289_354037221863580422_o.jpg"

    $scope.session = JSON.parse($stateParams.sessionObj);
    $scope.new_message = {content: ''};

    $scope.getCurrentDate = function() {
        var d = new Date();
        var hour = d.getHours() % 12;
        var minutes = d.getMinutes();
        if (d.getHours() >= 12)  {
          ending = 'PM'
        } else {
          ending = 'AM'
        }
        result = hour + ':' + minutes + ' ' + ending
        return result
    }

    $scope.last_updated = $scope.getCurrentDate();

    $scope.sortMessageComparator = function(msg_a, msg_b) {
        return msg_a.id - msg_b.id;
    }

    $scope.processMessages = function(messages) {

      var messages = messages;
      for (var i = 0; i < messages.length; i ++ ) {
        var current_message = messages[i];
        if (current_message.sender.id === $scope.user.id) {
          current_message.class = 'you';
          current_message.profile_url = messages[i].sender.profile_url;
          if (!current_message.profile_url) {
            current_message.profile_url = 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100';
          }
        } else {
          current_message.class = 'sender';
          current_message.profile_url = messages[i].receiver.profile_url;
          if (!current_message.profile_url) {
            current_message.profile_url = 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100';
          }
        }
      }
      messages.sort($scope.sortMessageComparator);
      return messages;
    }

    $scope.messages = $scope.processMessages($scope.session.messages);

    $scope.setFocus = function() {
      if (!$scope.hide_footer) {
        document.getElementsByName('message-input')[0].focus();
        $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
      }
    }



    $scope.sendMessage = function (content) {

      //local push
      // $scope.messages.push({
      //   'contents':content,
      //   'class': 'you', // Try "fadeInUp" if you don't like bounceInUp.
      //   'profile_url': $scope.default_img_one
      // })

      $scope.new_message.content = '';
      $ionicScrollDelegate.$getByHandle('message-scroll').scrollBy(0, 200, true);

      var messagePayload = $scope.getMessagePayload(content);

      $scope.sendMessageToServer(messagePayload);

      messagePayload.message.class = 'you';
      messagePayload.message.profile_url= $scope.default_img_one;

      $scope.messages.push(messagePayload.message);
    }

    $scope.getMessagePayload = function (content) {
      var payload = {
        message: {
          contents: content,
          relationship_id: $scope.session.relationship_id,
          receiver_id: $scope.session.guru.id,
          sender_id: $scope.user.id,
          session_id: $scope.session.id
        }
      }
      return payload;
    }

    $scope.getMessagesFromServer = function(time_between, one_time) {

      Restangular
        .one('user', $scope.user.id).one('sessions', $scope.session.id).one('messages')
        .customGET()
        .then(function(response){
            var server_messages = $scope.processMessages(response.messages);
            server_messages.sort($scope.sortMessageComparator);
            $scope.messages = server_messages;
            if ($state.current.name = 'root.student.messages' && !one_time) {
              $timeout(function() {
                $scope.getMessagesFromServer(time_between);
              }, time_between);
            }

        }, function(err){
            console.log(err);
            console.log('error...something happened with the server;')
      });

    }

    $scope.sortedListByObjKey = function(list) {
      return list;
    }

    $scope.processMessagesFromServer = function(local_messages, server_messages) {
      return server_messages;
      // for (var i = 0; i < sslocal_messages.length; i++) {

      // }
    }

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

    $scope.hideKeyboard = function() {
      $scope.root.keyboard.close();
      $scope.hide_footer = true;
      $ionicScrollDelegate.$getByHandle('message-scroll').resize();
      $timeout(function(){
        $scope.hide_footer = false;
      }, 500);
    }
    $scope.$on('$ionicView.enter', function(){
      // console.log('view has entered');
      // $scope.root.keyboard.show('message-input', 100);

      // $timeout(function() {
        $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();

      // },500);
    });

    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.getMessagesFromServer(10000);
    });


  }

]);