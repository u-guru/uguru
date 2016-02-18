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
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal, Category, ScrollService, SideMenuService, $stateParams, Utilities) {


    resolveStateParams()

    $scope.page = {scroll: {}, waypoints: {}, sidebar:{}, dropdowns: {}};
    $scope.page.dropdowns = {category: {show: true, active:false, toggle:toggleCategoryDropdown}, university: {show: true, active: false, toggle: toggleUniversityDropdown}};
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
      var doesSwiperExist = document.querySelector('.header-swiper-back-2') && document.querySelector('.header-swiper-back-2').swiper;
      if (doesSwiperExist) {
        return;
      }
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
      // var swiperNestedGalleryOptions = {
      //   slidesPerView:1,
      //   spaceBetween:10,
      //   nested:true,
      //   resistanceRatio:0,
      //   preloadImages:false,
      //   lazyLoading:true
      // }

      // var swiperNestedGallery = new Swiper('.swiper-gallery-top', swiperNestedGalleryOptions);

      // //start swiper gallaery
      // var swiperNestedThumbsGalleryOptions = {
      //   slidesPerView:5,
      //   spaceBetween:10,
      //   centeredSlides:true,
      //   touchRatio:0.2,
      //   slideToClickedSlide:true,
      //   nested:true,
      //   resistanceRatio:0
      // }
      // var swiperNestedThumbsGallery = new Swiper('.swiper-gallery-thumbs', swiperNestedThumbsGalleryOptions);

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
            if ($stateParams.category) {
              $scope.selectedCategory = $stateParams.category;
            }
        }
      $scope.getCategories(saveCategoriesToRootScope);
    })



    $scope.refreshState = function(category) {
      var bodyLoadingDiv = document.querySelector('#body-loading-div')
      bodyLoadingDiv.className ='hide';
      document.querySelector('#splash-home').classList.add('clear');
      $timeout(function() {
        $state.go($state.current.name, {categoryId:category.id, category:category}, {
            reload: true,
            inherit: false,
            notify: true
        });
      }, 1500);
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
        // $scope.scrollToSection('#splash-projector');
        $scope.page.sidebar = SideMenuService.initHomeSideMenu($scope);
      })
    }

    function resolveStateParams() {
      if ($stateParams && $stateParams.category && $stateParams.category.id) {
        $scope.root.loader.body.hide = true;
        Utilities.compileToAngular('body-loading-div', $scope);
        $scope.selectedCategory = $stateParams.category;
      } else {
        $scope.selectedCategory = ($scope.categories && $scope.categories[0]) || {name: 'Academic', hex_color: 'academic', id:5};
        Utilities.compileToAngular('body-loading-div', $scope);
        $scope.root.loader.body.hide = true;
      }
    }

    function toggleCategoryDropdown() {
      $scope.page.dropdowns.university.active = false;
      $scope.page.dropdowns.category.active = !$scope.page.dropdowns.category.active;
    }

    function toggleUniversityDropdown() {
      $scope.page.dropdowns.university.active = !$scope.page.dropdowns.university.active;
      $scope.page.dropdowns.category.active = false;
    }


  }
])


