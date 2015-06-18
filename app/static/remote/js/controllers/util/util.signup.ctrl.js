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
  '$ionicViewSwitcher',
  '$ionicHistory',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User,
  $rootScope, $controller, $ionicSideMenuDelegate, $cordovaPush,
  $ionicViewSwitcher, $ionicHistory) {

    $scope.root.vars.show_account_fields = false;
    $scope.loginMode = false;
    $scope.headerText = 'Sign Up';

    $scope.selectedCurrentHourly = 10;

    if ($scope.user && $scope.user.current_hourly) {
      $scope.selectedCurrentHourly = $scope.user.current_hourly + '';
    }

    if (!$scope.loginMode) {
      $scope.loginMode = false;
    }

    $scope.toggleAccountView = function() {

      $scope.root.vars.show_account_fields = !$scope.root.vars.show_account_fields;

    }

    $scope.toggleLoginMode = function() {
      $scope.loginMode = !$scope.loginMode;
      if (!$scope.loginMode) {
        $scope.headerText = 'Sign Up';

      } else {
        $scope.headerText = 'Log In';
      }

      $timeout(function() {

        if (!$scope.loginMode) {
        var first_name_input = document.getElementById('first-name-input')
          if (first_name_input) {
            first_name_input.focus();
          }
        } else {
          var email_input = document.getElementById('email-input')
          if (email_input) {
            email_input.focus();
          }
        }

      }, 250)

    }

    $scope.goBack = function(callback,direction) {
      //part of a request
      if ($state.current.name === 'root.home') {
        if ($scope.signupModal && $scope.signupModal.isShown())  {
          $scope.signupModal.hide()
        }
      }


      if ($state.current.name === 'root.signup') {
        $ionicViewSwitcher.nextDirection('back');
        $state.go('^.home');
      }

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

            $scope.loader.hide();
            $scope.user.university_id = null;
            $scope.success.show(0, 2000,'Admin Account Successfully cleared!');
            $ionicSideMenuDelegate.toggleRight();
            $timeout(function() {
              $state.go('^.onboarding');
            }, 1000)
          },
          function(err) {
            console.log(err)
          });


        // $scope.loader.show();
      }
    }

    $scope.goToEditUniversity = function() {
      $ionicSideMenuDelegate.toggleRight();
        $timeout(function() {
          $state.go('^.university');
        }, 500);
    }

    $scope.updateHourlyPrice = function(hourly) {
      $scope.user.updateAttr('current_hourly', $scope.user, {'current_hourly': parseInt(hourly)}, null, $scope);
    }

    $scope.goToBeginning = function() {
      if (!$scope.user || !$scope.user.id) {
        $ionicSideMenuDelegate.toggleRight();
        $scope.user.university_id = null;
        $localstorage.setObject('user', $scope.user);
        $timeout(function() {
          $state.go('^.onboarding');
        }, 500)
      }
    }

    $scope.goToBecomeGuru = function() {
      $ionicSideMenuDelegate.toggleRight();
      $scope.user.updateAttr('is_a_guru', $scope.user, {'is_a_guru': true}, null, $scope);
      $timeout(function() {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.become-guru');
      }, 500)
    }



    $scope.closeSignupModal = function(callback) {
      $scope.loader.hide();
      if ($scope.platform.mobile && $scope.signupModal &&  $scope.root.keyboard.isVisible()) {
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

    $scope.goToPaymentsFromSideBar = function() {
      $ionicSideMenuDelegate.toggleRight();
      $timeout(function() {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.payments');
      }, 300);
    }

    $scope.goToSignupFromSideBar = function() {
      $ionicSideMenuDelegate.toggleRight();
      $timeout(function() {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.signup');
      }, 300);
    }

    $scope.comingSoon = function() {
      $scope.success.show(0, 1500, 'Coming Soon!');
    }






    $scope.goToGuruMode = function() {

      $ionicSideMenuDelegate.toggleRight();
      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': true}, null, $scope);
      $timeout(function() {
          $state.go('^.guru');
          $scope.root.vars.guru_mode = true;
      }, 500);
    }

    $scope.goToStudentMode = function() {
      $ionicSideMenuDelegate.toggleRight();
      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': false}, null, $scope);
      $timeout(function() {
          $state.go('^.home');
          $scope.root.vars.guru_mode = false;
      }, 500);
    }

    $scope.login = function () {

        // $scope.loader.show();
        $cordovaFacebook.login(["email","public_profile","user_friends"]).then(function (success) {
        // $cordovaFacebook.login(["user_education_history", "friends_education_history"]).then(function (success) {
        $scope.loginInfo = success;
        console.log('success', success);

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
        $scope.success.show(0, 2000, 'Login Successful!');
        $timeout(function() {
          $ionicSideMenuDelegate.toggleRight();
        }, 1500);


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
          User.assign_properties_to_root_scope($scope, processed_user);
          $scope.user.guru_mode = false;
          $localstorage.setObject('user', $scope.user);

          $scope.success.show(0, 2000, 'Login Successful!');


          $scope.toggleAccountView();
          $ionicSideMenuDelegate.toggleRight();


      }, function(err) {
        if (err.status === 401) {
            $scope.signupForm.password = '';
            $scope.success.show(0, 1000, 'Incorrect username or password');
        }
      });
    }

    $scope.completeSignup = function() {

      if ($scope.loginMode && $scope.root.vars.show_account_fields) {
        $scope.loginUser();
        return;
      }

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

          User.assign_properties_to_root_scope($scope, processed_user);

          $scope.user.guru_mode = false;

          $localstorage.setObject('user', $scope.user);


          //signup normally from sidebar
          if ($state.current.name === 'root.signup') {
            $scope.success.show(0, 2000, 'Signup Successful!');
            $scope.show_account_fields = false;
            $timeout(function() {
              $ionicSideMenuDelegate.toggleRight();
            }, 500)
          }

          if ($state.current.name === 'root.home') {
            if ($scope.signupModal && $scope.signupModal.isShown()) {
              $scope.signupModal.hide();
            }
          }
          //if we are about to create a request
          if ($state.current.name === 'root.student-request') {
                var callRequestHelp = function() {
                  $scope.requestHelp();
                  $scope.loader.hide();
                }

                $scope.closeSignupModal(callRequestHelp);
            }

            User.getUserFromServer($scope, null, $state)

            if ($scope.root.vars.pending_request)  {

              $scope.root.vars.pending_request = false;

              $ionicModal.fromTemplateUrl(BASE + 'templates/contacting.modal.html', {
                      scope: $scope,
                      animation: 'slide-in-up'
                  }).then(function(modal) {
                      $scope.contactingModal = modal;
                      $scope.contactingModal.show();
              });

              $state.go('^.home');

              $scope.user.createObj($scope.user, 'requests', $scope.root.vars.request, $scope);

              $timeout(function() {
                $scope.contactingModal.hide();
                console.log('saved request', $scope.root.vars.request);
              }, 5000);

            }

      },
      function(err){
        console.log(err);
          $scope.loader.hide();
        if (err.status === 409) {
          alert('Email already exists in our system! Login?')
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

    $scope.$on('$ionicView.enter', function() {
      if (!$scope.loginMode) {
        var first_name_input = document.getElementById('first-name-input')
        if (first_name_input) {
          first_name_input.focus();
        }
      } else {
        var email_input = document.getElementById('email-input')
        if (email_input) {
          email_input.focus();
        }
      }
    });

    $scope.$on('modal.shown', function() {


        if ($scope.signupModal && $scope.signupModal.isShown()) {


            if (!$scope.loginMode) {
              var first_name_input = document.getElementById('first-name-input')
              if (first_name_input) {
                $timeout(function() {
                  first_name_input.focus();
                }, 500)
              }
            } else {
              var email_input = document.getElementById('email-input')
              if (email_input) {
                $timeout(function() {
                  email_input.focus();
                }, 500)
              }
            }

        }
    });





  }

]);
