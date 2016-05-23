

angular
	.module('sharedServices')
	.factory("SideMenuService", [
		'LoadingService',
    '$timeout',
    'CounterService',
    'CTAService',
    '$ionicModal',
    '$ionicSlideBoxDelegate',
    SideMenuService
	]);

function SideMenuService(LoadingService, $timeout, CounterService, CTAService, $ionicModal, $ionicSlideBoxDelegate) {
  return {
    initHomeSideMenu: initHomeSideMenu,
    initHomeModals: initHomeModals
  }

    function initHomeSideMenu(scope) {
      initSupportBox(scope);
      scope.desktopMode && initSideMenuCTAs(scope, '.splash-sidebar-full');
      return {
        toggle: toggleSidebar(scope),
        show: false
      }
    }

    function initHomeModals(scope) {

        $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.page.modals.account = modal;
        });

        scope.$on('modal.shown', function() {
          $ionicSlideBoxDelegate.update();
        });

        $ionicModal.fromTemplateUrl(BASE + 'templates/team.modal.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.page.modals.team = modal;
        });

        $ionicModal.fromTemplateUrl(BASE + 'templates/become.guru.modal.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.page.modals.become_guru = modal;
        });

        $ionicModal.fromTemplateUrl(BASE + 'templates/pricing.modal.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.page.modals.pricing = modal;
        });

        $ionicModal.fromTemplateUrl(BASE + 'templates/faq.modal.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.page.modals.faq = modal;
        });

        // $ionicModal.fromTemplateUrl(BASE + 'templates/faq.html', {
        //   scope: scope,
        //   animation: 'slide-in-up'
        // }).then(function(modal) {
        //   scope.page.modals.faq = modal;
        // });
        scope.page.modals.support = showSupport(scope);
    }

    function showSupport(scope) {
      return function() {
        Intercom('show');

        var intercomContainer = document.querySelector('#intercom-container');
        if (!intercomContainer) {
          $timeout(function() {
            showSupport(scope)();
          }, 1000)
          return;
        }
        intercomContainer.style.cssText += ' z-index:1000 !important;';
        intercomContainer.style.display = "block";
        $timeout(function() {
          var intercomMessengerDiv = intercomContainer.querySelector('#intercom-conversation');
          if (intercomMessengerDiv) {
            if (scope.desktopMode) {
              intercomMessengerDiv.style.cssText = "width: 66% !important; ";
            }
            $timeout(function() {
              intercomContainer.style.visibility = "visible";
            }, 2000);
          }

        }, 1000);
        Intercom('onHide', function() {
          intercomContainer.style.visibility = "hidden";
          intercomContainer.style.display = "none";
          var callback = function() {
            document.querySelector('ion-pane#cta-modal-intercom') && document.querySelector('ion-pane#cta-modal-intercom').classList.remove('show');
            intercomContainer.style.visibility = "hidden";
            $timeout(function() {
              intercomContainer.style.visibility = "hidden";
              intercomContainer.style.display = "none";
            })
          }
          CTAService.closeCTAManually('#cta-box-intercom', callback);
        });
      }
    }

    function hideSupport(scope) {
      return function() {

      }
    }

    function toggleSidebar(scope) {
      return function() {
        scope.page.sidebar.show= !scope.page.sidebar.show;
      }
    }

    function goToSignup() {
      return;
    }

    function initPricingCounters(scope) {
      return function() {
        $timeout(function() {
          if (!scope.pricingSidebarAlreadyInitialized) {
            scope.pricingSidebarAlreadyInitialized = true;
            var feeCounter = CounterService.initCounter(document.getElementById('our-fees'), 40, 0, 10, '%');
            CounterService.startCounter(feeCounter);
            var pricingCounter = CounterService.initCounter(document.getElementById('students-pay'), 100, 14, 10, '/hr', '$');
            CounterService.startCounter(pricingCounter);
            var chargeCounter = CounterService.initCounter(document.getElementById('guru-charge'), 100, 20, 10, '/hr', '&lsaquo;$');
            CounterService.startCounter(chargeCounter);
          }
        }, 1500);
      }
    }

    function initSideMenuCTAs(scope, parent_ref) {
      CTAService.initSingleCTA('#cta-box-pricing', parent_ref, initPricingCounters(scope));
      CTAService.initSingleCTA('#cta-box-FAQ', parent_ref);
      CTAService.initSingleCTA('#cta-box-signup', parent_ref);
      CTAService.initSingleCTA('#cta-box-account', parent_ref);
      CTAService.initSingleCTA('#cta-box-become-guru', parent_ref);
      // CTAService.initSingleCTA('#cta-box-apply', parent_ref); //deactivated for now @samir TODO -- add to queu
      CTAService.initSingleCTA('#cta-box-team', parent_ref);
      CTAService.initSingleCTA('#cta-box-intercom', 'body', showSupport(scope));
    }

    function initSupportBox(scope) {
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
          // var supportCTAPane = document.querySelector('ion-pane#cta-modal-intercom');
          // var clonedCTAClose = document.querySelector('header.absolute.top-0.full-x.high-z-index .cta-modal-close');
          // supportCTAPane.parentNode.insertBefore(clonedCTAClose, supportCTAPane);
        }, 7000);
    }

    // var generatePageLinks = function() {
    //     initSupportBox();
    //     var howItWorksFunc = function() {
    //       scope.scrollToSection("#splash-browse")
    //     }
    //     var browseFunc = function() {
    //       scope.scrollToSection("#splash-browse");
    //     }
    //     var becomeGuruFunc = function() {
    //       scope.scrollToSection("#become-guru");
    //     }
    //     var topPageFunc = function() {
    //       scope.scrollToSection("#home-splash");
    //     }

    //     var triggerSupportBox = function() {
    //       scope.launchSupportOverlay();
    //     }

    //   generatePageLinks();
}
