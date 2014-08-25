
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // testAPI();
      createFBAccount();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function fb_login(){
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID
            console.log(access_token)
            console.log(user_id)
            createFBAccount();

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_stream,email'
    });
}

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1416375518604557',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  // FB.getLoginStatus(function(response) {
  //   statusChangeCallback(response);
  // });

  };

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  // function testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //     console.log(response);
  //     console.log('Successful login for: ' + response.name);
  //     document.getElementById('status').innerHTML =
  //       'Thanks for logging in, ' + response.name + '!';
  //   });
  // }

  function createFBAccount() {
    FB.api('/me', function(response) {
      var data_dict = {
                'student-signup': true,
                'fb-signup': true,
                'name': response.first_name + ' ' + response.last_name,
                'email': response.email,
                'password': '',
            }



      if ($('#tutor-next-link:visible').length > 0) {
        data_dict['tutor-signup'] = true;
      } 
      
      $.ajax({
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        url: '/validation/' ,
        data: JSON.stringify(data_dict), 
        dataType: "json",
        success: function(result) {
            if (result.dict['fb-account-exists']) {
              window.location.replace('/');
            }

            if (request_form_complete) {
                submit_request_form_to_server();
            }
            else if (result.dict['tutor-signup']) {
              window.location.replace('/apply-guru/');
            }
            else {
              $('#student-next-link').hide();
              $('input[name="student-name"]').val('');
              $('input[name="student-email"]').val('');
              $('input[name="student-password"]').val('');
              $('input[name="student-name"]').css('border-color','grey');
              $('input[name="student-email"]').css('border-color','grey');
              $('input[name="student-password"]').css('border-color','grey');
              $('#post-signup-span').show();
              $('#post-signup-span').delay(5000).fadeOut('slow', function() {
                $('#student-next-link').show();
              });
              return;
            }
          }
      });
    }); 
}
  function logoutFB() {
    FB.logout(function(response) {
      console.log('User has logged out of facebook');
    });
  }

