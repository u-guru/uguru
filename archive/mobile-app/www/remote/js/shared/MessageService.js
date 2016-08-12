angular
	.module('sharedServices')
	.factory("MessageService", [
    'CalendarService',
    '$timeout',
    'LoadingService',
    'FileService',
    'RequestService',
    'uiGmapIsReady',
    'GUtilService',
    'Restangular',
    'uiGmapIsReady',
    MessageService
	]);

function MessageService(CalendarService, $timeout, LoadingService, FileService, RequestService,  uiGmapIsReady, GUtilService, Restangular, uiGmapIsReady) {
  var MENU_TITLES = ['Messages', 'Location', 'Calendar', 'Files', 'Sessions', 'Billing History', 'Create a Request'];
  function initActiveRelationship(relationship) {
    relationship.nav = initRelationshipNav(relationship);
  }

  function initRelationshipNav(relationship) {
    return {
      menu: {
        show: false, //displayed
        active_index: 0,
      },
      menu_titles: MENU_TITLES
    }
  }

  //
  function initReRequest(scope) {

  }


  return {initActiveRelationship: initActiveRelationship}

}