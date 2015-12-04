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
  function($rootScope, $scope, $state, $timeout, $localstorage, $ionicPlatform,
    $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $ionicSlideBoxDelegate,
    $ionicViewSwitcher, $window, University, uTracker, AnimationService,
    Category, $ionicSlideBoxDelegate, DeviceService, Utilities, $interval,
    KeyboardService, LoadingService, AnimationService) {
    $scope.activeSlideIndex = 0;
    $scope.injectAnimated = false;

    var CTA_PARENT = '#desktop-guru-onboarding div.main';
    var CTA_OPTIONS = {
        duration:0.5,
        extraTransitionDuration:1
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
      console.log('running progress again');
      $scope.progress.width = 16.66;
      var progressValue = 16.66;
      if ($scope.user.guru_courses.length) {
        console.log('user has guru courses');
        $scope.progress.width += 16.66;
        progressValue += 16.66;
      }

      if ($scope.user.guru_subcategories.length) {
        $scope.progress.width += 33.3;
        progressValue += 33.3;
        console.log('user has guru subcategories');
      }

      if ($scope.user.profile_url && ($scope.user.profile_url.indexOf('avatar.svg') < 0)) {
        $scope.progress.width += 33.3;
        progressValue += 33.3;
      }

      if (Math.round($scope.progress.width) >= 100) {
       $scope.completeAndGoToGuru();
      }
      // $scope.progress.widthValue = $scope.progress.width;
      $scope.progress.width = $scope.progress.width + '%';
      return progressValue;
    }

    $scope.completeAndGoToGuru = function() {
       LoadingService.showAmbig('Saving', 1000, function() {
          function callbackSuccess() {
            $scope.goToGuruMode();
          }
          LoadingService.showSuccess("Your guru profile is almost complete!", 2500, callbackSuccess)
      })
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
        $scope.completeAndGoToGuru();
      }
    }

    function addEventListenerToCTABox(box_elem, modal_elem_id, index) {
            box_elem.addEventListener('click', function() {
            var modal_elem = document.querySelector('#' + modal_elem_id);

            var closeCTAModal = cta(box_elem, modal_elem, CTA_OPTIONS, function() {
                $timeout(function() {
                    modal_elem.classList.add('show');
                }, 200);

                var nestedCTACloseButtons = modal_elem.querySelectorAll('.cta-modal-close')
                for (var j = 0; j < nestedCTACloseButtons.length; j++) {
                  var indexCTAButton = nestedCTACloseButtons[j];

                  indexCTAButton.addEventListener('click', function() {
                    if (indexCTAButton.innerHTML && indexCTAButton.innerHTML === "Save") {
                      LoadingService.showAmbig('Saving...', 1500);
                      $timeout(function() {
                        closeCTAModal();
                      }, 750)
                    } else {
                      closeCTAModal();
                    }

                    $scope.calculateProgress();
                    modal_elem.classList.remove('show');
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
        console.log('\n\nprocessing box --> modal mapping', elem_id, modalID, '\n\n');
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
      console.log(inputs.length, 'found');
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
        console.log("inside courses slide");


      }

      else if (index === 2) {
          $ionicSlideBoxDelegate.update();
          $scope.categories = Category.categories;
        try {
          $interval.cancel(startScanner)
        } catch (err) {
          console.log("Error in canceling interval startScanner: " + err);
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
      console.log(element.className);
      if (element.className.indexOf('selected') === -1) {
        element.className += " animated pulse";
        $scope.tempElement = element;
        $timeout(function() {
          $scope.tempElement.className += ' selected';
        }, 500);
      }
    }

    var incrementProgressBar = function(elemId, value) {
      console.log(document.querySelector('#become-guru-progress'));
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
        $scope.calculateProgress();

        Category.mapActiveToSubcategories(Category.categories, $scope.user);
        $scope.categories = Category.categories;
      }, 1000)
      console.log('ayy');
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