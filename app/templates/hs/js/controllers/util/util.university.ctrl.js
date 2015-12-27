// angular.module('uguru.util.controllers', [])

// .controller('AddUniversityController', [

//   //All imported packages go here
//   '$scope',
//   '$state',
//   '$timeout',
//   '$localstorage',
//   '$ionicModal',
//   '$cordovaProgress',
//   '$q',
//   'University',
//   '$cordovaKeyboard',
//   '$ionicLoading',
//   '$cordovaStatusbar',
//   '$ionicViewSwitcher',
//   '$cordovaGeolocation',
//   '$ionicSideMenuDelegate',
//   '$ionicSlideBoxDelegate',
//	'LoadingService',
//   function($scope, $state, $timeout, $localstorage,
//  	$ionicModal, $cordovaProgress, $q, University,
//   $cordovaKeyboard, $ionicLoading, $cordovaStatusbar,
//   $ionicViewSwitcher, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, LoadingService) {

//     //scope variables
//     $scope.search_text = '';
//     $ionicSideMenuDelegate.canDragContent(false);
//     //back button
//     $scope.goToAccess = function() {
//       $ionicViewSwitcher.nextDirection('back');
//       $state.go('^.access');
//     }

//     var filterByTopRankedUniversities = function(universities_arr) {
//       results = [];
//       for (var i = 0; i < universities_arr.length; i ++) {
//         university = universities_arr[i];
//         if (university.rank <= 20) {
//           results.push(university)
//         }
//       }
//       return results;
//     }

//     $scope.universitySelected = function(university, $event) {

//       //if user is switching universities
//       if ($scope.user.university_id
//           && university.id !== $scope.user.university_id
//           && !confirm('Are you sure? Your current courses will be deactivated'))
//       {
//           return;
//       }

//       LoadingService.show();
//       $scope.user.university_id = university.id;
//       $scope.user.university = university;
//       $scope.search_text = '';

//       //update user to locat storage
//       $scope.rootUser.updateLocal($scope.user);

//       var payload = {
//         'university_id': $scope.user.university_id
//       };

//       //save university
//       var postUniversitySelectedCallback = function() {
//           $timeout(function() {
//             LoadingService.hide();
//             $ionicViewSwitcher.nextDirection('forward');
//               $state.go('^.home')
//           }, 1000);
//       }

//       $timeout(function() {
//         $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);
//       }, 500)

//     };

//     $scope.getGPSCoords = function() {

//         var posOptions = {
//           timeout: 10000,
//           enableHighAccuracy: false, //may cause high errors if true
//         }

//         $scope.search_text ='';
//         LoadingService.show();
//         $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {

//             console.log('location found!', position.coords.latitude, position.coords.longitude);

//             if ($state.current.name === 'root.university') {
//               //show the loader
//               LoadingService.show();

//               var successCallback = function() {
//                 LoadingService.hide();
//               }
//                 //grabs the nearest universities
//                 $scope.nearestUniversities = getNearestUniversity(
//                                         position.coords.latitude,
//                                         position.coords.longitude,
//                                         $scope.universities,
//                                         null,
//                                         successCallback);
//                 $scope.universities = $scope.nearestUniversities;
//                 $localstorage.setObject('nearest-universities', $scope.universities);


//           }

//       }, function(error) {
//           //show & let them know we couldn't find it
//           //in case android/ios/windows user turned it off
//           $scope.initialUniversities = $scope.universities;
//           LoadingService.hide()
//           $scope.user.recent_position = null;
//           alert('Sorry! Please check your privacy settings check your GPS signal.');
//       });

//     };

//     $scope.universities = University.getTargetted();

//     if ($scope.platform.android) {
//       $scope.getGPSCoords();
//     } else {
//       $scope.initialUniversities = filterByTopRankedUniversities($scope.universities);
//     }


//   }

// ])


// function getNearestUniversity(user_lat, user_long, uni_list, limit, callback) {


//     var sort = function(array) {
//       var len = array.length;
//       if(len < 2) {
//         return array;
//       }
//       var pivot = Math.ceil(len/2);
//       var results = merge(sort(array.slice(0,pivot)), sort(array.slice(pivot)));
//       return results;
//     };

//     var merge = function(left, right) {
//       var result = [];
//       while((left.length > 0) && (right.length > 0)) {


//             uni_1_lat = left[0].latitude;
//             uni_1_long = left[0].longitude;
//             uni_2_lat = right[0].latitude;
//             uni_2_long = right[0].longitude;

//             d1 = getDistanceFromLatLonInKm(user_lat, user_long, uni_1_lat, uni_1_long);
//             d2 = getDistanceFromLatLonInKm(user_lat, user_long, uni_2_lat, uni_2_long);
//             left[0].miles = parseInt(d1 / 0.62 * 10) / 10;
//             right[0].miles = parseInt(d2 / 0.62 * 10) / 10;
//             if ( d1 < d2 ) {
//                 result.push(left.shift());
//             }
//             else {
//               result.push(right.shift());
//             }
//       }

//       result = result.concat(left, right);
//       return result;
//     };

//     var largeList = sort(uni_list);

//     if (callback) {
//       callback();
//     }

//     return largeList;

// };
