angular.module('uguru.course.ctrl', [])

.controller('CourseCtrl', ['$scope', '$localstorage', '$state', '$timeout', 'User',
    'user','$ionicHistory', '$cordovaKeyboard', 'cfpLoadingBar', 'University', 'courses',
    function($scope, $localstorage, $state, $timeout, User, user,
        $ionicHistory, $cordovaKeyboard, cfpLoadingBar, University, courses) {

    // $scope.courses = $localstorage.getObject('courses');

    // $scope.courses = null;
    $scope.search_text = '';

    $scope.courses_length = null;
    $scope.title_text = 'Courses';
    $scope.search_placeholder_text = "Search all courses";

    $scope.edit_mode = false;

    $scope.platform = $localstorage.getObject('platform');
    $scope.device = $localstorage.getObject('device');

    $scope.courses = courses;

    if (user.university.courses) {
        console.log('they already have university courses');
        $scope.courses = user.university.courses;
        $scope.courses_length = user.university.courses.length;
    }

    if ($scope.courses.length > 0 && $scope.courses[0].university) {
        $scope.title_text = $scope.courses[0].university + ' ' + $scope.title_text;
        $scope.search_placeholder_text = "Search from " + $scope.courses.length  + " " + $scope.courses[0].university +" courses";
    }

    $scope.initialCourses = $scope.courses.slice(0,10);
    
    $scope.showActionSheet = function() {

       // Show the action sheet
       var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: 'Add ' + $scope.search_text },
           { text: "I Haven't Declared a Major" }
         ],
         cancelText: 'Cancel',
         cancel: function() {
              hideSheet();
            },
         buttonClicked: function(index) {
           var major_name = '';
           if (index == 0) {
            major_name = $scope.search_text;
           } else {
            major_name = 'Undeclared';
           }
           hideSheet();
           $scope.search_text = '';
           $scope.customMajorSelected(major_name);
           return true;
         }
       });

    };
     
     $scope.fireActionModal = function() {
        $scope.showActionSheet();
     };



    $scope.courseSelected = function(course) {
        
        // $scope.courses.splice($scope.courses.indexOf(course), 1);

        if ($scope.containsObject(course, user.guru_courses)) {
            return;
        }

        if (user.guru_courses.length === 0) {
            user.guru_courses = [];
        }
        
        user.guru_courses.unshift({
                id: course.id,
                name: course.short_name,
        });

        // user.add_course_id =course.id;

        updateUser(user, $localstorage, User, null, null);

        //Calculate progress
        $scope.calculateProgress(user);
        $scope.updateComponentHeight();

    };

    $scope.majorSelected = function(major) {
        user.majors.unshift({
            id: null,
            name: major.name,
        });
        console.log($scope.search_text + 'added as custom major');
        console.log('Save immediately');
        updateUser(user, $localstorage, User, null, null);

    };

    $scope.saveCourses = function() {
        updateUser(user, $localstorage, User, null, null);
        $state.go('^.list');
    };

    $scope.toggleEditMode = function() {
        console.log('edit button clicked');
        $scope.edit_mode = true;
        if ($scope.platform == "ios") {
            $cordovaKeyboard.close();
        }
        $scope.heightFromBottom = 44;
    };

    $scope.onCourseDelete = function(course) {
        console.log('Course delete clicked');
        user.guru_courses.splice(user.guru_courses.indexOf(course), 1);
    };

    $scope.clearSearchInput = function(searchInput) {
        $scope.search_text = '';

        //Calculate progress
        $scope.calculateProgress(user);
    };

    $scope.containsObject = function(obj, list) {
        var x;
        for (x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj) {
                return true;
            }
        }

        return false;
    };

    $timeout(function() {
        document.getElementsByName("prefix")[0].focus();
    }, 750);

    $scope.setFocus = function(event) {
      document.getElementsByName("prefix")[0].focus();
    };

    $scope.calculateComponentHeight = function() {
        var navHeaderArr = document.getElementsByClassName('bar-header');
        var subheaderArr = document.getElementsByClassName('black-subheader');
        var navHeaderRect = navHeaderArr[navHeaderArr.length - 1].getBoundingClientRect();
        var subheaderRect = subheaderArr[subheaderArr.length - 1].getBoundingClientRect();
        var viewRect = document.getElementById('edit-courses').getBoundingClientRect();
        console.log(navHeaderRect);
        console.log(subheaderRect);

        $scope.subheaderTop = navHeaderRect.bottom;
        if (user.guru_courses.length > 0) {
            $scope.heightFromBottom = subheaderRect.bottom + $scope.subheaderTop;
        } else {
            $scope.subheaderHeight = $scope.subheaderTop;
        }
    };

    $scope.updateComponentHeight = function() {
        var navHeaderArr = document.getElementsByClassName('bar-header');
        var subheaderArr = document.getElementsByClassName('black-subheader');
        var navHeaderRect = navHeaderArr[navHeaderArr.length - 1].getBoundingClientRect();
        var subheaderRect = subheaderArr[subheaderArr.length - 1].getBoundingClientRect();
        var viewRect = document.getElementById('edit-courses').getBoundingClientRect();
        console.log(navHeaderRect);
        console.log(subheaderRect);

        $scope.subheaderTop = navHeaderRect.bottom;
        if (user.guru_courses.length > 0) {
            $scope.heightFromBottom = subheaderRect.bottom;
        } else {
            $scope.subheaderHeight = $scope.subheaderTop;
        }
    };

    $timeout(function() {
        $scope.calculateComponentHeight();
    }, 250);

}]);