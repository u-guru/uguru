(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1416375518604557',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.2'
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      console.log('user is connected... getting payload information');
      // Get general information
      FB.api('/me', function(response) {
        payload = response;

        // Get profile picture
        FB.api('/me/picture',{"type": "normal"}, function (response){
          payload["profile_url"] = response["data"]["url"];
          console.log('user is connected... got their photo');

          // Go try to create the user on the DB!

          var university = ($('body').data().universityName).toString();
          payload["university"] = university;

          //stringify that shit
          console.log(payload);
          payload = JSON.stringify(payload);

          $.ajax({
            url: '/api/v2/fb_connect',
            type: 'POST',
            contentType: 'application/json',
            data: payload,
            success: function (request){
              console.log(request);
              window.location.replace('/' + request.school + '/' + request.server_id);
              
            },
            error: function (request){
              console.log("Error from API");
            }
          });
        });
      });
    } else if (response.status === 'not_authorized') {
      console.log("App not authorized");
    } else {
      console.log("Not logged in to FB");
    }
  }

  function beginFbConnect() {
    console.log('trying to get fb account information');
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }