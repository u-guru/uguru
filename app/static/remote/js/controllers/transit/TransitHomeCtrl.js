angular.module('uguru.apps.controllers')
.controller('TransitHomeCtrl', [
	'$scope',
	'$timeout',
	'University',
	'DeviceService',
	'Routes',
	'InAppMapService',
	'$ionicModal',
	TransitHomeCtrl]);


function TransitHomeCtrl($scope, $timeout, University,
						 DeviceService, Routes, InAppMapService, $ionicModal) {


	$scope.map = { center: { latitude: 37.7931632, longitude: -122.3967035 }, zoom: 14 };


	$scope.selectedProviders = {
		bart: true,
		muni: true,
		caltrain: true
	};

	$scope.p = {
		path: Routes.getAll[0].directions
	};



	$scope.routesSource = Routes.getAll.slice();
	$scope.routes = $scope.routesSource.slice();

	$scope.filteredRoutes = [];
	$scope.getFilteredRoutes = function() {

		$scope.filteredRoutes = [];

		if ($scope.selectedProviders.bart) {
			for (var i = 0; i < $scope.routesSource.length; i++) {
				if ($scope.routesSource[i].provider.toLowerCase() === 'bart') {
					$scope.filteredRoutes.push($scope.routesSource[i]);
				}
			}
		}
		if ($scope.selectedProviders.muni) {
			for (var i = 0; i < $scope.routesSource.length; i++) {
				if ($scope.routesSource[i].provider.toLowerCase() === 'muni') {
					$scope.filteredRoutes.push($scope.routesSource[i]);
				}
			}
		}
		if ($scope.selectedProviders.caltrain) {
			for (var i = 0; i < $scope.routesSource.length; i++) {
				if ($scope.routesSource[i].provider.toLowerCase() === 'caltrain') {
					$scope.filteredRoutes.push($scope.routesSource[i]);
				}
			}
		}
		$timeout(function() {
			$scope.routes = $scope.filteredRoutes;
		}, 0);


	};


	$scope.filterRoute = function(provider, $event) {
		console.log("clicked on provider: " + provider);
		if ($scope.selectedProviders[provider] === true) {
			$event.currentTarget.classList.add('inactive-grey');
			$scope.selectedProviders[provider] = false;
		}
		else {
			$event.currentTarget.classList.remove('inactive-grey');
			$scope.selectedProviders[provider] = true;
		}

		console.log($scope.selectedProviders);

		$scope.getFilteredRoutes();
	};


	if (University.selected =={}) {
		console.log("using selected universigty coords");
		$scope.map = { center: { latitude: University.selected.latitude, longitude: University.selected.longitude }, zoom: 14 };
	} else {
		console.log("using default coords");
		$scope.map = { center: { latitude: 37.8718992, longitude: -122.2585399 }, zoom: 14 };
	}

	$scope.isBrowser = !DeviceService.doesCordovaExist();
	console.log("isBrowser: " + $scope.isBrowser);


	$timeout(function() {
		InAppMapService.displayMap();
	}, 2000);


	$scope.openSearch = function() {
		console.log("clicked openSearch()");

		var searchInput = document.querySelector('#grub-search-input');
		var desktopSearchInput = document.querySelector('#desktop-search-input');
		var homeTitle = document.querySelector('#grub-title');

		if (searchInput.classList.contains('active') ) {
			searchInput.classList.remove('active');
			desktopSearchInput.classList.remove('active');
			homeTitle.classList.add('active');
		} else {
			searchInput.classList.add('active');
			desktopSearchInput.classList.add('active');
			homeTitle.classList.remove('active');
		}
	};




	var options = {
		scope: $scope,
		animation: 'slide-in-up',
		focusFirstInput: false
	};
	var routeModal;
	console.log("initializing route modal..");
	$ionicModal.fromTemplateUrl(BASE + 'templates/dev/transit/route.details.modal.html', options).then(function(modal) {
	    routeModal = modal;
	});

	$scope.openRouteModal = function(route) {
		$scope.selected = route;
		$scope.isActive = {
			menu: true,
			info: false,
			website: false,
			delivery: false,
			telephone: false
		};

		$timeout(function() {

			routeModal.show();
			var transportBar = document.querySelector('.transport-list');
			transportBar.style.visibility = 'hidden';
		}, 0);

		// toggleHeader();

	};

	$scope.closeModal = function(modalName){
		if (modalName === 'route') {
			routeModal.hide();
			var transportBar = document.querySelector('.transport-list');
			transportBar.style.visibility = 'visible';
		}
	};




}





// angular.module('uguru.directives')
// .directive('bindRoute', function($timeout, University, Utilities, DeviceService, InAppMapService) {

//   function link($scope, element, attributes) {
//     var queryPromise = null;
//     var mapPromise = null;
//     $timeout(function() {


//       $scope.$parent.$watch(
//         'filter.option',
//         function(newValue, oldValue) {

//           if(newValue.length < oldValue.length) {
//             if(queryPromise) {
//               $timeout.cancel(queryPromise);
//             }
//             queryPromise = $timeout(function() {
//               $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
//               queryPromise = null;
//             }, 90);
//           }

//           else if(newValue.length === 1) {

//             if(queryPromise) {
//               $timeout.cancel(queryPromise);
//             }
//             queryPromise = $timeout(function() {
//               $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
//               queryPromise = null;
//             }, 75);
//           }

//           else if(newValue.length === 0) {

//             if(queryPromise) {
//               $timeout.cancel(queryPromise);
//             }
//             queryPromise = $timeout(function() {
//               $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
//               queryPromise = null;
//             }, 50);
//           }

//           else {
//             if(queryPromise) {
//               $timeout.cancel(queryPromise);
//             }
//             queryPromise = $timeout(function() {
//               $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
//               queryPromise = null;

//             }, 50);
//           }

//      //      if (DeviceService.doesCordovaExist()) {

//      //      	if(mapPromise) {
//      //      	  $timeout.cancel(mapPromise);
//      //      	}
//      //      	mapPromise = $timeout(function() {
// 			  // InAppMapService.plotMarkers($scope.listScope);
//      //      	  mapPromise = null;

//      //      	}, 1000);

//      //      }
//         }

//       );
//     }, 250);

//   }

//   return {
//     scope: {
//       listScope: '=bindRoute',
//       source: '=source',
//     },
//     link: link,
//     restrict: 'A'
//   };


// });














