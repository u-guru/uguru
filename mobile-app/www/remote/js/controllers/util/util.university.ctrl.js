angular.module('uguru.util.controllers', [])

.controller('AddUniversityController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  '$q',
  'University',
  '$cordovaKeyboard',
  '$ionicLoading',
  '$cordovaStatusbar',
  '$ionicViewSwitcher',
  '$cordovaGeolocation',
  '$ionicSideMenuDelegate',
  '$ionicSlideBoxDelegate',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $q, University,
  $cordovaKeyboard, $ionicLoading, $cordovaStatusbar,
  $ionicViewSwitcher, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {

    $scope.search_text = '';


    $scope.goToAccess = function() {
      $ionicViewSwitcher.nextDirection('back');
      $state.go('^.access');
    }

    $scope.saveUniversityFromStudentProfileSideBar = function(university) {

      var successCallback = function() {
        $scope.user.student_courses = [];
        $localstorage.removeObject('courses');

        $scope.user.university_id = university.id;
        $scope.user.university = university;
        $scope.user.university.latitude = university.location.latitude;
        $scope.user.university.longitude = university.location.longitude;

        payload = {'university_id': $scope.user.university_id};

        $scope.user.updateAttr('university_id', $scope.user, payload, null, $scope);
      };

      //if they have already selected one
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        var dialog = {
          msg: 'Are you sure you want to change universities? This will deactive your current courses.',
          title: 'Warning',
          button_arr: ['No Thanks', "I'm sure"],
        }

        if ($scope.platform.mobile) {
            dialog.arr_callback = [null, successCallback];
            $scope.root.dialog.confirm(dialog.msg, dialog.title, dialog.button_arr, dialog.arr_callback);
        }  else {
          if (confirm(dialog.msg)) {
            successCallback();
          }
        }

      }
    }

    var getTopRankedUniversities = function(universities_arr) {
      results = [];
      for (var i = 0; i < universities_arr.length; i ++) {
        university = universities_arr[i];
        if (university.rank <= 20) {
          results.push(university)
        }
      }
      return results;
    }


    $scope.universities = University.getTargetted();
    $scope.initialUniversities = getTopRankedUniversities($scope.universities);



    $scope.clearSearchInput = function() {
        $scope.search_text = '';
    };

    $scope.universitySelected = function(university, $event) {

      $scope.loader.show();
      if ($scope.onboarding === true) {

        $scope.nearestUniversitySelected($event, university);
        return;
      }

      var successCallback = function() {
        console.log('callback executed');
        console.log('cleared previous universities courses from the cache')
        $scope.user.guru_courses = [];
        $scope.user.student_courses = [];
        $localstorage.removeObject('courses');

        $scope.user.university_id = university.id;
        $scope.user.university = university;
        $scope.user.university.latitude = university.location.latitude;
        $scope.user.university.longitude = university.location.longitude;
        $scope.search_text = '';
        $scope.keyboard_force_off = true;
        //update user to locat storage
        $scope.rootUser.updateLocal($scope.user);

        payload = {'university_id': $scope.user.university_id};

        var postUniversitySelectedCallback = function() {
          $timeout(function() {
            $scope.loader.hide();
            $ionicViewSwitcher.nextDirection('forward');
              $state.go('^.home')
          }, 1000);
        }

        $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);
      };

      //if they have already selected one
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        var dialog = {
          msg: 'Are you sure you want to change universities? This will deactive your current courses.',
          title: 'Warning',
          button_arr: ['No Thanks', "I'm sure"],
        }

        if ($scope.platform.mobile) {
            dialog.arr_callback = [null, successCallback];
            $scope.root.dialog.confirm(dialog.msg, dialog.title, dialog.button_arr, dialog.arr_callback);
        }  else {
          if (confirm(dialog.msg)) {
            successCallback();
          }
        }

        return;

      }


        //else proceed normally
        $scope.user.university_id = university.id;
        $scope.user.university = university;
        $scope.user.university.latitude = university.location.latitude;
        $scope.user.university.longitude = university.location.longitude;
        $scope.search_text = '';
        $scope.keyboard_force_off = true;
        $scope.rootUser.updateLocal($scope.user);

        payload = {'university_id': $scope.user.university_id};



        $scope.user.updateAttr('university_id', $scope.user, payload, null, $scope)

        $timeout(function() {
          $scope.loader.hide();
          $ionicViewSwitcher.nextDirection('forward');
            $state.go('^.home')
        }, 1000);


    }

    $scope.getGPSCoords = function() {

            var posOptions = {
              timeout: 10000,
              enableHighAccuracy: false, //may cause high errors if true
            }

            $scope.search_text ='';
            $scope.loader.show();
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {

                console.log('location found!', position.coords.latitude, position.coords.longitude);

                if ($state.current.name === 'root.university') {
                  //show the loader
                  $scope.loader.show();

                  var successCallback = function() {
                    $scope.loader.hide();
                  }
                    //grabs the nearest universities
                    $scope.nearestUniversities = getNearestUniversity(
                                            position.coords.latitude,
                                            position.coords.longitude,
                                            $scope.universities,
                                            null,
                                            successCallback);
                    $scope.universities = $scope.nearestUniversities;
                    $localstorage.setObject('nearest-universities', $scope.universities);


              }

          }, function(error) {
              //show & let them know we couldn't find it
              $scope.loader.hide()
              $scope.user.recent_position = null;
              alert('Sorry! Please check your privacy settings check your GPS signal.');
          });

    };

  }


])


function getNearestUniversity(user_lat, user_long, uni_list, limit, callback) {


    var sort = function(array) {
      var len = array.length;
      if(len < 2) {
        return array;
      }
      var pivot = Math.ceil(len/2);
      var results = merge(sort(array.slice(0,pivot)), sort(array.slice(pivot)));
      return results;
    };

    var merge = function(left, right) {
      var result = [];
      while((left.length > 0) && (right.length > 0)) {


            uni_1_lat = left[0].latitude;
            uni_1_long = left[0].longitude;
            uni_2_lat = right[0].latitude;
            uni_2_long = right[0].longitude;

            d1 = getDistanceFromLatLonInKm(user_lat, user_long, uni_1_lat, uni_1_long);
            d2 = getDistanceFromLatLonInKm(user_lat, user_long, uni_2_lat, uni_2_long);
            left[0].miles = parseInt(d1 / 0.62 * 10) / 10;
            right[0].miles = parseInt(d2 / 0.62 * 10) / 10;
            if ( d1 < d2 ) {
                result.push(left.shift());
            }
            else {
              result.push(right.shift());
            }
      }

      result = result.concat(left, right);
      return result;
    };

    var largeList = sort(uni_list);

    if (callback) {
      callback();
    }

    return largeList;

};