angular.module('uguru.apps.controllers')
.controller('MusicHomeCtrl', [
	'$scope',
	'OauthService',
	'$location',
	'MusicPlayer',
	'$timeout',
	'$state',
	MusicHomeCtrl]);


function MusicHomeCtrl($scope, OauthService, $location, MusicPlayer, $timeout, $state) {

	if (LOCAL) {
            $scope.img_base = 'remote/'
        } else {
            $scope.img_base = '';
        }

	$scope.goToIntro = function() {

			$state.go('intro');
	};

	$scope.login = function(providerName) {
		OauthService.login(providerName);
	};


	$scope.search = {
		artist: ''
	};

	$scope.results = [];


	$scope.searchArtist = function(searchType) {
		console.log("clicked searchArtist()");
		OauthService.search('soundcloud', $scope.search.artist, searchType).then(function(response) {

			console.log("success in searchArtist");
			console.log(response);


//for soundcloud
			for (var i = 0; i < response.data.length; i++) {
				$scope.results.push(response.data[i]);
			}



//for spotify
			// for (var i = 0; i<response.data.artists.items.length; i++) {
			// 	$scope.results.push(response.data.artists.items[i]);
			// }

		}, defaultErrorCallback);

	};

	$scope.tracks = [];

	$scope.preview = {
		isAvailable: false,
		url: ''
	};


	$scope.player = {
		trackPosition: 0,
		isAvailable: false,
		isPlaying: false,
		prev: function() {
			MusicPlayer.prev();
		},
		play: function() {
			MusicPlayer.play();
		},
		pause: function() {
			MusicPlayer.pause();
		},
		stop: function() {
			MusicPlayer.stop();
		},
		next: function() {
			MusicPlayer.next();
		}
	};


	$scope.playPreview = function() {

		MusicPlayer.playPreview($scope.preview.url);
	};

	$scope.pausePlayer = function() {
		MusicPlayer.pause();
	};

	$scope.stopPlayer = function() {
		MusicPlayer.stop();
	};

	$scope.playTrack = function(trackURL, trackNumber) {

		$scope.player.trackPosition = trackNumber;

		MusicPlayer.play(OauthService.getStream(trackURL));

		$timeout(function() {
			$scope.player.isAvailable = true;
			$scope.player.isPlaying = true;
		}, 800);


	};


	$scope.getTracks = function(artistID) {


		$state.go('playlist');

		// OauthService.getArtistTracks(artistID).then(function(response) {

		// 	console.log("response success in getArtistTracks()");
		// 	console.log(response);


		// 	for (var i = 0; i < response.data.length; i++) {

		// 		$scope.tracks.push(response.data[i]);
		// 	}

		// }, defaultErrorCallback);

	};

	// $scope.$watch(
	// 	function(){
	//     return $location.search();
	// }, function(value){
	//     console.log(document.location);

	//     var searchParam = window.location.search;
	//     var code = searchParam.split('code=')[1];
	//     console.log("code: " + code);

	//     if(code !== undefined) {
	//     	OauthService.login(code);
	//     }

	// });


}




