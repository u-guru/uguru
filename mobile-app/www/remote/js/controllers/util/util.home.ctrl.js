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



      $ionicSideMenuDelegate.canDragContent(false);
      var shouldShowBecomeGuruHeader = false;
      var shouldRenderMap = true;
      var mainPageContainer = document.querySelector('#home-splash');

      //START BROWSE SECTION

      //cta specific initialization vars
      $scope.activeBrowseTabIndex = 1;
      $scope.activeTabIndex = 0;
      $scope.profile = {public_mode: true};
      $scope.sampleProfiles = ContentService.sampleProfiles;
      $scope.sampleMiniProfilesDict = ContentService.generateMiniSampleProfileDict();


      // page initialize vars
      $scope.university = {}
      $scope.page = {dropdowns: {}, css:{},predictionMarkers:[], sidebar:{}, showAnimation:false, offsets:{}, header: {}, peels:{}, status:{}, counters:{}};
      $scope.page.sidebar = {show:false};
      $scope.page.css = {bg_banner:$scope.img_base + "./img/main-bg-cambridge.jpg", main:{gradient_fill:"#40484B"}};
      $scope.page.status = {loaded:false, showLoader:true};
      $scope.page.header = {showSolidNav:false};


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


      // render page functions
      var initUniversityTypeWriter = function() {
        TypedService.initTypedTicker('university-typed-writer', ["CS10 Exam Prep", "MCAT Concepts", "Google Interview Help", "Dirty Laundry"]);
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

    //get universities
    if (!$scope.universities) {
        $scope.universities = University.getTargetted().slice();
    }

    function getInvisibleIconPath() {
      return {
        "path": "M33.4454342, 31.4545455",
        "fillOpacity": 0,
        "strokeOpacity":0,
        "rotation": 0,
        "scale":0.01,
        "strokeColor": "transparent",
        "fillColor": "transparent",
        "strokeWeight": 0
      }
    }
    var convertSVGStringIntoDataUri = function(svg_string) {
      var precursorFormat = "data:image/svg+xml,";
      var result = (precursorFormat + encodeURIComponent(svg_string));
      return result;
    }



    var closeHomePageLoader = function() {
        bodyLoadingDiv.classList.add('hide');
    }

      //adds X markers every Y seconds
      var placeAllMarkersOnMapInXMillSeconds = function(ms, markerArr) {
        var markerLength = markerArr.length;
        var intervalLength = ((ms * 1.0) / markerLength)|0;
        var i =0
        console.log('placing', markerLength, '. One every', intervalLength, 'seconds.')
        var staggerTimeout = setInterval(function() {
              if (i === markerArr.length) {
                clearTimeout(intervalLength);
              }
              var indexMarker = markerArr[i];
              $scope.universityMarkers.push(indexMarker);
              i++;
        }, intervalLength)
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
        ScrollService.scrollTo(amount, successFunction, scrollDuration, pageParentContainer, section_selector);
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

        var waypointDict = {
          "how-it-works": {func:null, offset:100},
          "splash-university": {func:null},
          "splash-browse": {func:null},
          "become-guru": {func:null}
        }

        $timeout(function() {
          initProfileCTAS();
        })

        $timeout(function() {

          ScrollService.initArrWaypoints(waypointDict, "home-splash");
        }, 5000)
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

      var generateNullIcon = function() {
        return {
          "path": "M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0",
          "fillOpacity": 1,
          "strokeOpacity":1,
          "scale":0.4,
          "anchor": new google.maps.Point(100, 200),
          "strokeColor": "transparent",
          "fillColor": "transparent",
        }
      }

      var createMarkerObj = function(obj) {
        return {
          id: obj.id,
          latitude: obj.latitude,
          longitude: obj.longitude,
          icon: generateNullIcon(),
          options: {
            labelClass: 'university-svg-icon',
            labelContent: generateSVGLabelContent(obj.school_color_dark, obj.school_color_light, obj.school_tiny_name),
            labelAnchor: "0 200"
          },
          events: {
            click: onMarkerClick
          },
          university: {
            school_color_light: obj.school_color_light,
            banner_url: obj.banner_url,
            school_color_dark: obj.school_color_dark,
            name: obj.name
          }
        }
      }

      //adds X markers every Y seconds
      var placeAllMarkersOnMapInXMillSeconds = function(ms, markerArr) {
        var markerLength = markerArr.length;
        var intervalLength = ((ms * 1.0) / markerLength)|0;
        var i =0
        console.log('placing', markerLength, '. One every', intervalLength, 'seconds.')
        var staggerTimeout = setInterval(function() {
              if (i === markerArr.length) {
                clearTimeout(intervalLength);
              }
              var indexMarker = markerArr[i];
              $scope.universityMarkers.push(indexMarker);
              i++;
        }, intervalLength)
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

      var generateSVGLabelContent = function(dark_color, light_color, text) {
        var base_str = "data:image/svg+xml,"
        var base_svg = "data:image/svg+xml,<svg viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + dark_color + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + dark_color +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + text + "</tspan></text></svg>"
        return base_str + base_svg;
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
          closeHomePageLoader();
          console.log('map has finalled rendered');
          clearTimeout(timerCounter);
          console.log('clearing counter');
        }
      }

      $scope.map = {
        center: {latitude: $scope.universities[0].latitude, longitude: $scope.universities[0].longitude},
        control: {},
        zoom:  mapDefaults.zoom,
        dragging: true, //true while map is dragging state, false otherwise
        refresh: false,
        options: mapDefaults.options,
        events: {tilesloaded: onMapRenderCompleteOnce},
        bounds: null, //Fit the map in the specified bounds. The expression must resolve to an object having both northeast and southwest properties. Each of those properties must have a latitude and a longitude properties.
        pan: true,
        markers: generateXMarkersFromUniversities(20, $scope.universities),
        rebuildMarkers: false,
        window: {coords:{}, show:false, university: {}, options:defaultWindowOptions, close:closeInfoWindow}
      }


      $scope.universityButtonClicked = function() {
        console.log('university button clicked');
      }
      var timerCounter = null;
      // $scope.$on('$ionicView.beforeEnter', function() {
      //     console.log('before ionic has entered');
      //     var index = 0;
      //     timerCounter = setInterval(function() {
      //       index += 1
      //       console.log(index, 'seconds have passed');
      //     }, 1000)
      // })

      $scope.$on('$ionicView.enter', function() {
         console.log('ionic has entered');
         $timeout(function() {
            shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader();
            initUniversityTypeWriter();
            calculateAndInitiateCounters();
            !$scope.desktopMode && initMobileModals();
            $ionicSlideBoxDelegate.update();
          }, 5000)
      });

      $scope.$on('$ionicView.afterEnter', function() {
        console.log('ionic has after entered');
      })


       $scope.$on('$viewContentLoaded', function(){
          // alert('view has loaded');
        //Here your view content is fully loaded !!
        });

    }

])