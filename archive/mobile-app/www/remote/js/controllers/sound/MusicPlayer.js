angular.module('uguru.apps.controllers')
.factory('MusicPlayer', [
    'Utilities',
    MusicPlayer]);


// This service should not handle any http requests.  All it does is take the URL of a song and plays it.
function MusicPlayer(Utilities) {

    var mediaPlayer;

    var tracks = [];

    var previews = [];


    return {

        storePreview: storePreview,
        storeTrack: storeTrack,
        playPreview: playPreview,
        play: play,
        pause: pause,
        stop: stop,
        next: next,
        prev: prev

    };

    function storePreview(preview) {

        previews.push(preview);

    }

    function playPreview(previewURL) {

        mediaPlayer = new Media(previewURL,

            function() {
                console.log("playPreview success");
            },
            function(err) {
                console.log("playPreview error");
                console.log(err);
            });

        mediaPlayer.play();

    }

    function storeTrack(track) {

        tracks.push(track);

    }

    function play(url) {
        console.log("going into MusicPlayer.play()");
        mediaPlayer = new Media(url,

            function() {
                console.log("playPreview success");
            },
            function(err) {
                console.log("playPreview error");
                console.log(err);
            });

        mediaPlayer.play();
    }

    function pause() {
        console.log("pausing...");
        mediaPlayer.pause();
    }

    function stop() {
        console.log("stopping...");
        mediaPlayer.stop();

    }

    function next() {

    }

    function prev() {

    }


}





