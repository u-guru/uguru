angular
.module('uguru.admin')
.factory("AdminWorkflowService", [
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  AdminWorkflowService
  ]);

function AdminWorkflowService($state, $timeout, $localstorage, $window) {


    return {
      getWorkflows: getWorkflows,
      getSingleWorkflow: getSingleWorkflow
    }

    function getSingleWorkflow(arg) {
      var workflows = getWorkflows();
      for (var i = 0; i < workflows.length; i++) {
        if (workflows[i].identifier.toLowerCase() === arg.toLowerCase()) {
          return workflows[i];
        }
      }
      return
    }

    function getWorkflows() {
        var workflows = [
              {
                title: 'App Loader',
                identifier: 'loader',
                reference: {
                    controller: 'SplashLoaderController',
                    templateUrl: 'preapp/templates/loaders/main.html',
                    routeUrl: 'dev/splash/loader',
                    cssUrl: 'preapp/css/scss/loader.scss'
                },
                states: [
                    {title: 'onLoaderSwitch', functional: false, animated: false, tested: false}
                ]
              },
              {
                title: 'Madlib Selection',
                identifier: 'madlib',
                parentId: '#splash-madlib',
                reference: {
                    controller: 'SplashMadlibController',
                    controllerUrl: 'preapp/js/SplashMadlibController.js',
                    templateUrl: 'preapp/templates/splash.madlib.html',
                    routeUrl: 'dev/splash/madlib',
                    cssUrl: 'preapp/css/scss/partials/adlib/_main.scss'
                },
                states: [
                    {title: 'onActivate', functional: true, animated: false, tested: false},
                    {title: 'onTagOneInit', selector: '[blank-num="1"] a', testing: {'css': ['stroke-dasharray']}, functional: true, animated: false, tested: false},
                    {title: 'onTagOneClicked', selector: '[blank-num="1"] a', functional: true, animated: false, tested: false},
                    {title: 'onTagTwoClicked', selector: '[blank-num="2"] a',functional: true, animated: false, tested: false},
                    {title: 'onTagDeselected', selector: '[blank-num="1"] .translate-blank-1', functional: true, animated: false, tested: false},
                    {title: 'onBothBlanksFilled', selector: '[blank-num="2"] .translate-blank-2',  functional: true, animated: false, tested: false},
                    {title: 'onUniversityChanged', functional: false, animated: false, tested: false},
                    {title: 'onCategoryChanged', functional: false, animated: false, tested: false},
                    {title: 'onDeviceButtonSelected', functional: false, animated: false, tested: false},
                    {title: 'onMapFullScreenTransition', functional: false, animated: false, tested: false},
                    {title: 'onExit', functional: false, animated: false, tested: false}
                ]
              },
              {
                title: 'Device States',
                identifier: 'device',
                parentId: '#splash-device-container',
                reference: {
                    controller: 'SplashDeviceController',
                    controllerUrl: 'preapp/js/SplashDeviceController.js',
                    templateUrl: 'preapp/templates/splash.device.html',
                    routeUrl: 'dev/splash/device',
                    cssUrl: 'preapp/css/scss/partials/_device.scss'
                },
                states: [
                  {title: 'drawOnInit', description: 'Should draw itself in while Splash Madlib state is activating', functional:true, animated:false, tested:false},
                  {title: 'onUniversityChange', description: 'Should redraw, burst, maintain indication of university color in some way + return back to original size & position', functional:false, animated:false, tested:false},
                  {title: 'onSearchStart', description: 'Should signal that its searching for tutors', functional:false, animated:false, tested:false},
                  {title: 'onSearchStartPropogateWaves', description: 'As search state conveys something is loading, propogate the circular loader outside the bounds in an incremental fashion until screen is taken over', functional:false, animated:false, tested:false},
                  {title: 'onCounterStart', description: 'Inner device screen should start counting to a particular number', functional:false, animated:false, tested:false},
                  {title: 'onCounterIncrement', description: 'This state occurs each time the number changes in the counter, signaling other animations with the results completed so far', functional:false, animated:false, tested:false},
                  {title: 'onCounterCompleteCounterExit', description: 'Inner device screen should transition from a counter to a state highlighting the gurus available', functional:false, animated:false, tested:false},
                  {title: 'onCounterCompleteGuruEject', description: 'Inner device screen should simultaneous init/prepare to eject gurus as ', functional:false, animated:false, tested:false},
                  {title: 'onSingleGuruEnter', description: 'How an available Guru w/ course enters the device for each number in the counter', functional:false, animated:false, tested:false},
                  {title: 'onSingleGuruEject', description: 'Inner device screen should transition from a counter to a state highlighting the gurus available', functional:false, animated:false, tested:false},
                  {title: 'onGuruProfileEnter', description: 'The transition of a guru profile into the mobile device/laptop', functional:false, animated:false, tested:false},
                  {title: 'onGuruProfileExit', description: 'The exiting transition of a guru profile into the mobile device/laptop', functional:false, animated:false, tested:false},
                  {title: 'onGuruProfileMorph', description: 'The interrim state of a Guru profile given the user selects the morph device icon/button', functional:false, animated:false, tested:false},
                  {title: 'onGuruDeviceMorph', description: 'The transition of a mobile device to laptop or vice versa', functional:false, animated:false, tested:false}
                ]
              },
              {
                title: 'Splash Header Nav',
                identifier: 'nav',
                parentId:'#splash-nav-bar',
                reference: {
                    controller: 'SplashNavController',
                    controllerUrl: 'preapp/js/SplashNavController.js',
                    templateUrl: 'preapp/templates/splash.nav.html',
                    routeUrl: 'dev/splash/nav',
                    cssUrl: 'preapp/css/scss/partials/splash/_headers.scss',
                    parentController: 'SplashController as splash'
                },
                states: [
                  {title: 'onEnterSidebarIcon', description: 'Entrance of sidebar icon', functional:false, animated:false, tested:false},
                  {title: 'onEnterCategoriesDropdown', description: 'Entrance of categories dropdown', functional:false, animated:false, tested:false},
                  {title: 'onEnterUniversitiesDropdown', description: 'Entrance of universities dropdown', functional:false, animated:false, tested:false},
                  {title: 'onClickSideBarIcon', description: 'sidebar icon is clicked', functional:false, animated:false, tested:false},
                  {title: 'onClickPowerupsIcon', description: 'Powerup button is clicked and the view is initialized', functional:false, animated:false, tested:false},
                  {title: 'onClickUniversityDropdown', description: 'Universities dropdown is clicked.', functional:false, animated:false, tested:false},
                  {title: 'onClickCategoriesDropdown', description: 'Categories dropdown is clicked.', functional:false, animated:false, tested:false},
                  {title: 'onHoverSideBarIcon', description: 'Sidebar icon is hovered while in Splash madlib view', functional:false, animated:false, tested:false},
                  {title: 'onHoverPowerupsIcon', description: 'Powerup icon is hovered while in Splash madlib view', functional:false, animated:false, tested:false},
                  {title: 'onHoverUniversityDropdown', description: 'Entire universities dropdown is hovered while in "compressed" mode', functional:false, animated:false, tested:false},
                  {title: 'onHoverCategoriesDropdown', description: 'Entire categories dropdown is hovered while in "compressed" mode', functional:false, animated:false, tested:false},
                  {title: 'onExitPowerupsIcon', description: 'Exit of sidebar icon', functional:false, animated:false, tested:false},
                  {title: 'onExitSidebarIcon', description: 'Exit of sidebar icon', functional:false, animated:false, tested:false},
                ]
              },
              {
                title: 'Splash Maps',
                identifier: 'splash_maps',
                parentId: '#splash-map-view',
                reference: {
                    controller: 'SplashMapsController',
                    controllerUrl: 'preapp/js/SplashMapsController.js',
                    templateUrl: 'preapp/templates/splash.map.html',
                    routeUrl: 'dev/splash/map',
                    cssUrl: 'preapp/css/scss/partials/splash/_maps.scss'
                },
                states: []
              },
              {
                title: 'Splash Sidebar',
                identifier: 'sidebar',
                parentId: '#splash-sidebar',
                reference: {
                    controller: 'SplashSidebarController',
                    controllerUrl: 'preapp/js/SplashSidebarController.js',
                    templateUrl: 'preapp/templates/splash.sidebar.html',
                    routeUrl: 'dev/splash/sidebar',
                    cssUrl: 'preapp/css/scss/partials/splash/_sidebar.scss'
                },
                states: []
              },
              {
                title: 'Splash Powerups',
                identifier: 'powerups',
                parentId: '#splash-powerups',
                reference: {
                    controller: 'SplashPowerupsController',
                    controllerUrl: 'preapp/js/SplashPowerupsController.js',
                    templateUrl: 'preapp/templates/splash.powerups.html',
                    routeUrl: 'dev/splash/powerups',
                    cssUrl: 'preapp/css/scss/partials/splash/_powerups.scss'
                },
                states: []
              },
              {
                title: "FAQ",
                identifier: 'faq',
                parentId:'#splash-sidebar-faq',
                reference: {
                    controller: 'SplashFaqController',
                    controllerUrl: 'preapp/js/menu/SplashFaqController.js',
                    templateUrl: 'preapp/templates/sidebar/faq.html',
                    routeUrl: 'dev/splash/faq',
                    cssUrl: null
                },
                states:[]
              },
              {
                title: "Pricing Page",
                identifier: 'pricing',
                parentId: '#splash-sidebar-pricing',
                reference: {
                    controller: 'SplashPricingController',
                    controllerUrl: 'preapp/js/menu/SplashPricingController.js',
                    templateUrl: 'preapp/templates/sidebar/pricing.html',
                    routeUrl: 'dev/splash/pricing',
                    cssUrl: 'preapp/css/scss/partials/pages/_pricing.scss'
                },
                states: [

                ]
              },
              {
                title: "Team Page",
                identifier: 'team',
                parentId: '#splash-sidebar-team',
                reference: {
                    controller: 'SplashTeamController',
                    controllerUrl: 'preapp/js/menu/SplashTeamController.js',
                    templateUrl: 'preapp/templates/sidebar/team.html',
                    routeUrl: 'dev/splash/team'
                },
                states: [

                ]
              },
              {
                title: "About Page",
                identifier: 'about',
                reference: {
                    controller: 'SplashAboutController',
                    templateUrl: 'preapp/templates/sidebar/about.html',
                    routeUrl: 'dev/splash/about'
                },
                states: [

                ]
              },
              {
                title: "How it works",
                identifier: 'hiw',
                reference: {
                    controller: 'SplashHIWController',
                    templateUrl: 'preapp/templates/hiw.html',
                    routeUrl: 'dev/splash/hiw'
                },
                states: [

                ]
              },
              {
                title: "Splash Tour Guide",
                identifier: 'tour',
                reference: {
                    controller: 'SplashTourController',
                    templateUrl: 'preapp/templates/tour.html',
                    routeUrl: 'dev/splash/tour'
                },
                states: [

                ]
              },
              {
                title: "Access",
                identifier: 'access',
                reference: {
                    controller: 'SplashAccessController',
                    templateUrl: 'preapp/templates/started/access.html',
                    routeUrl: 'dev/splash/access'
                },
                states: [

                ]
              },
              {
                title: "Projector-Only Swiper View",
                identifier: 'projector',
                reference: {
                    controller: 'SplashProjectorSwiperView',
                    templateUrl: 'preapp/templates/started/getting-started.html',
                    routeUrl: 'dev/splash/projector'
                },
                states: [

                ]
              },
              {
                title: "Demographics Slide",
                identifier: 'demographics',
                reference: {
                    controller: 'SplashAccessController',
                    templateUrl: 'preapp/templates/started/access.html',
                    routeUrl: 'dev/splash/demographic'
                },
                states: [

                ]
              },
              {
                title: "Account Slide",
                identifier: 'account',
                reference: {
                    controller: 'SplashAccountController',
                    templateUrl: 'preapp/templates/started/account.html',
                    routeUrl: 'dev/splash/account'
                },
                states: [
                  //@gabrielle-note: example of transitions to account for
                  {title: 'beforeAccountProjectorAnimComplete', functional: false, animated: false, tested: false},
                  {title: 'onAccountProjectorAnimComplete', functional: false, animated: false, tested: false},
                  {title: 'onAccountValidateButtonClicked', functional: false, animated: false, tested: false},
                  {title: 'onAccountValidate', functional: false, animated: false, tested: false},
                  {title: 'onAccountSuccess', functional: false, animated: false, tested: false},
                  {title: 'onAccountError', functional: false, animated: false, tested: false}
                ]
              },
              {
                title: "University Search Page",
                identifier: 'u_search',
                reference: {
                    controller: 'SplashSearchUniversityController',
                    templateUrl: 'preapp/templates/started/university-search.html',
                    routeUrl: 'dev/splash/university-search'
                },
                states: [
                  {title: 'onViewInit', functional: false, animated: false, tested: false},
                  {title: 'onViewEnterComplete', functional: false, animated: false, tested: false},
                  {title: 'onInputFocused', functional: false, animated: false, tested: false},
                  {title: 'onSearchResultChange', functional: false, animated: false, tested: false},
                  {title: 'onNoSearchResults', functional: false, animated: false, tested: false},
                  {title: 'onSearchResultClicked', functional: false, animated: false, tested: false}
                ]
              },
              {
                title: "University Courses Slide",
                identifier: 'u_courses',
                reference: {
                    controller: 'SplashUniversityCoursesController',
                    templateUrl: 'preapp/templates/started/university-courses.html',
                    routeUrl: 'dev/splash/university-courses'
                },
                states: [
                  {title: 'onViewInit', functional: false, animated: false, tested: false},
                  {title: 'asSlideEnterTransition', functional: false, animated: false, tested: false},
                  {title: 'onSlideEnterTransitionComplete', functional: false, animated: false, tested: false},
                  {title: 'onSlideExitTransition', functional: false, animated: false, tested: false},
                  {title: 'onCourseSearchInputFocused', functional: false, animated: false, tested: false},
                  {title: 'onCourseSearchKeypress', functional: false, animated: false, tested: false},
                  {title: 'onCourseSearchInputBackspace', functional: false, animated: false, tested: false},
                  {title: 'onCourseSearchInputClear', functional: false, animated: false, tested: false},
                  {title: 'onCourseSearchResultExists', functional: false, animated: false, tested: false},
                  {title: 'onCourseSelected', functional: false, animated: false, tested: false},
                  {title: 'onCourseRemoved', functional: false, animated: false, tested: false},
                ]
              },
              {
                title: 'Guru Profiles',
                identifier: 'profile',
                group: true,
                reference: {
                    controller: 'GuruProfileController',
                    templateUrl: 'shared/templates/guru.profile.html',
                    routeUrl: ['dev/admin/profiles/academic', 'dev/admin/profiles/tech', 'dev/admin/profiles/baking', 'dev/admin/profiles/photography', 'dev/admin/profiles/household']
                },

              },
              {
                title: "Gabrielle's Portfolio",
                identifier: 'gabrielle',
                reference: {
                    controller: 'GabrielleController',
                    templateUrl: 'gabrielle/templates/index.html',
                    routeUrl: 'dev/gabrielle'
                }
              },
              {
                title: "Jeselle's Portfolio",
                identifier: 'jeselle',
                reference: {
                    controller: 'JeselleController',
                    templateUrl: 'gabrielle/templates/index.html',
                    routeUrl: 'dev/jeselle'
                }
              },
              {
                title: 'Base Components',
                identifier: 'base_comp',
                parentId: '#base-components-view',
                reference: {
                    controller: 'AdminComponentController',
                    controllerUrl: 'admin/js/AdminComponentController.js',
                    templateUrl: 'admin/templates/components/base.tpl',
                    routeUrl: 'dev/admin/components/base',
                    cssUrl: 'admin/css/scss/partials/_base_components.scss'
                },
                states: []
              },
              {
                title:'Splash',
                identifier: 'splash',
                parentId: '#splash-view',
                reference: {
                  controller: 'SplashController',
                  controllerUrl: 'preapp/js/SplashController.js',
                  templateUrl: 'preapp/templates/splash.html',
                  routeUrl: 'dev/splash',
                  cssUrl: 'preapp/css/scss/preapp.scss'
                },
                states: [
                  {title: 'onInit', selector:'#splash-madlib', description: 'Activate splash madlib',  functional:false, animated:{micro: false, macro:false}, tested:{init: false, activated: false, properties:false}},
                  {title: 'onEnter', selector:'#splash-madlib', description: 'Check splash madlib is visible',  functional:false, animated:{micro: false, macro:false}, tested:{init: false, activated: false, properties:false}},
                  {title: 'onInit', selector:'#splash-device-container', description: 'Activate splash device',  functional:false, animated:{micro: false, macro:false}, tested:{init: false, activated: false, properties:false}},
                  {title: 'onEnter', selector:'#splash-device-container', description: 'Check splash device is visible',  functional:false, animated:{micro: false, macro:false}, tested:{init: false, activated: false, properties:false}},
                  {title: 'onInit', selector:'#splash-nav-bar', description: 'Activate splash nav',  functional:false, animated:{micro: false, macro:false}, tested:{init: false, activated: false, properties:false}},
                  {title: 'onEnter', selector:'#splash-nav-bar', description: 'Check splash nav is visible',  functional:false, animated:{micro: false, macro:false}, tested:{init: false, activated: false, properties:false}}
                ]
              }
            ]

        for (var i = 0; i < workflows.length; i++) {
            workflows[i]['id'] = i + 1;
            // console.log(workflows[i]['title'],workflows[i]['id']);

        }
        return workflows;
    }


}
