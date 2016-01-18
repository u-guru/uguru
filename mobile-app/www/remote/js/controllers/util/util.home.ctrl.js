angular.module('uguru.util.controllers')

.controller('HomeController', [
  '$scope',
  '$state',
  '$stateParams',
  'Restangular',
  'User',
  '$ionicSideMenuDelegate',
  'LoadingService',
  '$timeout',
  'ScrollService',
  'uiGmapGoogleMapApi',
  'SearchboxService',
  'GMapService',
  'GUtilService',
  'ContentService',
  'CTAService',
  'PeelService',
  'TypedService',
  '$localstorage',
  '$ionicViewSwitcher',
  '$ionicModal',
  'AnimationService',
  'University',
  'CounterService',
  function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate,
    LoadingService, $timeout, ScrollService, uiGmapGoogleMapApi,
    SearchboxService, GMapService,GUtilService, ContentService, CTAService, PeelService, TypedService,
    $localstorage, $ionicViewSwitcher, $ionicModal, AnimationService, University, CounterService) {

      $scope.componentList = [
        {type: 'university', fields:['name', 'num_popular_courses', 'start date', 'city', 'state', 'longitude', 'latitude', 'days til start', 'num_courses' ,'school_color_one', 'school_color_two', 'banner_url', 'short_name', 'name', 'popular_courses']}
      ];
      var scrollDuration= 500;
      var shouldShowBecomeGuruHeader = true;
      var shouldRenderMap = true;
      var mainPageContainer = document.querySelector('#home-splash')
      $ionicSideMenuDelegate.canDragContent(false);

      $scope.highlighted_item;
      $scope.courses = [];
      $scope.activeTabIndex = 1;
      $scope.university = {}
      $scope.search_text = {university:''};
      $scope.profile = {public_mode: true};
      $scope.page = {dropdowns: {}, predictionMarkers:[], sidebar:{}, showAnimation:false, offsets:{}, header: {}, peels:{}, status:{}, counters:{}};
      $scope.page.sidebar = {show:false};
      $scope.page.status = {loaded:false, showLoader:true};
      $scope.page.header = {showSolidNav:false};
      $scope.sampleProfiles = ContentService.sampleProfiles;
      $scope.sampleMiniProfilesDict = ContentService.generateMiniSampleProfileDict();

      var calcAllMainSectionContainers = function() {
        $scope.page.offsets = {
          browse: document.querySelector('#splash-university').offsetTop,
          become_guru: document.querySelector('#become-guru').offsetTop,
          how_it_works: document.querySelector('#how-it-works').offsetTop,
        }
      }



      $scope.selectUniversityAndTransition = function(university, $event, $index) {
        var pageLoader = document.querySelector('cta-modal-page-loader');
        AnimationService.flip('^.universities', {}, {universityId:university.id, universityObj:university});
      }

      $scope.peelCard = function($event, item, type) {
        if ($scope.peelInTransition) {
          console.log('already transitioning -- skip the click');
          return;
        }
        var targetId = $event.currentTarget.children[0].id;
        var peel = $scope.page.peels[targetId];
        var hidePeelCallback = function() {
          $timeout(function() {
            item.hide = true;
          }, 3000)
        }

        PeelService.launchPeelAction(peel, hidePeelCallback);
        $scope.peelInTransition = true;

        $timeout(function() {

          if (type === 'hiw' && isAllHiwPeeled()) {
            showAllHiwPeels();
          }

          if (type === 'bg' && isAllBgPeeled()) {
            showAllBgPeels();
          }
          $scope.peelInTransition = false;

        }, 3100)

      }

      var initUniversityTypeWriter = function() {
        TypedService.initTypedTicker('university-typed-writer', ["CS10 Exam Prep", "MCAT Concepts", "Google Interview Help", "Dirty Laundry"]);
      }
      var isAllHiwPeeled = function() {
        return  ($scope.how_it_works.top_half[0].hide &&
        $scope.how_it_works.top_half[1].hide &&
        $scope.how_it_works.top_half[2].hide &&
        $scope.how_it_works.bottom_half[0].hide &&
        $scope.how_it_works.bottom_half[1].hide &&
        $scope.how_it_works.bottom_half[2].hide)
      }
      var isAllBgPeeled = function() {
        return  ($scope.become_guru.top_half[0].hide &&
        $scope.become_guru.top_half[1].hide &&
        $scope.become_guru.top_half[2].hide &&
        $scope.become_guru.bottom_half[0].hide &&
        $scope.become_guru.bottom_half[1].hide &&
        $scope.become_guru.bottom_half[2].hide)
      }

      var initMobileModals = function() {
        $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.signupModal = modal;
          });
      }

      $scope.goToBecomeGuru = function() {
        if ($scope.desktopMode) {
          AnimationService.flip('^.desktop-become-guru')
        } else {
          AnimationService.flip('^.become-guru')
        }
      }

      $scope.goToSignup = function() {
        if ($scope.desktopMode) {
          AnimationService.flip('^.desktop-login')
        } else {
          $scope.signupModal.show();
        }
      }

      var showAllBgPeels = function() {
        $scope.become_guru.top_half[0].hide = false;
        $scope.become_guru.top_half[1].hide = false;
        $scope.become_guru.top_half[2].hide = false;
        $scope.become_guru.bottom_half[0].hide = false;
        $scope.become_guru.bottom_half[1].hide = false;
        $scope.become_guru.bottom_half[2].hide = false;
      }

      var showAllHiwPeels = function() {
        $scope.how_it_works.top_half[0].hide = false;
        $scope.how_it_works.top_half[1].hide = false;
        $scope.how_it_works.top_half[2].hide = false;
        $scope.how_it_works.bottom_half[0].hide = false;
        $scope.how_it_works.bottom_half[1].hide = false;
        $scope.how_it_works.bottom_half[2].hide = false;
      }

      var initiateAllPeels = function() {

        for (var i = 0; i < 6; i++) {
          var howItWorksIndexElem = 'hiw-item-' + i;
          var becomeGuruIndexElem = 'bg-item-' + i;
          var bgPeel = PeelService.initPeel('#' + becomeGuruIndexElem);
          var hiwPeel = PeelService.initPeel('#' + howItWorksIndexElem);
          $scope.page.peels[becomeGuruIndexElem] = bgPeel;
          $scope.page.peels[howItWorksIndexElem] = hiwPeel;
        }
      }

      $scope.checkPosition = function(event) {
        var scrollDistanceToTop = mainPageContainer.scrollTop;
        var default_offset = 50;
        $scope.page.offsets.current = scrollDistanceToTop;

        //if we have scrolled to the browse section
        if (($scope.page.offsets.current + default_offset) > $scope.page.offsets.browse) {
          $scope.page.header.showSolidNav = true;
        } else {
          $scope.page.header.showSolidNav = false;
        }

        // if (($scope.page.offsets.current + default_offset) > $scope.page.offsets.become_guru) {
        //   console.log('we have passed become a guru')
        // }

        // if (($scope.page.offsets.current + default_offset) > $scope.page.offsets.how_it_works) {
        //   console.log('we have passed how it works')
        // }

      }

      var initSupportBox = function() {
        $timeout(function() {
          var intercomContainer = document.querySelector('#intercom-container');
          console.log('attempting intercom container');
          if (intercomContainer) {
            Intercom('hide');
            console.log('initiating intercom container');
            intercomContainer.style.cssText += ' z-index:1000 !important; visibility:hidden;';

          }
        }, 15000)
      }

      var generatePageLinks = function() {
        initSupportBox();
        var howItWorksFunc = function() {
          $scope.scrollToSection("#how-it-works")
        }
        var browseFunc = function() {
          $scope.scrollToSection("#splash-browse");
        }
        var becomeGuruFunc = function() {
          $scope.scrollToSection("#become-guru");
        }
        var topPageFunc = function() {
          $scope.scrollToSection("#home-splash");
        }
        var triggerTeamCTA = function() {
          LoadingService.showMsg('Coming Soon', 3000);
        }
        var triggerPricingCTA = function() {
          LoadingService.showMsg('Coming Soon', 3000);
        }
        var triggerApplyCTA = function() {
          LoadingService.showMsg('Coming Soon', 3000);
        }

        var triggerSupportBox = function() {
          Intercom('boot', {
                app_id: "yoz6vu28",
                widget: {"activator": "#Intercom"}
          })
          var intercomContainer = document.querySelector('#intercom-container');
          intercomContainer.style.cssText += ' z-index:1000 !important;';
          Intercom('show');
          intercomContainer.style.visibility = "visible";
          Intercom('onHide', function() {
            intercomContainer.style.visibility = "hidden";
          })
        }
        var triggerFAQCTA = function() {
          LoadingService.showMsg('Coming Soon', 3000);
        }
        return [
          {name:"Home", ngClickFunc:topPageFunc},
          {name:null, href:"#",
            sublinks:[
                {name:'How it works', ngClickFunc:howItWorksFunc},
                {name:"Browse", ngClickFunc:browseFunc},
                {name:"Become a Guru", ngClickFunc:becomeGuruFunc}
              ]
          },
          {name:"Meet the Team", id:'cta-box-team'},
          // {name:"Timeline", href:"#/timeline"},
          {name:"FAQ", id:'cta-box-FAQ'},
          {name:"Pricing",  id:'cta-box-pricing'},
          {name: "Apply", id:'cta-box-apply'},
          {name: "Support", id:'cta-box-support'}
        ];
      }

      $scope.pageLinks =  generatePageLinks()

      var university_id = $stateParams.universityId;
      $scope.university = {};
      $timeout(function() {
        $scope.how_it_works = ContentService.generateUniversitySpecificHowItWorks($scope.university);
        $scope.become_guru = ContentService.generateUniversitySpecificBecomeGuruText($scope.university);
      }, 1000)

      var initMapFromUniversity = function(university) {
        var latitude = parseFloat(university.latitude);
        var longitude = parseFloat(university.longitude);
        return  {
                      center:  {latitude: latitude, longitude:longitude },
                      zoom: 10,
                      control: {}
                };
      }

      var pageLinks = [];
      $scope.links = [];

      $scope.toggleSidebar = function() {

        $scope.page.sidebar.show= !$scope.page.sidebar.show;
        if ($scope.page.sidebar.show) {
          $scope.links = [];
          $timeout(function() {$scope.links.push(pageLinks[0])}, 1000)
          $timeout(function() {$scope.links.push(pageLinks[1])}, 1000)
          $timeout(function() {$scope.links.push(pageLinks[2])}, 1000)
          $timeout(function() {$scope.links.push(pageLinks[3])}, 1000)
        } else {
          $scope.links = [];
        }
      }

      $scope.queryAutocompleteFromSearch = function(query) {

        query = $scope.page.dropdowns.location_search.input;
        console.log('querying', $scope.page.dropdowns.location_search.input)
        if (query && query.length) {
          SearchboxService.queryAutocompleteService($scope.page.dropdowns.location_search.input, $scope, $scope.map.control.getGMap());
        } else {
          $scope.page.dropdowns.location_search.predictions = [];
        }
      }


    var showMarkerInfoWindow = function(gMarker, event, modelMark) {
            console.log(gMarker, event, modelMark);
            gMarker.showInfoWindow();
      }


    $scope.backpackAction = function() {
      if ($scope.user.student_courses.length) {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.desktop-login');
      } else {
        $scope.scrollToSection("#splash-home")
      }
    }

    var initUniversityMap = function() {

      if (!$scope.universities) {
        $scope.universities = University.getTargetted().slice();
      }
      $scope.map = GMapService.initMapObj($scope.universities[0], {zoom:4, disableDoubleClickZoom:true, draggable:false});
      console.log('map status', $scope.map)
      $scope.map.university = {coords:"'self'", markers:[], control:{}};
      $scope.gmapAnimation = google.maps.Animation.BOUNCE;
      $scope.map.centerMarker = {id:1, options:{animation: null, icon:"https://uguru.me/static/remote/img/icons/marker.svg"}, windowText:"Campus Center",  showWindow:true, coords: {latitude:$scope.university.latitude, longitude:$scope.university.longitude}, control: {}};




      uiGmapGoogleMapApi.then(function(maps) {
        maps.visualRefresh = true;
        $timeout(function() {
          var universityCustomMapOptions = {icon_type:"university_penant", label_color:"white", custom_class:'university-pennant', img_base:$scope.img_base};
          var callback = function() {
            $timeout(function() {
              google.maps.event.trigger($scope.map.control.getGMap(), 'resize');
            }, 1000)
          }
          GUtilService.initSeveralMarkersWithLabel($scope.map.control.getGMap(), $scope.universities, $scope.map.university.markers, universityCustomMapOptions, callback);

        }, 2000)
          // $scope.map.control.getGMap()
      });
    }


      var showDelayedBecomeGuruHeader = function() {


        $timeout(function() {

          var becomeGuruShown = $scope.root.vars.page_cache.essayHomeBecomeGuru;
          if (!becomeGuruShown) {
            $scope.becomeGuruHeaderActive = true;
            $scope.root.vars.page_cache.essayHomeBecomeGuru = true;
            $localstorage.setObject('page_cache', $scope.root.vars.page_cache);
          } else {
          }
        }, 7000);
      }

      $scope.scrollToSection = function(section_selector) {
        var amount = null;
        var successFunction = null;
        var pageParentContainer = '#home-splash';
        ScrollService.scrollTo(amount, successFunction, scrollDuration, pageParentContainer, section_selector);
        // $timeout(function() {
        //   ScrollService.initStickyHeaderScroll("#essay-header", "#essay-pricing", 'active', '#essay-student-home');
        // }, scrollDuration + 100)
      }

      var initProfileCTAS = function() {
        var showCTACallback = function(category) {
          return function() {
            $scope.user = $scope.sampleProfiles[category];
          }
        }

        CTAService.initSingleCTA('#cta-box-academic', '#home-splash', showCTACallback("academic"));
        CTAService.initSingleCTA('#cta-box-baking', '#home-splash', showCTACallback("bakery"));
        CTAService.initSingleCTA('#cta-box-household', '#home-splash', showCTACallback("household"));
        CTAService.initSingleCTA('#cta-box-photography', '#home-splash', showCTACallback("photography"));
        CTAService.initSingleCTA('#cta-box-tech', '#home-splash', showCTACallback("tech"));
        //sidebar
        CTAService.initSingleCTA('#cta-box-pricing', '#home-splash');
        CTAService.initSingleCTA('#cta-box-FAQ', '#home-splash');
        CTAService.initSingleCTA('#cta-box-apply', '#home-splash');
        CTAService.initSingleCTA('#cta-box-team', '#home-splash');
      }

      var runMobileOnlyFunctions = function() {

        !$scope.desktopMode && initiateAllPeels();
        !$scope.desktopMode && initMobileModals();

      }

      var initiateCounters = function() {

        $scope.page.counters['num-university-counter'].start();
        $scope.page.counters['num-course-counter'].start();
        $scope.page.counters['num-guru-counter'].start();

      }

      var calcTotalCourses = function(universities) {
        var sum = 0
        for (var i = 0; i < universities.length; i ++) {
          var indexUniversity = universities[i];
          if (indexUniversity) {
            sum += indexUniversity.num_courses;
          }
        }
        return sum;
      }



      var calculateAndInitiateCounters = function() {
        var totalUniversities = $scope.universities.length;
        var totalCourses = calcTotalCourses($scope.universities);
        $scope.page.counters['num-university-counter'] = CounterService.initCounter('num-university-counter', 1.0, totalUniversities, 5);
        $scope.page.counters['num-course-counter'] = CounterService.initCounter('num-course-counter', 1.0, parseInt(totalCourses / 1000), 5, 'K');
        $scope.page.counters['num-guru-counter'] = CounterService.initCounter('num-guru-counter', 1.0, 1130, 5);
        //@samir - todo, implement when scroll down to the section
        initiateCounters();
      }




      $scope.$on('$ionicView.afterEnter', function() {

        var waypointDict = {
          "how-it-works": {func:null, offset:100},
          "splash-university": {func:null},
          "splash-browse": {func:null},
          "become-guru": {func:null}
        }

        $timeout(function() {

          ScrollService.initArrWaypoints(waypointDict, "home-splash");
        }, 5000)
      })

      $scope.$on('$ionicView.loaded', function() {
         shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader();



         $timeout(function() {
          // calcAllMainSectionContainers();
          initUniversityMap();
          initProfileCTAS();
          calculateAndInitiateCounters();
          initUniversityTypeWriter();
          runMobileOnlyFunctions();

         }, 5000)


      });

    }


])