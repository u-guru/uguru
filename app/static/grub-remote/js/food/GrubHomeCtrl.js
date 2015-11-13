angular.module('food.controllers', [])
.controller('GrubHomeCtrl', [
	'$rootScope',
	'$scope',
	'University',
	'InAppMapService',
	'$timeout',
	'Restaurant',
	'ModalService',
	'$ionicModal',
	'DeviceService',
    '$localstorage',
    '$ionicViewSwitcher',
    '$state',
    'uiGmapGoogleMapApi',
    'LoadingService',
	GrubHomeCtrl]);


function GrubHomeCtrl($rootScope, $scope, University, InAppMapService, $timeout, Restaurant, ModalService,
    $ionicModal, DeviceService, $localstorage, $ionicViewSwitcher, $state, uiGmapGoogleMapApi,
    LoadingService) {

	$scope.availableFilters = [
		{name: 'Open Now'},
		{name: '< 2 Blocks'},
		{name: 'Burgers'},
		{name: 'Vegan Only'},
	];

	$scope.selectedFilters = [];


    $scope.search_text = {grub:''};

	function toggleHeader() {

		var header = document.querySelector('#home-header');
		var desktopHeader = document.querySelector('#top-bar');
		var foodList = document.querySelector('#home-container');

		if (header.classList.contains('active')) {
			header.classList.remove('active');
			desktopHeader.classList.remove('active');
			foodList.classList.remove('active');
		} else {
			header.classList.add('active');
			desktopHeader.classList.add('active');
			foodList.classList.add('active');
		}
	}

	$scope.openDropdown = function() {
		console.log("clicked openDropdown()");

		var dropdownMenu = document.querySelector('#top-menu-links');

		if (dropdownMenu.classList.contains('active') ) {
			dropdownMenu.classList.remove('active');
		} else {
			dropdownMenu.classList.add('active');
		}
	};


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


	$scope.closeSearch = function() {
		console.log("closing search with $scope.closeSearch()");

		var searchInput = document.querySelector('.grub-search-input');
		var homeTitle = document.querySelector('.grub-title');

		if (searchInput.classList.contains('active') ) {
			searchInput.classList.remove('active');
			homeTitle.classList.add('active');
		} else {
			searchInput.classList.add('active');
			homeTitle.classList.remove('active');
		}

		searchInput.blur();

	};


	$scope.openFilters = function() {
		console.log("open filters");
		var filterDiv1 = document.querySelector('#header-filter');
		var filterDiv2 = document.querySelector('#body-filter');

		if (filterDiv1.classList.contains('active') ) {
			filterDiv1.classList.remove('active');
			filterDiv2.classList.remove('active');
		} else {
			filterDiv1.classList.add('active');
			filterDiv2.classList.add('active');
		}
		return;
	}
	$scope.closeFilters = function() {
		console.log("close filters");
		var filterDiv = document.querySelector('.filter-list-container');

		if (filterDiv.classList.contains('active') ) {
			filterDiv.classList.remove('active');
		} else {
			filterDiv.classList.add('active');
		}
		return;
	}

	$scope.openModal = function(modalName) {

		ModalService.open(modalName);
	};
	$scope.closeModal = function(modalName) {

		if(modalName === 'restaurant') {
			restaurantModal.hide();
			toggleHeader();
			return;
		}

		ModalService.close(modalName);
	};

	$scope.selected = {
		name: "default namaste"
	};

	var options = {
		scope: $scope,
		animation: 'slide-in-up',
		focusFirstInput: false
	}
	var restaurantModal;
	console.log("initializing restaurant modal..");
	$ionicModal.fromTemplateUrl(BASE + 'templates/food/restaurant.details.modal.html', options).then(function(modal) {
	    restaurantModal = modal;
	});

	$scope.openRestaurantModal = function(restaurant) {
		$scope.selected = restaurant;
		$scope.isActive = {
			menu: true,
			info: false,
			website: false,
			delivery: false,
			telephone: false
		}

		$timeout(function() {

			restaurantModal.show();
		}, 0);

		toggleHeader();

	};


	$scope.openDetails = function(details) {
		$scope.isActive = {
			menu: false,
			info: false,
			website: false,
			delivery: false,
			telephone: false
		}
		switch(details) {

			case 'menu':
				$scope.isActive.menu = true;
				break;

			case 'info':
				$scope.isActive.info = true;
				break;

			case 'website':
				$scope.isActive.website = true;
				break;

			case 'delivery':
				$scope.isActive.delivery = true;
				break;

			case 'telephone':
				$scope.isActive.telephone = true;
				break;

			default:
				break;

		}

	};



    $scope.$on('$ionicView.enter', function() {


        if (!University.selected) {
            LoadingService.showAmbig();
            $ionicViewSwitcher.nextDirection('back');
            $state.go('^.intro');
            $timeout(function() {
                LoadingService.hide()
            }, 1000);
        }



        var callback = function(_dict) {
            // console.log('callback executed');
            // console.log($scope.root.vars.map);
            console.log(_dict);
            University.restaurants = _dict.food_listings.slice();
            $scope.restaurants = _dict.food_listings.slice(0, 20);
            $scope.restaurantsSource = _dict.food_listings.slice(0, 20);
            uiGmapGoogleMapApi.then(function(maps) {
            });
        }


        $scope.getFoodRouter(callback);

        // University.selected = localUniversity;


        $scope.isBrowser = !DeviceService.doesCordovaExist();

        if ($scope.isBrowser) {



        }


        // $scope.restaurants = $scope.restaurants || $scope.restaurantsSource;
        // $scope.restaurantsSource = $scope.restaurants;

    })

	$scope.initMap = function() {

		InAppMapService.displayMap();

	}


	$scope.openMap = function() {
		console.log("clicked on toggleWalkingDistance()");
		InAppMapService.enlarge();
	};


}



