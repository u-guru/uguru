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
    
    var fakeTime = new Date()
    var fateTimeUTC = fakeTime.getTime();

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
      var currentActiveSession = $scope.user.active_sessions[0];
      $scope.user.active_sessions = [];
      $scope.user.completed_sessions = [];
      $scope.user.completed_sessions.push(currentActiveSession);
      $scope.guru.student_rating = starNumber;
      $scope.user.gurus.push(
        $scope.guru
      )
      $scope.rootUser.updateLocal($scope.user);
      $scope.ratingModal.hide();
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