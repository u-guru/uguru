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
  'ModalService',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User,
  $rootScope, $controller, $ionicSideMenuDelegate, $cordovaPush,
  $ionicViewSwitcher, $ionicHistory, $ionicActionSheet, $ionicPopup,
  Camera, Support, University, $ionicPlatform, $ionicBackdrop, UniversityMatcher,
  AnimationService, uTracker, Utilities, PopupService, ModalService, $ionicSlideBoxDelegate,
  AdminService, InAppBrowser, DeviceService, ModalService) {
    $scope.root.vars.show_account_fields = false;
    $scope.root.vars.loginMode = false;

    ModalService.initDefaults($scope);

    $scope.launchAdminActionSheet = function() {
      var showPopup = AdminService.showActionSheet($scope);
      AdminService.closeAttachActionSheet = showPopup();
    };

//use for abstract
    $scope.openAdmin = function() {
      $state.go('admin.admin-home');
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

    $scope.openModal = function(modalName) {
      ModalService.open(modalName, $scope);
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

      var chatInputEnterButton = document.querySelectorAll('.intercom-composer-send-button')[0]
      if (chatInputEnterButton) {
        console.log(chatInputEnterButton);
        chatInputEnterButton.click();
      }

    }

    $scope.launchSupportModal = function() {

      uTracker.track(tracker, 'Support Modal');

      // nick --> this works right now the other one doesn't on ios -- playing it safe
      $scope.supportModal.show();

      // var isDevice = DeviceService.doesCordovaExist();

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

      //desktop only
      //NICK-REFACTOR
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

    $scope.takePhoto = function(index) {


      if ($scope.platform.mobile) {
        Camera.takePicture($scope, index, 'sidebar-img-photo', true);
      } else {
        var element = document.getElementById('file-input-web-sidebar')
        element.click();
      }
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

    $scope.launchEditEmailPopup = function() {

      if($scope.user.email) {
        $scope.popupInput.editEmail = $scope.user.email;
      }

      PopupService.open('editEmail', callback);
      function callback() {
        if (Utilities.validateEmail($scope.popupInput.editEmail)) {
            $scope.user.email = $scope.popupInput.editEmail
        } else {
          alert('Please enter a valid email.');
          return;
        }
        $scope.user.updateAttr('email', $scope.user, $scope.user.email, null, $scope);
        $scope.loader.showSuccess('Saved!', 1500);
        PopupService.close('editEmail');
      }
    }

    $scope.launchEditPasswordPopup = function() {

      PopupService.open('editPassword', callback);
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

            $scope.loader.show();
            var successCallback = function() {
              $scope.loader.hide();
              $scope.loader.showSuccess('Password Successfully Changed', 1500);
              PopupService.close('editPassword');
            }
            var failureCallback = function(resp) {
              $scope.loader.hide();
              $scope.defaultFallbackPlan(resp);
              $scope.loader.showSuccess('Something went wrong ... Please contact support!', 1500);
              PopupService.close('editPassword');

              $scope.user.updateAttr('change_password', $scope.user, payload, successCallback, $scope, failureCallback);
            }
          }
          else {
            alert('Please enter a password longer than 6 characters');
            return;
          }
      }
    }

    $scope.launchEditStudentNamePopup = function() {

      if ($scope.user.name) {
        $scope.popupInput.editName = $scope.user.name;
      }

      PopupService.open('editName', callback);
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
              console.log('ayy this should"ved fired NOT')
              // fire profile photo
              if (index === 0) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.launchEditStudentNamePopup();
                }, 500);
              }

              if (index === 1) {
                console.log('ayy this should"ved fired')
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
                console.log("checking");
                $timeout(function() {
                  $scope.launchUniversityModal();
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
          console.log(err);
          alert('Something went wrong - please contact Samir');
        }
        )
      }
    }


    $scope.goToGuru = function() {

      $scope.loader.show();

      $timeout(function() {
          $scope.loader.hide();
        }, 500)



        AnimationService.flip('^.guru');

        $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': true}, null, $scope);

        $timeout(function() {
          $scope.root.vars.guru_mode = true;
          if ($ionicSideMenuDelegate.isOpen()) {
            $ionicSideMenuDelegate.toggleRight();
          }
        }, 500)

    }

    $scope.goToStudent = function() {


      $scope.loader.show();
      // AnimationService.flip();

      //let the server know the user was on guru mode for the next time app opens

      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': false}, null, $scope);
      $timeout(function() {
        $scope.loader.hide();
      }, 1000)

      $timeout(function() {
        $scope.root.vars.guru_mode = false;
        if ($ionicSideMenuDelegate.isOpen()) {
          $ionicSideMenuDelegate.toggleRight();
        }
      }, 500)

      $state.go('^.home');
    }

    $scope.showComingSoon = function() {
      $scope.progress_active = true;
          $cordovaProgress.showText(false, "Coming Soon!", 'center');
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 1000);
    }


  }


]);
