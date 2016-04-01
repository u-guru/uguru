angular.module('uguru.desktop.controllers')

.controller('DesktopBecomeGuruController', [

  //All imported packages go here
  '$rootScope',
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicPlatform',
  '$ionicSlideBoxDelegate',
  '$ionicViewSwitcher',
  '$window',
  'University',
  'uTracker',
  'AnimationService',
  'Category',
  '$ionicSlideBoxDelegate',
  'DeviceService',
  'Utilities',
  '$interval',
  'KeyboardService',
  'LoadingService',
  'AnimationService',
  '$stateParams',
  function($rootScope, $scope, $state, $timeout, $localstorage, $ionicPlatform,
    $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $ionicSlideBoxDelegate,
    $ionicViewSwitcher, $window, University, uTracker, AnimationService,
    Category, $ionicSlideBoxDelegate, DeviceService, Utilities, $interval,
    KeyboardService, LoadingService, AnimationService, $stateParams) {
    $scope.activeSlideIndex = 0;
    $scope.injectAnimated = false;

    var CTA_PARENT = '#desktop-guru-onboarding div.main';
    var CTA_OPTIONS = {
        duration:0.33,
        extraTransitionDuration:1
    }
    if ($stateParams.universityObj) {
      $scope.university = $scope.universityObj;
      $scope.root.vars.university = $scope.university;
      $localstorage.setObject('university', $scope.university);
      $scope.user.university = $scope.university;
    }
    if ($scope.root.vars.university && !$stateParams.universityObj) {
      $scope.university = $scope.root.vars.university;
      $localstorage.setObject('university', $scope.university);
      $scope.user.university = $scope.university;
    }

    $timeout(function() {
      var localCacheUniversity = $localstorage.getObject('university');
      if (localCacheUniversity) {
        $scope.university = localCacheUniversity;
        $scope.root.vars.university = localCacheUniversity;
        $localstorage.setObject('university', $scope.university);
        $scope.user.university = $scope.university;
      }
    });

    $scope.goBackOneLevel = function() {
      if ($scope.user.id) {
        AnimationService.flip('^.student-home');
      }
      else if ($scope.root.vars.university) {
        var university = $scope.university || $scope.root.vars.university;
        AnimationService.flip('^.universities', {}, {universityId:university.id, universityObj:university});
      } else {
        AnimationService.flip('^.home');
      }
    }

    $scope.progress = {width:0};

    $scope.active_category = {name:'Select category', active:false};

    $scope.goBackToUniversities = function() {
      $timeout(function() {
        $localstorage.setObject('user', $scope.user);
      }, 0)
      AnimationService.flip('^.university');
    }

    $scope.calculateProgress = function() {
      $scope.progress.width = 16.66;
      var progressValue = 16.66;
      if ($scope.user.guru_courses && $scope.user.guru_courses.length) {
        $scope.progress.width += 16.66;
        progressValue += 16.66;
      }

      if ($scope.user.guru_subcategories && $scope.user.guru_subcategories.length) {
        $scope.progress.width += 33.3;
        progressValue += 33.3;
      }

      if ($scope.user.profile_url && ($scope.user.profile_url.indexOf('avatar.svg') < 0)) {
        $scope.progress.width += 33.3;
        progressValue += 33.3;
      }

      if (Math.round($scope.progress.width) >= 100) {
       $scope.showFinishButton = true;
       $scope.completeAndGoToGuru();
      }
      // $scope.progress.widthValue = $scope.progress.width;
      $scope.progress.width = $scope.progress.width + '%';
      return progressValue;
    }

    $scope.completeAndGoToGuru = function() {
        if (!$scope.yourAllSetAlreadyShown) {
          LoadingService.showSuccess("You're all set!", 1500);
          $scope.yourAllSetAlreadyShown = true;
        }

    }

    var mapGuruCoursesToCategoriesObj = function(guru_courses) {
      guruCategoryCourses = [];
      for (var i = 0; i < guru_courses.length; i++) {
        var guru_course = guru_courses[i];
        guruCategoryCourses.push({
          name: guru_course.name,
          id: guru_course.id,
          active: true
        });
      }
      return guruCategoryCourses;
    }

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }

    $scope.skipBecomeGuruAndGoToGuru = function() {
      var progressValue = $scope.calculateProgress();
      if (progressValue < 66) {
        $scope.loader.showMsg('Please fill out at least 2/3 to continue!', 0, 2000);
      } else {
        AnimationService.flip('^.guru-home')
      }
    }

    function addEventListenerToCTABox(box_elem, modal_elem_id, index) {
            box_elem.addEventListener('click', function() {
            var modal_elem = document.querySelector('#' + modal_elem_id);

            var closeCTAModal = cta(box_elem, modal_elem, CTA_OPTIONS, function() {
                // $timeout(function() {
                    modal_elem.classList.add('show');
                // }, 200);

                var nestedCTACloseButtons = modal_elem.querySelectorAll('.cta-modal-close')
                for (var j = 0; j < nestedCTACloseButtons.length; j++) {
                  var indexCTAButton = nestedCTACloseButtons[j];

                  indexCTAButton.addEventListener('click', function(e) {
                    if (e.target.innerHTML && e.target.innerHTML === "Save") {
                      LoadingService.showSuccess('Saved', 1000);
                      $timeout(function() {
                        closeCTAModal();
                        modal_elem.classList.remove('show');
                      }, 500)
                    } else {
                      closeCTAModal();
                      modal_elem.classList.remove('show');
                    }

                    $scope.calculateProgress();
                  });
                }
            }, CTA_PARENT);
        });
    }



    function initCTA() {
        var allCTABoxes = document.querySelectorAll('.cta-box') || [];
        var allCTAModels = document.querySelectorAll('.cta-modal') || [];
        for (var i = 0; i < allCTABoxes.length; i++) {
            var indexCTABox = allCTABoxes[i];
            var indexCTAModalID = getModalCTAElemID(indexCTABox);
            addEventListenerToCTABox(indexCTABox, indexCTAModalID, i)

        }
    }

     function getModalCTAElemID(cta_box_elem) {
        elem_id = cta_box_elem.id;
        modalID = elem_id.replace('box', 'modal');
        return modalID;
    }

    $scope.goBackToStudentHome = function() {

      uTracker.track(tracker, 'Student Home');
      $ionicViewSwitcher.nextDirection('back');
      $ionicSlideBoxDelegate.update();
      $state.go('^.guru-home');
      //AnimationService.slide('right');
    }
    var clearAllSearchInputs = function() {
      var inputs = document.querySelectorAll('input');
      for (var i = 0; i < inputs.length; i ++) {
        var currentIndexInput = inputs[i];
        currentIndexInput.value = '';
      }

    }

    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }


    $scope.activeSlideIndex = 0;
    $scope.slideHasChanged = function(index) {
      $scope.activeSlideIndex = index;

      KeyboardService.closeKeyboardIfExists();
      clearAllSearchInputs();

      if (index === 0) {

        $timeout(function() {
          $scope.loader.hide();
        }, 500)

        uTracker.track(tracker, 'Become Guru: Majors');



        $ionicSideMenuDelegate.canDragContent(false);
      }

      else if (index === 1) {

        uTracker.track(tracker, 'Become Guru: Courses');

      }

      else if (index === 2) {
          $ionicSlideBoxDelegate.update();
          $scope.categories = Category.categories;
        try {
          $interval.cancel(startScanner)
        } catch (err) {
          console.error("Error in canceling interval startScanner: " + err);
        }

        uTracker.track(tracker, 'Become Guru: Skills');
        $ionicSideMenuDelegate.canDragContent(true);
      }

      else if (index === 3) {

        uTracker.track(tracker, 'Become Guru: Photo');
        $ionicSideMenuDelegate.canDragContent(false);
      }
       else {
        $ionicSideMenuDelegate.canDragContent(true);
      }
    }

    $scope.onDragLeft = function() {

      if ($scope.activeSlideIndex === 0) {
        $ionicSideMenuDelegate.canDragContent(true);
        $ionicSlideBoxDelegate.enableSlide(true);
      }
      if ($scope.activeSlideIndex === 3) {
        $ionicSideMenuDelegate.canDragContent(false);
        $ionicSlideBoxDelegate.enableSlide(false);
      }

      return;
    }

    $scope.onDragRight = function() {

      if ($scope.activeSlideIndex === 0) {
        $ionicSideMenuDelegate.canDragContent(false);
        $ionicSlideBoxDelegate.enableSlide(false);
      }
      if ($scope.activeSlideIndex === 3) {
        $ionicSideMenuDelegate.canDragContent(true);
        $ionicSlideBoxDelegate.enableSlide(true);
      }

      return;
    }
    // $scope.onDragLeft = function() {

    //   if ($scope.activeSlideIndex === 0) {
    //     $ionicSlideBoxDelegate.enableSlide(true);
    //   }
    // }

    $scope.goToUniversity = function() {

      uTracker.track(tracker, 'University List');
    $state.go('^.university');
    }

    $scope.goToGuruMode = function() {

      uTracker.track(tracker, 'Guru Mode');
      $scope.root.vars.guru_mode = true;
      $ionicViewSwitcher.nextDirection('forward');
      if ($scope.desktopMode) {
        $state.go('^.guru-home');
      } else {
        $state.go('^.guru');
      }

    }

    $ionicSideMenuDelegate.canDragContent(false);


    $scope.initSlideBoxModals = function() {


      // $ionicModal.fromTemplateUrl(BASE + 'templates/category.skills.modal.html', {
      //       scope: $scope,
      //       animation: 'slide-in-up'
      // }).then(function(modal) {
      //     $scope.categorySkillsModal = modal;
      // });


    }


    var injectClassIntoElement = function(e) {
      element = e.target
      if (element.className.indexOf('selected') === -1) {
        element.className += " animated pulse";
        $scope.tempElement = element;
        $timeout(function() {
          $scope.tempElement.className += ' selected';
        }, 500);
      }
    }

    var incrementProgressBar = function(elemId, value) {
      document.querySelector('#become-guru-progress').setAttribute("value", value);
    }

    var initProgressBar = function(elemId,width, value) {
      var progressBarTag = document.getElementById(elemId);
      progressBarTag.style.width = width + 'px';
    }

    $scope.$on('$ionicView.enter', function() {

      $scope.categories = Category.categories;
      $ionicSlideBoxDelegate.update();
      $timeout(function() {
        $scope.yourAllSetAlreadyShown = true;

        $scope.calculateProgress();

        $timeout(function() {
          $scope.yourAllSetAlreadyShown = false;
        }, 1000)

        Category.mapActiveToSubcategories(Category.categories, $scope.user);
        $scope.categories = Category.categories;
      }, 1000)

      //since this is the same as entering the slidebox
      var universityId = $scope.user.university && $scope.user.university_id || 2307;
      if (DeviceService.isIOSDevice()) {
        DeviceService.ios.setStatusBarText($state.current.name);
      }

      $timeout(function() {
        initCTA();
      }, 1500)

    }, 500)


  }



])