angular.module('sharedServices')
.factory('SoundPlayListService', [
	"$localstorage",
	SoundPlayListService
	]);
function SoundPlayListService($localstorage) {
	console.log("Music service load")
	var youTubeKey = 'AIzaSyBBHJz6xWQVLt7qtcedo_J1U9mwVKTH7T0';
	var OAUTH2_SCOPES = [
	  'https://www.googleapis.com/auth/youtube'
	];
	return {
	  init: init,
	}
	function init(){
		console.log("init music service")
	}

	function checkAuth() {
	  gapi.auth.authorize({
	    client_id: OAUTH2_CLIENT_ID,
	    scope: OAUTH2_SCOPES,
	    immediate: true
	  }, handleAuthResult);
	}
};