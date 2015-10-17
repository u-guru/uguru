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

function AdminService($localstorage, $ionicActionSheet, Github, DeviceService, $timeout,
    $ionicSideMenuDelegate, $state, DeviceService, Github) {

	var adminActionSheet;
    var closeAttachActionSheet;
    var adminActionSheetOptions;
    var adminScope;

	return {
		showActionSheet:showActionSheet,
        closeAttachActionSheet:closeAttachActionSheet,
        adminScope:adminScope
	}



    function setDeviceKeyboardState(bool) {
    	deviceKeyboardOpen = bool;
    }

    function showActionSheet(scope) {
        adminScope = scope;
        initialize(scope);
        return function() {
            return $ionicActionSheet.show(adminActionSheetOptions);
        }
    }

    function initialize(scope) {
        adminActionSheetOptions = {
            buttons: [{text:'Reset To Access'}, {text:'Reset Cache & Logout'}, {text:'Reset Cache & Stay'}, {text:'RC & Stay w/University'}, {text:'Turn on GH Issues'}, {text:'Turn on GH Emails'}, {text:'Update App from..'}],
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
          closeAttachActionSheet
        },

        function(err) {
          console.log(err);
          alert('Something went wrong - please contact Samir');
        }
        )
      }

    }

    function handleAdminSheetButtonClick(scope, index) {
        // hack
        scope = adminScope;
        console.log('passedInScope', scope);

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

                    alert("WARNING: You are turning on GH traceback issues", Github.getExceptionToGithubIssue(), "Continue?");
                    Github.setExceptionToGithubIssue(true)
                    console.log('setExceptionToGithubIssue', Github.getExceptionToGithubIssue())
                    break;

                case 5:
                    alert("WARNING: You are turning OFF GH traceback issues", Github.getExceptionToGithubIssue());
                    break;
                case 6:
                    url = prompt("Please enter URL to update from", "http://192.168.0.103:5000/app/")
                    Github.setExceptionToGithubIssue(false)
                    DeviceService.checkUpdates(url);
                    break;

        }

    }
}









