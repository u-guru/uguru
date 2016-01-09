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
  function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate,
    LoadingService, $timeout, ScrollService, uiGmapGoogleMapApi,
    SearchboxService, GMapService,GUtilService, ContentService){

      $scope.componentList = [
        {type: 'university', fields:['name', 'num_popular_courses', 'start date', 'city', 'state', 'longitude', 'latitude', 'days til start', 'num_courses' ,'school_color_one', 'school_color_two', 'banner_url', 'short_name', 'name', 'popular_courses']}
      ];
      var scrollDuration= 500;
      var shouldShowBecomeGuruHeader = false;
      $ionicSideMenuDelegate.canDragContent(false);
      $scope.highlighted_item;
      $scope.courses = [];
      $scope.activeTabIndex = 0;
      $scope.university = {}
      $scope.page = {dropdowns: {}, predictionMarkers:[], sidebar:{}, showAnimation:false}
      $scope.page.sidebar = {show:false};
      $scope.page.dropdowns = {hour: false, minutes: false, location_search:{predictions:[], input:'phil'}}

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
        $scope.page.sidebar.show=!$scope.page.sidebar.show;
        if ($scope.page.sidebar.show) {
          pageLinks = ['link 1', 'link 2', 'link 3', 'link 4'];
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

      var getPublicUniversityInformation = function() {

        var success = function(universityObj) {
          $scope.university = universityObj;
          $scope.root.vars.initRequestMap();
          if (!LOCAL) {
            $scope.page.universityStyleUrl = $scope.img_base + BASE + 'templates/one.university.style.html';
          } else {
            $scope.page.universityStyleUrl = $scope.img_base + 'templates/one.university.style.html';
          }
          $timeout(function() {
            $scope.$apply();
          })

          console.log('universityObj', universityObj)
        }

        var failure = function(err) {
          console.log(err);
        }

        Restangular.one('universities', university_id).customGET().then(success, failure)

      }

    var initRequestMap = function() {
      console.log($scope.university)
      if ($scope.university) {
        $scope.map = GMapService.initMapObj($scope.university, {zoom:15, disableDoubleClickZoom:true, draggable:false});
        $scope.map.centerMarker = {windowText:"Campus Center",  showWindow:false, coords: {latitude:$scope.university.latitude, longitude:$scope.university.longitude}};
        $scope.map.events.dragend = function(maps, event_name, drag_options) {
          $scope.map.centerMarker.coords = {latitude: maps.center.G, longitude:maps.center.K};
          GUtilService.getNearestLocation($scope.map.control.getGMap(), maps.center.G, maps.center.K, $scope);
          $scope.map.centerMarker.showWindow = true;
        }

        $scope.map.events.dragstart = function(maps, event_name, drag_options) {
          $scope.map.centerMarker.showWindow = false;
        }
      }


      uiGmapGoogleMapApi.then(function(maps) {
        maps.visualRefresh = true;

        // $scope.$on('$ionicView.loaded', function() {

          $scope.searchbox = initSearchboxGMap();

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
                         console.log(place)
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
          } else {
            console.log('already shown');
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

      getPublicUniversityInformation();


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


])