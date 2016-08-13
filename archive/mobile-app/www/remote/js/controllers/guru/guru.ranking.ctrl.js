angular.module('uguru.guru.controllers')

.controller('GuruRankingController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$cordovaStatusbar',
  '$ionicViewSwitcher',
  '$ionicActionSheet',
  '$ionicHistory',
  '$ionicPopup',
  'CordovaPushWrapper',
  'LoadingService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $cordovaStatusbar, $ionicViewSwitcher,
    $ionicActionSheet, $ionicHistory, $ionicPopup, CordovaPushWrapper, LoadingService) {
    // $scope.data = {
    //   text_notifications:false || $scope.user.text_notifications,
    //   push_notifications: false || ($scope.user.push_notifications && $scope.user.push_notifications_enabled && $scope.user.devices.length)
    // };

    $scope.takePhotoCallbackSuccess = function($scope) {

      $scope.success.show(0, 2000, "Awesome! You're all set.");
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.guru');

    }

    var generatePhonePopupHtml = function() {
      return '<input style="padding:2px 6px; margin-bottom:0.5em" type="text" ng-model="data.phone" placeholder="123-456-7890">\
      <input style="padding:2px 6px;" type="text" ng-show="user.phone_number && user.phone_number.length && user.phone_number_token" ng-model="data.token" placeholder="Enter 4-digit numerical code ">'
    }

    $scope.goToPayments = function() {
      $scope.root.vars.previous_page_ranking = true;
      $ionicViewSwitcher.nextDirection('forward');
      LoadingService.show();
      $timeout(function() {
        $state.go('^.payments');
      }, 250)
    }


    $scope.goBack = function() {
      $ionicHistory.goBack();
    };


    $scope.uploadPhotoAndFinish = function() {
      $scope.success.show(0, 2000, "Awesome! You're all set.");
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.guru');
    }

    $scope.showAttachActionSheet = function() {

      var options = [{ text: 'Choose from Library' }];
      if ($scope.platform.mobile) {
        options.push({text: 'Take a Photo'})
      }

     // Show the action sheet
     $scope.closeAttachActionSheet = $ionicActionSheet.show({
        buttons: options,
        cancelText: 'Cancel',
        cancel: function() {
            $scope.closeAttachActionSheet();
        },
        buttonClicked: function(index) {
          $scope.takePhoto(index);
          $timeout(function() {
              $scope.closeAttachActionSheet();
          }, 500);
       }
     });
    }

    $scope.confirmCommitment = function() {
      if (!$scope.user.default_transfer_card && !$scope.user.transfer_cards.length) {
        alert('Please add a bank card or account first!');
        return;
      }
      var default_card = $scope.user.transfer_cards[0];
      if (confirm("I give Uguru permission to \nbill $10 to " +  default_card.card_type + " **" +  default_card.card_last4)) {
        LoadingService.show()
        var successCallback = function () {
          LoadingService.hide();
          $scope.success.show(500, 1000, "Your payment is successful!");
        }
        var failureFunction = function(err) {
          LoadingService.hide();
          if (err.status === 403) {
            $scope.success.show(0, 2000, "There was an error with charging your card. Please contact customer support")
          }

        }
        var default_guru_deposit = 10;
        $scope.user.updateAttr('guru_deposit', $scope.user, default_guru_deposit, successCallback, $scope);



      }
    }



    $scope.takePhoto = function(index) {
      if ($scope.platform.mobile) {
        Camera.takePicture($scope, index, $scope.takePhotoCallbackSuccess);
      } else {
        var element = document.getElementById('file-input-web')
        element.click();
      }
    }


    $scope.closeAttachActionSheet = function() {
      $scope.closeAttachActionSheet();
    }



    $scope.file_changed = function(element) {
        var photofile = element.files[0];

        var reader = new FileReader();


        var image = document.getElementById('become-guru-profile');

        reader.onload = function(e) {
            $scope.user.profile_url = e.target.result;
        };

        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);
        formData.append('profile_url', $scope.user.id);

        formData.append('filename', name);

        $scope.file_index += 1;

        $scope.user.createObj($scope.user, 'files', formData, $scope, $scope.takePhotoCallbackSuccess);
    };

    $scope.updateTextNotifications = function() {
      if (!$scope.user.phone_number || !$scope.user.phone_number_confirmed) {
        $scope.showPopupEditPhoneNumber();
        $scope.data.text_notifications = false;
      } else {
        $scope.data.text_notifications = true;
        LoadingService.show();
        var successCallback = function() {
          LoadingService.hide();
          $scope.success.show(0, 1500, "Saved!");
        }
        $scope.user.updateAttr('text_notifications', $scope.user, true, successCallback, $scope);
      }
    }

    $scope.requestPushNotifications = function() {
      if ($scope.platform.ios) {
        $scope.registerIOSPush();
      }
      else if ($scope.platform.android) {
        $scope.registerAndroidPush()
      }
      else if ($scope.platform.windows) {
        $scope.registerWindowsPush();
      }
    }

    $scope.registerWindowsPush = function() {

        $cordovaPush.register(
            channelHandler,
            errorHandler,
            {
                "channelName": "123723560",
                "ecb": "onNotificationWP8",
                "uccb": "channelHandler",
                "errcb": "jsonErrorHandler"
        });

        function channelHandler(event) {

            var uri = event.uri;

            CordovaPushWrapper.received($rootScope, event, notification);
            if ($scope.user && $scope.user.id) {

              payload = {
                'push_notifications': true,
                'push_notifications_enabled': true
              }
              $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);



            }
        }
        function errorHandler(error) {
           // document.getElementById('app-status-ul').appendChild(document.createElement(error));
            $scope.user.push_notifications = false;
            $scope.user.push_notifications_enabled = false;
            $scope.data.push_notifications = false;
            payload = {
                  'push_notifications': false,
                  'push_notifications_enabled': false
                }
            $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
            alert('Please turn your Push Notifications ON in your settings.');
        }
        function onNotificationWP8(e) {

            if (e.type == "toast" && e.jsonContent) {
                pushNotification.showToastNotification(successHandler, errorHandler,
                {
                    "Title": e.jsonContent["wp:Text1"],
                    "Subtitle": e.jsonContent["wp:Text2"],
                    "NavigationUri": e.jsonContent["wp:Param"]
                });
            }

            if (e.type == "raw" && e.jsonContent) {
                alert(e.jsonContent.Body);
            }
        }
        function jsonErrorHandler(error) {
            //document.getElementById('app-status-ul').appendChild(document.createElement(error.code));
            //document.getElementById('app-status-ul').appendChild(document.createElement(error.message));
            console.error("ERROR: ", error.code, error.message);
        }

    }

    $scope.registerAndroidPush = function() {

        var androidConfig = {
                    "senderID": "413826461390",
                    'ecb': "angular.element(document.body).injector().get('$cordovaPush').onNotification"
                  }

        $cordovaPush.register(androidConfig).then(
          function(deviceToken) {


          }, function(err){


            console.error(JSON.stringify(err));
            $scope.user.push_notifications = false;
            $scope.user.push_notifications_enabled = false;
            $scope.data.push_notifications = false;
            payload = {
                  'push_notifications': false,
                  'push_notifications_enabled': false
                }
            $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
            alert('Please turn your Push Notifications ON in your settings.');

          }
        )


        $rootScope.$on('pushNotificationReceived', function(event, notification) {
          CordovaPushWrapper.received($rootScope, event, notification);
          if ($scope.user && $scope.user.id) {

            payload = {
              'push_notifications': true,
              'push_notifications_enabled': true
            }
            $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);

          }
        });

    }

    $scope.registerIOSPush = function() {
      if (!$scope.user.push_notifications) {

        payload = {
              'push_notifications': false
            }
        $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
        return;
      }

        var iosConfig = {
            "badge": true,
            "sound": true,
            "alert": true,
        }

        $cordovaPush.register(iosConfig).then(function(deviceToken) {
          // Success -- send deviceToken to server, and store for future use
              if ($scope.user.createObj && !$scope.user.current_device && $scope.platform && $scope.user) {
                  $scope.user.current_device = ionic.Platform.device();
                  $scope.user.current_device.user_id = $scope.user.id;
                  $scope.user.createObj($scope.user, 'device', $scope.user.current_device, $scope);
              }

              $scope.data.push_notifications = true;
              $scope.user.push_notifications = true;
              $scope.user.push_notifications_enabled = true;
              $scope.user.current_device.push_notif = deviceToken;
              $scope.user.current_device.push_notif_enabled = true;
              $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);

              payload = {
                'push_notifications': true,
                'push_notifications_enabled': true
              }
              $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);

        }, function(err) {
          $scope.user.push_notifications = false;
          $scope.user.push_notifications_enabled = false;
          $scope.data.push_notifications = false;
          payload = {
                'push_notifications': false,
                'push_notifications_enabled': false
              }
          $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
          alert('Please turn your Push Notifications ON in your settings.');
        });

    }


    $scope.showPopupEditPhoneNumber = function() {
      $scope.data = {phone:$scope.user.phone_number, token:''};
          var closeButtonDict = { text: 'Close', type:'button-popup'};
          var resendButtonDict = { text: 'Resend',
              type:'button-popup',
              onTap: function(e) {
                if (!$scope.data.phone || !($scope.data.phone.length >= 10)) {
                  alert('Please enter valid phone number');
                  return;
                }
                  $scope.user.updateAttr('phone_number_generate', $scope.user, $scope.data.phone, null, $scope);
                  var msg = 'New code re-sent to ' + $scope.data.phone;
                  $scope.success.show(0, 1500, msg);
              }
          }
          //TODO SAMIR CLEAN THIS UP
          var verifyButtonDict = {
              text: '<b>Verify</b>',
              type: 'button-positive button-popup',
              onTap: function(e) {
                //if user hasn't typed in a phone number  [resend exists]
                if (!$scope.data.phone || !($scope.data.phone.length >= 10)) {
                  alert('Please enter valid phone number');
                  return;
                }
                //if user hasn't typed in a token & clicked verify [resend exists]
                if ($scope.user.phone_number && $scope.user.phone_number_token && (!$scope.data.token || $scope.data.token.length < 4)) {
                  alert('Please enter a 4 digit code');
                  return;
                }

                //if user hasn't received a token yet & is sending for the first time [resend doesn't exist]
                if ($scope.data.phone && !$scope.user.phone_number_token && !$scope.data.token) {
                  $scope.user.phone_number_token = true;
                  $timeout(function() {
                    $scope.user.phone_number = $scope.data.phone;
                  }, 500)
                  $scope.user.updateAttr('phone_number_generate', $scope.user, $scope.data.phone, null, $scope);
                  var msg = 'Code sent to ' + $scope.data.phone;
                  $scope.success.show(0, 1500, msg);

                }
                //if user has a token &&
                if ($scope.user.phone_number && $scope.data.token && $scope.data.token.length === 4) {

                  var callbackSuccess = function() {
                    LoadingService.hide();
                    if ($scope.user.phone_number_confirmed) {
                      $scope.success.show(0, 2000, 'Verification Code confirmed!')
                    } else {
                      $scope.success.show(0, 2000, 'Invalid Code - please try again?');
                    }
                    return;
                  }

                  LoadingService.show();
                  $scope.user.updateAttr('phone_number_check_token', $scope.user, $scope.data.token, callbackSuccess, $scope);

                }

              }
            }

          buttons = [];
          buttons.push(closeButtonDict);

          if ($scope.user.phone_number_token) {
            buttons.push(resendButtonDict);
            buttons.push(verifyButtonDict);
          } else {
            buttons.push(verifyButtonDict);
          }


          $scope.inputPopup = $ionicPopup.show({
            template: generatePhonePopupHtml(),
            title: 'Enter your phone number',
            subTitle: 'Please include your area code',
            scope: $scope,
            buttons: buttons
          });
    }

  }


])