angular.module('uguru.guru.controllers')

.controller('GuruOpportunitiesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicTabsDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicTabsDelegate) {

    $scope.process_guru_opportunities = function(opportunities) {
      result = [];
      var op_keys = Object.keys(opportunities);
      for (var i = 0; i < op_keys.length; i ++) {
        var index_key = op_keys[i];
        result.push(opportunities[index_key + '']);
      }
      return result;
    }

    $scope.$on('$ionicView.loaded', function(){
      $scope.guru_opportunities = $scope.process_guru_opportunities($scope.user.guru_score_opportunities)
    });

  }

]);
