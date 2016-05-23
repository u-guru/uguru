angular.module('uguru.util.controllers')

.controller('OneUniversityController', [
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
        var scrollDuration= 500;


        var shouldShowBecomeGuruHeader = $scope.desktopMode;
        var shouldRenderMap = false;
        $scope.activeBrowseTabIndex = 1;
        $scope.activeTabIndex = 0;
        var mainPageContainer = document.querySelector('#university-splash');
        $scope.profile = {public_mode: true};
        $scope.courses = [];
        $scope.search_text = {course: ""};
        $scope.page = {dropdowns: {}, css:{}, predictionMarkers:[], sidebar:{transitions: null}, showAnimation:false, offsets:{}, header: {}, peels:{}, status:{}}
        $scope.university = $stateParams.universityObj || null;


        var initMobileSideBarTransitions = function() {
          if (!$scope.desktopMode) {
            $scope.sidebar.transitions = {active: null, inactive:null};
          } else {
            $scope.sidebar.transitions = {active: null, inactive:null};
          }
        }

        var getUniversityId = function() {
          if ($scope.university && $scope.university.id) {
            return $scope.university.id;
          }
          if ($stateParams) {
            if ($stateParams.universityObj) {
              $scope.university = $stateParams.universityObj;
              $scope.page.css = {bg_banner:$scope.university.banner_url, main:{gradient_fill:$scope.university.school_color_dark}};
            }
            var university_id = $stateParams.universityId;
            return university_id;
          }
        }

        var getPublicUniversityInformation = function(university_id) {

        var success = function(universityObj) {
          $scope.university = universityObj.plain();
          $scope.page.css = {bg_banner:$scope.university.banner_url, main:{gradient_fill:$scope.university.school_color_dark}};
          $scope.user.university = $scope.university;
          shouldRenderMap && $scope.root.vars.initRequestMap();
          if (!LOCAL) {
            $scope.page.universityStyleUrl = $scope.img_base + BASE + 'templates/one.university.style.html';
          } else {
            $scope.page.universityStyleUrl = $scope.img_base + 'templates/one.university.style.html';
          }
          $timeout(function() {
            $scope.$apply();
          })
          //update sidebar link
          $scope.pageLinks[1].name = universityObj.short_name

          $timeout(function() {
            $scope.page.status.loaded = true;
          }, 1000);

          $timeout(function() {
            $scope.page.status.showLoader = false;
          }, 2500)

        }

        var failure = function(err) {
          console.error(err);
        }

        Restangular.one('universities', university_id).customGET().then(success, failure)

      }

        var getUniversityInfoForView = function(university_id) {
          getPublicUniversityInformation(university_id);
          University.getPopularCoursesPromise(university_id).then(function(response) {
            $scope.courses = response.plain();
          });

          $scope.sampleMiniProfilesDict = ContentService.generateMiniSampleProfileDict();
        }


        $timeout(function() {
          var university_id = getUniversityId();
          if (university_id) {
            getUniversityInfoForView(university_id);
          }
        })

      $scope.$on('$ionicView.beforeEnter', function() {
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.highlighted_item;
        $scope.activeTabIndex = 2;

        $scope.courses = [];
        $scope.search_text = {course: ""};
        $scope.page.sidebar = {show:false, university:true};
        $scope.page.status = {loaded:false, showLoader:true};
        $scope.page.header = {showSolidNav:false};
        $scope.sampleProfiles = ContentService.sampleProfiles;




      });





      var calcAllMainSectionContainers = function() {
        $scope.page.offsets = {
          browse: document.querySelector('#splash-browse').offsetTop,
          become_guru: document.querySelector('#become-guru').offsetTop,
          how_it_works: document.querySelector('#how-it-works').offsetTop,
        }
      }

      $scope.peelCard = function($event, item, type) {
        if ($scope.peelInTransition) {
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

        if (!$scope.university) {
          LoadingService.showMsg('Something went wrong.. Redirecting you back to home page.', 2000)
          $timeout(function() {
            AnimationService.flip('^.home');
          }, 1000)
          return;
        }

        $scope.root.vars.university = $scope.university;

        if ($scope.desktopMode) {


            AnimationService.flip('^.desktop-become-guru', {}, {universityId:$scope.university.id, universityObj:$scope.university});
          }
        else {

          AnimationService.flip('^.become-guru', {}, {universityId:$scope.university.id, universityObj:$scope.university})
        }
      }

      $scope.goToSignup = function() {
        if (!$scope.university) {
          LoadingService.showMsg('Something went wrong.. Redirecting you back to home page.', 2000)
          $timeout(function() {
            AnimationService.flip('^.home');
          }, 1000)
          return
        }

        $scope.root.vars.university = $scope.university;
        $localstorage.setObject('university', $scope.university);

        if ($scope.desktopMode) {
          if ($scope.university) {
            AnimationService.flip('^.desktop-login', {}, {universityId:$scope.university.id, universityObj:$scope.university});
          }
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
      }
      var initSupportBox = function() {
        Intercom('boot', {
                app_id: "yoz6vu28",
                widget: {"activator": "#Intercom"}
        })
        $timeout(function() {
          var intercomContainer = document.querySelector('#intercom-container');
          if (intercomContainer) {
            Intercom('hide');
            intercomContainer.style.cssText += ' z-index:1000 !important; visibility:hidden;';

          }
        }, 15000)
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
        var goToHomePage = function() {
          var cb = function() {
            $timeout(function() {
              $scope.$apply();
            })
          }
          AnimationService.flip('^.home',null, {}, cb);

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
          $scope.launchSupportOverlay();
        }
        var triggerFAQCTA = function() {
          LoadingService.showMsg('Coming Soon', 3000);
        }
        return [
          {name:"Home", ngClickFunc:goToHomePage},
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
          {name: "Support", ngClickFunc:triggerSupportBox}
        ];
      }

      $scope.pageLinks =  generatePageLinks()

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
        if (query && query.length) {
          SearchboxService.queryAutocompleteService($scope.page.dropdowns.location_search.input, $scope, $scope.map.control.getGMap());
        } else {
          $scope.page.dropdowns.location_search.predictions = [];
        }
      }



    var showMarkerInfoWindow = function(gMarker, event, modelMark) {
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

    var initRequestMap = function() {
      if ($scope.university) {
        $scope.map = GMapService.initMapObj($scope.university, {zoom:16, disableDoubleClickZoom:true, draggable:false});

        $scope.map.nearbyLocations = {coords:"'self'", markers:[], control:{}, showWindow: showMarkerInfoWindow};
        $scope.gmapAnimation = google.maps.Animation.BOUNCE;
        $scope.map.centerMarker = {id:1, options:{animation: $scope.gmapAnimation, icon:"https://uguru.me/static/remote/img/icons/marker.svg"}, windowText:"Campus Center",  showWindow:true, coords: {latitude:$scope.university.latitude, longitude:$scope.university.longitude}, control: {}};


        $scope.map.events.dragend = function(maps, event_name, drag_options) {
          $scope.map.centerMarker.coords = {latitude: maps.center.G, longitude:maps.center.K};
          GUtilService.getNearestLocationOneMarker($scope.map.control.getGMap(), maps.center.G, maps.center.K, $scope);
          $scope.map.centerMarker.showWindow = true;
        }

        $scope.map.events.dragstart = function(maps, event_name, drag_options) {
          $scope.map.centerMarker.showWindow = false;
        }
      }

      uiGmapGoogleMapApi.then(function(maps) {
        maps.visualRefresh = true;
        $timeout(function() {
          GUtilService.getNearestLocationManyMarkers($scope.map.control.getGMap(), $scope.map.control.getGMap().center.G, $scope.map.control.getGMap().center.K, $scope);
        }, 2000)
        // $scope.$on('$ionicView.loaded', function() {

          // $scope.searchbox = initSearchboxGMap();

          // SearchboxService.initAutocomplete({lat:$scope.university.latitude, lng:$scope.university.longitude})

        // })


      });
    }


    $scope.root.vars.initRequestMap = initRequestMap;

    var initSearchboxGMap = function() {
      // var events = { places_changed: function (searchBox) { processSearchBoxResults(searchBox); } }

        var searchboxInstantiateDict = {
            template:'request.slide.two.input.html',
            // https://developers.google.com/places/supported_types
            options: { autocomplete:true, types: ['establishment'] },
            events: { place_changed: function (autocomplete) {

                         place = autocomplete.getPlace()
                          // if (place.address_components) {

                          //   newMarkers = [];
                          //   var bounds = new google.maps.LatLngBounds();

                          //   var marker = {
                          //     id:place.place_id,
                          //     place_id: place.place_id,
                          //     name: place.address_components[0].long_name,
                          //     latitude: place.geometry.location.lat(),
                          //     longitude: place.geometry.location.lng(),
                          //     options: {
                          //       visible:false
                          //     },
                          //     // templateurl:'window.tpl.html',
                          //     // templateparameter: place
                          //   };


                          // }

                  }
              }
          }

          return searchboxInstantiateDict;
        }

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

      $scope.scrollToSection = function(section_selector) {
        var amount = null;
        var successFunction = null;
        var pageParentContainer = '#university-splash';
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

        CTAService.initSingleCTA('#cta-box-academic', '#university-splash', showCTACallback("academic"));
        CTAService.initSingleCTA('#cta-box-baking', '#university-splash', showCTACallback("bakery"));
        CTAService.initSingleCTA('#cta-box-household', '#university-splash', showCTACallback("household"));
        CTAService.initSingleCTA('#cta-box-photography', '#university-splash', showCTACallback("photography"));
        CTAService.initSingleCTA('#cta-box-tech', '#university-splash', showCTACallback("tech"));

        CTAService.initSingleCTA('#cta-box-pricing', '#university-splash', initPricingCounters);
        CTAService.initSingleCTA('#cta-box-FAQ', '#university-splash');
        CTAService.initSingleCTA('#cta-box-apply', '#university-splash');
        CTAService.initSingleCTA('#cta-box-team', '#university-splash');
      }

      var runMobileOnlyFunctions = function() {

        !$scope.desktopMode && initiateAllPeels();
        !$scope.desktopMode && initMobileModals();

      }


      $scope.$on('$ionicView.enter', function() {

         shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader();

         $timeout(function() {
          calcAllMainSectionContainers();
          initProfileCTAS();
          initMobileSideBarTransitions();

          if (!$scope.typeWriterInitialized) {
            $scope.typeWriterInitialized = true;
            initUniversityTypeWriter();
          }



          if ($scope.university) {
              $timeout(function() {
                $scope.page.status.loaded = true;
              });

            $timeout(function() {
              $scope.page.status.showLoader = false;
            })
          }
          runMobileOnlyFunctions();

         }, 5000)


      });

    }


])