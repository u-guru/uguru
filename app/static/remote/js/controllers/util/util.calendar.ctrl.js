angular.module('uguru.util.controllers')

.controller('CalendarModalController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicHistory',
  '$stateParams',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $ionicHistory, $stateParams) {



    $scope.day_split_segments = 24;
    $scope.default_num_days = 2;
    $scope.day_rows = [];
    $scope.modalShown = false;
    // $scope.root.vars.request = {calendar: {}};

    //guru mode only - ignore for now
    $scope.proposal = null;

    $scope.hideModal = function() {
      if ($scope.modalShown) {
        $scope.modalShown = false;
        $scope.calendarModal.hide();
      }
    }

    $scope.paint = function(calendar_grid, color) {
      if (!calendar_grid) {
        calendar_grid = $scope.calendar.data;
      }

      if ($scope.user.guru_mode) {
        console.log('calendar_grid', calendar_grid);
      }

      var count = 0;
      var todays_date = new Date().getUTCDate()
      $timeout(function() {

        for (var i = 0; i < calendar_grid.length; i++) {
        js_time = new Date(calendar_grid[i].start_time);
        event_date = js_time.getUTCDate();
        event_hours = js_time.getUTCHours();
        offset_date = event_date - todays_date;
        console.log(event_date, offset_date);
        var target = $scope.getElementbyCalenderWidthHeight(offset_date, event_hours);
        if (!color) {
          target.style.background = 'grey';
          target.style.color = 'white';
          target.childNodes[0].background = 'grey';
          if ($scope.user.proposals.length < 2) {

            $timeout(function() {
              var template_string = '<span style="background-color:grey; padding:0px 15px;">&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;Times student has chosen</br><br>Tap any of these that you can also make!</span>'
              $scope.success.show(1000,2000, template_string);
            })

          }
        }
        // else {
          if (target) {
            // console.log(JSON.stringify(target));
            // target.background = '#68b2a5';
            // target.style.color = 'white';
            // target.childNodes[0].background = '#68b2a5';
          }
        // }
      }

      },1000)

        // if (calendar_grid[j][i].start_time) {
        //   var target = $scope.getElementbyCalenderWidthHeight(j, i);
        //   target.style.background = 'grey';
        //   target.style.color = 'inherit';
        // }
    }

    $scope.processStudentCalendar = function(student_calendar) {
      num_columns = student_calendar.length;
      for (var i = 0; i < num_columns; i ++) {
          start_time = student_calendar[i]['start_time']
          end_time = student_calendar[i]['end_time']
          console.log(start_time, end_time);
      }
      return student_calendar;
    }

     $scope.getElementbyCalenderWidthHeight = function(width, height) {
      var target_element_str = width + ',' + height;
      var target_element = document.getElementById(target_element_str);
      return target_element;
    }

    $scope.goBackToRequests = function() {
      $ionicHistory.goBack();
    };

    $scope.validateForm = function() {

      if ($scope.calendar.num_selected > 0) {
        $ionicHistory.goBack();
      } else {
        alert('Please select at least one option');
      }
    }


    $scope.goBack = function() {
      $ionicHistory.goBack();
    };

    $scope.initCalendar = function() {
      if ($scope.user.guru_mode && $stateParams && $stateParams.proposalObj) {
        $scope.calendar = {
              width: 2,
              height: 24,
              num_selected:0
        }

        $scope.proposal = JSON.parse($stateParams.proposalObj);
        console.log('proposal', $scope.proposal);
        //create student_calendar
        $scope.student_calendar = $scope.processStudentCalendar($scope.proposal.student_calendar[0].calendar_events);


        $scope.paint($scope.student_calendar);
        //parse the proposal
        $scope.root.vars.request = {}
        $scope.root.vars.request.calendar = $scope.calendar;
      }


      //student is viewing the calendar
      else if (!$scope.user.guru_mode && $stateParams.proposalObj) {

          $scope.calendar = {
              width: 2,
              height: 24,
              num_selected:0
          }

          $scope.request = JSON.parse($stateParams.proposalObj);
          console.log('request',$scope.request);

          $scope.student_calendar = $scope.processStudentCalendar($scope.request.student_calendar[0].calendar_events);
          $scope.paint($scope.student_calendar);
          // $scope.paint($scope.guru_calendar, '#68b2a5');
          $scope.viewOnly = true;

          $scope.root.vars.request = {}
          $scope.root.vars.request.calendar = $scope.calendar;
      }
      //if no calendar
      if (!$scope.calendar) {
          $scope.calendar = {
              width: 2,
              height: 24,
              num_selected:0
          }
      }

    }

    $scope.goToConfirmProposal = function() {

      // console.log($scope.formatCalendarEventJson($scope.calendar.data));
      $scope.proposal.guru_calendar = $scope.formatCalendarEventJson($scope.calendar.data).slice();
      console.log('guru calendar', JSON.stringify($scope.proposal.guru_calendar[0][3]));
      $state.go('^.guru-confirm-proposal', {proposalObj:JSON.stringify($scope.proposal)});
    }

    var generateCalendarDataStorage = function(width, height) {
          var data_arr = new Array(width);
            for (var i = 0; i < width; i++) {
              data_arr[i] = new Array(height);
          }
          return data_arr;
    }

    //initiate calendar
    $scope.initCalendar();

    $scope.calendar.data = generateCalendarDataStorage($scope.calendar.width, $scope.calendar.height)
    $scope.root.vars.request.calendar.data = generateCalendarDataStorage($scope.calendar.width, $scope.calendar.height);

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
            target.style.color = 'inherit';
            target.childNodes[0].background = 'white';
          } else {
            calendar_grid[j][i] = false;
            var target = $scope.getElementbyCalenderWidthHeight(j, i);
            target.style.background = 'white';
            target.style.color = 'inherit';
            target.childNodes[0].background = 'white';
          }
        }
      }
      $scope.root.vars.request.calendar_selected = false;
      $scope.root.vars.calendar_should_be_empty = null;
      return count;
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
      return calendar_grid;

    }

    //give me that 'day' of the month. So if today was March 11, 2015, just give me 11, nothing else;
    $scope.getDayTimeFromNumDays = function(num) {

    }

    $scope.$on('modal.shown', function(){
      console.log($scope.student_calendar);
      if ($scope.student_calendar) {
        $scope.calendar.student_request = $scope.student_calendar;
        $scope.processStudentCalendar($scope.calendar.student_request);
      }

      if ($scope.calendarModal.isShown() && !$scope.modalShown) {
        $scope.modalShown = true;

      }

    });

    $scope.countCalendarSelected = function(calendar_grid) {
      var count = 0
      for (var i = 0; i < calendar_grid[0].length; i++) {
        for (var j = 0; j < calendar_grid.length; j++) {
          if (!$scope.user.guru_mode && calendar_grid[j][i]) {
            count += 1;
          }

          if ($scope.user.guru_mode && typeof(calendar_grid[j][i]) === "boolean" && calendar_grid[j][i]) {
            count += 1;
          }

        }
      }
      return count;
    }

    $scope.triggerCalendarClick = function($event, calendar_x, calendar_y) {
      console.log($event.target.parentNode);
      $scope.clickCalendarGridElement(null, calendar_x, calendar_y, $event.target.parentNode);
    }

    $scope.clickCalendarGridElement = function($event, calendar_x, calendar_y, _target) {

      if ($scope.viewOnly) {
        return;
      }

      //get color of clicked target
      if ($event) {
        var target = $event.target;
        var targetBgColor = target.style.background;
      } else {
        var target = _target;
        var targetBgColor = target.style.background;
      }

      //A calendar item was selected
      console.log(targetBgColor);
      //if student mode & clicked
      if (!$scope.user.guru_mode && (!targetBgColor || targetBgColor === 'white')) {
        $scope.calendar.data[calendar_x][calendar_y] = true;
        $scope.root.vars.request.calendar.data[calendar_x][calendar_y] = true;
        target.style.background = '#6C87B0';
        target.style.color = 'white';
        target.childNodes[0].background = '#6C87B0';
      } else if ($scope.user.guru_mode && (targetBgColor === 'rgb(128, 128, 128)')) {
        $scope.calendar.data[calendar_x][calendar_y] = true;
        $scope.root.vars.request.calendar.data[calendar_x][calendar_y] = true;
        target.style.background = '#6C87B0';
        target.style.color = 'white';
        target.childNodes[0].background = '#6C87B0';
      } else if ($scope.user.guru_mode && targetBgColor === 'rgb(108, 135, 176)') {
        $scope.calendar.data[calendar_x][calendar_y] = false;
        $scope.root.vars.request.calendar.data[calendar_x][calendar_y] = false;
        target.style.background = 'rgb(128, 128, 128)';
        target.style.color = 'white';
        target.childNodes[0].background = 'rgb(128, 128, 128)';
      }
      //A calendar item was unselected selected
      else {
        $scope.calendar.data[calendar_x][calendar_y] = false;
        $scope.root.vars.request.calendar.data[calendar_x][calendar_y] = false;
        target.style.background = 'white';
        target.style.color = 'rgba(0,0,0,0.8)';
        target.childNodes[0].background = 'white';
      }


      $scope.calendar.num_selected = $scope.countCalendarSelected($scope.calendar.data);
      console.log($scope.calendar.num_selected);
      $scope.root.vars.request.calendar_selected = true;

      // $scope.formatCalendarEventJson($scope.calendar.data);
    }

    $scope.$on('$ionicView.beforeEnter', function(){
      if ($scope.root.vars.calendar_should_be_empty) {
        $scope.clear();

        $scope.initCalendar();

        $scope.calendar.data = generateCalendarDataStorage($scope.calendar.width, $scope.calendar.height)
        $scope.root.vars.request.calendar.data = generateCalendarDataStorage($scope.calendar.width, $scope.calendar.height);

        // $scope.day_rows = generateCalendarDataStorage($scope.calendar.height, 1);
        // $scope.day_columns = generateCalendarDataStorage($scope.calendar.width, 1);
      }
    });

  }

])