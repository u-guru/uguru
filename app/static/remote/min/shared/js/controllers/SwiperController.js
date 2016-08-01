angular.module('uguru.shared.controllers')
// angular.module('uguru.shared.controllers')
.controller('SwiperController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  function($scope, $state, $timeout) {
      var swiper = this;
      console.log('ay');
    //   var swiperBack2 = new Swiper('.header-swiper-back-2', {
    //     slidesPerView: 'auto',
    //     centeredSlides: true,
    //     spaceBetween: 100,
    //     onlyExternal: true,
    //     effect: 'coverflow',
    //     direction: 'vertical',
    //     speed: 600,
    //     coverflow: {
    //       slideShadows: false
    //     }
    //   });
    //   var swiperBack1 = new Swiper('.header-swiper-back-1', {
    //     slidesPerView: 'auto',
    //     centeredSlides: true,
    //     spaceBetween: 300,
    //     effect: 'coverflow',
    //     speed: 600,
    //     coverflow: {
    //       slideShadows: false
    //     }
    //   });
    //   var swiperFront = new Swiper('.header-swiper-front', {
    //     slidesPerView: 'auto',
    //     centeredSlides: true,
    //     spaceBetween: 100,
    //     effect: 'coverflow',
    //     speed: 600,
    //     coverflow: {
    //       slideShadows: false
    //     },
    //     pagination: '.header-swiper-front .swiper-pagination',
    //     paginationClickable: true,
    //     nextButton: '.header-swiper-front .swiper-button-next',
    //     prevButton: '.header-swiper-front .swiper-button-prev',
    //     control: [swiperBack1, swiperBack2],
    //     controlBy: 'container',
    //     keyboardControl: true,
    //     a11y: true,
    //     onSlideChangeStart: function(s) {
    //       if (s.activeIndex === $('.swiper-slide-gallery').index()) {
    //         $(s.container[0]).find('.swiper-pagination').hide();
    //       } else {
    //         $(s.container[0]).find('.swiper-pagination').show();
    //       }
    //     }
    //   });
    //   var galleryTopSwiper = new Swiper('.swiper-gallery-top', {
    //     slidesPerView: 1,
    //     spaceBetween: 10,
    //     nested: true,
    //     resistanceRatio: 0,
    //     preloadImages: false,
    //     lazyLoading: true,
    //   });
    //   var galleryThumbsSwiper = new Swiper('.swiper-gallery-thumbs', {
    //     slidesPerView: 5,
    //     spaceBetween: 10,
    //     centeredSlides: true,
    //     touchRatio: 0.2,
    //     slideToClickedSlide: true,
    //     nested: true,
    //     resistanceRatio: 0,
    //   });
    //   galleryTopSwiper.params.control = galleryThumbsSwiper;
    //   galleryThumbsSwiper.params.control = galleryTopSwiper;


    // })();

    // var mySwiper = new Swiper('#swiper-container', {
    //     speed: 400,
    //     spaceBetween: 100
    // })

// var swiperMainOptions = {
//         slidesPerView:'auto',
//         centeredSlides:true,
//         spaceBetween: 80,
//         effect:'coverflow',
//         speed:250,
//         coverflow:{slideShadows:false},
//         // pagination:'.header-swiper-front .swiper-pagination',
//         paginationClickable:true,
//         nextButton:'.header-swiper-front .swiper-button-next',
//         prevButton:'.header-swiper-front .swiper-button-prev',
//         control:[swiperBack1,swiperBack2],
//         controlBy:'container',
//         keyboardControl:true,
//         a11y:true,
//         onTransitionEnd:onTransitionEndFunc($timeout, $scope),
//         // onSlidePrevStart: onSlidePrevStart($timeout, $scope),
//         parallax: true
//       }

//       if (!desktop_mode) {
//         swiperMainOptions.slidesPerView = args.mobile.slidesPerView;
//         swiperMainOptions.spaceBetween = args.mobile.spaceBetween;
//         swiperMainOptions.breakpoints = args.mobile.breakpoints;
//       }
//       var swiperFront=new Swiper('.header-swiper-front', swiperMainOptions)
//         function onSlideChangeEndMainSwiper($timeout, $scope) {
//             return function(swiper) {
//               $timeout(function(){
//                 $scope.$apply(function() {
//                   swiper.slides[swiper.activeIndex].classList.add('activate');
//                 })
//               })
//             }
//           }
  }

]);

