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
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User, $rootScope) {

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

    $scope.closeSignupModal = function(callback) {

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

    $scope.login = function () {

        $cordovaFacebook.login(["email","public_profile","user_friends"]).then(function (success) {
        // $cordovaFacebook.login(["user_education_history", "friends_education_history"]).then(function (success) {
        $scope.loginInfo = success;

        $scope.getMe();
        console.log('Getting Facebook information...');

        //get user information
      },

      //error function
      function (error) {
        $scope.error = error;
        console.log('FB CONNECT FAILED...');
        console.log('Error from logging from facebook:' + JSON.stringify(error));
        $scope.logout();
      });

    };


     $scope.getMe = function () {
      $cordovaFacebook.api("/me", null).then(function (success) {

        $scope.user.first_name = success.first_name;
        $scope.user.last_name = success.last_name;
        $scope.user.name = success.name;
        $scope.user.email = success.email;
        $scope.user.fb_id = success.id;
        // $scope.user.profile_url = "https://graph.facebook.com/" + success.id + "/picture?width=100&height=100";

        $scope.signupForm.email = success.email;
        $scope.signupForm.first_name = $scope.user.first_name;
        $scope.signupForm.last_name = $scope.user.last_name;
        $scope.signupForm.fb_id = success.id;
        $scope.signupForm.profile_url = $scope.user.profile_url;
        $scope.signupForm.gender = success.gender;


        $scope.completeSignup();


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


      if (window.StatusBar) {
          StatusBar.styleDefault();
      }


      if ($scope.signupModal.isShown()) {
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
      $scope.login();
    }

    $scope.validateLoginForm = function() {
      var formDict = $scope.signupForm;

      function validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

      if (!formDict.email) {
        alert('Please enter your email');
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
        alert('Please fill in all fields!');
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
        alert('Please fill in all fields!');
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
        alert('Please fill in all fields!');
        document.getElementsByName('signup-email')[0].focus();
        var shake = document.getElementById('input_email')
        shake.classList.add('animated', 'shake');
        setTimeout(function() {
          shake.classList.remove('animated', 'shake');
        }, 950);
        return false;
      }

      if (!validateEmail(formDict.email)) {
        alert('Please fill in all fields!');
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
        alert('Please fill in all fields!');
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

      var loginPayload = {
        'email': $scope.signupForm.email,
        'password': $scope.signupForm.password
      }

      loginPayload.student_courses = $scope.user.student_courses;
      loginPayload.university_id = $scope.user.university_id;
      loginPayload.current_device = $scope.user.current_device;

      if ($scope.user.current_device && $scope.user.current_device.id) {
        $scope.loginPayload.current_device_id = $scope.user.current_device.id;
      }

      User.login(loginPayload).then(function(user) {

          var processed_user = User.process_results(user.plain());
          User.assign_properties_to_root_scope($scope, processed_user)
          $scope.user.guru_mode = false;
          $localstorage.setObject('user', $scope.user);

      }, function(err) {
        if (err.status === 401) {
            $scope.signupForm.password = '';
            alert('Incorrect username or password', 'Sorry!', 'OK');
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

      User.create($scope.signupForm).then(function(user) {
          var processed_user = User.process_results(user.plain());

          console.log(JSON.stringify($scope.user));

          User.assign_properties_to_root_scope($scope, processed_user)

          $scope.user.guru_mode = false;
          // $scope.user.updateAttr('guru_mode', $scope.user, false);

          $localstorage.setObject('user', $scope.user);


          //if we are about to create a request
          if ($state.current.name === 'root.student-request') {
                var callRequestHelp = function() {
                  $scope.requestHelp();
                }

                $scope.closeSignupModal(callRequestHelp);
            }


          if ($scope.becomeGuruButtonClicked) {

            $scope.closeSignupModal(function() {
                $scope.becomeGuruModal.show();
            });

          }


            else {
              User.getUserFromServer($scope, null, $state);
              $scope.closeSignupModal(function() {
                // $scope.bottomTabsDelegate.select(0);
              });

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

  }

]);
