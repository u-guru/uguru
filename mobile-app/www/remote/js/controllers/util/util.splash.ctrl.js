angular.module('uguru.util.controllers')

.controller('SplashController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  'Category',
  'ScrollService',
  'SideMenuService',
  '$stateParams',
  'Utilities',
  'GUtilService',
  'GMapService',
  'University',
  '$compile',
  'ContentService',
  'LoadingService',
  'ContentService',
  'CTAService',
  'User',
  'AccessService',
  'AnimationService',
  'FileService',
  'KeyboardService',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, Category, ScrollService, SideMenuService,
    $stateParams, Utilities, GUtilService, GMapService, University, $compile,
    ContentService, LoadingService, ContentService, CTAService, User, AccessService,
     AnimationService, FileService, KeyboardService) {

    // $scope.root.triggers.runSequence(['click:#cta-box-powerups:100', 'click:#powerup-gpa-container:100', 'click:#gpa-try-button:100', 'click:#powerup-gpa-house:100'])
    $scope.nav = {activate: true};
    $scope.mad_lib = {activate: false};
    $scope.activate = {
      searchUniversity: false,
      map: false,
      projector: false,
      powerups: false,
      sidebar: false
    }


    var keyboardListener;
    var closeOnEscape;
    $scope.deactivateUniversitySearch = function() {
      $scope.activate.searchUniversity = false;
      $timeout(function() {
        $scope.$apply();
      });
    }
    $scope.activateUniversitySearch = function() {
      $scope.activate.searchUniversity = true;
      $timeout(function() {
        $scope.$apply()
      });
      var closeOnEscape = function(e) {
        console.log(e.keyCode);
        if (e.keyCode === 27) {
          $scope.activate.searchUniversity = false;
          $timeout(function() {
            $scope.$apply();
          })
          document.removeEventListener('keydown', keyboardListener);
        }
      }

      KeyboardService.initKeyboardKeydownFunc(closeOnEscape)
    }

    $scope.activatePowerups = function() {
      $scope.activate.powerups = true;
      $timeout(function() {
        $scope.$apply()
      });
      var closeOnEscape = function(e) {
        if (e.keyCode === 27) {
          $scope.activate.powerups = false;
          $timeout(function() {
            $scope.$apply();
          })
          document.removeEventListener('keydown', keyboardListener);
        }
      }

      KeyboardService.initKeyboardKeydownFunc(closeOnEscape)
    }

    // todo all states functions
    // 1. Define the transition functions

    $scope.transitions = {
      getStarted: {
        active: false,
        activate: transitionToGetStarted
      },
      searchUniversity: {
        active: false,
        activate: showSearchSchools
      },
      sidebar: {
        active: false,
        activate: launchSidebarCTA
      },
      maps: {
        active: false,
        activate: initMapState
      }
    }

    // 2. Define the validation and edge cases
    // HTML - what exact components barebones<<<<<
    // JS -

    // 3. Delegate everything else until later
    // Random thoughts for later
    // - Nicer modules
    // - Animtion
    // - Graphics
    // - movie scenes


    function transitionToGetStarted() {
      console.log('transition to get get started clicked;');
      $scope.transitions.getStarted.active = true;
      return;
    }

    function showSearchSchools() {
      console.log('transition to search schoolsclicked;');
      //add to dropdown function
      return;
    }

    function launchSidebarCTA() {

      console.log('transition to get get started clicked;');
      return;
    }

    function initMapState() {
      console.log('transition to map state initiated');
    }


    $scope.storage = FileService.initUserAdminTool($scope.user);
    $scope.demographics = User.demographics;
    $scope.saveDemographic = saveDemographic;
    $scope.clearDemographic = clearDemographic;
    $scope.updateFormCapitalization = function(str, val, form) {
        $timeout(function() {
          $scope.$apply(function() {
            var words = str.split(' ');
            for (var i = 0; i < words.length; i++) {
              if (words[i].length) {
                words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
              }
            }
            str = words.join(' ')
            form[val] = str;
          })
        })
    }
    $scope.onSignupFormFocus = function(field_name, val, form) {
      $timeout(function() {
        $scope.$apply(function() {
          form.focusedInput = field_name;
          form.activateError = false;
          form.activateErrorMsg = false;
        })
      }, 1000)
    }
    $scope.reset = function(field_name,form,isValid)
    {
      if (field_name === 'name' && !form.full_name)
      {
        form.activateErrorName = false;
        form.validateName = false;
        if (!form.email){
          form.activateEmail = false
        }
        if (!form.password){
          form.activatePassword = false
        }
        $scope.user.name = form.full_name;
      }
      else if (field_name === 'email' && (!form.email && isValid))
      {
        form.activateErrorEmail = false;
        form.validateEmail = false;

        if (!form.password){
          form.activatePassword = false
        }
        $scope.user.email = form.email;

      }
      else if (field_name === 'password' && !form.password)
      {
        form.activateErrorPassword = false;
        form.validatePassword = false;
        $scope.user.password = form.password;

      }
    }
    $scope.updateUserIdCard = function(field_name, val, form,isValid) {

      if (field_name === 'name' && val && val.length) {
        $scope.updateFormCapitalization(val, 'full_name', form)
        var error_msg = validateFullName(val)
        if (error_msg.validated) {
          $timeout(function(){
            $scope.$apply(function() {
              $scope.user.name = val;
              form.activateEmail = true;
              form.activateErrorName = false;
              form.validateName = true;
            })
          })
        } else {
          $timeout(function(){
              $scope.$apply(function() {
                form.activateError = true;
                form.activateErrorName = true;
                form.validateName = false;
                form.activateErrorMsg = error_msg.error_msg;
              })
          })
        }
      }
      if (field_name === 'email'&& (val || !isValid)) {
        var error_msg = validateEmail(val);
        if (error_msg.validated) {
          $timeout(function(){
            $scope.$apply(function() {
              $scope.user.email = val;
              form.validateEmail = true;
              form.activateErrorEmail = false;
              form.activatePassword = true;
            })
          })
        } else {
          $timeout(function(){
              $scope.$apply(function() {
                form.activateError = true;
                form.validateEmail = false;
                form.activateErrorEmail = true;
                form.activateErrorMsg = error_msg.error_msg;
              })
          })
        }
      }
      if (field_name === 'password' && val && val.length) {
        var error_msg = validatePassword(val);
        if (error_msg.validated) {
          $timeout(function(){
            $scope.$apply(function() {
              $scope.user.password = val;
              form.validatePassword = true;
              form.activateErrorPassword = false;
            })
          })
        } else {
          $timeout(function(){
              $scope.$apply(function() {
                form.activateError = true;
                form.validatePassword = false;
                form.activateErrorPassword = true;
                form.activateErrorMsg = error_msg.error_msg;
              })
          })
        }
      }
      function validateFullName(name) {
        var splitName = name.split(' ');
        var errorResults = {};

        if (splitName.length < 2) {
          errorResults.error_msg = "Please enter your full name";
          errorResults.validated = false;
          return errorResults;
        }

        for (var i = 0; i < splitName.length; i++) {
          var indexWord = splitName[i];
          if (indexWord.length < 2) {
            errorResults.error_msg = "First or last name must be greater than 2 or more characters";
            errorResults.validated = false;
            return errorResults;
          }
        }
        errorResults.validated = true;
        return errorResults
      }

      function validateEmail(email) {
        var errorResults = {};
        var re =  /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(edu|guru)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if(re.test(email)) {
          errorResults.validated = true;
          return errorResults
        } 
        else if(!email){
          errorResults.validated = false;
          errorResults.error_msg = 'Invalid email format';
          return errorResults
        }
        else {
          errorResults.validated = false;
          errorResults.error_msg = 'Please enter a valid school .edu email';
          return errorResults
        }
      }
      function validatePassword(string) {
        var errorResults = {};
        errorResults = {
          validated: string.length >= 6
        }
        if (!errorResults.validated) {
          errorResults.error_msg = 'Please enter a password that is at least 6 characters.'
        }
        return errorResults;
      }
    }

    function clearDemographic () {
      $scope.user.demographic = null;
      User.updateLocal($scope.user);
    }

    $scope.validateAccessCodeSplash = function(code) {
      AccessService.validate(code, successFunction, failureFunction);
      function successFunction(user) {
        LoadingService.showSuccess('Access Granted', 2000, function() {
          LoadingService.hide();
          $timeout(function() {
            LoadingService.showMsg('Taking you to your dasbhoard', 2500);
            $timeout(function() {
              AnimationService.flip('^.student-home');
            }, 500)
          }, 1000)
        })
      }
      function failureFunction(resp) {
        LoadingService.showMsg('Incorrect access code! Please try again.', 2500);
      }
    }

    function saveDemographic(demographic) {
      $scope.user.demographic = demographic;
      if ($scope.user.demographic && $scope.user.demographic.name !== 'College Student') {
        $scope.user.demographic.selected = true;
      } else {
        $scope.user.demographic.selected = false;
      }
      User.updateLocal($scope.user);
    }

    if ($scope.root.loader.body.hide) {
      resolveStateParams();
    }

    $scope.map;
    $scope.page = {account: {}, progress: {}, scroll: {}, waypoints: {}, sidebar:{}, dropdowns: {}, modals: {}, swipers: {cachedBefore: [], cachedAfter:[], cached:[], galleryIndex:0}, map:{}};
    $scope.page.dropdowns = {closeAll: closeAllDropdowns, category: {show: true, active:false, toggle:toggleCategoryDropdown}, university: {show: true, active: false, toggle: toggleUniversityDropdown}};
    $scope.page.account = {loginMode:false, forgotPassword:false, toggle: function(){$scope.page.account.loginMode = !$scope.page.account.loginMode}};
    $scope.page.faq_arr = ContentService.faq;
    //@gabrielle note, scroll preferences

    $scope.page.scroll = {
      _length: 250,//scroll duration
      parentElem: "#home-splash",
      amount: null, //## only if you are particularly scrolling to a section
      successFunction: null,
      easeType: 'quad', //quad + quint as options
      offset: 0
    }

    $scope.switchToSignup = function() {
      $scope.page.account.loginMode = false;
      $scope.page.account.forgotPassword = false;
    }

    $scope.switchToLogin = function() {
      $scope.page.account.loginMode = true;
      $scope.page.account.forgotPassword = false;
    }

    $scope.switchToForgotPassword = function() {
      $scope.page.account.loginMode = false;
      $scope.page.account.forgotPassword = true;
    }

    $scope.goToStudentMode = function() {
      LoadingService.showAmbig();
      AnimationService.flip('^.student-home', {}, function() {
        $timeout(function() {
          LoadingService.hide();
        }, 500)
      });
    }

    $scope.updateProgress = function() {
      var sum = 0;
      var progressTrackerDict = {};
      if ($scope.user && $scope.user.demographic && $scope.user.demographic.selected) {
        sum += 10;
        progressTrackerDict.demographic = true;
      }
      if ($scope.user.university && $scope.user.university.id && progressTrackerDict.demographic) {
        sum += 20;
        progressTrackerDict.university = true;

      }
      if ($scope.user && $scope.user.id && progressTrackerDict.demographic && progressTrackerDict.university) {
        sum += 20;
        progressTrackerDict.user = true;
      }
      if ($scope.user && $scope.user.student_courses && $scope.user.student_courses.length > 0 && progressTrackerDict.demographic && progressTrackerDict.user && progressTrackerDict.university) {
        sum += 20;
        progressTrackerDict.courses = true;
      }
      if ($scope.user && $scope.user.access_code && progressTrackerDict.demographic && progressTrackerDict.university && progressTrackerDict.user && progressTrackerDict.courses) {
        sum += 20;
        progressTrackerDict.access = true;
      }
      if (progressTrackerDict.access && progressTrackerDict.demographic && progressTrackerDict.university && progressTrackerDict.user && progressTrackerDict.courses) {
        sum = 100;
      }
      $timeout(function() {
        $scope.page.progress.getting_started = sum;
      })
    }



    var initSwipers = function(args, desktop_mode) {
      if ($scope.desktopMode) {
        args = null;
      }
      var doesSwiperExist = document.querySelector('.header-swiper-back-2') && document.querySelector('.header-swiper-back-2').swiper;
      if (doesSwiperExist || $state.current.name !== 'root.splash') {
        return;
      }
      var swiperBack2=new Swiper('.header-swiper-back-2',{slidesPerView:'auto',centeredSlides:true,spaceBetween:100,onlyExternal:true,effect:'coverflow',direction:'vertical',speed:600,coverflow:{slideShadows:false}});
      var swiperBack1=new Swiper('.header-swiper-back-1',{slidesPerView:'auto',centeredSlides:true,spaceBetween:300,effect:'coverflow',speed:600,coverflow:{slideShadows:false}});
      var swiperMainOptions = {
        slidesPerView:'auto',
        centeredSlides:true,
        spaceBetween: 80,
        effect:'coverflow',
        speed:250,
        coverflow:{slideShadows:false},
        // pagination:'.header-swiper-front .swiper-pagination',
        paginationClickable:true,
        nextButton:'.header-swiper-front .swiper-button-next',
        prevButton:'.header-swiper-front .swiper-button-prev',
        control:[swiperBack1,swiperBack2],
        controlBy:'container',
        keyboardControl:true,
        a11y:true,
        onTransitionEnd:onSlideChangeEndMainSwiper($timeout, $scope),
        // onSlidePrevStart: onSlidePrevStart($timeout, $scope),
        parallax: true
      }

      if (!desktop_mode) {
        swiperMainOptions.slidesPerView = args.mobile.slidesPerView;
        swiperMainOptions.spaceBetween = args.mobile.spaceBetween;
        swiperMainOptions.breakpoints = args.mobile.breakpoints;
      }

      var swiperFront=new Swiper('.header-swiper-front', swiperMainOptions);

      swiperFront.on('slideChangeStart', function () {
          // swiperFront.slides[swiperFront.previousIndex].classList.add('clear');
          // swiperFront.slides[swiperFront.previousIndex].classList.remove('opacity-1-impt');
          $scope.updateProgress();
          toggleGalleryDisplays();
      });

      var swiperFrontGalleryThumbsOption = {
        slidesPerView:5,
        spaceBetween:10,
        centeredSlides:true,
        touchRatio:0.2,
        slideToClickedSlide:true,
        nested:true,
        resistanceRatio:0
      }
      var swiperFrontGalleryThumbs = new Swiper('#swiper-gallery-nav', swiperFrontGalleryThumbsOption);

      // swiperFrontGalleryThumbs.setWrapperTranslate(swiperFront.getWrapperTranslate());
      swiperFront.params.control = swiperFrontGalleryThumbs;
      swiperFrontGalleryThumbs.params.control = swiperFront;
      swiperFrontGalleryThumbs.params.slideChangeStart = swiperFront.params.slideChangeStart;
      swiperFrontGalleryThumbs.params.onTransitionEnd = swiperFront.params.onTransitionEnd;
      $scope.page.swipers.main = swiperFront;
      $scope.page.swipers.gallery = swiperFrontGalleryThumbs;



  }

    function hideSwiperNavButtons() {
      var allSwiperButtons = document.querySelectorAll('.swiper-button-disabled');
      if (!allSwiperButtons.length) {
        return;
      }
      for (var i = 0; i < allSwiperButtons.length; i ++) {
        var indexSwiperButton = allSwiperButtons[i];
        indexSwiperButton.classList.add('hide');
      }
    }

    function showSwiperNavButtons() {
        var allSwiperButtons = document.querySelectorAll('.swiper-button-disabled');
        if (!allSwiperButtons.length) {
          return;
        }
        for (var i = 0; i < allSwiperButtons.length; i ++) {
          allSwiperButtons[i].classList.remove('hide');
        }
    }

    function hideSwiperGallery() {
      var swiperGalaryElem = document.querySelector('#swiper-gallery-nav');
      swiperGalaryElem && swiperGalaryElem.classList.add('hide');
    }

    function showSwiperGallery() {
      var swiperGalaryElem = document.querySelector('#swiper-gallery-nav');
      swiperGalaryElem && swiperGalaryElem.classList.remove('hide');
    }



    function addAllSwipersToUniversity() {
      $scope.page.swipers.cachedBefore.length && $scope.page.swipers.main.prependSlide($scope.page.swipers.cachedBefore);
      $scope.page.swipers.cachedAfter.length && $scope.page.swipers.main.appendSlide($scope.page.swipers.cachedAfter);
      $timeout(function() {
        $scope.page.swipers.cachedBefore = [];
        $scope.page.swipers.cachedAfter = [];
      })
    }

    function hideProjectorPrecursor() {
      var projectorPullElem = document.querySelector('.projector-trigger');
      var projectorPullMessageDesktop = document.querySelector('.splash-projector-message.desktop');
      var projectorPullMessageMobile = document.querySelector('.splash-projector-message.mobile');
      var projectorPullGuru = document.querySelector('.splash-projector-guru');
      projectorPullElem && projectorPullElem.classList.add('hide');
      projectorPullMessageDesktop && projectorPullMessageDesktop.classList.add('hide');
      projectorPullMessageMobile && projectorPullMessageMobile.classList.add('hide');
      projectorPullGuru && projectorPullGuru.classList.add('hide');
    }

    function showProjectorPrecursor() {
      var projectorPullElem = document.querySelector('.projector-trigger');
      var projectorPullMessageDesktop = document.querySelector('.splash-projector-message.desktop');
      var projectorPullMessageMobile = document.querySelector('.splash-projector-message.mobile');
      var projectorPullGuru = document.querySelector('.splash-projector-guru');
      projectorPullElem && projectorPullElem.classList.remove('hide');
      projectorPullMessageDesktop && projectorPullMessageDesktop.classList.remove('hide');
      projectorPullMessageMobile && projectorPullMessageMobile.classList.remove('hide');
      projectorPullGuru && projectorPullGuru.classList.remove('hide');
    }

    function hideSplashHeroMap() {
      var splashHeroElem = document.querySelector('.splash-hero-map');
      if (splashHeroElem) {
        splashHeroElem.classList.add('hide');
      }
    }

    function toggleGalleryDisplays() {
      var swiperIndex = $scope.page.swipers.main.activeIndex;
      var previousSwiperIndex = $scope.page.swipers.main.previousIndex;

      if (swiperIndex === 6) {
        getAllCourses($scope.selectedUniversity);
      }
      if (swiperIndex === 1 && previousSwiperIndex > 1) {
        //scene 3
        var elemGalleryTab = document.querySelector('#swiper-gallery-tab div');
        elemGalleryTab && elemGalleryTab.classList.add('activate');
        var elem = document.querySelector('#getting-started-progress');
        elem.classList.add('clear');
        $timeout(function() {
          $scope.$apply(function() {
            // if (previousSwiperIndex === 3) {
              // var slideClassesToActivate = ['slideshow-thumb-1', 'slideshow-thumb-2', 'slideshow-thumb-3'];
              var slideClassesToClear = [ 'slideshow-thumb-3', 'slideshow-thumb-4', 'slideshow-thumb-5', 'slideshow-thumb-6', 'slideshow-thumb-7'];
              for (var i = 0; i < slideClassesToClear.length; i++) {
                  var clearClassIndex = slideClassesToClear[i];
                  var clearElem = document.querySelector('.' + clearClassIndex);
                  clearElem && clearElem.classList.add('clear');
              }
              // for (var j = 0; j < slideClassesToActivate.length; j++) {
              //     var activateClassIndex = slideClassesToActivate[j];
              //     var activateElem = document.querySelector('.' + activateClassIndex);
              //     activateElem.style.opacity = 0;
              // }
              // $timeout(function() {
              //   $scope.page.swipers.galleryIndex = 0;
              //   for (var j = 0; j < slideClassesToActivate.length; j++) {
              //     var activateClassIndex = slideClassesToActivate[j];
              //     var activateElem = document.querySelector('.' + activateClassIndex);
              //     activateElem && activateElem.classList.add('activate');
              //   }
              // }, 2500);
            // }
          })
        })
      } else if (swiperIndex === 2 && previousSwiperIndex < 2) {
        var elemGalleryTab = document.querySelector('#swiper-gallery-tab div');
        elemGalleryTab && elemGalleryTab.classList.add('clear');
        $timeout(function() {
          $scope.$apply(function() {

              // var slideClassesToClear = ['slideshow-thumb-1', 'slideshow-thumb-2', 'slideshow-thumb-3',];
              var slideClassesToActivate = ['slideshow-thumb-3', 'slideshow-thumb-4', 'slideshow-thumb-5', 'slideshow-thumb-6', 'slideshow-thumb-7'];
              $scope.page.swipers.galleryIndex = 1;
              // for (var i = 0; i < slideClassesToClear.length; i++) {
              //     var clearClassIndex = slideClassesToClear[i];
              //     var clearElem = document.querySelector('.' + clearClassIndex);
              //     clearElem.style.opacity = 0;
              //     clearElem && clearElem.classList.add('clear');
              // }
              for (var j = 0; j < slideClassesToActivate.length; j++) {
                  var activateClassIndex = slideClassesToActivate[j];
                  var activateElem = document.querySelector('.' + activateClassIndex);
                  activateElem.style.opacity = 0;
              }
              $timeout(function() {
                for (var j = 0; j < slideClassesToActivate.length; j++) {
                  var activateClassIndex = slideClassesToActivate[j];
                  var activateElem = document.querySelector('.' + activateClassIndex);
                  activateElem && activateElem.classList.add('activate');
                }
              }, 750);
              $timeout(function() {
                var elem = document.querySelector('#getting-started-progress');
                elem.classList.add('activate');
              }, 1250)
          })
        })
      }
    }

    function showSplashHeroMap() {
      var splashHeroElem = document.querySelector('.splash-hero-map');
      if (splashHeroElem) {
        splashHeroElem.classList.remove('hide');
      }
    }

    function removeAllSwipersButOne(index) {
      var page_swipers = $scope.page.swipers.main.slides;
      var arrIndexToRemove = [];
      for (var i = 0; i < index; i++ ) {
        $scope.page.swipers.cachedBefore.push(page_swipers[i]);
        arrIndexToRemove.push(i);
      }
      for (var j = index + 1; j < page_swipers.length; j++) {
        $scope.page.swipers.cachedAfter.push(page_swipers[j]);
        arrIndexToRemove.push(j);
      }
      $scope.page.swipers.main.removeSlide(arrIndexToRemove);
    }

    function showProjectorAtTop(index) {
      var sectionSplashProjectorElem = document.querySelector('#splash-projector');
      var swiperContainer = document.querySelector('.header-swipers');
      LoadingService.showAmbig();
      if (swiperContainer) {
        swiperContainer.classList.add('a');
      }
      if (sectionSplashProjectorElem) {
        $timeout(function() {
          LoadingService.hide();
        }, 1000)
        $timeout(function() {
          sectionSplashProjectorElem.classList.add('absolute', 'top-0', 'bounceInDown', 'animated');
        }, 1250)
      }

      swiperContainer.style.opacity = 0;
      if (sectionSplashProjectorElem) {
        removeAllSwipersButOne(index)
        $scope.page.activeProjectorIndex = index;
        !$scope.projectorPullActivated && hideProjectorPrecursor();
        hideSwiperGallery();

        hideSplashHeroMap();
        hideSwiperNavButtons();
        sectionSplashProjectorElem.style.zIndex = 1003;
        $timeout(function() {
          sectionSplashProjectorElem.classList.remove('bounceInDown', 'animated');
          // sectionSplashProjectorElem.classList.remove('opacity-0');
          // swiperContainer.classList.remove('opacity-0-impt')
        }, 800)

      }
    };

    $scope.activateProjectorPull = function() {
      var splashHeroNavElem = document.querySelector('#splash-up-link');
      $scope.switchToSignup();
      // $scope.page
      if (!$scope.desktopMode) {

        if (splashHeroNavElem || $scope.desktopMode) {
          splashHeroNavElem && splashHeroNavElem.classList.add('opacity-0');
          $timeout(function() {
            $scope.projectorPullActivated = true;
          }, 2500);
        }
      } else {
        var projectorUpLink = document.querySelector('#desktop-projector-up-link');
        if (projectorUpLink) {
          projectorUpLink.style.opacity = 0;
        }
        $timeout(function() {
            projectorUpLink && projectorUpLink.classList.add('activate');
            $scope.projectorPullActivated = true;
        }, 2500);
      }

    }

    function moveProjectorToBottom(index) {
      var sectionSplashProjectorElem = document.querySelector('#splash-projector');
      if (sectionSplashProjectorElem) {
        sectionSplashProjectorElem.classList.add('bounceOutUp', 'animated');
      }
      showSplashHeroMap();
      $timeout(function() {
        $scope.page.activeProjectorIndex = null;
        sectionSplashProjectorElem.classList.remove('bounceOutUp', 'animated');
        sectionSplashProjectorElem.classList.remove('absolute', 'top-0');
        !$scope.projectorPullActivated && showProjectorPrecursor();
        addAllSwipersToUniversity();
        showSwiperGallery();
        showSwiperNavButtons();
        var swiperContainer = document.querySelector('.header-swipers');
        sectionSplashProjectorElem.style.zIndex = 1;
      }, 800)
    }

    function onSlideChangeEndMainSwiper($timeout, $scope) {
      return function(swiper) {
        $timeout(function(){
          $scope.$apply(function() {
            swiper.slides[swiper.activeIndex].classList.add('activate');
          })
        })
      }
    }

    function onSlideNextStart($timeout, $scope) {
      return function(swiper) {
        $timeout(function(){
          $scope.$apply(function() {
            // swiper.slides[swiper.previousIndex].classList.add('clear');

          })
        })
      }
    }

    // function onSlidePrevStart($timeout, $scope) {
    //   return function(swiper) {
    //     $timeout(function(){
    //       $scope.$apply(function() {
    //         swiper.slides[swiper.activeIndex + 1].classList.add('clear');
    //       })
    //     })
    //   }
    // }

    function swiperOnSlideChangeStart(s) {
      if (s.activeIndex===$('.swiper-slide-gallery').index()) {
        $(s.container[0]).find('.swiper-pagination').hide();
      } else {
        $(s.container[0]).find('.swiper-pagination').show();
      }
    }

    // $scope.request = RequestService.initStudentForm();
    $timeout(function() {
      var saveCategoriesToRootScope = function(categories) {
            $scope.categories = categories;
            $scope.categories = $scope.categories.filter(function(category, index) {
              return category.is_active;
            })
            for (var i = 0; i < $scope.categories.length; i++) {
                    var indexCategory = $scope.categories[i];
                    if (indexCategory.id === 4) {
                        $scope.categories[i].name = 'Tech';
                    }
                }
            if ($stateParams.category) {
              $scope.selectedCategory = $stateParams.category;
              $scope.selectedCategory.splashData = ContentService.splashCategoryOptions[$scope.selectedCategory.name]
            }
        }
      $scope.getCategories(saveCategoriesToRootScope);
    })

    function refreshTopState(category, university) {
      var bodyLoadingDiv = document.querySelector('#body-loading-div')
        bodyLoadingDiv.className ='hide';
        document.querySelector('#splash-home').classList.add('clear');
        category.splashData = ContentService.splashCategoryOptions[category.name];
        $timeout(function() {
          $state.go($state.current.name, {categoryId:category.id, category:category, universityId:university.id, university:university}, {
              reload: true,
              inherit: false,
              notify: true,
              location: false
          });
        }, 1500);
    }



    function getAllCourses(university) {
      var areCoursesInCache = $localstorage.getObject('selected_university_courses');
      if (university.courses && university.courses.length) {
        return;
      }
      if (areCoursesInCache && areCoursesInCache.length) {
        university.courses = areCoursesInCache;
      } else {
        University.getPopularCoursesPromise(university.id).then(function(courses) {
          university.courses = courses.plain();
          $localstorage.setObject('selected_university_courses', university.courses);
        }, function(err) {console.error('ERROR FETCHING COURSES', err)});
      }
    }

    $scope.shakeElemIfChildIsDisabled = function() {
      var translateBlankOneElem = document.querySelectorAll('.translate-blank-1');
      var translateBlankTwoElem = document.querySelectorAll('.translate-blank-2');
      if (!translateBlankTwoElem.length) {
        var blankTwo = document.querySelector('#blank-2');
        blankTwo && AnimationService.animateIn(blankTwo, 'tada')
      } else {
        var blankOne = document.querySelector('#blank-1');
        blankOne && AnimationService.animateIn(blankOne, 'tada')
      }
    }
    $scope.resetMadLibBlankIfActive = function ($event){

      var indexTranslateElem = $event.target.parentNode;
      var hasBlankOne = indexTranslateElem.className.indexOf('translate-blank-1') > -1;
      var hasBlankTwo = indexTranslateElem.className.indexOf('translate-blank-2') > -1;
      var desktopCTAButton = document.querySelector('#desktop-find-guru-button');
      var desktopCTAButtonUnveiled = desktopCTAButton.classList.contains('bounceInUp');
      areBothBlanksFilled();

      function areBothBlanksFilled() {
        $timeout(function() {
          var translateBlankOneElem = document.querySelectorAll('.translate-blank-1');
          var translateBlankTwoElem = document.querySelectorAll('.translate-blank-2');
          var total = translateBlankOneElem.length + translateBlankTwoElem.length;
          var invisibleCTAButton = document.querySelector('#desktop-find-guru-button-disabled');
          if (total === 2) {
            desktopCTAButton && desktopCTAButton.removeAttribute('disabled');
            if (invisibleCTAButton) {
              invisibleCTAButton.classList.add('hide');
            }
          } else if (total < 2) {
            desktopCTAButton && desktopCTAButton.setAttribute('disabled','');
            var invisibleCTAButton = document.querySelector('#desktop-find-guru-button-disabled');

            if (invisibleCTAButton) {
              invisibleCTAButton.classList.remove('hide');
            }
            $compile(desktopCTAButton.parentNode)($scope);
          }
        }, 500)
      }

      if (indexTranslateElem && indexTranslateElem.className.indexOf('recently-active') === -1 && (hasBlankOne || hasBlankTwo)) {
        var addLibContainer = document.querySelector(".splash-adlib");
        if (hasBlankOne) {
          var blankOneElem = document.querySelector('#blank-1 b');
          $timeout(function() {
            addLibContainer.classList.remove('blank-1-filled');
            blankOneElem.classList.remove('opacity-0-impt');
            indexTranslateElem.classList.remove('translate-blank-1', 'active');
          }, 100);
          blankOneElem.opacity = 1;
        }
        if (hasBlankTwo) {
          var blankTwoElem = document.querySelector('#blank-2 b');
          $timeout(function() {
            addLibContainer.classList.remove('blank-2-filled');
            blankTwoElem.classList.remove('opacity-0-impt');
            indexTranslateElem.classList.remove('translate-blank-2', 'active');
          }, 100);

          blankTwoElem.opacity = 1;
        }
        indexTranslateElem.style.webkitTransform = null;
        indexTranslateElem.style.MozTransform = null;
        indexTranslateElem.style.msTransform = null;
        indexTranslateElem.style.OTransform = null;
        indexTranslateElem.style.transform = null;
      }
    }

    function resetAllMadlibOptions(ul_elem) {
      all_li_elems = ul_elem.querySelectorAll('li a svg:first-child');
      for (var i = 0; i < all_li_elems.length; i++) {
        var indexLiElem = all_li_elems[i];
        indexLiElem && $scope.resetMadLibBlankIfActive({target:all_li_elems[i]});
      }
    }

    $scope.demoSwitchCategory = function(category, university) {
      var sceneNumber = getSceneNumber();
      $scope.page.dropdowns.category.toggle();
      if (sceneNumber > 1) {

        $scope.rewindUniversityMapScene(successCallback);
        var counterElem = document.querySelector('.device-counter');
        if (counterElem && counterElem.innerHTML && counterElem.innerHTML.length) {
          counterElem.innerHTML = "";
        }
        function successCallback() {
            $scope.refreshCategoryState(category, university);
        }
      }
      else {
        $scope.refreshCategoryState(category, university);
      }
    }

    $scope.refreshCategoryState = function(category, university, skip_scene_check) {
        var sceneNumber = getSceneNumber();
        var madLibElemInside = document.querySelector('.splash-adlib-inside ul');
        var madLibElemHeader = document.querySelector('.splash-adlib-inside h1');
        var isMadLibBlankOneFilled = document.querySelector('.splash-adlib.blank-1-filled');
        var isMadLibBlankTwoFilled = document.querySelector('.splash-adlib.blank-2-filled');
        var areMadLibBlankFilled = document.querySelector('.splash-adlib.active');
        var defaultTransitionTimeout = 0;
        if (isMadLibBlankOneFilled || isMadLibBlankTwoFilled || areMadLibBlankFilled) {
          resetAllMadlibOptions(madLibElemInside);
          defaultTransitionTimeout = 250;
        }
        $timeout(function() {
          madLibElemInside && madLibElemInside.classList.add('clear');
          madLibElemHeader && madLibElemHeader.classList.add('clear');
          $timeout(function() {
            madLibElemInside && madLibElemInside.classList.add('activate');
            madLibElemHeader && madLibElemHeader.classList.add('activate');
            $scope.selectedCategory = category;
            $scope.selectedCategory.splashData = ContentService.splashCategoryOptions[category.name];
          }, 1500)
        }, defaultTransitionTimeout);
    }

    function getSceneNumber() {
      var elem = document.querySelector('splash-hero-progress.progress span');
      if (elem) {
        if (elem.className.indexOf('animate') > -1) {
          return 2;
        }
      }
      var counterElem = document.querySelector('.device-counter');
      if (counterElem && counterElem.innerHTML && counterElem.innerHTML.length) {
        return 2;
      }
      var adlibElem = document.querySelector('.splash-adlib');
      if (adlibElem && adlibElem.className.indexOf('active') > -1) {
        return 2;
      }
      return 1;
    }

    function clearAnimationArgs(args) {
      for (var i = 0; i < args.length; i++) {
        var argIndexInjectClass = args[i][0]
        var argIndexElem = document.querySelector(argIndexInjectClass);
        argIndexElem && argIndexElem.classList.add('clear');
      }
    }

    function getStaticMapOptions() {
      return {
        scale: 1, //up to 2, only whole values
        map_type: "roadmap", //hybrid, terrain, satellite, roadmap
        size: "1280x1280",
        zoom: 17
      }
    }


    $scope.refreshUniversityState = function(university) {
      $scope.selectedUniversity = university;
      $scope.page.dropdowns.university.active = false;
      $timeout(function(){
        getAllCourses($scope.selectedUniversity);
        $localstorage.setObject('selected_university_courses', null);
      });
      if ($scope.activate.map) {
        initializeDynamicSelectedUniversityMap($scope.selectedUniversity);

        var currentSceneNumber = getSceneNumber();
        if (currentSceneNumber !== 2) {
          return;
        }
        LoadingService.showAmbig(null, 10000);
        var args = [
          ['.splash-hero-map', 'activate'],
          ['.splash-hero-markers', 'a'],
          ['.splash-device', 'a'],
          ['.coach-help-desktop', 'a'],
        ]
        clearAnimationArgs(args);
        $scope.getUniversityPlaces($scope.selectedUniversity)
        $timeout(function() {
          LoadingService.hide();
          for (var i = 0; i < args.length; i++) {
            var argIndexInjectClass = args[i][0]
            var argIndexElem = document.querySelector(argIndexInjectClass);
            argIndexElem && argIndexElem.classList.add(args[i][1]);
          }
        }, 5000)
      }
    }

    $scope.transitionToScene3 = function() {
      $scope.page.dropdowns.university.active = false;
      $scope.page.dropdowns.category.active = false;
      $scope.singleProjectorActivate = true;
      showProjectorAtTop(0);
      var backUpIcon = document.querySelector('#splash-up-link');
      backUpIcon && backUpIcon.classList.add('activate');
    }

    function activateMapElem() {
      var mapElem = document.querySelector('.splash-hero-map');
      if (mapElem.className.indexOf('activate') === -1) {
        mapElem.classList.add('activate');
      }
    }

    $scope.selectUniversityGettingStarted = function(university) {
      $scope.selectedUniversity = university;
      $scope.user.university = $scope.selectedUniversity;

      $scope.refreshUniversityState(university);
    }

    $scope.selectUniversityFromMap = function(university, bool) {

      $scope.selectedUniversity = university;
      $scope.refreshUniversityState(university);
      activateMapElem();
      $scope.scrollToSection('#splash-home');
      if (getSceneNumber() === 1) {
        moveProjectorToBottom(0);
      }
    }

    $scope.scrollToSection = function(section_selector) {
        var scrollDuration= $scope.page.scroll._length;
        var amount = $scope.page.scroll.amount;
        var successFunction = $scope.page.scroll.successFunction;
        var pageParentContainer = $scope.page.scroll.parentElem;
        var scrollOffset = $scope.page.scroll.offset;
        var easeType = $scope.page.scroll.easeType;

        ScrollService.scrollTo(amount, successFunction, scrollDuration, pageParentContainer, section_selector, scrollOffset, easeType);
    }

    $scope.hideSideBar = function() {
      var sidebarCTAModal = document.querySelector('#cta-modal-sidebar');
      CTAService.closeCTAManually('#cta-box-sidebar', function() {
        var menuLinks = document.querySelectorAll('ul.splash-sidebar-links li a');
        for (var i =0 ; i < menuLinks.length; i++) {
          var menuLinkIndexElem = menuLinks[i];
          menuLinkIndexElem.style.opacity = 0;
        }
      })
      $timeout(function() {
        sidebarCTAModal && sidebarCTAModal.classList.remove('show');
      }, 1000);
    }

    $scope.showSidebarLogin = function() {
         $scope.showSidebarOneProjector = true;
         $scope.root.vars.showSidebarOneProjector = $scope.showSidebarOneProjector;
         showProjectorAtTop(4);
         $scope.scrollToSection('#splash-projector')
    }

    $scope.clearAllCTAExcept = function(cta_arg) {
      var modalElems = document.querySelectorAll('.splash-sidebar-full .cta-modal');
      for (var i = 0; i < modalElems.length; i++) {
        var indexModalElem = modalElems[i];
        if (cta_arg && indexModalElem.id.indexOf(cta_arg) > -1) {
          continue;
        } else {
          indexModalElem.classList.remove('show');
        }
      }
      if (cta_arg !== 'support') {
        Intercom('hide');
      }
    }

    $scope.showSupportMainSplashSection = function() {
      Intercom('show');
    }

    $scope.activateMap = function() {
      $scope.activate.map = true;
      // $scope.selectedUniversity && initializeDynamicSelectedUniversityMap($scope.selectedUniversity);
    }

    $scope.activate.watcher = $scope.$watch('activate.state', function(newValue, oldValue) {
      switch (newValue) {

            case 1:
              //init map
              break;
            case 2: //api call
              initSwipers(responsiveSwiperArgs, $scope.desktopMode);
              break;

            case 3:
              //activate dropdown
              break;

            case 4:
              //activate sidebar
              break;
      }
    });

    $scope.onLoad = function() {

      resolveStateParams();

      University.initUniversitiesSplash($scope, getStaticMapOptions());

      var responsiveSwiperArgs = {

        desktop: {
          slidesPerView: 1,
          spaceBetween: 80
        },
        mobile: {
          // slidesPerView: 2, //defaults
          // spaceBetween: 0, // defaults
          // Responsive breakpoints
          breakpoints: {
            // when window width is <= 320px
            320: {
              slidesPerView: 1,
              spaceBetweenSlides: 0
            },
            // when window width is <= 480px
            480: { // you can
              slidesPerView: 1.15,
              spaceBetweenSlides: 0 //in pxs, negative doesn't work =/ -- BUT if you apply a -10margin its a lot better (see line 843)| WHEN IT IS NOT:(.SLIDE-ACTIVE) - should work!
            }
          }
        }
      }

      $scope.universities = University.getTargetted().slice();
      initSwipers(responsiveSwiperArgs, $scope.desktopMode);

      $timeout(function() {
        // $timeout(function() {
        //   angular.element('.adlib-1').triggerHandler('click');
        //   angular.element('.adlib-5').triggerHandler('click');
        //   $timeout(function() {
        //     angular.element('.splash-device-button button').triggerHandler('click');
        //   }, 5000);
        // }, 1500)
        // $scope.scrollToSection('#splash-projector');
        // $timeout(function() {
        //   var modalElem = document.querySelector('#cta-modal-sidebar')
        //   modalElem.classList.add('show');
        //   $timeout(function(){
        //     var activateElem = document.querySelector(".splash-sidebar-menu");
        //     activateElem && activateElem.classList.add('activate');
        //   }, 500)
        // }, 1250)
        // var mapElem = document.querySelector('.splash-hero-map')
        // $timeout(function(){
        //   mapElem.classList.add('activate')
        // }, 250)
        // $scope.switchToSignup();
        // document.querySelector('#desktop-find-guru-button').classList.add('activate');
        // document.querySelector('.splash-hero-map').classList.add('activate');
        // document.querySelector('#desktop-find-guru-button').classList.add('activate');
        // document.querySelector('.splash-hero-map').classList.add('activate');
        // $scope.activateProjectorPull();
        // $scope.scrollToSection('#splash-projector');
        // initializeDynamicSelectedUniversityMap($scope.selectedUniversity);
        // University.initUniversitiesSplash($scope);
        // autoscroll code
        // document.querySelector('.splash-hero-map').classList.add('activate');
        // initializeDynamicSelectedUniversityMap($scope.selectedUniversity);
        // document.querySelector('.splash-hero-map').classList.add('activate');
        // initializeDynamicSelectedUniversityMap($scope.selectedUniversity);
           // $scope.showSidebarLogin();
        // }, 1000);

        $timeout(function() {
          $scope.how_it_works = ContentService.generateUniversitySpecificHowItWorks($scope.university);
          $scope.become_guru = ContentService.generateUniversitySpecificBecomeGuruText($scope.university);
          // initHomeMap();
          $scope.page.sidebar = SideMenuService.initHomeSideMenu($scope);
          !$scope.desktopMode && SideMenuService.initHomeModals($scope);
          $scope.initCTASplash = initCTASplash;
          initCTASplash();
        }, 1500);
      })
    }

    function resolveStateParams() {
      if ($stateParams && $stateParams.category && $stateParams.category.id) {
        // $scope.root.loader.body.hide = true;
        // Utilities.compileToAngular('body-loading-div', $scope);
        $scope.selectedCategory = $stateParams.category;
        $scope.selectedCategory.splashData = ContentService.splashCategoryOptions[$scope.selectedCategory.name];
        $scope.selectedUniversity = $stateParams.university || University.getTargetted()[0];

      } else {
        $scope.selectedCategory = ($scope.categories && $scope.categories[0]) || {name: 'Academic', hex_color: 'academic', id:5, splashData: ContentService.splashCategoryOptions['Academic']};
        $scope.selectedCategory.splashData = ContentService.splashCategoryOptions[$scope.selectedCategory.name];

        $scope.selectedUniversity = University.getTargetted()[0];
        if ($state.current.name === 'root.splash') {
          Utilities.compileToAngular('body-loading-div', $scope);
        }
        $scope.root.loader.body.hide = true;
      }
      // initializeDynamicSelectedUniversityMap($scope.selectedUniversity);
    }

    $scope.lockFilledBlanksAndgetUniversityPlaces = function(university) {
      // panUniversityBy(university);

      var translateBlankOneElem = document.querySelector('.translate-blank-1');
      translateBlankOneElem && translateBlankOneElem.parentNode && translateBlankOneElem.parentNode.classList.add('opacity-1-impt');
      var translateBlankTwoElem = document.querySelector('.translate-blank-2');
      translateBlankTwoElem && translateBlankTwoElem.parentNode && translateBlankTwoElem.parentNode.classList.add('opacity-1-impt');
      $scope.getUniversityPlaces(university, true);
    }

    function toggleCategoryDropdown() {
      $scope.page.dropdowns.university.active = false;
      $scope.page.dropdowns.category.active = !$scope.page.dropdowns.category.active;
    }

    function toggleUniversityDropdown() {
      $scope.page.dropdowns.university.active = !$scope.page.dropdowns.university.active;
      $scope.page.dropdowns.category.active = false;
    }

    function initCTASplash() {
        $compile(document.querySelector('#cta-box-sidebar'))($scope);
        $scope.activate.sidebar = true;
        var ctaParentElemSelector = '#home-splash';
        CTAService.initSingleCTA("#cta-box-sidebar", ctaParentElemSelector, activateAtShow);
        function activateAtShow(modal_elem) {
          var sidebarAside = modal_elem.querySelector('.splash-sidebar-full');
          sidebarAside && sidebarAside.classList.remove('activate');
          sidebarAside && sidebarAside.classList.add('activate');
        }

        // CTAService.initSingleCTA("#cta-box-powerups", ctaParentElemSelector, activateAtShow);
        // function activateAtShow(modal_elem) {
        //   var sidebarAside = modal_elem.querySelector('.splash-powerups');
        //   sidebarAside && sidebarAside.classList.add('activate');
        // }
      }
      function closeAllDropdowns() {
          $scope.page.dropdowns.category.active = false;
          $scope.page.dropdowns.university.active = false;
      }

      resolveStateParams();

    // $scope.closeSingleProjector = function() {
    //   $scope.singleProjectorActivate = false;
    //   $scope.root.vars.showSidebarOneProjector = $scope.showSidebarOneProjector;
    //   if ($scope.page.swipers.main.slides.length > 1) {
    //     $scope.scrollToSection('#home-splash');
    //   } else {
    //     moveProjectorToBottom($scope.page.activeProjectorIndex);
    //   }
    // }



    // $scope.switchToBgScene = function(index) {
    //   var currentActive = document.querySelector('.bg-scene .bg-single-scene.active-scene');
    //   if (currentActive) {
    //     currentActive.classList.remove('active-scene');
    //     currentActive.classList.add('clear');
    //   }
    //   var selectedIndexScene = document.querySelector('.bg-scene-' + index);
    //   if (selectedIndexScene) {
    //     selectedIndexScene.classList.add('active-scene', 'activate');
    //   }
    // }



    // should be university light color


    //  $scope.getUniversityPlaces = function(university) {
    //   if (university.og_map  && (!university.place_results || !university.place_results.length)) {
    //     $timeout(function() {
    //       $scope.$apply(function() {
    //         GUtilService.getPlaceListByCoords($scope, university.og_map, {latitude: university.latitude, longitude: university.longitude}, updateMarkersOnUniversitySpecificMap);
    //       })
    //     })
    //   }
    //   // $scope.map.center = {latitude: university.latitude, university.longitude};
    // }

    // function translatePhoneToLeft() {
    //   var splashDeviceElem = document.querySelector('.splash-device.splash-device-iphone');
    // }

    // function initializeDynamicSelectedUniversityMap(university) {
    //   university.map = {
    //     control: {},
    //     coords: {latitude: university.latitude, longitude: university.longitude},
    //     markers: [],
    //     zoom: 16,
    //     // options: {styles: selectedUniversityMapStyles, scrollwheel: false, streetViewControl:false, scrollwheel:false, panControl:false,  mapTypeControl:false, style:{}, draggable:false, disableDoubleClickZoom:false, zoomControl: false},
    //     options: {styles: getSelectedUniversityMapStyles(university), scrollwheel: false, streetViewControl:false, scrollwheel:false, panControl:false,  mapTypeControl:false, style:{}, draggable:false, disableDoubleClickZoom:false, zoomControl: false},
    //     pan: true,
    //     refresh: false,
    //     events: {tilesloaded: function(map) {
    //       university.og_map = map;
    //       $scope.selectedUniversity.og_map = map;
    //       $scope.getUniversityPlaces($scope.selectedUniversity);
    //       function calcMarkerCoords(map) {
    //         return function () {
    //           var mapBounds = map.getBounds().getSouthWest();
    //           var mapCenter = map.getCenter();
    //           var dx = mapBounds.lat() - mapCenter.lat();
    //           var dy = mapBounds.lng() - mapCenter.lng();
    //           var newMarkerLat = mapBounds.lat() - (dx/6);
    //           var newMarkerLng = mapBounds.lng() - (dy/6); //purposely dx so its a square
    //           return {latitude: newMarkerLat, longitude: newMarkerLng};
    //         }
    //       }
    //       $timeout(function() {
    //         $scope.$apply(function() {
    //           university.map.marker = generateSelectedUniversityMapMarkerObj(university, calcMarkerCoords(map));
    //           university.mapRendered = true;
    //           university.map.markers = [];
    //         })
    //       })

    //     }},
    //   }
    //   $timeout(function() {
    //     if (!$scope.selectedUniversity.courses || !$scope.selectedUniversity.courses.length) {
    //       getAllCourses($scope.selectedUniversity);
    //     }
    //   }, 5000);
    //   function generateSelectedUniversityMapMarkerObj(university, calc_coords_func) {
    //     obj = university;
    //     var universityObj = {
    //         school_color_light: obj.school_color_light,
    //         banner_url: obj.banner_url,
    //         school_color_dark: obj.school_color_dark,
    //         name: obj.name,
    //         tiny_name: obj.school_tiny_name,
    //         city: obj.city,
    //         state: obj.state
    //     }
    //     var markerObj =  {
    //       coords: calc_coords_func(),
    //       id: university.id,
    //       control: {},
    //       options: {
    //         animation: google.maps.Animation.DROP,
    //         icon: {url: generateUniversityImgDataURI(universityObj), size: new google.maps.Size(100, 100)},//, scaledSize: new google.maps.Size(100, 100)
    //         labelClass: 'selected-university-svg-icon',
    //         labelVisible: false
    //       },
    //     }
    //     return markerObj;
    //   }
    // }



    // function panUniversityBy(university) {
    //     if (getSceneNumber() > 1) {
    //       // university.og_map.setCenterWithOffset(university.map, 0, 250);
    //       var viewContainer = document.querySelector('#splash-home');
    //       if (viewContainer) {
    //         var viewContainerRect = viewContainer.getBoundingClientRect();
    //         var thirdWindowWidth = viewContainerRect.width / 3.0;
    //         if (thirdWindowWidth) {
    //           $timeout(function() {
    //             $scope.$apply(function() {
    //               var result = calcMarkerCoords(university.og_map);
    //               $scope.selectedUniversity.map.coords = {latitude: result.latitude, longitude: $scope.selectedUniversity.map.coords.longitude};
    //               // $scope.selectedUniversity.map.coords.longitude = $scope.selectedUniversity.map.coords.longitude;
    //             })
    //           })
    //           // markersCopy = university.map.markers.slice();
    //           // university.map.markers = [];
    //           function calcMarkerCoords(map) {
    //             return function () {
    //               var mapBounds = map.getBounds().getSouthWest();
    //               var mapCenter = map.getCenter();
    //               var dx = mapBounds.lat() - mapCenter.lat();
    //               var dy = mapBounds.lng() - mapCenter.lng();
    //               var newMarkerLat = mapBounds.lat() - (dx/1.5);
    //               // var newMarkerLng = mapBounds.lng() - (dy/6); //purposely dx so its a square
    //               return {latitude: newMarkerLat, longitude: mapCenter.lng()};
    //             }
    //           }
    //           // university.map.markers = markersCopy;
    //         }
    //       }
    //     }
    //   // }, 5000);
    // }


    // function addRandomGurusToMarkers(markers) {
    //   for (var i = 0; i < markers.length; i ++) {
    //     var indexMarker = markers[i];
    //     indexMarker.guru = {
    //       name: 'Samir M.',
    //       lastActive: 'Active 10 min ago',
    //       message: "<p>Hey there<br>, I can tutor you in bio class. We'll get you an A in no time</p>",
    //       profile_url: 'https://uguru.me/static/web/images/team/gabrielle.png',
    //       type: 'templates/svg/wwf/' + iconGPlaceMapping('cafe') +  '.html',
    //       subcategory: 'Bio 1a',
    //     }
    //   }

    //   function iconGPlaceMapping(place_type) {
    //     var placeIconDict = {
    //       'cafe': 'coffee',
    //       'meal_takeaway': 'food',
    //       'restaurant': 'food',
    //       'restaurant': 'coffee',
    //     }
    //     return placeIconDict[place_type]
    //   }
    // }

    // function updateMarkersOnUniversitySpecificMap(university, selectedCategory) {

    //   // panUniversityBy(university);

    //   $timeout(function() {

    //     university.map.markers = [];
    //     var markerLabelDivs = [];
    //     for (var i = 0; i < 10; i++) {
    //       var indexPlace = university.place_results[i];
    //       var details = {
    //         place_name: indexPlace.name,
    //         open_now: indexPlace.opening_hours && indexPlace.opening_hours.open_now,
    //         type: indexPlace.types[0],
    //       }
    //       if (indexPlace.photos && indexPlace.photos.length) {
    //         for (var j = 0; j < indexPlace.photos.length; j++) {
    //           var indexPhoto = indexPlace.photos[j];
    //           if (indexPhoto && indexPhoto.getUrl) {
    //             details.place_photo_url = indexPhoto.getUrl({'maxWidth': 260}, {'maxHeight': 90});
    //             break;
    //           }
    //         }
    //       }
    //       university.map.markers.push(generateMarkerObj(indexPlace.geometry.location.lat(), indexPlace.geometry.location.lng(), i, selectedCategory.hex_color, details));
    //     }

    //     addRandomGurusToMarkers(university.map.markers);

    //     if ($scope.desktopMode) {
    //       $timeout(function() {
    //         var selectedMarkerElems = document.querySelectorAll('.university-place-marker');
    //         if (!selectedMarkerElems) {
    //           return;
    //         }
    //         var splashHeroMarkerElems = document.querySelectorAll('.splash-hero-marker')
    //         if (!splashHeroMarkerElems) {
    //           return;
    //         }

    //         for (var i = 0; i < splashHeroMarkerElems.length; i++) {
    //           var indexMarker = selectedMarkerElems[i];
    //           $compile(indexMarker)($scope);
    //           if (!indexMarker) {
    //             continue;
    //           }
    //           indexMarker.id = 'university-place-marker-' + (i + 1);
    //           var className = 'splash-hero-marker-' + (i+1);
    //           var indexDOMElem = document.querySelector('.' + className);
    //           indexDOMElem.classList.add('translate', 'marker-translate', 'a');
    //         }
    //       }, 2500);
    //     }
    //   }, 500)

    //   function generateMarkerObj(lat, lng, id, cat_hex, details) {
    //     var hexColorLookupDict = {'academic': '#e6389b'}
    //     var customIcon = {
    //       path: google.maps.SymbolPath.CIRCLE,
    //       scale: 10,
    //       strokeColor:'#e6389b',
    //       fillColor: hexColorLookupDict[cat_hex] || '#e6389b',
    //       size: new google.maps.Size(25, 25)
    //     }
    //     return {
    //       options: {
    //         labelClass: 'university-place-marker',
    //         icon: customIcon
    //       },
    //       coords: {latitude:lat, longitude:lng},
    //       id: id,
    //       details: details
    //       // place: place,
    //       // university: university
    //     }
    //   }
    //   // $compile(div)($scope);
    // }




    // phonePosition phoneWidth * 1.25
    // phonePosition phoneHeight * 1.25
    //

    // ***************
    // START MAP CODE
    // ***************
    // TODO: CLEANUP (EVERYTHING ABOVE IS CLEAN)

    //@gabrielle
    //read other options here https://developers.google.com/maps/documentation/static-maps/intro#MapTypes
    // var staticMapOptions = {
    //   scale: 1, //up to 2, only whole values
    //   map_type: "roadmap", //hybrid, terrain, satellite, roadmap
    //   size: "1280x1280",
    //   zoom: 17
    // }



    // $scope.mapBounds = {
    //   desktop: {
    //     northeast: {latitude: 54, longitude:-61.50},
    //     southwest: {latitude:15, longitude: -125}
    //   },
    //   mobile: {
    //     northeast: {latitude: 20.70, longitude:-100.50},
    //     southwest: {latitude:48.85, longitude: -55.90}
    //   }
    // }

    // $scope.mapZoom = {
    //     initialMobile: 2,
    //     initialDesktop: 4,
    //     maxZoom: 9,
    //     minZoom: 1
    //   }
    //   var cluster = {
    //     style: {
    //       xl: {bg_color: '#d3242c', width:128, height:128, textSize: 18, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
    //       l: {bg_color: '#df433a', width:96, height:96, textSize: 16, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
    //       m: {bg_color: '#eb6248', width:84, height:84, textSize: 14, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
    //       s: {bg_color: '#E5753C', width:64, height:64, textSize: 12, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
    //     },
    //     minClusterSize: 4, //direct correlation
    //     zoomOnclick: true,
    //     maxZoom: 7,
    //     gridSize: 125, //direct correlation
    //     customClass: "university-svg-cluster",
    //     styleThreshold: [10,30,70,80] //direct correlation
    //   }

    // var styleOptions = [{ featureType: 'water', elementType: 'geometry.fill', stylers: [
    //         { color: '#40484b' },
    //         { visibility: 'on' }
    //     ]},
    //     { featureType: 'landscape', elementType: 'geometry', stylers: [
    //         { color: '#51595c' },
    //         { visibility: 'on' }
    //     ]},
    //     { featureType: 'administrative', elementType: 'geometry.fill', stylers: [
    //         { color: '#51595c' },
    //         { visibility: 'on' }
    //     ]},
    //     { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [
    //         { color: '#FFFFFF' },
    //         { visibility: 'on' }
    //     ]},
    //     { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [
    //         { color: '#FFFFFF' },
    //         { visibility: 'on' }
    //     ]},
    //     { featureType: 'road', elementType: 'geometry', stylers: [
    //         { color: '#474e51' },
    //         { visibility: 'on' }
    //     ]},
    //     { featureType: 'transit', elementType: 'geometry', stylers: [
    //         { color: '#474e51' },
    //         { visibility: 'on' }
    //     ]},
    //     { featureType: 'poi', elementType: 'all', stylers: [ { visibility: 'off' } ]},
    //     { featureType: 'all', elementType: 'labels', stylers: [ {visibility: 'off'} ]}
    //   ];

      // $scope.universities = University.getTargetted();
      // $scope.staticUniversityMaps = GUtilService.generateStaticMapUrls($scope.universities.slice(0, 4), staticMapOptions);
      // $scope.search_text = {university: "", matching: []};

      // $scope.sidebarGetStarted = function() {
      //   LoadingService.show();
      //   var modalElemSidebar = document.querySelector('#cta-modal-sidebar');


      //   $scope.activateProjectorPull();
      //   $scope.projectorPullActivated = true;

      //   $scope.scrollToSection('#splash-projector');
      //   var projectTriggerElem = document.querySelector('#projector-pull')

      //   $timeout(function() {
      //     projectTriggerElem && projectTriggerElem.classList.add('activate');
      //     $scope.page.swipers.main.slideTo(2);
      //     // toggleGalleryDisplays();
      //   }, 1000)

      //   $timeout(function() {
      //     CTAService.closeCTAManually('#cta-box-sidebar', function() {
      //       modalElemSidebar && modalElemSidebar.classList.remove('show');
      //       $timeout(function() {
      //         LoadingService.hide();
      //       }, 1000)
      //     })
      //   }, 1500)

      // }

      // var calcZoom = function() {
      //   if ($scope.desktopMode) {
      //     return 3;
      //   } else {
      //     return 2;
      //   }
      // }

      // var mapDefaults = {
      //   zoom: calcZoom(),
      //   options: { streetViewControl:false, scrollwheel:false, panControl:false,  minZoom: $scope.mapZoom.minZoom, maxZoom: $scope.mapZoom.maxZoom,
      //              scrollwheel: false, mapTypeControl:false, styles:styleOptions, draggable:true, disableDoubleClickZoom:false, zoomControl: false
      //            }
      // }

      // var generateClusterImgDataURI = function(obj) {
      //     var baseSVGURL = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="' + obj.bg_color + '"></circle></svg>'
      //     return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL);
      // }

      // var generateUniversityImgDataURI = function(obj) {
      //   var baseSVGURL = "<svg style='height:25px; width:25px;' viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + obj.school_color_dark + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + obj.school_color_dark +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + obj.tiny_name + "</tspan></text></svg>"
      //   return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
      // }


      // var clusterCalculator = function(markers, num_styles) {
      //   //The function used to determine the text to be displayed on a cluster marker and the index indicating which
      //   // style to use for the cluster marker.

      //   var markerValues = markers.values();
      //   var universityArr = getUniversitiesFromMarkers(markerValues)
      //   var stateDict = getMostCommonStateFromUniversities(universityArr);
      //   var getTopXStateStr = processStateDictToStr(stateDict);

      //   function processStateDictToStr(state_dict) {
      //     var results = [];
      //     for (var key in state_dict) results.push([key, state_dict[key]]);

      //     results.sort(function(a, b) {
      //         a = a[1];
      //         b = b[1];

      //         return a < b ? -1 : (a > b ? 1 : 0);
      //     }).reverse();
      //     result_str = "";
      //     if (results.length === 1) {
      //       return "<span>" + universityArr.length + "</span> <span> schools </span> <span>" + results[0][0] + "</span>"
      //     }
      //     if (results.length === 2) {
      //       return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + '</span>';
      //     }
      //     if (results.length === 3 && universityArr.length >= cluster.styleThreshold[0]) {
      //       return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + '</span>';
      //     }
      //     if (results.length === 4 && universityArr.length >= cluster.styleThreshold[1]) {
      //       return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + ", " + results[3][0] + '</span>';
      //     }
      //     if (results.length > 4 && universityArr.length >= cluster.styleThreshold[1]) {
      //       return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + ", " + results[3][0] + ", " + results[4][0] + '</span>';
      //     }
      //     return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + '</span>';

      //   }

      //   function getUniversitiesFromMarkers(markers) {
      //     var arrUniversities = [];
      //     for (var i = 0; i < markers.length; i++) {
      //       var indexMarker = markers[i];
      //       arrUniversities.push(indexMarker.model.university);
      //     }
      //     return arrUniversities;
      //   }

      //   function getMostCommonStateFromUniversities(universities) {
      //     var stateDict = {};
      //     for (var i = 0; i < universities.length; i++) {
      //       var indexUniversity = universities[i];
      //       if (indexUniversity.state) {
      //         if (stateDict[indexUniversity.state]) {
      //           stateDict[indexUniversity.state] += 1;
      //         } else {
      //           stateDict[indexUniversity.state] = 1;
      //         }
      //       }
      //     }
      //     return stateDict;
      //   }



        // if (universityArr.length > cluster.styleThreshold[2]) {
        //   var indexNumber = 1
        // } else if (universityArr.length > cluster.styleThreshold[1] && universityArr.length <= cluster.styleThreshold[2]) {
        //   var indexNumber = 2
        // } else if (universityArr.length > cluster.styleThreshold[0] && universityArr.length <= cluster.styleThreshold[1]) {
        //   var indexNumber = 3
        // } else {
        //   var indexNumber = 4
        // }


      //   var resultDict = {
      //     text: getTopXStateStr,
      //     title: '+more',
      //     index: indexNumber
      //   }
      //   return resultDict;
      // }


      // var initClusterObj = function(marker_arr) {
      //   var options_dict = {
      //       minimumClusterSize:cluster.minClusterSize,
      //       calculator: clusterCalculator,
      //       styles:[
      //         {
      //           width:cluster.style.xl.width,
      //           height:cluster.style.xl.height,
      //           url: generateClusterImgDataURI({bg_color:cluster.style.xl.bg_color}),
      //           fontFamily: "Source Sans Pro",
      //           fontWeight: cluster.style.xl.fontWeight,
      //           textColor: cluster.style.xl.textColor,
      //           textSize: cluster.style.xl.textSize,
      //           anchorText: cluster.style.xl.anchorIcon
      //           // anchorIcon: "[0, 0]"
      //         },
      //         {
      //           width:cluster.style.l.width,
      //           height:cluster.style.l.height,
      //           url: generateClusterImgDataURI({bg_color:cluster.style.l.bg_color}),
      //           fontFamily: "Source Sans Pro",
      //           fontWeight: cluster.style.l.fontWeight,
      //           textColor: cluster.style.l.textColor,
      //           textSize: cluster.style.l.textSize,
      //           anchorText: cluster.style.l.anchorIcon
      //           // anchorText: "[0, 0]"
      //         },
      //         {
      //           width:cluster.style.m.width,
      //           height:cluster.style.m.height,
      //           url: generateClusterImgDataURI({bg_color:cluster.style.m.bg_color}),
      //           fontFamily: "Source Sans Pro",
      //           fontWeight: cluster.style.m.fontWeight,
      //           textColor: cluster.style.m.textColor,
      //           textSize: cluster.style.m.textSize,
      //           anchorText: cluster.style.m.anchorIcon
      //           // anchorText: "[0, 0]"
      //         },
      //         {
      //           width:cluster.style.s.width,
      //           height:cluster.style.s.height,
      //           url: generateClusterImgDataURI({bg_color:cluster.style.s.bg_color}),
      //           fontFamily: "Source Sans Pro",
      //           fontWeight: cluster.style.s.fontWeight,
      //           textColor: cluster.style.s.textColor,
      //           textSize: cluster.style.s.textSize,
      //           anchorText: cluster.style.s.anchorIcon
      //         },
      //       ],
      //       // title: "",
      //       zoomOnClick: cluster.zoomOnClick,
      //       maxZoom: cluster.maxZoom,
      //       gridSize: cluster.gridSize,
      //       clusterClass: cluster.customClass,
      //       // batchSize:
      //       averageCenter: true
      //   }
      //   return options_dict
      // }

      // function hasMapBeenShown() {
      //   var splashMap = document.querySelector('#splash-university.opacity-1-impt');
      //   return splashMap;
      // }
      // function hideAllClusters(selector) {
      //   $timeout(function() {
      //     var allClusterElems = document.querySelectorAll(selector) || [];
      //     for (var i = 0; i < allClusterElems.length; i++) {
      //         var indexCluster = allClusterElems[i];
      //         indexCluster.style.opacity = 0;
      //         if (!hasMapBeenShown()) {
      //           indexCluster.classList.add('opacity-0');
      //           indexCluster.setAttribute("class-on-activate", "bounceInUp:anim:keep");
      //           indexCluster.setAttribute("class-on-activate-delay", 1500 + (i * 50) + "");
      //         } else {
      //           indexCluster.classList.add('opacity-1', 'opacity-1-impt');
      //         }
      //         $compile(indexCluster)($scope);
      //     }
      //   }, 1000)
      // }

      // function setPulseClusters(selector) {
      //   $timeout(function() {
      //     var allClusterElems = document.querySelectorAll(selector) || [];
      //     for (var i = 0; i < allClusterElems.length; i++) {
      //       var indexCluster = allClusterElems[i];
      //       indexCluster.classList.add('animated', 'pulse');
      //     }
      //   })
      // }

      // var initHomeMap = function() {
      //     $scope.map = {
      //     center: {latitude: 42.5, longitude: -100},
      //     control: {},
      //     zoom:  $scope.mapZoom.initialDesktop,
      //     dragging: true, //true while map is dragging state, false otherwise
      //     refresh: false,
      //     options: mapDefaults.options,
      //     events: {tilesloaded: onMapRenderCompleteOnce},
      //     clusterOptions: initClusterObj(),
      //     clusterEvents: {mouseover: function(cluster){ setPulseClusters('.university-svg-cluster') }, clusteringend: function(cluster) {hideAllClusters('.university-svg-cluster')}},
      //     bounds: $scope.mapBounds, //Fit the map in the specified bounds. The expression must resolve to an object having both northeast and southwest properties. Each of those properties must have a latitude and a longitude properties.
      //     pan: true,
      //     bounds: $scope.mapBounds.desktop,
      //     markers: generateXMarkersFromUniversities(200, $scope.universities),
      //     rebuildMarkers: false,
      //     window: {coords:{}, show:false, university: {}, options:defaultWindowOptions, close:closeInfoWindow}
      //   }
      //   if (!$scope.desktopMode) {
      //     $scope.map.zoom = $scope.mapZoom.initialMobile
      //     $scope.map.bounds = $scope.mapBounds.mobile
      //   }
      // }

      // var createMarkerObj = function(obj) {

      //   var universityObj = {
      //       school_color_light: obj.school_color_light,
      //       banner_url: obj.banner_url,
      //       school_color_dark: obj.school_color_dark,
      //       name: obj.name,
      //       tiny_name: obj.school_tiny_name,
      //       city: obj.city,
      //       state: obj.state
      //   }
      //   return {
      //     id: obj.id,
      //     latitude: obj.latitude,
      //     longitude: obj.longitude,
      //     icon: {url: generateUniversityImgDataURI(universityObj), size: new google.maps.Size(60, 60), scaledSize: new google.maps.Size(60, 60)},
      //     events: {
      //       click: onMarkerClick
      //     },
      //     university: universityObj
      //   }
      // }

      // var generateXMarkersFromUniversities = function(x, universities_arr, with_interval) {

      //   var universities_arr = universities_arr.slice(0, x);
      //   var marker_obj_arr = [];
      //   for (var i = 0; i < universities_arr.length; i++) {
      //     marker_obj_arr.push(createMarkerObj(universities_arr[i]));
      //   }
      //   return marker_obj_arr;
      // }

      // var windowCloseButtonIsClicked = function(e) {
          // return
      // }

      // var defaultWindowOptions = {
      //     pixelOffset: new google.maps.Size(0, -10, 'px', 'px'),
      //     closeclick: windowCloseButtonIsClicked
      // }

      // var closeInfoWindow = function() {
      //   $scope.map.window.show = false;
      // }

      // var refreshMap = function() {
      //   $scope.map.refresh = true;
      //   $timeout(function() {
      //     $scope.map.refresh = false;
      //   })
      // }



      // var updateWindowToMarker = function(window_obj, model_obj) {
      //   window_obj.coords = {latitude:model_obj.latitude, longitude:model_obj.longitude};
      //   window_obj.university = model_obj.university;
      // }

      // var deleteWindowExtraCSS = function() {
      //     var elem = document.querySelector('.gm-style-iw');
      //     var children = elem.parentElement.childNodes;
      //     for (var i = 0; i < children.length; i++) {
      //         var indexChild = children[i];
      //         if (indexChild !== elem) {
      //             indexChild.style.display = "none"
      //         }
      //     }
      // }

      // function getUniversityFromOriginalArray(uni_arr, _id) {
      //   for (var i = 0; i < uni_arr.length; i++) {
      //     var indexUniversity = uni_arr[i];
      //     if (indexUniversity.id === _id) {
      //       return indexUniversity;
      //     }
      //   }
      // }

      // var onMarkerClick = function(marker, event_name, model) {
      //   LoadingService.showAmbig(null, 10000);
      //   $timeout(function() {
      //     var origUniversity = getUniversityFromOriginalArray($scope.universities, model.id);
      //     origUniversity && $scope.selectUniversityFromMap(origUniversity);

      //     LoadingService.hide();
      //   }, 1000)
      //   // updateWindowToMarker($scope.map.window, model);
      //   // $scope.map.window.show = true;
      //   // $timeout(function() {
      //   //   deleteWindowExtraCSS();
      //   // }, 100)
      //   // $timeout(function() {
      //   //   $compile(document.getElementById('university-info-window-button'))($scope);
      //   //   $compile(document.getElementById('university-info-window-close-button'))($scope);
      //   // }, 1000)
      // }

      // function onMapRenderCompleteOnce(map) {
      //   if (!$scope.map.og_map) {
      //     $scope.mapHasRendered = true;
      //     $scope.map.og_map = map;
      //     document.querySelector('#splash-university').classList.add('show-map');
      //   }
      // }


      // $timeout(function() {

      // });


  }
])


