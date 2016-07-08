angular.module('uguru.admin')

.controller('AdminDocsController', [
  '$scope',
  '$state',
  'RootService',
  '$timeout',
  '$filter',
  'AdminDirectiveService',
  function($scope, $state, RootService, $timeout, $filter, AdminDirectiveService) {
    var docs = this;

    if (!$scope.root||!$scope.root.docs) {
      $scope.root = {};
      $scope.root.docs = {items: RootService.getDocItems(), searchText:'', resultIds: [], resultItems:[]};
    }

    docs.items = [];

    docs.main  = {index: 0, options: ["Notes", "Utility", "Components", "Directives", "Status/Tools", "Research"]};

    docs.search = function(letters) {
        console.log(letters);
    }

    docs.directives = AdminDirectiveService.getAllDirectives()

    docs.getSearchTerms = function() {
      docs.items = RootService.getDocItems();
    }

    docs.searchText = '';

    $scope.$watch('root.docs.searchText', function(value) {
      $timeout(function() {
        $scope.root.docs.resultItems = $filter('filter')($scope.root.docs.items, {keywords: value}, true);
          $scope.root.docs.resultIds = $scope.root.docs.resultItems.map(function(item, index) { return item.id});
          var docItemElems = document.querySelectorAll('[doc-item-id]');
          for (var i = 0; i < docItemElems.length; i++) {
            var elemId = parseInt(docItemElems[i].getAttribute('doc-item-id'));
            if (!($scope.root.docs.resultIds.indexOf(elemId) > -1)) {
               docItemElems[i].classList.add('hide-doc-item');
            } else {
              docItemElems[i].classList.add('show-doc-item');
            }
          }
      })
                // for (var i = 0; i < results.length; i++) {
                //   $scope.root.docs.items
                // }

    })

  }

])
