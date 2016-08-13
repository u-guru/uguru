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

      //enter == default
      $scope.page.animations = {hiw:{}, bg:{}, profiles: {}, categories:{}, university: {}, main: {}, waypoints: {triggers:{}, parentRef:"home-splash"}};
      var navHeight = 70;
      var sectionSneakHeight = 36;
      $scope.mapCenter = {latitude: 42.5, longitude: -100};
      $scope.page.heights = {
        nav: navHeight,
        sectionSneak: sectionSneakHeight
      }

      $scope.topHomeSlider = {index: 0};
      $timeout(function() {
        $scope.$apply();
      })
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
      $scope.page.waypoints = {};

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

      //keys are IDs of the elements you want to activate based on horizontal scroll
      var scrollOffset = navHeight + sectionSneakHeight - 2;
      var scrollOffset = navHeight + sectionSneakHeight - 2;
      var animateOptions = ['enterUp', 'enterDown', 'firstEnterDown', 'exitUp', 'exitDown'];
      $scope.page.animations.waypoints.triggers = {
          main: {id:"splash-home", func:null},
          university: {id:"splash-university", func:scrollUniversityCallback, offset:scrollOffset}, //precursor-section-height + navbar.height
          hiw: {
              id:"splash-browse",
              firstEnterDown: {
                  onStart:scrollHowitWorksCallback,
                  offset:scrollOffset
              },
              exitUp: {
                  offset:"50%",
                  activated: false
              }
            },
          bg: {id:"become-guru", func:scrollBecomeGuruCallback, offset:scrollOffset}
      }
      // @gabrielle just worry about this
      // next steps
      // setup the top section

    //   $scope.page.animations.hiw = {
    //     viewed: false,
    //     beforeScroll: null,
    //     firstViewed: {
    //       css_classes: ['fadeIn', 'bounceInDown', 'bounceInRight', 'bounceInLeft', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'animate:keep', 'animate:keep', 'animate:keep', 'animate:keep', 'animate:keep', 'fadeIn'],
    //       selectors: [
    //           '.how-it-works-header',
    //           '.hiw-postit-li:nth-child(2)', '.hiw-postit-li:nth-child(6)', '.hiw-postit-li:nth-child(4)',
    //           '.hiw-postit-li:nth-child(1)', '.hiw-postit-li:nth-child(3)', '.hiw-postit-li:nth-child(5)',
    //           '.hiw-postit-li:nth-child(2) .tape:nth-child(1)',
    //           '.hiw-postit-li:nth-child(2) .tape:nth-child(2)',
    //           '.hiw-postit-li:nth-child(3) .tape:nth-child(2)',
    //           '.hiw-postit-li:nth-child(4) .tape:nth-child(1)',
    //           '.hiw-postit-li:nth-child(4) .tape:nth-child(2)',
    //           '.how-it-works-button'
    //       ],
    //       delays: [
    //           400,
    //           500, 600, 700, 800, 900, 1000,
    //           2000, 2000, 2000, 2000, 2000,
    //           2500
    //       ],
    //     },
    //     secondViewed: {
    //       css_classes: ['fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn'],
    //       selectors: ['.how-it-works-header', '.hiw-postit-li:nth-child(2)', '.hiw-postit-li:nth-child(6)', '.hiw-postit-li:nth-child(4)', '.hiw-postit-li:nth-child(1)', '.hiw-postit-li:nth-child(3)', '.hiw-postit-li:nth-child(5)', 'how-it-works-button'],
    //       delays: [400, 500, 600, 700, 800, 900, 1000, 1500],
    //     },
    //     onExit: {
    //       css_classes: ['fadeOut', 'hinge', 'hinge-right', 'hinge-right', 'hinge-right', 'hinge', 'hinge', 'fadeOut'],
    //       selectors: ['.how-it-works-header', '.hiw-postit-li:nth-child(2)', '.hiw-postit-li:nth-child(6)', '.hiw-postit-li:nth-child(4)', '.hiw-postit-li:nth-child(1)', '.hiw-postit-li:nth-child(3)', '.hiw-postit-li:nth-child(5)', '.how-it-works-button'],
    //       delays: [400, 500, 600, 700, 800, 900, 1000, 1500],
    //     },
    //     onScrollStart: null, //coming soon, not first time
    //     onScrollEnd: null, // coming soon, not first time
    //   }

    // $scope.page.animations.categories = {
    //   viewed: false,
    //   beforeScroll: null,
    //   firstViewed: {
    //     css_classes: [
    //       'fadeIn', 'fadeIn',
    //       'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp',
    //       'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn',
    //       'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
    //       'bounceInUp'
    //     ],
    //     selectors: [
    //       '.splash-categories-header',
    //       '.splash-categories-subheader',
    //       '.category-card-list li:nth-child(1)',
    //       '.category-card-list li:nth-child(2)',
    //       '.category-card-list li:nth-child(3)',
    //       '.category-card-list li:nth-child(4)',
    //       '.category-card-list li:nth-child(5)',
    //       '.category-card-list li:nth-child(6)',
    //       '.category-card-list li:nth-child(1) .card-icon',
    //       '.category-card-list li:nth-child(2) .card-icon',
    //       '.category-card-list li:nth-child(3) .card-icon',
    //       '.category-card-list li:nth-child(4) .card-icon',
    //       '.category-card-list li:nth-child(5) .card-icon',
    //       '.category-card-list li:nth-child(6) .card-icon',
    //       '.category-card-list li:nth-child(1) .card-label',
    //       '.category-card-list li:nth-child(2) .card-label',
    //       '.category-card-list li:nth-child(3) .card-label',
    //       '.category-card-list li:nth-child(4) .card-label',
    //       '.category-card-list li:nth-child(5) .card-label',
    //       '.category-card-list li:nth-child(6) .card-label',
    //       '.card-button'
    //     ],
    //     delays: [
    //       400, 550,
    //       400, 550, 700, 950, 1100, 1250,
    //       1400, 1550, 1700, 1950, 2100, 2250,
    //       1400, 1550, 1700, 1950, 2100, 2250,
    //       3250
    //     ]
    //   },
    //   secondViewed: {
    //     css_classes: [
    //       'fadeIn', 'fadeIn',
    //       'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp',
    //       'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn',
    //       'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
    //       'bounceInUp'
    //     ],
    //     selectors: [
    //       '.splash-categories-header',
    //       '.splash-categories-subheader',
    //       '.category-card-list li:nth-child(1)',
    //       '.category-card-list li:nth-child(2)',
    //       '.category-card-list li:nth-child(3)',
    //       '.category-card-list li:nth-child(4)',
    //       '.category-card-list li:nth-child(5)',
    //       '.category-card-list li:nth-child(6)',
    //       '.category-card-list li:nth-child(1) .card-icon',
    //       '.category-card-list li:nth-child(2) .card-icon',
    //       '.category-card-list li:nth-child(3) .card-icon',
    //       '.category-card-list li:nth-child(4) .card-icon',
    //       '.category-card-list li:nth-child(5) .card-icon',
    //       '.category-card-list li:nth-child(6) .card-icon',
    //       '.category-card-list li:nth-child(1) .card-label',
    //       '.category-card-list li:nth-child(2) .card-label',
    //       '.category-card-list li:nth-child(3) .card-label',
    //       '.category-card-list li:nth-child(4) .card-label',
    //       '.category-card-list li:nth-child(5) .card-label',
    //       '.category-card-list li:nth-child(6) .card-label',
    //       '.card-button'
    //     ],
    //     delays: [
    //       400, 550,
    //       400, 550, 700, 950, 1100, 1250,
    //       1400, 1550, 1700, 1950, 2100, 2250,
    //       1400, 1550, 1700, 1950, 2100, 2250,
    //       3250
    //     ]
    //   },
    //   onExit: {
    //     css_classes: [
    //       'fadeOut', 'fadeOut',
    //       'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown',
    //       'bounceOutDown'
    //     ],
    //     selectors: [
    //       '.splash-categories-header',
    //       '.splash-categories-subheader',
    //       '.category-card-list li:nth-child(1)',
    //       '.category-card-list li:nth-child(2)',
    //       '.category-card-list li:nth-child(3)',
    //       '.category-card-list li:nth-child(4)',
    //       '.category-card-list li:nth-child(5)',
    //       '.category-card-list li:nth-child(6)',
    //       '.card-button'
    //     ],
    //     delays: [
    //       400, 550,
    //       400, 550, 700, 950, 1100, 1250,
    //       2250
    //     ]
    //   }
    // }

    $scope.page.animations.profiles = {
      viewed: false,
      beforeScroll: null,
      firstViewed: {
        css_classes: [
          // headers
          'fadeIn', 'fadeIn',
          // card
          'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp',
          // ribbon
          'slideInRight', 'slideInRight', 'slideInRight', 'slideInRight', 'slideInRight',
          // icon
          'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn',
          // name
          'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
          // school
          'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
          // reviews
          'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
          // verified
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          // ratings
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn'
        ],
        selectors: [
          // headers
          '.splash-gurus-header', '.splash-gurus-subheader',
          // card
          '.pf-card-li:nth-child(1)', '.pf-card-li:nth-child(2)', '.pf-card-li:nth-child(3)', '.pf-card-li:nth-child(4)', '.pf-card-li:nth-child(5)',
          // ribbon
          '.pf-card-li:nth-child(1) .pf-card-ribbon', '.pf-card-li:nth-child(2) .pf-card-ribbon', '.pf-card-li:nth-child(3) .pf-card-ribbon', '.pf-card-li:nth-child(4) .pf-card-ribbon', '.pf-card-li:nth-child(5) .pf-card-ribbon',
          // icon
          '.pf-card-li:nth-child(1) .user-icon', '.pf-card-li:nth-child(2) .user-icon', '.pf-card-li:nth-child(3) .user-icon', '.pf-card-li:nth-child(4) .user-icon', '.pf-card-li:nth-child(5) .user-icon',
          // name
          '.pf-card-li:nth-child(1) .pf-card-name-span', '.pf-card-li:nth-child(2) .pf-card-name-span', '.pf-card-li:nth-child(3) .pf-card-name-span', '.pf-card-li:nth-child(4) .pf-card-name-span', '.pf-card-li:nth-child(5) .pf-card-name-span',
          // school
          '.pf-card-li:nth-child(1) .pf-school', '.pf-card-li:nth-child(2) .pf-school', '.pf-card-li:nth-child(3) .pf-school', '.pf-card-li:nth-child(4) .pf-school', '.pf-card-li:nth-child(5) .pf-school',
          // reviews
          '.pf-card-li:nth-child(1) .pf-review-amt', '.pf-card-li:nth-child(2) .pf-review-amt', '.pf-card-li:nth-child(3) .pf-review-amt', '.pf-card-li:nth-child(4) .pf-review-amt', '.pf-card-li:nth-child(5) .pf-review-amt',
          // verified
          '.pf-card-li:nth-child(1) .pf-card-verified', '.pf-card-li:nth-child(2) .pf-card-verified', '.pf-card-li:nth-child(3) .pf-card-verified', '.pf-card-li:nth-child(4) .pf-card-verified', '.pf-card-li:nth-child(5) .pf-card-verified',
          // ratings
          '.pf-card-li:nth-child(1) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(5)',
          '.pf-card-li:nth-child(2) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(5)',
          '.pf-card-li:nth-child(3) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(5)',
          '.pf-card-li:nth-child(4) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(5)',
          '.pf-card-li:nth-child(5) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(5)'
        ],
        delays: [
          // headers
          400, 550,
          // card
          400, 550, 700, 950, 1100,
          // ribbon
          1200, 1350, 1500, 1750, 1900,
          // icon
          1000, 1150, 1300, 1550, 1700,
          // name
          1200, 1350, 1500, 1750, 1900,
          // school
          1200, 1350, 1500, 1750, 1900,
          // reviews
          1200, 1350, 1500, 1750, 1900,
          // verified
          1250, 1400, 1550, 1800, 1950,
          // ratings
          1200, 1350, 1500, 1750, 1900,
          1350, 1500, 1750, 1900, 2050,
          1500, 1750, 1900, 2050, 2200,
          1750, 1900, 2050, 2200, 2350,
          1900, 2050, 2200, 2350, 2500
        ]
      },
      secondViewed: {
        css_classes: [
          // headers
          'fadeIn', 'fadeIn',
          // card
          'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp', 'bounceInUp',
          // ribbon
          'slideInRight', 'slideInRight', 'slideInRight', 'slideInRight', 'slideInRight',
          // icon
          'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn', 'rotateIn',
          // name
          'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
          // school
          'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
          // reviews
          'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp', 'slideInUp',
          // verified
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          // ratings
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn',
          'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn', 'bounceIn'
        ],
        selectors: [
          // headers
          '.splash-gurus-header', '.splash-gurus-subheader',
          // card
          '.pf-card-li:nth-child(1)', '.pf-card-li:nth-child(2)', '.pf-card-li:nth-child(3)', '.pf-card-li:nth-child(4)', '.pf-card-li:nth-child(5)',
          // ribbon
          '.pf-card-li:nth-child(1) .pf-card-ribbon', '.pf-card-li:nth-child(2) .pf-card-ribbon', '.pf-card-li:nth-child(3) .pf-card-ribbon', '.pf-card-li:nth-child(4) .pf-card-ribbon', '.pf-card-li:nth-child(5) .pf-card-ribbon',
          // icon
          '.pf-card-li:nth-child(1) .user-icon', '.pf-card-li:nth-child(2) .user-icon', '.pf-card-li:nth-child(3) .user-icon', '.pf-card-li:nth-child(4) .user-icon', '.pf-card-li:nth-child(5) .user-icon',
          // name
          '.pf-card-li:nth-child(1) .pf-card-name-span', '.pf-card-li:nth-child(2) .pf-card-name-span', '.pf-card-li:nth-child(3) .pf-card-name-span', '.pf-card-li:nth-child(4) .pf-card-name-span', '.pf-card-li:nth-child(5) .pf-card-name-span',
          // school
          '.pf-card-li:nth-child(1) .pf-school', '.pf-card-li:nth-child(2) .pf-school', '.pf-card-li:nth-child(3) .pf-school', '.pf-card-li:nth-child(4) .pf-school', '.pf-card-li:nth-child(5) .pf-school',
          // reviews
          '.pf-card-li:nth-child(1) .pf-review-amt', '.pf-card-li:nth-child(2) .pf-review-amt', '.pf-card-li:nth-child(3) .pf-review-amt', '.pf-card-li:nth-child(4) .pf-review-amt', '.pf-card-li:nth-child(5) .pf-review-amt',
          // verified
          '.pf-card-li:nth-child(1) .pf-card-verified', '.pf-card-li:nth-child(2) .pf-card-verified', '.pf-card-li:nth-child(3) .pf-card-verified', '.pf-card-li:nth-child(4) .pf-card-verified', '.pf-card-li:nth-child(5) .pf-card-verified',
          // ratings
          '.pf-card-li:nth-child(1) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(1) .pf-rating li:nth-child(5)',
          '.pf-card-li:nth-child(2) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(2) .pf-rating li:nth-child(5)',
          '.pf-card-li:nth-child(3) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(3) .pf-rating li:nth-child(5)',
          '.pf-card-li:nth-child(4) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(4) .pf-rating li:nth-child(5)',
          '.pf-card-li:nth-child(5) .pf-rating li:nth-child(1)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(2)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(3)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(4)', '.pf-card-li:nth-child(5) .pf-rating li:nth-child(5)'
        ],
        delays: [
          // headers
          400, 550,
          // card
          400, 550, 700, 950, 1100,
          // ribbon
          1200, 1350, 1500, 1750, 1900,
          // icon
          1000, 1150, 1300, 1550, 1700,
          // name
          1200, 1350, 1500, 1750, 1900,
          // school
          1200, 1350, 1500, 1750, 1900,
          // reviews
          1200, 1350, 1500, 1750, 1900,
          // verified
          1250, 1400, 1550, 1800, 1950,
          // ratings
          1200, 1350, 1500, 1750, 1900,
          1350, 1500, 1750, 1900, 2050,
          1500, 1750, 1900, 2050, 2200,
          1750, 1900, 2050, 2200, 2350,
          1900, 2050, 2200, 2350, 2500
        ]
      },
      onExit: {
        css_classes: [
          // headers
          'fadeOut', 'fadeOut',
          // card
          'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown', 'bounceOutDown'
        ],
        selectors: [
          // headers
          '.splash-gurus-header', '.splash-gurus-subheader',
          // card
          '.pf-card-li:nth-child(1)', '.pf-card-li:nth-child(2)', '.pf-card-li:nth-child(3)', '.pf-card-li:nth-child(4)', '.pf-card-li:nth-child(5)'
        ],
        delays: [
          // headers
          400, 550,
          // card
          400, 550, 700, 950, 1100
        ]
      }
    }

    $scope.page.animations.bg = {
      viewed: false,
      beforeScroll: null,
      firstViewed: {
        css_classes: ['fadeIn', 'bounceInRight', 'bounceInRight', 'bounceInLeft', 'bounceInLeft', 'bounceInUp', 'bounceInUp', 'animate:keep', 'animate:keep', 'animate:keep', 'animate:keep', 'animate:keep', 'fadeIn'],
        selectors: ['.become-guru-header', '.bg-postit-li:nth-child(2)', '.bg-postit-li:nth-child(6)', '.bg-postit-li:nth-child(4)', '.bg-postit-li:nth-child(1)', '.bg-postit-li:nth-child(3)', '.bg-postit-li:nth-child(5)', '.bg-postit-li:nth-child(1) .tape:nth-child(2)', '.bg-postit-li:nth-child(2) .tape:nth-child(1)', '.bg-postit-li:nth-child(2) .tape:nth-child(2)', '.bg-postit-li:nth-child(6) .tape:nth-child(1)', '.bg-postit-li:nth-child(6) .tape:nth-child(2)', '.become-guru-button'],
        delays: [400, 500, 600, 700, 800, 900, 1000, 2000, 2000, 2000, 2000, 2000, 2500],
      },
      secondViewed: {
        css_classes: ['fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn', 'fadeIn'],
        selectors: ['.become-guru-header', '.bg-postit-li:nth-child(2)', '.bg-postit-li:nth-child(6)', '.bg-postit-li:nth-child(4)', '.bg-postit-li:nth-child(1)', '.bg-postit-li:nth-child(3)', '.bg-postit-li:nth-child(5)', '.become-guru-button'],
        delays: [400, 500, 600, 700, 800, 900, 1000, 1500],
      },
      onExit: {
        css_classes: ['fadeOut', 'hinge-right', 'hinge', 'hinge', 'hinge-right', 'hinge-right', 'hinge', 'fadeOut'],
        selectors: ['.become-guru-header', '.bg-postit-li:nth-child(2)', '.bg-postit-li:nth-child(6)', '.bg-postit-li:nth-child(4)', '.bg-postit-li:nth-child(1)', '.bg-postit-li:nth-child(3)', '.bg-postit-li:nth-child(5)', '.become-guru-button'],
        delays: [400, 500, 600, 700, 800, 900, 1000, 1500],
      }

    }


      var initializePageAnimations = function() {
          AnimationService.initializeSectionComponents($scope.page.animations.hiw.firstViewed, $scope.page.animations.hiw.firstViewed.selectors, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.bg.firstViewed, $scope.page.animations.bg.firstViewed.selectors, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);

          $timeout(function() {
            AnimationService.initializeSectionComponents($scope.page.animations.categories.firstViewed, $scope.page.animations.categories.firstViewed.selectors, $scope.page.animations.categories.firstViewed.css_classes, $scope.page.animations.categories.firstViewed.delays);
            AnimationService.initializeSectionComponents($scope.page.animations.profiles.firstViewed, $scope.page.animations.profiles.firstViewed.selectors, $scope.page.animations.profiles.firstViewed.css_classes, $scope.page.animations.profiles.firstViewed.delays);
            AnimationService.initializeSectionComponents($scope.page.animations.hiw.secondViewed, $scope.page.animations.hiw.firstViewed.selectors, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.bg.secondViewed, $scope.page.animations.bg.firstViewed.selectors, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.categories.secondViewed, $scope.page.animations.categories.firstViewed.selectors, $scope.page.animations.categories.firstViewed.css_classes, $scope.page.animations.categories.firstViewed.delays);
          AnimationService.initializeSectionComponents($scope.page.animations.profiles.secondViewed, $scope.page.animations.profiles.firstViewed.selectors, $scope.page.animations.profiles.firstViewed.css_classes, $scope.page.animations.profiles.firstViewed.delays);
          }, 2500)

      }


      var getHiwAnimationElements = function(selector_arr) {
        $scope.page.animations.hiw.state = 1;
      }

      //Scope var declarations
      var onSectionOneLoad = function() {

          // $scope.root.loader.body.hide = true;
          $scope.page.scroll.section_index = 0;
          $timeout(function() {
            $scope.homePageScroll = ScrollService.initIScroll('#iscroll-wrapper', {snap: 'section'});
          }, 5000)

          initSlideBoxRemote();
          Waypoint.refreshAll();
          $timeout(function() {
            initTypeWritersTopSection();
          }, 500)


          var ionSlideOne = document.querySelector('.splash-scene ion-slide');
          $timeout(function() {
            $scope.$apply();
          })

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

      function initSlideBoxRemote() {
        $scope.topHomeSlider = {
          next: function() {
            $ionicSlideBoxDelegate.$getByHandle('splash-hero-home').next()
          },
          previous: function() {
            $ionicSlideBoxDelegate.$getByHandle('splash-hero-home').previous()
          },
          toggleRemote: function() {
            if ($scope.topHomeSlider.paused) {
              $scope.topHomeSlider.play();
            } else {
              $scope.topHomeSlider.pause();
            }
          },
          pause: function() {
            $scope.topHomeSlider.paused =true;
            $ionicSlideBoxDelegate.$getByHandle('splash-hero-home').stop();
          },
          onChange: function($index) {
            var ionSlides = document.querySelectorAll('.splash-scene ion-slide');
            //remove all
            $scope.topHomeSlider.index = $index;
            for (var i = 0; i < ionSlides.length; i++) {
              var indexSlide = ionSlides[i];
              indexSlide.classList.remove('show-slide-' + i);
            }
            ionSlides[$index].classList.add('show-slide-' + $index);
          },
          play: function() {
            $scope.topHomeSlider.paused = false;
            $ionicSlideBoxDelegate.$getByHandle('splash-hero-home').start();
          },
          index: 0,
          paused: false
        }
      }


      $scope.switchToTabIndex = function(index) {

        var activeSubheaderContainer = document.querySelector('.hiw-subheader-nav-content.active')
        activeSubheaderContainer.classList.add('transitioning');



        $timeout(function() {
          activeSubheaderContainer.classList.remove('transitioning');
          $scope.activeBrowseTabIndex = index;
        }, parseInt(activeSubheaderContainer.getAttribute('anim-on-hide-debounce') || 0))

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

      function initTypeWritersTopSection() {
        var typeWriterElems = document.querySelectorAll('.home-splash-typewriter');
        if (typeWriterElems.length) {
          for (var i = 0; i < typeWriterElems.length; i++) {
            var indexTypeWriter = typeWriterElems[i];
            indexTypeWriter.id = 'typed-writer-' + i;
            var dataOptions = indexTypeWriter.getAttribute("typed-options").split(", ");
            TypedService.initTypedTicker(indexTypeWriter.id, dataOptions);
          }
        }
      }


      function scrollUniversityCallback(direction, element, scrollTop) {
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

      function scrollHowitWorksCallback(direction, element, scrollTop) {
          if (direction === 'down') {
            $scope.page.scroll.section_index = 2;
            AnimationService.animateIn(splashHiwNav, "bounceInDown");

            if (!$scope.page.animations.hiw.viewed) {
              $scope.page.animations.hiw.viewed = true;
              AnimationService.activateSectionAnimations($scope.page.animations.hiw.firstViewed.elements, $scope.page.animations.hiw.firstViewed.css_classes, $scope.page.animations.hiw.firstViewed.delays);
            } else {
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
    function scrollBecomeGuruCallback(direction, element, scrollTop) {
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
          AnimationService.activateSectionAnimations($scope.page.animations.bg.firstViewed.elements, $scope.page.animations.bg.firstViewed.css_classes, $scope.page.animations.bg.firstViewed.delays);
        } else {
          AnimationService.activateSectionAnimations($scope.page.animations.bg.secondViewed.elements, $scope.page.animations.bg.secondViewed.css_classes, $scope.page.animations.bg.secondViewed.delays);
        }

      } else {
        $scope.page.scroll.section_index = 1;
      }
      // $scope.page.header.showOnScrollNav = 'bg-charcoal'
      //@GABRIELLE-NOTE -- add more, feel free to discuss what other things you want to add to make navbar transition feel more fluid
  }

      var wayPointDict = $scope.page.animations.waypoints.triggers;
      var wayPointDictKeys = Object.keys(wayPointDict);
      var elemIDtoWaypointDict = {};
      var returnWayPointFunction = function(sectionScope, animateOption) {
        return function(direction) {
          var upAnimations = ['exitUp', 'enterUp'];
          var downAnimations = ['enterDown', 'firstEnterDown', 'exitDown']

          var elemAnimateArg = animateOption;

          //if up animation
          if (upAnimations.indexOf(elemAnimateArg) > -1 && direction === 'up') {
            $scope.page.animations.waypoints.triggers[sectionScope][animateOption].activated = true;
            $scope.$apply();
          }
          else if (downAnimations.indexOf(elemAnimateArg) > -1 && direction === 'down') {
            $scope.page.animations.waypoints.triggers[sectionScope][animateOption].activated = true;
            $scope.$apply();
          }
        }
      }

      var processDomWaypoints = function() {
        var domWaypoints = document.querySelectorAll('[init-wp]');
        if (!domWaypoints) return;
        for (var i = 0; i < domWaypoints.length; i++) {
          var indexElem = domWaypoints[i];

          // get variable name
          var indexElemDeclaration = indexElem.getAttribute('init-wp') || '';
          if (!indexElemDeclaration) continue;

          var indexElemOffset = indexElem.getAttribute('wp-offset') || 0;
        }
      }

      $scope.$on('$ionicView.loaded', function() {
        processDomWaypoints();
      })

      var initHomePageWayPoint = function() {
        var parentRef = $scope.page.animations.waypoints.parentRef;

        for (var i = 0; i < wayPointDictKeys.length; i++) {
          var indexKey = wayPointDictKeys[i];
          if (wayPointDict[indexKey].id) {
            for (var j = 0; j < animateOptions.length; j++) {
              var indexOption = animateOptions[j];
              if (wayPointDict[indexKey][indexOption]) {
                var elemId = wayPointDict[indexKey].id;
                var elemOptions = {
                  func: returnWayPointFunction(wayPointDictKeys[i], animateOptions[j]),
                  offset: wayPointDict[indexKey][indexOption].offset
                }
                ScrollService.initWaypoint(elemId, parentRef, elemOptions);
              }
            }
          }
        }

        // ScrollService.initArrWaypoints(, "home-splash");

      }


      // $timeout(function() {
      //   var root = angular.element(document.getElementsByTagName('body'));

      //   var watchers = [];

      //   var f = function (element) {
      //       angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
      //           if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
      //               angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
      //                   watchers.push(watcher);
      //               });
      //           }
      //       });

      //       angular.forEach(element.children(), function (childElement) {
      //           f(angular.element(childElement));
      //       });
      //   };

      //   f(root);

      //   // Remove duplicate watchers
      //   var watchersWithoutDuplicates = [];
      //   angular.forEach(watchers, function(item) {
      //       if(watchersWithoutDuplicates.indexOf(item) < 0) {
      //            watchersWithoutDuplicates.push(item);
      //       }
      //   });
      // }, 10000);

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
          if (intercomContainer) {
            Intercom('hide');
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
        // if (!academicCTABoxElem) {
        //   setTimeout(function() {
        //     initProfileCTAS();
        //   }, 1000)
        //   return;
        // }


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
        $timeout(function() {
          initiateCounters();
      }, 500)
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
          // if (results.length >=3 )

          //6,4,3,2


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


      function hideAllClusters(selector) {
        $timeout(function() {
          var allClusterElems = document.querySelectorAll(selector) || [];
          for (var i = 0; i < allClusterElems.length; i++) {
            var indexCluster = allClusterElems[i];
            indexCluster.classList.add('opacity-0');
            indexCluster.setAttribute("anim-first-enter-down-child", "");
            indexCluster.setAttribute("anim-first-enter-down-class", "bounceInUp");
            indexCluster.setAttribute("anim-first-enter-down-delay", 1500 + (i * 50) + "");
            $compile(indexCluster)($scope);
          }
        }, 1000)
      }

      function setPulseClusters(selector) {
        $timeout(function() {
          var allClusterElems = document.querySelectorAll(selector) || [];
          for (var i = 0; i < allClusterElems.length; i++) {
            var indexCluster = allClusterElems[i];
            indexCluster.setAttribute("anim-first-enter-down-child", "");
            indexCluster.setAttribute("anim-first-enter-down-class", "pulse, pulse, pulse");
            $compile(indexCluster)($scope);
          }
        })
      }

      var initHomeMap = function() {
          $scope.page.load.sections.two.display = true;
          $scope.map = {
          center: $scope.mapCenter,
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
        return
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
          $compile(document.getElementById('university-info-window-button'))($scope);
          $compile(document.getElementById('university-info-window-close-button'))($scope);
        }, 1000)
      }



      var onMapRenderCompleteOnce = function(map) {
        if (!$scope.map.og_map) {
          $scope.mapHasRendered = true;
          $scope.map.og_map = map;
          $timeout(function() {
            $scope.page.load.complete = true;
          }, 2000);
          document.querySelector('#splash-university').classList.add('show-map');
        }
      }


      $scope.$on('$ionicView.beforeEnter', function() {

        if (!$scope.universities) {
            $scope.universities = University.getTargetted().slice();
            $scope.staticUniversityMaps = GUtilService.generateStaticMapUrls($scope.universities.slice(0, 4), staticMapOptions);
        }
        initHomeMap();

      })


      $scope.$on('$ionicView.enter', function() {
         $timeout(function() {
            shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader();
            // initUniversityTypeWriter();
            calculateAndInitiateCounters();

            !$scope.desktopMode && initMobileModals();
            $ionicSlideBoxDelegate.update();
          }, 5000)
      });


    }
])