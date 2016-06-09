angular.module('uguru.admin')

.controller('AdminDocsController', [
  '$scope',
  '$state',
  function($scope, $state) {
    var docs = this;

    docs.directives = {};
    docs.main  = {index: 0, options: ["Notes", "CSS+Classes", "Components", "Directives", "Status/Tools"]};
  }

])