angular.module('uguru.guru.controllers')

.controller('GuruTaskController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$ionicViewSwitcher',
  '$ionicActionSheet',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicSideMenuDelegate,
    $ionicPlatform, $cordovaStatusbar, $ionicViewSwitcher,
    $ionicActionSheet, $ionicHistory) {


    $scope.user.active_tasks = [
    {
      verb_image: 'chores.svg',
      _type: 2,
      task_title: 'do my dishes',
      address: 'Ferry Building',
      student_price: 25,

    },
    {
      verb_image: 'items.svg',
      _type: 2,
      task_title: 'Phantogram Tickets?',
      address: 'Greek Theatre, Balcony',
      student_price: 25,

    },
    {
      verb_image: 'food.svg',
      _type: 2,
      task_title: 'Need food for party.',
      address: 'Ferry Farmers Market',
      student_price: 130,

    },
    {
      verb_image: 'skilled.svg',
      _type: 2,
      task_title: 'Fix my iPhone!',
      address: 'Berkeley Downtown',
      student_price: 130,

    },
    {
      verb_image: 'specific.svg',
      _type: 2,
      task_title: 'I need moving help!',
      address: 'Parker and College',
      student_price: 130,

    },
    {
      verb_image: 'food.svg',
      _type: 2,
      task_title: 'I need moving help!',
      address: 'Memorial Glade',
      student_price: 130,

    },
    {
      verb_image: 'specific.svg',
      _type: 2,
      task_title: 'Lost diamond ring!',
      address: 'Parker and College',
      student_price: 130,

    },
    ]

    $scope.active_tasks = $scope.user.active_tasks;
    $scope.selectedVerbIndex = 0;
    $scope.verbImageIndices = [null, 'items.svg', 'food.svg', 'chores.svg', 'skilled.svg', 'specific.svg'];

    $scope.taskItemsFilterFunction = function(item) {
      if ($scope.selectedVerbIndex === 0 || item.verb_image === $scope.verbImageIndices[$scope.selectedVerbIndex]) {
        return true;
      }
      return false;
    }

    $scope.selectedVerb = function (verb_index) {
      $scope.selectedVerbIndex = verb_index;
    }

    $scope.goBack = function() {
      $ionicViewSwitcher.nextDirection('swap')
      $state.go('^.guru');
    };

  }


])