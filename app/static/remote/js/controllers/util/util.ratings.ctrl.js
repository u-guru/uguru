angular.module('uguru.util.controllers')

.controller('RatingsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicFrostedDelegate',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $ionicFrostedDelegate) {

    
    $scope.starsSelected;

    $scope.rating = {
      amount:27,
      time: 'November 30, 2014 AT 4:20PM',
    }

    $scope.guru = {
      name: 'Shun Kurosaki',
      course: {
        short_name: 'BIO 101'
      }
    }

    $scope.saveInfo = function() {
      $scope.ratingModal.hide();
    } 

    $scope.starClicked = function($event) {
      var starNumber = $event.target.getAttribute('value');
      console.log(starNumber)
      $scope.showGreenStars(starNumber);
      $scope.starsSelected = starNumber;
    }

    $scope.submitRating = function () {
      var currentActiveSession = $scope.user.active_sessions[0];
      $scope.user.active_sessions = [];
      $scope.user.completed_sessions = [];
      $scope.user.completed_sessions.push(currentActiveSession);
      $scope.guru.student_rating = $scope.starsSelected;
      $scope.user.gurus.push(
        $scope.guru
      )
      $state.go('^.home');
      $scope.rootUser.updateLocal($scope.user);
      $timeout(function(){
        $scope.ratingModal.hide();
      }, 500)
    }

    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    $scope.showGreenStars = function (value) {
      var allStarElements = document.getElementsByClassName('ion-star-rating');
      console.log(allStarElements);
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