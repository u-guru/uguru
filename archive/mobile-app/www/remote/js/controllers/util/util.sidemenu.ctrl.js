angular.module('uguru.util.controllers')

.controller('SideMenuController', [

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
  'LoadingService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User,
  $rootScope, $controller, $ionicSideMenuDelegate, $cordovaPush,
  $ionicViewSwitcher, $ionicHistory, $ionicActionSheet, $ionicPopup,
  Camera, Support, University, $ionicPlatform, $ionicBackdrop, UniversityMatcher,
  AnimationService, uTracker, Utilities, PopupService, ModalService, $ionicSlideBoxDelegate,
  AdminService, InAppBrowser, DeviceService, LoadingService) {
    $scope.root.vars.show_account_fields = false;
    $scope.root.vars.loginMode = false;

    PopupService.initDefaults();
    ModalService.initDefaults($scope);

    $scope.launchAdminActionSheet = function() {
      var showPopup = AdminService.showActionSheet($scope);
      AdminService.closeAttachActionSheet = showPopup();
    };

//use for abstract
    $scope.openAdmin = function() {
      $state.go('admin.admin-home');
    };

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

    if ($scope.isDesktopMode) {
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


    ModalService.init('university', $scope);
    var sideMenu = document.querySelectorAll('ion-side-menu')[0];
    $scope.openModal = function(modalName) {
      ModalService.open(modalName, $scope);
    };

    $scope.openModalWithLoader = function(modalName) {
      ModalService.open(modalName, $scope);
      LoadingService.showAmbig(null, 3500);
    }

    $scope.closeLoader = function(time) {
      time = time || 0;
      $timeout(function() {
        LoadingService.hide();
        $scope.loader.hide();
      }, time)
    }

    $scope.openLoginModal = function() {
      $scope.root.vars.loginMode = true;
      $scope.openModal('login');
    };

    $scope.closeModal = function(modalName) {
      ModalService.close(modalName);
    };


    $scope.onTextClick = function ($event) {
      if (event.target && event.target.value.length) {
        $event.target.select();
      }
    };

    var initSupportChatEnterHandler = function() {

      var chatInputEnterButton = document.querySelectorAll('.intercom-composer-send-button')[0];
      if (chatInputEnterButton) {
        chatInputEnterButton.click();
      }

    };

    $scope.launchSupportModal = function() {

      uTracker.track(tracker, 'Support Modal');

      // nick --> this works right now the other one doesn't on ios -- playing it safe
      $scope.supportModal.show();

      var isDevice = DeviceService.doesCordovaExist();
      if (isDevice && DeviceService.isIOSDevice()) {
        window.StatusBar && window.StatusBar.styleLightContent();
      }

      // if (!isDevice) {
      //   $scope.supportModal.show();
      // } else {
      //   InAppBrowser.openSupport();
      // }


      // $scope.supportModal.show();
      // $timeout(function() {
      //   initSupportChatEnterHandler()
      // }, 500);
      // $scope.init
    };






    $scope.attemptToResetPassword = function() {


      if (!Utilities.validateEmail($scope.signupForm.email)) {
        alert('Please enter valid email');
        return;
      }

      var successCallback = function() {
          LoadingService.hide();
          alert("Reset Successful.\nPlease check " + $scope.signupForm.email.toLowerCase() + ' for more details!');
          $scope.signupForm.email = '';
      };

      var failureCallback = function(err) {
        if (err && err.status === 404) {
          alert('The email ' + $scope.signupForm.email + ' does not exist in our records.\n Try again?');
        }
      };

      $scope.user.updateAttr('forgot_password', $scope.user, $scope.signupForm.email, successCallback, $scope, failureCallback);
      LoadingService.showAmbig();
    };

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

    $scope.toggleResetModeFromLogin = function() {
      $scope.root.vars.loginMode = false;
      $scope.resetMode = !$scope.root.vars.loginMode;
      if (!$scope.root.vars.loginMode && !$scope.signupMode) {
        $scope.headerText = 'Reset Password';
      }
      $timeout(function() {
        var email_input = document.getElementById('email-input');
          if (email_input) {
            email_input.focus();
          }
      }, 500);
      $timeout(function() {
        LoadingService.hide();
      }, 750);
    };

    $scope.showActionSheetProfilePhoto = function() {

      //desktop only
      //NICK-REFACTOR
      if (!$scope.platform.mobile) {
          $scope.takePhoto(0);
          return;
      }

      var options = [{ text: 'Choose from Library' }];
      if ($scope.platform.mobile) {
        options.push({text: 'Take a Photo'});
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
    };

    $scope.takePhoto = function(index) {


      if ($scope.platform.mobile) {
        Camera.takePicture($scope, index, 'sidebar-img-photo', true);
      } else {
        var element = document.getElementById('file-input-web-sidebar');
        element.click();
      }
    };

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

        LoadingService.show();
        callbackSuccess = function() {
          LoadingService.hide();
          LoadingService.showSuccess('Saved!', 1500);
        };

        $scope.user.createObj($scope.user, 'files', formData, $scope, callbackSuccess);
    };

    $scope.toggleBackDrop = function() {

      if ($scope.backdropActive) {
        $scope.backdropActive = false;
        $ionicBackdrop.release();
      } else {
        $ionicBackdrop.retain();
      }

    };

    $scope.launchEditEmailPopup = function(target) {

      if($scope.user.email) {
        $scope.popupInput.editEmail = $scope.user.email;
      }

      PopupService.open('editEmail', callback,target);
      function callback() {
        if (Utilities.validateEmail($scope.popupInput.editEmail)) {
            $scope.user.email = $scope.popupInput.editEmail;
        } else {
          alert('Please enter a valid email.');
          return;
        }
        $scope.user.updateAttr('email', $scope.user, $scope.user.email, null, $scope);
        LoadingService.showSuccess('Saved!', 1500);
        PopupService.close('editEmail');
      }
    };

    $ionicModal.fromTemplateUrl(BASE + 'templates/payments.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.paymentsModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/notifications.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.notificationsModal = modal;
    });


    $scope.launchEditPasswordPopup = function(target) {
      //@JASON this doesn't show the LoadingService message cuz of CSS z-index issue
      PopupService.open('editPassword', callback,target);
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
            };

            LoadingService.showAmbig(null, 5000);
            var successCallback = function() {
              LoadingService.hide();
              LoadingService.showSuccess('Password Successfully Changed', 1500);
              PopupService.close('editPassword');
            };
            var failureCallback = function(resp) {
              alert('Incorrect original password. Please try again or logout & reset your password');
              // PopupService.close('editPassword');
              $scope.popupInput.editPasswordNew = '';
              $scope.popupInput.editPasswordOld = '';
            };
            $scope.user.updateAttr('change_password', $scope.user, payload, successCallback, $scope, failureCallback);
          }
          else {
            alert('Please enter a password longer than 6 characters');
            return;
          }
      }
    };

    $scope.launchEditStudentNamePopup = function(target) {

      if ($scope.user.name) {
        $scope.popupInput.editName = $scope.user.name;
      }
      PopupService.open('editName', callback,target);
      function callback() {
        if (Utilities.validateName($scope.popupInput.editName)) {
            $scope.user.name = $scope.popupInput.editName;
        } else {
          alert('Please enter your full name');
          return;
        }
        $scope.user.updateAttr('name', $scope.user, $scope.user.name, null, $scope);
        LoadingService.showSuccess('Saved!', 1500);
        PopupService.close('editName');
      }
    };

    //settings info
    $scope.editAccountInfoActionSheet = function($event) {
      var target = $event.target;
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
            buttonClicked: function(index,$event) {
              // fire profile photo
              if (index === 0) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.launchEditStudentNamePopup(target);
                }, 500);
              }

              if (index === 1) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.launchEditEmailPopup(target);
                }, 500);

              }

              if (index === 2) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.launchEditPasswordPopup(target);
                }, 500);

              }

            }
      });

    };



    $scope.transitionToUniversity = function() {
      $state.go('^.university-container');
    };

    $scope.transitionToMajor = function() {
      $state.go('^.majors-container');
    };

    $scope.goToMajorPage = function() {

      $scope.closeAttachActionSheet();
          LoadingService.show();
          $scope.transitionToMajor();
          $timeout(function() {
          LoadingService.hide();
          $ionicSideMenuDelegate.toggleRight();
      }, 1000);

    };

    $scope.showStudentEditActionSheet = function($event) {
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
                LoadingService.show();
                $timeout(function() {
                  LoadingService.hide();
                  $scope.showActionSheetProfilePhoto();
                }, 1000);
              }

              if (index === 1) {
                $scope.closeAttachActionSheet();
                LoadingService.show();
                $timeout(function() {
                  $scope.openModal('university');
                }, 0);

                $timeout(function() {
                  LoadingService.hide();
                }, 500);
              }

              if (index === 2) {
                $scope.closeAttachActionSheet();
                LoadingService.show();
                $timeout(function() {
                  $scope.editAccountInfoActionSheet($event);
                  LoadingService.hide();
                }, 1000);
              }

            }
      });
    };

    $scope.resetCache = function() {
      AdminService.resetCache();
      LoadingService.showAmbig('Resetting Cache..', 1500, function(){
        $ionicViewSwitcher.nextDirection('back');
        $state.go('^.university');
      })
    }


    $scope.resetAccount = function() {
      if (confirm('Are you sure you want to reset your admin account?')) {

        LoadingService.show();
        $scope.user.university_id = null;
        $scope.user.university = null;
        LoadingService.show();
        User.clearAttr({}, $scope.user.id).then(function(user) {
          LoadingService.hide();
          LoadingService.showSuccess(0, 2000,'Admin Account Successfully cleared!');
          $scope.logoutUser(true);
          $localstorage.setObject('user', user.plain());
          $scope.user = user.plain();
          $state.go('^.university');
        },

        function(err) {
          alert('Something went wrong - please contact Samir');
        }
        );
      }
    };


    $scope.goToGuru = function() {

      LoadingService.show();

      $timeout(function() {
          LoadingService.hide();
        }, 500);



        AnimationService.flip('^.guru');

        $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': true}, null, $scope);

        $timeout(function() {
          $scope.root.vars.guru_mode = true;
          if ($ionicSideMenuDelegate.isOpen()) {
            // $ionicSideMenuDelegate.toggleRight();
            $scope.toggleRightSideMenu();
          }
        }, 500);

    };

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

    $scope.goToStudent = function() {


      LoadingService.show();
      // AnimationService.flip();
      $timeout(function() {
          LoadingService.hide();
        }, 500);
        AnimationService.flip('^.guru-home');

      //let the server know the user was on guru mode for the next time app opens

      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': false}, null, $scope);
      $timeout(function() {
        LoadingService.hide();
      }, 1000);

      $timeout(function() {
        $scope.root.vars.guru_mode = false;
        if ($ionicSideMenuDelegate.isOpen()) {
          // $ionicSideMenuDelegate.toggleRight();
          $scope.toggleRightSideMenu();
        }
      }, 500);

      // $state.go('^.home');
    };

    $scope.showComingSoon = function() {
      $scope.progress_active = true;
          $cordovaProgress.showText(false, "Coming Soon!", 'center');
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 1000);
    };

  }


]);
