angular
.module('sharedServices')
.factory("CalendarService", [
  CalendarService
	]);

function CalendarService() {


  return {

    initRequestCalendar: initRequestCalendar,
    getNextSevenDaysArr: getNextSevenDaysArr,
    getCalendarSelected: getCalendarSelected,
    processServerCalenderToClient: processServerCalenderToClient

  }

  //step two
  //addEventToCalendar

  function initRequestCalendar() {

  }

  function processServerCalenderToClient(calendar, tz_offset) {
    return calendar;
  }

  function selectCalendarInterval(interval, cb) {
    interval.selected = !interval.selected;
    cb && cb();
  }

  function getCalendarRanges(arr) {
    var allRanges = [];
    if (!arr || !arr.length) {
      return;
    }
    var currentRange = initDateRange(arr[0]);

    var consecRangeSequence = true;
    for (var i = 1; i < arr.length; i++) {
      var indexRange = arr[i];
      //start a new range
      if (!currentRange) {
        currentRange = initDateRange(arr[i]);
        continue;
      } else
      if (indexRange.js_obj_start === currentRange.end_time || (currentRange.end_time - currentRange.js_obj_start) < 5) {
        currentRange.end_time = indexRange.js_obj_end;
        currentRange.ranges.push(indexRange);
      } else {
        // currentRange.end_time = indexRange.js_obj_end;
        // currentRange.ranges.push(indexRange);
        currentRange.startDayShort = currentRange.ranges[0].dayObj.dayShort;
        currentRange.startDate = currentRange.ranges[0].dayObj.date;
        currentRange.startHour = currentRange.ranges[0].start_hour;
        currentRange.startMinutes = currentRange.ranges[0].start_minute;
        currentRange.startSuffix = currentRange.ranges[0].suffix;
        currentRange.endDayShort = currentRange.ranges[currentRange.ranges.length - 1].dayObj.dayShort;
        currentRange.endDate = currentRange.ranges[currentRange.ranges.length - 1].dayObj.date;
        currentRange.endHour = currentRange.ranges[currentRange.ranges.length - 1].end_hour;
        currentRange.endMinutes = currentRange.ranges[currentRange.ranges.length - 1].end_minute;
        currentRange.endSuffix = currentRange.ranges[currentRange.ranges.length - 1].suffix;
        allRanges.push(currentRange);
        currentRange = initDateRange(arr[i]);
      }
    }

    if (currentRange && currentRange.end_time && currentRange.ranges.length) {
      currentRange.startDayShort = currentRange.ranges[0].dayObj.dayShort;
      currentRange.startDate = currentRange.ranges[0].dayObj.date;
      currentRange.startHour = currentRange.ranges[0].start_hour;
      currentRange.startMinutes = currentRange.ranges[0].start_minute;
      currentRange.startSuffix = currentRange.ranges[0].suffix;
      currentRange.endDayShort = currentRange.ranges[currentRange.ranges.length - 1].dayObj.dayShort;
      currentRange.endDate = currentRange.ranges[currentRange.ranges.length - 1].dayObj.date;
      currentRange.endHour = currentRange.ranges[currentRange.ranges.length - 1].end_hour;
      currentRange.endMinutes = currentRange.ranges[currentRange.ranges.length - 1].end_minute;
      currentRange.endSuffix = currentRange.ranges[currentRange.ranges.length - 1].suffix;
      allRanges.push(currentRange);
    }
    for (var i = 0; i < allRanges.length; i++) {
      var indexRange = allRanges[i];
    }
    return allRanges;

    function initDateRange(date_interval) {
      return {start_time: date_interval.js_obj_start, end_time: date_interval.js_obj_end, ranges:[date_interval]};
    }
  }

  function getCalendarSelected() {
    return function(scope) {
      var calendar = scope.requestForm && scope.requestForm.calendar;
      var resultArr = [];
      var resultArrDay = [];
      for (var i = 0; i < calendar.length; i++) {
        var indexDay = calendar[i];
        indexDay.selected = [];
        for (var j = 0; j < indexDay.hours.length; j++) {
          var indexHour = indexDay.hours[j];
          for (var k = 0; k < indexHour.intervals.length; k++ ) {
            var indexInterval = indexHour.intervals[k];
            if (indexInterval.selected) {
              indexInterval.dayObj = indexDay;
              indexInterval.hourObj = indexHour;
              resultArr.push(indexInterval);
              indexDay.selected.push(indexInterval);
            }
          }
        }
        if (indexDay.selected && indexDay.selected.length) {
          resultArrDay.push(indexDay);
        }
      }
      scope.requestForm.calendar_selected = resultArr;
      scope.requestForm.calendar_selected_ranges = getCalendarRanges(resultArr);
      for (var i = 0; i < resultArrDay.length; i++) {
        var indexDaySelected = resultArrDay[i];
        indexDaySelected.selected_ranges = getCalendarRanges(indexDaySelected.selected);
      }
      scope.requestForm.calendar_selected_by_day = resultArrDay;
      return resultArr;
    }
  }

  // step 1
  function getNextSevenDaysArr() {
    var resultArr = [];
    var now = new Date();

    for (var i = 0; i < 7; i++) {
      var now = new Date();
      now.setDate(now.getDate() + i);
      var indexDate = now;
      var formattedLongDay = getFormattedLongDay(indexDate.getDay());
      var formattedShortDay = formattedLongDay.slice(0,3)
      var formattedLongMonth = getFormattedLongMonth(indexDate.getMonth());
      var formattedShortMonth = formattedLongMonth.slice(0,3)
      var dayDict = {hours: [], date: indexDate.getDate(), day:indexDate.getDay(), dayLong: formattedLongDay, dayShort: formattedShortDay, month: indexDate.getMonth(), monthShort: formattedShortMonth, monthLong: formattedLongMonth};
      for (var j = 0; j < 24; j++) {
        var hourObjStart = (new Date(now)).setHours(j, 0, 0);
        // hourObjStart.
        var isAlreadyPast = (i === 0) && j <= now.getHours();
        var hourObjEnd = (new Date(hourObjStart)).setHours(j + 1);
        var hourIntervals = getFormattedHourIntervals(2, j, hourObjStart, isAlreadyPast);
        dayDict.hours.push({
          intervals: hourIntervals,
          js_obj_start: hourObjStart,
          already_past: isAlreadyPast,
          js_obj_end: hourObjEnd,
          start_hour: hourIntervals[0].start_hour,
          formatted_start_hour: hourIntervals[0].formatted_start_hour,
          formatted_start_minute: hourIntervals[0].formatted_start_minute,
          formatted_start: hourIntervals[0].formatted_start_hour + ':' + hourIntervals[0].formatted_start_minute + hourIntervals[0].suffix,
          formatted_end: hourIntervals[hourIntervals.length - 1].formatted_end_hour + ":" + hourIntervals[hourIntervals.length - 1].formatted_end_minute + hourIntervals[hourIntervals.length - 1].suffix,
          formatted_end_hour: hourIntervals[hourIntervals.length - 1].formatted_end_hour,
          formatted_end_minute: hourIntervals[hourIntervals.length - 1].formatted_end_minute,
          end_hour: hourIntervals[hourIntervals.length - 1].end_hour,
          start_suffix: hourIntervals[0].suffix,
          end_suffix: hourIntervals[hourIntervals.length - 1].suffix
        })
      }
      resultArr.push(dayDict);
    }

    return {days: resultArr, onSelect:selectCalendarInterval }

    function hasAlreadyPast(time) {
      return false
    }

    function getFormattedLongDay(day_index) {
      return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day_index];
    }

    function getFormattedLongMonth(day_index) {
      return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][day_index];
    }

    function getFormattedHourIntervals(num_intervals, index, hour_obj, already_past) {
      var intervalSize = 60 / num_intervals | 0;
      var resultArr =[]
      for (var i = 0; i < num_intervals; i++)  {
        var end_hour_obj = (new Date(hour_obj))
        end_hour_obj.setMinutes(intervalSize * (i + 1));
        var hour_result_dict = {
          start_hour: index,
          already_past: already_past,
          end_hour: end_hour_obj.getHours(),
          start_minute: intervalSize * i,
          js_obj_start: (new Date(hour_obj)).setMinutes(intervalSize * i),
          js_obj_end: (new Date(hour_obj)).setMinutes((intervalSize * (i + 1))),
          end_minute: (intervalSize * (i + 1)) % 60,
        }
        hour_result_dict.suffix = isAMorPM(index, hour_result_dict.start_minute, hour_result_dict.end_minute)
        hour_result_dict.formatted_start_hour = formattedHour(hour_result_dict.start_hour);
        hour_result_dict.formatted_start_minute = formattedMinute(hour_result_dict.start_minute);
        hour_result_dict.formatted_end_hour = formattedHour(hour_result_dict.end_hour);
        hour_result_dict.formatted_end_minute = formattedMinute(hour_result_dict.end_minute);
        resultArr.push(hour_result_dict);
      }
      return resultArr;
    }

    function formattedHour(index) {
      if (index > 12 && index <= 23) {
        index = index % 12;
      }
      if (index === 0 || index === 24) {
        return "12"
      }
      else if (index <= 11) {
        return index;
      }
      return index + "";
    }

    function formattedMinute(index) {
      if (index < 10) {
        return "0" + index;
      }
      return "" + index;
    }

    function isAMorPM(index, start_interval, end_interval) {
      if (end_interval === 0 && index === 23) {
        return 'AM'
      }
      else if (end_interval === 0 && index === 11) {
        return 'PM'
      }
      else if (index < 12) {
        return 'AM'
      }
      else {
        return 'PM'
      }
    }
  }
}






