angular.module('uguru.admin')

.controller('AdminDocsController', [
  '$scope',
  '$state',
  function($scope, $state) {
    var docs = this;

    docs.directives = {};

    docs.main  = {index: 2, options: ["Notes", "Utility", "Components", "Directives", "Status/Tools"]};

    docs.search = function(words) {}

    docs.searchText = '';

  }

])
