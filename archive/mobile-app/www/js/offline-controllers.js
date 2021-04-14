angular.module('uguru.offline-controllers', [])

//ALL student controllers
.controller('OfflineController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPopup',
  '$timeout',
  '$localstorage',
  '$cordovaNetwork',
  '$cordovaDialogs',
  function($scope, $state, $ionicPopup, $timeout, $localstorage, 
  	$cordovaNetwork, $cordovaDialogs) {

  		var platform = $localstorage.getObject('platform');
	 	
	 	$scope.refreshApp = function() {


	    	if ($cordovaNetwork.isOnline()) {
		        console.log('device is online');
		        
		        if (platform === "ios") {
		          console.log('redirecting to ios...');
		          navigator.splashscreen.show();
		          window.location= "http://uguru-rest.herokuapp.com/app/";
		        }
		    } else {

		    	console.log('app is offline');
		    	var message = 'Your internet signal is not strong enough for the application to run.';
		    	var title = 'Sorry! No Network';
		    	var buttonName = 'OK'
		    	$cordovaDialogs.alert(message, title, buttonName)
				    .then(function() {
				      console.log('User clicked ok');
				});

		    }

  	  	}
  	}

]);

