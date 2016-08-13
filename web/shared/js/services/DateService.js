angular.module('uguru.shared.services')
.factory("DateService", [
    '$timeout',
    '$state',
    DateService
        ]);

function DateService($timeout, $state) {
      return {getShortDayName: getShortDayName}

      function getShortDayName(day){
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
      }
  }
