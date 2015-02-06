angular.module('uguru.root.services')
.service('Popover', 
    [
    '$localstorage',
    '$timeout',
    '$popover',
    function($localstorage, $timeout, $popover) {

    	this.tutorial = {
	        show: function(scope, options) {
	            
	            
	        	var targetElement = angular.element(document.querySelector(options.targetElement));

	            var libraryOptions = {
	            	animation: options.animation,
	            	placement: options.placement,
	            	template: BASE + 'templates/components/details/generalPopover.html',
	            	delay: options.delay || 500,
	            	scope: scope
	            }

	            var generalPopover = $popover(targetElement, libraryOptions);

	            scope.templateOptions = {
	            	title: options.title,
	            	buttonText: options.buttonText,
	            	body: options.body
	            }

	            scope.popoverButtonClicked = function() {
	            	scope.hidePopover();
	            }

          		
	            scope.hidePopover = function() {
          			generalPopover.$promise.then(generalPopover.hide); 
          		}

          		scope.showPopover = function() {
          			generalPopover.$promise.then(generalPopover.show)
          		}
          		
          		scope.showPopover();


	        }
	    }
	    return this;

}]);