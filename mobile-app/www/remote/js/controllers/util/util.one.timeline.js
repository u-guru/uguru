angular.module('uguru.util.controllers')

.controller('TimelineController', [
  '$scope',
  '$state',
  '$stateParams',
  'Restangular',
  'User',
  '$ionicSideMenuDelegate',
  'LoadingService',
  '$timeout',
  function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate, LoadingService, $timeout){

      var event_one = {
        title: 'Officially accepting Gurus for Spring 2016. <br> Get a head-start by helping High School Students',
        tags: ['milestone', 'announcement', 'hs-support'],
        announcer: {name: 'Samir M', profile_url:'https://www.uguru.me/static/remote/img/avatar.svg', role:"founding guru"},
        attachments: ['Photo 1', 'Photo 2', 'Photo 3'],
        formatted_time: 'Dec 15 2015'
      }
      var event_two = {
        title: 'Officially accepting Gurus for Spring 2016. <br> Get a head-start by helping High School Students',
        tags: ['milestone', 'announcement', 'hs-support'],
        announcer: {name: 'Samir M', profile_url:'https://www.uguru.me/static/remote/img/avatar.svg', role:"founding guru"},
        attachments: ['Photo 1', 'Photo 2', 'Photo 3'],
        formatted_time: 'Dec 15 2015',
        category: 0,
      }

      $scope.timeline = {
        events: [event_one, event_two]
      }

    }


]);