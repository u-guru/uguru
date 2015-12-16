angular.module('uguru.util.controllers')
.controller('EssayStudentController', [
  '$scope',
  '$timeout',
  '$state',
  '$interval',
  'University',
  function AccessController($scope, $timeout, $state, $interval, University) {
    var UPPER = 12;
    var LOWER = 0;

    //default
    $scope.university = {name:'Harvard'};

    $interval(function() {
      $scope.university = selectRandom(targettedUniversities);
    }, 3500)

    var selectRandom = function(university_arr) {
      return university_arr[Math.floor(Math.random()*university_arr.length)];
    }

    var filterTargetted = function(university_arr) {
      indices_to_slice = [];
      for (var i = 0; i < university_arr.length; i++) {
        university_arr[i].name = university_arr[i].name.replace('University', '').replace('university', '').replace('college', '').replace('College','').replace(' of', '').replace(' Of', '');
        var temp = university_arr[i].short_name && university_arr[i].short_name.replace('University', '').replace('university', '').replace('college', '').replace('College','').replace(' of', '').replace(' Of', '');
        if (temp && temp.length < university_arr[i].name.length) {
          university_arr[i].name = temp;
        }
        if ((university_arr[i].name.length <= UPPER && university_arr[i].name.length >= LOWER)) {
          continue;
        } else {
          console.log(university_arr[i].name)
          indices_to_slice.push(i.toString());
        }
      }
      new_arr = [];
      for (var j =0; j < university_arr.length; j++) {
        if (indices_to_slice.indexOf(j.toString()) === -1) {
          new_arr.push(university_arr[j])
        }
      }
      console.log(university_arr.length, new_arr.length);
      console.log(new_arr);

      return new_arr;
    }

    $scope.targettedUniversities = filterTargetted(University.getTargetted());

  }

]);
