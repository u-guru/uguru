angular
.module('sharedServices')
.factory('WindowsService', [
  '$rootScope',
  '$state',
  '$localstorage',
  'University',
  'LoadingService',
	WindowsService
	]);

function WindowsService($rootScope, $state, $localstorage,
   University, LoadingService) {

	return {
		ready: ready
	}

	function ready() {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|x-wmapp.?):|data:image\//);

	    if ($cordovaPush) {
	        console.log('we are updating the push notifications on windows device');
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
	            console.log("Error Handle :", error);
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
	            console.log("ERROR: ", error.code);
	            console.log("ERROR: ", error.message);
	        }
	    }


	}

}