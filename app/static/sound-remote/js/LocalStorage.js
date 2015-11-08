angular.module('music-draft')
.factory('LocalStorage', [
    '$window',
    LocalStorage]);

function LocalStorage($window) {

    // var directory = cordova.file.cacheDirectory;

    var playedTracks = {
        played: []
    };

    return {
        storePlayedTrack: storePlayedtrack,
        getPlayedTracks: getPlayedTracks          
    };


    function storePlayedTrack(track) {

        playedTracks = $window.localstorage['playedTracks'] || {played: []};
        playedTracks.played.push(track);

        $window.localstorage['playedTracks'] = playedTracks;
    }

    function getPlayedTracks() {

        return $window.localstorage['playedTracks'] || {played: []};
    }

}





