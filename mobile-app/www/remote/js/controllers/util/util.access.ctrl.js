angular.module('uguru.util.controllers')

.controller('AccessController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaStatusbar',
  '$ionicPlatform',
  '$ionicViewSwitcher',
  function($scope, $state, $timeout, $localstorage,
    $ionicModal, $cordovaStatusbar, $ionicPlatform,
    $ionicViewSwitcher) {

    //Sanitized

    //DATA
    /* NICK TODO: What is best practice
    // for view-specific scope variable naming? */

    $scope.access = {
      codeInput: '',
      errorInputMsg: null,
      keyboardShown:false,
      data: {
        genericAccessCode: 'cool',
      }
    }

    $scope.checkAccessCode = function(code) {

      if (code === $scope.access.data.genericAccessCode) {
        $scope.success.show(0, 1000,'Access Granted');
        $scope.access.codeInput ='';
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.university');
      } else {
        $scope.access.errorInputMsg = 'Incorrect access code';
      }
    }


    /* This is where all cordova plugins MUST go
       EVENTUALLY TODO: Put all device readys in a service
    */
     // window.addEventListener('native.keyboardshow', keyboardShowHandler);

     //  function keyboardShowHandler(e){
     //      if ($scope.platform.mobile) {
     //        $scope.access.keyboardShown = true;
     //      }
     //  }

      $scope.accessInputOnFocus = function() {
        if ($scope.platform.mobile) {
          $scope.access.keyboardShown = true;
        }
      }

      $scope.accessInputOnBlur = function() {
        if ($scope.platform.mobile) {
          $scope.access.keyboardShown = false;
        }
      }

      // NICK TODO --> location
      document.addEventListener("deviceready", function () {

        //all mobile specific plugins
        if ($scope.platform.mobile) {


          if ($scope.platform.ios) {

            if (window.StatusBar) {

              StatusBar.styleLightContent();
              StatusBar.overlaysWebView(true);

            }

            if (cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

          }

          if ($scope.platform.android) {
            //handle android case here
          }
        }
      })

    /*
      Initialize all the modals & render the controllers & views
      NICK TODO: Look up best way to instantiate these with respect
      to performance.
    */
    $ionicModal.fromTemplateUrl(BASE + 'templates/how-it-works.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.howItWorksModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.signupModal = modal;
    });

    $scope.launchHowItWorksModal = function() {
      if ($scope.signupModal) {
        //show
      }
    }

    $scope.launchSignupModal = function() {
      $scope.signupModal.show();
    }

    //View-specific event for when the view-specific
    // assets are rendered
    $scope.$on('$ionicView.loaded', function() {

      // $scope.launchHowItWorksModal();

    });

  }

])