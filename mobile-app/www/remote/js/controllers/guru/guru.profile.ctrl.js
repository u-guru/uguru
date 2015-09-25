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
    $scope.root.vars.guru_mode = true;

    // credibility only variable
    $scope.activeTabIndex = 0;

    $scope.user_skills = [{name: "CSS3"}, {name: "Javascript"}, {name: "Photoshop"}, {name: "HTML5"}];
    $scope.user.languages = $scope.user.languages || [{name:"English"}, {name:"Chinese"}];

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
    console.log($scope.user);
    $scope.launchAddGuruExperienceModal = function(experience) {

      $ionicModal.fromTemplateUrl(BASE + 'templates/guru.experiences.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            if (experience) {
              $scope.experience = experience;
            } else {
              $scope.experience = {
                name: '',
                description: '',
                years: 1
              }
            }
            $scope.guruExperiencesModal = modal;
            $scope.guruExperiencesModal.show();
      });
    }

    $scope.launchMajorModal = function() {
      $scope.loader.show();
      $ionicModal.fromTemplateUrl(BASE + 'templates/majors.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.majorModal = modal;
            $timeout(function() {
              $scope.loader.hide();
            }, 500)
            $scope.majorModal.show();
      });
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/majors.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruMajorModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.courses.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruCoursesModal = modal;
    })

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.skills.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruSkillsModal = modal;
    })

    $scope.launchGuruSkillsModal = function() {
      $scope.guruSkillsModal.show();
    }

    $scope.launchGuruCoursesModal = function() {
      $scope.guruCoursesModal.show();
    }

    $scope.launchGuruMajorsModal = function() {
      $scope.guruMajorModal.show();
    }


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
      $timeout(function() {
        $scope.profile.edit_mode = false;
      }, 500)
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

    // start confirm email popup
    $scope.launchConfirmEmailPopup = function() {
        var launchConfirmEmailPopupButton = document.getElementById('launch-email-confirm-popup');
        var uguruPopup = document.getElementById('confirm-email-uguru-popup');

        var uguruPopupCloseLink = document.getElementById('confirm-email-close-popup-link');
        var uguruPopupSaveLink = document.getElementById('confirm-email-save-popup-link');

        $scope.reverseAnimatePopup = cta(launchConfirmEmailPopupButton, uguruPopup, {duration:1},
          function (modal){
            modal.classList.add('show');
          }
        );

        uguruPopupCloseLink.addEventListener("click", function(event) {
          var uguruPopup = document.getElementById('confirm-email-uguru-popup');
          uguruPopup.classList.remove('show');
        })

        uguruPopupSaveLink.addEventListener("click", function(event) {
          var editEmailInput = document.getElementById('user-confirm-email-input')
            if (!editEmailInput.value) {
              alert('Please enter a valid email');
              return;
            }


            var uguruPopup = document.getElementById('confirm-email-uguru-popup');
            uguruPopup.classList.remove('show');

            $scope.user.school_email = editEmailInput.value;
            $scope.user.updateAttr('confirm_school_email', $scope.user, editEmailInput.value, null, $scope);
            $scope.success.show(0, 1500, 'Email sent to ' + editEmailInput.value);

        })

      }
    /** end confirm email popup **/


    /** START Launch confirm phone number popup**/

    $scope.confirmPhonePopup = function() {

        var launchConfirmPhonePopupButton = document.getElementById('launch-phone-confirm-popup');
        var uguruPopup = document.getElementById('confirm-phone-uguru-popup');

        var uguruPopupCloseLink = document.getElementById('confirm-phone-close-popup-link');

        //opens the popup
        $scope.reverseAnimatePopup = cta(launchConfirmPhonePopupButton, uguruPopup, {duration:1},
          function (modal){
            modal.classList.add('show');
            $timeout(function() {
              initPopupListeners();
            }, 1500);
          }
        );

        var initPopupListeners = function() {

            if (!$scope.user.phone_number_token) {
              var sendConfirmCode = document.getElementById('send-confirm-code');

                //send the confirmation code
              sendConfirmCode.addEventListener("click", function(event) {

                validateAndSendPhoneConfirmation();

              });

            } else {
              var resendConfirmCode = document.getElementById('resend-confirm-code');
              var verifyConfirmCode = document.getElementById('verify-confirm-code');

                //resend the confirmation code
              resendConfirmCode.addEventListener("click", function(event) {

                resendPhoneConfirmation();

              });

              //verify the confirmation code
              verifyConfirmCode.addEventListener("click", function(event) {

                validateAndSendPhoneConfirmation()

              });

            }

              //close the popup
            uguruPopupCloseLink.addEventListener("click", function(event) {
              var uguruPopup = document.getElementById('confirm-phone-uguru-popup');
              uguruPopup.classList.remove('show');
            })

        }


      }
      /** End phone number confirmation **/

    var resendPhoneConfirmation = function() {

      var phoneNumberInput = document.getElementById('phone-number-input');

      //validate
      if (!phoneNumberInput.value || !(phoneNumberInput.value >= 10)) {
          alert('Please enter valid phone number');
          return;
      }


          $scope.user.updateAttr('phone_number_generate', $scope.user, phoneNumberInput.value, null, $scope);
          var msg = 'New code re-sent to ' + $scope.data.phone;
          $scope.success.show(0, 1500, msg);
    }

    var closeConfirmPhonePopup = function() {
      var uguruPopup = document.getElementById('confirm-phone-uguru-popup');
      uguruPopup.classList.remove('show');
    }



    var validateAndSendPhoneConfirmation = function() {
      var phoneNumberInput = document.getElementById('phone-number-input');
      var confirmationCodeInput = document.getElementById('confirm-code-input');
      console.log(phoneNumberInput);
      //validate
      if (!phoneNumberInput.value || !(phoneNumberInput.value >= 10)) {
          alert('Please enter valid phone number');
          return;
      }

      //if user hasn't typed in a token & clicked verify [resend exists]
      if ($scope.user.phone_number && $scope.user.phone_number_token && (!confirmationCodeInput.value || confirmationCodeInput.value.length < 4)) {
        alert('Please enter a 4 digit code');
        return;
      }

      //if user hasn't received a token yet & is sending for the first time [resend doesn't exist]
      if (phoneNumberInput.value && !$scope.user.phone_number_token && !confirmationCodeInput.value) {
        $scope.user.phone_number_token = true;
        $timeout(function() {
          $scope.user.phone_number = phoneNumberInput.value;
        }, 500)
        $scope.user.updateAttr('phone_number_generate', $scope.user, phoneNumberInput.value, null, $scope);
        var msg = 'Code sent to ' + phoneNumberInput.value;
        $scope.success.show(0, 1500, msg);
        return;
      }
      //success
      if ($scope.user.phone_number && confirmationCodeInput.value && confirmationCodeInput.value.length === 4) {

        var callbackSuccess = function() {
          $scope.loader.hide();
          if ($scope.user.phone_number_confirmed) {
            $scope.success.show(0, 2000, 'Verification Code confirmed!')
          } else {
            $scope.success.show(0, 2000, 'Invalid Code - please try again?');
          }
          return;
        }

        var uguruPopup = document.getElementById('confirm-phone-uguru-popup');
        uguruPopup.classList.remove('show');

        $scope.loader.show();
        $scope.user.updateAttr('phone_number_check_token', $scope.user, confirmationCodeInput.value, callbackSuccess, $scope);

      }
    }


  }

]);