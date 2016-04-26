angular.module('uguru.util.controllers')

.controller('RatingsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaStatusbar',
  '$ionicPlatform',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaStatusbar, $ionicPlatform) {


    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });

    if ($scope.pending_rating) {
      $scope.pending_rating.session.guru.current_hourly = 10;
    }

    if ($scope.user.guru_mode) {
      $scope.rating = $scope.user.pending_student_ratings[0];
    } else {
      $scope.rating = $scope.user.pending_guru_ratings[0];
    }

    $scope.saveInfo = function() {
      $scope.ratingModal.hide();
    }

    $scope.starClicked = function($event) {
      var starNumber = $event.target.getAttribute('value');
      $scope.showGreenStars(starNumber, $event.target);
      $scope.starsSelected = starNumber;
      $scope.root.vars.starsSelected = starNumber;
      $scope.showSubmitButton = true;
    }

    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    $scope.showGreenStars = function (value, element) {
      var allStarElements = element.parentNode.parentNode.querySelectorAll(":scope > .pure-u-1-5");
      for (var i = 0; i < value; i++) {
        var tempStar = allStarElements[i];

        if (!hasClass(tempStar, 'blue')) {
          tempStar.className = tempStar.className + ' blue';
        }

      }

      for (var j = value; j < 5; j++ ) {

        var tempStar = allStarElements[j];
        if (hasClass(tempStar, 'blue')) {
          tempStar.className= tempStar.className.replace("blue","");
        }

      }

    }


 	// $ionicModal) {

  //   var starOne = document.getElementById("starOne");
    //starOne.setAttribute("class", "icon ion-star green");


    $scope.closeRatingsModal = function() {

      if ($scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.ratingModal.hide();
        }, 300)
      } else {
        $scope.ratingModal.hide();
      }

    }

  }


])