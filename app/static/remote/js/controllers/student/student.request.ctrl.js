angular.module('uguru.student.controllers')

//ALL student controllers
.controller('StudentRequestController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  '$ionicNavBarDelegate',
  'Geolocation',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $ionicTabsDelegate, $cordovaProgress, $stateParams,
  $ionicNavBarDelegate, Geolocation) {

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/add-note.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addRequestNoteModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/student-request-map.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.requestMapModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/signup.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.signupModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/contact-guru.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.contactingGuruModal = modal;
    });

    $scope.checkboxClicked = function(index) {
      $scope.time_checkbox = index;
    }

    $scope.toggleVirtualGuru = function() {
      $scope.virtual_guru_checkbox = !$scope.virtual_guru_checkbox;
    }

    $scope.togglePersonGuru = function() {
      $scope.person_guru_checkbox = !$scope.person_guru_checkbox;
      if ($scope.person_guru_checkbox) {
        $scope.user.position = null;
        if (!$scope.user.position) {
          //get location & fire the modal
          Geolocation.getUserPosition($scope, $scope.showRequestMapModal);
        } 
        //user already has provided access to their location
        else {
          $scope.requestMapModal.show()
        }
      }
    }


    $scope.showComingSoonProgress = function(position, callback) {
      $cordovaProgress.showText(false, "Coming Soon! Stay Tuned", position);
        $timeout(function() {
          $cordovaProgress.hide();
          if (callback) {
            callback();
          }
        }, 1000)
    }

    $scope.showRequestMapModal = function() {
      $scope.requestMapModal.show();
    }

    $scope.goBackFromRequestsToHome = function() {
      $scope.saveRequestToUser();
      console.log('sup');
    };

    $scope.initRequestObj = function() {
      var date = new Date();
      date = date.getTime();
      return {
        position: null,
        photo:null, 
        status: 'incomplete',
        proposals: null,
        time_estimate: 0,
        note: null,
        time_created: date
      };
    }

    $scope.saveRequestToUser = function() {
      $scope.request.status = 'pending';
      $scope.request.photo = null;
      var user_course = $scope.root.util.objectFindByKey($scope.user.student_courses, 'short_name', $scope.course.short_name);
      if (!user_course.requests) {
        user_course.requests = [];
        user_course.active_requests = [];
      }
      var user_course_request = $scope.root.util.objectFindByKey(user_course.requests, 'time_created', $scope.request.time_created);
      if (!user_course_request) {
        console.log('new request!')
        user_course.requests.push($scope.request);
        user_course.active_requests.push($scope.request);
      } else {
        user_course_request.time_updated = 'now';
        user_course_request = $scope.request;
        console.log($scope.user.student_courses);
      }
      $scope.user.requests.push($scope.request);
      $scope.user.active_requests.push($scope.request);
      $scope.rootUser.updateLocal($scope.user);
    }

    var validateRequestForm = function() {
      return true;
    }

    $scope.requestHelp = function() {
      

      if (!$scope.user.id) {
        $scope.signupModal.show();
        return;
      } 

      if (!validateRequestForm()) {
        console.log('form has errors');
      }

      $scope.saveRequestToUser();
      $scope.contactingGuruModal.show();

      $timeout(function() {

        $state.go('^.guru-available');
        $timeout(function() {
          $scope.contactingGuruModal.hide();
        }, 2000);

      }, 250);

      //are push notifications enabled?

      //validate the form?
    }

    $scope.time_checkbox = 0;
    $scope.virtual_guru_checkbox = true;
    $scope.person_guru_checkbox = false;
    $scope.course = JSON.parse($stateParams.courseObj);
    $scope.request = $scope.initRequestObj();

  }

]);

