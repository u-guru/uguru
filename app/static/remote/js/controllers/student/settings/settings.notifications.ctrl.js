angular.module('uguru.student.controllers')

//ALL student controllers
.controller('SettingsNotificationsController', [

  //All imported packages go here
  '$scope',
  '$state',
  function($scope, $state) {
    
	console.log($scope.user.push_notification);
	$scope.settingsList = [
	    { 
	    	text: "Push Notifications", 
	    	checked: $scope.user.push_notification, 
	    	changed:function(value)
	    		{ 
	    			$scope.user.push_notification = value;
	    			$scope.rootUser.updateLocal($scope.user);

	    		} 
	    },
	    { 
	    	text: "Email Notifications", 
	    	checked: $scope.user.email_notification,
	    	changed:function(value)
	    		{ 
	    			$scope.user.email_notification = value;
	    			$scope.rootUser.updateLocal($scope.user);
	    		} 	
	    }
	  ];

	  $scope.pushNotificationChange = function() {
	    console.log('Push Notification Change', $scope.pushNotification.checked);
	  };
	  
	  $scope.pushNotification = { checked: true };
	  $scope.emailNotification = 'Subscribed';

  }

]);

