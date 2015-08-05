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
  '$ionicActionSheet',
  '$ionicPopup',
  'Camera',
  'Support',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $cordovaFacebook, User,
  $rootScope, $controller, $ionicSideMenuDelegate, $cordovaPush,
  $ionicViewSwitcher, $ionicHistory, $ionicActionSheet, $ionicPopup,
  Camera, Support) {

    $scope.root.vars.show_account_fields = false;
    $scope.loginMode = false;
    $scope.headerText = 'Sign Up';
    $scope.resetMode = false;


    $scope.support_index = 0;
    $scope.supportTicket = {};

    $scope.settings = {}
    $scope.settings.icons = {
      profile: ($scope.user && $scope.user.id),
      notifications: false,
      card: false,
      support: false,
      guru: false,
      groceries:false,
      presignup: !($scope.user && $scope.user.id),
    }

    $scope.resetSettingsIcons = function() {
      $scope.settings.icons.profile = true;
      $scope.settings.icons.notifications = false;
      $scope.settings.icons.card = false;
      $scope.settings.icons.support = false;
      $scope.settings.icons.guru = false;
      $scope.settings.icons.groceries = false;
    }

    $scope.selectedCurrentHourly = 10;

    $scope.setSettingsToIndex = function(index) {


      $scope.root.vars.settings = {icons : {profile : false}};

      for (var i = 0; i < Object.keys($scope.settings.icons).length; i++ ) {

        var settingsKey = Object.keys($scope.settings.icons)[i];

        //previously true, now false
        if ($scope.settings.icons[settingsKey]) {
          $scope.settings.icons[settingsKey] = false;
        }

        //needs to be true now

        if ((i + 1) === index) {
          $scope.settings.icons[settingsKey] = true;
        }

      }

      if (index === 5 && $scope.user.id) {
        if ($scope.root.vars.guru_mode) {

          $scope.root.vars.guru_mode = false;
          $scope.goToStudentMode();

        } else {
          $scope.goToGuru();
        }
      }



    }

    if ($scope.user && $scope.user.current_hourly) {
      $scope.selectedCurrentHourly = $scope.user.current_hourly + '';
    }



    if (!$scope.loginMode) {
      $scope.loginMode = false;
    }

    $scope.toggleAccountView = function() {

      $scope.root.vars.show_account_fields = !$scope.root.vars.show_account_fields;

    }

    $scope.goToEditCourses = function() {
      $scope.loader.show();
      $state.go('^.courses');
      $timeout(function() {
        $scope.loader.hide();
      }, 750);
    }

    $scope.attemptToResetPassword = function() {
      function validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

      if (!validateEmail($scope.signupForm.email)) {
        alert('Please enter valid email');
        return;
      }

      var successCallback = function() {
          $scope.loader.hide();
          alert("Reset Successful.\nPlease check " + $scope.signupForm.email.toLowerCase() + ' for more details!');
          $scope.signupForm.email = '';
      }

      var failureCallback = function(err) {
        if (err && err.status === 404) {
          alert('The email ' + $scope.signupForm.email + ' does not exist in our records.\n Try again?');
        }
      }

      $scope.user.updateAttr('forgot_password', $scope.user, $scope.signupForm.email, successCallback, $scope, failureCallback);
      $scope.loader.show();
      $timeout(function() {
        $scope.toggleBackToLoginMode();
      }, 500)
    }

    $scope.toggleResetModeFromLogin = function() {
      $scope.loginMode = false;
      $scope.resetMode = !$scope.loginMode;
      if (!$scope.loginMode && !$scope.signupMode) {
        $scope.headerText = 'Reset Password';
      }
      $timeout(function() {
        var email_input = document.getElementById('email-input')
          if (email_input) {
            email_input.focus();
          }
      }, 500)
      $timeout(function() {
        $scope.loader.hide();
      }, 750);
    }

    $scope.toggleBackToLoginMode = function() {
      $scope.loginMode = true;
      $scope.resetMode = !$scope.loginMode;
      $scope.headerText = 'Log In';
      $scope.loader.show();
      $timeout(function() {
        var email_input = document.getElementById('email-input')
          if (email_input) {
            email_input.focus();
          }
      }, 500)
      $timeout(function() {
        $scope.loader.hide();
      }, 750);
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

    $scope.setSupportIndex = function(index) {
      $scope.support_index = index;
    }

    $scope.submitSupport = function() {

      if (!$scope.support_index) {
        alert('Please submit one of the 6 support options');
        return;
      }

      if (!$scope.supportTicket.description || $scope.supportTicket.description.length === 0)  {
        alert('Please write a message so we can help!');
        return;
      }

      $scope.loader.show();
      $scope.supportTicket.message = $scope.support_index.toString() + '|' + $scope.supportTicket.description;

      $scope.supportTicket.user_id = $scope.user.id;
      Support.create($scope.supportTicket).then(function(){
        $scope.success.show(0, 3500, 'Your support message has been submitted. <br> <br> We will get back to you very soon!');
        $scope.supportTicket.description = '';
        $scope.support_index = 0;
      }, function(err) {
        console.log('error from server', err);
      } );
    }

    $scope.goBack = function(callback,direction) {
      //part of a request
      if ($state.current.name === 'root.home') {
        if ($scope.signupModal && $scope.signupModal.isShown())  {
          $scope.signupModal.hide()
        }
      }


      if ($state.current.name === 'root.signup') {
        $scope.loader.show();
        $ionicSideMenuDelegate.toggleRight();
        $timeout(function() {
          $scope.loader.hide();
        }, 500);
      }

    }

    $scope.signupForm = {
      first_name: null,
      last_name: null,
      email: null,
      password:null
    }

    $scope.showActionSheetProfilePhoto = function() {

      //desktop only
      if (!$scope.platform.mobile) {
          $scope.takePhoto(0);
          return;
      }

      var options = [{ text: 'Choose from Library' }];
      if ($scope.platform.mobile) {
        options.push({text: 'Take a Photo'})
      }

     // Show the action sheet
     $scope.closeAttachActionSheet = $ionicActionSheet.show({
       buttons: options,
       cancelText: 'Cancel',
       cancel: function() {
            $scope.closeAttachActionSheet();
        },
       buttonClicked: function(index) {
          $scope.takePhoto(index);

          $timeout(function() {
              $scope.closeAttachActionSheet();
          }, 500);
       }
     });
    }

    $scope.takePhoto = function(index) {


      if ($scope.platform.mobile) {
        Camera.takePicture($scope, index, true);
      } else {
        var element = document.getElementById('file-input-web-sidebar')
        element.click();
      }
    }

    $scope.file_changed = function(element) {
        var photofile = element.files[0];

        var reader = new FileReader();


        var image = document.getElementById('become-guru-profile');

        reader.onload = function(e) {
            $scope.user.profile_url = e.target.result;
        };

        reader.readAsDataURL(photofile);


        var formData = new FormData();

        formData.append('file', photofile);
        formData.append('profile_url', $scope.user.id);

        formData.append('filename', name);

        $scope.file_index += 1;

        $scope.loader.show();
        callbackSuccess = function() {
          $scope.loader.hide();
          $scope.success.show(0, 1500, 'Saved!');
        }

        $scope.user.createObj($scope.user, 'files', formData, $scope, callbackSuccess);
    };


    $scope.showPopupEditEmail = function() {

      $scope.data = {email:$scope.user.email};

      $scope.inputPopup = $ionicPopup.show({
          template: '<input style="padding:2px 4px;" type="text" ng-model="data.email" autofocus>',
          title: 'Edit email',
          subTitle: 'Please your main school one',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                $scope.inputPopup.close();
                $scope.user.email = $scope.data.email;


                var failureCallback = function(err) {
                  if (err.status === 401) {
                    $scope.loader.hide();
                    $scope.signupForm.password = '';
                    alert('Another account already exists with this email. Please login with that email or try again.');
                  }
                }

                var successCallback = function() {
                  $scope.loader.hide();
                  $scope.success.show(0, 1000, 'Saved!');
                }
                $scope.loader.show();

                $scope.user.updateAttr('change_email', $scope.user, $scope.user.email, successCallback, $scope, failureCallback);

              }
            }
          ]
        });
    };

    $scope.showPopupEditPassword = function() {
      $scope.data = {email: $scope.user.email}
      template = '<input style="padding:2px 4px; margin-bottom:4px;" type="password" ng-model="data.old_password" placeholder="old password" autofocus><input style="padding:2px 4px;" type="password" ng-model="data.new_password" placeholder="new password">'
      if ($scope.user.fb_id && !$scope.user.password) {
        template = '<input style="padding:2px 4px; margin-bottom:4px;" type="password" ng-model="data.old_password" placeholder="new password" autofocus><input style="padding:2px 4px;" type="password" ng-model="data.new_password" placeholder="confirm password">'
      }

      $scope.inputPopup = $ionicPopup.show({
          template: template,
          title: 'Change your password',
          subTitle: 'Must be longer than 6 characters',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {

                if (!$scope.data.old_password || !$scope.data.new_password || $scope.data.new_password.length < 7) {
                  alert('Please fill in all fields');
                  return;
                }

                if ($scope.data.new_password.length < 7) {
                  alert('Please create a password longer than 6 characters');
                  return;
                }

                var successCallback = function() {
                  $scope.inputPopup.close();
                  $timeout(function() {
                    $scope.success.show(0, 1000, 'Saved!');
                  }, 500);
                }

                var failureCallback = function() {
                  alert('Incorrect Password - try again?');
                }

                var payload = {
                  email : $scope.user.email,
                  new_password : $scope.data.new_password,
                  old_password: $scope.data.old_password
                }

                $scope.user.updateAttr('change_password', $scope.user, payload, successCallback, $scope, failureCallback);

              }
            }
          ]
        });

    }


    $scope.showPopupEditName = function() {

      $scope.data = {name:$scope.user.name};

      $scope.inputPopup = $ionicPopup.show({
          template: '<input style="padding:2px 4px;" type="text" ng-model="data.name" autofocus>',
          title: 'Change your try identity',
          subTitle: 'Try not to troll too hard',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.name || $scope.data.name.length < 2) {
                  alert('Please enter a valid name');
                  return;
                }
                $scope.inputPopup.close();
                $scope.user.name = $scope.data.name;
                $scope.user.updateAttr('name', $scope.user, $scope.user.name, null, $scope);
                $scope.success.show(0, 1000, 'Saved!');
              }
            }
          ]
        });
    };

    //settings info
    $scope.editAccountInfoActionSheet = function() {

      var options = [{text: 'Edit Name'},{text: 'Edit Email'}];
      if ($scope.user.fb_id && !$scope.user.password){
        options.push({text: 'Create Password'});
      } else {
        options.push({text: 'Edit Password'});
      }
        // Show the action sheet
        $scope.closeAttachActionSheet = $ionicActionSheet.show({
            buttons: options,
            titleText: '<span class="semibold uppercase">Edit Account Settings</span>',
            cancelText: 'Cancel',
            cancel: function() {
                $scope.closeAttachActionSheet();
            },
            buttonClicked: function(index) {

              // fire profile photo
              if (index === 0) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.showPopupEditName();
                }, 500);
              }

              if (index === 1) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.showPopupEditEmail();
                }, 500);

              }

              if (index === 2) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.showPopupEditPassword();
                }, 500);

              }

            }
      });

    }



    $scope.transitionToUniversity = function() {
      $state.go('^.university-container');
    }

    $scope.transitionToMajor = function() {
      $state.go('^.majors-container');
    }

    $scope.goToMajorPage = function() {

      $scope.closeAttachActionSheet();
          $scope.loader.show();
          $scope.transitionToMajor()
          $timeout(function() {
          $scope.loader.hide();
          $ionicSideMenuDelegate.toggleRight();
      }, 1000);

    }

    $scope.showStudentEditActionSheet = function() {

        var options = [{text: 'Profile Photo'},{text: 'University'}, {text: 'Major'}, {text: 'Account Information'}];

        // Show the action sheet
        $scope.closeAttachActionSheet = $ionicActionSheet.show({
            buttons: options,
            titleText: '<span class="semibold uppercase">What would you like to edit?</span>',
            cancelText: 'Cancel',
            cancel: function() {
                $scope.closeAttachActionSheet();
            },
            buttonClicked: function(index) {

              // fire profile photo
              if (index === 0) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.showActionSheetProfilePhoto();
                }, 500);
              }

              if (index === 1) {
                $scope.closeAttachActionSheet();
                $scope.loader.show();
                $scope.transitionToUniversity()
                $timeout(function() {
                  $scope.loader.hide();
                  $ionicSideMenuDelegate.toggleRight();
                }, 1000);
              }

              if (index === 2) {
                $scope.goToMajorPage();
              }

              if (index === 3) {
                $scope.closeAttachActionSheet();
                $timeout(function() {
                  $scope.editAccountInfoActionSheet();
                }, 500);
              }

            }
      });
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
      if ($scope.user.is_admin && confirm('Are you sure you want to reset your admin account?')) {

        $scope.loader.show();
        User.clearAttr($scope.user, $scope.user.id).then(
          function(user) {

            $scope.loader.hide();
            $scope.user.university_id = null;
            $scope.success.show(0, 2000,'Admin Account Successfully cleared!');
            $ionicSideMenuDelegate.toggleRight();
            $scope.logoutUser();
            $scope.goToBeginning();
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

    $scope.goToEditCourses = function() {
      $scope.loader.show();
      $state.go('^.courses');

      $timeout(function() {
        $ionicSideMenuDelegate.toggleRight();
        $scope.loader.hide();
      }, 750);
    }

    $scope.goToBecomeGuru = function() {
      if (!$scope.user || !$scope.user.id) {
        if (confirm('You need to have an account to become a guru. Continue?')) {
            $scope.goToSignupFromSideBar();
        }
        return;
      }


      $scope.loader.show();
      $scope.root.vars.guru_mode = false;
      $state.go('^.become-guru');

      $scope.user.updateAttr('is_a_guru', $scope.user, {'is_a_guru': true}, null, $scope);

      $timeout(function() {
        $ionicSideMenuDelegate.toggleRight();
        $scope.loader.hide();
      }, 750)
    }

    $scope.goToGuru = function() {

      $scope.loader.show();


      //if no skills, courses, or majors
      if ($scope.user && (($scope.user.guru_courses.length === 0)  || ($scope.user.guru_skills.length === 0)
      || ($scope.user.majors.length === 0))  && confirm('Your guru account is not complete. Complete it?')) {
        $state.go('^.become-guru');
      } else {
        $state.go('^.guru');
      }


      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': true}, null, $scope);

      $timeout(function() {
        $ionicSideMenuDelegate.toggleRight();
        $scope.loader.hide();
      }, 750)

      $timeout(function() {
        $scope.root.vars.guru_mode = true;
      }, 1000)
    }

    $scope.goToPaymentsFromSideBar = function(payment) {


      $scope.loader.show();
      if (payment) {
        console.log('passing payments', payment);
        $scope.root.vars.editCardClicked = true;
        $state.go('^.payments', {cardObj:JSON.stringify(payment)})
      } else {
        $state.go('^.payments');
      }


      $timeout(function() {
        $ionicSideMenuDelegate.toggleRight();
        $scope.loader.hide();
      }, 750);
    }

    $scope.launchSupportDescriptionModal = function() {


      $ionicModal.fromTemplateUrl(BASE + 'templates/support.description.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.supportDescriptionModal = modal;
            $scope.supportDescriptionModal.show();
        });

    }


    $scope.goToSignupFromSideBar = function() {
      $scope.resetSettingsIcons();
      $scope.loader.show();
      $state.go('^.signup');

      $timeout(function() {
        $ionicSideMenuDelegate.toggleRight();
        $scope.loader.hide();
      }, 750);

    }

    $scope.goToStudent = function() {


      $scope.loader.show();
      $state.go('^.home');

      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': false}, null, $scope);

      $timeout(function() {
        $ionicSideMenuDelegate.toggleRight();
        $scope.loader.hide();
      }, 750)

      $timeout(function() {
        $scope.root.vars.guru_mode = false;
      }, 1000)
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
      $scope.root.vars.guru_mode = false;
      $state.go('^.home');
      $scope.user.updateAttr('guru_mode', $scope.user, {'guru_mode': false}, null, $scope);
      $timeout(function() {
          $ionicSideMenuDelegate.toggleRight();
      }, 500);
    }

    var initFacebookConnect = function() {
      return {
        getLoginStatus: function (s, f) {
      // Try will catch errors when SDK has not been init
      try {
        FB.getLoginStatus(function (response) {
          s(response);
        });
      } catch (error) {
        if (!f) {
          console.error(error.message);
        } else {
          f(error.message);
        }
      }
    },

    showDialog: function (options, s, f) {

      if (!options.name) {
        options.name = "";
      }
      if (!options.message) {
        options.message = "";
      }
      if (!options.caption) {
        options.caption = "";
      }
      if (!options.description) {
        options.description = "";
      }
      if (!options.link) {
        options.link = "";
      }
      if (!options.picture) {
        options.picture = "";
      }

      // Try will catch errors when SDK has not been init
      try {
        FB.ui({
            method: options.method,
            message: options.message,
            name: options.name,
            caption: options.caption,
            description: (
              options.description
              ),
            link: options.link,
            // JS SDK expects href and not link
            href: options.link,
            picture: options.picture
          },
          function (response) {
            if (response && (response.request || !response.error_code)) {
              s(response);
            } else {
              f(response);
            }
          });
      } catch (error) {
        if (!f) {
          console.error(error.message);
        } else {
          f(error.message);
        }
      }
    },
    // Attach this to a UI element, this requires user interaction.
    login: function (permissions, s, f) {
      // JS SDK takes an object here but the native SDKs use array.

      var permissionObj = {};
      if (permissions && permissions.length > 0) {
        permissionObj.scope = permissions.toString();
      }


      FB.login(function (response) {
        if (response.authResponse) {
          s(response);
        } else {
          f(response.status);
        }
      }, permissionObj);
    },

    getAccessToken: function (s, f) {
      var response = FB.getAccessToken();
      if (!response) {
        if (!f) {
          console.error("NO_TOKEN");
        } else {
          f("NO_TOKEN");
        }
      } else {
        s(response);
      }
    },

    logEvent: function (eventName, params, valueToSum, s, f) {
      // AppEvents are not avaliable in JS.
      s();
    },

    logPurchase: function (value, currency, s, f) {
      // AppEvents are not avaliable in JS.
      s();
    },

    logout: function (s, f) {
      // Try will catch errors when SDK has not been init
      try {
        FB.logout(function (response) {
          s(response);
        });
      } catch (error) {
        if (!f) {
          console.error(error.message);
        } else {
          f(error.message);
        }
      }
    },

    api: function (graphPath, permissions, s, f) {
      // JS API does not take additional permissions

      // Try will catch errors when SDK has not been init
      try {
        FB.api(graphPath, function (response) {
          if (response.error) {
            f(response);
          } else {
            s(response);
          }
        });
      } catch (error) {
        if (!f) {
          console.error(error.message);
        } else {
          f(error.message);
        }
      }
    },

    // Browser wrapper API ONLY
    browserInit: function (appId, version) {
      if (!version) {
        version = "v2.0";
      }
      console.log(appId);
      console.log(version);
      FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: version
      });
    }
  }
  }

  $scope.isWindowsPlatform = function() {
    return (navigator.userAgent.match(/iemobile/i) || navigator.userAgent.match(/Windows Phone/i)  || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent === 'Win32NT');
  };

    $scope.fbAuthBrowser = function() {
      var appID = 1416375518604557;
      var fbVersion = "v2.2";
      var mobileWeb = ($scope.platform.web && (ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone())) || $scope.isWindowsPlatform();
      if (!facebookConnectPlugin) {
        var facebookConnectPlugin = initFacebookConnect();
      }
      var fbCheckStatusCallback = function(response) {

        if ((mobileWeb && $scope.platform.web) || $scope.isWindowsPlatform()) {
              if (response.status === "unknown") {
                var login_redirect_uri = "http://uguru.me/app/";
                var login_response_type = 'token';
                var loginURL = 'https://www.facebook.com/dialog/oauth?client_id=' + 1416375518604557 + '&redirect_uri=' + login_redirect_uri + '&response_type=' + login_response_type;
                $localstorage.set('mobile-web-auth', true);
                window.location.replace(loginURL);
              } else if (response.status === "connected"){
                $scope.loader.show();
                var successCallback = function(success) {
                  var postSuccessCallback = function() {
                    $scope.loader.hide();
                    $scope.success.show(0, 1000, 'Login Successful!');
                    $scope.settings.icons.profile = true;
                  }
                  $scope.postFbGraphApiSuccess(success, postSuccessCallback)
                }
                facebookConnectPlugin.api('/me', null, successCallback);
            }
        } else {
          // facebookConnectPlugin.login( ["email","public_profile","user_friends"],facebookAuthSuccessCallback,
          // facebookAuthFailureCallback);
            if ($cordovaFacebook && $cordovaFacebook.login) {
              $cordovaFacebook.login(["email","public_profile","user_friends"])
                  .then(facebookAuthSuccessCallback, facebookAuthFailureCallback);
            } else {
              facebookConnectPlugin.login(["email","public_profile","user_friends"], fbCheckStatusCallback, facebookAuthFailureCallback);
            }
        }
      }


      facebookConnectPlugin.browserInit(appID,fbVersion);
      facebookConnectPlugin.getLoginStatus(fbCheckStatusCallback, facebookAuthFailureCallback);



    };

    var facebookAuthSuccessCallback = function (success) {
        // $cordovaFacebook.login(["user_education_history", "friends_education_history"]).then(function (success) {

        $scope.loginInfo = success;
        console.log('success', success);

        var successCallback = function() {
            $scope.loader.hide();
            $scope.loader.hide();
            $scope.success.show(0, 1500, 'Login Successful!');
            $scope.settings.icons.profile = true;
        }
        $scope.facebookApiGetDetails(successCallback);
        console.log('Getting Facebook information...');
    }

    var facebookAuthFailureCallback = function(error) {
        $scope.loader.hide();
        $scope.error = error;
        console.log('FB CONNECT FAILED...');
        console.log('Error from logging from facebook:' + JSON.stringify(error));
        $cordovaFacebook.logout();
        if ($cordovaFacebook) {
          $cordovaFacebook.logout();
        }


    }

    $scope.fbAuthNative = function() {
      $cordovaFacebook.login(["email","public_profile","user_friends"])
      .then(facebookAuthSuccessCallback, facebookAuthFailureCallback);
    }

    $scope.connectWithFacebook = function () {

        $scope.loader.show();


        if ($scope.platform.web || $scope.platform.windows || $scope.isWindowsPlatform()) {
          // $scope.fbAuthNative();
          $scope.fbAuthBrowser();
        } else {
          $scope.fbAuthNative();
        }


    };

    $scope.closeSideBar = function() {


      if ($state.current.name === 'root.home') {
        $ionicSideMenuDelegate.toggleRight()
      }
      else {

        $timeout(function() {
          $ionicSideMenuDelegate.toggleRight()
          $scope.loader.hide();
        }, 500)


        $scope.loader.show();

        if ($scope.root.vars.guru_mode) {
          $state.go('^.guru');
        } else {
          $state.go('^.home');
        }


      }
    }

    $scope.postFbGraphApiSuccess = function(success, callback) {
        console.log(success);
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

        if (callback) {
          callback();
        }
    }

     $scope.facebookApiGetDetails = function (callback) {
      var successCallback = function(success) {
        $scope.postFbGraphApiSuccess(success, callback)
      }
      $cordovaFacebook.api("/me", null).then(successCallback, function (error) {
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

          $scope.success.show(0, 1250, 'Login Successful!');
          $scope.settings.icons.profile = true;
          $scope.root.vars.settings = {icons : {profile : true}};


          if ($state.current.name === 'root.home') {
            $timeout(function() {
              $scope.loader.hide();
            }, 500);
            $ionicHistory.goBack();
          }

          if ($state.current.name === 'root.signup') {
            $timeout(function() {
              $ionicSideMenuDelegate.toggleRight();
            }, 500);
          }



      }, function(err) {
        if (err.status === 401) {
            $scope.signupForm.password = '';
            $scope.success.show(0, 1000, 'Incorrect username or password');
        }
      });
    }

    $scope.completeSignup = function() {

      if ($scope.loginMode) {
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
          User.assign_properties_to_root_scope($scope, processed_user);
          $scope.user.guru_mode = false;
          $localstorage.setObject('user', $scope.user);


          $scope.settings.icons.profile = true;
          $scope.root.vars.settings = {icons : {profile : true}}


          if ($state.current.name === 'root.signup') {
            $scope.success.show(0, 1000, 'Account Successfully Created!');
            $timeout(function() {
              $ionicSideMenuDelegate.toggleRight();
            }, 500);
          }

          if ($state.current.name === 'root.home') {
            $scope.loader.show();
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


    if ($localstorage.get('mobile-web-auth')) {
      $localstorage.removeObject('mobile-web-auth');
      var postFbCheckStatusCallback = function(response) {
        $scope.loader.show();
        var successCallback = function(success) {
          var postSuccessCallback = function() {
            $scope.loader.hide();
            $scope.success.show(0, 2500, 'Login Successful!');
            $scope.settings.icons.profile = true;
            $ionicSideMenuDelegate.toggleRight();
          }
          $scope.postFbGraphApiSuccess(success, postSuccessCallback)
        }
        facebookConnectPlugin.api('/me', null, successCallback);
      }

      if (!facebookConnectPlugin) {
        var facebookConnectPlugin = initFacebookConnect();
      }
      facebookConnectPlugin.getLoginStatus(postFbCheckStatusCallback, facebookAuthFailureCallback);
    }
              // 2.onboarding check local storage
                // 3. check fbCheckStatus callback
                // 4. Autu log them in




  }

]);
