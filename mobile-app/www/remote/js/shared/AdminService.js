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
	AdminService
	]);

function AdminService($localstorage, $ionicActionSheet, Github, DeviceService, $timeout,
    $ionicSideMenuDelegate, $state, DeviceService) {

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


        if (!university) {
            $scope.user.university_id  = null;
            $scope.user.university = null;
        }   else {
            tempUniValue = $scope.user.university_id;
            tempUni = $scope.user.university;
        }
        $scope.loader.show();
        $scope.user.User.clearAttr({}, $scope.user.id).then(function(user) {
          $scope.loader.hide();
          $scope.loader.showSuccess(0, 2000,'Admin Account Successfully cleared!');

          if (logout) {
            $scope.logoutUser(true);
            $scope.user.university_id = null;
            $scope.user.university = null;
          } else {
            $scope.user.university = tempUni;
            $scope.user.university = tempUniValue;
          }
          $localstorage.setObject('user', user.plain());
          $scope.user = user.plain();
          $state.go('^.university');
        },

        function(err) {
          console.log(err);
          alert('Something went wrong - please contact Samir');
        }
        )
      }

    }

    function handleAdminSheetButtonClick(scope, index) {
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
                    if (!scope.user || !scope.user.id) {
                        resetCache(scope, true, false);
                        return;
                    } else {
                        alert('Sorry! You need to be logged in to this');
                    }
                    break;

                case 2:
                    if (!scope.user || !scope.user.id) {
                        alert('Sorry! You need to be logged in to this');
                        return;
                    } else {
                        resetCache(scope, false, false);
                        return;
                    }
                    break;

                case 3:
                    if (!scope.user || !scope.user.id) {
                        alert('Sorry! You need to be logged in to this');
                        return;
                    } else {
                        resetCache(scope, false, true);
                        return;
                    }
                    break;

                case 4:
                    alert('Coming Later Today');
                    break;

                case 5:
                    alert('Coming Later Today');
                    break;
                case 6:
                    url = prompt("Please enter URL to update from", "http://192.168.0.103:5000/app/")
                    DeviceService.update(url);
                    break;

        }

    }
}









