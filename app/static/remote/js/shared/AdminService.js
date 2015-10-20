angular.module('sharedServices')
.factory("AdminService", [
	'$localstorage',
    '$ionicActionSheet',
    'Github',
    'DeviceService',
    '$timeout',
    '$ionicSideMenuDelegate',
    '$state',
    'DeviceService',
    'Github',
	AdminService
	]);

function AdminService($localstorage, $ionicActionSheet, DeviceService, $timeout,
    $ionicSideMenuDelegate, $state, DeviceService) {

	var adminActionSheet;
    var closeAttachActionSheet;
    var adminActionSheetOptions;
    var adminScope;
    var currentActionSheet;



	return {
		showActionSheet:showActionSheet,
        closeAttachActionSheet:closeAttachActionSheet,
        adminScope:adminScope,
        currentActionSheet: currentActionSheet,
        setDefaultCoursesAndMajors: setDefaultCoursesAndMajors
	}



    function setDeviceKeyboardState(bool) {
    	deviceKeyboardOpen = bool;
    }

    function reinitializeAdminActionSheet() {
        setTimeout(
            function() {
                showActionSheet(adminScope)();
                adminScope.loader.hide();
            }
        , 2000)
    }

    function showActionSheet(scope) {
        adminScope = scope;
        initialize(scope);
        return function() {
            currentActionSheet = $ionicActionSheet.show(adminActionSheetOptions);
            return currentActionSheet;
        }
    }

    function initialize(scope) {
        adminScope = scope;
        adminScope.options = {
            sendExceptionEmail: Github.getExceptionToEmail(),
            sendExceptionGH: Github.getExceptionToGithubIssue(),
            defaultSendEmail: Github.getExceptionToDefaultEmail()
        }
        console.log("Admin Exception Options:\n", adminScope.options);
        adminActionSheetOptions = {
            buttons: [{text:'Reset To Access'}, {text:'Reset Cache & Logout'}, {text:'Reset Cache & Stay'}, {text:'RC & Stay w/University'}, {text:'Github Exceptions : <strong>' + adminScope.options.sendExceptionGH + '</strong>'}, {text:'Github Emails : <strong>' + adminScope.options.sendExceptionEmail +'</strong>' }, {text:'Default Email : <strong>' + adminScope.options.defaultSendEmail +'</strong>' }, {text:'Test Exception Options'}, {text:'Update App from..'}],
            buttonClicked: function(index) {
                handleAdminSheetButtonClick(adminScope, index);
            }
        }
    }

    function resetCache($scope, logout, university) {
        if (confirm('Are you sure you want to reset your admin account?')) {

        $scope.loader.show();

        //true by default, false if logout
        logout = true && logout;

        var tempUni, tempUniId;
        if (!university) {
            $scope.user.university_id  = null;
            $scope.user.university = null;
        }   else {
            tempUniId = $scope.user.university_id;
            tempUni = $scope.user.university;
        }
        $scope.loader.show();
        $scope.user.clearAttr($scope.user, $scope.user.id).then(function(user) {
          $scope.loader.hide();
          $scope.loader.showSuccess(0, 2000,'Admin Account Successfully cleared!');

          if (logout) {
            $scope.logoutUser(true);
            $scope.user.university_id = null;
            $scope.user.university = null;
          } else {
            $scope.user.university = tempUni;
            $scope.user.university_id = tempUniId;
            $scope.user.updateAttr('university_id', $scope.user, $scope.user.university, null, $scope);
          }
          $localstorage.setObject('user', user.plain());
          $scope.user = user.plain();
          closeAttachActionSheet && closeAttachActionSheet();
        },

        function(err) {
          console.log(err);
          alert('Something went wrong - please contact Samir');
        }
        )
      }

    }

    function setDefaultCoursesAndMajors($scope) {
        var university = {id: 2307};
        $scope.user.university = university;
        $scope.loader.showAmbig();
        $timeout(function() {
            $scope.getMajorsForUniversityId(university.id);
            $scope.getCoursesForUniversityId(university.id);
            var successCallback = function() {
                $scope.loader.hide();
            }
            $scope.getCategories(successCallback);
        }, 100)
    }

    function handleAdminSheetButtonClick(scope, index) {
        // hack

        switch(index){
                case 0:
                    $timeout(function() {
                        $ionicSideMenuDelegate.toggleRight();
                        scope.user.university_id = null;
                        scope.user.university = null;
                        $state.go('^.university');
                    }, 500)
                    break;

                case 1:
                    console.log(scope.user);
                    if (scope.user && scope.user.id) {
                        resetCache(scope, true, false);
                        $state.go('^.home');
                        return;
                    } else {
                        alert('Sorry! You need to be logged in to this');
                    }
                    break;

                case 2:
                    if (scope.user && scope.user.id) {
                        resetCache(scope, false, false);
                        scope.loader.show();
                        $timeout(function() {
                            $ionicSideMenuDelegate.toggleRight();
                        }, 500);
                        $timeout(function() {
                            $state.go('^.home');
                            scope.loader.hide();
                        }, 1000)
                        return;
                    } else {
                        alert('Sorry! You need to be logged in to this');
                        return;
                    }
                    break;

                case 3:
                    if (scope.user || scope.user.id) {

                        resetCache(scope, false, true);
                        scope.loader.show();
                        $timeout(function() {
                            $ionicSideMenuDelegate.toggleRight();
                        }, 500);
                        $timeout(function() {
                            $state.go('^.home');
                            scope.loader.hide();
                        }, 1000)


                        alert('Sorry! You need to be logged in to this');
                        return;
                    } else {
                        resetCache(scope, false, true);
                        return;
                    }
                    break;

                case 4:

                    currentVal = Github.getExceptionToGithubIssue();

                    if (confirm('Set Github Issue Creation to ' + !currentVal + '?')) {
                        Github.toggleExceptionToGithubIssue();
                        adminScope.options.sendExceptionGH = Github.getExceptionToGithubIssue();
                        console.log('setExceptionToGithubIssue', adminScope.options.sendExceptionGH)
                        adminScope.loader.showSuccess('Github Issue Creation set to ' +  adminScope.options.sendExceptionGH)
                        reinitializeAdminActionSheet()
                        currentActionSheet();
                    }
                    break;

                case 5:
                    currentVal = Github.getExceptionToEmail();
                    if (confirm('Set Exception Emails to ' + !currentVal + '?')) {
                        Github.toggleExceptionToEmail()
                        adminScope.options.sendExceptionEmail = Github.getExceptionToEmail();
                        console.log('setExceptionToGithubEmail', adminScope.options.sendExceptionEmail)
                        adminScope.loader.showSuccess('Exception email Creation set to ' +  adminScope.options.sendExceptionEmail)
                        reinitializeAdminActionSheet()
                        currentActionSheet();
                    }
                    break;
                case 6:
                    adminScope.options.defaultSendEmail = prompt("Verify sender email or change", adminScope.options.defaultSendEmail)
                    break;
                case 7:
                    if (confirm('Throw a fake exception with current options?')) {
                        Github.testSendGHIssue();
                        adminScope.loader.showSuccess('Check GH Issues and/or ' + adminScope.options.defaultSendEmail, 2000);
                    }
                case 8:
                    url = prompt("Please enter URL to update from", "http://192.168.0.103:5000/app/")
                    Github.setExceptionToGithubIssue(false)
                    DeviceService.checkUpdates(url);
                    break;

        }

    }
}









