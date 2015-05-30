angular.module('uguru.util.controllers')

.controller('SignupController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  '$cordovaFacebook',
  'User',
  '$rootScope',
  '$controller',
  '$ionicSideMenuDelegate',
  '$cordovaPush',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User,
  $rootScope, $controller, $ionicSideMenuDelegate, $cordovaPush) {



    if (!$scope.loginMode) {
      $scope.loginMode = false;
    }

    $scope.toggleLoginMode = function() {
      $scope.loginMode = !$scope.loginMode;
    }

    $scope.signupForm = {
      first_name: null,
      last_name: null,
      email: null,
      password:null
    }

    $scope.resetSignupForm = function() {
      $scope.signupForm = {
        first_name: null,
        last_name: null,
        email: null,
        password:null
      }
    }

    $scope.resetAccount = function() {
      if (confirm('Are you sure you want to reset your admin account?')) {

        $scope.loader.show();
        User.clearAttr($scope.user, $scope.user.id).then(
          function(user) {
            console.log('cleared_user', user.plain());
            $scope.loader.hide();
            $scope.success.show(0, 2000,'Admin Account Successfully cleared!');
            $ionicSideMenuDelegate.toggleRight();
          },
          function(err) {
            console.log(err)
          });


        // $scope.loader.show();
      }
    }



    $scope.closeSignupModal = function(callback) {
      $scope.loader.hide();
      if ($scope.platform.mobile && $scope.root.keyboard.isVisible()) {
        $scope.root.keyboard.close();
        $timeout(function() {
          $scope.signupModal.hide();
          if (callback) {
            callback();
          }
        }, 300)
      } else {
        $scope.signupModal.hide();
        if (callback) {
          callback();
        }
      }
      $scope.resetSignupForm();

    }

    $scope.comingSoon = function() {
      $scope.success.show(0, 1500, 'Coming Soon!');
    }

    $scope.requestPushNotifications = function() {

      if (!$scope.user.push_notifications) {
        console.log('push notifications are false');
        $scope.user.updateAttr('push_notifications', $scope.user, $scope.user.push_notifications, null, $scope);
        return;
      }

      var iosConfig = {
          "badge": true,
          "sound": true,
          "alert": true,
      }

      $cordovaPush.register(iosConfig).then(function(deviceToken) {
        // Success -- send deviceToken to server, and store for future use
        console.log("deviceToken: " + deviceToken)

        console.log("Register success " + deviceToken);


        if ($scope.platform.ios) {
          console.log('updating the server...');
            $scope.user.push_notifications = true;
            $scope.user.current_device.push_notif = deviceToken;
            $scope.user.current_device.push_notif_enabled = true;
            // $scope.user.updateObj($scope.user.current_device, 'devices', $scope.user.current_device, $scope);

            payload = {
              'push_notifications': true
            }
            $scope.user.updateAttr('push_notifications', $scope.user, payload, null, $scope);
        }

      }, function(err) {
        console.log(err);
      });
    };


    $scope.goToGuruMode = function() {
      $ionicSideMenuDelegate.toggleRight();
      $timeout(function() {
          $state.go('^.guru');
          $scope.root.vars.guru_mode = true;
      }, 500);
    }

    $scope.login = function () {

        // $scope.loader.show();
        $cordovaFacebook.login(["email","public_profile","user_friends"]).then(function (success) {
        // $cordovaFacebook.login(["user_education_history", "friends_education_history"]).then(function (success) {
        $scope.loginInfo = success;
        console.log(success);

        $scope.getMe();
        console.log('Getting Facebook information...');
        $scope.loader.hide();
        //get user information
      },

      //error function
      function (error) {
        $scope.error = error;
        console.log('FB CONNECT FAILED...');
        console.log('Error from logging from facebook:' + JSON.stringify(error));
        $cordovaFacebook.logout();
        if ($cordovaFacebook) {
          $cordovaFacebook.logout();
        }
        $scope.loader.hide();
        // $scope.logout();
      });

    };


     $scope.getMe = function () {
      $cordovaFacebook.api("/me", null).then(function (success) {

        $scope.user.first_name = success.first_name;
        $scope.user.last_name = success.last_name;
        $scope.user.name = success.name;
        $scope.user.email = success.email;
        $scope.user.fb_id = success.id;
        console.log($scope.user.profile_url);

        $scope.signupForm.email = success.email;
        $scope.signupForm.first_name = $scope.user.first_name;
        $scope.signupForm.last_name = $scope.user.last_name;
        $scope.signupForm.fb_id = success.id;
        $scope.signupForm.profile_url = "https://graph.facebook.com/" + success.id + "/picture?width=100&height=100";
        $scope.signupForm.gender = success.gender;


        $scope.completeSignup();
        $scope.loader.hide();


      }, function (error) {
        $scope.error = error;
        console.log(error);
      });
    };

    $scope.fbConnect = function () {
      console.log('Attempting to login through facebook...');
      $scope.login();
    };

    $scope.$on('modal.shown', function() {


      // if (window.StatusBar) {
      //     StatusBar.styleDefault();
      // }


      if ($scope.signupModal && $scope.signupModal.isShown()) {
        // console.log('modal is shown');
        // $scope.root.keyboard.show('signup-first-name', 500);
        if ($scope.userClickedLoginModal) {
          $scope.loginMode = true;
        } else {
          $scope.loginMode = false;
        }
      }

    });

    $scope.signupFacebook = function() {
      console.log('printing user', JSON.stringify($scope.user));
      $scope.login();
    }



    $scope.validateLoginForm = function() {
      var formDict = $scope.signupForm;

      function validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

      if (!formDict.email) {
        $scope.success.show(0,2000,'Please enter your email');
        document.getElementsByName('login-email')[0].focus();
        var shake = document.getElementById('input_email_login')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      }


      if (!validateEmail(formDict.email)) {
        document.getElementsByName('login-email')[0].focus();
        var shake = document.getElementById('input_email_login')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      } else {
        $scope.user.email = $scope.signupForm.email;
      }

      if (!formDict.password) {
        document.getElementsByName('login-password')[0].focus();
        var shake = document.getElementById('input_password_login')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      } else {
        $scope.user.password = $scope.signupForm.password;
      }

      $scope.user.last_name = $scope.signupForm.last_name;
      $scope.user.email = $scope.signupForm.email;
      $scope.user.password = $scope.signupForm.password;

      return true;

    }

    $scope.validateSignupForm = function() {
      var formDict = $scope.signupForm;

      function validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

      if (!formDict.first_name) {
        $scope.success.show(0,2000,'Please fill in all fields!');
        document.getElementsByName('signup-first-name')[0].focus();
        var shake = document.getElementById('input_first')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      } else {
        $scope.user.first_name = $scope.signupForm.first_name;
      }

      if (!formDict.last_name) {
        $scope.success.show(0,2000,'Please fill in all fields!');
        document.getElementsByName('signup-last-name')[0].focus();
        var shake = document.getElementById('input_last')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      } else {
        $scope.user.last_name = $scope.signupForm.last_name;
      }

      if (!formDict.email) {
        $scope.success.show(0,2000,'Please fill in all fields!');
        document.getElementsByName('signup-email')[0].focus();
        var shake = document.getElementById('input_email')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      }

      if (!validateEmail(formDict.email)) {
        $scope.success.show(0,2000,'Please fill in all fields!');
        document.getElementsByName('signup-email')[0].focus();
        var shake = document.getElementById('input_email')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      } else {
        $scope.user.email = $scope.signupForm.email;
      }

      if (!formDict.password) {
        $scope.success.show(0,2000,'Please fill in all fields!');
        $scope.user.password = $scope.signupForm.password;
        document.getElementsByName('signup-password')[0].focus();
        var shake = document.getElementById('input_password')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      } else {
        $scope.user.password = $scope.signupForm.password;
      }

      $scope.user.last_name = $scope.signupForm.last_name;
      $scope.user.email = $scope.signupForm.email;
      $scope.user.password = $scope.signupForm.password;

      return true;

    }

    $scope.loginUser = function() {
      if (!$scope.validateLoginForm() && !$scope.user.fb_id) {
        return;
      }
      console.log('login attmepted');
      $scope.loginPayload = {
        'email': $scope.signupForm.email,
        'password': $scope.signupForm.password
      }

      $scope.loginPayload.student_courses = $scope.user.student_courses;
      $scope.loginPayload.university_id = $scope.user.university_id;
      $scope.loginPayload.current_device = $scope.user.current_device;

      if ($scope.user.current_device && $scope.user.current_device.id) {
        $scope.loginPayload.current_device_id = $scope.user.current_device.id;
      }

      User.login($scope.loginPayload).then(function(user) {

          var processed_user = User.process_results(user.plain());
          User.assign_properties_to_root_scope($scope, processed_user)
          $scope.user.guru_mode = false;
          $localstorage.setObject('user', $scope.user);
          var callback = function() {
            $scope.success.show(0, 2000, 'Login Successful!');
          }
          $scope.closeSignupModal(callback);

      }, function(err) {
        if (err.status === 401) {
            $scope.signupForm.password = '';
            $scope.success.show(0, 1000, 'Incorrect username or password');
        }
      });
    }

    $scope.completeSignup = function() {

      if (!$scope.user.fb_id && !$scope.validateSignupForm()) {
        return;
      }


      $scope.signupForm.name = $scope.signupForm.first_name + ' ' + $scope.signupForm.last_name;

      $scope.signupForm.student_courses = $scope.user.student_courses;
      $scope.signupForm.university_id = $scope.user.university_id;
      $scope.signupForm.current_device = $scope.user.current_device;

      if ($scope.user.current_device && $scope.user.current_device.id) {
        $scope.signupForm.current_device_id = $scope.user.current_device.id;
      }

      $scope.signupForm.guru_mode = false;
      $scope.loader.show();
      User.create($scope.signupForm).then(function(user) {
          var processed_user = User.process_results(user.plain());

          console.log(JSON.stringify($scope.user));

          User.assign_properties_to_root_scope($scope, processed_user)

          // if (!$scope.user.profile_url) {
          //   $scope.user.profile_url = $scope.signupForm.profile_url;
          // }
          $scope.user.guru_mode = false;
          // $scope.user.updateAttr('guru_mode', $scope.user, false);

          $localstorage.setObject('user', $scope.user);


          //if we are about to create a request
          if ($state.current.name === 'root.student-request') {
                var callRequestHelp = function() {
                  $scope.requestHelp();
                  $scope.loader.hide();
                }

                $scope.closeSignupModal(callRequestHelp);
            }





            User.getUserFromServer($scope, null, $state);
            $ionicSideMenuDelegate.toggleRight();

            if ($scope.root.vars.pending_request)  {



              $scope.root.vars.pending_request = false;

              $ionicModal.fromTemplateUrl(BASE + 'templates/contacting.modal.html', {
                      scope: $scope,
                      animation: 'slide-in-up'
                  }).then(function(modal) {
                      $scope.contactingModal = modal;
                      $scope.contactingModal.show();
              });

              $scope.user.createObj($scope.user, 'requests', $scope.root.vars.request, $scope);

              $timeout(function() {
                $scope.contactingModal.hide();
                console.log('saved request', $scope.root.vars.request);
              }, 5000);

            }

      },
      function(err){
        console.log(err);
        if (err.status === 409) {
          alert('Email already exists in our system! Login?');
          $scope.toggleLoginMode();
          $scope.signupForm.password = '';
        }
      });

    }

    $scope.showComingSoon = function() {
      $scope.progress_active = true;
          $cordovaProgress.showText(false, "Coming Soon!", 'center');
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 1000);
    }


    //if price modal
    if ($scope.root.vars.show_price_fields) {
      $scope.root.vars.show_profile_fields = false;
      $scope.hide_defaults = true;

    }




  }

]);
