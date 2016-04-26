angular.module('uguru.rest')
.factory('Github', ['Restangular', '$localstorage', function(Restangular, $localstorage) {
    // var Github;
    var sendToGH;
    var defaultGHEmail = 'samir@uguru.me';
    var sendToEmail;
    return {
        post: post,
        setExceptionToGithubIssue: setExceptionToGithubIssue,
        getExceptionToGithubIssue: getExceptionToGithubIssue,
        setExceptionToEmail: setExceptionToEmail,
        testSendGHIssue: testSendGHIssue,
        exceptionToGHIssue: exceptionToGHIssue,
        getExceptionToEmail: getExceptionToEmail,
        getExceptionToDefaultEmail: getExceptionToDefaultEmail,
        init: init,
        toggleExceptionToEmail: toggleExceptionToEmail,
        toggleExceptionToGithubIssue: toggleExceptionToGithubIssue
    }
        function post(gh_payload) {
            return Restangular
                .one('github')
                .customPOST(JSON.stringify(gh_payload));
        }
        function init() {
            sendToGH = false;
            sendToEmail = false;
        }
        function setExceptionToGithubIssue(bool) {
        	sendToGH = bool;
        	return sendToGH;
        }
        function testSendGHIssue() {
            throw 42;
        }
        function setExceptionToEmail(bool, email) {
            sendToEmail = bool;
            defaultGHEmail = email || defaultGHEmail;
            return sendToEmail;
        }
        function getExceptionToEmail() {
            return sendToEmail;
        }
        function getExceptionToDefaultEmail() {
            return defaultGHEmail;
        }
        function toggleExceptionToEmail() {
            bool = !getExceptionToEmail();
            setExceptionToEmail(bool);
            return bool;
        }
        function toggleExceptionToGithubIssue() {
            bool = !getExceptionToGithubIssue();
            setExceptionToGithubIssue(bool);
        }
        function getExceptionToGithubIssue() {
        	return sendToGH;
        }
        function exceptionToGHIssue(exception, cause) {
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
		        id: user && user.id,
		        name: user && user.name,
		        guru_courses: user && user.guru_courses && user.guru_courses.length,
		        devices: user && user.devices,
		        age: user && user.time_created,
		        last_updated: user &&  user.last_active
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
		        device_info: device_details,
                default_email: defaultGHEmail,
                send_email:sendToEmail,
                create_issue:sendToGH
		   	}
            sendToGH = getExceptionToGithubIssue()
		    if (sendToGH || sendToEmail) {
                post(ghObj).then(
			        function(response) {
                        return
			        },
			        function(err) {
			          console.error(JSON.stringify(err));
			        }
		    	)
		    }
        }
    }

]);
