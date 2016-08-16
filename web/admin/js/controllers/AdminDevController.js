angular.module('uguru.admin')
.controller('AdminDevController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'UtilitiesService',
  'AdminService',
  function($scope, $state, $timeout, UtilitiesService, AdminService) {
    var admin = this;

    admin.calendarDates = AdminService.getUpcomingCalendar(14);

  }
]);