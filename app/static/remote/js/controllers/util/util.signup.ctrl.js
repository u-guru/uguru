angular.module('uguru.util.controllers')

.controller('SignupController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $cordovaProgress) {
    
    $scope.signupForm = {
      first_name: null,
      last_name: null,
      email: null,
      password:null
    }

    $scope.closeSignupModal = function(callback) {

      if ($scope.root.keyboard.isVisible()) {
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

    }

    $scope.$on('modal.shown', function() {

      if ($scope.signupModal.isShown()) {
        console.log('modal is shown');
        $scope.root.keyboard.show('signup-first-name', 500);
      }

    });

    $scope.signupFacebook = function() {
      $scope.showComingSoon();
    }

    $scope.showError = function(msg) {
      $scope.progress_active = true;
      $cordovaProgress.showText(false, msg, 'top');
      $timeout(function() {
        $cordovaProgress.hide();
        $scope.progress_active = false;
      }, 1000);

    }

    $scope.validateSignupForm = function() {
      var formDict = $scope.signupForm;

      function validateEmail(email) { 
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      } 

      if (!formDict.first_name) {
        $scope.showError('Please enter your first name');
        document.getElementsByName('signup-first-name')[0].focus();
        return false;
      } else {
        $scope.user.first_name = $scope.signupForm.first_name;
      }

      if (!formDict.last_name) {
        $scope.showError('Please enter your last name');
        document.getElementsByName('signup-last-name')[0].focus();
        return false;
      } else {
        $scope.user.last_name = $scope.signupForm.last_name; 
      }

      if (!formDict.email) {
        $scope.showError('Please enter email');
        document.getElementsByName('signup-email')[0].focus();
        return false;
      } 

      if (!validateEmail(formDict.email)) {
        $scope.showError('Please enter valid email address');
        document.getElementsByName('signup-password')[0].focus();
        return false;
      } else {
        $scope.user.email = $scope.signupForm.email; 
      }

      if (!formDict.password) {
        $scope.showError('Please enter password');
        return false;
      } else {
        $scope.user.password = $scope.signupForm.password; 
      }
      
      $scope.user.last_name = $scope.signupForm.last_name;
      $scope.user.email = $scope.signupForm.email;
      $scope.user.password = $scope.signupForm.password;
      
      return true;

    }

    $scope.showSuccess = function(msg) {
      if (!$scope.progress_active)  {
          $scope.progress_active = true;
          $cordovaProgress.showSuccess(true, msg)
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 1000);
      } else {

        console.log('Show success cannot be shown because progress bar is already active');
      }
    }

    $scope.signupAccount = function() {
      
      if ($scope.validateSignupForm()) {
      
        
        //Temporary user_id
        $scope.user.id = -1;

        $scope.rootUser.updateLocal($scope.user);

        $scope.showSuccess('Account Created!');
        
        var callRequestHelp = function() {
          $scope.requestHelp();
        }
        
        $scope.closeSignupModal(callRequestHelp);


      }
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


])