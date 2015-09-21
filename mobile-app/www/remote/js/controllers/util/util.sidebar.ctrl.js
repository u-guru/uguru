angular.module('uguru.util.controllers')

.controller('SidebarController', [

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
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User,
  $rootScope, $controller, $ionicSideMenuDelegate, $cordovaPush,
  $ionicViewSwitcher, $ionicHistory, $ionicActionSheet, $ionicPopup,
  Camera, Support, University, $ionicPlatform, $ionicBackdrop, UniversityMatcher) {

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

    $scope.search_text = ($scope.user.university.name || '');
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
            $scope.success.show('')
            UniversityMatcher.clearCache();
            $timeout(function() {
              $scope.loader.show();
            }, 500)
          }, 1000);
      }

      $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);
    }

//use for abstract
    $scope.openAdmin = function() {
      $state.go('admin.admin-home');
    }

    // $scope.openAdmin = function() {
    //   $ionicViewSwitcher.nextDirection('forward');
    //   $ionicSideMenuDelegate.toggleRight();
    //   $state.go('^.admin');
    // }


    // pre-render these immediately
    $ionicModal.fromTemplateUrl(BASE + 'templates/faq.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
            $scope.faqModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.supportModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/privacy-terms.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.privacyModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.signupModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.universityModal = modal;
    });

    $scope.$on('modal.shown', function() {
      if ($scope.universityModal.isShown()) {
        $timeout(function() {
          var universityInput = document.querySelector('#university-input')
          universityInput.select();
        }, 100);
      }
    });

    $scope.launchFAQModal = function() {
      $scope.faqModal.show();
    }

    $scope.launchUniversityModal = function() {
      $scope.universityModal.show();
    }

    $scope.onTextClick = function ($event) {
      $event.target.select();
    };

    var initSupportChatEnterHandler = function() {

      var chatInputEnterButton = document.querySelectorAll('.intercom-composer-send-button')[0]
      if (chatInputEnterButton) {
        console.log(chatInputEnterButton);
        chatInputEnterButton.click();
      }

    }

    $scope.launchSupportModal = function() {
      $scope.supportModal.show();
      $timeout(function() {
        initSupportChatEnterHandler()
      }, 500);
      $scope.init
    }

    $scope.launchPrivacyModal = function() {
      $scope.privacyModal.show();
    }

    $scope.launchSignupModal = function(loginMode) {
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
        Camera.takePicture($scope, index, true);
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

    $scope.showPopupEditEmail = function() {

      $scope.data = {email:$scope.user.email};

      $scope.inputPopup = $ionicPopup.show({
          template: '<input style="padding:2px 4px;" type="text" ng-model="data.email" autofocus>',
          title: 'Edit email',
          subTitle: 'Please your main school one',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                $scope.inputPopup.close();
                $scope.user.email = $scope.data.email;


                var failureCallback = function(err) {
                  if (err.status === 401) {
                    $scope.loader.hide();
                    $scope.signupForm.password = '';
                    alert('Another account already exists with this email. Please login with that email or try again.');
                  }
                }

                var successCallback = function() {
                  $scope.loader.hide();
                  $scope.success.show(0, 1000, 'Saved!');
                }
                $scope.loader.show();

                $scope.user.updateAttr('change_email', $scope.user, $scope.user.email, successCallback, $scope, failureCallback);

              }
            }
          ]
        });
    };


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

    $scope.showPopupEditPassword = function() {
      $scope.data = {email: $scope.user.email}
      template = '<input style="padding:2px 4px; margin-bottom:4px;" type="password" ng-model="data.old_password" placeholder="old password" autofocus><input style="padding:2px 4px;" type="password" ng-model="data.new_password" placeholder="new password">'
      if ($scope.user.fb_id && !$scope.user.password) {
        template = '<input style="padding:2px 4px; margin-bottom:4px;" type="password" ng-model="data.old_password" placeholder="new password" autofocus><input style="padding:2px 4px;" type="password" ng-model="data.new_password" placeholder="confirm password">'
      }

      $scope.inputPopup = $ionicPopup.show({
          template: template,
          title: 'Change your password',
          subTitle: 'Must be longer than 6 characters',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {

                if (!$scope.data.old_password || !$scope.data.new_password || $scope.data.new_password.length < 7) {
                  alert('Please fill in all fields');
                  return;
                }

                if ($scope.data.new_password.length < 7) {
                  alert('Please create a password longer than 6 characters');
                  return;
                }

                var successCallback = function() {
                  $scope.inputPopup.close();
                  $timeout(function() {
                    $scope.success.show(0, 1000, 'Saved!');
                  }, 500);
                }

                var failureCallback = function() {
                  alert('Incorrect Password - try again?');
                }

                var payload = {
                  email : $scope.user.email,
                  new_password : $scope.data.new_password,
                  old_password: $scope.data.old_password
                }

                $scope.user.updateAttr('change_password', $scope.user, payload, successCallback, $scope, failureCallback);

              }
            }
          ]
        });

    }


    $scope.showPopupEditName = function() {

      $scope.data = {name:$scope.user.name};

      $scope.inputPopup = $ionicPopup.show({
          template: '<input style="padding:2px 4px;" type="text" ng-model="data.name" autofocus>',
          title: 'Change your try identity',
          subTitle: 'Try not to troll too hard',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.name || $scope.data.name.length < 2) {
                  alert('Please enter a valid name');
                  return;
                }
                $scope.inputPopup.close();
                $scope.user.name = $scope.data.name;
                $scope.user.updateAttr('name', $scope.user, $scope.user.name, null, $scope);
                $scope.success.show(0, 1000, 'Saved!');
              }
            }
          ]
        });
    };

    

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
                  $scope.showPopupEditEmail();
                }, 500);

              }

              if (index === 2) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.showPopupEditPassword();
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
              if (index === 0) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.showActionSheetProfilePhoto();
                }, 500);
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
                $timeout(function() {
                  $scope.editAccountInfoActionSheet();
                }, 500);
              }

            }
      });
    }



    $scope.resetAccount = function() {
      if (confirm('Are you sure you want to reset your admin account?')) {

        $scope.loader.show();
        $timeout(function() {
          $scope.loader.hide();
        }, 1000);
        $scope.user.university_id = null;
        $scope.user.university = null;
        $scope.success.show(0, 2000,'Admin Account Successfully cleared!');

        $scope.logoutUser();
        $localstorage.setObject('user', $scope.user);
        $scope.goToBeginning();
      }
    }


    $scope.goToGuru = function() {

      $scope.loader.show();

      //if no skills, courses, or majors
      if ($scope.user && (($scope.user.guru_courses.length === 0)  || ($scope.user.guru_skills.length === 0)
      || ($scope.user.majors.length === 0))  && confirm('Your guru account is not complete. Complete it?')) {
        $state.go('^.become-guru');
      } else {
        console.log('transitioning to guru mode');
        $state.go('^.guru');
      }


      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': true}, null, $scope);


      $timeout(function() {
        $scope.root.vars.guru_mode = true;
      }, 1000)
    }

    $scope.goToStudent = function() {

      //show the loader immediately
      $scope.loader.show();
      $state.go('^.home');

      //let the server know the user was on guru mode for the next time app opens
      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': false}, null, $scope);

      $timeout(function() {
        $scope.root.vars.guru_mode = false;
      }, 1000)
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
