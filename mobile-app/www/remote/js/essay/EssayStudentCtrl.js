angular.module('uguru.util.controllers')
.controller('EssayStudentController', [
  '$scope',
  '$timeout',
  '$state',
  '$interval',
  'University',
  '$ionicViewSwitcher',
  '$ionicScrollDelegate',
  '$ionicSideMenuDelegate',
  'ScrollService',
  'ContentService',
  'AnimationService',
  'TransitionService',
  '$localstorage',
  'LoadingService',
  function AccessController($scope, $timeout, $state, $interval, University, $ionicViewSwitcher, $ionicScrollDelegate,
    $ionicSideMenuDelegate, ScrollService, ContentService, AnimationService, TransitionService, $localstorage, LoadingService) {
    var UPPER = 12;
    var LOWER = 0;
    var pageParentContainer;
    var scrollDuration= 500;
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.checkPosition = function() {
      ScrollService.initStickyHeaderScroll("#essay-header", "#essay-pricing", 'active', '#essay-student-home');
    }

    $scope.callToAction = {text:"Get Started", extendedText: "Get Started"};

    var showDelayedBecomeGuruHeader = function() {


      $timeout(function() {

        var becomeGuruShown = $scope.root.vars.page_cache.essayHomeBecomeGuru;
        if (!becomeGuruShown) {
          $scope.becomeGuruHeaderActive = true;
          $scope.root.vars.page_cache.essayHomeBecomeGuru = true;
          $localstorage.setObject('page_cache', $scope.root.vars.page_cache);
        }
      }, 7000);
    }
    var shouldShowBecomeGuruHeader = true;

    $scope.faqs = ContentService.faq;
    $scope.how_it_works = ContentService.how_it_works;

    //default
    $scope.university = {name:'Harvard'};
    $scope.root.vars.hs_mode = true;
    $scope.page = {modals: {backdrop: {active:false}}};

    $interval(function() {
      $scope.university = selectRandom($scope.targettedUniversities);
    }, 3500)

    $scope.flipToLogin = function() {
      LoadingService.showAmbig(null, 2000)
      $timeout(function() {
        AnimationService.flip('^.essay-student-login')
      }, 500)
    }

    $scope.goToUniversity = function() {
      //if not currently logged in
      if (!$scope.user.id) {

        if ($scope.desktopMode) {
          $ionicViewSwitcher.nextDirection('forward');
          $state.go('^.essay-student-university');
        } else {
          AnimationService.flip('^.essay-student-university');
        }

      } else {
        LoadingService.showAmbig('Redirecting you to your dashboard...', 2000);
        $timeout(function() {

          if ($scope.desktopMode) {
            AnimationService.flip('^.essay-student-home-desktop');
          } else {
            AnimationService.flip('^.essay-student-home-mobile');
          }

        }, 1000)

      }
    }

    $scope.scrollToSection = function(section_selector) {
      var amount = null;
      var successFunction = null;
      var pageParentContainer = '#essay-student-home';
      ScrollService.scrollTo(amount, successFunction, scrollDuration, pageParentContainer, section_selector);
      $timeout(function() {
        ScrollService.initStickyHeaderScroll("#essay-header", "#essay-pricing", 'active', '#essay-student-home');
      }, scrollDuration + 100)
    }

    $scope.scrollToPricing = function() {
      var nothing;
    }

    $scope.showBudgetLoader = function() {
      LoadingService.showMsg("Out of budget? Please contact budgeting@uguru.me for a quick reply. We'll try our best to get you help.", 3000);
    }

    $scope.showSophisticatedLoader = function() {
      LoadingService.showMsg("Seeking an unlimited plan? You are not the only one, please contact premium@uguru.me for a quick reply.", 3000);
    }

    $scope.showSupportLoader = function() {
      LoadingService.showMsg("Contact support@uguru.me for a quick reply.", 3000);
    }

    var selectRandom = function(university_arr) {
      return university_arr[Math.floor(Math.random()*university_arr.length)];
    }
    var countNull = 0;
    var filterTargetted = function(university_arr) {
      indices_to_slice = [];
      var landingUniversities = [];
      var notShortenedUniversities = [];

      for (var i = 0; i < university_arr.length; i++) {

        var tempName = university_arr[i].name;
        var tempShortName = university_arr[i].short_name;
        //case one original is this size
        if (tempName.length <= 13 && tempName.length >= 8) {

          var universityCopy = JSON.parse(JSON.stringify(university_arr[i]));
          landingUniversities.push(universityCopy);

        }

        else if
        (tempShortName && tempShortName.length <= 13 && tempShortName.length >= 8) {
          //set short name to name
          var universityCopy = JSON.parse(JSON.stringify(university_arr[i]));
          universityCopy.name = universityCopy.short_name;
          if (universityCopy.name.split(' ').length === 1) {
            var before = universityCopy.name;
            //uppercase first letter
            universityCopy.name = universityCopy.name[0].toUpperCase() + universityCopy.name.slice(1);
          }
          landingUniversities.push(universityCopy);
        }
        else if (tempName && tempName.toLowerCase().indexOf('college') > -1) {
            tempShortNameWithCollege = tempName.replace(' College', '').replace(' college', '');

            if (tempShortNameWithCollege.length <= 13 && tempShortNameWithCollege.length >= 8) {

              var universityCopy = JSON.parse(JSON.stringify(university_arr[i]));
              universityCopy.name = tempShortNameWithCollege;
              landingUniversities.push(universityCopy);

            }
        }
        // else if (tempName && tempName.toLowerCase().indexOf('university') > -1) {
        //     tempShortNameWithCollege = tempName.replace(' University', '').replace(' university', '');

        //     if (tempShortNameWithCollege.length <= 13 && tempShortNameWithCollege.length >= 8) {

        //       var universityCopy = JSON.parse(JSON.stringify(university_arr[i]));
        //       universityCopy.name = tempShortNameWithCollege;
        //       landingUniversities.push(universityCopy);

        //     }
        // }
        else {
          if (!university_arr[i].short_name) {
            countNull += 1
          }
          notShortenedUniversities.push(university_arr[i].name + '--' + university_arr[i].short_name)
        }

      }
      return landingUniversities;
    }

    $scope.targettedUniversities = filterTargetted(University.getTargetted());

    // loaded means first time only
    $scope.$on('$ionicView.loaded', function() {
         shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader()
         if ($scope.user.id && $scope.user.high_school) {
          var user_name = $scope.user.name.split(' ')[0];
          if (user_name.length < 12) {
            user_name = user_name[0].toUpperCase() + user_name.slice(1);
            $scope.callToAction.text = user_name + "'s Account";
          } else {
            $scope.callToAction.text = 'My Dashboard';
          }
          $scope.callToAction.extendedText = 'Go to My Dashboard'
         }
    });

  }



]);