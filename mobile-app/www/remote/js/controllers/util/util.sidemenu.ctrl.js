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
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User,
  $rootScope, $controller, $ionicSideMenuDelegate, $cordovaPush,
  $ionicViewSwitcher, $ionicHistory, $ionicActionSheet, $ionicPopup,
  Camera, Support, University, $ionicPlatform, $ionicBackdrop, UniversityMatcher,
  AnimationService, uTracker) {

    $scope.root.vars.show_account_fields = false;
    $scope.root.vars.loginMode = false;

    //temporary --> Learn resolves && inject properly
    //** Start University Functions ** //
    var queryTimeout = false;
    var emptyTimeout = false;
    $scope.query = function(input) {
      if(!queryTimeout) {
        queryTimeout = true;
        //$scope.universities = Utilities.nickMatcher(input, University.getTargetted());
        $scope.universities = UniversityMatcher.cachedMatch(input);
        $timeout(function() {queryTimeout = false;}, 600);
      }
      else if(input.length === 0) {
        if(!emptyTimeout) {
          emptyTimeout = true;
          $scope.universities = UniversityMatcher.cachedMatch(input);
          $timeout(function() {emptyTimeout = false;}, 600);
        }
      }

    }

    var schoolList = document.querySelectorAll('#school-list')[0];

    $scope.search_text = '' || ($scope.user.university && $scope.user.university.name);
    $scope.location = false;
    $scope.universities = University.getTargetted();

    sortByRank(University.getTargetted());
    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.limit < $scope.universities.length) {
        $scope.limit += 10;
      }
    }

    function sortByRank(list) {
      function compareRank(a, b) {
        if (a.rank < b.rank)
          return -1;
        if (a.rank > b.rank)
          return 1;

        return 0;
      }
      return list.sort(compareRank);
    }

    $scope.universitySelected = function(university, $event) {

      //if user is switching universities
      if ($scope.user.university_id
          && university.id !== $scope.user.university_id
          && !confirm('Are you sure? Your current courses will be deactivated'))
      {
          return;
      }

      $scope.loader.show();
      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.search_text = '';

      //update user to locat storage
      $scope.rootUser.updateLocal($scope.user);

      var payload = {
        'university_id': $scope.user.university_id
      };

      //save university
      var postUniversitySelectedCallback = function() {
          $timeout(function() {
            $scope.loader.hide();
            $scope.success.show(0, 1000, 'Saved!');
            UniversityMatcher.clearCache();
          }, 1000);
      }

      $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);
    }

