angular.module('uguru.util.controllers')

.controller('TagsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate) {

    $scope.input_tags = '';

    $scope.related_tags = ['elements', 'recursion', 'hydrogen']

    $scope.addTagToRequestTags = function(tag) {

      if ($scope.request && $scope.request.tags && $scope.request.tags.indexOf(tag) === -1) {
        $scope.request.tags.push(tag);
        $scope.input_tags = '';
        document.getElementById('tags-input').value = '';
        $scope.closeTagsModal();
      }
    }

    $scope.saveTag = function() {
      var tags_input = document.getElementById('tags-input').value;
      var tag = $scope.input_tags;
      if ($scope.request && $scope.request.tags && $scope.request.tags.indexOf(tags_input) === -1) {
        $scope.request.tags.push(tags_input);
        $scope.input_tags = '';
        document.getElementById('tags-input').value = '';
        $scope.closeTagsModal();
      }

    }


    $scope.$on('modal.shown', function() {

      if ($scope.tagsModal && $scope.tagsModal.isShown()) {

        $timeout(function() {

            //focus on keyboard
            var tags_input = document.getElementById('tags-input');

            //focus the input
            tags_input.focus();


            tags_input.addEventListener( 'keyup', function( e ) {
                if(e.which === 13 && tags_input.value.length > 0) {
                    $scope.saveTag();
                }
            } );

        }, 1500);


      }

    });

  }


])