angular.module('uguru.desktop.controllers', [])

.controller('DesktopSettingsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  '$cordovaFacebook',
  'User',
  '$rootScope',
  '$controller',
  '$ionicSideMenuDelegate',
  '$cordovaPush',
  '$ionicViewSwitcher',
  '$ionicHistory',
  '$ionicActionSheet',
  '$ionicPopup',
  'Camera',
  'Support',
  'University',
  '$ionicPlatform',
  '$ionicBackdrop',
  'UniversityMatcher',
  'AnimationService',
  'uTracker',
  'Utilities',
  'PopupService',
  'ModalService',
  '$ionicSlideBoxDelegate',
  'AdminService',
  'InAppBrowser',
  'DeviceService',
  'ModalService', //do we need another one?
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User,
  $rootScope, $controller, $ionicSideMenuDelegate, $cordovaPush,
  $ionicViewSwitcher, $ionicHistory, $ionicActionSheet, $ionicPopup,
  Camera, Support, University, $ionicPlatform, $ionicBackdrop, UniversityMatcher,
  AnimationService, uTracker, Utilities, PopupService, ModalService, $ionicSlideBoxDelegate,
  AdminService, InAppBrowser, DeviceService, ModalService, LoadingService) {
    $scope.root.vars.show_account_fields = false;
    $scope.root.vars.loginMode = false;

    PopupService.initDefaults();
    ModalService.initDefaults($scope);

    //link
    //default photo --> not my profile
    //upload & save photo
    //edit email && password
    //edit university (modal)
    //loading service

    $scope.flipToEssayHome = function() {
        LoadingService.showAmbig(null, 2000);
        $timeout(function() {
            AnimationService.flip('^.splash');
        }, 500)
    }


    $scope.resetCache = function() {
      LoadingService.showAmbig('Resetting Cache..', 1500, function(){
        $ionicViewSwitcher.nextDirection('back');
        if ($scope.root.vars.hs_mode) {
          $state.go('^.essay-home');
        } else {
          $state.go('^.university');
        }
        AdminService.resetCache();
      })
    }

    function initDesktopDefaults() {
      $scope.page = {
        url: $state.current.name
      }
      $scope.desktopGoBack = function() {
        $ionicViewSwitcher.nextDirection('enter');
        if ($scope.desktopMode) {
          $state.go('^.guru-home');
        } else {
          $state.go('^.guru');
        }
      }
    }

    //assues already in desktop mode
    $scope.goBackHome = function() {
      if ($scope.root.vars.hs_mode || $scope.user.hs_student) {
        $ionicViewSwitcher.nextDirection('enter');
        $state.go('^.essay-student-home-desktop');
      } else {
        $state.go('^.guru-home');
      }
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.signupModal = modal;
        });

    Intercom('hide');
    $scope.launchSupport = function() {

        Intercom('boot', {
            app_id: "yoz6vu28",
            widget: {"activator": "#Intercom"}
          })
        Intercom('show');
        Intercom('onHide', function() {
          Intercom('shutdown');
        })
    }

    $scope.toggleDiscoverability = function() {
      $scope.user.guru_discoverability = !$scope.user.guru_discoverability;
      if ($scope.user.guru_discoverability) {
        var success_message = 'Discoverability set to ON'
      } else {
        var success_message = 'Discoverability set to OFF'
      }
      LoadingService.showSuccess(success_message, 2000, function() {
        $scope.user.updateAttr('discoverability', $scope.user, $scope.user.guru_discoverability, null, $scope);
      });
    }

    if ($scope.desktopMode) {
      initDesktopDefaults();
    }
    // pre-render these immediately

    $ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: false,
    }).then(function(modal) {
        $scope.supportModal = modal;
    });


    $scope.root.vars.showDesktopSettings = false;
    
    $scope.toggleDesktopSettings = function() {
        $scope.root.vars.showDesktopSettings = !$scope.root.vars.showDesktopSettings;
    }

    ModalService.init('university', $scope);

    $scope.openModal = function(modalName) {
      ModalService.open(modalName, $scope);
    };
    $scope.openModalWithLoader = function(modalName) {
      ModalService.open(modalName, $scope);
      LoadingService.showAmbig(null, 3500);
    }
    $scope.openLoginModal = function() {
      $scope.root.vars.loginMode = true;
      $scope.openModal('login');
    }

    $scope.closeModal = function(modalName) {
      ModalService.close(modalName);
    };


    $scope.onTextClick = function ($event) {
      if (event.target && event.target.value.length) {
        $event.target.select();
      }
    };

    var initSupportChatEnterHandler = function() {

      var chatInputEnterButton = document.querySelectorAll('.intercom-composer-send-button')[0]
      if (chatInputEnterButton) {
        chatInputEnterButton.click();
      }

    }

    $scope.launchSupportModal = function() {

      uTracker.track(tracker, 'Support Modal');

      // nick --> this works right now the other one doesn't on ios -- playing it safe
      $scope.supportModal.show();

      var isDevice = DeviceService.doesCordovaExist();
      if (isDevice && DeviceService.isIOSDevice()) {
        window.StatusBar && window.StatusBar.styleLightContent();
      }


    }



    $scope.confirmPhonePopup = function($event) {
      function callback() {
          $scope.validateAndSendPhoneConfirmation();
      }

      PopupService.open('confirmPhone', callback, $event.target);
    }

    $scope.resendPhoneConfirmation = function() {

      //validate
      if(Utilities.validatePhone($scope.popupInput.phoneConfirm)) {
        $scope.user.phone_number = $scope.popupInput.phoneConfirm;
        var callbackSuccess = function() {
               $scope.loader.showMsg('The code has been sent to '+ $scope.popupInput.phoneConfirm,0, 5000);
         }

        $scope.user.updateAttr('phone_number_generate', $scope.user, $scope.popupInput.phoneConfirm, callbackSuccess, $scope);

        PopupService.close('confirmPhone');
        LoadingService.show();
        $timeout(function() {
          LoadingService.hide();
          var msg = 'New code re-sent to ' + $scope.popupInput.phoneConfirm;
          $scope.success.show(0, 2000, msg);
        }, 1000)

      } else {
        alert('Please enter valid phone number');
        $scope.popupInput.phoneConfirm = "";
        return;
      }


    }


    $scope.validateAndSendPhoneConfirmation = function() {

      //1. re-verify / verify phone number
      //2. invalid input

      if(Utilities.validatePhone($scope.popupInput.phoneConfirm))
      {
        $scope.user.phone_number = $scope.popupInput.phoneConfirm;

        if(Utilities.validateCode($scope.popupInput.code))
        {
            var callbackSuccess = function() {
                if ($scope.user.phone_number_confirmed)
                  $scope.calcGuruCredibilityProgress();
                   $scope.loader.showMsg('Verification Code confirmed!',0, 2000)
             }


           var failureCallback = function(err) {
              if (!$scope.user.phone_number_confirmed)
              {
                $scope.loader.showMsg('Invalid Code - please try again?',0, 2000);
                $scope.popupInput.code =""
              }
            }

            PopupService.close('confirmPhone');

            $scope.user.updateAttr('phone_number_check_token', $scope.user, $scope.popupInput.code, callbackSuccess, $scope, failureCallback);
        }
        else
        {

          if(!$scope.popupInput.code)
             $scope.resendPhoneConfirmation();
          else
            alert("Please enter a 4 digit code.")
        }
      }
      else
      {
        if(!$scope.popupInput.phoneConfirm)
          alert('Please fill in all fields')
        else
          alert('Please enter valid phone number.')
      };
        return;
    }


    $scope.attemptToResetPassword = function() {


      if (!Utilities.validateEmail($scope.signupForm.email)) {
        alert('Please enter valid email');
        return;
      }

      var successCallback = function() {
          $scope.loader.hide();
          alert("Reset Successful.\nPlease check " + $scope.signupForm.email.toLowerCase() + ' for more details!');
          $scope.signupForm.email = '';
      }

      var failureCallback = function(err) {
        if (err && err.status === 404) {
          alert('The email ' + $scope.signupForm.email + ' does not exist in our records.\n Try again?');
        }
      }

      $scope.user.updateAttr('forgot_password', $scope.user, $scope.signupForm.email, successCallback, $scope, failureCallback);
      $scope.loader.show();
      $timeout(function() {
        $scope.toggleBackToLoginMode();
      }, 500)
    }

    $scope.toggleResetModeFromLogin = function() {
      $scope.root.vars.loginMode = false;
      $scope.resetMode = !$scope.root.vars.loginMode;
      if (!$scope.root.vars.loginMode && !$scope.signupMode) {
        $scope.headerText = 'Reset Password';
      }
      $timeout(function() {
        var email_input = document.getElementById('email-input')
          if (email_input) {
            email_input.focus();
          }
      }, 500)
      $timeout(function() {
        $scope.loader.hide();
      }, 750);
    }

    $scope.showActionSheetProfilePhoto = function() {

      if (!$scope.platform.mobile) {
          $scope.takePhoto(0);
          return;
      }

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

    $scope.uploadDesktopPhoto = function(index) {
      var element = document.getElementById('file-input-web-sidebar')
      element.click();
    }

    $scope.file_changed = function(element) {
        var photofile = element.files[0];

        var reader = new FileReader();


        var image = document.getElementById('desktop-settings-profile-img');

        reader.onload = function(e) {
            $scope.user.profile_url = e.target.result;
        };

        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);
        formData.append('profile_url', $scope.user.id);

        formData.append('filename', name);

        $scope.file_index += 1;

        $scope.loader.show();
        callbackSuccess = function() {
          $scope.loader.hide();
          $scope.loader.showSuccess('Saved!', 1500);
        }

        $scope.user.createObj($scope.user, 'files', formData, $scope, callbackSuccess);
    };

    $scope.toggleBackDrop = function() {

      if ($scope.backdropActive) {
        $scope.backdropActive = false;
        $ionicBackdrop.release();
      } else {
        $ionicBackdrop.retain();
      }

    }

    $scope.launchEditEmailPopup = function($event) {

      if($scope.user.email) {
        $scope.popupInput.editEmail = $scope.user.email;
      }

      function callback() {
        if (Utilities.validateEmail($scope.popupInput.editEmail)) {
            $scope.user.email = $scope.popupInput.editEmail.toLowerCase()
        } else {
          alert('Please enter a valid email.');
          return;
        }
        $scope.user.updateAttr('email', $scope.user, $scope.user.email, null, $scope);
        $scope.loader.showSuccess('Saved!', 1500);
        PopupService.close('editEmail');
      }
      PopupService.open('editEmail', callback, $event.target);
    }

    $scope.saveSettings = function() {
      $scope.loader.showSuccess('Saved!', 1500);
    }


    $scope.launchEditPasswordPopup = function($event) {

      function callback() {
          if ($scope.popupInput.editPasswordOld.length === 0 && $scope.popupInput.editPasswordNew.length === 0) {

            alert('Please fill in all fields');
            return;
          }
          else if (Utilities.validatePassword($scope.popupInput.editPasswordNew)) {
            var payload = {
                email : $scope.user.email,
                new_password : $scope.popupInput.editPasswordNew,
                old_password: $scope.popupInput.editPasswordOld
            }
            var successCallback = function() {
              PopupService.close('editPassword');
              $scope.loader.hide();
              $timeout(function() {
                $scope.loader.showSuccess('Password Successfully Changed', 1500);
              }, 500)

            }
            var failureCallback = function(resp) {
              $scope.loader.hide();
              $scope.popupInput.editPasswordOld = null;
              $scope.popupInput.editPasswordNew = '';
              PopupService.close('editPassword');
              $timeout(function() {
                $scope.loader.showMsg('Incorrect old password', 0, 2000);
                $timeout(function() {
                  $scope.launchEditPasswordPopup();
                }, 1500)
              }, 500);

            }
            $scope.user.updateAttr('change_password', $scope.user, payload, successCallback, $scope, failureCallback);
            $scope.loader.show();
          }
          else {
            alert('Please enter a password longer than 6 characters');
            return;
          }
      }
      PopupService.open('editPassword', callback, $event.target);
    }

    $scope.launchEditStudentNamePopup = function($event) {

      if ($scope.user.name) {
        $scope.popupInput.editName = $scope.user.name;
      }

      PopupService.open('editName', callback, $event.target);
      function callback() {
        if (Utilities.validateName($scope.popupInput.editName)) {
            $scope.user.name = $scope.popupInput.editName;
        } else {
          alert('Please enter your full name');
          return;
        }
        $scope.user.updateAttr('name', $scope.user, $scope.user.name, null, $scope);
        $scope.loader.showSuccess('Saved!', 1500);
        PopupService.close('editName');
      }
    }



    //settings info
    $scope.editAccountInfoActionSheet = function() {

      var options = [{text: 'Edit Name'},{text: 'Edit Email'}];
      if ($scope.user.fb_id && !$scope.user.password){
        options.push({text: 'Create Password'});
      } else {
        options.push({text: 'Edit Password'});
      }
        // Show the action sheet
        $scope.closeAttachActionSheet = $ionicActionSheet.show({
            buttons: options,
            titleText: '<span class="semibold uppercase">Edit Account Settings</span>',
            cancelText: 'Cancel',
            cancel: function() {
                $scope.closeAttachActionSheet();
            },
            buttonClicked: function(index) {
              // fire profile photo
              if (index === 0) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.launchEditStudentNamePopup();
                }, 500);
              }

              if (index === 1) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.launchEditEmailPopup()
                }, 500);

              }

              if (index === 2) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.launchEditPasswordPopup();
                }, 500);

              }

            }
      });

    }



    $scope.transitionToUniversity = function() {
      $state.go('^.university-container');
    }

    $scope.transitionToMajor = function() {
      $state.go('^.majors-container');
    }

    $scope.goToMajorPage = function() {

      $scope.closeAttachActionSheet();
          $scope.loader.show();
          $scope.transitionToMajor()
          $timeout(function() {
          $scope.loader.hide();
          $ionicSideMenuDelegate.toggleRight();
      }, 1000);

    }

    $scope.showStudentEditActionSheet = function() {

        var options = [{text: 'Profile Photo'},{text: 'University'}, {text: 'Account Information'}];

        // Show the action sheet
        $scope.closeAttachActionSheet = $ionicActionSheet.show({
            buttons: options,
            titleText: '<span class="semibold uppercase">What would you like to edit?</span>',
            cancelText: 'Cancel',
            cancel: function() {
                $scope.closeAttachActionSheet();
            },
            buttonClicked: function(index) {

              // fire profile photo
              // NICK-REFACTOR
              if (index === 0) {
                $scope.closeAttachActionSheet();
                $scope.loader.show();
                $timeout(function() {
                  $scope.loader.hide();
                  $scope.showActionSheetProfilePhoto();
                }, 1000);
              }

              if (index === 1) {
                $scope.closeAttachActionSheet();
                $scope.loader.show();
                $timeout(function() {
                  $scope.openModal('university');
                }, 0);

                $timeout(function() {
                  $scope.loader.hide();
                }, 500);
              }

              if (index === 2) {
                $scope.closeAttachActionSheet();
                $scope.loader.show();
                $timeout(function() {
                  $scope.editAccountInfoActionSheet();
                  $scope.loader.hide();
                }, 1000);
              }

            }
      });
    }

    $scope.state = $state;

    $scope.hideSettingsPopupAndLogout = function() {
      $scope.logoutPopup.visible = false;
      $scope.root.vars.showDesktopSettings = false;
      $scope.logoutUser(true);
    }
    $scope.logoutPopup = {visible: false};

    $scope.resetAccount = function() {
      if (confirm('Are you sure you want to reset your admin account?')) {

        $scope.loader.show();
        $scope.user.university_id = null;
        $scope.user.university = null;
        $scope.loader.show();
        User.clearAttr({}, $scope.user.id).then(function(user) {
          $scope.loader.hide();
          $scope.loader.showSuccess(0, 2000,'Admin Account Successfully cleared!');
          $scope.logoutUser(true);
          $localstorage.setObject('user', user.plain());
          $scope.user = user.plain();
          $state.go('^.university');
        },

        function(err) {
          console.error(err);
          alert('Something went wrong - please contact Samir');
        }
        )
      }
    }


    $scope.goToGuru = function() {

      LoadingService.showAmbig();

      $timeout(function() {
          LoadingService.hide();
        }, 1000)


        $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': true}, null, $scope);

        if (!$scope.desktopMode) {
          $timeout(function() {
            if ($ionicSideMenuDelegate.isOpen()) {
              $ionicSideMenuDelegate.toggleRight();
            }
          }, 500);
        }

        $timeout(function() {
          $scope.root.vars.guru_mode = true;
          $ionicViewSwitcher.nextDirection('enter');
          $state.go('^.guru');
        }, 500)

    }

    $scope.goToStudent = function() {
      LoadingService.showAmbig('Loading...', 500);

      //let the server know the user was on guru mode for the next time app opens

      if ($scope.desktopMode) {
        AnimationService.flip('^.student-home')
      }

    }

    $scope.showComingSoon = function() {
      $scope.progress_active = true;
          $cordovaProgress.showText(false, "Coming Soon!", 'center');
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 1000);
    }

    $scope.goToDesktopSettings = function() {
      $ionicViewSwitcher.nextDirection('enter')
      $state.go('^.desktop-settings');
      $scope.root.vars.showDesktopSettings = false;
    }

    $scope.goToLoginMode = function() {
      $scope.root.vars.loginMode = false;
      $scope.root.vars.loginModeRecentlySet = true;
      $scope.root.vars.showDesktopSettings = false;
      $ionicViewSwitcher.nextDirection('enter');
      $state.go('^.desktop-login');
    }

    $scope.toggleEmailNotifications = function() {
      $scope.user.email_notifications = !$scope.user.email_notifications;
      $scope.user.updateAttr('email_notifications', $scope.user, $scope.user.email_notifications, null, $scope);
    }

    $scope.toggleTextNotifications = function() {
      $scope.user.text_notifications = !$scope.user.text_notifications;
      $scope.user.updateAttr('text_notifications', $scope.user, $scope.user.text_notifications, null, $scope);
    }

    $scope.saveNotifications = function() {
      LoadingService.showSuccess("Saved", 2500);
      $timeout(function() {
        $scope.notificationsModal.hide();
      }, 500)
    }


  }


]);
