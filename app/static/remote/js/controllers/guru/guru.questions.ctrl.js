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

    $scope.questions = [

      {
        description: 'What would happen if all the water in the ocean was replaced with deuterium oxide?',
        course:{short_name: 'Chem 101'},
        tags: ['heavy water', 'D20'],
        time_created: '',
        student_price: 0,
        time_expired:0
      },
      {
        description: 'Can you please explain the stable marriage algorithm using my extended family? Maybe ill finally make the connection.',
        course:{short_name: 'Math 70'},
        tags: ['N*k-1', 'Discrete probability'],
        time_created: '',
        student_price: 5,
      },
      {
        description: 'What would happen if all the water in the ocean was replaced with deuterium oxide?',
        course:{short_name: 'Chem 101'},
        tags: ['heavy water', 'D20'],
        time_created: '',
        student_price: 0,
      },

    ]
  }

]);
