angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsTransactionsController', [

  //All imported packages go here
  '$scope',
  '$state',
  function($scope, $state) {
    
    $scope.cards = [
      {
        type: 'visa',
        last_4: '8531',
        default: false,
      },
      {
        type: 'master',
        last_4: '8121',
        default: true,
      },
      {
        type: 'amex',
        last_4: '8531',
        default: false,
      },
      {
        type: 'discovery',
        last_4: '8512',
        default: false,
      }
    ]

  }

]);

