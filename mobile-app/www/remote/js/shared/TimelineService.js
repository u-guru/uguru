

angular
	.module('sharedServices')
	.factory("TimelineService", [

    "Utilities",

    function TimelineService(Utilities) {
      var fullMonthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
    return {
      formatUniversitiesByDueDate:formatUniversitiesByDueDate,
      todaysDateShortFormat: todaysDateShortFormat,
      formatTimelineUniversitiesForHSStudent: formatTimelineUniversitiesForHSStudent
    }


  function todaysDateShortFormat() {
    var todayDate = new Date();
    return (todayDate.getMonth() + 1)  + '/' + todayDate.getDate();
  }

  function rfcToShortFormatDate(rfc_date) {
    var formattedDate = new Date(Date.parse(rfc_date));
    return fullMonthArr[(formattedDate.getUTCMonth())] + ' ' + formattedDate.getUTCDate() + ', ' + formattedDate.getUTCFullYear();
  }

  function formatTimelineUniversitiesForHSStudent(arr) {
    for (var i = 0; i < arr.length; i++) {
      var indexDate = arr[i];
      var indexDateKeys = Object.keys(indexDate);
      var universities = indexDate[indexDateKeys[0]];
      arr[i].category = 'high-school';
      arr[i].body = 'You have ' + universities.length + ' applications due today.';
      arr[i].announcer = {name: 'Samir', profile_url:"https://www.uguru.me/static/web/images/team/samir.png"};
      arr[i].title = rfcToShortFormatDate(universities[0].sp16_deadline);
      arr[i].svg = universities[0].svg_url;
      if (universities[0].banner_url) {
        arr[i].banner = universities[0].banner_url.replace('_b.', '_m.');
      }
      arr[i].formatted_time = "HS Advisor Guru"
      arr[i].formatted_category = "Application Deadline"
      //format tags
      arr[i].tags = [];
      for (var j = 0; j < universities.length; j++) {
        var shortNameAvail = universities[j].name;
        arr[i].tags.push(shortNameAvail);
      }
    }
    return arr;
  }

  function formatUniversitiesByDueDate(universities) {
    result_arr = [];
    date_dict = {};

    for (var i = 0; i < universities.length; i++) {
      indexUniversity = universities[i];

      if (indexUniversity.sp16_deadline && date_dict[indexUniversity.sp16_deadline] && isDateInTheFuture(indexUniversity.sp16_deadline)) {
        indexUniversity.sp16_deadline_utc = (new Date(Date.parse(indexUniversity.sp16_deadline))).getTime();
        date_dict[indexUniversity.sp16_deadline].push(indexUniversity);
      } else if (indexUniversity.sp16_deadline && isDateInTheFuture(indexUniversity.sp16_deadline)) {
        date_dict[indexUniversity.sp16_deadline] = [indexUniversity];
        indexUniversity.sp16_deadline_utc = (new Date(Date.parse(indexUniversity.sp16_deadline))).getTime();
      } else {
        //date has already pasted or doesn't exist
        continue;
      }
    }

    var resultArr = flattenDateDictIntoSortedArr(date_dict);

    return sortArrayByDate(resultArr);
  }

  function sortArrayByDate(arr) {
    Utilities.sortArrObjByKey(arr, 'sp16_deadline_utc');
    return arr;
  }

  function flattenDateDictIntoSortedArr(dict) {
    result_arr = [];
    var dict_keys = Object.keys(dict)
    for (var i = 0; i < dict_keys.length; i++) {
      var indexKey = dict_keys[i];
      var indexDict = {};
      indexDict[indexKey] = dict[indexKey];
      result_arr.push(indexDict);
    }
    return result_arr;
  }

  function isDateInTheFuture(rfc_date) {
    var parsedDate = new Date(Date.parse(rfc_date))
    var dateNow = new Date();
    return !(parsedDate.getTime() < dateNow.getTime());
  }

}

]);