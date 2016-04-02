angular.module('uguru.guru.controllers')

.controller('GuruSessionController', [

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
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, $ionicActionSheet,
  Restangular, $ionicPlatform, $ionicScrollDelegate, $cordovaKeyboard,
  LoadingService) {


    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {

        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });



    if ($scope.root.vars.guru_active_session) {
      $scope.session = $scope.root.vars.guru_active_session;
    }
    else if (!$scope.session) {
      $scope.session = JSON.parse($stateParams.sessionObj);
    }

    $scope.details = {show: true};
    $scope.new_message = {content: ''};
    $scope.default_profile_url = 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100';

    if ($scope.session.request.status === 2  && $scope.session.guru.id === $scope.user.id) {
      $scope.message_name = $scope.session.request.student.name.split(' ')[0];
    } else if ($scope.session.request.status === 1 && $scope.session.student){
      $scope.message_name = $scope.session.student.name.split(' ')[0];
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

    //todo come back and do these properly
    $scope.session.request.schedule_time = 45;


    $scope.cancelSession = function(session) {
      var dialogCallBackSuccess = function() {
        //guru cancels session
        $scope.session.status = 5;

        var sessionPayload = {session: $scope.session}

        $scope.user.previous_guru_sessions.push($scope.session);

        //remove session locally from active guru session
        $scope.root.util.removeObjectByKey($scope.user.active_guru_sessions, 'id', $scope.session.id);

        //update session locally
        $scope.root.util.updateObjectByKey($scope.user.guru_sessions, 'id', $scope.session.id, 'status', 5);
          //Mixpanel Track

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope);

        $scope.success.show(0, 2000, 'Request successfully canceled');

        $scope.closeAttachActionSheet();

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

    };

    $scope.endSession = function() {
      //guru start session
        $scope.session.status = 3;


        //todo later
        if ($scope.timer) {
          $scope.session.minutes = $scope.timer.minutes;
          $scope.session.seconds = $scope.timer.seconds;
          $scope.session.hours = $scope.timer.hours;
        }

        var sessionPayload = {session: $scope.session};

        LoadingService.show();

        if ($scope.guruInSessionModal.isShown()) {
            $scope.guruInSessionModal.hide();
        }

        if ($scope.guruSessionDetailsModal.isShown()) {
            $scope.guruSessionDetailsModal.hide();
        }

        $scope.postServerCallback = function() {

          LoadingService.hide();

        };

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope, postServerCallback);

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

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.in-session.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruInSessionModal = modal;
        });

    $scope.launchGuruInSessionModal = function() {
      $scope.guruInSessionModal.show();
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

      //user is the guru
      var sender_id = $scope.user.id;
      if ($scope.session.guru.id === $scope.user.id) {
        var receiver_id = $scope.session.student.id;
      } else {
        var receiver_id = $scope.session.guru.id;
      }

      var payload = {
        message: {
          contents: content,
          relationship_id: $scope.session.relationship_id,
          receiver_id: receiver_id,
          sender_id: $scope.user.id,
          session_id: $scope.session.id
        }
      }
      return payload;
    }

    $scope.root.vars.launchPendingActions = function() {


      //priority 1: see if any ratings are allowed

      if ($scope.user.pending_student_ratings.length > 0) {

        var rating = $scope.user.pending_student_ratings[0];

        //pop the first item

        $scope.user.pending_student_ratings.shift();

        $scope.pending_rating = rating;

        if(!$scope.guruRatingsModal || !$scope.guruRatingsModal.isShown()) {
          $scope.launchGuruRatingsModal(rating);
        }

        //no reason to
        return;

      }


      //see if any sessions are going on right now

      for (var i = 0 ; i < $scope.user.active_guru_sessions.length; i ++) {

            var session = $scope.user.active_guru_sessions[i];
            if (session.status === 2) {
              $scope.session = session;
              $timeout(function() {

                $scope.details = {show: true};


                if (!$scope.guruInSessionModal.isShown()) {
                  $scope.launchGuruInSessionModal();
                }

              }, 500);
            }

      }

    }

    $scope.startSessionGuru = function(session) {

      var dialogCallBackSuccess = function() {

        $scope.session.status = 2;
        $scope.session.minutes = 0;
        $scope.session.hours = 0;
        $scope.session.seconds = 0;

        var sessionPayload = {session: $scope.session}

        LoadingService.show();

        var callbackSuccess = function() {
          // $scope.root.vars.launchPendingActions();
          // $timeout(function() {

          // }, 1000);
          $state.go('^.guru');

        }

        $scope.user.updateObj($scope.user, 'sessions', sessionPayload, $scope, callbackSuccess);


      }

      var dialog = {
        message: "Only start if the student is around you and you're good to go",
        title: "Are you sure?",
        button_arr: ['Cancel', 'Yes'],
        callback_arr: [null, dialogCallBackSuccess]
      }

      if ($scope.platform.web) {
        if (confirm('Are you sure? \n' + dialog.message)) {
            dialogCallBackSuccess();
        }

      } else {
          $scope.root.dialog.confirm(dialog.message, dialog.title, dialog.button_arr, dialog.callback_arr);
      }

    }

    $scope.sendMessage = function (content) {



      var messagePayload = $scope.getMessagePayload(content);

      $scope.sendMessageToServer(messagePayload);

      // $ionicScrollDelegate.$getByHandle('message-scroll').scrollBottom();

      messagePayload.message.class = 'item-avatar-right animated fadeInUp';
      messagePayload.message.profile_url= $scope.user.profile_url;
      messagePayload.message.formatted_time = 'a couple seconds';
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

      if ($scope.session.request.status > 0 && $scope.session.messages) {

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

