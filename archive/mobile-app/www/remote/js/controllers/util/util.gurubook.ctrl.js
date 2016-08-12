angular.module('uguru.util.controllers')

.controller('GuruBookController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicTabsDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicTabsDelegate) {

      $scope.goToGuruProfile = function (guru) {
      //mixpanel track
      mixpanel.track("Guru.profile");
      $state.go('^.guru-profile', {guruObj:JSON.stringify(guru), showContactGuru:true});
    }

    if ($scope.user.gurus) {
      for (var i = 0; i < $scope.user.gurus.length; i++) {
        if (!$scope.user.gurus[i].profile_url) {
          $scope.user.gurus[i].profile_url = 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100'
        }
      }
    }


    $scope.topGuruBookTabsDelegate = $ionicTabsDelegate.$getByHandle('student-guru-book-tabs-top');

  }

]);
