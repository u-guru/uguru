angular
.module('sharedServices')
.factory("CalendarService", [
  CalendarService
	]);

function CalendarService() {


  return {

    initRequestCalendar: initRequestCalendar,
    getNextSevenDaysArr: getNextSevenDaysArr

  }

  //step two
  //addEventToCalendar

  function initRequestCalendar() {

  }

  // step 1
  function getNextSevenDaysArr() {
    var resultArr = [];
    var now = new Date();

    for (var i = 0; i < 7; i++) {
      now.setDate(now.getDate() + i);
      var indexDate = now;
      var formattedLongDay = getFormattedLongDay(indexDate.getDay());
      var formattedShortDay = formattedLongDay.slice(0,3)
      var formattedLongMonth = getFormattedLongMonth(indexDate.getMonth());
      var formattedShortMonth = formattedLongMonth.slice(0,3)
      var dayDict = {hours: [], date: indexDate, day:indexDate.getDay(), dayLong: formattedLongDay, dayShort: formattedShortDay, month: indexDate.getMonth(), monthShort: formattedShortMonth, monthLong: formattedLongMonth};
      for (var j = 0; j < 24; j++) {
        var hourIntervals = getFormattedHourIntervals(2, j);
        dayDict.hours.push({
          intervals: hourIntervals,
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

    return resultArr

    function hasAlreadyPast(time) {
      return false
    }

    function getFormattedLongDay(day_index) {
      return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day_index];
    }

    function getFormattedLongMonth(day_index) {
      return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][day_index];
    }

    function getFormattedHourIntervals(num_intervals, index) {
      var intervalSize = 60 / num_intervals | 0;
      var resultArr =[]
      for (var i = 0; i < num_intervals; i++)  {
        var hour_result_dict = {
          start_hour: index,
          end_hour: (index + 1) % 24,
          start_minute: intervalSize * i,
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









