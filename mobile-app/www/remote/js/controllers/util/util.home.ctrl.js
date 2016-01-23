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
  function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate,
    LoadingService, $timeout, ScrollService, uiGmapGoogleMapApi,
    SearchboxService, GMapService,GUtilService, ContentService, CTAService, PeelService, TypedService,
    $localstorage, $ionicViewSwitcher, $ionicModal, AnimationService, University, CounterService, uiGmapIsReady) {

      $scope.componentList = [
        {type: 'university', fields:['name', 'num_popular_courses', 'start date', 'city', 'state', 'longitude', 'latitude', 'days til start', 'num_courses' ,'school_color_one', 'school_color_two', 'banner_url', 'short_name', 'name', 'popular_courses']}
      ];
      var scrollDuration= 500;
      var shouldShowBecomeGuruHeader = false;
      var shouldRenderMap = true;
      var mainPageContainer = document.querySelector('#home-splash')
      $ionicSideMenuDelegate.canDragContent(false);
      $scope.markerEvents = {};
      $scope.highlighted_item;
      $scope.courses = [];
      $scope.activeBrowseTabIndex = 1;
      $scope.activeTabIndex = 0;
      $scope.university = {}
      $scope.search_text = {university:''};
      $scope.rebuildAll = false;
      $scope.profile = {public_mode: true};
      $scope.page = {dropdowns: {}, css:{},predictionMarkers:[], sidebar:{}, showAnimation:false, offsets:{}, header: {}, peels:{}, status:{}, counters:{}};
      $scope.page.sidebar = {show:false};
      $scope.page.css = {bg_banner:$scope.img_base + "./img/main-bg-cambridge.jpg", main:{gradient_fill:"#40484B"}}
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
        $scope.root.vars.university = university;
        $localstorage.setObject('university', university);
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
          $scope.launchSupportOverlay();
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
          {name: "Support", ngClickFunc:triggerSupportBox}
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

    var onZoomChanged = function(map) {
      $timeout(function() {
        console.log($scope.map.zoom);
      }, 1000)
    }
    var lastValidCenter = new google.maps.LatLng(39.8282, -98.5795);
    var strictBounds = new google.maps.LatLngBounds(
       new google.maps.LatLng(28.70, -127.50),
       new google.maps.LatLng(48.85, -55.90)
     );
    var onCenterChanged = function(map) {
      console.log('center has changed');
      if (strictBounds.contains(map.getCenter())) {
        // still within valid bounds, so save the last valid position
        lastValidCenter = map.getCenter();
        return;
      }

      $scope.map.control.getGMap().panTo(lastValidCenter);

    }

    $scope.incrementZoom = function() {
      if ($scope.map.zoom === 5 || $scope.map.zoom === 6) {
        $scope.map.control.getGMap().setZoom($scope.map.zoom + 1);
      }
    }

    $scope.decrementZoom = function() {
      if ($scope.map.zoom === 6 || $scope.map.zoom === 7) {
        $scope.map.control.getGMap().setZoom($scope.map.zoom - 1);
      }
    }

    var createRandomMarker = function(i, bounds, university, idKey) {


      if (idKey == null) {
        idKey = "id";
      }
      var pictureLabel = document.createElement("img");
      var universityName = university.school_tiny_name;
      var svgImage = "data:image/svg+xml," +  encodeURIComponent("<svg viewBox='0 0 73 41' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M71.7272013,15.1343641 L63.071575,20.5 L72.2393802,25.9924931 L0,41 L1.42108547e-14,0 L71.7272013,15.1343641 L71.7272013,15.1343641 Z' id='flag' opacity='0.9' fill='" + university.school_color_dark +"'></path><path d='M0,0 L0,41 L6.261,39.7 L6.261,1.321 L0,0 Z' id='border' fill='" + university.school_color_light +"'></path><text font-family='Source Sans Pro' font-size='16' font-weight='600' line-spacing='16' fill='" + university.school_color_light +"'><tspan x='8' y='26'>" + universityName + "</tspan></text></svg>");
      pictureLabel.src = svgImage;
      var ret = {
        latitude: university.latitude,
        longitude: university.longitude,
        id: i,
        icon: getInvisibleIconPath(),
        options: {
          labelClass:'university-svg-icon',
          labelContent:"data:image/svg+xml,<svg viewBox='0 0 73 91' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M4.5,85.4013441 L4.5,5.59865586 C5.39670243,5.07993868 6,4.11042319 6,3 C6,1.34314575 4.65685425,0 3,0 C1.34314575,0 0,1.34314575 0,3 C0,4.11042319 0.60329757,5.07993868 1.49999916,5.59865293 L1.5,85.4013441 C0.60329757,85.9200613 0,86.8895768 0,88 C0,89.6568542 1.34314575,91 3,91 C4.65685425,91 6,89.6568542 6,88 C6,86.8895768 5.39670243,85.9200613 4.50000084,85.4013471 Z' id='Rectangle-1' fill='" + university.school_color_light + "'></path><path d='M63.071575,27.5 L72.2393802,32.9924931 L0,48 L1.42108547e-14,7 L71.7272013,22.1343641 L63.071575,27.5 Z' id='flag' opacity='0.9' fill='" + university.school_color_dark +"'></path><path d='M0,7 L0,48 L6.261,46.7 L6.261,8.321 L0,7 L0,7 Z' id='border' fill='#40484B'></path><text fill='#FFFFFF' font-family='Source Sans Pro' font-size='12.7286934' font-weight='bold'><tspan x='10' y='32' fill='#FFFFFF'>" + university.school_tiny_name + "</tspan></text></svg>"
        },
        showInfoWindow: function(gMarker, event_name, model) {
          console.log('show');
          $scope.infoWindow.university = model.university;
          $scope.infoWindow.coords = {latitude:model.university.latitude, longitude:model.university.longitude};
          $scope.infoWindow.visible = !$scope.infoWindow.visible;
        },
        university: university
      };
      ret[idKey] = i;
      return ret;
    };

    var initHomePageMap = function(lat, lng) {
      // @GABRIELLE-NOTE
      // full list of stylers here
      // https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleFeatureType
      // really awesome tool to play around
      // http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
      var styleOptions = [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            { hue: '#F1F1F1' },
            { saturation: -100 },
            { lightness: 60 },
            { visibility: 'on' }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels',
          stylers: [
            { visibility: 'off' }
          ]
        },
        // @GABRIELLE-NOTE, you can also do landscape.natural.terrain, or just landscape
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [
            {visibility: 'off'}
          ]
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [
            {visibility: 'off'}
          ]
        },
        {
          featureType: 'administrative.country',
          elementType: 'labels',
          stylers: [
            {visibility: 'off'}
          ]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels',
          stylers: [
            {visibility: 'off'}
          ]
        },

      ]
      var usBounds = {
         northEast: {latitude: 48.85, longitude: -55.90},
         southWest: {latitude: 28.70, longitude: -127.50}
      }
      var prepareMarkers = function() {
        var markers = [];
        for (var i = 0; i < $scope.universities.length; i++) {
          markers.push(createRandomMarker(i, {}, $scope.universities[i]))
        }
        return markers;
      }

      var resultDict = {
        center:  {latitude: lat, longitude: lng},
        zoom: 5,
        pan: false,
        markersEvents: {
          click: function(marker, eventName, model, arguments) {
                console.log('shit is clicked', model);
                $scope.map.window.coords = {latitude: model.university.latitude, longitude:model.university.longitude};
                $scope.map.window.university = model.university;
                $scope.map.window.model = model;
                $scope.map.window.show = true;
          }
        },
        markerControl: {},
        markers: prepareMarkers(),
        window: {
            marker: {},
            show: false,
            closeClick: function() {
                $scope.map.window.show = false;
                console.log($scope.map.control.gMap)
                console.log($scope.map.markerControl.getPlurals());
                $scope.map.markersEvents = {
                      click: function(marker, eventName, model, arguments) {
                            var elem = document.querySelector('.gm-style-iw');
                            children = elem.parentElement.childNodes;
                            for (var i = 0; i < children.length; i++) {
                                var indexChild = children[i];
                                if (indexChild !== elem) {
                                    indexChild.style.display = "none"
                                }
                            }
                            $scope.map.window.model = model;
                            $scope.map.window.show = true;
                      }
                }
                $timeout(function() {
                  $scope.map.window.show = true;
                }, 3000);
            },
            options: {} // define when map is ready
        },
        bounds: usBounds,
              control: {},
              options: {
                streetViewControl:false,
                scrollwheel:false,
                panControl:false,
                zoomControl:false,
                minZoom: 5,
                maxZoom: 7,
                styles: styleOptions,
                scrollwheel: false,
                mapTypeControl:false,
                style:styleOptions,
                draggable:true,
                disableDoubleClickZoom:false,
                zoomControl: false
              },
              bounds: {},
        };
      return resultDict
    }

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

    $scope.closeWindow = function() {

    }


    var createUniversityMarkerLabelImg = function(tiny_name, school_color_light, school_color_dark) {

        var pictureLabel = document.createElement("img");
        var universityName =tiny_name;


        if (school_color_light === '#757575')  {
          school_color_light = '#FFFFFF';
        }
        var svgImage = "data:image/svg+xml,<svg viewBox='0 0 73 41' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M71.7272013,15.1343641 L63.071575,20.5 L72.2393802,25.9924931 L0,41 L1.42108547e-14,0 L71.7272013,15.1343641 L71.7272013,15.1343641 Z' id='flag' opacity='0.9' fill='" + school_color_dark +"'></path><path d='M0,0 L0,41 L6.261,39.7 L6.261,1.321 L0,0 Z' id='border' fill='" + school_color_light +"'></path><text font-family='Source Sans Pro' font-size='16' font-weight='600' line-spacing='16' fill='" + school_color_light +"'><tspan x='8' y='26'>" + universityName + "</tspan></text></svg>"
        var pennantPaths = [];
        pictureLabel.src = convertSVGStringIntoDataUri(svgImage);
        return pictureLabel
    }
      // mouseover: function (gMarker, eventName, model) {
      //   lastMousedOverUniversity = model.university;
      //     // if user mouses over one while another is open

      //     if ($scope.window.show && $scope.window.university.id !== model.university.id) {
      //       //another window is already open
      //       $scope.delayedUniversity = model.university;
      //       $timeout(function() {
      //         if (mouseOverTimeout && lastMousedOverUniversity && lastMousedOverUniversity.university && lastMousedOverUniversity.university.id === $scope.delayedUniversity.id) {
      //           $scope.window.university = model.university;
      //           $scope.window.coords = {latitude:model.university.latitude, longitude: model.university.longitude};
      //         }
      //       }, defaultMouseoverTime)
      //       return;
      //     } else {
      //       $scope.window.university = model.university;
      //       $scope.window.coords = {latitude:model.university.latitude, longitude: model.university.longitude};
      //     }

      //     mouseOverTimeout = setTimeout(showWindow, defaultMouseoverTime);
      // },
      // mouseout: function (gMarker, eventName, model) {

      //     // if no window is shown + a timer is going..
      //     if (!$scope.window.show && mouseOverTimeout) {
      //         clearTimeout(mouseOverTimeout);
      //     }
      // },
    var centerOfUS = {latitude:39.8282, longitude:-98.5795}
    $scope.universityMarkers = [];
    $scope.map = initHomePageMap(centerOfUS.latitude, centerOfUS.longitude);
    $scope.infoWindow = {visible: false, coords:{latitude:null, longitude:null}, university:null};


    // $scope.window = {university: null, show:false, coords:null, closeWindow:closeMarkerWindow, showWindow: showMarkerWindow};
    $scope.onMarkerClick = function(marker, eventName, model) {
        model.show = !model.show;
        console.log('this was clicked');
    };



    var closeHomePageLoader = function() {


        bodyLoadingDiv.classList.add('hide');


        // document.body.removeChild(bodyLoadingDiv);
    }

    uiGmapIsReady.promise(1).then(function(instances) {
      // @GABRIELLE-NOTEThis staggers them, its a bit janky so its commented
      // $timeout(function() {
      //   placeAllMarkersOnMapInXMillSeconds(5000, $scope.universityMarkersPending);
      // }, 2500);
      $timeout(function() {
        console.log('ready to close loader');
        closeHomePageLoader();
      }, 1000);
    });
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

        CTAService.initSingleCTA('#cta-box-academic', '#home-splash', showCTACallback("academic"));
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

          if (!$scope.mainPageSetup) {
            $scope.mainPageSetup = true;
            shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader();
            calculateAndInitiateCounters();
            initUniversityTypeWriter();

              $timeout(function() {
                if (!$scope.mainPageSetup) {
                  initProfileCTAS();
                // calcAllMainSectionContainers();
                $scope.page.css = {bg_banner:$scope.img_base + "./img/main-bg-cambridge.jpg", main:{gradient_fill:"#40484B"}}
                // initUniversityMap();
                runMobileOnlyFunctions();
                }
              }, 5000)
          }

      });

      $scope.$on('$ionicView.enter', function() {
         if (!$scope.mainPageSetup) {
          $scope.mainPageSetup = true;
            shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader();
            initUniversityTypeWriter();
            calculateAndInitiateCounters();
             $timeout(function() {
              if (!$scope.mainPageSetup) {
              // calcAllMainSectionContainers();
                $scope.page.css = {bg_banner:$scope.img_base + "./img/main-bg-cambridge.jpg", main:{gradient_fill:"#40484B"}}
                // initUniversityMap();
                initProfileCTAS();
                runMobileOnlyFunctions();
              }

             }, 5000)
         }

      });

    }

])