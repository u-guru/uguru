angular.module('uguru.apps.controllers')
.factory('OauthService', [
    '$http',
    '$base64',
    'Utilities',
    OauthService]);

function OauthService($http, $base64, Utilities) {

    var providerName = 'soundcloud';

    var apiKeys = {

        spotify: {
            clientID: '92c73047ac914efe92e2dc0f05973e64',
            clientSecret: '47e725ae151c447cabb939d6b6fd9a63',
            redirectURI: 'https://www.uguru.me',
            authURL: 'https://accounts.spotify.com/authorize',
            tokenURL: 'https://accounts.spotify.com/api/token',
            searchURL: 'https://api.spotify.com/v1/search',
            scopes: '',
            token: ''
        },

        soundcloud: {
            clientID: 'c970a66ab4784eda175306f788804ece',
            clientSecret: '9e618139ee94a6cb94e1d28bfe9536eb',

            // redirectURI: 'https://www.uguru.me/localhost',
            redirectURI: 'http://localhost:8100',

            authURL: 'https://soundcloud.com/connect',
            tokenURL: 'https://api.soundcloud.com/oauth2/token',
            userURL: 'https://api.soundcloud.com/users',
            validateURL: 'https://api.soundcloud.com/me',
            playlistURL: 'http://api.soundcloud.com/tracks',
            scopes: '',
            token: ''
        }

    };


    return {
        login: login,
        validate: validate,
        search: search,
        searchPlaylist: searchPlaylist,
        getArtistTracks: getArtistTracks,
        getStream: getStream
    };



    function searchPlaylist(providerName, searchValue) {


        var encodedBody = "&client_id=" + apiKeys[providerName].clientID + "&access_token=" + apiKeys[providerName].token;

        var searchPlaylistRequest = {
            method: "GET",
            url: apiKeys[providerName].playlistURL + '?q=' + encodeURI(searchValue) + encodedBody
        };
        console.log("searchPlaylistRequest.url: " + searchPlaylistRequest.url);
        console.log("token is: " + apiKeys[providerName].token);
        return $http(searchPlaylistRequest);
    }

    function validate(providerName) {

        var validateRequest = {
            method: "GET",
            url: apiKeys[providerName] + "?oauth_token=" + apiKeys[providerName].token
        };

        $http(validateRequest).then(function(response) {

            console.log("Success in validate()");
            console.log(response);

        }, defaultErrorCallback);

    }


    function searchUsers(providerName, searchValue) {

        var searchUsersRequest = {
            method: "GET",
            url: apiKeys[providerName].userURL + "?q=" + encodeURI(searchValue)
        };
        console.log("searchUsersRequest.url: " + searchUsersRequest.url);

        return $http(searchUsersRequest);

    }


    function login(providerName, savedCode) {
        console.log("Attempting to login to: " + providerName);

        var url = apiKeys[providerName].authURL + "/?client_id=" + apiKeys[providerName].clientID + "&response_type=code&redirect_uri=" + apiKeys[providerName].redirectURI;

        if (Utilities.doesCordovaExist()) {

            var options = 'location=no,hardwareback=no,zoom=no,toolbar=no,';
            var target = '_blank';


            var ref = cordova.InAppBrowser.open(url, target, options);


            ref.addEventListener('loadstart', function(e) {

                var url = e.url;
                console.log("url: " + url);

                var code = url.split('code=')[1];
                console.log("code: " + code);

                if(code.indexOf('#') !== -1) {
                    console.log("detected #, stripping it out...");
                    code = code.substring(0, code.length - 1);
                    }


                if(code !== undefined) {
                    console.log("found code");
                    ref.close();

                    switch (providerName) {

                        case "soundcloud":
                            var authorizationBody = {
                                'grant_type': 'authorization_code',
                                'redirect_uri': apiKeys[providerName].redirectURI,
                                'code': code,
                                'client_id': apiKeys[providerName].clientID,
                                'client_secret': apiKeys[providerName].clientSecret
                            };

                            var encodedBody = "grant_type=authorization_code&redirect_uri=" + apiKeys[providerName].redirectURI + "&code=" + code + "&client_id=" + apiKeys[providerName].clientID + "&client_secret=" + apiKeys[providerName].clientSecret;
                            console.log("encodedBody " + encodedBody);

                            var encodedAuth = $base64.encode(apiKeys[providerName].clientID + ':' + apiKeys[providerName].clientSecret);
                            // console.log(authorizationRequest);
                            $http.defaults.headers.common.Authorization = 'Basic ' + encodedAuth;

                            var authorizationRequest = {
                                method: 'POST',
                                url: apiKeys[providerName].tokenURL,
                                data: encodedBody,
                                headers: {
                                    'Authorization': $http.defaults.headers.common.Authorization,
                                    // 'Content-Type': 'application/json'
                                    'Content-Type':'application/x-www-form-urlencoded'
                                }
                            };


                            $http(authorizationRequest).then(function(response) {

                                token = response.data;
                                console.log("token response");
                                console.log(response);
                                console.log("Fetching access token success! " + token.access_token);

                                apiKeys[providerName].token = token.access_token;

                                console.log("token is: " + apiKeys[providerName].token);

                                $http.defaults.headers.common.Authorization = 'Bearer ' + token.access_token;

                                // search('spotify', 'odesza', 'artist');

                            }, defaultErrorCallback);
                            break;

                        default: break;

                    }


                }

            });

        }

        else {

            console.log("cordova not detected");

             if (typeof savedCode === 'undefined') {
                document.location = url;
             }

            else if (typeof savedCode !== 'undefined') {
                console.log("found code");

                var authorizationBody = {
                    'grant_type': 'authorization_code',
                    'redirect_uri': apiKeys[providerName].redirectURI,
                    'code': savedCode,
                    'client_id': apiKeys[providerName].clientID,
                    'client_secret': apiKeys[providerName].clientSecret
                };

                var encodedBody = "grant_type=authorization_code&redirect_uri=" + apiKeys[providerName].redirectURI + "&code=" + savedCode + "&client_id=" + apiKeys[providerName].clientID + "&client_secret=" + apiKeys[providerName].clientSecret;
                console.log("encodedBody " + encodedBody);

                var authorizationRequest = {
                    method: 'POST',
                    url: apiKeys[providerName].tokenURL,
                    data: encodedBody
                };

                var encodedAuth = $base64.encode(apiKeys[providerName].clientID + ':' + apiKeys[providerName].clientSecret);
                $http.defaults.headers.common.Authorization = 'Basic ' + encodedAuth;

                return $http(authorizationRequest).then(function(response) {

                    var token = response.data;
                    apiKeys[providerName].token = token.access_token;
                    console.log("Fetching access token success! " + token.access_token);

                    $http.defaults.headers.common.Authorization = 'Bearer ' + token.access_token;



                }, defaultErrorCallback);
            }

        }


    }




    function search(providerName, searchValue, type) {

        if (providerName === 'soundcloud') {
            console.log("searching in soundcloud...");

            // var encodedBody = "&client_id=" + apiKeys[providerName].clientID + "&client_secret=" + apiKeys[providerName].clientSecret + "&access_token=" + apiKeys[providerName].token;

            var encodedBody = "&client_id=" + apiKeys[providerName].clientID + "&access_token=" + apiKeys[providerName].token;

            var searchUsersRequest = {
                method: "GET",
                url: apiKeys[providerName].userURL + "?q=" + encodeURI(searchValue) + encodedBody,
                // data: encodedBody,
                headers: {
                    'Authorization': $http.defaults.headers.common.Authorization,
                    // 'Content-Type': 'application/json'
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            };
            console.log("searchUsersRequest.url: " + searchUsersRequest.url);

            return $http(searchUsersRequest);

        }

        else if (providerName === 'spotify') {

            var searchRequest = {
                method: "GET",
                url: apiKeys[providerName].searchURL + "?q=" + encodeURI(searchValue) + "&type=" + type
            };

            console.log("searchRequest url: " + searchRequest.url);

            return $http(searchRequest);
        }

    }

    function getArtistTracks(artistID) {

        var encodedBody = "client_id=" + apiKeys[providerName].clientID + "&access_token=" + apiKeys[providerName].token;

        var userTracksRequest = {
            method: "GET",
            url: apiKeys[providerName].userURL + "/" + artistID + "/tracks" + "?" + encodedBody,
            // data: encodedBody,
            headers: {
                'Authorization': $http.defaults.headers.common.Authorization,
                // 'Content-Type': 'application/json'
                'Content-Type':'application/x-www-form-urlencoded'
            }
        };
        console.log("userTracksRequest.url: " + userTracksRequest.url);

        return $http(userTracksRequest);


    }


    function getStream(streamURL) {

        var encodedBody = "client_id=" + apiKeys[providerName].clientID + "&access_token=" + apiKeys[providerName].token + "&allow_redirects=False";

        var streamRequest = {
            method: "GET",
            url: streamURL + "?" + encodedBody,
            headers: {
                'Authorization': $http.defaults.headers.common.Authorization,
                // 'Content-Type': 'application/json'
                'Content-Type':'application/x-www-form-urlencoded'
            }
        };
        console.log("streamRequest.url: " + streamRequest.url);

        return streamRequest.url;

        // return $http(streamRequest);

    }






}





