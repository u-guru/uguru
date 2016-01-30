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
  'uiGmapIsReady',
  '$ionicSlideBoxDelegate',
  '$compile',
  function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate,
    LoadingService, $timeout, ScrollService, uiGmapGoogleMapApi,
    SearchboxService, GMapService,GUtilService, ContentService, CTAService, PeelService, TypedService,
    $localstorage, $ionicViewSwitcher, $ionicModal, AnimationService, University, CounterService, uiGmapIsReady, $ionicSlideBoxDelegate, $compile) {

      $scope.page = {animation: false, dropdowns: {}, css:{},predictionMarkers:[], sidebar:{}, showAnimation:false, offsets:{}, header: {}, peels:{}, status:{}, counters:{}};


      $scope.page.animations = {hiw:{}, bg:{}, profiles: {}, categories:{}, university: {}, main: {}};
      // @gabrielle just worry about this
      // next steps
      // setup the top section

      $scope.page.animations.hiw = {
        viewed: false,
        beforeScroll: null,
        firstViewed: {
          css_classes:['bounceInDown', 'bounceInRight', 'bounceInLeft', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
          selectors:['.hiw-postit-li:nth-child(2)', '.hiw-postit-li:nth-child(6)', '.hiw-postit-li:nth-child(4)', '.hiw-postit-li:nth-child(1)', '.hiw-postit-li:nth-child(3)', '.hiw-postit-li:nth-child(5)'],
          delays: [500, 550, 600, 650, 700, 750],
        },
        secondViewed: {
          css_classes:['hinge', 'hinge', 'hinge', 'hinge', 'hinge', 'hinge'],
          selectors:['.hiw-postit-li:nth-child(2)', '.hiw-postit-li:nth-child(6)', '.hiw-postit-li:nth-child(4)', '.hiw-postit-li:nth-child(1)', '.hiw-postit-li:nth-child(3)', '.hiw-postit-li:nth-child(5)'],
          delays: [500, 550, 600, 650, 700, 750],
        },
        onScrollStart: null, //coming soon, not first time
        onScrollEnd: null,  // coming soon, not first time
      }

      $scope.page.animations.categories = {
        viewed: false,
        beforeScroll: null,
        firstViewed: {
          css_classes:[],
          selectors:[],
          delays: []
        },
        secondViewed: {
          css_classes:[],
          selectors:[],
          delays: []
        }
      }

      $scope.page.animations.profiles = {
        viewed: false,
        beforeScroll: null,
        firstViewed: {
          css_classes:[],
          selectors:[],
          delays: []
        },
        secondViewed: {
          css_classes:[],
          selectors:[],
          delays: []
        }
      }


      //
      //
      $scope.page.animations.bg = {
        viewed: false,
        beforeScroll: null,
        firstViewed: {
          css_classes:['bounceInDown', 'bounceInRight', 'bounceInLeft', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
          selectors:['.bg-postit-li:nth-child(2)', '.bg-postit-li:nth-child(6)', '.bg-postit-li:nth-child(4)', '.bg-postit-li:nth-child(1)', '.bg-postit-li:nth-child(3)', '.bg-postit-li:nth-child(5)'],
          delays: [500, 550, 600, 650, 700, 750],
        },
        secondViewed: {
          css_classes:['bounceInDown', 'bounceInRight', 'bounceInLeft', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
          selectors:['.bg-postit-li:nth-child(2)', '.bg-postit-li:nth-child(6)', '.bg-postit-li:nth-child(4)', '.bg-postit-li:nth-child(1)', '.bg-postit-li:nth-child(3)', '.bg-postit-li:nth-child(5)'],
          delays: [500, 550, 600, 650, 700, 750],
        }

      }

      var initializePageAnimations = function() {
          AnimationService.initializeSectionComponents($scope.page.animations.hiw.firstViewed, $scope.page.animations.hiw.firstViewed.selectors, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.bg.firstViewed, $scope.page.animations.bg.firstViewed.selectors, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.categories.firstViewed, $scope.page.animations.categories.firstViewed.selectors, $scope.page.animations.categories.firstViewed.css_classes, $scope.page.animations.categories.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.profiles.firstViewed, $scope.page.animations.profiles.firstViewed.selectors, $scope.page.animations.profiles.firstViewed.css_classes, $scope.page.animations.profiles.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.hiw.secondViewed, $scope.page.animations.hiw.firstViewed.selectors, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.bg.secondViewed, $scope.page.animations.bg.firstViewed.selectors, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.categories.secondViewed, $scope.page.animations.categories.firstViewed.selectors, $scope.page.animations.categories.firstViewed.css_classes, $scope.page.animations.categories.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.profiles.secondViewed, $scope.page.animations.profiles.firstViewed.selectors, $scope.page.animations.profiles.firstViewed.css_classes, $scope.page.animations.profiles.firstViewed.delays);
      }


      var getHiwAnimationElements = function(selector_arr) {
        $scope.page.animations.hiw.state = 1;
      }

      //Scope var declarations
      var onSectionOneLoad = function() {
        initUniversityTypeWriter();
        $timeout(function() {
          $scope.root.loader.body.hide = true;
          $scope.page.scroll.section_index = 0;
          initHomePageWayPoint();
          initializePageAnimations();
          Waypoint.refreshAll();
        }, 250)
      }
      $scope.university = {}
      // $scope.page = {dropdowns: {}, css:{},predictionMarkers:[], sidebar:{}, showAnimation:false, offsets:{}, header: {}, peels:{}, status:{}, counters:{}};
      $scope.page.sidebar = {show:false};
      $scope.page.tabs = {hiw:{}};
      $scope.page.css = {bg_banner:$scope.img_base + "./img/main-bg-cambridge.jpg", main:{gradient_fill:"#40484B"}};
      $scope.page.status = {loaded:false, showLoader:true};
      $scope.page.header = {showOnScrollNav:'', becomeGuruHeaderActive:false, active_tab:{how_it_works:false, become_guru:false, university:false}};
      $scope.page.load = {sections:{}, complete:false};
      $scope.page.scroll = {section_index:0};

      $scope.page.load.sections = {
        one: {visible:true, display:true, nested:{bg_image: false}, ready:onSectionOneLoad},
        two: {visible:true, display:true, nested:{}, on_activate:null},
        three: {visible:true, display:true, nested:{}, on_activate:null},
        four: {visible:true, display:true, nested:{}, on_activate:null},
        five: {visible:true, display:true, nested:{}, on_activate:null},
        footer: {visible:true, display:true, nested:{}, on_activate:null}
      }


      $scope.switchToTabIndex = function(index) {
        var currentIndex = $scope.page.tabs.hiw.index;
        $scope.activeBrowseTabIndex = index;
        //switching to how it works
        if (index !== currentIndex && index === 2) {
          if (!$scope.page.animations.profiles.viewed) {
            $scope.page.animations.profiles.viewed = true;
            console.log('firing first time animations for profiles')
            AnimationService.activateSectionAnimations($scope.page.animations.profiles.firstViewed.elements, $scope.page.animations.profiles.firstViewed.css_classes, $scope.page.animations.profiles.firstViewed.delays);
          } else {
            console.log('firing second time animations for profiles')
            AnimationService.activateSectionAnimations($scope.page.animations.profiles.secondViewed.elements, $scope.page.animations.profiles.secondViewed.css_classes, $scope.page.animations.profiles.secondViewed.delays);
          }
        }
        if (index !== currentIndex && index === 1) {

          if (!$scope.page.animations.categories.viewed) {
            $scope.page.animations.categories.viewed = true;
            console.log('firing first time animations for categories')
            AnimationService.activateSectionAnimations($scope.page.animations.categories.firstViewed.elements, $scope.page.animations.categories.firstViewed.css_classes, $scope.page.animations.categories.firstViewed.delays);
          } else {
            console.log('firing second time animations for categories')
            AnimationService.activateSectionAnimations($scope.page.animations.categories.secondViewed.elements, $scope.page.animations.categories.secondViewed.css_classes, $scope.page.animations.categories.secondViewed.delays);
          }
        }
        if (index !== currentIndex && index === 0) {

          if (!$scope.page.animations.hiw.viewed) {
            console.log('firing first time animations for how it works')
            $scope.page.animations.hiw.viewed = true;
            AnimationService.activateSectionAnimations($scope.page.animations.hiw.firstViewed.elements, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
          } else {
            console.log('firing second time animations for how it works')
            AnimationService.activateSectionAnimations($scope.page.animations.hiw.secondViewed.elements, $scope.page.animations.hiw.secondViewed.css_classes, $scope.page.animations.hiw.secondViewed.delays);
          }

        }
      }
      // $scope.page.animations = {hiw: {}};
      // $scope.page.animations.hiw = {
      //   // on first appearance

      //   onScrollEnd: null,
      //   onScrollEndOnce: null, //first time
      //   generalCard: null, //apply to all cards
      // }

      //Scope func declarations
      $scope.universityButtonClicked;
      $scope.map;
      $scope.scrollToNextSection;
      $scope.scrollUpSection;
      $scope.scrollToSection;
      $scope.launchSupportOverlay;
      $scope.goToUniversity;
      $scope.goToSignup;
      $scope.toggleSidebar;

      //Helper Function declarations

      //TODO CLEANUP REST
      $ionicSideMenuDelegate.canDragContent(false);
      var shouldShowBecomeGuruHeader = false;
      var shouldRenderMap = true;
      var mainPageContainer = document.querySelector('#home-splash');
      var homeNavHeader = document.querySelector('#home-nav-header');
      var splashHiwNav = document.querySelector("#splash-hiw-nav");
      var homePageWayPoint;
      var pageNavbarHeight = 70;
      var sectionSneakHeight = 36;
      var scrollOffset = pageNavbarHeight + sectionSneakHeight - 2;

      //cta specific initialization vars
      $scope.activeBrowseTabIndex = 0;
      $scope.activeTabIndex = 0;
      $scope.profile = {public_mode: true};
      $scope.sampleProfiles = ContentService.sampleProfiles;
      $scope.sampleMiniProfilesDict = ContentService.generateMiniSampleProfileDict();





      // render page functions
      var initUniversityTypeWriter = function() {
        TypedService.initTypedTicker('university-typed-writer', ["CS10 Exam Prep", "MCAT Concepts", "Google Interview Help", "Dirty Laundry"]);
      }





      var initHomePageWayPoint = function() {

        var scrollUniversityCallback = function(direction, element, scrollTop) {
            if (direction === 'down') {
              homeNavHeader.classList.add('bg-charcoal');
              $scope.page.scroll.section_index = 1;
            } else {
              homeNavHeader.classList.remove('bg-charcoal');
              $scope.page.scroll.section_index = 0;
            }
            // $scope.page.header.showOnScrollNav = 'bg-charcoal'
            //@GABRIELLE-NOTE -- add more, feel free to discuss what other things you want to add to make navbar transition feel more fluid
        }



        var scrollHowitWorksCallback = function(direction, element, scrollTop) {
            if (direction === 'down') {
              $scope.page.scroll.section_index = 2;
              AnimationService.animateIn(splashHiwNav, "bounceInDown");

              if (!$scope.page.animations.hiw.viewed) {
                $scope.page.animations.hiw.viewed = true;
                console.log('firing first time animations for hiw')
                AnimationService.activateSectionAnimations($scope.page.animations.hiw.firstViewed.elements, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
              } else {
                console.log('firing second time animations for hiw')
                AnimationService.activateSectionAnimations($scope.page.animations.hiw.secondViewed.elements, $scope.page.animations.hiw.secondViewed.css_classes, $scope.page.animations.hiw.secondViewed.delays);
              }

            } else {
              $scope.page.scroll.section_index = 1;

              var callback = function() {
                splashHiwNav = document.querySelector('#splash-hiw-nav');
                NodeList.prototype.forEach = Array.prototype.forEach
                splashHiwNav.querySelectorAll('div a').forEach(function(tab_item){
                    tab_item.classList.remove('active');
                });
                splashHiwNav && $compile(splashHiwNav)($scope);
              }
              AnimationService.animateOut(splashHiwNav, "slideOutUp", callback);
          }
        }

        var scrollBecomeGuruCallback = function(direction, element, scrollTop) {
            if (direction === 'down') {

              var callback = function() {
                splashHiwNav = document.querySelector('#splash-hiw-nav');

                NodeList.prototype.forEach = Array.prototype.forEach
                splashHiwNav.querySelectorAll('div a').forEach(function(tab_item){
                    tab_item.classList.remove('active');
                });
                splashHiwNav && $compile(splashHiwNav)($scope);
              }
              AnimationService.animateOut(splashHiwNav, "slideOutUp", callback);


              if (!$scope.page.animations.bg.viewed) {
                $scope.page.animations.bg.viewed = true;
                console.log('firing first time animations for become guru');
                AnimationService.activateSectionAnimations($scope.page.animations.bg.firstViewed.elements, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);
              } else {
                console.log('firing second time animations for become guru');
                AnimationService.activateSectionAnimations($scope.page.animations.bg.secondViewed.elements, $scope.page.animations.bg.secondViewed.css_classes, $scope.page.animations.bg.secondViewed.delays);
              }

            } else {
              $scope.page.scroll.section_index = 1;
            }
            // $scope.page.header.showOnScrollNav = 'bg-charcoal'
            //@GABRIELLE-NOTE -- add more, feel free to discuss what other things you want to add to make navbar transition feel more fluid
        }

        var waypointDict = {
          "splash-home": {func:null},
          "splash-university": {func:scrollUniversityCallback, offset:scrollOffset}, //precursor-section-height + navbar.height
          "splash-browse": {func:scrollHowitWorksCallback, offset:scrollOffset},
          "become-guru": {func:scrollBecomeGuruCallback, offset:scrollOffset}
        }
        ScrollService.initArrWaypoints(waypointDict, "home-splash");

      }




      $scope.scrollNextSection = function() {
        if ($scope.page.scroll.section_index === 0) {
          $scope.scrollToSection("#splash-university");
        }
        if ($scope.page.scroll.section_index === 1) {
          $scope.scrollToSection("#splash-browse");
        }
        if ($scope.page.scroll.section_index === 2) {
          $scope.scrollToSection("#become-guru");
        }
      }

      $scope.scrollUpSection = function() {
        if ($scope.page.scroll.section_index === 2) {
          $scope.scrollToSection("#splash-browse");
        }
        if ($scope.page.scroll.section_index === 1) {
          $scope.scrollToSection("#splash-university");
        }
        if ($scope.page.scroll.section_index === 2) {
          $scope.scrollToSection("#splash-home");
        }
      }

      //outgoing transitioning functions
      $scope.selectUniversityAndTransition = function(university, $event) {
        var pageLoader = document.querySelector('cta-modal-page-loader');
        $scope.root.vars.university = university;
        $localstorage.setObject('university', university);
        AnimationService.flip('^.universities', {}, {universityId:university.id, universityObj:university});
      }
      $scope.goToSignup = function() {
        if ($scope.desktopMode) {
          AnimationService.flip('^.desktop-login')
        } else {
          $scope.signupModal.show();
        }
      }
      $scope.goToStudentHome = function() {
        if ($scope.user.id && $scope.user.first_name) {
          AnimationService.flip('^.student-home');
        } else {
          if ($scope.desktopMode) {
            AnimationService.flip('^.desktop-login');
          } else {
            $scope.signupModal.show();
          }
        }
      }


      //general functions
      var initSupportBox = function() {
        Intercom('boot', {
                app_id: "yoz6vu28",
                widget: {"activator": "#Intercom"}
        })
        $timeout(function() {
          var intercomContainer = document.querySelector('#intercom-container');
          console.log('attempting intercom container');
          if (intercomContainer) {
            Intercom('hide');
            console.log('initiating intercom container');
            intercomContainer.style.cssText += ' z-index:1000 !important; visibility:hidden;';

          }
        }, 5000)
      }




      var generatePageLinks = function() {
        initSupportBox();
        var howItWorksFunc = function() {
          $scope.scrollToSection("#splash-browse")
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

        var triggerSupportBox = function() {
          $scope.launchSupportOverlay();
        }
        $scope.pageLinks = [
                {name:"Home", ngClickFunc:topPageFunc},
                {name:null, href:"#",
                            sublinks:[
                                {name:'Login', ngClickFunc:$scope.goToSignup},
                                {name:'How it works', ngClickFunc:howItWorksFunc},
                                {name:"Browse", ngClickFunc:browseFunc},
                                {name:"Become a Guru", ngClickFunc:becomeGuruFunc}
                            ]
                },
                {name:"Meet the Team", id:'cta-box-team'},
                {name:"FAQ", id:'cta-box-FAQ'},
                {name:"Pricing",  id:'cta-box-pricing'},
                {name: "Apply", id:'cta-box-apply'},
                {name: "Support", ngClickFunc:triggerSupportBox}
              ];
      }

      generatePageLinks();

      // mobile-specific render pages
      var initMobileModals = function() {
        $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.signupModal = modal;
          });
      }

      $scope.launchSupportOverlay = function(){
        var intercomContainer = document.querySelector('#intercom-container');
        intercomContainer.style.cssText += ' z-index:1000 !important;';
        Intercom('show');
        intercomContainer.style.visibility = "visible";
        Intercom('onHide', function() {
          intercomContainer.style.visibility = "hidden";
        })
      }

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



      $scope.toggleSidebar = function() {
        $scope.page.sidebar.show= !$scope.page.sidebar.show;
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

      //Navbar functions
      $scope.scrollToSection = function(section_selector) {
        var scrollDuration= 500;
        var amount = null;
        var successFunction = null;
        var pageParentContainer = '#home-splash';

        ScrollService.scrollTo(amount, successFunction, scrollDuration, pageParentContainer, section_selector, scrollOffset);
      }

      // rendering functions
      var initProfileCTAS = function() {

        var academicCTABoxElem = document.getElementById('cta-box-academic');
        console.log(academicCTABoxElem);
        if (!academicCTABoxElem) {
          console.log('checking for categories again in 1 second');
          setTimeout(function() {
            initProfileCTAS();
          }, 1000)
          return;
        }


        var showCTACallback = function(category) {
          return function() {
            $scope.user = $scope.sampleProfiles[category];
          }
        }

        var initPricingCounters = function() {
          $timeout(function() {
            if (!$scope.pricingSidebarAlreadyInitialized) {
              $scope.pricingSidebarAlreadyInitialized = true;
              var feeCounter = CounterService.initCounter(document.getElementById('our-fees'), 40, 0, 10, '%');
              CounterService.startCounter(feeCounter);
              var pricingCounter = CounterService.initCounter(document.getElementById('students-pay'), 100, 14, 10, '/hr', '$');
              CounterService.startCounter(pricingCounter);
              var chargeCounter = CounterService.initCounter(document.getElementById('guru-charge'), 100, 20, 10, '/hr', '&lsaquo;$');
              CounterService.startCounter(chargeCounter);
            }
          }, 1500);
        }



        var result = CTAService.initSingleCTA('#cta-box-academic', '#home-splash', showCTACallback("academic"));
        if (result === false) {
          $timeout(function() {
            console.log('trying again in 1000 ms');
            initProfileCTAS();
          }, 1000)
          return;
        }

        CTAService.initSingleCTA("#cta-box-sidebar", "#home-splash");
        CTAService.initSingleCTA('#cta-box-baking', '#home-splash', showCTACallback("bakery"));
        CTAService.initSingleCTA('#cta-box-household', '#home-splash', showCTACallback("household"));
        CTAService.initSingleCTA('#cta-box-photography', '#home-splash', showCTACallback("photography"));
        CTAService.initSingleCTA('#cta-box-tech', '#home-splash', showCTACallback("tech"));
        //sidebar
        CTAService.initSingleCTA('#cta-box-pricing', '#home-splash', initPricingCounters);
        CTAService.initSingleCTA('#cta-box-FAQ', '#home-splash');
        CTAService.initSingleCTA('#cta-box-apply', '#home-splash');
        CTAService.initSingleCTA('#cta-box-team', '#home-splash');
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


      $scope.initProfileCTAS = initProfileCTAS;

      $scope.$on('$ionicView.afterEnter', function() {

        $timeout(function() {
          initProfileCTAS();
        })
      })

      $scope.hiwSlideChanged = function($index) {
        $ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').update();
        if ($index === 5) {
          $timeout(function() {
            $ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').slide(0, 250);
          }, 2500)
        }
      }

      $scope.bgSlideChanged = function($index) {
        $ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').update();
        if ($index === 5) {
          $timeout(function() {
            $ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').slide(0, 250);
            // $ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').next();
          }, 2500)
        }
      }

      var styleOptions = [
        { featureType: 'water', elementType: 'geometry', stylers: [ { hue: '#50A5DD' }, { saturation: -50 },{ lightness: 0 }, { visibility: 'on' }]},
        { featureType: 'water', elementType: 'labels', stylers: [ { visibility: 'off' } ]},
        { featureType: 'landscape', elementType: 'all', stylers: [ {visibility: 'off'} ] },
        { featureType: 'poi', elementType: 'all', stylers: [ {visibility: 'off'} ] },
        { featureType: 'administrative.country', elementType: 'labels',stylers: [{visibility: 'off'} ] },
        { featureType: 'administrative.locality', elementType: 'labels', stylers: [ {visibility: 'off'} ]},
        { featureType: 'all', elementType: 'labels', stylers: [ {visibility: 'off'} ]}
      ];

      $scope.universities = University.getTargetted();
      // $scope.search_text = {university: "", matching: []};

      var calcZoom = function() {
        if ($scope.desktopMode) {
          return 4;
        } else {
          return 2;
        }
      }

      var mapDefaults = {
        zoom: calcZoom(),
        options: { streetViewControl:false, scrollwheel:false, panControl:false,  minZoom: 1, maxZoom: 7, styles: styleOptions,
                   scrollwheel: false, mapTypeControl:false, style:styleOptions, draggable:true, disableDoubleClickZoom:false, zoomControl: true
                 }
      }

      var generateClusterImgDataURI = function(obj) {
          var baseSVGURL = "<svg viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + obj.bg_color + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + obj.bg_color +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + obj._text + "</tspan></text></svg>"
          return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL);
        }

      var generateUniversityImgDataURI = function(obj) {
        var baseSVGURL = "<svg style='height:25px; width:25px;' viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + obj.school_color_dark + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + obj.school_color_dark +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + obj.tiny_name + "</tspan></text></svg>"
        return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
      }


      var clusterCalculator = function(markers, num_styles) {
        //The function used to determine the text to be displayed on a cluster marker and the index indicating which
        // style to use for the cluster marker.

        var markerValues = markers.values();
        var universityArr = getUniversitiesFromMarkers(markerValues)
        var stateDict = getMostCommonStateFromUniversities(universityArr);
        var getTopXStateStr = processStateDictToStr(stateDict);

        function processStateDictToStr(state_dict) {
          var results = [];
          for (var key in state_dict) results.push([key, state_dict[key]]);

          results.sort(function(a, b) {
              a = a[1];
              b = b[1];

              return a < b ? -1 : (a > b ? 1 : 0);
          }).reverse();
          result_str = "";
          if (results.length === 1) {
            return universityArr.length + " in " + results[0][0] + ""
          }
          if (results.length >= 2) {
            return universityArr.length + " in " + results[0][0] + "," + results[1][0];
          }
          // if (results.length === 3) {
          //   return results[0][0] + "+" + results[1][0] + " colleges"
          // }
          // if (results.length > 3) {
          //   return results[0][0] + ", " + results[1][0] + " + "  + results[2][0] + " + more"
          // }
          // for (var i = 0; i < results.length; i++) {
          //     var key = results[i][0];
          //     var value = results[i][1];
          // }
        }

        function getUniversitiesFromMarkers(markers) {
          var arrUniversities = [];
          for (var i = 0; i < markers.length; i++) {
            var indexMarker = markers[i];
            arrUniversities.push(indexMarker.model.university);
          }
          return arrUniversities;
        }

        function getMostCommonStateFromUniversities(universities) {
          var stateDict = {};
          for (var i = 0; i < universities.length; i++) {
            var indexUniversity = universities[i];
            if (indexUniversity.state) {
              if (stateDict[indexUniversity.state]) {
                stateDict[indexUniversity.state] += 1;
              } else {
                stateDict[indexUniversity.state] = 1;
              }
            }
          }
          return stateDict;
        }



        if (universityArr.length > 20) {
          var indexNumber = 1
        } else {
          var indexNumber = 2
        }


        var resultDict = {
          text: getTopXStateStr,
          title: '+more',
          index: indexNumber
        }
        return resultDict;
      }


      var initClusterObj = function(marker_arr) {
        var options_dict = {
            minimumClusterSize:50,
            calculator: clusterCalculator,
            styles:[
              {
                width:125,
                height:100,
                url: generateClusterImgDataURI({bg_color:$scope.universities[0].school_color_dark, _text: ""}),
                fontFamily: "Source Sans Pro",
                fontWeight: "bold",
                textColor: "#FFFFFF",
                textSize: 14,
                anchorText: [-2, -7]
                // anchorIcon: "[0, 0]"
              },
              {
                width:75,
                height:125,
                url: generateClusterImgDataURI({bg_color:$scope.universities[84].school_color_dark, _text: ""}),
                fontFamily: "Source Sans Pro",
                fontWeight: "bold",
                textColor: "#FFFFFF",
                textSize: 10,
                anchorText: [-35, -3]
                // anchorText: "[0, 0]"
              }
            ],
            // title: "",
            zoomOnClick: true,
            maxZoom: 7,
            gridSize: 90,
            clusterClass: "university-svg-cluster",
            // batchSize:
            averageCenter: true
        }
        return options_dict
      }



      var initHomeMap = function() {
          $scope.page.load.sections.two.display = true;
          $scope.map = {
          center: {latitude: $scope.universities[0].latitude, longitude: $scope.universities[0].longitude},
          control: {},
          zoom:  mapDefaults.zoom,
          dragging: true, //true while map is dragging state, false otherwise
          refresh: false,
          options: mapDefaults.options,
          events: {tilesloaded: onMapRenderCompleteOnce},
          clusterOptions: initClusterObj(),
          bounds: null, //Fit the map in the specified bounds. The expression must resolve to an object having both northeast and southwest properties. Each of those properties must have a latitude and a longitude properties.
          pan: true,
          markers: generateXMarkersFromUniversities(200, $scope.universities),
          rebuildMarkers: false,
          // window: {coords:{}, show:false, university: {}, options:defaultWindowOptions, close:closeInfoWindow}
        }
      }

      var createMarkerObj = function(obj) {

        var universityObj = {
            school_color_light: obj.school_color_light,
            banner_url: obj.banner_url,
            school_color_dark: obj.school_color_dark,
            name: obj.name,
            tiny_name: obj.school_tiny_name,
            city: obj.city,
            state: obj.state
        }
        return {
          id: obj.id,
          latitude: obj.latitude,
          longitude: obj.longitude,
          icon: {url: generateUniversityImgDataURI(universityObj), size: new google.maps.Size(60, 60), scaledSize: new google.maps.Size(60, 60)},
          events: {
            click: onMarkerClick
          },
          university: universityObj
        }
      }

      var generateXMarkersFromUniversities = function(x, universities_arr, with_interval) {

        var universities_arr = universities_arr.slice(0, x);
        var marker_obj_arr = [];
        for (var i = 0; i < universities_arr.length; i++) {
          marker_obj_arr.push(createMarkerObj(universities_arr[i]));
        }
        return marker_obj_arr;
      }

      var windowCloseButtonIsClicked = function(e) {
        console.log(e);
      }

      var defaultWindowOptions = {
          pixelOffset: new google.maps.Size(0, -10, 'px', 'px'),
          closeclick: windowCloseButtonIsClicked
      }

      var closeInfoWindow = function() {
        $scope.map.window.show = false;
      }

      var refreshMap = function() {
        $scope.map.refresh = true;
        console.log('map is refreshing');
        $timeout(function() {
          $scope.map.refresh = false;
        })
      }



      var updateWindowToMarker = function(window_obj, model_obj) {
        window_obj.coords = {latitude:model_obj.latitude, longitude:model_obj.longitude};
        window_obj.university = model_obj.university;
      }

      var deleteWindowExtraCSS = function() {
          var elem = document.querySelector('.gm-style-iw');
          var children = elem.parentElement.childNodes;
          for (var i = 0; i < children.length; i++) {
              var indexChild = children[i];
              if (indexChild !== elem) {
                  indexChild.style.display = "none"
              }
          }
      }

      var onMarkerClick = function(marker, event_name, model) {
        updateWindowToMarker($scope.map.window, model);
        $scope.map.window.show = true;
        $timeout(function() {
          deleteWindowExtraCSS();
        }, 100)
        $timeout(function() {
          console.log('attempting to compile');
          $compile(document.getElementById('university-info-window-button'))($scope);
          $compile(document.getElementById('university-info-window-close-button'))($scope);
        }, 1000)
      }



      var onMapRenderCompleteOnce = function(map) {
        if (!$scope.map.og_map) {
          $scope.mapHasRendered = true;
          $scope.map.og_map = map;
          console.log('map has finalled rendered');
        }
      }


      $scope.$on('$ionicView.beforeEnter', function() {

        if (!$scope.universities) {
            $scope.universities = University.getTargetted().slice();
        }
        initHomeMap();

      })


      $scope.$on('$ionicView.enter', function() {
         console.log('ionic has entered');
         $timeout(function() {
            shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader();
            // initUniversityTypeWriter();
            calculateAndInitiateCounters();

            !$scope.desktopMode && initMobileModals();
            $ionicSlideBoxDelegate.update();
          }, 5000)
      });


    }
// =======
// 	'$scope',
// 	'$state',
// 	'$stateParams',
// 	'Restangular',
// 	'User',
// 	'$ionicSideMenuDelegate',
// 	'LoadingService',
// 	'$timeout',
// 	'ScrollService',
// 	'uiGmapGoogleMapApi',
// 	'SearchboxService',
// 	'GMapService',
// 	'GUtilService',
// 	'ContentService',
// 	'CTAService',
// 	'PeelService',
// 	'TypedService',
// 	'$localstorage',
// 	'$ionicViewSwitcher',
// 	'$ionicModal',
// 	'AnimationService',
// 	'University',
// 	'CounterService',
// 	'uiGmapIsReady',
// 	'$ionicSlideBoxDelegate',
// 	'$compile',
// 	function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate,
// 		LoadingService, $timeout, ScrollService, uiGmapGoogleMapApi,
// 		SearchboxService, GMapService, GUtilService, ContentService, CTAService, PeelService, TypedService,
// 		$localstorage, $ionicViewSwitcher, $ionicModal, AnimationService, University, CounterService, uiGmapIsReady, $ionicSlideBoxDelegate, $compile) {

// 		$scope.page = {
// 			animation: false,
// 			dropdowns: {},
// 			css: {},
// 			predictionMarkers: [],
// 			sidebar: {},
// 			showAnimation: false,
// 			offsets: {},
// 			header: {},
// 			peels: {},
// 			status: {},
// 			counters: {}
// 		};


// 		$scope.page.animations = {
// 			hiw: {},
// 			bg: {},
// 			profiles: {},
// 			categories: {},
// 			university: {},
// 			main: {}
// 		};
// 		//@gabrielle just worry about this
// 		// next steps
// 		//

// 		$scope.page.animations.hiw = {
// 			viewed: false,
// 			beforeScroll: null,
// 			firstViewed: {
// 				css_classes: ['fadeIn', 'bounceInDown', 'bounceInRight', 'bounceInLeft', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'animate:keep', 'animate:keep', 'animate:keep', 'animate:keep', 'animate:keep', 'fadeIn'],
// 				selectors: ['.how-it-works-header', '.hiw-postit-li:nth-child(2)', '.hiw-postit-li:nth-child(6)', '.hiw-postit-li:nth-child(4)', '.hiw-postit-li:nth-child(1)', '.hiw-postit-li:nth-child(3)', '.hiw-postit-li:nth-child(5)', '.hiw-postit-li:nth-child(2) .tape:nth-child(1)', '.hiw-postit-li:nth-child(2) .tape:nth-child(2)', '.hiw-postit-li:nth-child(3) .tape:nth-child(2)', '.hiw-postit-li:nth-child(4) .tape:nth-child(1)', '.hiw-postit-li:nth-child(4) .tape:nth-child(2)', '.how-it-works-button'],
// 				delays: [400, 500, 600, 700, 800, 900, 1000, 2000, 2000, 2000, 2000, 2000, 2500],
// 			},
// 			secondViewed: {
// 				css_classes: ['fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn'],
// 				selectors: ['.how-it-works-header', '.hiw-postit-li:nth-child(2)', '.hiw-postit-li:nth-child(6)', '.hiw-postit-li:nth-child(4)', '.hiw-postit-li:nth-child(1)', '.hiw-postit-li:nth-child(3)', '.hiw-postit-li:nth-child(5)', 'how-it-works-button'],
// 				delays: [400, 500, 600, 700, 800, 900, 1000, 1500],
// 			},
// 			onExit: {
// 				css_classes: ['fadeOut', 'hinge', 'hinge-right', 'hinge-right', 'hinge-right', 'hinge', 'hinge', 'fadeOut'],
// 				selectors: ['.how-it-works-header', '.hiw-postit-li:nth-child(2)', '.hiw-postit-li:nth-child(6)', '.hiw-postit-li:nth-child(4)', '.hiw-postit-li:nth-child(1)', '.hiw-postit-li:nth-child(3)', '.hiw-postit-li:nth-child(5)', '.how-it-works-button'],
// 				delays: [400, 500, 600, 700, 800, 900, 1000, 1500],
// 			},
// 			onScrollStart: null, //coming soon, not first time
// 			onScrollEnd: null, // coming soon, not first time
// 		}

// 		$scope.page.animations.categories = {
// 			viewed: false,
// 			beforeScroll: null,
// 			firstViewed: {
// 				css_classes: [
// 					'fadeIn', 'fadeIn',
// 					'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp',
// 					'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn',
// 					'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
// 					'bounceInUp'
// 				],
// 				selectors: [
// 					'.splash-categories-header',
// 					'.splash-categories-subheader',
// 					'.category-card-list li:nth-child(1)',
// 					'.category-card-list li:nth-child(2)',
// 					'.category-card-list li:nth-child(3)',
// 					'.category-card-list li:nth-child(4)',
// 					'.category-card-list li:nth-child(5)',
// 					'.category-card-list li:nth-child(6)',
// 					'.category-card-list li:nth-child(1) .card-icon',
// 					'.category-card-list li:nth-child(2) .card-icon',
// 					'.category-card-list li:nth-child(3) .card-icon',
// 					'.category-card-list li:nth-child(4) .card-icon',
// 					'.category-card-list li:nth-child(5) .card-icon',
// 					'.category-card-list li:nth-child(6) .card-icon',
// 					'.category-card-list li:nth-child(1) .card-label',
// 					'.category-card-list li:nth-child(2) .card-label',
// 					'.category-card-list li:nth-child(3) .card-label',
// 					'.category-card-list li:nth-child(4) .card-label',
// 					'.category-card-list li:nth-child(5) .card-label',
// 					'.category-card-list li:nth-child(6) .card-label',
// 					'.card-button'
// 				],
// 				delays: [
// 					400, 550,
// 					400, 550, 700, 950, 1100, 1250,
// 					1400, 1550, 1700, 1950, 2100, 2250,
// 					1400, 1550, 1700, 1950, 2100, 2250,
// 					3250
// 				]
// 			},
// 			secondViewed: {
// 				css_classes: [
// 					'fadeIn', 'fadeIn',
// 					'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp',
// 					'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn',
// 					'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
// 					'bounceInUp'
// 				],
// 				selectors: [
// 					'.splash-categories-header',
// 					'.splash-categories-subheader',
// 					'.category-card-list li:nth-child(1)',
// 					'.category-card-list li:nth-child(2)',
// 					'.category-card-list li:nth-child(3)',
// 					'.category-card-list li:nth-child(4)',
// 					'.category-card-list li:nth-child(5)',
// 					'.category-card-list li:nth-child(6)',
// 					'.category-card-list li:nth-child(1) .card-icon',
// 					'.category-card-list li:nth-child(2) .card-icon',
// 					'.category-card-list li:nth-child(3) .card-icon',
// 					'.category-card-list li:nth-child(4) .card-icon',
// 					'.category-card-list li:nth-child(5) .card-icon',
// 					'.category-card-list li:nth-child(6) .card-icon',
// 					'.category-card-list li:nth-child(1) .card-label',
// 					'.category-card-list li:nth-child(2) .card-label',
// 					'.category-card-list li:nth-child(3) .card-label',
// 					'.category-card-list li:nth-child(4) .card-label',
// 					'.category-card-list li:nth-child(5) .card-label',
// 					'.category-card-list li:nth-child(6) .card-label',
// 					'.card-button'
// 				],
// 				delays: [
// 					400, 550,
// 					400, 550, 700, 950, 1100, 1250,
// 					1400, 1550, 1700, 1950, 2100, 2250,
// 					1400, 1550, 1700, 1950, 2100, 2250,
// 					3250
// 				]
// 			},
// 			onExit: {
// 				css_classes: [
// 					'fadeOut', 'fadeOut',
// 					'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown',
// 					'bounceOutDown'
// 				],
// 				selectors: [
// 					'.splash-categories-header',
// 					'.splash-categories-subheader',
// 					'.category-card-list li:nth-child(1)',
// 					'.category-card-list li:nth-child(2)',
// 					'.category-card-list li:nth-child(3)',
// 					'.category-card-list li:nth-child(4)',
// 					'.category-card-list li:nth-child(5)',
// 					'.category-card-list li:nth-child(6)',
// 					'.card-button'
// 				],
// 				delays: [
// 					400, 550,
// 					400, 550, 700, 950, 1100, 1250,
// 					2250
// 				]
// 			}
// 		}

// 		$scope.page.animations.profiles = {
// 			viewed: false,
// 			beforeScroll: null,
// 			firstViewed: {
// 				css_classes: [
// 					// headers
// 					'fadeIn', 'fadeIn',
// 					// card
// 					'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp',
// 					// ribbon
// 					'slideInRight', 'slideInRight', 'slideInRight', 'slideInRight', 'slideInRight',
// 					// icon
// 					'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn',
// 					// name
// 					'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
// 					// school
// 					'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
// 					// reviews
// 					'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
// 					// verified
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					// ratings
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn'
// 				],
// 				selectors: [
// 					// headers
// 					'.splash-gurus-header', '.splash-gurus-subheader',
// 					// card
// 					'.pf-card-li:nth-child(1)', '.pf-card-li:nth-child(2)', '.pf-card-li:nth-child(3)', '.pf-card-li:nth-child(4)', '.pf-card-li:nth-child(5)',
// 					// ribbon
// 					'.pf-card-li:nth-child(1) .pf-card-ribbon', '.pf-card-li:nth-child(2) .pf-card-ribbon', '.pf-card-li:nth-child(3) .pf-card-ribbon', '.pf-card-li:nth-child(4) .pf-card-ribbon', '.pf-card-li:nth-child(5) .pf-card-ribbon',
// 					// icon
// 					'.pf-card-li:nth-child(1) .user-icon', '.pf-card-li:nth-child(2) .user-icon', '.pf-card-li:nth-child(3) .user-icon', '.pf-card-li:nth-child(4) .user-icon', '.pf-card-li:nth-child(5) .user-icon',
// 					// name
// 					'.pf-card-li:nth-child(1) .pf-card-name-span', '.pf-card-li:nth-child(2) .pf-card-name-span', '.pf-card-li:nth-child(3) .pf-card-name-span', '.pf-card-li:nth-child(4) .pf-card-name-span', '.pf-card-li:nth-child(5) .pf-card-name-span',
// 					// school
// 					'.pf-card-li:nth-child(1) .pf-school', '.pf-card-li:nth-child(2) .pf-school', '.pf-card-li:nth-child(3) .pf-school', '.pf-card-li:nth-child(4) .pf-school', '.pf-card-li:nth-child(5) .pf-school',
// 					// reviews
// 					'.pf-card-li:nth-child(1) .pf-review-amt', '.pf-card-li:nth-child(2) .pf-review-amt', '.pf-card-li:nth-child(3) .pf-review-amt', '.pf-card-li:nth-child(4) .pf-review-amt', '.pf-card-li:nth-child(5) .pf-review-amt',
// 					// verified
// 					'.pf-card-li:nth-child(1) .pf-card-verified', '.pf-card-li:nth-child(2) .pf-card-verified', '.pf-card-li:nth-child(3) .pf-card-verified', '.pf-card-li:nth-child(4) .pf-card-verified', '.pf-card-li:nth-child(5) .pf-card-verified',
// 					// ratings
// 					'.pf-card-li:nth-child(1) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(5)',
// 					'.pf-card-li:nth-child(2) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(5)',
// 					'.pf-card-li:nth-child(3) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(5)',
// 					'.pf-card-li:nth-child(4) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(5)',
// 					'.pf-card-li:nth-child(5) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(5)'
// 				],
// 				delays: [
// 					// headers
// 					400, 550,
// 					// card
// 					400, 550, 700, 950, 1100,
// 					// ribbon
// 					1200, 1350, 1500, 1750, 1900,
// 					// icon
// 					1000, 1150, 1300, 1550, 1700,
// 					// name
// 					1200, 1350, 1500, 1750, 1900,
// 					// school
// 					1200, 1350, 1500, 1750, 1900,
// 					// reviews
// 					1200, 1350, 1500, 1750, 1900,
// 					// verified
// 					1250, 1400, 1550, 1800, 1950,
// 					// ratings
// 					1200, 1350, 1500, 1750, 1900,
// 					1350, 1500, 1750, 1900, 2050,
// 					1500, 1750, 1900, 2050, 2200,
// 					1750, 1900, 2050, 2200, 2350,
// 					1900, 2050, 2200, 2350, 2500
// 				]
// 			},
// 			secondViewed: {
// 				css_classes: [
// 					// headers
// 					'fadeIn', 'fadeIn',
// 					// card
// 					'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp',
// 					// ribbon
// 					'slideInRight', 'slideInRight', 'slideInRight', 'slideInRight', 'slideInRight',
// 					// icon
// 					'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn',
// 					// name
// 					'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
// 					// school
// 					'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
// 					// reviews
// 					'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
// 					// verified
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					// ratings
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
// 					'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn'
// 				],
// 				selectors: [
// 					// headers
// 					'.splash-gurus-header', '.splash-gurus-subheader',
// 					// card
// 					'.pf-card-li:nth-child(1)', '.pf-card-li:nth-child(2)', '.pf-card-li:nth-child(3)', '.pf-card-li:nth-child(4)', '.pf-card-li:nth-child(5)',
// 					// ribbon
// 					'.pf-card-li:nth-child(1) .pf-card-ribbon', '.pf-card-li:nth-child(2) .pf-card-ribbon', '.pf-card-li:nth-child(3) .pf-card-ribbon', '.pf-card-li:nth-child(4) .pf-card-ribbon', '.pf-card-li:nth-child(5) .pf-card-ribbon',
// 					// icon
// 					'.pf-card-li:nth-child(1) .user-icon', '.pf-card-li:nth-child(2) .user-icon', '.pf-card-li:nth-child(3) .user-icon', '.pf-card-li:nth-child(4) .user-icon', '.pf-card-li:nth-child(5) .user-icon',
// 					// name
// 					'.pf-card-li:nth-child(1) .pf-card-name-span', '.pf-card-li:nth-child(2) .pf-card-name-span', '.pf-card-li:nth-child(3) .pf-card-name-span', '.pf-card-li:nth-child(4) .pf-card-name-span', '.pf-card-li:nth-child(5) .pf-card-name-span',
// 					// school
// 					'.pf-card-li:nth-child(1) .pf-school', '.pf-card-li:nth-child(2) .pf-school', '.pf-card-li:nth-child(3) .pf-school', '.pf-card-li:nth-child(4) .pf-school', '.pf-card-li:nth-child(5) .pf-school',
// 					// reviews
// 					'.pf-card-li:nth-child(1) .pf-review-amt', '.pf-card-li:nth-child(2) .pf-review-amt', '.pf-card-li:nth-child(3) .pf-review-amt', '.pf-card-li:nth-child(4) .pf-review-amt', '.pf-card-li:nth-child(5) .pf-review-amt',
// 					// verified
// 					'.pf-card-li:nth-child(1) .pf-card-verified', '.pf-card-li:nth-child(2) .pf-card-verified', '.pf-card-li:nth-child(3) .pf-card-verified', '.pf-card-li:nth-child(4) .pf-card-verified', '.pf-card-li:nth-child(5) .pf-card-verified',
// 					// ratings
// 					'.pf-card-li:nth-child(1) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(5)',
// 					'.pf-card-li:nth-child(2) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(5)',
// 					'.pf-card-li:nth-child(3) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(5)',
// 					'.pf-card-li:nth-child(4) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(5)',
// 					'.pf-card-li:nth-child(5) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(5)'
// 				],
// 				delays: [
// 					// headers
// 					400, 550,
// 					// card
// 					400, 550, 700, 950, 1100,
// 					// ribbon
// 					1200, 1350, 1500, 1750, 1900,
// 					// icon
// 					1000, 1150, 1300, 1550, 1700,
// 					// name
// 					1200, 1350, 1500, 1750, 1900,
// 					// school
// 					1200, 1350, 1500, 1750, 1900,
// 					// reviews
// 					1200, 1350, 1500, 1750, 1900,
// 					// verified
// 					1250, 1400, 1550, 1800, 1950,
// 					// ratings
// 					1200, 1350, 1500, 1750, 1900,
// 					1350, 1500, 1750, 1900, 2050,
// 					1500, 1750, 1900, 2050, 2200,
// 					1750, 1900, 2050, 2200, 2350,
// 					1900, 2050, 2200, 2350, 2500
// 				]
// 			},
// 			onExit: {
// 				css_classes: [
// 					// headers
// 					'fadeOut', 'fadeOut',
// 					// card
// 					'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown'
// 				],
// 				selectors: [
// 					// headers
// 					'.splash-gurus-header', '.splash-gurus-subheader',
// 					// card
// 					'.pf-card-li:nth-child(1)', '.pf-card-li:nth-child(2)', '.pf-card-li:nth-child(3)', '.pf-card-li:nth-child(4)', '.pf-card-li:nth-child(5)'
// 				],
// 				delays: [
// 					// headers
// 					400, 550,
// 					// card
// 					400, 550, 700, 950, 1100
// 				]
// 			}
// 		}

// 		$scope.page.animations.bg = {
// 			viewed: false,
// 			beforeScroll: null,
// 			firstViewed: {
// 				css_classes: ['fadeIn', 'bounceInRight', 'bounceInRight', 'bounceInLeft', 'bounceInLeft', 'bounceInUp', 'bounceInUp', 'animate:keep', 'animate:keep', 'animate:keep', 'animate:keep', 'animate:keep', 'fadeIn'],
// 				selectors: ['.become-guru-header', '.bg-postit-li:nth-child(2)', '.bg-postit-li:nth-child(6)', '.bg-postit-li:nth-child(4)', '.bg-postit-li:nth-child(1)', '.bg-postit-li:nth-child(3)', '.bg-postit-li:nth-child(5)', '.bg-postit-li:nth-child(1) .tape:nth-child(2)', '.bg-postit-li:nth-child(2) .tape:nth-child(1)', '.bg-postit-li:nth-child(2) .tape:nth-child(2)', '.bg-postit-li:nth-child(6) .tape:nth-child(1)', '.bg-postit-li:nth-child(6) .tape:nth-child(2)', '.become-guru-button'],
// 				delays: [400, 500, 600, 700, 800, 900, 1000, 2000, 2000, 2000, 2000, 2000, 2500],
// 			},
// 			secondViewed: {
// 				css_classes: ['fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn'],
// 				selectors: ['.become-guru-header', '.bg-postit-li:nth-child(2)', '.bg-postit-li:nth-child(6)', '.bg-postit-li:nth-child(4)', '.bg-postit-li:nth-child(1)', '.bg-postit-li:nth-child(3)', '.bg-postit-li:nth-child(5)', '.become-guru-button'],
// 				delays: [400, 500, 600, 700, 800, 900, 1000, 1500],
// 			},
// 			onExit: {
// 				css_classes: ['fadeOut', 'hinge-right', 'hinge', 'hinge', 'hinge-right', 'hinge-right', 'hinge', 'fadeOut'],
// 				selectors: ['.become-guru-header', '.bg-postit-li:nth-child(2)', '.bg-postit-li:nth-child(6)', '.bg-postit-li:nth-child(4)', '.bg-postit-li:nth-child(1)', '.bg-postit-li:nth-child(3)', '.bg-postit-li:nth-child(5)', '.become-guru-button'],
// 				delays: [400, 500, 600, 700, 800, 900, 1000, 1500],
// 			}

// 		}

// 		var initializePageAnimations = function() {
// 			AnimationService.initializeSectionComponents($scope.page.animations.hiw.firstViewed, $scope.page.animations.hiw.firstViewed.selectors, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
// 			AnimationService.initializeSectionComponents($scope.page.animations.bg.firstViewed, $scope.page.animations.bg.firstViewed.selectors, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);
// 			AnimationService.initializeSectionComponents($scope.page.animations.categories.firstViewed, $scope.page.animations.categories.firstViewed.selectors, $scope.page.animations.categories.firstViewed.css_classes, $scope.page.animations.categories.firstViewed.delays);
// 			AnimationService.initializeSectionComponents($scope.page.animations.profiles.firstViewed, $scope.page.animations.profiles.firstViewed.selectors, $scope.page.animations.profiles.firstViewed.css_classes, $scope.page.animations.profiles.firstViewed.delays);
// 			AnimationService.initializeSectionComponents($scope.page.animations.hiw.secondViewed, $scope.page.animations.hiw.firstViewed.selectors, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
// 			AnimationService.initializeSectionComponents($scope.page.animations.bg.secondViewed, $scope.page.animations.bg.firstViewed.selectors, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);
// 			AnimationService.initializeSectionComponents($scope.page.animations.categories.secondViewed, $scope.page.animations.categories.firstViewed.selectors, $scope.page.animations.categories.firstViewed.css_classes, $scope.page.animations.categories.firstViewed.delays);
// 			AnimationService.initializeSectionComponents($scope.page.animations.profiles.secondViewed, $scope.page.animations.profiles.firstViewed.selectors, $scope.page.animations.profiles.firstViewed.css_classes, $scope.page.animations.profiles.firstViewed.delays);
// 		}


// 		var getHiwAnimationElements = function(selector_arr) {
// 			$scope.page.animations.hiw.state = 1;
// 		}

// 		//Scope var declarations
// 		var onSectionOneLoad = function() {
// 			initUniversityTypeWriter();
// 			$timeout(function() {
// 				$scope.root.loader.body.hide = true;
// 				$scope.page.scroll.section_index = 0;
// 				initHomePageWayPoint();
// 				initializePageAnimations();
// 				Waypoint.refreshAll();
// 			}, 250)
// 		}
// 		$scope.university = {}
// 			// $scope.page = {dropdowns: {}, css:{},predictionMarkers:[], sidebar:{}, showAnimation:false, offsets:{}, header: {}, peels:{}, status:{}, counters:{}};
// 		$scope.page.sidebar = {
// 			show: false
// 		};
// 		$scope.page.tabs = {
// 			hiw: {}
// 		};
// 		$scope.page.css = {
// 			bg_banner: $scope.img_base + "./img/main-bg-cambridge.jpg",
// 			main: {
// 				gradient_fill: "#40484B"
// 			}
// 		};
// 		$scope.page.status = {
// 			loaded: false,
// 			showLoader: true
// 		};
// 		$scope.page.header = {
// 			showOnScrollNav: '',
// 			becomeGuruHeaderActive: false,
// 			active_tab: {
// 				how_it_works: false,
// 				become_guru: false,
// 				university: false
// 			}
// 		};
// 		$scope.page.load = {
// 			sections: {},
// 			complete: false
// 		};
// 		$scope.page.scroll = {
// 			section_index: 0
// 		};

// 		$scope.page.load.sections = {
// 			one: {
// 				visible: true,
// 				display: true,
// 				nested: {
// 					bg_image: false
// 				},
// 				ready: onSectionOneLoad
// 			},
// 			two: {
// 				visible: true,
// 				display: true,
// 				nested: {},
// 				on_activate: null
// 			},
// 			three: {
// 				visible: true,
// 				display: true,
// 				nested: {},
// 				on_activate: null
// 			},
// 			four: {
// 				visible: true,
// 				display: true,
// 				nested: {},
// 				on_activate: null
// 			},
// 			five: {
// 				visible: true,
// 				display: true,
// 				nested: {},
// 				on_activate: null
// 			},
// 			footer: {
// 				visible: true,
// 				display: true,
// 				nested: {},
// 				on_activate: null
// 			}
// 		}


// 		$scope.switchToTabIndex = function(index) {
// 				var currentIndex = $scope.page.tabs.hiw.index;
// 				$scope.activeBrowseTabIndex = index;
// 				//switching to how it works
// 				if (index !== currentIndex && index === 2) {
// 					if (!$scope.page.animations.profiles.viewed) {
// 						$scope.page.animations.profiles.viewed = true;
// 						console.log('firing first time animations for profiles')
// 						AnimationService.activateSectionAnimations($scope.page.animations.profiles.firstViewed.elements, $scope.page.animations.profiles.firstViewed.css_classes, $scope.page.animations.profiles.firstViewed.delays);
// 					} else {
// 						console.log('firing second time animations for profiles')
// 						AnimationService.activateSectionAnimations($scope.page.animations.profiles.secondViewed.elements, $scope.page.animations.profiles.secondViewed.css_classes, $scope.page.animations.profiles.secondViewed.delays);
// 					}
// 				}
// 				if (index !== currentIndex && index === 1) {

// 					if (!$scope.page.animations.categories.viewed) {
// 						$scope.page.animations.categories.viewed = true;
// 						console.log('firing first time animations for categories')
// 						AnimationService.activateSectionAnimations($scope.page.animations.categories.firstViewed.elements, $scope.page.animations.categories.firstViewed.css_classes, $scope.page.animations.categories.firstViewed.delays);
// 					} else {
// 						console.log('firing second time animations for categories')
// 						AnimationService.activateSectionAnimations($scope.page.animations.categories.secondViewed.elements, $scope.page.animations.categories.secondViewed.css_classes, $scope.page.animations.categories.secondViewed.delays);
// 					}
// 				}
// 				if (index !== currentIndex && index === 0) {

// 					if (!$scope.page.animations.hiw.viewed) {
// 						console.log('firing first time animations for how it works')
// 						$scope.page.animations.hiw.viewed = true;
// 						AnimationService.activateSectionAnimations($scope.page.animations.hiw.firstViewed.elements, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
// 					} else {
// 						console.log('firing second time animations for how it works')
// 						AnimationService.activateSectionAnimations($scope.page.animations.hiw.secondViewed.elements, $scope.page.animations.hiw.secondViewed.css_classes, $scope.page.animations.hiw.secondViewed.delays);
// 					}

// 				}
// 			}
// 			// $scope.page.animations = {hiw: {}};
// 			// $scope.page.animations.hiw = {
// 			//   // on first appearance

// 		//   onScrollEnd: null,
// 		//   onScrollEndOnce: null, //first time
// 		//   generalCard: null, //apply to all cards
// 		// }

// 		//Scope func declarations
// 		$scope.universityButtonClicked;
// 		$scope.map;
// 		$scope.scrollToNextSection;
// 		$scope.scrollUpSection;
// 		$scope.scrollToSection;
// 		$scope.launchSupportOverlay;
// 		$scope.goToUniversity;
// 		$scope.goToSignup;
// 		$scope.toggleSidebar;

// 		//Helper Function declarations

// 		//TODO CLEANUP REST
// 		$ionicSideMenuDelegate.canDragContent(false);
// 		var shouldShowBecomeGuruHeader = false;
// 		var shouldRenderMap = true;
// 		var mainPageContainer = document.querySelector('#home-splash');
// 		var homeNavHeader = document.querySelector('#home-nav-header');
// 		var splashHiwNav = document.querySelector("#splash-hiw-nav");
// 		var homePageWayPoint;
// 		var pageNavbarHeight = 70;
// 		var sectionSneakHeight = 36;
// 		var scrollOffset = pageNavbarHeight + sectionSneakHeight - 2;

// 		//cta specific initialization vars
// 		$scope.activeBrowseTabIndex = 0;
// 		$scope.activeTabIndex = 0;
// 		$scope.profile = {
// 			public_mode: true
// 		};
// 		$scope.sampleProfiles = ContentService.sampleProfiles;
// 		$scope.sampleMiniProfilesDict = ContentService.generateMiniSampleProfileDict();





// 		var whileLoaderIsOn = function() {
// 			initHomeMap();
// 		}

// 		// render page functions
// 		var initUniversityTypeWriter = function() {
// 			TypedService.initTypedTicker('university-typed-writer', ["CS10 Exam Prep", "MCAT Concepts", "Google Interview Help", "Dirty Laundry"]);
// 		}





// 		var initHomePageWayPoint = function() {

// 			var scrollUniversityCallback = function(direction, element, scrollTop) {
// 				if (direction === 'down') {
// 					homeNavHeader.classList.add('bg-slate');
// 					$scope.page.scroll.section_index = 1;
// 				} else {
// 					homeNavHeader.classList.remove('bg-slate');
// 					$scope.page.scroll.section_index = 0;
// 				}
// 				// $scope.page.header.showOnScrollNav = 'bg-slate'
// 				//@GABRIELLE-NOTE -- add more, feel free to discuss what other things you want to add to make navbar transition feel more fluid
// 			}



// 			var scrollHowitWorksCallback = function(direction, element, scrollTop) {
// 				if (direction === 'down') {
// 					$scope.page.scroll.section_index = 2;
// 					AnimationService.animateIn(splashHiwNav, "bounceInDown");

// 					if (!$scope.page.animations.hiw.viewed) {
// 						$scope.page.animations.hiw.viewed = true;
// 						console.log('firing first time animations for hiw')
// 						AnimationService.activateSectionAnimations($scope.page.animations.hiw.firstViewed.elements, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
// 					} else {
// 						console.log('firing second time animations for hiw')
// 						AnimationService.activateSectionAnimations($scope.page.animations.hiw.secondViewed.elements, $scope.page.animations.hiw.secondViewed.css_classes, $scope.page.animations.hiw.secondViewed.delays);
// 					}
// 					//

// 				} else {
// 					$scope.page.scroll.section_index = 1;

// 					var callback = function() {
// 						splashHiwNav = document.querySelector('#splash-hiw-nav');
// 					}
// 					AnimationService.animateOut(splashHiwNav, "slideOutUp", callback);
// 				}
// 			}

// 			var scrollBecomeGuruCallback = function(direction, element, scrollTop) {
// 				if (direction === 'down') {

// 					var callback = function() {
// 						splashHiwNav = document.querySelector('#splash-hiw-nav');
// 					}
// 					AnimationService.animateOut(splashHiwNav, "slideOutUp", callback);


// 					if (!$scope.page.animations.bg.viewed) {
// 						$scope.page.animations.bg.viewed = true;
// 						console.log('firing first time animations for become guru');
// 						AnimationService.activateSectionAnimations($scope.page.animations.bg.firstViewed.elements, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);
// 					} else {
// 						console.log('firing second time animations for become guru');
// 						AnimationService.activateSectionAnimations($scope.page.animations.bg.secondViewed.elements, $scope.page.animations.bg.secondViewed.css_classes, $scope.page.animations.bg.secondViewed.delays);
// 					}

// 				} else {
// 					$scope.page.scroll.section_index = 1;
// 				}
// 				// $scope.page.header.showOnScrollNav = 'bg-charcoal'
// 				//@GABRIELLE-NOTE -- add more, feel free to discuss what other things you want to add to make navbar transition feel more fluid
// 			}

// 			var waypointDict = {
// 				"splash-home": {
// 					func: null
// 				},
// 				"splash-university": {
// 					func: scrollUniversityCallback,
// 					offset: scrollOffset
// 				}, //precursor-section-height + navbar.height
// 				"splash-browse": {
// 					func: scrollHowitWorksCallback,
// 					offset: scrollOffset
// 				},
// 				"become-guru": {
// 					func: scrollBecomeGuruCallback,
// 					offset: scrollOffset
// 				}
// 			}
// 			ScrollService.initArrWaypoints(waypointDict, "home-splash");

// 		}




// 		$scope.scrollNextSection = function() {
// 			if ($scope.page.scroll.section_index === 0) {
// 				$scope.scrollToSection("#splash-university");
// 			}
// 			if ($scope.page.scroll.section_index === 1) {
// 				$scope.scrollToSection("#splash-browse");
// 			}
// 			if ($scope.page.scroll.section_index === 2) {
// 				$scope.scrollToSection("#become-guru");
// 			}
// 		}

// 		$scope.scrollUpSection = function() {
// 			if ($scope.page.scroll.section_index === 2) {
// 				$scope.scrollToSection("#splash-browse");
// 			}
// 			if ($scope.page.scroll.section_index === 1) {
// 				$scope.scrollToSection("#splash-university");
// 			}
// 			if ($scope.page.scroll.section_index === 2) {
// 				$scope.scrollToSection("#splash-home");
// 			}
// 		}

// 		//outgoing transitioning functions
// 		$scope.selectUniversityAndTransition = function(university, $event) {
// 			var pageLoader = document.querySelector('cta-modal-page-loader');
// 			$scope.root.vars.university = university;
// 			$localstorage.setObject('university', university);
// 			AnimationService.flip('^.universities', {}, {
// 				universityId: university.id,
// 				universityObj: university
// 			});
// 		}
// 		$scope.goToSignup = function() {
// 			if ($scope.desktopMode) {
// 				AnimationService.flip('^.desktop-login')
// 			} else {
// 				$scope.signupModal.show();
// 			}
// 		}
// 		$scope.goToStudentHome = function() {
// 			if ($scope.user.id && $scope.user.first_name) {
// 				AnimationService.flip('^.student-home');
// 			} else {
// 				if ($scope.desktopMode) {
// 					AnimationService.flip('^.desktop-login');
// 				} else {
// 					$scope.signupModal.show();
// 				}
// 			}
// 		}


// 		//general functions
// 		var initSupportBox = function() {
// 			Intercom('boot', {
// 				app_id: "yoz6vu28",
// 				widget: {
// 					"activator": "#Intercom"
// 				}
// 			})
// 			$timeout(function() {
// 				var intercomContainer = document.querySelector('#intercom-container');
// 				console.log('attempting intercom container');
// 				if (intercomContainer) {
// 					Intercom('hide');
// 					console.log('initiating intercom container');
// 					intercomContainer.style.cssText += ' z-index:1000 !important; visibility:hidden;';

// 				}
// 			}, 5000)
// 		}




// 		var generatePageLinks = function() {
// 			initSupportBox();
// 			var howItWorksFunc = function() {
// 				$scope.scrollToSection("#splash-browse")
// 			}
// 			var browseFunc = function() {
// 				$scope.scrollToSection("#splash-browse");
// 			}
// 			var becomeGuruFunc = function() {
// 				$scope.scrollToSection("#become-guru");
// 			}
// 			var topPageFunc = function() {
// 				$scope.scrollToSection("#home-splash");
// 			}

// 			var triggerSupportBox = function() {
// 				$scope.launchSupportOverlay();
// 			}
// 			$scope.pageLinks = [{
// 				name: "Home",
// 				ngClickFunc: topPageFunc
// 			}, {
// 				name: null,
// 				href: "#",
// 				sublinks: [{
// 					name: 'Login',
// 					ngClickFunc: $scope.goToSignup
// 				}, {
// 					name: 'How it works',
// 					ngClickFunc: howItWorksFunc
// 				}, {
// 					name: "Browse",
// 					ngClickFunc: browseFunc
// 				}, {
// 					name: "Become a Guru",
// 					ngClickFunc: becomeGuruFunc
// 				}]
// 			}, {
// 				name: "Meet the Team",
// 				id: 'cta-box-team'
// 			}, {
// 				name: "FAQ",
// 				id: 'cta-box-FAQ'
// 			}, {
// 				name: "Pricing",
// 				id: 'cta-box-pricing'
// 			}, {
// 				name: "Apply",
// 				id: 'cta-box-apply'
// 			}, {
// 				name: "Support",
// 				ngClickFunc: triggerSupportBox
// 			}];
// 		}

// 		generatePageLinks();

// 		// mobile-specific render pages
// 		var initMobileModals = function() {
// 			$ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
// 				scope: $scope,
// 				animation: 'slide-in-up'
// 			}).then(function(modal) {
// 				$scope.signupModal = modal;
// 			});
// 		}

// 		$scope.launchSupportOverlay = function() {
// 			var intercomContainer = document.querySelector('#intercom-container');
// 			intercomContainer.style.cssText += ' z-index:1000 !important;';
// 			Intercom('show');
// 			intercomContainer.style.visibility = "visible";
// 			Intercom('onHide', function() {
// 				intercomContainer.style.visibility = "hidden";
// 			})
// 		}

// 		$scope.university = {};
// 		$timeout(function() {
// 			$scope.how_it_works = ContentService.generateUniversitySpecificHowItWorks($scope.university);
// 			$scope.become_guru = ContentService.generateUniversitySpecificBecomeGuruText($scope.university);
// 		}, 1000)

// 		var initMapFromUniversity = function(university) {
// 			var latitude = parseFloat(university.latitude);
// 			var longitude = parseFloat(university.longitude);
// 			return {
// 				center: {
// 					latitude: latitude,
// 					longitude: longitude
// 				},
// 				zoom: 10,
// 				control: {}
// 			};
// 		}



// 		$scope.toggleSidebar = function() {
// 			$scope.page.sidebar.show = !$scope.page.sidebar.show;
// 		}
// 		var showDelayedBecomeGuruHeader = function() {


// 			$timeout(function() {

// 				var becomeGuruShown = $scope.root.vars.page_cache.essayHomeBecomeGuru;
// 				if (!becomeGuruShown) {
// 					$scope.becomeGuruHeaderActive = true;
// 					$scope.root.vars.page_cache.essayHomeBecomeGuru = true;
// 					$localstorage.setObject('page_cache', $scope.root.vars.page_cache);
// 				} else {}
// 			}, 7000);
// 		}

// 		//Navbar functions
// 		$scope.scrollToSection = function(section_selector) {
// 			var scrollDuration = 500;
// 			var amount = null;
// 			var successFunction = null;
// 			var pageParentContainer = '#home-splash';

// 			ScrollService.scrollTo(amount, successFunction, scrollDuration, pageParentContainer, section_selector, scrollOffset);
// 		}

// 		// rendering functions
// 		var initProfileCTAS = function() {

// 			var academicCTABoxElem = document.getElementById('cta-box-academic');
// 			console.log(academicCTABoxElem);
// 			if (!academicCTABoxElem) {
// 				console.log('checking for categories again in 1 second');
// 				setTimeout(function() {
// 					initProfileCTAS();
// 				}, 1000)
// 				return;
// 			}


// 			var showCTACallback = function(category) {
// 				return function() {
// 					$scope.user = $scope.sampleProfiles[category];
// 				}
// 			}

// 			var initPricingCounters = function() {
// 				$timeout(function() {
// 					if (!$scope.pricingSidebarAlreadyInitialized) {
// 						$scope.pricingSidebarAlreadyInitialized = true;
// 						var feeCounter = CounterService.initCounter(document.getElementById('our-fees'), 40, 0, 10, '%');
// 						CounterService.startCounter(feeCounter);
// 						var pricingCounter = CounterService.initCounter(document.getElementById('students-pay'), 100, 14, 10, '/hr', '$');
// 						CounterService.startCounter(pricingCounter);
// 						var chargeCounter = CounterService.initCounter(document.getElementById('guru-charge'), 100, 20, 10, '/hr', '&lsaquo;$');
// 						CounterService.startCounter(chargeCounter);
// 					}
// 				}, 1500);
// 			}



// 			var result = CTAService.initSingleCTA('#cta-box-academic', '#home-splash', showCTACallback("academic"));
// 			if (result === false) {
// 				$timeout(function() {
// 					console.log('trying again in 1000 ms');
// 					initProfileCTAS();
// 				}, 1000)
// 				return;
// 			}
// 			CTAService.initSingleCTA('#cta-box-baking', '#home-splash', showCTACallback("bakery"));
// 			CTAService.initSingleCTA('#cta-box-household', '#home-splash', showCTACallback("household"));
// 			CTAService.initSingleCTA('#cta-box-photography', '#home-splash', showCTACallback("photography"));
// 			CTAService.initSingleCTA('#cta-box-tech', '#home-splash', showCTACallback("tech"));
// 			//sidebar
// 			CTAService.initSingleCTA('#cta-box-pricing', '#home-splash', initPricingCounters);
// 			CTAService.initSingleCTA('#cta-box-FAQ', '#home-splash');
// 			CTAService.initSingleCTA('#cta-box-apply', '#home-splash');
// 			CTAService.initSingleCTA('#cta-box-team', '#home-splash');
// 		}



// 		var initiateCounters = function() {

// 			$scope.page.counters['num-university-counter'].start();
// 			$scope.page.counters['num-course-counter'].start();
// 			$scope.page.counters['num-guru-counter'].start();

// 		}

// 		var calcTotalCourses = function(universities) {
// 			var sum = 0
// 			for (var i = 0; i < universities.length; i++) {
// 				var indexUniversity = universities[i];
// 				if (indexUniversity) {
// 					sum += indexUniversity.num_courses;
// 				}
// 			}
// 			return sum;
// 		}



// 		var calculateAndInitiateCounters = function() {
// 			var totalUniversities = $scope.universities.length;
// 			var totalCourses = calcTotalCourses($scope.universities);
// 			$scope.page.counters['num-university-counter'] = CounterService.initCounter('num-university-counter', 1.0, totalUniversities, 5);
// 			$scope.page.counters['num-course-counter'] = CounterService.initCounter('num-course-counter', 1.0, parseInt(totalCourses / 1000), 5, 'K');
// 			$scope.page.counters['num-guru-counter'] = CounterService.initCounter('num-guru-counter', 1.0, 1130, 5);
// 			//@samir - todo, implement when scroll down to the section
// 			initiateCounters();
// 		}


// 		$scope.initProfileCTAS = initProfileCTAS;

// 		$scope.$on('$ionicView.afterEnter', function() {

// 			$timeout(function() {
// 				initProfileCTAS();
// 			})
// 		})

// 		$scope.hiwSlideChanged = function($index) {
// 			$ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').update();
// 			if ($index === 5) {
// 				$timeout(function() {
// 					$ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').slide(0, 250);
// 				}, 2500)
// 			}
// 		}

// 		$scope.bgSlideChanged = function($index) {
// 			$ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').update();
// 			if ($index === 5) {
// 				$timeout(function() {
// 					$ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').slide(0, 250);
// 					// $ionicSlideBoxDelegate.$getByHandle('hiw-slidebox').next();
// 				}, 2500)
// 			}
// 		}

// 		var styleOptions = [{
// 			featureType: 'water',
// 			elementType: 'geometry',
// 			stylers: [{
// 				hue: '#50A5DD'
// 			}, {
// 				saturation: -50
// 			}, {
// 				lightness: 0
// 			}, {
// 				visibility: 'on'
// 			}]
// 		}, {
// 			featureType: 'water',
// 			elementType: 'labels',
// 			stylers: [{
// 				visibility: 'off'
// 			}]
// 		}, {
// 			featureType: 'landscape',
// 			elementType: 'all',
// 			stylers: [{
// 				visibility: 'off'
// 			}]
// 		}, {
// 			featureType: 'poi',
// 			elementType: 'all',
// 			stylers: [{
// 				visibility: 'off'
// 			}]
// 		}, {
// 			featureType: 'administrative.country',
// 			elementType: 'labels',
// 			stylers: [{
// 				visibility: 'off'
// 			}]
// 		}, {
// 			featureType: 'administrative.locality',
// 			elementType: 'labels',
// 			stylers: [{
// 				visibility: 'off'
// 			}]
// 		}, {
// 			featureType: 'all',
// 			elementType: 'labels',
// 			stylers: [{
// 				visibility: 'off'
// 			}]
// 		}];

// 		$scope.universities = University.getTargetted();
// 		// $scope.search_text = {university: "", matching: []};

// 		var calcZoom = function() {
// 			if ($scope.desktopMode) {
// 				return 4;
// 			} else {
// 				return 2;
// 			}
// 		}

// 		var mapDefaults = {
// 			zoom: calcZoom(),
// 			options: {
// 				streetViewControl: false,
// 				scrollwheel: false,
// 				panControl: false,
// 				minZoom: 1,
// 				maxZoom: 7,
// 				styles: styleOptions,
// 				scrollwheel: false,
// 				mapTypeControl: false,
// 				style: styleOptions,
// 				draggable: true,
// 				disableDoubleClickZoom: false,
// 				zoomControl: true
// 			}
// 		}

// 		var generateClusterImgDataURI = function(obj) {
// 			var baseSVGURL = "<svg viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + obj.bg_color + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + obj.bg_color + "'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + obj._text + "</tspan></text></svg>"
// 			return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
// 		}

// 		var generateUniversityImgDataURI = function(obj) {
// 			var baseSVGURL = "<svg style='height:25px; width:25px;' viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + obj.school_color_dark + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + obj.school_color_dark + "'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + obj.tiny_name + "</tspan></text></svg>"
// 			return 'data:image/svg+xml;base64,' + window.btoa(baseSVGURL)
// 		}


// 		var clusterCalculator = function(markers, num_styles) {
// 			//The function used to determine the text to be displayed on a cluster marker and the index indicating which
// 			// style to use for the cluster marker.

// 			var markerValues = markers.values();
// 			var universityArr = getUniversitiesFromMarkers(markerValues)
// 			var stateDict = getMostCommonStateFromUniversities(universityArr);
// 			var getTopXStateStr = processStateDictToStr(stateDict);

// 			function processStateDictToStr(state_dict) {
// 				var results = [];
// 				for (var key in state_dict) results.push([key, state_dict[key]]);

// 				results.sort(function(a, b) {
// 					a = a[1];
// 					b = b[1];

// 					return a < b ? -1 : (a > b ? 1 : 0);
// 				}).reverse();
// 				result_str = "";
// 				if (results.length === 1) {
// 					return results[0][0] + ""
// 				}
// 				if (results.length === 2) {
// 					return results[0][0] + " + " + results[1][0] + ""
// 				}
// 				if (results.length === 3) {
// 					return results[0][0] + ", " + results[1][0] + " + " + results[2][0] + ""
// 				}
// 				if (results.length > 3) {
// 					return results[0][0] + ", " + results[1][0] + " + " + results[2][0] + " + more"
// 				}
// 				// for (var i = 0; i < results.length; i++) {
// 				//     var key = results[i][0];
// 				//     var value = results[i][1];
// 				// }
// 			}

// 			function getUniversitiesFromMarkers(markers) {
// 				var arrUniversities = [];
// 				for (var i = 0; i < markers.length; i++) {
// 					var indexMarker = markers[i];
// 					arrUniversities.push(indexMarker.model.university);
// 				}
// 				return arrUniversities;
// 			}

// 			function getMostCommonStateFromUniversities(universities) {
// 				var stateDict = {};
// 				for (var i = 0; i < universities.length; i++) {
// 					var indexUniversity = universities[i];
// 					if (indexUniversity.state) {
// 						if (stateDict[indexUniversity.state]) {
// 							stateDict[indexUniversity.state] += 1;
// 						} else {
// 							stateDict[indexUniversity.state] = 1;
// 						}
// 					}
// 				}
// 				return stateDict;
// 			}



// 			if (universityArr.length > 10) {
// 				var indexNumber = 1
// 			} else {
// 				var indexNumber = 2
// 			}


// 			var resultDict = {
// 				text: "Colleges in " + getTopXStateStr,
// 				title: '+more',
// 				index: indexNumber
// 			}
// 			return resultDict;
// 		}


// 		var initClusterObj = function(marker_arr) {
// 			var options_dict = {
// 				minimumClusterSize: 5,
// 				calculator: clusterCalculator,
// 				styles: [{
// 					width: 125,
// 					height: 125,
// 					url: generateClusterImgDataURI({
// 						bg_color: $scope.universities[0].school_color_dark,
// 						_text: ""
// 					}),
// 					fontFamily: "Source Sans Pro",
// 					fontWeight: "600",
// 					textColor: "#FFFFFF",
// 					textSize: 12,
// 					// anchorText: "[0, 0]",
// 					anchorIcon: "[0, 0]"
// 				}, {
// 					width: 75,
// 					height: 75,
// 					url: generateClusterImgDataURI({
// 						bg_color: $scope.universities[43].school_color_dark,
// 						_text: ""
// 					}),
// 					fontFamily: "Source Sans Pro",
// 					fontWeight: "600",
// 					textColor: "#FFFFFF",
// 					textSize: 12,
// 					anchorText: "[0, 0]"
// 				}],
// 				title: "",
// 				zoomOnClick: true,
// 				maxZoom: 7,
// 				gridSize: 60,
// 				clusterClass: "university-svg-cluster",
// 				// batchSize:
// 				averageCenter: true
// 			}
// 			return options_dict
// 		}



// 		var initHomeMap = function() {
// 			$scope.page.load.sections.two.display = true;
// 			$scope.map = {
// 				center: {
// 					latitude: $scope.universities[0].latitude,
// 					longitude: $scope.universities[0].longitude
// 				},
// 				control: {},
// 				zoom: mapDefaults.zoom,
// 				dragging: true, //true while map is dragging state, false otherwise
// 				refresh: false,
// 				options: mapDefaults.options,
// 				events: {
// 					tilesloaded: onMapRenderCompleteOnce
// 				},
// 				clusterOptions: initClusterObj(),
// 				bounds: null, //Fit the map in the specified bounds. The expression must resolve to an object having both northeast and southwest properties. Each of those properties must have a latitude and a longitude properties.
// 				pan: true,
// 				markers: generateXMarkersFromUniversities(200, $scope.universities),
// 				rebuildMarkers: false,
// 				window: {
// 					coords: {},
// 					show: false,
// 					university: {},
// 					options: defaultWindowOptions,
// 					close: closeInfoWindow
// 				}
// 			}
// 		}

// 		var createMarkerObj = function(obj) {

// 			var universityObj = {
// 				school_color_light: obj.school_color_light,
// 				banner_url: obj.banner_url,
// 				school_color_dark: obj.school_color_dark,
// 				name: obj.name,
// 				tiny_name: obj.school_tiny_name,
// 				city: obj.city,
// 				state: obj.state
// 			}
// 			return {
// 				id: obj.id,
// 				latitude: obj.latitude,
// 				longitude: obj.longitude,
// 				icon: generateUniversityImgDataURI(universityObj),
// 				events: {
// 					click: onMarkerClick
// 				},
// 				university: universityObj
// 			}
// 		}

// 		var generateXMarkersFromUniversities = function(x, universities_arr, with_interval) {

// 			var universities_arr = universities_arr.slice(0, x);
// 			var marker_obj_arr = [];
// 			for (var i = 0; i < universities_arr.length; i++) {
// 				marker_obj_arr.push(createMarkerObj(universities_arr[i]));
// 			}
// 			return marker_obj_arr;
// 		}

// 		var windowCloseButtonIsClicked = function(e) {
// 			console.log(e);
// 		}

// 		var defaultWindowOptions = {
// 			pixelOffset: new google.maps.Size(0, -10, 'px', 'px'),
// 			closeclick: windowCloseButtonIsClicked
// 		}

// 		var closeInfoWindow = function() {
// 			$scope.map.window.show = false;
// 		}

// 		var refreshMap = function() {
// 			$scope.map.refresh = true;
// 			console.log('map is refreshing');
// 			$timeout(function() {
// 				$scope.map.refresh = false;
// 			})
// 		}



// 		var updateWindowToMarker = function(window_obj, model_obj) {
// 			window_obj.coords = {
// 				latitude: model_obj.latitude,
// 				longitude: model_obj.longitude
// 			};
// 			window_obj.university = model_obj.university;
// 		}

// 		var deleteWindowExtraCSS = function() {
// 			var elem = document.querySelector('.gm-style-iw');
// 			var children = elem.parentElement.childNodes;
// 			for (var i = 0; i < children.length; i++) {
// 				var indexChild = children[i];
// 				if (indexChild !== elem) {
// 					indexChild.style.display = "none"
// 				}
// 			}
// 		}

// 		var onMarkerClick = function(marker, event_name, model) {
// 			updateWindowToMarker($scope.map.window, model);
// 			$scope.map.window.show = true;
// 			$timeout(function() {
// 				deleteWindowExtraCSS();
// 			}, 100)
// 			$timeout(function() {
// 				console.log('attempting to compile');
// 				$compile(document.getElementById('university-info-window-button'))($scope);
// 				$compile(document.getElementById('university-info-window-close-button'))($scope);
// 			}, 1000)
// 		}



// 		var onMapRenderCompleteOnce = function(map) {
// 			if (!$scope.map.og_map) {
// 				$scope.mapHasRendered = true;
// 				$scope.map.og_map = map;
// 				console.log('map has finalled rendered');
// 			}
// 		}


// 		$scope.$on('$ionicView.beforeEnter', function() {

// 			if (!$scope.universities) {
// 				$scope.universities = University.getTargetted().slice();
// 			}
// 			initHomeMap();

// 		})


// 		$scope.$on('$ionicView.enter', function() {
// 			console.log('ionic has entered');
// 			$timeout(function() {
// 				shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader();
// 				// initUniversityTypeWriter();
// 				calculateAndInitiateCounters();

// 				!$scope.desktopMode && initMobileModals();
// 				$ionicSlideBoxDelegate.update();
// 			}, 5000)
// 		});


// 	}
// >>>>>>> 24da21e14476ec133df78ff4d76b48c1b53f8015

])