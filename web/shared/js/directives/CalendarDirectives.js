angular.module('uguru.shared.directives')
.directive('date', function () {
    return {
        templateUrl: 'shared/templates/components/calendar/date.tpl',
        restrict: 'E',
        link: function preLink(scope, element, attr) {
          scope.date = attr.date || new Date().getDate();
          scope.day = attr.day;
        }
    };
})
.directive('week', ['DateService', function (DateService) {
    return {
        templateUrl: 'shared/templates/components/calendar/week.tpl',
        restrict: 'E',
        replace: true,
        link: function preLink(scope, element, attr) {
          var today = new Date()
          var numWeeks = attr.num || 1;
          scope.dates = [];
          var iDate = today;
          for (var i = 0; i < 7* parseFloat(numWeeks); i++) {
            scope.dates.push({
              date: iDate.getDate(),
              day: DateService.getShortDayName(iDate.getDay())
            })
            iDate.setDate(iDate.getDate() + 1);
          }

          // scope.dates = attr.date || new Date().getDate();
          // scope.day = attr.day;
        }
    };
}]);
