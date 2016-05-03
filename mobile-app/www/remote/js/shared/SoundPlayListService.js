angular.module('sharedServices')
.factory('SoundPlayListService', [
	"$localstorage",
	// "GApi",
	// "GAuth",
	SoundPlayListService
	]);
function SoundPlayListService($localstorage) {
	var youTubeKey = 'AIzaSyBBHJz6xWQVLt7qtcedo_J1U9mwVKTH7T0';
    var OAUTH2_CLIENT_ID = '60923915370-3lqvbkb9vrqnitjpmsu7ajhhhe9vpnrh.apps.googleusercontent.com'
	var OAUTH2_SCOPES = [
						  'https://www.googleapis.com/auth/youtube'
						];
	return {
	  init: init,
	  search: search
	}
	function init(postInitiation){

		console.log("Authorizing music service",gapi)
		setTimeout(checkAuth,2500);
		// window.setTimeout(checkAuth, 1000);

		 // setTimeout(loadAPIClientInterfaces,500);

		// GAuth.setClient(youTubeKey);
		// GAuth.setScope(OAUTH2_SCOPES[0]); // default scope is only https://www.googleapis.com/auth/userinfo.email

	}
	function search(text){
		console.log("search",text)
		var request = gapi.client.youtube.search.list({
			q: text,
			part: 'snippet'
		});
		// return request
		request.execute(function(response) {
		  var str = JSON.stringify(response.result);
		  // $('#search-container').html('<pre>' + str + '</pre>');
		  console.log("response",response.result)
		  return response.result
		});
	}

	function checkAuth() {
	  console.log("Authorizing api...",gapi)
	  gapi.auth.authorize({
	    client_id: OAUTH2_CLIENT_ID,
	    scope: OAUTH2_SCOPES,
	    immediate: true
	  }, handleAuthResult);
	}
	function handleAuthResult(authResult) {
	  if (authResult && !authResult.error) {
	    // Authorization was successful. Hide authorization prompts and show
	    // content that should be visible after authorization succeeds.
	    console.log("successful!")
	    loadAPIClientInterfaces();
	  } else {
	    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
	    // client flow. The current function is called when that flow completes.
	    console.log("Failed!")
	      gapi.auth.authorize({
	        client_id: OAUTH2_CLIENT_ID,
	        scope: OAUTH2_SCOPES,
	        immediate: false
	        }, handleAuthResult);
	  }
	}
	function loadAPIClientInterfaces() {
	  // gapi.client.setApiKey(youTubeKey);
	  gapi.client.load('youtube', 'v3');
	  console.log("done",gapi)
	}
};