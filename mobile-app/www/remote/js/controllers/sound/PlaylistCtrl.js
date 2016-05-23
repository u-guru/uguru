angular.module('uguru.apps.controllers')
.controller('PlaylistCtrl', [
	'$scope',
	'OauthService',
	'$location',
	'MusicPlayer',
	'$timeout',
	'$state',
	'$ionicSlideBoxDelegate',
	'$stateParams',
	'Utilities',
	PlaylistCtrl]);


function PlaylistCtrl($scope, OauthService, $location, MusicPlayer, $timeout, $state,
	$ionicSlideBoxDelegate, $stateParams, Utilities) {

	if (LOCAL) {
            $scope.img_base = 'remote/'
        } else {
            $scope.img_base = '';
        }

	var genre = $stateParams.genre;
	console.log("genre: " + genre);

	var audioElement, audioProgress;

	$scope.currentTrack = {};


	$scope.player = {
		trackPosition: 0,
		isAvailable: false,
		isPlaying: true,
		prev: function() {
			MusicPlayer.prev();
		},
		play: function() {
			if (Utilities.doesCordovaExist()) {
				MusicPlayer.play();
			} else {
				audioElement.play();
			}
			$scope.player.isPlaying = true;
		},
		pause: function() {
			if (Utilities.doesCordovaExist()) {
				MusicPlayer.pause();
			} else {
				audioElement.pause();
			}
			$scope.player.isPlaying = false;
		},
		next: function() {
			if (Utilities.doesCordovaExist()) {
				MusicPlayer.next();
			} else {
				audioElement.src = OauthService.getStream($scope.playlist[$scope.player.trackPosition + 1].stream_url);
			}
			$scope.player.trackPosition++;
			$scope.currentTrack = $scope.playlist[$scope.player.trackPosition];
			$scope.player.play();
		}
	};


	OauthService.searchPlaylist('soundcloud', genre).then(function(response) {

		console.log("success in searchPlaylist()!");
		console.log(response);

		var results = response.data;


		for (var i = 0; i < results.length - 1; i++) {
			var imgString = results[i].artwork_url;
			console.log(imgString);
			imgString = imgString.substring(0, imgString.length - 9);
			imgString += 't500x500.jpg';
			results[i].artwork_url = imgString;
		}

		$scope.playlist = results;

		$scope.currentTrack = $scope.playlist[0];

		$timeout(function() {

			if (Utilities.doesCordovaExist()) {
				MusicPlayer.play(OauthService.getStream($scope.currentTrack.stream_url));
			} else {
				audioElement = document.querySelector('#audioPlayer');
				audioElement.src = OauthService.getStream($scope.currentTrack.stream_url);
				audioElement.play();

				audioProgress = document.querySelector('#seekbar');

				audioElement.addEventListener('ended', function() {
					$scope.player.next();
				});
				audioElement.addEventListener('timeupdate', function() {
					audioProgress.setAttribute('value', this.currentTime / this.duration);
				});
			}

		}, 3500);



		$scope.nextSlide();

	}, defaultErrorCallback);


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

	$scope.goToIntro = function() {
		$state.go('intro');
	};



}




