angular.module('uguru.util.controllers')

.controller('OneUniversityController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$timeout',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $timeout) {

    $scope.page = {
      header: {text: "We looked at other pricing models..", state:0}
    }

    $timeout(function() {
      document.querySelector('div.pricing-header').innerHTML = "And decided to work downwards"
    }, 2000)

    $timeout(function() {
     $scope.page.header.state = 1;
    }, 4000)


    $scope.questions = [

      {
        header: "Tutors can set their own prices.",
        body: "Their maximum increases as they build reportaire. Their maximum increases as they build reportaire.Their maximum increases as they build reportaire.Their maximum increases as they build reportaire."
      },
      {
        header: "Tutors can set their own prices.",
        body: "Their maximum increases as they build reportaire. Their maximum increases as they build reportaire.Their maximum increases as they build reportaire.Their maximum increases as they build reportaire."
      },
      {
        header: "Tutors can set their own prices.",
        body: "Their maximum increases as they build reportaire. Their maximum increases as they build reportaire.Their maximum increases as they build reportaire.Their maximum increases as they build reportaire."
      },
      {
        header: "Tutors can set their own prices.",
        body: "Their maximum increases as they build reportaire."
      },

    ];

  }


])