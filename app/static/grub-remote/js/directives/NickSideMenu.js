function triggerNick() {
	var sideMenu = document.querySelector('nick-side-menu');
	var overlay = document.querySelector('.nick-overlay');

	if (!sideMenu.classList.contains('nick-active')) {
		sideMenu.classList.add('nick-active');
		overlay.classList.add('nick-overlay-active');
	}
	else {
		sideMenu.classList.remove('nick-active');
		overlay.classList.remove('nick-overlay-active');
	}
}

angular.module('uguru.directives')
.directive('nickSideMenu', function () {
	return {
		link: function($scope, elem, attrs) {
			var overlay = document.createElement('div');
			overlay.classList.add('nick-overlay');

			document.body.appendChild(overlay);

			angular.element(overlay).on('click', function(e) {
				elem.removeClass('nick-active');
				overlay.classList.remove('nick-overlay-active');
			});
		},
	};
})

.directive('nickToggle', function($timeout) {
	return {
		link: function($scope, elem, attrs) {

			elem.on('click', function() {
				var sideMenu = document.querySelector('nick-side-menu');
				var overlay = document.querySelector('.nick-overlay');

				if (!sideMenu.classList.contains('nick-active')) {
					sideMenu.classList.add('nick-active');
					overlay.classList.add('nick-overlay-active');
				}
				else {
					sideMenu.classList.remove('nick-active');
					overlay.classList.remove('nick-overlay-active');
				}
			});
		}
	};
});


