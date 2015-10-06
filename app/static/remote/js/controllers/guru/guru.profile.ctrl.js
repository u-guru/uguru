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
  'uTracker',
  'University',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, Camera, $ionicSideMenuDelegate,
  $ionicActionSheet, $cordovaFacebook, uTracker, University) {

    $scope.profile = {edit_mode:false, showCredibility:false};
    $scope.root.vars.guru_mode = true;

    // credibility only variable
    $scope.activeTabIndex = 0;
    $scope.profile.edit_mode = true;


    // $scope.user.languages = $scope.user.languages || [{name:"English"}, {name:"Chinese"}];

    if (!$scope.root.vars.profile) {
      $scope.root.vars.profile = false;
    }

    function validateEmail(email) {
                  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                  return re.test(email);
    }

    var validateEmailAndSend = function() {

      var editEmailInput = document.getElementById('user-confirm-email-input')

      if (!editEmailInput.value) {
        alert('Please enter a valid email');
        return;
      }

      var uguruPopup = document.getElementById('confirm-email-uguru-popup');
      uguruPopup.classList.remove('show');

      $scope.user.school_email = editEmailInput.value;
      $scope.user.updateAttr('confirm_school_email', $scope.user, editEmailInput.value, null, $scope);
      $scope.loader.showSuccess('Email sent to ' + editEmailInput.value, 1500);
    }

    $scope.checkStatus = function() {
      $scope.doRefresh();
      $scope.loader.showAmbig();
      $timeout(function() {
        if ($scope.user.school_email_confirmed) {
          $scope.loader.showSuccess($scope.user.school_email + ' confirmed', 1500);
        } else {
          if (confirm('Resend email to ' + $scope.user.school_email + '?')) {
            var successCallback = function() {
              $scope.loader.showSuccess('Email successfully sent to' + $scope.user.school_email, 2000);
            }
            $scope.user.updateAttr('confirm_school_email', $scope.user, editEmailInput.value, successCallback, $scope);
          }
        }
      }, 1500);
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

    $scope.removeMajor = function(major, index) {

      if (!confirm('Remove ' + (major.code || major.name || major.title || major.abbr) + '?')) {
        return;
      }


      University.majors.push(major);
      $scope.user.majors.splice(index,1);

      var confirmCallback = function() {

        uTracker.track(tracker, 'Major Removed', {
          '$Major': (major.code || major.name || major.title || major.abbr)
        });
        $scope.success.show(0, 2000, (major.code || major.name || major.title || major.abbr) + ' successfully removed');
      }

      $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);

    }

    $scope.removeGuruSubcategory = function(subcategory) {
      if (!confirm('Remove ' + subcategory.name + '?')) {
        return;
      }

      $scope.user.updateAttr('remove_guru_subcategory', $scope.user, subcategory, null, $scope);

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

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.skills.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruSkillsModal = modal;
    })

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.languages.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruLanguagesModal = modal;
    })

    $scope.launchGuruSkillsModal = function() {
      $scope.guruSkillsModal.show();
    }

    $scope.launchGuruCoursesModal = function() {
      $scope.guruCoursesModal.show();
      $timeout(function() {
        $scope.guruCoursesInput = document.querySelector('#course-input-2');
      }, 250)
    }

    $scope.launchGuruMajorsModal = function() {
      $scope.guruMajorModal.show();
      $timeout(function() {
        $scope.majorInput = document.querySelector('#major-input-2');
      }, 250)
    }

    $scope.launchGuruLanguagesModal = function() {
      $scope.guruLanguagesModal.show();
      $timeout(function() {
        $scope.languageInput = document.querySelector('#language-input')
      }, 250)
    }

    $scope.connectWithFacebook = function() {
      $scope.loader.show();
      $cordovaFacebook.login(["email","public_profile","user_friends"]).then(function (success) {
        alert('is successful');
        var successCallback = function() {
          $scope.loader.hide();
          $scope.loader.showSuccess('FB Account Saved', 2000);
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
        $timeout(function() {

          uguruPopupCloseLink.addEventListener("click", function(event) {
            var uguruPopup = document.getElementById('confirm-email-uguru-popup');
            uguruPopup.classList.remove('show');
          })

          uguruPopupSaveLink.addEventListener("click", function(event) {

              validateEmailAndSend()

          })

        }, 1000);

      }
    /** end confirm email popup **/


    /** START Launch confirm phone number popup**/
    var launchConfirmPhonePopupButton, uguruPopup, resendConfirmCode, verifyConfirmCode, uguruPopupCloseLink, sendConfirmCode;
    $scope.confirmPhonePopup = function() {

        launchConfirmPhonePopupButton = document.getElementById('launch-phone-confirm-popup');
        uguruPopup = document.getElementById('confirm-phone-uguru-popup');

        //opens the popup


        var initPopupListeners = function() {

          resendConfirmCode = document.getElementById('resend-confirm-code');
          verifyConfirmCode = document.getElementById('verify-confirm-code');
          uguruPopupCloseLink = document.getElementById('confirm-phone-close-popup-link');
          sendConfirmCode = document.getElementById('send-confirm-code');
                //send the confirmation code

            if (sendConfirmCode) {
              sendConfirmCode.addEventListener("click", function(event) {

                $scope.validateAndSendPhoneConfirmation();

              });
            }

            if (resendConfirmCode) {
                //resend the confirmation code
              resendConfirmCode.addEventListener("click", function(event) {

                $scope.resendPhoneConfirmation();

              });
            }

              //verify the confirmation code
              verifyConfirmCode.addEventListener("click", function(event) {
                $scope.validateAndSendPhoneConfirmation()
              });

              //close the popup
            uguruPopupCloseLink.addEventListener("click", function(event) {
              var uguruPopup = document.getElementById('confirm-phone-uguru-popup');
              uguruPopup.classList.remove('show');
            })

        }

        $scope.reverseAnimatePopup = cta(launchConfirmPhonePopupButton, uguruPopup, {duration:1},
          function (modal){
            modal.classList.add('show');
            $timeout(function() {
              initPopupListeners();
            }, 1500);
          }
        );

        $timeout(function() {
          initPopupListeners();
        }, 500)


      }
      /** End phone number confirmation **/

    $scope.removeGuruCourseAndUpdate = function(course, index) {

      var removedCourse = $scope.user.guru_courses.splice(index, 1);

      $scope.loader.show();
      $timeout(function() {
        $scope.loader.hide();
        $scope.loader.showSuccess(course.name + ' successfully removed', 2000);
      }, 700)

      //update local user object
      $localstorage.setObject('user', $scope.user);

      //update server user object
      $scope.loader.show();
      $timeout(function() {
        $scope.user.updateAttr('remove_guru_course', $scope.user, course, null, $scope);
      }, 200);

    }

    $scope.resendPhoneConfirmation = function() {

      var phoneNumberInput = document.getElementById('phone-number-input');

      //validate
      if (!phoneNumberInput.value || !(phoneNumberInput.value >= 10)) {
          alert('Please enter valid phone number');
          return;
      }


          $scope.user.updateAttr('phone_number_generate', $scope.user, phoneNumberInput.value, null, $scope);

          $scope.closeConfirmPhonePopup();
          $scope.loader.show();
          $timeout(function() {
            $scope.loader.hide();
            var msg = 'New code re-sent to ' + phoneNumberInput.value;
            $scope.success.show(0, 2500, msg);
          }, 1000)
    }

    $scope.resendCode = function() {
      $scope.resendPhoneConfirmation();
    }

    $scope.verifyCode = function() {
      verifyPhoneCode();
    }

    $scope.closeUguruPopup = function() {

      var uguruPopup = document.getElementById('confirm-phone-uguru-popup');
      uguruPopup.classList.remove('show');

    }

    $scope.closeConfirmPhonePopup = function() {
      var uguruPopup = document.getElementById('confirm-phone-uguru-popup');
      uguruPopup.classList.remove('show');
    }



    $scope.validateAndSendPhoneConfirmation = function() {
      var phoneNumberInput = document.getElementById('phone-number-input');
      var confirmationCodeInput = document.getElementById('confirm-code-input');
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
        $scope.resendPhoneConfirmation();
        console.log('it gets here part 2')
        return;
      }
      //success

      if ($scope.user.phone_number && confirmationCodeInput.value && confirmationCodeInput.value.length === 4) {
        console.log('it gets here part 3')
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