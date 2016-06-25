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


    return {getWorkflows: getWorkflows}

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
                reference: {
                    controller: 'SplashMadlibController',
                    templateUrl: 'preapp/templates/splash.madlib.html',
                    routeUrl: 'dev/splash/madlib',
                },
                states: [
                    {state: 'onEnter', functional: true, animated: false, tested: false},
                    {state: 'onTagOneClicked', selector: '[blank-num="1"] a', functional: true, animated: false, tested: false},
                    {state: 'onTagTwoClicked', selector: '[blank-num="2"] a',functional: true, animated: false, tested: false},
                    {state: 'onTagDeselected', selector: '[blank-num="1"] .translate-blank-1', functional: true, animated: false, tested: false},
                    {state: 'onBothBlanksFilled', selector: '[blank-num="2"] .translate-blank-2',  functional: true, animated: false, tested: false},
                    {state: 'onUniversityChanged', functional: false, animated: false, tested: false},
                    {state: 'onCategoryChanged', functional: false, animated: false, tested: false},
                    {state: 'onDeviceButtonSelected', functional: false, animated: false, tested: false},
                    {state: 'onMapFullScreenTransition', functional: false, animated: false, tested: false},
                    {state: 'onExit', functional: false, animated: false, tested: false}
                ]
              },
              {
                title: 'Device States',
                identifier: 'device',
                reference: {
                    controller: 'SplashDeviceController',
                    templateUrl: 'preapp/templates/splash.device.html',
                    routeUrl: 'dev/splash/device',
                }
              },
              {
                title: 'Splash Header Nav',
                identifier: 'splash_nav',
                reference: {
                    templateUrl: 'preapp/templates/splash.nav.html',
                    routeUrl: 'dev/splash/nav',
                },
                status: {css: false}
              },
              {
                title: 'Splash Map',
                identifier: 'splash_map',
                reference: {
                    controller: 'SplashMapController',
                    templateUrl: 'preapp/templates/splash.map.html',
                    routeUrl: 'dev/splash/map',
                },
                status: {css: false}
              },
              {
                title: 'Splash Sidebar',
                identifier: 'sidebar',
                reference: {
                    controller: 'SplashSidebarController',
                    templateUrl: 'preapp/templates/splash.sidebar.html',
                    routeUrl: 'dev/splash/sidebar',
                },
                status: {css: false}
              },
              {
                title: 'Splash Powerups',
                identifier: 'powerup',
                reference: {
                    controller: 'SplashPowerupsController',
                    templateUrl: 'preapp/templates/powerups.html',
                    routeUrl: 'dev/splash/powerups'
                },
                status: {css: false}
              },
              {
                title: "FAQ",
                identifier: 'faq',
                reference: {
                    controller: 'SplashFAQController',
                    templateUrl: 'preapp/templates/sidebar/faq.html',
                    routeUrl: 'dev/splash/faq'
                },
                status: {css: false}
              },
              {
                title: "Pricing Page",
                identifier: 'pricing',
                reference: {
                    controller: 'SplashPricingController',
                    templateUrl: 'preapp/templates/sidebar/pricing.html',
                    routeUrl: 'dev/splash/pricing'
                },
                status: {css: false}
              },
              {
                title: "Team Page",
                identifier: 'team',
                reference: {
                    controller: 'SplashTeamController',
                    templateUrl: 'preapp/templates/sidebar/team.html',
                    routeUrl: 'dev/splash/team'
                },
                status: {css: false}
              },
              {
                title: "About Page",
                identifier: 'about',
                reference: {
                    controller: 'SplashAboutController',
                    templateUrl: 'preapp/templates/sidebar/about.html',
                    routeUrl: 'dev/splash/about'
                },
                status: {css: false}
              },
              {
                title: "How it works",
                identifier: 'hiw',
                reference: {
                    controller: 'SplashHIWController',
                    templateUrl: 'preapp/templates/hiw.html',
                    routeUrl: 'dev/splash/hiw'
                },
                status: {css: false}
              },
              {
                title: "Splash Tour Guide",
                identifier: 'tour',
                reference: {
                    controller: 'SplashTourController',
                    templateUrl: 'preapp/templates/tour.html',
                    routeUrl: 'dev/splash/tour'
                },
                status: {css: false}
              },
              {
                title: "Access",
                identifier: 'access',
                reference: {
                    controller: 'SplashAccessController',
                    templateUrl: 'preapp/templates/started/access.html',
                    routeUrl: 'dev/splash/access'
                },
                status: {css: false}
              },
              {
                title: "Projector-Only Swiper View",
                identifier: 'projector',
                reference: {
                    controller: 'SplashProjectorSwiperView',
                    templateUrl: 'preapp/templates/started/getting-started.html',
                    routeUrl: 'dev/splash/projector'
                },
                status: {css: false}
              },
              {
                title: "Demographics Slide",
                identifier: 'demographics',
                reference: {
                    controller: 'SplashAccessController',
                    templateUrl: 'preapp/templates/started/access.html',
                    routeUrl: 'dev/splash/demographic'
                },
                status: {css: false}
              },
              {
                title: "Account Slide",
                identifier: 'account',
                reference: {
                    controller: 'SplashAccountController',
                    templateUrl: 'preapp/templates/started/account.html',
                    routeUrl: 'dev/splash/account'
                },
                status: {css: false}
              },
              {
                title: "University Search Page",
                identifier: 'u_search',
                reference: {
                    controller: 'SplashSearchUniversityController',
                    templateUrl: 'preapp/templates/started/university-search.html',
                    routeUrl: 'dev/splash/university-search'
                },
                status: {css: false}
              },
              {
                title: "University Courses Slide",
                identifier: 'u_courses',
                reference: {
                    controller: 'SplashUniversityCoursesController',
                    templateUrl: 'preapp/templates/started/university-courses.html',
                    routeUrl: 'dev/splash/university-courses'
                },
                status: {css: false}
              },
              {
                title: 'Guru Profiles',
                identifier: 'profile',
                group: true,
                reference: {
                    controller: 'GuruProfileController',
                    templateUrl: 'shared/templates/guru.profile.html',
                    routeUrl: ['dev/admin/profiles/academic', 'dev/admin/profiles/tech', 'dev/admin/profiles/baking', 'dev/admin/profiles/photography', 'dev/admin/profiles/household']
                }
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
              }
            ]

        for (var i = 0; i < workflows.length; i++) {
            workflows[i]['id'] = i + 1;
            // console.log(workflows[i]['title'],workflows[i]['id']);

        }
        console.log(workflows.length, 'workflows rendered');
        return workflows;
    }


}
