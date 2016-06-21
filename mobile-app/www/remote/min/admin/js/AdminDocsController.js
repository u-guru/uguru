angular.module('uguru.admin')

.controller('AdminDocsController', [
  '$scope',
  '$state',
  function($scope, $state) {
    var docs = this;

    docs.directives = {};
<<<<<<< HEAD
    docs.main  = {index: 3, options: ["Notes", "CSS+Classes", "Components", "Directives", "Status/Tools"]};
=======
    docs.main  = {index: 2, options: ["Notes", "Utility", "Components", "Directives", "Status/Tools"]};
>>>>>>> 825a620cca9350ceb1f62c7d78f31e27a7481e4e



    docs.search = function(words) {}

    docs.searchText = '';

  }

])
