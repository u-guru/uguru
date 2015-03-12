angular.module('uguru.util.controllers')

.controller('CalendarModalController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate) {

      $scope.day_split_segments = 24;
      $scope.default_num_days = 2;
      $scope.day_rows = [];
      $scope.modalShown = false;

    $scope.hideModal = function() {
      if ($scope.modalShown) {
        $scope.modalShown = false;
        $scope.calendarModal.hide();
      }
    }

    if (!$scope.calendar) {

      $scope.calendar = {
          width: 2,
          height: 24,
          num_selected:0
      }


    }
    var generateCalendarDataStorage = function(width, height) {
          var data_arr = new Array(width);
            for (var i = 0; i < width; i++) {
              data_arr[i] = new Array(height);
          }
          return data_arr;
    }

    $scope.calendar.data = generateCalendarDataStorage($scope.calendar.width, $scope.calendar.height)

    $scope.day_rows = generateCalendarDataStorage($scope.calendar.height, 1);
    $scope.day_columns = generateCalendarDataStorage($scope.calendar.width, 1);

    for (var i = 0; i < $scope.day_rows.length; i ++) {
          $scope.day_rows[i] = i;
    }

    for (var i = 0; i < $scope.day_columns.length; i ++ ) {
      $scope.day_columns[i] = i;
    }

    $scope.clear = function(calendar_grid) {
      calendar_grid = $scope.calendar.data;
      $scope.calendar.num_selected = 0;
      var count = 0
      for (var i = 0; i < calendar_grid[0].length; i++) {
        for (var j = 0; j < calendar_grid.length; j++) {
          if (calendar_grid[j][i]) {
            calendar_grid[j][i] = false;
            var target = $scope.getElementbyCalenderWidthHeight(j, i);
            target.style.background = 'white';
          }
        }
      }
      return count;
    }

    $scope.getElementbyCalenderWidthHeight = function(width, height) {
      var target_element_str = width + ',' + height;
      var target_element = document.getElementById(target_element_str);
      return target_element;
    }


    $scope.hideModalAndSave = function() {
      if (!$scope.calendar.num_selected) {
        $scope.root.dialog.alert('Please select at least one time', 'Oops!', 'OK', null);
        return;
      }

      if ($scope.modalShown) {
        $scope.modalShown = false;
        $scope.formatCalendarEventJson($scope.calendar.data);
        $scope.calendarModal.hide();
      }
    }



    $scope.getSelectedCalendarCoordinates = function() {



    }

    // return string format of time --> 0 --> "12:00am"
    $scope.generateDaySegmentArr = function(size) {
      var result = new Array(size);
      for (var i = 0; i < size; i++) {
        result[i] = i;
      }
      return result;
    }

    $scope.getTimeFromHourInt = function(num) {
      var result;
      if (num === 0) {
        result = "12 am"
      } else
      if (num <= 11) {
        result = num + ' am';
      } else
      if (num === 12) {
        result = "12 pm";
      } else
      if (num > 12 && num < 25) {
        result = (num - 12) + ' pm';
      }
      return result;
    }


    $scope.isStudentMode = function() {

      if (!$scope.user.guru_mode) {
        return true;
      }
      return false;
    }

    $scope.isMutual = function(calendar_x, calendar_y, student_calendar) {
      return false;
    }

    $scope.formatCalendarEventJson = function(calendar_grid) {

      for (var i = 0; i < calendar_grid[0].length; i++) {
        for (var j = 0; j < calendar_grid.length; j++) {
          // calendar_grid[j][i] = {};
          if (calendar_grid[j][i]) {
            calendar_grid[j][i] = {
              start_time:i,
              end_time: i + 1,
              is_student : $scope.isStudentMode(),
              is_guru : !$scope.isStudentMode(),
              is_mutual : $scope.isMutual()
            }
          } else {
            calendar_grid[j][i] = {};
          }
        }
      }

    }

    //give me that 'day' of the month. So if today was March 11, 2015, just give me 11, nothing else;
    $scope.getDayTimeFromNumDays = function(num) {

    }

    $scope.$on('modal.shown', function(){

      if ($scope.calendarModal.isShown() && !$scope.modalShown) {
        $scope.modalShown = true;

      }

    });

    $scope.countCalendarSelected = function(calendar_grid) {
      var count = 0
      for (var i = 0; i < calendar_grid[0].length; i++) {
        for (var j = 0; j < calendar_grid.length; j++) {
          if (calendar_grid[j][i]) {
            count += 1;
          }
        }
      }
      return count;
    }

    $scope.clickCalendarGridElement = function($event, calendar_x, calendar_y) {
      var target = $event.target;
      var targetBgColor = target.style.background;
      if (targetBgColor == 'white') {
        $scope.calendar.data[calendar_x][calendar_y] = true;
        target.style.background = 'green';
      } else {
        $scope.calendar.data[calendar_x][calendar_y] = false;
        target.style.background = 'white';

      }

      $scope.calendar.num_selected = $scope.countCalendarSelected($scope.calendar.data);
    }

  }

])