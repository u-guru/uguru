angular.module('uguru.admin')

.controller('AdminStaggerController', [
'$scope',
'$state',
'$timeout',
'$localstorage',
'$compile',
function($scope, $state, $timeout, $localstorage, $compile) {

	var stagger = this;
	stagger.examples = getStaggerExamples();
	stagger.activeIndex = 0;


	function getStaggerExamples() {
		return [
			{name: 'simple'},
			{name: 'easing'}
		]
	}

}

])
