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
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate) {

    var today = new Date();
    var nextMonthDays = new Date(today.getYear(), today.getMonth(), 0).getDate();
    $scope.calendarMoversShown = false;

    $scope.showDateTabs = false;
    $scope.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $scope.calendar = {

                        date: {offset: 0},
                        selected_custom_date:'Date',
                        weekday_offset: (today.getDay()) + 2 % 7,
                        start_date: (today.getDate()) + 2,
                        next_month_length: nextMonthDays,
                        offset_length: 12,
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
          } else
          if (index === 2 && !date_index) {
            $scope.showDateTabs = true;
            $scope.toggleCalendarHeight(true);
          }
          else {
            $scope.toggleCalendarHeight(false);
            $scope.calendar.date.offset = index + date_index;
            var weekday = $scope.weekdays[(date_index + $scope.calendar.weekday_offset) % 7];
            var date = actual_date;
            $scope.calendar.selected_custom_date = weekday.toString() + ' ' + date.toString();
            $scope.showDateTabs = false;
            $scope.date_index = null;
          }
        }
      }

    });

    var generateTargets = function () {
      //grab first row
      hour_rows = document.getElementsByClassName('calendar-date-row');
      first_row = hour_rows[0];
      last_row = hour_rows[hour_rows.length - 2];

      starting_point = first_row.getBoundingClientRect().top;
      ending_point = last_row.getBoundingClientRect().top + last_row.getBoundingClientRect().height;

      height = (ending_point - starting_point) / 48;

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
        console.log('event doesnt exist.. quitting')
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
    }

    // window.dragMoveListener = dragMoveListener;
    $scope.resize_mode = false;

    // generatedTargets = generateTargers();

    var initDraggables = function() {

      var snap_targets = generateTargets();
      $timeout(function() {
        if (!$scope.calendarMoversShown) {
          document.getElementById('drag-point-top').style.display = "absolute";
          document.getElementById('drag-point-bottom').style.display = "absolute";
          $timeout(function() {
            var new_event = new Event('drag');
            new_event.initTouchEvent();

            document.getElementById('drag-point-top').dispatchEvent(new_event);
          }, 500)
          // $timeout(function() {
          //   document.getElementById('drag-point-top').click();
          // }, 250);
        }
      }, 500)

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

            if (!$scope.calendarMoversShown) {
              document.getElementById('drag-point-top').style.display = "inline-block"
              document.getElementById('drag-point-bottom').style.display = "inline-block"
              $scope.calendarMoversShown = true;
            }

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

        })

    }





  }


])