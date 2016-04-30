angular.module('sharedServices')
.factory('SoundPlayListService', [
	"$localstorage",
	// "GApi",
	// "GAuth",
	SoundPlayListService
	]);
function SoundPlayListService($localstorage) {

	var youTubeKey = 'AIzaSyBBHJz6xWQVLt7qtcedo_J1U9mwVKTH7T0';
	// var youTubeKey = 'sound-guru'
	var OAUTH2_SCOPES = [
						  'https://www.googleapis.com/auth/youtube'
						];
	return {
	  init: init,
	  search: search
	}
	function init(postInitiation){

		console.log("Authorizing music service",Gapi)

		// setTimeout(checkAuth, 1);

		// GAuth.setClient(youTubeKey);
		// GAuth.setScope(OAUTH2_SCOPES[0]); // default scope is only https://www.googleapis.com/auth/userinfo.email

	}
	function search(text){
		console.log("GAPI")
	}

	function checkAuth() {
	  console.log("Authorizing api...")

	  gapi.auth.authorize({
	    client_id: youTubeKey,
	    scope: OAUTH2_SCOPES,
	    immediate: true
	  }, handleAuthResult);
	}
	function handleAuthResult(authResult) {
	  if (authResult && !authResult.error) {
	    // Authorization was successful. Hide authorization prompts and show
	    // content that should be visible after authorization succeeds.
	    // $('.pre-auth').hide();
	    // $('.post-auth').show();
	    console.log("successful!")
	    loadAPIClientInterfaces();
	  } else {
	    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
	    // client flow. The current function is called when that flow completes.
	    console.log("Failed!")
	      gapi.auth.authorize({
	        client_id: youTubeKey,
	        scope: OAUTH2_SCOPES,
	        immediate: false
	        }, handleAuthResult);
	  }
	}

};