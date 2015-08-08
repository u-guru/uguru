angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruProfileController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$stateParams',
  '$ionicHistory',
  'Camera',
  '$ionicSideMenuDelegate',
  '$ionicActionSheet',
  '$cordovaFacebook',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, Camera, $ionicSideMenuDelegate,
  $ionicActionSheet, $cordovaFacebook) {

    $scope.profile = {edit_mode:false, showCredibility:false};
    if (!$scope.root.vars.profile) {
      $scope.root.vars.profile = false;
    }

    $scope.initHourlyMax = function() {
      if (!$scope.user.max_hourly) {
        $scope.user.max_hourly = 10;
      } else {
        $scope.user.max_hourly = parseInt($scope.user.max_hourly);
      }

      $scope.maxHourlyOptions = [{label:'free', id:0}];
      for (var i = 1; i <= $scope.user.max_hourly; i++ ) {
        $scope.maxHourlyOptions.push({label:i,id:i})
      }
      $scope.selectedOption = $scope.maxHourlyOptions[$scope.user.max_hourly];
    }

    $scope.editGuruIntro = function() {
      $scope.profile.intro_edit_mode = true;
      var textareaIntro = document.getElementById('guru-introduction-text');
      textareaIntro.focus();
      $timeout(function() {
        textareaIntro.setSelectionRange(0, textareaIntro.value.length);
      }, 100)
    }

    $scope.saveGuruIntroduction = function() {
      $scope.loader.show();
      $scope.user.updateAttr('guru_introduction', $scope.user, $scope.user.guru_introduction, null, $scope);
      $scope.profile.intro_edit_mode = false;
      $timeout(function() {
        $scope.loader.hide();
        $scope.success.show(250, 1000, 'Saved!');
      }, 500);
    }

    $scope.initLateNightOptions = function() {
      $scope.lateNightMappingOptions = [{id:0, name:'before 10pm'}, {id:1, name:'10pm'}, {id: 2, name:'11pm'}, {id:3, name:'12am'}, {id:4, name:'1am'}, {id:5, name:'2am'}, {id:6, name:'3am'}, {id:7, name:'4am'}, {id:8, name:'24/7'}];
      if (!$scope.user.guru_latest_time) {
        $scope.user.guru_latest_time = 1;
      } else {
        $scope.user.guru_latest_time = parseInt($scope.user.guru_latest_time);
      }
      $scope.selectedOptionLateNight = $scope.lateNightMappingOptions[$scope.user.guru_latest_time];
    }

    //initialize it
    $scope.initHourlyMax();
    $scope.initLateNightOptions();


    $scope.lateNightOnChange = function() {
      $scope.success.show(0, 750, 'Saved!');
      $timeout(function() {
        var e = document.getElementById("late-night-select");
        e.blur();
        $scope.user.guru_latest_time = e.selectedIndex;
        $scope.user.updateAttr('guru_latest_time', $scope.user, $scope.user.guru_latest_time, null, $scope);

      }, 500);


        var options = document.getElementsByTagName('option');
        var selIndex = document.getElementById("late-night-select").selectedIndex;

        for (var i = 0, length = options.length; i < length; i++) {
             if(i==selIndex) {
                options[i].style.backgroundColor = 'white';
             }
             else {
                options[i].style.backgroundColor = 'white';
             }
        }

    }

    $scope.maxHourlyOnChange = function(options) {
      $scope.success.show(0, 750, 'Saved!');
      $timeout(function() {
        var e = document.getElementById("max-hourly-select");
        e.blur();
        var strUser = e.options[e.selectedIndex].text;
        $scope.user.max_hourly = parseInt(strUser);
        $scope.user.updateAttr('max_hourly', $scope.user, $scope.user.max_hourly, null, $scope);

        var options = document.getElementsByTagName('option');
        var selIndex = document.getElementById("max-hourly-select").selectedIndex;

        for (var i = 0, length = options.length; i < length; i++) {
             if(i==selIndex) {
                options[i].style.backgroundColor = 'white';
             }
             else {
                options[i].style.backgroundColor = 'white';
             }
        }
      }, 500);
    };

    $scope.transitionToMajor = function() {
      $state.go('^.majors-container');
    }

    $scope.transitionToGuruRemote = function() {
      $state.go('^.guru-remote');
    }

    $scope.transitionToGuruExperiences = function() {
      $state.go('^.guru-experiences');
    }

    $scope.transitionToGuruLanguages = function() {
      $state.go('^.guru-languages');
    }

    $scope.transitionToGuruCourses = function() {
      $state.go('^.guru-courses-container');
    }

    $scope.saveTutoringPlatformsAndCloseModal = function() {
      $scope.loader.show();
      $timeout(function() {
        $scope.tutoringPlatformsModal.hide();
      }, 500);

      var successCallback = function() {
        $scope.loader.hide();
        $scope.success.show(0, 1000, 'Saved!');
      }
      $scope.user.updateAttr('tutoring_platforms_description', $scope.user, $scope.user.tutoring_platforms_description, successCallback , $scope);
    }

     $scope.launchAddTutoringPlatformsModal = function(experience) {

      $ionicModal.fromTemplateUrl(BASE + 'templates/guru.tutor-platforms.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.tutoringPlatformsModal = modal;
            $scope.tutoringPlatformsModal.show();
      });
    }

    $scope.$on('modal.shown', function() {
      if ($scope.tutoringPlatformsModal.isShown()) {
        $timeout(function() {
          var tutorPlatformsInput = document.getElementById('tutoring-platforms-input');
          tutorPlatformsInput.focus();
        }, 500)
      }
    });

    $scope.connectWithFacebook = function() {
      $cordovaFacebook.login(["email","public_profile","user_friends"]).then(function (success) {

        $scope.loader.show();

        var successCallback = function() {
          $scope.loader.hide();
          $scope.success.show(0, 1000, 'FB Account Saved');
        }
        var failureCallback = function(err) {
          $scope.loader.hide();
          if (err.status === 401) {
            $scope.signupForm.password = '';
            $scope.success.show(0, 1000, 'FB Account has another account - please contact support');
          }
        }

        $scope.user.updateAttr('fb_id', $scope.user, success.authResponse.accessToken, successCallback , $scope, failureCallback);
      })
    }

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.goToUniversity = function() {
      $scope.loader.show();
      $state.go('^.university-container');
      $timeout(function() {
        $scope.loader.hide();
      }, 500);
    }



    $scope.saveGuruProfile = function() {
      $scope.success.show(0, 1500, 'Profile Successfully Saved');
      $scope.root.vars.profile.edit_mode = !$scope.root.vars.profile.edit_mode;
    }

    $scope.showActionSheetTranscriptPhoto = function() {

      //desktop only
      if (!$scope.platform.mobile) {
          $scope.takeTranscriptPhoto(0);
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
          $scope.takeTranscriptPhoto(index);

          $timeout(function() {
              $scope.closeAttachActionSheet();
          }, 500);
       }
     });
    }

    $scope.showActionSheetProfilePhoto = function() {

      //desktop only
      if (!$scope.platform.mobile) {
          $scope.takeProfilePhoto(0);
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
          $scope.takeProfilePhoto(index);
          $timeout(function() {
              $scope.closeAttachActionSheet();
          }, 500);
       }
     });
    }


    $scope.takeProfilePhoto = function(index) {


      if ($scope.platform.mobile) {
        $scope.root.vars.profile_url_changed = true;
        Camera.takePicture($scope, index, true);
      } else {
        var element = document.getElementById('file-input-guru-edit-profile')
        element.click();
      }
    }

    $scope.takeTranscriptPhoto = function(index) {


      if ($scope.platform.mobile) {
        Camera.takePicture($scope, index, true, $scope.user.id);
      } else {
        var element = document.getElementById('file-input-guru-add-transcript');
        element.click();
      }
    }

    $scope.file_changed_profile = function(element) {
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

    $scope.file_changed_transcript = function(element) {
        var photofile = element.files[0];

        var reader = new FileReader();


        var image = document.getElementById('become-guru-profile');

        reader.onload = function(e) {
            if ($scope.user.transcript_file) {
              $scope.user.transcript_file.url = e.target.result;
            }
        };

        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);
        formData.append('transcript_url', $scope.user.id);

        formData.append('filename', name);

        $scope.file_index += 1;

        $scope.loader.show();
        callbackSuccess = function() {
          $scope.loader.hide();
          $scope.success.show(0, 1500, 'Saved!');
        }
        $scope.root.vars.transcript_url_changed = true;
        $scope.user.createObj($scope.user, 'files', formData, $scope, callbackSuccess);
    };

    var generatePhonePopupHtml = function() {
      return '<input style="padding:2px 6px; margin-bottom:0.5em" type="text" ng-model="data.phone" placeholder="123-456-7890">\
      <input style="padding:2px 6px;" type="text" ng-show="user.phone_number && user.phone_number.length && user.phone_number_token" ng-model="data.token" placeholder="Enter 4-digit numerical code ">'
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
                    $scope.loader.hide();
                    if ($scope.user.phone_number_confirmed) {
                      $scope.success.show(0, 2000, 'Verification Code confirmed!')
                    } else {
                      $scope.success.show(0, 2000, 'Invalid Code - please try again?');
                    }
                    return;
                  }

                  $scope.loader.show();
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
            subTitle: 'Try not to troll too hard',
            scope: $scope,
            buttons: buttons
          });
    }

    $scope.showPopupEditEmail = function() {

      if ($scope.user.email && $scope.user.email.indexOf('.edu') !== -1) {
        $scope.user.school_email = $scope.user.email;
        $scope.user.updateAttr('school_email', $scope.user, $scope.user.school_email, null, $scope);
      }

      $scope.data = {email: $scope.user.school_email};

      $scope.inputPopup = $ionicPopup.show({
          template: '<input style="padding:2px 4px;" type="text" ng-model="data.email">',
          title: 'Confirm Email',
          subTitle: 'Please enter your <strong> school email </strong> <br>(.edu one)',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Send</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.email) {
                  alert('Please enter a valid email');
                  return;
                }
                $scope.inputPopup.close();
                $scope.user.school_email = $scope.data.email;
                $scope.user.updateAttr('confirm_school_email', $scope.user, $scope.data.email, null, $scope);
                $scope.success.show(0, 2000, 'Email sent to ' + $scope.data.email);
              }
            }
          ]
        });
    };

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
                $scope.inputPopup.close();
                $scope.user.name = $scope.data.name;
                $scope.user.updateAttr('name', $scope.user, $scope.user.name, null, $scope);
                $scope.success.show(0, 1000, 'Saved!');
              }
            }
          ]
        });
    };

     document.addEventListener("resume", function() {


          if ($scope.user.active_proposals && $scope.user.active_proposals.length > 0) {

                    $ionicViewSwitcher.nextDirection('enter');
                    $state.go('^.guru');
          }


    }, false);

     $scope.active_questions = $scope.user.active_questions;

     $scope.$on('$ionicView.enter', function() {

        $scope.$apply();
        if ($scope.user.active_proposals && $scope.user.active_proposals.length > 0) {

                    $ionicViewSwitcher.nextDirection('enter');
                    $state.go('^.guru');
        }

        var options = document.getElementsByTagName('option');


        for (var i = 0, length = options.length; i < length; i++) {
            options[i].style.backgroundColor = 'white';
        }


    });


  }

]);
