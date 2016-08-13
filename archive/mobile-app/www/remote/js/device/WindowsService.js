angular
.module('sharedServices')
.factory('WindowsService', [
  '$rootScope',
  '$state',
  '$localstorage',
	'$cordovaPush',
	'Geolocation',
  'University',
  'Major',
  'Skill',
  'Profession',
	WindowsService
	]);

function WindowsService($rootScope, $state, $localstorage, $cordovaPush, 
  Geolocation, University, Major, Skill, Profession) {

	return {
		ready: ready
	}

	function ready() {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|x-wmapp.?):|data:image\//);
	
	    if ($cordovaPush) {
	        $cordovaPush.register(channelHandler, errorHandler, {
	            "channelName": "123723560",
	            "ecb": "onNotificationWP8",
	            "uccb": "channelHandler",
	            "errcb": "jsonErrorHandler"
	        });

	        function channelHandler(event) {
	            var uri = event.uri;
	            CordovaPushWrapper.received($rootScope, event, notification);
	            if ($scope.user && $scope.user.id) {
	                payload = {
	                    'push_notifications': true,
	                    'push_notifications_enabled': true
	                }
	                $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
	            }
	        }

	        function errorHandler(error) {
	            // document.getElementById('app-status-ul').appendChild(document.createElement(error));
	            console.error("Error Handle :", error);
	        }

	        function onNotificationWP8(e) {
	            if (e.type == "toast" && e.jsonContent) {
	                pushNotification.showToastNotification(successHandler, errorHandler, {
	                    "Title": e.jsonContent["wp:Text1"],
	                    "Subtitle": e.jsonContent["wp:Text2"],
	                    "NavigationUri": e.jsonContent["wp:Param"]
	                });
	            }
	            if (e.type == "raw" && e.jsonContent) {
	                alert(e.jsonContent.Body);
	            }
	        }

	        function jsonErrorHandler(error) {
	            //document.getElementById('app-status-ul').appendChild(document.createElement(error.code));
	            //document.getElementById('app-status-ul').appendChild(document.createElement(error.message));
	            console.error("ERROR: ", error);
	        }
	    }


	}

}