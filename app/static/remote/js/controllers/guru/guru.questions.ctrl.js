angular.module('uguru.guru.controllers')

//ALL student controllers
.controller('GuruQuestionsController', [

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



    //initialize location modal
    $ionicModal.fromTemplateUrl(BASE + 'templates/questions.modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.questionsModal = modal;
    });

    $scope.launchAnswerQuestionModal = function(question) {

      $scope.question = question;
      $scope.question.tags = [{name:'mars'}, {name:'pluto'}];
      $scope.question.student_price = parseInt($scope.question.student_price);
      $scope.questionsModal.show();
    }

    $scope.closeQuestionsModal = function() {
      $scope.questionsModal.hide();
    }

    $scope.active_questions = $scope.user.active_questions;
  }

]);
