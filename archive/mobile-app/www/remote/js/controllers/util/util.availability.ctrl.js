angular.module('uguru.util.controllers')

.controller('AvailabilityController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicScrollDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate, $ionicScrollDelegate) {

    var today = new Date();
    var nextMonthDays = new Date(today.getYear(), today.getMonth(), 0).getDate();

    $scope.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $scope.full_weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.hours = ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm',
                    '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'];
    $scope.cssHour = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
                    '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9 m', '10pm', '11pm'];
    $scope.dates = [];
    $scope.currentTime = today.getHours();

    function setDate(currentDay,number)
    {
      currentDay.setDate(number);
      var day = {
                  name : $scope.weekdays[(currentDay.getDay())%7],
                  month: (currentDay.getMonth()+1),
                  date : currentDay.getDate(),
                  schedule : initSchedule()
      }
      return day
    }
 
    function initSchedule()
    {
      //init empty schedule()
      var timeline = []
        for (var i = 0 ; i < $scope.hours.length; ++i)
        {
            var time = {
                hour : $scope.hours[i],
                isPass : false
            };
            timeline.push(time);
        }
        return timeline;
    };
    function filterPassedTime (schedule)
    { 
      var tempSch = schedule;
      for (var i = 0 ; i < $scope.currentTime; ++i)
      {
        tempSch[i].isPass = true;
      }
      return tempSch;

    }


    var tempDate = new Date();

    for (var i = tempDate.getDate(), count =0 ; count < 7; ++ i,++count)
      $scope.dates.push(setDate(tempDate,i))
      $scope.dates[0].schedule= filterPassedTime( $scope.dates[0].schedule);

    $scope.calendarMoversShown = false;

    $scope.showDateTabs = false;
    
    $scope.calendar = {

                        date: {
                           offset: 0,
                           date:today.getDate(),
                           month: today.getMonth() + 1,
                           formatted_date: $scope.weekdays[today.getDay()] + ' ' + today.getDate()
                         },

                        selected_custom_date:'Date',
                        weekday_offset: (today.getDay()) + 2 % 7,
                        start_date: (today.getDate()) + 2,
                        next_month_length: nextMonthDays,
                        offset_length: 12,
                        selected_time: {
                          start_time: {
                            hour: null,
                            minute:null
                          },
                          end_time: {
                            hour: null,
                            minute: null
                          }
                        },
                        coords: {
                          calendarTopY: null,
                          calendarBottomY: null,
                          currentTopY: null,
                          currentHeight: null,
                          chunkHeights: {hour:null, thirty:null},
                        },
                      };

    $scope.handle = $ionicTabsDelegate.$getByHandle('availability-handle');

    $scope.getNumber = function(num) {
        return new Array(num);
    }

    $scope.toggleCalendarHeight = function (bool) {
      if (bool) {
        document.getElementById('calendar-content').style.top = "133px";
      } else {
        document.getElementById('calendar-content').style.top = "96px";
      }
    }

    $scope.$on('modal.shown', function() {

      if ($scope.availabilityModal.isShown()) {

        $timeout(function() {
          initDraggables();
        }, 1000);

        $scope.onAvailabilityTabSelected = function(date_index, actual_date) {
          var index = $scope.handle.selectedIndex();
          if (index < 2) {
            $scope.calendar.date.offset = index;
            $scope.toggleCalendarHeight(false);
            var date = today.getDate() + index;

            var weekday = $scope.weekdays[(date % 7)];
            $scope.calendar.date.formatted_date =  weekday.toString() + ' ' + date.toString();
          } else
          if (index === 2 && !date_index && date_index !== 0) {
            $scope.calendar.date.offset = index;
            $scope.showDateTabs = true;
            $scope.toggleCalendarHeight(true);
            var date = today.getDate() + index;
            $scope.calendar.date.date = date;
            var weekday = $scope.weekdays[(date + $scope.calendar.weekday_offset) % 7];
            $scope.calendar.date.formatted_date = weekday.toString() + ' ' + date.toString();
          }
          else {
            $scope.toggleCalendarHeight(false);
            $scope.calendar.date.offset = index + date_index + 1;
            var weekday = $scope.weekdays[(date_index + $scope.calendar.weekday_offset) % 7];
            $scope.calendar.date.weekday = weekday.toString();
            var date = actual_date;
            $scope.calendar.date.date = date;
            $scope.calendar.selected_custom_date = weekday.toString() + ' ' + actual_date.toString();
            $scope.calendar.date.formatted_date = $scope.calendar.selected_custom_date;
            $scope.showDateTabs = false;
            $scope.date_index = null;
          }
        }

        $timeout(function() {

          if (!$scope.request.calendar_edit) {
            var _7am_row = document.getElementById('8AM');
            height  = _7am_row.getBoundingClientRect().top;
            $ionicScrollDelegate.$getByHandle('calendar').scrollTo(0, height * 0.7);
          }


        }, 500);

      }

    });


    function getPosition(element) {
      var xPosition = 0;
      var yPosition = 0;

      while(element) {
          xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
      }
      return { x: xPosition, y: yPosition };
    }

    $scope.getCalendarEventRect = function() {
      var calendar_rows = document.getElementById('calendar-rows');
      var client_rect = calendar_rows.getBoundingClientRect();
      var element = getPosition(calendar_rows);

    }

    $scope.getChunksInBetween = function() {
      //get calendar rect
      //get current top height
      //get bottom height
      //
    }


    //updates all the numbers in between (the blue)
    $scope.postDragCalendarUpdate = function() {

    }



    //updates the blue text at the end of drag move
    // $scope.get

    var generateTargets = function () {
      //grab first row
      hour_rows = document.getElementsByClassName('calendar-date-row');
      first_row = hour_rows[0];
      last_row = hour_rows[hour_rows.length - 2];

      starting_point = first_row.getBoundingClientRect().top;
      ending_point = last_row.getBoundingClientRect().top + last_row.getBoundingClientRect().height;

      height = (ending_point - starting_point) / 48;

      $scope.calendar.coords.calendarTopY = Math.round(starting_point);
      $scope.calendar.coords.calendarBottomY = Math.round(ending_point);


      $scope.calendar.coords.chunkHeights.hours = Math.round(height * 2);
      $scope.calendar.coords.chunkHeights.thirty = Math.round(height);

      calendar_event_rect = document.getElementById('calendar-event').getBoundingClientRect();
      $scope.calendar.coords.currentTopY = Math.round(calendar_event_rect.top - $scope.calendar.coords.calendarTopY);
      $scope.calendar.coords.currentHeight = Math.round(calendar_event_rect.height);


      var result_targets = [];
      //grab last row

      for (var i = 0; i < 48; i ++) {
        result_targets.push({

          y: starting_point + height * i,
          range: height / 2
        })
      }

      return result_targets;

      //get height

      //create hotspots to always snap

    }

    function dragMoveListener (event) {

      if (!event) {
        return;
      }
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);

      $scope.updateCalendarMargins();

       $scope.getTimeBasedOnStartAndHeight($scope.calendar.coords.currentTopY, $scope.calendar.coords.currentHeight,
        $scope.calendar.coords.chunkHeights.hours, $scope.calendar.coords.chunkHeights.thirty);

    }

    // window.dragMoveListener = dragMoveListener;
    $scope.resize_mode = false;

    // generatedTargets = generateTargers();

    var initDraggables = function() {

      var snap_targets = generateTargets();


      interact('.draggable-event')
        .draggable({
          inertia: false,
          onmove: dragMoveListener,
          restrict: {
            restriction: 'parent',
            // endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          },
          snap: {
            targets: snap_targets
          },
          axis: "y"
        })
        .resizable({
          edges: { bottom: true, top: true },
          inertia: false,
          endOnly:true,
          snap: {
            targets: snap_targets
          }
        }).on('resizemove', function(event) {

            // if (!$scope.calendarMoversShown) {
            //   document.getElementById('drag-point-top').style.display = "inline-block"
            //   document.getElementById('drag-point-bottom').style.display = "inline-block"
            //   $scope.calendarMoversShown = true;
            // }

           var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);


            // update the element's style
            target.style.width  = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';


            x += event.deltaRect.left;
            y += (event.deltaRect.top  * 1);



            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y );
            $scope.resize_mode = false;

            $scope.updateCalendarMargins();

            $scope.getTimeBasedOnStartAndHeight($scope.calendar.coords.currentTopY, $scope.calendar.coords.currentHeight,
              $scope.calendar.coords.chunkHeights.hours, $scope.calendar.coords.chunkHeights.thirty);


            // $scope.getCalendarEventRect()

        })

    }

    $scope.saveRequestInfo = function() {
      $scope.saveRequestInfo();
    }


    $scope.updateCalendarMargins = function() {
      calendar_event_rect = document.getElementById('calendar-event').getBoundingClientRect();

      $scope.calendar.coords.currentTopY = Math.round(calendar_event_rect.top - $scope.calendar.coords.calendarTopY);

      $scope.calendar.coords.currentHeight = Math.round(calendar_event_rect.height);
      if ($scope.request && !$scope.request.calendar_edit) {
        $scope.request.calendar_edit = true;
        window.location.hash = '';
      }
    }

    $scope.formatMinutes = function(minutes) {
      if (minutes === 0) {
        return "00";
      } else {
        return "30";
      }
    }

    var roundHalf = function (num) {
       return Math.round(num*2)/2;
    }

    $scope.getTimeBasedOnStartAndHeight = function(start_y, height, hour_chunk, thirty_chunk) {

      start_hour = roundHalf(start_y / hour_chunk);
      end_hour = roundHalf((start_y + height) / hour_chunk)

      $scope.calendar.selected_time.start_time.hours = parseInt(start_hour)
      $scope.calendar.selected_time.start_time.minutes = Math.abs(parseInt(start_hour) -  start_hour) * 60;
      $scope.calendar.selected_time.end_time.hours = parseInt(end_hour)
      $scope.calendar.selected_time.end_time.minutes = Math.abs(parseInt(end_hour) -  end_hour) * 60;
    }

    $scope.formatHours = function(hours) {
      hours = Math.round(hours, 2);
      result = '';
      if (hours === 0) {
          return "12 PM";
      } else if (hours < 12) {

          return hours + 'AM';
      }

      else if (hours === 12 ) {
        return "12 PM";
      }

      else if (hours < 24 ){

        return (12 % hours) + "PM" ;

      }
    }

    $scope.formatHoursAndMinutes = function(date_obj, is_end_time) {
      var hours = date_obj.hours;
      var minutes = date_obj.minutes;

      result = ''

      //if 12am
      if (hours === 0 || hours === 12) {
        result += '12';
      }

      else if (hours > 0 && hours < 12) {
        result += hours;
      }

      else if (hours > 12 && hours <= 23) {
        result += hours % 12
      }



      //format minutes
      if (minutes > 0 && minutes === 30) {
        result += ':30'
      }

      if (is_end_time && hours >= 12) {
        result += 'pm';
      }

      if (is_end_time && hours < 12) {
        result += 'am';
      }

      return result

    }


    $scope.saveRequestInfo = function() {

       $scope.getTimeBasedOnStartAndHeight($scope.calendar.coords.currentTopY, $scope.calendar.coords.currentHeight,
        $scope.calendar.coords.chunkHeights.hours, $scope.calendar.coords.chunkHeights.thirty);


      $scope.request.calendar.start_time = $scope.calendar.selected_time.start_time;
      $scope.request.calendar.end_time = $scope.calendar.selected_time.end_time;


      $scope.request.calendar.start_time.formatted = $scope.formatHoursAndMinutes($scope.request.calendar.start_time, false)
      $scope.request.calendar.end_time.formatted = $scope.formatHoursAndMinutes($scope.request.calendar.end_time, true)

      //get todays information for some reason
      $scope.request.calendar.date.offset = $scope.calendar.date.offset;
      $scope.request.calendar.date.day = $scope.calendar.date.date;
      $scope.request.calendar.date.month = today.getMonth();
      $scope.request.calendar.date.year = today.getYear();


      // $scope.calendar.







      //update the length of time
      $scope.request.calendar.date.formatted_date = $scope.calendar.date.formatted_date;
      $scope.request.time_estimate.hours = ($scope.request.calendar.end_time.hours - $scope.request.calendar.start_time.hours)

      $scope.request.time_estimate.minutes = Math.abs($scope.request.calendar.end_time.minutes - $scope.request.calendar.start_time.minutes);


      $scope.closeAvailabilityModal();

  }

}


])