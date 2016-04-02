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
  'LoadingService',
  '$ionicViewSwitcher',
  'Currency',
  'User',
  'PortfolioItem',
  function($scope, $state, $ionicPopup, $timeout, $localstorage,
 	$ionicModal, $stateParams, $ionicHistory, Camera, $ionicSideMenuDelegate,
  $ionicActionSheet, $cordovaFacebook, uTracker, University, PopupService, Utilities,
  RankingService, TipService, Category, $ionicSlideBoxDelegate,
  DeviceService, LoadingService, $ionicViewSwitcher, Currency, User, PortfolioItem) {
    $scope.refreshTipsAndRanking = function(user) {
      TipService.currentTips = TipService.generateTips(user);
      RankingService.refreshRanking(user);
    }
    $scope.experience = {name: '', years: 0, description:''};

    $scope.profile = {showCredibility:false};
    $scope.root.vars.guru_mode = true;

    if (!$scope.user.profile_code) {
      $scope.user.profile_code = $scope.user.profile_code || $scope.user.first_name || 'nameless';
    }

    // credibility only variable
    $scope.activeTabIndex = 0;
    $scope.profile.edit_mode = false;

    $scope.page = { modals : {}, popups: {}, backdrops: {}, dropdowns: {}, toggles:{} }
    $scope.page.modals = {
      experience: {visible:false},
      language: {visible:false}
    }
    $scope.page.toggles = {experience:{active:false}, languages:{active:false}};
    $scope.page.backdrops = {activeTab:false};
    $scope.page.checkmarks = {shop_title:false, shop_description:false, profile_code:false, major:false, alumni:false, year:false};
    $scope.page.dropdowns = {majors:{active:false}, year: {active:false, options:User.yearOptions()}, alumn:{active:false, options:User.alumnOptions()}}

    $scope.page.popups.checkPopupVisible = function() {
      return $scope.pagePopups.linkedin || $scope.pagePopups.facebook ||
      $scope.pagePopups.instagram || $scope.pagePopups.custom || $scope.pagePopups.twitter;
    }

    $scope.showConfirmInputCheckmark = function(input_name) {
      if ($scope.page.checkmarks) {
        $scope.page.checkmarks[input_name] = true;
        //hide it after it shows
        $timeout(function() {
          $scope.page.checkmarks[input_name] = false;
        }, 3000);
      }
    }

    $scope.updateUserAlumni = function(bool) {
      $scope.user.is_alumni = bool;
      $scope.page.dropdowns.alumn.active = !$scope.page.dropdowns.alumn.active
      $scope.showConfirmInputCheckmark('alumni');
      LoadingService.showAmbig(null, 200, function() {
        $scope.user.updateAttr('is_alumni', $scope.user, $scope.user.is_alumni, null, $scope);
      })
    }

    $scope.updateUserYear = function(year) {
      $scope.showConfirmInputCheckmark('year');
      $scope.user.year = year;
      $scope.page.dropdowns.year.active = !$scope.page.dropdowns.year.active;
      LoadingService.showAmbig(null, 200, function() {
        $scope.user.updateAttr('year', $scope.user, $scope.user.year, null, $scope);
      })
    }

    $scope.updateUserMajor = function(bool) {
      $scope.showConfirmInputCheckmark('major');
        $scope.user.updateAttr('major', $scope.user, $scope.user.major, null, $scope);
    }

    $scope.closeGuruLanguages = function() {
      if ($scope.desktopMode) {
        $scope.page.toggles.languages.active = false;
      }
    }


    var initAboutTabBackgroundListener = function() {
      var mainAboutTabDiv = document.querySelector('.pf-shop-desc');
      if (mainAboutTabDiv) {
        mainAboutTabDiv.addEventListener('click', function($event) {
          if ($scope.activeTabIndex === 1 && $scope.page.popups.checkPopupVisible()) {
            var elemClicked = $event.target;
          }
        })
      }
    }



    $timeout(function() {
      initAboutTabBackgroundListener();
    }, 1000)


    $scope.all_currencies = Currency.updateMasterList($scope.user);
    $timeout(function() {
    }, 2500)

    $scope.showEditGuruIntro = false;


    $scope.setCourseAndClearInput = function(course) {
      $scope.activePortfolioItem.course = {
        id: course.id,
        short_name: course.short_name,
        department_long: course.department_long,
        code: course.code,
        full_name: course.full_name
      }
      var courseInput = document.querySelector('#course-input-1')
      if (courseInput) {
        courseInput.value = '';
      }
      courseInput.blur();
    }

    $scope.clearCourseAndFocusInput = function(course) {
      $scope.portfolio_item.course = {};
      var courseInput = document.querySelector('#course-input-1')
      if (courseInput) {
        courseInput.value = '';
      }
      courseInput.focus();
    }


    $scope.transitionToEditMode = function() {
      LoadingService.showAmbig("Switching to edit mode..", 250, function() {
        $scope.profile.edit_mode = true;
        LoadingService.hide();
      });
    }




    //to add
    $scope.addPortfolioItem = function() {
      $scope.activePortfolioItem = PortfolioItem.initEmpty();
      if ($scope.desktopMode) {
        $scope.activePortfolioItem.visible = true;
        $scope.portfolio_item = $scope.activePortfolioItem;
        var portfolioItemModal = document.querySelector('#cta-modal-profile-pi-item');
        // if (portfolioItemModal) {
        //   LoadingService.showAmbig(null, 1000, function() {
        //      portfolioItemModal.classList.add('show');
        //   });
        // }

      } else {
        $scope.launchEditPortfolioItemModal()
      }
    }

    function shiftPortfolioItemEditModalToNextRow(elem, successFunction) {
      var elemRect = elem.getBoundingClientRect();
      var totalVerticalOffsetFromTop = elemRect.height + elemRect.top;
      elem.style.top = totalVerticalOffsetFromTop + 30 + 'px';
    }

    $scope.closeEditPortfolioItemModal = function(portfolio_item) {
        $scope.root.vars.hide_edit_button = false;
        //user is closing an active porftolio addition
        //todo -- add warning
        $scope.portfolio_item = PortfolioItem.initEmpty();
        if (!$scope.desktopMode) {
          $scope.activePortfolioItem.visible = false;
          $scope.editPortfolioItemModal.hide();
        } else {
          if (!portfolio_item  || !portfolio_item.visible) {
            $scope.activePortfolioItem.visible = null;

          } else {
            portfolio_item.visible = null;
          }

        }

      }

    //highlight mode
    //resources
    //

    $scope.closeAddPortfolioItem = function() {
      if ($scope.desktopMode) {
        var portfolioItemModal = document.querySelector('#cta-modal-profile-pi-item');
        $scope.activePortfolioItem = {};
        if (portfolioItemModal) {
          portfolioItemModal.classList.remove('show');
        }
      } else {
        $scope.profileModal.hide();
      }
    }



    $scope.savePortfolioItem = function(portfolio_item) {

      var successFunction = function() {
        $scope.closeEditPortfolioItemModal(portfolio_item);
        $scope.portfolio_item = PortfolioItem.initEmpty();
        $scope.root.vars.hide_edit_button = false;
        LoadingService.hide();
        $timeout(function() {
          LoadingService.showSuccess('Saved!', 750);
        }, 250)
      }

      // portfolio_item.max_hourly = portfolio_item.max_hourly;

      LoadingService.showAmbig(null, 10000)

      if (!portfolio_item.id) {

        if (!PortfolioItem.validateFields(portfolio_item)) {
          return;
        }
        $scope.user.updateAttr('add_guru_portfolio_item', $scope.user, portfolio_item, successFunction, $scope);

        $scope.activePortfolioItem.course = {
          id: portfolio_item.course.id,
          short_name: portfolio_item.course.short_name,
          department_long: portfolio_item.course.department_long,
          code: portfolio_item.course.code,
          full_name: portfolio_item.course.full_name
        }
      }

      else {
        $scope.user.updateAttr('edit_guru_portfolio_item', $scope.user, portfolio_item, successFunction, $scope);
      }
    }

    $scope.removePortfolioItem = function(portfolio_item) {
      LoadingService.showAmbig('Removing...', 10000);


      var successFunction = function() {
          LoadingService.hide();
          $timeout(function() {
            LoadingService.showSuccess(portfolio_item.course.short_name + ' successfully removed!', 2500 );
          }, 100)
      }
      $scope.user.updateAttr('remove_guru_portfolio_item', $scope.user, portfolio_item, successFunction, $scope);
    }

    $scope.reactivatePortfolioItem = function(portfolio_item) {
      LoadingService.showAmbig('Reactivating...', 10000);

      portfolio_item.active = true;
      var successFunction = function() {
          LoadingService.hide();
          $timeout(function() {
            LoadingService.showSuccess(portfolio_item.course.short_name + ' successfully reactivated!', 2500 );
          }, 100)
      }
      $scope.user.updateAttr('edit_guru_portfolio_item', $scope.user, portfolio_item, successFunction, $scope);
    }

    $scope.deactivatePortfolioItem = function(portfolio_item) {
      LoadingService.showAmbig('Deactivating...', 10000);

      portfolio_item.active = false;
      var successFunction = function() {
          LoadingService.hide();
          $timeout(function() {
            LoadingService.showSuccess(portfolio_item.course.short_name + ' successfully deactivated!', 2500 );
          }, 100)
      }
      $scope.user.updateAttr('edit_guru_portfolio_item', $scope.user, portfolio_item, successFunction, $scope);
    }

    $scope.toggleDesktopIntroduction = function() {
      $scope.showEditGuruIntro = !$scope.showEditGuruIntro;

      if ($scope.showEditGuruIntro) {
        var textArea = document.querySelector('#desktop-guru-introduction-textarea')
        if (textArea) {
          textArea.focus();
          textArea.select();
        }
      } else {
        LoadingService.showSuccess('Saved!', 750);
        $scope.user.updateAttr('guru_introduction', $scope.user, $scope.user.guru_introduction, null, $scope);
      }
    }


    // $scope.user.languages = $scope.user.languages || [{name:"English"}, {name:"Chinese"}];

    if (!$scope.root.vars.profile) {
      $scope.root.vars.profile = false;
    }

    $scope.toggleDesktopTranscript = function() {
      $scope.showDesktopTranscriptModal = !$scope.showDesktopTranscriptModal;
    }

    $scope.checkStatus = function() {
      $scope.doRefresh();
      LoadingService.showAmbig();
      $timeout(function() {
        if ($scope.user.school_email_confirmed) {
          $scope.calcGuruCredibilityProgress();
          LoadingService.showSuccess($scope.user.school_email + ' confirmed', 1500);
        } else {
          if (confirm('Resend email to ' + $scope.user.school_email + '?')) {
            var successCallback = function() {
              LoadingService.showSuccess('Email successfully sent to' + $scope.user.school_email, 2000);
            }
            $scope.refreshTipsAndRanking($scope.user);
            $scope.user.updateAttr('confirm_school_email', $scope.user, editEmailInput.value, successCallback, $scope);
          }
        }
      }, 1500);
    }

    $scope.credibilityProgress = 0;
    $scope.credibilityMax = 5;
    $scope.calcGuruCredibilityProgress = function() {

      $scope.credibilityProgress = 0.0;

      if ($scope.user.transcript_file && $scope.user.transcript_file.url) {
        $scope.credibilityProgress += 1.0;
      }

      if ($scope.user.fb_id) {
        $scope.credibilityProgress += 1;
      }

      if ($scope.user.phone_number_confirmed) {
        $scope.credibilityProgress += 1;
      }

      if ($scope.user.school_email_confirmed) {
        $scope.credibilityProgress += 1;
      }

      if ($scope.user.guru_experiences && $scope.user.guru_experiences.length) {
        $scope.credibilityProgress += 1;
      }

      $scope.credibilityProgress = parseFloat($scope.credibilityProgress);

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

    $scope.editGuruExperience = function(experience) {
      if ($scope.desktopMode)  {
        $scope.page.toggles.experience.active = !$scope.page.toggles.experience.active;
        $scope.experience = experience;
      } else {
        $scope.experience = experience;
        $scope.guruExperiencesModal.show();
      }
    }

    $scope.saveGuruIntroduction = function() {
      LoadingService.show();
      $scope.refreshTipsAndRanking($scope.user);
      $scope.user.updateAttr('guru_introduction', $scope.user, $scope.user.guru_introduction, null, $scope);
      $scope.profile.intro_edit_mode = false;
      $timeout(function() {
        LoadingService.hide();
        LoadingService.showSuccess('Saved!', 1500);
      }, 500);
    }

    $scope.hideAllProfilePopups = function() {
      $scope.pagePopups.facebook = false;
      $scope.pagePopups.linkedin = false;
      $scope.pagePopups.twitter = false;
      $scope.pagePopups.instagram = false;
      $scope.page.backdrops.activeTab = false;
    }

    $scope.updateExternalResource = function(site, url) {
      $scope.hideAllProfilePopups();
      LoadingService.showAmbig(null, 10000);
      var successFunction = function(external_user) {
        LoadingService.hide();
        $timeout(function() {
          LoadingService.showSuccess('Saved!', 750);
        }, 100)
      }

      var payload = {
        site:site,
        url:url
      }

      $scope.user.updateAttr('update_external_profile_resource', $scope.user, payload, successFunction, $scope)
    }

    //TODO --> send error to analytics if no callback
    $scope.saveGuruIntroductionBehindScenes = function() {
      User.updateLocal($scope.user);
      $scope.user.updateAttr('guru_introduction', $scope.user, $scope.user.guru_introduction, null, $scope);
    }

    $scope.saveGuruShopDescription = function() {
      if (!$scope.user.academic_shop.description || !$scope.user.academic_shop.description.length) {
        return
      }
      User.updateLocal($scope.user);
      $scope.showConfirmInputCheckmark('shop_description');
      $scope.user.updateAttr('update_guru_shop_description', $scope.user, $scope.user.academic_shop, null, $scope);
    }

    $scope.saveGuruShopTitle = function() {
      if (!$scope.user.academic_shop.title || !$scope.user.academic_shop.title.length) {
        return
      }
      User.updateLocal($scope.user);
      $scope.showConfirmInputCheckmark('shop_title');
      $scope.user.updateAttr('update_guru_shop_title', $scope.user, $scope.user.academic_shop, $scope);
    }

    $scope.onEnterBlurInput = function($event) {
      $event.target.blur();
    }





    $scope.saveProfileCode = function(cb) {

      function failureFunction(err) {
        if (err && err.status && err.status === 401) {
          LoadingService.showMsg("We're sorry, the profile code " + $scope.user.profile_code  + " is already taken.")
          return;
        }
      }

      function successFunction() {
        // LoadingService.showSuccess('Saved', 1000)
        cb && cb();
      }
      $scope.showConfirmInputCheckmark('profile_code')
      $scope.user.updateAttr('profile_code', $scope.user, $scope.user.profile_code, successFunction, $scope, failureFunction);
      $scope.profile.intro_edit_mode = false;

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
    $scope.removeGuruSkill = function(skill,index)
    {
        if (!confirm('Remove ' + skill.name + '?')) {
          return;
        }
      // delete from local
       $scope.user.guru_subcategories.splice(index, 1);

       // update server
       LoadingService.show();

       var confirmCallback = function() {
         $scope.success.show(0, 2000, skill.name+ ' successfully removed');
       }

       // $timeout(function() {
       $scope.refreshTipsAndRanking($scope.user);
       $scope.user.updateAttr('remove_guru_subcategory', $scope.user, skill, confirmCallback, $scope);
       // }, 200);
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


    $scope.pagePopups = {
      linkedin: false,
      fb: false,
      twitter: false,
      instagram: false
    }

    $scope.showPagePopup = function(type_string) {
      $scope.page.backdrops.activeTab = true;
      var popupKeys = Object.keys($scope.pagePopups);
      for (var i = 0; i < popupKeys.length; i++) {
        $scope.pagePopups[popupKeys[i]] = false

      }
      if (type_string === 'linkedin') {
        $scope.pagePopups.linkedin = true;
      }
      if (type_string === 'facebook') {
        $scope.pagePopups.facebook = true;
      }
      if (type_string === 'twitter') {
        $scope.pagePopups.twitter = true;
      }
      if (type_string === 'custom') {
        $scope.pagePopups.custom = true;
      }
      if (type_string === 'instagram') {
        $scope.pagePopups.instagram = true;
      }
    }

    $scope.saveLinkedInUrl = function(url) {
      LoadingService.showSuccess('Saved!', 2000);
      $scope.pagePopups.linkedin = false;
      $scope.updateAttr('public_linkedin_url', $scope.user, $scope.user.public_linkedin_url, null, $scope);
    }

    $scope.saveFbUrl = function(url) {
      $scope.updateAttr('public_fb_url', $scope.user, url, $scope.user.public_fb_url, $scope);
    }

    $scope.saveTwitterUrl = function(url) {
      $scope.updateAttr('public_twitter_url', $scope.user, url, $scope.user.public_twitter_url, $scope);
    }

    $scope.saveInstagramUrl = function(url) {
      $scope.updateAttr('public_instagram_url', $scope.user, url, $scope.user.public_instagram_url, $scope);
    }

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

    $scope.focusTag = function() {
      return
    }

    $scope.onEnterBlurInput = function($event) {
      if ($event.keyCode == 13 ||$event.keyCode == 9) {
        $scope.activePortfolioItem.tags.push($scope.activePortfolioItem.orig_tag);
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
      LoadingService.show();
      $timeout(function() {
        $scope.tutoringPlatformsModal.hide();
      }, 500);

      var successCallback = function() {
        LoadingService.hide();
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

      if (!$scope.profile.edit_mode) {
        $scope.contactGuruModal.show();
      }
    }

    $scope.contactCTAButton = function() {
      LoadingService.showMsg('Turn on edit below first!', 2000);
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
    // $scope.launchAddGuruExperienceModal = function(experience) {
    //   $ionicModal.fromTemplateUrl(BASE + 'templates/guru.experiences.modal.html', {
    //         scope: $scope,
    //         animation: 'slide-in-up'
    //     }).then(function(modal) {
    //         if (experience) {
    //           $scope.experience = experience;
    //           // $scope.experience_index = index;
    //         } else {
    //           $scope.experience = {
    //             name: '',
    //             description: '',
    //             years: 1
    //           }
    //         }
    //         $scope.guruExperiencesModal = modal;
    //         $scope.guruExperiencesModal.show();
    //   });
    // }
    $scope.saveGuruIntroductionModalAndHide = function() {
      LoadingService.showAmbig(null, 500, function() {
        $scope.guruIntroductionModal.hide();
        LoadingService.showSuccess('Introduction Saved', 1500);
        $scope.user.updateAttr('guru_introduction', $scope.user, $scope.user.guru_introduction, null, $scope);
      })
    }


    $scope.updateCurrency = function(currency) {
      if (currency.active) {
        currency.active = null;
        $scope.user.updateAttr('remove_guru_currency', $scope.user, currency, null, $scope) ;
      } else {
        currency.active = true;
        $scope.user.updateAttr('add_guru_currency', $scope.user, currency, null, $scope) ;
      }

    }

    $scope.closeAndSaveContactGuruModal = function() {
      LoadingService.showAmbig(null, 500, function() {
        LoadingService.showSuccess('Contact Methods Saved', 1500);
        $scope.user.updateAttr('guru_introduction', $scope.user, $scope.user.guru_introduction, null, $scope);
        angular.element('#cta-modal-profile-contact').classList.remove('show');
      });
      var elemModal = document.querySelector('#cta-modal-profile-contact');
      elemModal.classList.remove('show');
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

    // $scope.launchMajorModal = function() {
    //   LoadingService.show();
    //   $ionicModal.fromTemplateUrl(BASE + 'templates/majors.modal.html', {
    //         scope: $scope,
    //         animation: 'slide-in-up'
    //     }).then(function(modal) {
    //         $scope.majorModal = modal;
    //         $scope.majorModal.show();
    //   });
    // }


    $scope.initModalsAfterEnter = function() {

      // $ionicModal.fromTemplateUrl(BASE + 'templates/majors.modal.html', {
      //       scope: $scope,
      //       animation: 'slide-in-up'
      //   }).then(function(modal) {
      //       $scope.guruMajorModal = modal;
      // });

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

      var updateCategoriesToScope = function(categories) {
              $scope.categories = categories;
      }
      $scope.categories = Category.categories || $scope.getCategories(updateCategoriesToScope) || [];

      var updateCoursesToScope = function(guru_courses) {
        $scope.courses = guru_courses;
      }
      $scope.courses = University.courses || $scope.getCoursesForUniversityId($scope.user.university_id, updateCoursesToScope) || [];
    }


    $scope.updateCommunicationMethod = function(attr_str, bool) {
      $scope.user.updateAttr(attr_str, $scope.user, bool, null, $scope);
    }

    $scope.updateGuruCurrency = function(currency, bool) {
      currency.active = bool;
      $scope.user.updateAttr('update_guru_currency', $scope.user, currency, null, $scope);
    }


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

    $scope.goToStateWithTransition = function(state_name, transition) {
          if (!$scope.user.id) {
            LoadingService.showAmbig();

            //make it feel like its coming... when really its just signup ;)
            $timeout(function() {
              $scope.openModal('signup');
              LoadingService.hide(100);
            }, 1000)
            return;
          }
          $ionicViewSwitcher.nextDirection(transition);
          $state.go(state_name);
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
      LoadingService.show();
      $cordovaFacebook.login(["email","public_profile","user_friends"]).then(function (success) {
        var successCallback = function() {
          LoadingService.hide();
          LoadingService.showSuccess('FB Account Saved', 2000);
          $scope.calcGuruCredibilityProgress();
        }
        var failureCallback = function(err) {
          // LoadingService.hide();
          if (err.status === 401) {
            if ($scope.signupForm && $scope.signupForm.password) {
              $scope.signupForm.password = '';
            }
            // $scope.success.show(0, 1000, 'FB Account has another account - please contact support');
          }
          LoadingService.showMsg('Sorry! This FB account has another account - please contact support', 2000);
        }
        $scope.refreshTipsAndRanking($scope.user);
        $scope.user.updateAttr('fb_id', $scope.user, success.authResponse.accessToken, successCallback , $scope, failureCallback);
      }).catch(function(e)
      {
        // LoadingService.showMsg('Sorry! This FB account has another account - please contact support', 2000);
        // $scope.loader.showMsg('Unable to Connect with Facebook', 0, 1500);
        LoadingService.hide();

      });
    }

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.goToUniversity = function() {
      LoadingService.show();
      $state.go('^.university-container');
      $timeout(function() {
        LoadingService.hide();
      }, 500);
    }

    $scope.goToDesktopGuruProfile = function() {
      $ionicViewSwitcher.nextDirection('enter');
      $state.go('^.desktop-guru-profile')
    }

    $scope.goToDesktopGuruCredibility = function() {
      $ionicViewSwitcher.nextDirection('enter');
      $state.go('^.guru-credibility');
    }

    $scope.saveGuruProfile = function() {
      var callbackFunction = function() {
        $scope.success.show(0, 1500, 'Profile Successfully Saved');
        $scope.root.vars.profile.edit_mode = !$scope.root.vars.profile.edit_mode;
        $timeout(function() {
          $scope.user.updateAttr('guru_introduction', $scope.user, $scope.user.guru_introduction, null, $scope);
          $scope.profile.edit_mode = false;
        }, 500)
      }

      $scope.saveProfileCode(callbackFunction);
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
        var elemId = 'guru-profile-img';
        Camera.takePicture($scope, index, elemId);
      } else {
        var element = document.getElementById('file-input-guru-edit-profile')
        element.click();
      }
    }

    $scope.takeDesktopTranscriptPhoto = function() {
      var element = document.getElementById('file-input-guru-add-transcript');
      element.click();
    }

    $scope.takeTranscriptPhoto = function(index) {


      if (DeviceService.doesCordovaExist() && $scope.platform.mobile) {
        Camera.takePicture($scope, index);
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

        LoadingService.show();
        callbackSuccess = function() {

          LoadingService.showSuccess("Saved!", 2000)
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

        if ($scope.desktopMode) {
            $scope.toggleDesktopTranscript();
        }

        LoadingService.show();
        callbackSuccess = function() {
          LoadingService.hide();
          $scope.calcGuruCredibilityProgress();
          LoadingService.showSuccess('Saved!', 1500);
        }
        $scope.root.vars.transcript_url_changed = true;
        $scope.calcGuruCredibilityProgress();
        $scope.user.createObj($scope.user, 'files', formData, $scope, callbackSuccess);
    };


    $scope.removeGuruCourseAndUpdate = function(course, index) {

      if (!confirm('Remove ' + course.name + '?')) {
        return;
      }


      var removedCourse = $scope.user.guru_courses.splice(index, 1);

      LoadingService.show();
      $timeout(function() {
        LoadingService.hide();
        LoadingService.showSuccess(course.name + ' successfully removed', 2000);
      }, 700)

      //update local user object
      $localstorage.setObject('user', $scope.user);

      //update server user object
      LoadingService.show();
      $timeout(function() {
        $scope.refreshTipsAndRanking($scope.user);
        $scope.user.updateAttr('remove_guru_course', $scope.user, course, null, $scope);
      }, 200);

    }

    $scope.launchConfirmEmailPopup = function($event) {
      function callback() {
          if(Utilities.validateEmail($scope.popupInput.emailConfirm)) {
            $scope.user.school_email = $scope.popupInput.emailConfirm;
            $scope.refreshTipsAndRanking($scope.user);
            $scope.user.updateAttr('confirm_school_email', $scope.user, $scope.popupInput.emailConfirm, null, $scope);
            LoadingService.showSuccess('Email sent to ' + $scope.popupInput.emailConfirm, 1500);
            PopupService.close('confirmEmail');
          } else {
            alert("Please enter a valid email.");
             $scope.popupInput.emailConfirm = "";
            return;
          }
      }
      PopupService.open('confirmEmail', callback, $event.target);
    }


    $scope.confirmPhonePopup = function($event) {
      function callback() {
          $scope.validateAndSendPhoneConfirmation();
      }

      PopupService.open('confirmPhone', callback, $event.target);
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
            $scope.loader.show();
            $scope.refreshTipsAndRanking($scope.user);
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

    $scope.resendPhoneConfirmation = function() {

      //validate
      if(Utilities.validatePhone($scope.popupInput.phoneConfirm)) {
        $scope.user.phone_number = $scope.popupInput.phoneConfirm;
        $scope.refreshTipsAndRanking($scope.user);
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

    //Thie is template fix for Modal show and hiden in Sidebar which will cause the slide not update
    $scope.$on('$ionicView.beforeEnter', function() {
        $ionicSlideBoxDelegate.update();
    });

    $scope.$on('$ionicView.enter', function() {
          $scope.refreshTipsAndRanking($scope.user);
          $timeout(function() {

            if (RankingService.recentlyUpdated || RankingService.refreshRanking($scope.user)) {
              RankingService.showPopover(RankingService.options.previousGuruRanking, RankingService.options.currentGuruRanking);
            }

          }, 1000)
          PopupService.initDefaults();
    });

    $timeout(function() {
      if (!$scope.desktopMode) {
        $scope.calcGuruCredibilityProgress();
        $scope.initModalsAfterEnter();
      }
    }, 500)

     $scope.$on('modal.hidden', function() {
        // $ionicSlideBoxDelegate.update();
        $scope.calcGuruCredibilityProgress();
        if (DeviceService.doesCordovaExist()) {
          cordova.plugins.Keyboard.close();
        }
      });
  }

]);