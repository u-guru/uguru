

angular
	.module('sharedServices')
	.factory("SideMenuService", [
		'LoadingService',
    '$timeout',
    'CounterService',
    'CTAService',
    SideMenuService
	]);

function SideMenuService(LoadingService, $timeout, CounterService, CTAService) {
  return {
    initHomeSideMenu: initHomeSideMenu
  }

    function initHomeSideMenu(scope) {
      initSupportBox(scope);
      initSideMenuCTAs(scope, '.splash-sidebar-content');
      return {
        toggle: toggleSidebar(scope),
        show: false
      }
    }

    function showSupport(scope) {
      return function() {
        var intercomContainer = document.querySelector('#intercom-container');
        intercomContainer.style.cssText += ' z-index:1000 !important;';
        Intercom('show');
        var intercomMessengerDiv = intercomContainer.querySelector('#intercom-conversation');
        intercomMessengerDiv.style.cssText = "width: 66% !important; ";
        intercomContainer.style.visibility = "visible";
        Intercom('onHide', function() {
          intercomContainer.style.visibility = "hidden";
          var callback = function() {
            document.querySelector('ion-pane#cta-modal-intercom') && document.querySelector('ion-pane#cta-modal-intercom').classList.remove('show');
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
            console.log('intercom container instantiated');
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
