angular.module('uguru.student.controllers')

//ALL student controllers
.controller('HomeController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$ionicModal',
  '$timeout',
  '$q',
  'University',
  '$localstorage',
  '$ionicSideMenuDelegate',
  '$ionicBackdrop',
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $ionicModal, $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop)     {

  console.log($scope.user);

  if ($scope.user && $scope.user.active_requests && $scope.user.active_requests.length > 0) {
    // $ionicSideMenuDelegate.canDragContent(false);

    $scope.cancelRequest = function(request) {
      if (confirm('Are you sure you want to cancel this request?')) {
        request.status = 4;
        $scope.user.updateObj($scope.user, 'requests', request, $scope);

        var cancelMsg = request.course.short_name + ' request canceled';
        $scope.success.show(0, 2000, cancelMsg);
        $scope.root.util.removeObjectByKey($scope.user.active_requests, 'id', request.id);
      }
    }

  }


  $ionicPlatform.ready(function() {

        $scope.turnStatusBarWhite = function() {

          if (window.StatusBar) {

            StatusBar.styleLightContent();
            StatusBar.overlaysWebView(true);
          }

        }

        $scope.turnStatusBarBlack = function() {
          if (window.StatusBar) {
                      // console.log('Extra #1. Styling iOS status bar to black \n\n');

            StatusBar.styleDefault();
            StatusBar.overlaysWebView(true);
          }
        }

        $scope.turnStatusBarWhite();

    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/verb.home.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.verbModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/contacting.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.contactingModal = modal;
    });

        $ionicModal.fromTemplateUrl(BASE + 'templates/task_verbs.home.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.taskVerbModal = modal;
    });



    $scope.launchTaskVerbModal = function() {
      $timeout(function() {
        $scope.closeVerbModal();
      }, 500);
      $scope.taskVerbModal.show();
    }

    $scope.hideTaskVerbModal = function() {
      $scope.taskVerbModal.hide();
    }

    $scope.launchVerbModal = function() {
      $scope.verbModal.show();
    }

    $scope.toggleRightSideMenu = function() {
      $ionicSideMenuDelegate.toggleRight();
    };

    $scope.launchRequestModal = function(index, verb_index) {
      if ($scope.root.vars.courses) {

          $scope.root.vars.last_verb_index_clicked = index;
          if (verb_index) {
            $scope.root.vars.detailed_verbs_index_clicked = verb_index;
          }

          $ionicModal.fromTemplateUrl(BASE + 'templates/request.modal.html', {
              scope: $scope,
              animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.requestModal = modal;
            $scope.requestModal.show();

            if ($scope.verbModal.isShown()) {
              $timeout(function() {
                $scope.verbModal.hide();
              }, 2000);
            }

            if ($scope.taskVerbModal.isShown()) {
              $timeout(function() {
                $scope.taskVerbModal.hide();
              }, 2000);
            }

          });

      } else {
        alert('courses are not loaded yet');
      }
    }

    $scope.launchContactingModal = function() {
      $scope.contactingModal.show();
    }



    $scope.closeContactingModal = function() {
      $scope.contactingModal.hide();
    }


    $scope.closeVerbModal = function() {
      $scope.verbModal.hide();
    }


    // $timeout(function() {
    //   $scope.launchContactingModal();
    // }, 500);


    // $scope.root.vars.request = {
    //   course: {short_name: 'CS10!'},
    //   task_title: 'Fix my bike!',
    //   address: "Ferry Building",
    //   calendar: {weekday: "Thursday", formatted_start_time: '12:00pm', formatted_end_time: "3:00pm", },
    //   files_attached: [true],
    //   description: "yo there is a description",
    //   fields: {img:  'question.svg', initial_status:'getting help'},
    //   student_price: 5,
    //   type: {
    //     question:true
    //   },
    //   tags: ['mars'],
    // }
    // $timeout(function() {
    //   $scope.launchContactingModal();
    // }, 500)

  }

]);
