angular.module('uguru.student.controllers')

.controller('StudentSessionController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$stateParams',
  '$ionicHistory',
  '$ionicActionSheet',
  'Restangular',
  '$ionicPlatform',
  '$ionicScrollDelegate',
  '$cordovaKeyboard',
  '$ionicSideMenuDelegate',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, $ionicActionSheet,
  Restangular, $ionicPlatform,$ionicScrollDelegate, $cordovaKeyboard,
  $ionicSideMenuDelegate, LoadingService) {

    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {

        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });

    $scope.session = JSON.parse($stateParams.sessionObj);

    if ($scope.session.request.student_price) {
      $scope.session.request.student_price = parseInt($scope.session.request.student_price);
    }

    $scope.details = {show: true};
    $scope.new_message = {content: ''};
    $scope.default_profile_url = 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100';

    if ($scope.session.request.status > 0 && $scope.session.guru.id === $scope.user.id) {
      $scope.message_name = $scope.session.request.student.name.split(' ')[0];
    } else if ($scope.session.request.status > 0){
      $scope.message_name = $scope.session.guru.name.split(' ')[0];
    }

    $scope.goBack = function() {

      $ionicHistory.goBack();
    }

    $scope.showChat = function() {
      $scope.details.show = false;
    }

    $scope.showDetails = function() {
      $scope.details.show = true;
    }

    $scope.showAttachActionSheet = function() {

      var options = [{ text: 'Cancel Request' }, { text: 'Support' }];

        // Show the action sheet
        $scope.closeAttachActionSheet = $ionicActionSheet.show({
            buttons: options,
            cancelText: 'Cancel',
            cancel: function() {
                $scope.closeAttachActionSheet();
            },
            buttonClicked: function(index) {
              if (index === 0) {

                $scope.closeAttachActionSheet();

                $timeout(function() {
                  $scope.cancelSession($scope.session);
                }, 500)

              }
              if (index === 1) {
                $scope.success.show(0, 2000, 'Email support@uguru.me for a fast reply');
                $scope.closeAttachActionSheet();
              }
            }
      });
    }

    $scope.cancelRequest = function(request) {
      if (confirm('Are you sure you want to cancel this request?')) {
        request.status = 4;
        $scope.user.updateObj($scope.user, 'requests', request, $scope);

        var cancelMsg = request.course.short_name + ' request canceled';
        $ionicSideMenuDelegate.toggleRight();
        $scope.success.show(0, 2000, cancelMsg);
        $scope.root.util.removeObjectByKey($scope.user.active_requests, 'id', request.id);
      }
    }

    //todo come back and do these properly
    $scope.session.request.schedule_time = 45;

    // $scope.session.request.files = [{url: $scope.user.profile_url}, {url:$scope.user.profile_url}, {url:$scope.user.profile_url}];

    // $scope.session.request.tags = ['milleniumfalcon'];;

    $scope.cancelSession = function(session) {


      //before guru is matched
      if (session.request.status === 0) {

        $scope.cancelRequest(session.request);
        return;

      }

      //after guru is matched
      var dialogCallBackSuccess = function() {
        //guru cancels session
        $scope.session.status = 4;

        var sessionPayload = {session: $scope.session}

        $scope.user.previous_student_sessions.push($scope.session);

        //remove session locally from active guru session
        $scope.root.util.removeObjectByKey($scope.user.active_student_sessions, 'id', $scope.session.id);

        //update session locally
        $scope.root.util.updateObjectByKey($scope.user.student_sessions, 'id', $scope.session.id, 'status', 5);
          //Mixpanel Track

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope);

        $scope.goBack();
      }

      var dialog = {
        message: "Are you sure? This will be closely investigated by us and may impact your Guru ranking.",
        title: "Cancel Session",
        button_arr: ['Never Mind', 'Cancel Session'],
        callback_arr: [null, dialogCallBackSuccess]
      }

      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog.message)) {
            dialogCallBackSuccess();
        }
      }

      else {
          $scope.root.dialog.confirm(dialog.message, dialog.title, dialog.button_arr, dialog.callback_arr);
      }

    }

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
        $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
      }
      $timeout(function() {
        $scope.hide_footer = false;
      }, 500)
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

    $scope.sendMessage = function (content) {



      var messagePayload = $scope.getMessagePayload(content);

      $scope.sendMessageToServer(messagePayload);

      // $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();

      messagePayload.message.class = 'item-avatar-right animated fadeIn';
      messagePayload.message.profile_url= $scope.user.profile_url;
      messagePayload.message.formatted_time = 'a couple seconds ago';
      $scope.new_message.content = '';
      $scope.local_messages.push(messagePayload.message);
      // $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
      // $ionicScrollDelegate.$getByHandle('message-scroll').scrollBy(0, 100, false);
    }

    $scope.sortedListByObjKey = function(list) {
      return list;
    }

    $scope.processMessagesFromServer = function(local_messages, server_messages) {
      return server_messages;
      // for (var i = 0; i < sslocal_messages.length; i++) {

      // }
    }

    $scope.hideKeyboard = function() {
      $scope.root.keyboard.close();
      $scope.hide_footer = true;
      $ionicScrollDelegate.$getByHandle('message-scroll').resize();
      $timeout(function(){
        $scope.hide_footer = false;
      }, 500);
    }

    $scope.sendMessageToServer = function(payload) {

        var callbackSuccess = function($scope, processed_user) {
            $scope.user.active_student_sessions = processed_user.active_student_sessions;
            for (var i = 0; i < processed_user.active_student_sessions.length; i++) {
              if ($scope.session.id === processed_user.active_student_sessions[i].id) {
                var updated_messages = $scope.processMessages(processed_user.active_student_sessions[i].messages);
                updated_messages.sort($scope.sortMessageComparator);

                $scope.messages = updated_messages;

                if (updated_messages.length > $scope.local_messages.length) {
                  $scope.local_messages = updated_messages;
                }

              }
            }
        }

        $scope.user.createObj($scope.user, 'messages', payload, $scope, callbackSuccess);
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
        current_message.formatted_time = $scope.root.time.since(new Date(current_message.time_created))
      }
      messages.sort($scope.sortMessageComparator);
      LoadingService.hide();
      return messages;
    }

    $scope.doRefresh = function() {
        var callback = function() {
          $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
            $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
          }, 3000);
        }

        $scope.getMessagesFromServer(null ,true,callback);
    }

    $scope.getMessagesFromServer = function(time_between, one_time, callback) {
      Restangular
        .one('user', $scope.user.id).one('sessions', $scope.session.id).one('messages')
        .customGET()
        .then(function(response){

            var server_messages = $scope.processMessages(response.messages);
            server_messages.sort($scope.sortMessageComparator);
            if (server_messages.length > $scope.messages.length) {
              $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();
            }
            $scope.messages = server_messages;

            if ($scope.messages.length > $scope.local_messages.length) {
              $scope.local_messages = $scope.messages;
            }

            if ($state.current.name === 'root.student-messages' && !one_time) {
              $timeout(function() {
                $scope.getMessagesFromServer(time_between);
              }, time_between);
            }

            if (callback) {
              callback();
            }

        }, function(err){
            console.error('error...something happened with the server;')
      });

    }



    $scope.$on('$ionicView.afterEnter', function() {

        if ($scope.session.request.status > 0) {

          $scope.messages = $scope.processMessages($scope.session.messages);
          $scope.local_messages = $scope.messages;

          $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();

            $timeout(function() {
                $scope.getMessagesFromServer(30000);
            }, 30000)
        }

    });

  }


]);

