angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruController', [

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

    $scope.request = {
      verb_image: 'session.svg',
      student: {
        profile_url: 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100',
        name: 'Michael Samir'
      },
      course: {
        short_name: 'ASTRO 110'
      },
      task_title: 'Get me Cream Ice Cream',
      tags: ['milleniumfalcon'],
      schedule_time: 45,
      address: 'Ferry Building'
    }

  }

]);
