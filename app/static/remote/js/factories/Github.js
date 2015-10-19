angular.module('uguru.rest')
.factory('Github', ['Restangular', '$localstorage', function(Restangular, $localstorage) {
    var Github;
    var exceptionToGHIssue;
    Github = {
        post: function(gh_payload) {
            return Restangular
                .one('github')
                .customPOST(JSON.stringify(gh_payload));
        },
        setExceptionToGithubIssue: function(bool) {
        	exceptionToGHIssue = bool;
        	return exceptionToGHIssue;
        },
        getExceptionToGithubIssue: function() {
        	return exceptionToGHIssue;
        },
        exceptionToGHIssue: function(exception, cause) {
        	this.setExceptionToGithubIssue(false);
        	var gh_title;
		    if (exception.message) {
		        gh_title =  '"' +  exception.message;
		    }
		    if (cause) {
		        gh_title += '" since "' + JSON.stringify(cause);
		    }
		    if (exception.line) {
		        gh_title += '". See line ' + exception.line
		    }
		    if (exception.sourceURL) {
		        var exceptionUrlSplit = exception.sourceURL.split('/');
		        exception.location = exceptionUrlSplit[exceptionUrlSplit.length - 1];
		        gh_title += ' in file ' + exception.location
		    }
		    var gh_body = '*Line*: ' + exception.line + '\n' + '*Column*: ' + exception.column + '\n*File*: ' + exception.location + '\n*File URL*: ' + exception.sourceURL + '\n\n*Message*: ' + exception.message + ', where the cause is _' + JSON.stringify(cause) + '_\n\n*Exception Type*: ' + exception.name + '\n\n*Full Error Object*: \n\n' + JSON.stringify(exception) + '\n\n\n*Full Stack Trace*: \n\n' + exception.stack;
		    var user = $localstorage.getObject("user");
		    var user_info = {
		        id: user.id,
		        name: user.name,
		        guru_courses: user.guru_courses,
		        devices: user.devices,
		        age: user.time_created,
		        last_updated: user.last_active
		      }
		    var device_details = {
		                ios: ionic.Platform.isIOS(),
		                android: ionic.Platform.isAndroid(),
		                windows: ionic.Platform.isWindowsPhone(),
		                mobile: ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone(),
		                web: !(ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone()),
		                device: ionic.Platform.device(),
		    }

	      	ghObj = {
		        issue_title: gh_title,
		        issue_body: gh_body,
		        user_agent: navigator.userAgent,
		        user_details: user_info,
		        device_info: device_details
		   	}
		   	console.log(ghObj);
		    console.log("Logging GH Issues, getExceptionToGithubIssue");
		    if (exceptionToGHIssue) {

			    post(ghObj).then(
			        function(response) {
			          console.log(response);
			        },
			        function(err) {
			          console.log(JSON.stringify(err));
			        }
		    	)

		    }
        }

    }
    return Github;
}]);