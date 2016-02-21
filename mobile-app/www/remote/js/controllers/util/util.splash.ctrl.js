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
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, Category, ScrollService, SideMenuService,
    $stateParams, Utilities, GUtilService, GMapService, University, $compile,
    ContentService, LoadingService, ContentService) {

    if ($scope.root.loader.body.hide) {
      resolveStateParams();
    }

    $scope.map;
    $scope.page = {scroll: {}, waypoints: {}, sidebar:{}, dropdowns: {}, modals: {}, swipers: {}, map:{}};
    $scope.page.dropdowns = {closeAll: closeAllDropdowns, category: {show: true, active:false, toggle:toggleCategoryDropdown}, university: {show: true, active: false, toggle: toggleUniversityDropdown}};
    //@gabrielle note, scroll preferences

    $scope.page.scroll = {
      _length: 250,//scroll duration
      parentElem: "#home-splash",
      amount: null, //## only if you are particularly scrolling to a section
      successFunction: null,
      easeType: 'quad', //quad + quint as options
      offset: 0
    }

    var initSwipers = function(args, desktop_mode) {
      if ($scope.desktopMode) {
        args = null;
      }
      var doesSwiperExist = document.querySelector('.header-swiper-back-2') && document.querySelector('.header-swiper-back-2').swiper;
      if (doesSwiperExist) {
        return;
      }
      var swiperBack2=new Swiper('.header-swiper-back-2',{slidesPerView:'auto',centeredSlides:true,spaceBetween:100,onlyExternal:true,effect:'coverflow',direction:'vertical',speed:600,coverflow:{slideShadows:false}});
      var swiperBack1=new Swiper('.header-swiper-back-1',{slidesPerView:'auto',centeredSlides:true,spaceBetween:300,effect:'coverflow',speed:600,coverflow:{slideShadows:false}});
      var swiperMainOptions = {
        slidesPerView:'auto',
        centeredSlides:true,
        spaceBetween: 80,
        effect:'coverflow',
        speed:1500,
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
          swiperFront.slides[swiperFront.previousIndex].classList.add('clear');
          swiperFront.slides[swiperFront.previousIndex].classList.remove('opacity-1-impt');
          $timeout(function() {
            swiperFront.params.speed = 300;
          }, 500);
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
      var swiperFrontGalleryThumbs = new Swiper('.swiper-front-gallery-thumbs', swiperFrontGalleryThumbsOption);

      // swiperFrontGalleryThumbs.setWrapperTranslate(swiperFront.getWrapperTranslate());
      swiperFront.params.control = swiperFrontGalleryThumbs;
      swiperFrontGalleryThumbs.params.control = swiperFront;
      $scope.page.swipers.main = swiperFront;
      $scope.page.swipers.gallery = swiperFrontGalleryThumbs;

  }
    function onSlideChangeEndMainSwiper($timeout, $scope) {
      return function(swiper) {
        $timeout(function(){
          $scope.$apply(function() {
            swiper.params.speed = 1500;
            swiper.slides[swiper.activeIndex].classList.add('activate');
          })
        })
      }
    }

    function onSlideNextStart($timeout, $scope) {
      return function(swiper) {
        $timeout(function(){
          $scope.$apply(function() {
            swiper.slides[swiper.previousIndex].classList.add('clear');
          })
        })
      }
    }

    function onSlidePrevStart($timeout, $scope) {
      return function(swiper) {
        $timeout(function(){
          $scope.$apply(function() {
            swiper.slides[swiper.activeIndex + 1].classList.add('clear');
          })
        })
      }
    }

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



    $scope.refreshCategoryState = function(category, university) {
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

    function getSceneNumber() {
      var elem = document.querySelector('.splash-device-content .progress span')
      if (elem) {
        console.log('progress elem', elem, elem.className);
        if (elem.className.indexOf('animate') > -1) {
          return 2;
        }
      }
      return 1;
    }

    function clearAnimationArgs(args) {
      for (var i = 0; i < args.length; i++) {
        var argIndexInjectClass = args[i][0]
        var argIndexElem = document.querySelector(argIndexInjectClass);
        console.log(argIndexElem.style);
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
      var currentSceneNumber = getSceneNumber();
      $scope.selectedUniversity = university;
      GUtilService.generateStaticMapUrls([$scope.selectedUniversity], getStaticMapOptions());
      $scope.page.dropdowns.university.active = false;
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

    $scope.transitionToScene3 = function() {
      $scope.page.dropdowns.university.active = false;
      $scope.scrollToSection('#splash-projector');
    }

    $scope.selectUniversityFromMap = function(university) {
      $scope.selectedUniversity = true;
      $scope.refreshUniversityState(university);
      $scope.scrollToSection('#splash-home');
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

    $scope.onLoad = function() {
      // @gabrielle-note -- what
      // Default parameters
      resolveStateParams();
      University.initUniversitiesSplash($scope, getStaticMapOptions());

      var responsiveSwiperArgs = {
        desktop: {
          slidesPerView: 1,
          spaceBetween: 80
        },
        mobile: {
          // slidesPerView: 2, //defaults
          // spaceBetween: 0, //defaults
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

      initSwipers(responsiveSwiperArgs, $scope.desktopMode);
      $scope.universities = University.getTargetted().slice();
      $timeout(function() {
        // University.initUniversitiesSplash($scope);
        //autoscroll code
        // $scope.scrollToSection('#splash-projector');

        $timeout(function() {
          $scope.how_it_works = ContentService.generateUniversitySpecificHowItWorks($scope.university);
          $scope.become_guru = ContentService.generateUniversitySpecificBecomeGuruText($scope.university);
          initHomeMap();
        }, 1500);
        !$scope.desktopMode && SideMenuService.initHomeModals($scope);
        $scope.page.sidebar = SideMenuService.initHomeSideMenu($scope);
      })
    }

    function initializeDynamicSelectedUniversityMap(university) {
      university.map = {
        marker: generateSelectedUniversityMapMarkerObj(university),
        control: {},
        coords: {latitude: university.latitude, longitude: university.longitude},
        zoom: 17,
        pan: false,
        events: {tilesloaded: function(map) {

          var mapBounds = map.getBounds().getSouthWest();
          var mapCenter = map.getCenter();
          console.log('bottom left', mapBounds.lat(), mapBounds.lng());
          console.log('center', mapCenter.lat(), mapCenter.lng())
          var dx = mapBounds.lat() - mapCenter.lat();
          var dy = mapBounds.lng() - mapCenter.lng();
          var newMarkerLat = mapBounds.lat() - (dx/6);
          var newMarkerLng = mapBounds.lng() - (dy/6); //purposely dx so its a square
          university.map.marker.coords = {latitude: newMarkerLat, longitude: newMarkerLng};
        }},
      }
      function generateSelectedUniversityMapMarkerObj(university) {
        obj = university;
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
          coords: {
            latitude: university.latitude,
            longitude: university.longitude
          },
          id: university.id,
          control: {},
          options: {
            animation: google.maps.Animation.DROP
          },
          icon: {url: generateUniversityImgDataURI(universityObj), size: new google.maps.Size(60, 60), scaledSize: new google.maps.Size(60, 60)},
        }
      }
    }

    function resolveStateParams() {
      console.log('splashData', $stateParams.category.splashData);
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
        Utilities.compileToAngular('body-loading-div', $scope);
        $scope.root.loader.body.hide = true;
      }
      initializeDynamicSelectedUniversityMap($scope.selectedUniversity);
    }

    $scope.getUniversityPlaces = function(university) {
      console.log($scope.map.og_map);
      $timeout(function() {
        $scope.$apply(function() {
          GUtilService.getPlaceListByCoords($scope, $scope.map.og_map, {latitude: university.latitude, longitude: university.longitude});
        })
      })
      // $scope.map.center = {latitude: university.latitude, university.longitude};
    }

    function toggleCategoryDropdown() {
      $scope.page.dropdowns.university.active = false;
      $scope.page.dropdowns.category.active = !$scope.page.dropdowns.category.active;
    }

    function toggleUniversityDropdown() {
      $scope.page.dropdowns.university.active = !$scope.page.dropdowns.university.active;
      $scope.page.dropdowns.category.active = false;
    }

    // ***************
    // START MAP CODE
    // ***************
    // TODO: CLEANUP (EVERYTHING ABOVE IS CLEAN)

    //@gabrielle
    //read other options here https://developers.google.com/maps/documentation/static-maps/intro#MapTypes
    var staticMapOptions = {
      scale: 1, //up to 2, only whole values
      map_type: "roadmap", //hybrid, terrain, satellite, roadmap
      size: "1280x1280",
      zoom: 17
    }

    $scope.mapBounds = {
      desktop: {
        northeast: {latitude: 54, longitude:-61.50},
        southwest: {latitude:15, longitude: -125}
      },
      mobile: {
        northeast: {latitude: 20.70, longitude:-100.50},
        southwest: {latitude:48.85, longitude: -55.90}
      }
    }

    $scope.mapZoom = {
        initialMobile: 2,
        initialDesktop: 4,
        maxZoom: 9,
        minZoom: 1
      }
      var cluster = {
        style: {
          xl: {bg_color: '#d3242c', width:128, height:128, textSize: 18, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
          l: {bg_color: '#df433a', width:96, height:96, textSize: 16, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
          m: {bg_color: '#eb6248', width:84, height:84, textSize: 14, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
          s: {bg_color: '#E5753C', width:64, height:64, textSize: 12, anchorText:[0,0], anchorIcon: [0,0], textColor: "#FFFFFF", fontWeight: "600"},
        },
        minClusterSize: 4, //direct correlation
        zoomOnclick: true,
        maxZoom: 7,
        gridSize: 125, //direct correlation
        customClass: "university-svg-cluster",
        styleThreshold: [10,30,70,80] //direct correlation
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
      $scope.staticUniversityMaps = GUtilService.generateStaticMapUrls($scope.universities.slice(0, 4), staticMapOptions);
      // $scope.search_text = {university: "", matching: []};

      var calcZoom = function() {
        if ($scope.desktopMode) {
          return 3;
        } else {
          return 2;
        }
      }

      var mapDefaults = {
        zoom: calcZoom(),
        options: { streetViewControl:false, scrollwheel:false, panControl:false,  minZoom: $scope.mapZoom.minZoom, maxZoom: $scope.mapZoom.maxZoom, styles: styleOptions,
                   scrollwheel: false, mapTypeControl:false, style:styleOptions, draggable:true, disableDoubleClickZoom:false, zoomControl: true
                 }
      }

      var generateClusterImgDataURI = function(obj) {
          var baseSVGURL = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="' + obj.bg_color + '"></circle></svg>'
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
            return "<span>" + universityArr.length + "</span> <span> schools </span> <span>" + results[0][0] + "</span>"
          }
          if (results.length === 2) {
            return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + '</span>';
          }
          if (results.length === 3 && universityArr.length >= cluster.styleThreshold[0]) {
            return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + '</span>';
          }
          if (results.length === 4 && universityArr.length >= cluster.styleThreshold[1]) {
            return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + ", " + results[3][0] + '</span>';
          }
          if (results.length > 4 && universityArr.length >= cluster.styleThreshold[1]) {
            return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + ", " + results[2][0] + ", " + results[3][0] + ", " + results[4][0] + '</span>';
          }
          return "<span>" + universityArr.length + "</span> <span>schools</span> <span>" + results[0][0] + ", " + results[1][0] + '</span>';

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



        if (universityArr.length > cluster.styleThreshold[2]) {
          var indexNumber = 1
        } else if (universityArr.length > cluster.styleThreshold[1] && universityArr.length <= cluster.styleThreshold[2]) {
          var indexNumber = 2
        } else if (universityArr.length > cluster.styleThreshold[0] && universityArr.length <= cluster.styleThreshold[1]) {
          var indexNumber = 3
        } else {
          var indexNumber = 4
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
            minimumClusterSize:cluster.minClusterSize,
            calculator: clusterCalculator,
            styles:[
              {
                width:cluster.style.xl.width,
                height:cluster.style.xl.height,
                url: generateClusterImgDataURI({bg_color:cluster.style.xl.bg_color}),
                fontFamily: "Source Sans Pro",
                fontWeight: cluster.style.xl.fontWeight,
                textColor: cluster.style.xl.textColor,
                textSize: cluster.style.xl.textSize,
                anchorText: cluster.style.xl.anchorIcon
                // anchorIcon: "[0, 0]"
              },
              {
                width:cluster.style.l.width,
                height:cluster.style.l.height,
                url: generateClusterImgDataURI({bg_color:cluster.style.l.bg_color}),
                fontFamily: "Source Sans Pro",
                fontWeight: cluster.style.l.fontWeight,
                textColor: cluster.style.l.textColor,
                textSize: cluster.style.l.textSize,
                anchorText: cluster.style.l.anchorIcon
                // anchorText: "[0, 0]"
              },
              {
                width:cluster.style.m.width,
                height:cluster.style.m.height,
                url: generateClusterImgDataURI({bg_color:cluster.style.m.bg_color}),
                fontFamily: "Source Sans Pro",
                fontWeight: cluster.style.m.fontWeight,
                textColor: cluster.style.m.textColor,
                textSize: cluster.style.m.textSize,
                anchorText: cluster.style.m.anchorIcon
                // anchorText: "[0, 0]"
              },
              {
                width:cluster.style.s.width,
                height:cluster.style.s.height,
                url: generateClusterImgDataURI({bg_color:cluster.style.s.bg_color}),
                fontFamily: "Source Sans Pro",
                fontWeight: cluster.style.s.fontWeight,
                textColor: cluster.style.s.textColor,
                textSize: cluster.style.s.textSize,
                anchorText: cluster.style.s.anchorIcon
              },
            ],
            // title: "",
            zoomOnClick: cluster.zoomOnClick,
            maxZoom: cluster.maxZoom,
            gridSize: cluster.gridSize,
            clusterClass: cluster.customClass,
            // batchSize:
            averageCenter: true
        }
        return options_dict
      }

      function hasMapBeenShown() {
        var splashMap = document.querySelector('#splash-university.opacity-1-impt');
        return splashMap;
      }
      function hideAllClusters(selector) {
        $timeout(function() {
          var allClusterElems = document.querySelectorAll(selector) || [];
          for (var i = 0; i < allClusterElems.length; i++) {
              var indexCluster = allClusterElems[i];
              indexCluster.style.opacity = 0;
              if (!hasMapBeenShown()) {
                indexCluster.classList.add('opacity-0');
                indexCluster.setAttribute("class-on-activate", "bounceInUp:anim:keep");
                indexCluster.setAttribute("class-on-activate-delay", 1500 + (i * 50) + "");
              } else {
                indexCluster.classList.add('opacity-1', 'opacity-1-impt');
              }
              $compile(indexCluster)($scope);
          }
        }, 1000)
      }

      function setPulseClusters(selector) {
        $timeout(function() {
          var allClusterElems = document.querySelectorAll(selector) || [];
          for (var i = 0; i < allClusterElems.length; i++) {
            var indexCluster = allClusterElems[i];
            indexCluster.classList.add('animated', 'pulse');
          }
        })
      }

      var initHomeMap = function() {
          $scope.map = {
          center: {latitude: 42.5, longitude: -100},
          control: {},
          zoom:  $scope.mapZoom.initialDesktop,
          dragging: true, //true while map is dragging state, false otherwise
          refresh: false,
          options: mapDefaults.options,
          events: {tilesloaded: onMapRenderCompleteOnce},
          clusterOptions: initClusterObj(),
          clusterEvents: {mouseover: function(cluster){ setPulseClusters('.university-svg-cluster') }, clusteringend: function(cluster) {hideAllClusters('.university-svg-cluster')}},
          bounds: $scope.mapBounds, //Fit the map in the specified bounds. The expression must resolve to an object having both northeast and southwest properties. Each of those properties must have a latitude and a longitude properties.
          pan: true,
          bounds: $scope.mapBounds.desktop,
          markers: generateXMarkersFromUniversities(200, $scope.universities),
          rebuildMarkers: false,
          window: {coords:{}, show:false, university: {}, options:defaultWindowOptions, close:closeInfoWindow}
        }
        if (!$scope.desktopMode) {
          $scope.map.zoom = $scope.mapZoom.initialMobile
          $scope.map.bounds = $scope.mapBounds.mobile
        }
        console.log($scope.map);
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



      function onMapRenderCompleteOnce(map) {
        if (!$scope.map.og_map) {
          $scope.mapHasRendered = true;
          $scope.map.og_map = map;
          document.querySelector('#splash-university').classList.add('show-map');
        }
      }

      function closeAllDropdowns() {
        $scope.page.dropdowns.category.active = false;
        $scope.page.dropdowns.university.active = false;
      }

      if ($scope.selectedUniversity && $scope.selectedUniversity.id) {
        initializeDynamicSelectedUniversityMap($scope.selectedUniversity);
      }

      $timeout(function() {
        console.log('map' , $scope.selectedUniversity.map)
      }, 5000);

  }
])


