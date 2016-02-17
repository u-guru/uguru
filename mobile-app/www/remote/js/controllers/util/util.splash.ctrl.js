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
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, Category, ScrollService) {
    $scope.selectedCategory = ($scope.categories && $scope.categories[0]) || {name: 'Academic', hex_color: 'academic'};

    $scope.page = {scroll: {}, waypoints: {}};
    //@gabrielle note, scroll preferences
    $scope.page.scroll = {
      _length: 250,//scroll duration
      parentElem: "#home-splash",
      amount: null, //## only if you are particularly scrolling to a section
      successFunction: null,
      easeType: 'quad', //quad + quint as options
      offset: 0
    }

    var initSwipers = function() {
      var swiperBack2=new Swiper('.header-swiper-back-2',{slidesPerView:'auto',centeredSlides:true,spaceBetween:100,onlyExternal:true,effect:'coverflow',direction:'vertical',speed:600,coverflow:{slideShadows:false}});
      var swiperBack1=new Swiper('.header-swiper-back-1',{slidesPerView:'auto',centeredSlides:true,spaceBetween:300,effect:'coverflow',speed:600,coverflow:{slideShadows:false}});
      var swiperMainOptions = {
        slidesPerView:'auto',
        centeredSlides:true,
        spaceBetween:100,
        effect:'coverflow',
        speed:600,
        coverflow:{slideShadows:false},
        // pagination:'.header-swiper-front .swiper-pagination',
        paginationClickable:true,
        nextButton:'.header-swiper-front .swiper-button-next',
        prevButton:'.header-swiper-front .swiper-button-prev',
        control:[swiperBack1,swiperBack2],
        controlBy:'container',
        keyboardControl:true,
        a11y:true,
        onSlideChangeStart: swiperOnSlideChangeStart
      }
      var swiperFront=new Swiper('.header-swiper-front', swiperMainOptions);

      //start swiper gallaery
      var swiperNestedGalleryOptions = {
        slidesPerView:1,
        spaceBetween:10,
        nested:true,
        resistanceRatio:0,
        preloadImages:false,
        lazyLoading:true
      }

      var swiperNestedGallery = new Swiper('.swiper-gallery-top', swiperNestedGalleryOptions);

      //start swiper gallaery
      var swiperNestedThumbsGalleryOptions = {
        slidesPerView:5,
        spaceBetween:10,
        centeredSlides:true,
        touchRatio:0.2,
        slideToClickedSlide:true,
        nested:true,
        resistanceRatio:0
      }
      var swiperNestedThumbsGallery = new Swiper('.swiper-gallery-thumbs', swiperNestedThumbsGalleryOptions);

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

      swiperFront.params.control = swiperFrontGalleryThumbs;
      swiperFrontGalleryThumbs.params.control = swiperFront;

      swiperNestedGallery.params.control=swiperNestedThumbsGallery;
      swiperNestedThumbsGallery.params.control=swiperNestedGallery
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
            $scope.selectedCategory = $scope.categories[0];
        }
      $scope.getCategories(saveCategoriesToRootScope);
    })

    $scope.setCategory = function(category) {
      $timeout(function(){
        $scope.$apply(function(){
          $scope.selectedCategory = category;
        });
      })
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

    $scope.testFunction = function() {
      // @gabrielle-note -- what
      initSwipers();
      $timeout(function() {
        $scope.scrollToSection('#splash-projector');
      })
    }


  }
])


