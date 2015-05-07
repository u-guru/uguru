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


    $scope.starsSelected;

    $ionicPlatform.ready(function() {

      if (window.StatusBar && $scope.user.guru_mode) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });


    if ($scope.user.guru_mode) {
      $scope.rating = $scope.user.pending_student_ratings[0];
    } else {
      $scope.rating = $scope.user.pending_guru_ratings[0];
    }

    // // console.log(JSON.stringify($scope.rating));
    // console.log(JSON.stringify($scope.rating.session.id));

    $scope.saveInfo = function() {
      $scope.ratingModal.hide();
    }

    $scope.starClicked = function($event) {
      var starNumber = $event.target.getAttribute('value');
      $scope.showGreenStars(starNumber, $event.target);
      $scope.starsSelected = starNumber;
      console.log(starNumber);
      $scope.showSubmitButton = true;
    }

    $scope.submitRating = function () {
      $scope.submitRatingToServer();
    }

    $scope.submitRatingToServer = function() {
      $scope.loader.show();
      var serverCallback = function($scope, user) {
          if ($scope.user.guru_mode) {
              //mixpanel track
              mixpanel.track("Guru.home");
                $state.go('^.guru-home');
          } else {
        //mixpanel track
              mixpanel.track("Guru.home");
          $state.go('^.student-home');
        }

        $timeout(function(){
          $scope.ratingModal.hide();
          $scope.loader.hide();
        }, 500)
      }

      if ($scope.user.guru_mode) {

        $scope.rating.guru_rate_student = true;
        $scope.rating.student_rating = $scope.starsSelected;
        $scope.root.util.removeObjectByKey($scope.user.pending_student_ratings, 'id', $scope.rating.id);
      } else {
        $scope.rating.student_rate_guru = true;
        $scope.rating.guru_rating = $scope.starsSelected;
        $scope.root.util.removeObjectByKey($scope.user.pending_guru_ratings, 'id', $scope.rating.id);
      }

      var ratingPayload = $scope.rating;

      $scope.user.updateObj($scope.user, 'ratings', ratingPayload, $scope, serverCallback);

    }

    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    $scope.showGreenStars = function (value, element) {
      var allStarElements = element.parentNode.parentNode.querySelectorAll(":scope > .pure-u-1-5");
      for (var i = 0; i < value; i++) {
        var tempStar = allStarElements[i];

        if (!hasClass(tempStar, 'green')) {
          tempStar.className = tempStar.className + ' green';
        }

      }

      for (var j = value; j < 5; j++ ) {

        var tempStar = allStarElements[j];
        if (hasClass(tempStar, 'green')) {
          tempStar.className= tempStar.className.replace("green","");
        }

      }

    }


 	// $ionicModal) {

  //   var starOne = document.getElementById("starOne");
  //   console.log(starOne);
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