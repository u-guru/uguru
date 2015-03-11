angular.module('uguru.util.controllers')

.controller('RatingsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal) {


    $scope.starsSelected;



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
    }

    $scope.submitRating = function () {
      $scope.submitRatingToServer();
    }

    $scope.submitRatingToServer = function() {

      var serverCallback = function($scope, user) {
        $state.go('^.home');
        $timeout(function(){
          $scope.ratingModal.hide();
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
      var allStarElements = element.parentNode.parentNode.querySelectorAll(":scope > .col");
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

    $scope.$on('modal.shown', function() {

      if ($scope.ratingModal.isShown()) {
        $timeout(function() {
          $ionicFrostedDelegate.update();
        }, 1000)
      }

    });



  }


])