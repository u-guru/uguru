/*


//Current View
<ion-view nickView class='acces'>

<script>$state.go('home'); </script>

</ion-view>

//Next View
<ion-view nickView direction='front' class='home'></ion-view>

*/

angular.module('uguru.directives')
.directive('nickView', function($animate, $state) {
	return {

		scope: {
			direction: '=direction',
			nextView: '=nextView',
			previousView: '=previousView'
		},

		link: function(scope, element, attrs) {
			
			console.log("attrs.direction: " + attrs.direction);
			console.log("attrs.nextView: " + attrs.nextView);
			console.log("element: " + element[0]);
			console.log("angular.element(element): "+ angular.element(element));
			
			var currentStep = 0;
			var maxStep = 3;
			element.bind("click", function(e) {
				console.log("you clicked me!");
				$state.go('root.become-guru');

			});



		},



		controller: function($scope) {
			console.log("this is inside controller!");
		}
	}
})