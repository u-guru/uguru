angular.module('uguru.apps.controllers')
.controller('IntroCtrl', [
	'$scope',
	'$state',
	'OauthService',
	'$location',
	'MusicPlayer',
	'$ionicSlideBoxDelegate',
	'$timeout',
	IntroCtrl]);


function IntroCtrl($scope, $state, OauthService, $location, MusicPlayer, $ionicSlideBoxDelegate, $timeout) {

	if (LOCAL) {
            $scope.img_base = 'remote/'
    } else {
        $scope.img_base = '';
    }

	$scope.nextSlide = function() {
		console.log("clicked nextSlide()");
	  	$ionicSlideBoxDelegate.next();
	};

	$scope.prevSlide = function() {
	  	$ionicSlideBoxDelegate.previous();
	};

	$scope.goToHome = function() {
		$state.go('home');
	};

	$scope.goToPlaylist = function(genre) {
		$state.go('playlist', {'genre': genre});
	};


	$scope.login = function(providerName) {
		OauthService.login(providerName);
	};

	$scope.validate = function(providerName) {
		OauthService.validate(providerName);
	};

	// $scope.validate('soundcloud');

	$scope.$watch(
		function(){
	    return $location.search();
	}, function(value){
	    console.log(document.location);

	    var searchParam = window.location.search;
	    var code = searchParam.split('code=')[1];
	    console.log("code: " + code);

	    if(code !== undefined) {
	    	OauthService.login('soundcloud', code).then(function(response) {
	    		$timeout(function() {
	    			// $scope.nextSlide();
	    		}, 300);

	    	});
	    }

	});

}




