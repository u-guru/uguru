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
  '$ionicHistory',
  '$cordovaStatusbar',
  '$ionicPlatform',
  function($scope, $state, $timeout, $localstorage,
  $ionicModal, $ionicTabsDelegate, $cordovaProgress,
  $stateParams, $cordovaKeyboard, $ionicScrollDelegate,
  Restangular, $ionicHistory, $cordovaStatusbar, $ionicPlatform) {

    $scope.hide_footer = false;
    $scope.session = JSON.parse($stateParams.sessionObj);
    $scope.new_message = {content: ''};
    $scope.default_profile_url = 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100';

    //user is the guru
    if ($scope.session.guru.id === $scope.user.id) {
      $scope.message_name = $scope.session.request.student.name.split(' ')[0];
    } else {
      $scope.message_name = $scope.session.guru.name.split(' ')[0];
    }


    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });

    $scope.goBack = function() {
      $ionicHistory.goBack();
    };

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

      // var messages = messages;
      for (var i = 0; i < messages.length; i ++ ) {
        var current_message = messages[i];
        current_message.profile_url = messages[i].sender.profile_url;
        if (current_message.sender.id === $scope.user.id) {
          current_message.class = 'item-avatar-right';
        } else {
          current_message.class = 'item-avatar-left';
        }
      }
      messages.sort($scope.sortMessageComparator);
      $scope.loader.hide();
      return messages;
    }

    $scope.setFocus = function() {
      if (!$scope.hide_footer) {
        $scope.hide_footer = false;
        document.getElementsByName('message-input')[0].focus();
        $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
      }
    }

    $scope.setUnfocus = function() {
      $scope.hide_footer = true;
      if ($scope.platform.mobile  && $cordovaKeyboard) {
        $cordovaKeyboard.close();
        $ionicScrollDelegate.$getByHandle('message-scroll').scrollTop();
      }
      $timeout(function() {
        $scope.hide_footer = false;
      }, 500)
    }



    $scope.sendMessage = function (content) {

      // $scope.messages.push({
      //   'contents':content,
      //   'class': 'you', // Try "fadeInUp" if you don't like bounceInUp.
      //   'profile_url': $scope.default_img_one
      // })

      // $scope.new_message.content = '';
      $ionicScrollDelegate.$getByHandle('message-scroll').scrollBy(0, 200, true);

      var messagePayload = $scope.getMessagePayload(content);

      $scope.sendMessageToServer(messagePayload);

      messagePayload.message.class = 'item-avatar-right';
      messagePayload.message.profile_url= $scope.user.profile_url;
      console.log(messagePayload.message.class, messagePayload.message.profile_url);
      $scope.new_message.content = '';
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

    $scope.getMessagesFromServer = function(time_between, one_time, callback) {
      console.log('getting message from server');
      Restangular
        .one('user', $scope.user.id).one('sessions', $scope.session.id).one('messages')
        .customGET()
        .then(function(response){

            console.log('response from server', JSON.stringify(response.plain()));
            var server_messages = $scope.processMessages(response.messages);
            server_messages.sort($scope.sortMessageComparator);
            if (server_messages.length > $scope.messages.length) {
              $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
            }
            $scope.messages = server_messages;
            if ($state.current.name === 'root.student-messages' && !one_time) {
              $timeout(function() {
                $scope.getMessagesFromServer(time_between);
              }, time_between);
            }

            if (callback) {
              callback();
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
    $scope.$on('$ionicView.beforeEnter', function(){
      console.log('view has entered');
      // $scope.root.keyboard.show('message-input', 100);

      if ($scope.platform.mobile && window.cordova && window.cordova.plugins.Keyboard) {

          console.log('keyboard exists!');
          // $cordovaKeyboard.hideKeyboardAccessoryBar(true);
          window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          window.cordova.plugins.Keyboard.disableScroll(true);
      }
      $timeout(function() {
        $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();

      },500);
    });

    $scope.doRefresh = function() {
        var callback = function() {
          $scope.$broadcast('scroll.refreshComplete');
          $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
        }
        console.log('getting message from server');
        $scope.getMessagesFromServer(null ,true,callback);

        $timeout(function() {
          console.log('shutting off anyways incase its not');

          $scope.$broadcast('scroll.refreshComplete');
          $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
        }, 3000)
    }

    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.loader.show();
      $scope.messages = $scope.processMessages($scope.session.messages);
      $timeout(function() {
        $scope.getMessagesFromServer(30000);
      }, 5000)
    });

    $scope.$on('$ionicView.afterEnter', function(){
      //show/set focus on the  the keyboard
      $timeout(function() {
          if ($scope.platform.ios) {
              $scope.setFocus();
          } else if ($scope.platform.android) {
            $cordovaKeyboard.show();

          };
      } , 1000)
    });



  }

]);