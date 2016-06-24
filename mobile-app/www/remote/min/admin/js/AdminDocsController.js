angular.module('uguru.admin')

.controller('AdminDocsController', [
  '$scope',
  '$state',
  'RootService',
  '$timeout',
  function($scope, $state, RootService, $timeout) {
    var docs = this;

    docs.directives = {};
    docs.items = [];

    docs.main  = {index: 2, options: ["Notes", "Utility", "Components", "Directives", "Status/Tools", "Research"]};

    docs.search = function(letters) {
        console.log(letters);
    }

    docs.getSearchTerms = function() {
      docs.items = RootService.getDocItems();
    }

    docs.searchText = '';



  }

])
