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
  'PopupService',
  'Utilities',
  'RankingService',
  'TipService',
  'Category',
  '$ionicSlideBoxDelegate',
  'DeviceService',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, Camera, $ionicSideMenuDelegate,
  $ionicActionSheet, $cordovaFacebook, uTracker, University, PopupService, Utilities,
  RankingService, TipService, Category, $ionicSlideBoxDelegate,
  DeviceService) {

    $scope.refreshTipsAndRanking = function(user) {
      TipService.currentTips = TipService.generateTips(user);
      RankingService.refreshRanking(user);
    }

    $scope.profile = {edit_mode:false, showCredibility:false};
    $scope.root.vars.guru_mode = true;

    // credibility only variable
    $scope.activeTabIndex = 0;
    $scope.profile.edit_mode = false;


    // $scope.user.languages = $scope.user.languages || [{name:"English"}, {name:"Chinese"}];

    if (!$scope.root.vars.profile) {
      $scope.root.vars.profile = false;
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
            $scope.refreshTipsAndRanking($scope.user);
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
      $scope.refreshTipsAndRanking($scope.user);
      $scope.user.updateAttr('guru_introduction', $scope.user, $scope.user.guru_introduction, null, $scope);
      $scope.profile.intro_edit_mode = false;
      $timeout(function() {
        $scope.loader.hide();
        $scope.loader.showSuccess('Saved!', 1500);
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
      $scope.refreshTipsAndRanking($scope.user);
      $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);

    }

    $scope.removeGuruSubcategory = function(subcategory) {
      if (!confirm('Remove ' + subcategory.name + '?')) {
        return;
      }
      $scope.refreshTipsAndRanking($scope.user);
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
        $scope.refreshTipsAndRanking($scope.user);
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
        $scope.refreshTipsAndRanking($scope.user);
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
      $scope.refreshTipsAndRanking($scope.user);
      $scope.user.updateAttr('tutoring_platforms_description', $scope.user, $scope.user.tutoring_platforms_description, successCallback , $scope);
    }


    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.contact.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.contactGuruModal = modal
    });



    $scope.launchContactGuruModal = function() {
      if ($scope.profile.edit_mode) {
        $scope.contactGuruModal.show();
      }
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

    $scope.launchAddGuruExperienceModal = function(experience, index) {

      $ionicModal.fromTemplateUrl(BASE + 'templates/guru.experiences.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            if (experience) {
              $scope.experience = experience;
              $scope.experience_index = index;
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

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.introduction.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruIntroductionModal = modal;
        })

    $scope.launchGuruIntroductionModal = function() {
      $scope.guruIntroductionModal.show();
    }


    $scope.launchAddGuruExperienceModal = function(experience) {

      $ionicModal.fromTemplateUrl(BASE + 'templates/guru.experiences.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            if (experience) {
              $scope.experience = experience;
              // $scope.experience_index = index;
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


    $scope.initModalsAfterEnter = function() {

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

      var updateScope = function(categories) {
              $scope.categories = categories;
      }
      $scope.categories = Category.categories || $scope.getCategories(updateScope) || [];


    }

    var getIonicSideMenuOpenRatio = function() {
            var openRatio = $ionicSideMenuDelegate.getOpenRatio();
            return openRatio;
    }

    var isSideMenuOpen = function(ratio) {
        if (!ratio && ratio !== -1) {
            $scope.sideMenuActive = false;
        } else {
            $timeout(function() {
                $scope.sideMenuActive = true;
            }, 250)
        }
    }

    $scope.$watch(getIonicSideMenuOpenRatio, isSideMenuOpen);

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru.languages.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.guruLanguagesModal = modal;
    })

    $scope.launchGuruSkillsModal = function() {

      if (!img_base || !img_base.length) {
        $scope.categories_img_base = 'remote/';
      } else {
        $scope.categories_img_base = img_base + 'remote/';
      }

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

    $scope.closeContactGuruModal = function()
    {
        $scope.contactGuruModal.hide();
         $ionicSlideBoxDelegate.update();
    };





    $scope.connectWithFacebook = function() {
      $scope.loader.show();
      $cordovaFacebook.login(["email","public_profile","user_friends"]).then(function (success) {
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
        $scope.refreshTipsAndRanking($scope.user);
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


      if (DeviceService.doesCordovaExist() && $scope.platform.mobile) {
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
        $scope.refreshTipsAndRanking($scope.user);
        $scope.user.updateAttr('remove_guru_course', $scope.user, course, null, $scope);
      }, 200);

    }


    $scope.launchConfirmEmailPopup = function() {

      PopupService.open('confirmEmail', callback);
      function callback() {
          if(Utilities.validateEmail($scope.popupInput.emailConfirm)) {
            $scope.user.school_email = $scope.popupInput.emailConfirm;
            $scope.refreshTipsAndRanking($scope.user);
            $scope.user.updateAttr('confirm_school_email', $scope.user, $scope.popupInput.emailConfirm, null, $scope);
            $scope.loader.showSuccess('Email sent to ' + $scope.popupInput.emailConfirm, 1500);
            PopupService.close('confirmEmail');
          } else {
            alert("Please enter a valid email.");
             $scope.popupInput.emailConfirm = "";
            return;
          }
      }
    }


    $scope.confirmPhonePopup = function() {
      PopupService.open('confirmPhone', callback);
      function callback() {
          $scope.validateAndSendPhoneConfirmation();
      }
    }


    $scope.validateAndSendPhoneConfirmation = function() {
      console.log("Confirm")
      //validate
      if(Utilities.validatePhone($scope.popupInput.phoneConfirm)) {

        $scope.user.phone_number = $scope.popupInput.phoneConfirm;

        // //if user hasn't typed in a token & clicked verify [resend exists]
        // if ($scope.user.phone_number_token && Utilities.validateCode($scope.popupInput.codeConfirm)) {
        //   alert('Please enter a 4 digit code');
        //   return;
        // }

        //if user hasn't received a token yet & is sending for the first time [resend doesn't exist]
        if (!$scope.user.phone_number_token) {
          $scope.resendPhoneConfirmation();
          console.log('it gets here part 2');
          return;
        }

        //success
        else if (Utilities.validateCode($scope.popupInput.codeConfirm)) {
          console.log('it gets here part 3');
          var callbackSuccess = function() {
            $scope.loader.hide();
            if ($scope.user.phone_number_confirmed) {
              $scope.success.show(0, 2000, 'Verification Code confirmed!')
            } else {
              $scope.success.show(0, 2000, 'Invalid Code - please try again?');
            }
            $scope.user.phone_number = $scope.popupInput.phoneConfirm;

            return;
          }

          PopupService.close('confirmPhone');

          $scope.loader.show();
          $scope.refreshTipsAndRanking($scope.user);
          $scope.user.updateAttr('phone_number_check_token', $scope.user, $scope.popupInput.codeConfirm, callbackSuccess, $scope);
        } else {
          alert("Please enter a 4 digit code.");
        }

      } else {
        alert('Please enter valid phone number.');
        // $scope.popupInput.phoneConfirm = "";
        return;
      }
    }

    $scope.resendPhoneConfirmation = function() {

      //validate
      if(Utilities.validatePhone($scope.popupInput.phoneConfirm)) {
        $scope.user.phone_number = $scope.popupInput.phoneConfirm;
        $scope.refreshTipsAndRanking($scope.user);
        $scope.user.updateAttr('phone_number_generate', $scope.user, $scope.popupInput.phoneConfirm, null, $scope);

        PopupService.close('confirmPhone');
        $scope.loader.show();
        $timeout(function() {
          $scope.loader.hide();
          var msg = 'New code re-sent to ' + $scope.popupInput.phoneConfirm;
          $scope.success.show(0, 2000, msg);
        }, 1000)

      } else {
        alert('Please enter valid phone number');
        $scope.popupInput.phoneConfirm = "";
        return;
      }


    }


    $scope.$on('$ionicView.beforeEnter', function() {


    })


    $scope.$on('$ionicView.enter', function() {
          $ionicSlideBoxDelegate.update();
          $scope.refreshTipsAndRanking($scope.user);

          $timeout(function() {

            if (RankingService.recentlyUpdated || RankingService.refreshRanking($scope.user)) {
              RankingService.showPopover(RankingService.options.previousGuruRanking, RankingService.options.currentGuruRanking);
            }

          }, 1000)

    });

    $scope.$on('$ionicView.afterEnter', function() {
      $ionicSlideBoxDelegate.update();
      $timeout(function() {
        $scope.initModalsAfterEnter();
      }, 500)



    });


  }

]);