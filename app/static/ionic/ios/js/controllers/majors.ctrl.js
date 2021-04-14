angular.module('uguru.major.ctrl', [])

.controller('MajorCtrl', ['$scope', '$localstorage', '$state',
    'User', 'user', 'majors','$ionicHistory', 'University', '$timeout',
    'cfpLoadingBar', '$ionicActionSheet', '$cordovaKeyboard',
    function($scope, $localstorage, $state, User,
        user, majors, $ionicHistory, University, $timeout, cfpLoadingBar,
        $ionicActionSheet, $cordovaKeyboard) {

    console.log(majors);
    console.log(user.university.majors);
    $scope.view_title = "Majors";
    $scope.majors = majors;
    $scope.edit_mode = false;
    $scope.search_text = '';
    $scope.search_placeholder_text = 'Search All Majors';

    $scope.platform = $localstorage.getObject('platform');
    $scope.device = $localstorage.getObject('device');

    if (user.university.majors) {
        $scope.majors = user.university.majors;
    }

    if ($scope.majors[0].university) {
        $scope.view_title = $scope.majors[0].university + ' ' + $scope.view_title;
        $scope.search_placeholder_text = 'Search from' + ' ' + $scope.majors.length + ' ' +$scope.majors[0].university + ' majors';
    }

    $scope.initialMajors = $scope.majors.slice(0,10);

    // if (user.university.majors) {
    //     $scope.majors = user.university.majors;
    //     $scope.majors_length = $scope.majors.length;
    // } else {
        
    //     // cfpLoadingBar.start();
    //     $scope.majors = University.getMajors(user.university_id).then(
    //         function(new_majors) {
    //             console.log(new_majors);
    //             // cfpLoadingBar.complete();

    //             if (new_majors === "null") {
    //                 majors = $localstorage.getObject('general-majors');
    //             } else {
    //                 majors = JSON.parse(new_majors);
    //             }

    //             return majors;
    //         },
    //         function(error) {
    //             console.log('Majors NOT successfully loaded');
    //             console.log(error);
    //         }
    //     );
    //     $scope.majors_length = $scope.majors.length;
    // }

    $scope.onMajorDelete = function(major) {
        console.log('Majors delete clicked');
        user.majors.splice(user.majors.indexOf(major), 1);
    };

    $scope.fireActionModal = function() {
        $scope.showActionSheet();
    };

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

    $scope.majorSelected = function(major, matchingMajors) {
        
            console.log(major);
            console.log(matchingMajors);
            console.log($scope.majors);
            if (user.majors.length === 0) {
                user.majors = [];
            }
            user.majors.unshift({
                id: major.id,
                name: major.name
            });

        updateUser(user, $localstorage, User, null, null);

        //Calculate progress
        $scope.calculateProgress(user);
        
    };

    $scope.customMajorSelected = function(major_name) {
        
            if (user.majors.length === 0) {
                user.majors = [];
            }
            user.majors.unshift({
                id: null,
                name: major_name,
            });
            console.log($scope.search_text + 'added as custom major');

        updateUser(user, $localstorage, User, null, null);

        //Calculate progress
        $scope.calculateProgress(user);
        
    };

    $scope.saveMajor = function() {
        updateUser(user, $localstorage, User, null, null);
        $state.go('^.list');
    };

    $scope.toggleEditMode = function() {
        console.log('edit button clicked');
        $scope.edit_mode = true;
        if ($scope.platform == "ios") {
            $cordovaKeyboard.close();
        }
    };

    $scope.clearSearchInput = function(searchInput) {
        $scope.search_text = '';
        user.majors = [{name:null, id:null}];

        //Calculate progress
        $scope.calculateProgress(user);
    };

    $timeout(function() {
        document.getElementsByName("prefix")[0].focus();
    }, 750);

    $scope.setFocus = function(event) {
      document.getElementsByName("prefix")[0].focus();
    };

}]);