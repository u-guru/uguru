angular.module('uguru.admin')
.controller('AdminDevController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'UtilitiesService',
  'AdminService',
  'XHRService',
  function($scope, $state, $timeout, UtilitiesService, AdminService, XHRService) {
    var admin = this;

    admin.releases = ['preapp', 'become-guru', 'gpa', 'sound', 'focus'];
    admin.gallery = {components: []}
    $timeout(function() {
      loadAdminSpec(admin.releases[0]);
      var today = new Date();
      loadCalendar({month: today.getUTCMonth() + 1, date: today.getUTCDate()});
    })

    AdminService.getComponents($scope)

    // console.log(promise)

    admin.calendarDates = AdminService.getUpcomingCalendar(14);
    // admin.today = getDetailedDayEvent(0, admin.calendarDates);


    admin.remote = {
      nextModule: function() {admin.releases = admin.releases.indexOf(admin.iSpec.name) + 1}
    }

    function loadAdminSpec(r_name) {
        var callback = function(r_dict) {
          admin.iSpec = r_dict;
        }
        XHRService.getJSONFile('get', 'admin/spec/' + r_name + '/' + r_name  + '.spec.json', callback);
    }

    function loadCalendar(d_obj){
      var strDate = d_obj.month +'/' + d_obj.date;
      var callback = function(c_dict) {
        admin.fullcalendar = c_dict;
        admin.today = c_dict[strDate];
      }
      XHRService.getJSONFile('get', 'admin/spec/calendar.json', callback);
    }

  }
]);