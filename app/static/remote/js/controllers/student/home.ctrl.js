angular.module('uguru.student.controllers')

//ALL student controllers
.controller('HomeController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$ionicModal',
  '$timeout',
  '$q',
  'University',
  '$localstorage',
  '$ionicSideMenuDelegate',
  '$ionicBackdrop',
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $ionicModal, $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop)     {


  $ionicPlatform.ready(function() {

        $scope.turnStatusBarWhite = function() {

          if (window.StatusBar) {

            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(true);
          }

        }

        $scope.turnStatusBarBlack = function() {
          if (window.StatusBar) {
                      // console.log('Extra #1. Styling iOS status bar to black \n\n');

            StatusBar.styleDefault();
            StatusBar.overlaysWebView(true);
          }
        }

        $scope.turnStatusBarWhite();

    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/verb.home.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.verbModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/contacting.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.contactingModal = modal;
    });

    $scope.launchVerbModal = function() {
      $scope.verbModal.show();
    }

    $scope.toggleRightSideMenu = function() {
      $ionicSideMenuDelegate.toggleRight();
    };

    $scope.launchRequestModal = function() {
      if ($scope.root.vars.courses) {

          console.log('instantiated first request form');
          $ionicModal.fromTemplateUrl(BASE + 'templates/request.modal.html', {
              scope: $scope,
              animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.requestModal = modal;
            $scope.requestModal.show();
          });

      } else {
        alert('courses are not loaded yet');
      }
    }

    $scope.launchContactingModal = function() {
      $scope.contactingModal.show();
    }


    $scope.closeContactingModal = function() {
      $scope.contactingModal.hide();
    }

    // $ionicModal.fromTemplateUrl(BASE + 'templates/availability.modal.html', {
    //           scope: $scope,
    //           animation: 'slide-in-up'
    //       }).then(function(modal) {
    //         $scope.availabilityModal = modal;
    //         $scope.availabilityModal.show();
    //     });

  }

]);
