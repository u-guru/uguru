angular.module('uguru.root.services')
.service('Popup',
    [
    '$localstorage',
    '$timeout',
    '$ionicPopup',
    function($localstorage, $timeout, $ionicPopup) {

    	this.options = {
	        show: function(scope, options) {
	            var popupOptions = {

				     templateUrl: BASE + "templates/generalConfirmPopup.html",
				     cssClass: "popup-uguru",
				     scope: scope
				}

				scope.confirmPopupOptions = {
					header: options.header,
					body: options.body,
					positiveBtnText: options.positiveBtnText,
					negativeBtnText: options.negativeBtnText
				}

				scope.popup;

				$timeout(function(){

					scope.popup = $ionicPopup.show(popupOptions);

					$timeout(function() {
			   			document.getElementById("popup-cancel-btn").addEventListener("click", function() {
		                	if (options.onFailure) {
				        		options.onFailure()
				        	}
				        	scope.popup.close();
				    	});
				    	document.getElementById("popup-positive-btn").addEventListener("click", function() {
				        	if (options.onSuccess) {
				        		options.onSuccess()
				        	}
				        	scope.popup.close();
				    	});
			   		}, options.delay);

				}, options.pre_delay);


	        },
	    }

	    return this;

}]);