//use for abstract
    $scope.openAdmin = function() {
      $state.go('admin.admin-home');
    }


    // pre-render these immediately
    $ionicModal.fromTemplateUrl(BASE + 'templates/faq.modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: false,
    }).then(function(modal) {
            $scope.faqModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: false,
    }).then(function(modal) {
        $scope.supportModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/privacy-terms.modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: false,
    }).then(function(modal) {
        $scope.privacyModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: false,
    }).then(function(modal) {
        $scope.signupModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: false,
    }).then(function(modal) {
        $scope.universityModal = modal;

        uTracker.track(tracker, 'University Modal');
    });

    // $scope.$on('modal.shown', function() {
    //   if ($scope.universityModal.isShown()) {
    //     $timeout(function() {
    //       var universityInput = document.querySelector('#university-input')
    //       universityInput.select();
    //     }, 100);
    //   }
    // });

    $scope.launchFAQModal = function() {

      uTracker.track(tracker, 'FAQ Modal');
      $scope.faqModal.show();
    }

    $scope.launchUniversityModal = function() {
      $scope.universityModal.show();
    }

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
      $scope.supportModal.show();
      $timeout(function() {
        initSupportChatEnterHandler()
      }, 500);
      $scope.init
    }

    $scope.launchPrivacyModal = function() {


      uTracker.track(tracker, 'Privacy Modal');
      $scope.privacyModal.show();
    }

    $scope.launchSignupModal = function(loginMode) {
      uTracker.track(tracker, 'Signup Modal');
      if (loginMode)  {
        $scope.root.vars.loginMode = true;
      }
      $scope.signupModal.show();
    }

    $scope.attemptToResetPassword = function() {
      function validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

      if (!validateEmail($scope.signupForm.email)) {
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
          $scope.success.show(0, 1500, 'Saved!');
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

    var saveEditEmailPopup, closeEditStudentNamePopup;
    $scope.launchEditEmailPopup = function() {

        var homeCenterComponent = document.getElementById('student-sidebar-profile');
        var uguruPopup = document.getElementById('edit-email-uguru-popup');
        var editEmailInput = document.getElementById('user-edit-email-input')
        var uguruPopupCloseLink = document.getElementById('edit-email-close-popup-link');
        var uguruPopupSaveLink = document.getElementById('edit-email-save-popup-link');

        uguruPopupCloseLink.addEventListener("click", function(event) {
          var uguruPopup = document.getElementById('edit-email-uguru-popup');
          uguruPopup.classList.remove('show');
        })

        uguruPopupSaveLink.addEventListener("click", function(event) {
          var editEmailInput = document.getElementById('user-edit-email-input')

            if (editEmailInput && editEmailInput.value.length) {
                $scope.user.email = editEmailInput.value;
            } else {
              alert('Please enter your full name');
              return;
            }
            $scope.user.updateAttr('email', $scope.user, $scope.user.email, null, $scope);
            $scope.success.show(0, 1000, 'Saved!');
            var uguruPopup = document.getElementById('edit-email-uguru-popup');
            uguruPopup.classList.remove('show');
        })
        //todo learn how to inject inputs in
        if (editEmailInput) {
          editEmailInput.value = $scope.user.email;
        }
        $scope.reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {duration:1},
          function (modal){
            modal.classList.add('show');
          }
        );

        var closeEditStudentNamePopup = function() {

          var uguruPopup = document.getElementById('edit-email-uguru-popup');
          uguruPopup.classList.remove('show');
        }


        var saveEditEmailPopup = function() {

            // old school ng-modal was being funky
            var editEmailInput = document.getElementById('user-edit-email-input')

            if (editEmailInput && editEmailInput.value.length) {
                $scope.user.email = editEmailInput.value;
            } else {
              alert('Please enter your full name');
              return;
            }
            $scope.user.updateAttr('email', $scope.user, $scope.user.email , null, $scope);
            $scope.success.show(0, 1000, 'Saved!');
            var uguruPopup = document.getElementById('edit-email-uguru-popup');
            uguruPopup.classList.remove('show');
        }

      }


    var saveEditPasswordPopup, closeEditPasswordPopup;
    $scope.launchEditPasswordPopup = function() {

        var homeCenterComponent = document.getElementById('student-sidebar-profile');
        var uguruPopup = document.getElementById('edit-password-uguru-popup');
        var editPasswordInput = document.getElementById('user-edit-password-input')
        var editNewPasswordInput = document.getElementById('user-edit-password-input')
        var uguruPopupCloseLink = document.getElementById('edit-password-close-popup-link');
        var uguruPopupSaveLink = document.getElementById('edit-password-save-popup-link');
        uguruPopupCloseLink.addEventListener("click", function(event) {
          var uguruPopup = document.getElementById('edit-password-close-popup-link');
          uguruPopup.classList.remove('show');
        })
        uguruPopupSaveLink.addEventListener("click", function(event) {



                var editPasswordInput = document.getElementById('user-edit-password-input');
                var editNewPasswordInput = document.getElementById('user-edit-password-input')


                if (!editPasswordInput.value.length || !editNewPasswordInput.value.length) {
                      alert('Please fill in all fields');
                      return;
                }

                if (editNewPasswordInput.value.length < 7) {

                      alert('Please enter a password longer than 7 characters');
                      return;

                }


                var payload = {
                    email : $scope.user.email,
                    new_password : editNewPasswordInput.value,
                    old_password: editPasswordInput.value
                }


                $scope.loader.show();
                var successCallback = function() {

                  $scope.loader.hide();
                  $scope.success.show(0, 1000, 'Password Successfully Changed');
                  $timeout(function() {
                    var uguruPopup = document.getElementById('edit-password-uguru-popup');
                    uguruPopup.classList.remove('show');
                  }, 500)
                }


                var failureCallback = function(resp) {
                  $scope.loader.hide();
                  $scope.success.show(0, 1000, 'Something went wrong ... Please contact support!');
                  $timeout(function() {
                    var uguruPopup = document.getElementById('edit-password-uguru-popup');
                    uguruPopup.classList.remove('show');
                  }, 500);
                }

                $scope.user.updateAttr('change_password', $scope.user, payload, successCallback, $scope, failureCallback);

        })


        $scope.reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {duration:1},
          function (modal){
            modal.classList.add('show');
          }
        );



      }



    var saveEditNamePopup, closeEditStudentNamePopup;
    $scope.launchEditStudentNamePopup = function() {

        var homeCenterComponent = document.getElementById('student-sidebar-profile');
        var uguruPopup = document.getElementById('edit-name-uguru-popup');
        var editNameInput = document.getElementById('user-edit-name-input')
        var uguruPopupCloseLink = document.getElementById('edit-name-close-popup-link');
        var uguruPopupSaveLink = document.getElementById('edit-name-save-popup-link');
        uguruPopupCloseLink.addEventListener("click", function(event) {
          var uguruPopup = document.getElementById('edit-name-uguru-popup');
          uguruPopup.classList.remove('show');
        })
        uguruPopupSaveLink.addEventListener("click", function(event) {
          var editNameInput = document.getElementById('user-edit-name-input')

            if (editNameInput && editNameInput.value.length) {
                $scope.user.name = editNameInput.value;
            } else {
              alert('Please enter your full name');
              return;
            }
            $scope.user.updateAttr('name', $scope.user, $scope.user.name, null, $scope);
            $scope.success.show(0, 1000, 'Saved!');
            var uguruPopup = document.getElementById('edit-name-uguru-popup');
            uguruPopup.classList.remove('show');
        })
        //todo learn how to inject inputs in
        if (editNameInput) {
          editNameInput.value = $scope.user.name;
        }
        $scope.reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {duration:1},
          function (modal){
            modal.classList.add('show');
          }
        );

        var closeEditStudentNamePopup = function() {
          if ($scope.reverseAnimatePopup) {
            $scope.reverseAnimatePopup();
          }
          var uguruPopup = document.getElementById('edit-name-uguru-popup');
          uguruPopup.classList.remove('show');
        }


        var saveEditNamePopup = function() {

            var editNameInput = document.getElementById('user-edit-name-input')

            if (editNameInput && editNameInput.value.length) {
                $scope.user.name = editNameInput.value;
            } else {
              alert('Please enter your full name');
              return;
            }
            $scope.user.updateAttr('name', $scope.user, $scope.user.name, null, $scope);
            $scope.success.show(0, 1000, 'Saved!');
            var uguruPopup = document.getElementById('edit-name-uguru-popup');
            uguruPopup.classList.remove('show');
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
                $scope.launchUniversityModal();
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
          $scope.logoutUser();
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



        AnimationService.flip();

        $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': true}, null, $scope);
        $timeout(function() {
          $scope.loader.hide();
        }, 1000)

        $timeout(function() {
          $scope.root.vars.guru_mode = true;
          if ($ionicSideMenuDelegate.isOpen()) {
            $ionicSideMenuDelegate.toggleRight();
          }
        }, 500)

        $state.go('^.guru');
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