angular.module('uguru.directives')
.directive('bindGrub', function($timeout, University, Utilities, DeviceService, InAppMapService) {

  function link($scope, element, attributes) {
    var queryPromise = null;
    var mapPromise = null;
    $timeout(function() {

      $scope.$parent.$watch(
        'refresh.grub',
        function(newValue, oldValue) {
          console.log("heard something!", newValue, oldValue);
          if(newValue === 'update' ) {

          }
        }
      );

      $scope.$parent.$watch(
        'search_text.grub',
        function(newValue, oldValue) {

          if(newValue.length < oldValue.length) {
            if(queryPromise) {
              $timeout.cancel(queryPromise);
            }
            queryPromise = $timeout(function() {
              $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
              queryPromise = null;
            }, 90);
          }

          else if(newValue.length === 1) {

            if(queryPromise) {
              $timeout.cancel(queryPromise);
            }
            queryPromise = $timeout(function() {
              $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
              queryPromise = null;
            }, 75);
          }

          else if(newValue.length === 0) {

            if(queryPromise) {
              $timeout.cancel(queryPromise);
            }
            queryPromise = $timeout(function() {
              $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
              queryPromise = null;
            }, 50);
          }

          else {
            if(queryPromise) {
              $timeout.cancel(queryPromise);
            }
            queryPromise = $timeout(function() {
              $scope.listScope = Utilities.nickMatcher(newValue, $scope.source, 'name');
              queryPromise = null;

            }, 50);
          }

          if (DeviceService.doesCordovaExist()) {

          	if(mapPromise) {
          	  $timeout.cancel(mapPromise);
          	}
          	mapPromise = $timeout(function() {
			  InAppMapService.plotMarkers($scope.listScope);
          	  mapPromise = null;

          	}, 1000);

          }
        }

      );
    }, 250);

  }

  return {
    scope: {
      listScope: '=bindGrub',
      source: '=source',
    },
    link: link,
    restrict: 'A'
  };


});







