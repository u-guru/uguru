angular.module('uguru.admin')
.factory("AdminService", [
    AdminService
    ]);

function AdminService($timeout) {

    return {
        getUpcomingCalendar: getUpcomingCalendar
    };

    function getUpcomingCalendar(num_days) {
        var weekdaysShort = ['Sun', 'Mon', 'Tue', "Wed", 'Thur', 'Fri', 'Sat'];
        var monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var today = new Date();
        var resultArr = [];
        for (var i = 0; i < num_days; i++)  {
            var iDate = new Date();
            iDate.setDate(today.getDate() + i);
            var iDay = iDate.getDay();
            var iMonth = iDate.getMonth();
            resultArr.push({
                date: iDate.getDate(),
                day: {num: iDay, name: weekdaysShort[iDay]},
                month: {num: iMonth, name: monthShort[iMonth]}
            })
        }
        return resultArr
    }
};