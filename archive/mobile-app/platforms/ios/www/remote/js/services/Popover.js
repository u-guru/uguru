angular.module('uguru.root.services')
.service('Popover',
    [
    '$localstorage',
    '$timeout',
    '$popover',
    function($localstorage, $timeout, $popover) {

    	this.tutorial = {
	        init: function(scope, options) {


	        	var targetElement = angular.element(document.querySelector(options.targetElement));

	            var libraryOptions = {
	            	animation: options.animation,
	            	placement: options.placement,
	            	template: BASE + 'templates/generalPopover.html',
	            	delay: options.delay || 500,
	            	scope: scope
	            }

	            scope.templateOptions = {
	            	title: options.title,
	            	buttonText: options.buttonText,
	            	body: options.body
	            }

	           //  scope.popoverButtonClicked = function() {
	           //  	scope.hidePopover();
	           //  }


	           //  scope.hidePopover = function() {
          		// 	generalPopover.$promise.then(generalPopover.hide);
          		// }

          		// scope.showPopover = function() {
          		// 	generalPopover.$promise.then(generalPopover.show)
          		// }

          		return $popover(targetElement, libraryOptions);



	        }
	    }
	    return this;

}]);