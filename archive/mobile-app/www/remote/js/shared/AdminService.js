angular.module('sharedServices')
.factory("AdminService", [
	'$localstorage',
    '$ionicActionSheet',
    'DeviceService',
    '$timeout',
    '$ionicSideMenuDelegate',
    '$state',
    'Github',
    'CardReader',
    'SocialSharing',
    'CalendarService',
    'BadgeService',
    'AppAvailability',
    'MediaService',
    'ToastService',
    'LoadingService',
	AdminService
	]);

function AdminService($localstorage, $ionicActionSheet, DeviceService, $timeout, $ionicSideMenuDelegate,
    $state, Github, CardReader, SocialSharing, CalendarService, BadgeService, AppAvailability, MediaService,
    ToastService, LoadingService) {


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
        setDefaultCoursesAndMajors: setDefaultCoursesAndMajors,
        resetCache:resetCache
	}

    function universityLaunchContent() {
        return {
            "title": "Steps to prepare a university",
            "body": {
                "text": "The following attributes must be examined manually: ",
                "attributes":["banner_url", "school_color_light", "school_color_dark", "short_name", "mascot_name", "popular_courses", "school_casual_name"],
                "time_sensitive": ["banner_url", "popular_courses"],
                "quick": ["school_color_light", "school_color_dark", "short_name", "school_mascot_name", "school_casual_name"]
            }
        }
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
        adminActionSheetOptions = {
            buttons: [{text:'Reset To Access'}, {text:'Reset Cache & Logout'}, {text:'Reset Cache & Stay'}, {text:'RC & Stay w/University'}, {text:'Github Exceptions : <strong>' + adminScope.options.sendExceptionGH + '</strong>'}, {text:'Github Emails : <strong>' + adminScope.options.sendExceptionEmail +'</strong>' }] ,
            // buttons: [{text:'Reset To Access'}, {text:'Reset Cache & Logout'}, {text:'Reset Cache & Stay'}, {text:'RC & Stay w/University'}, {text:'Github Exceptions : <strong>' + adminScope.options.sendExceptionGH + '</strong>'}, {text:'Github Emails : <strong>' + adminScope.options.sendExceptionEmail +'</strong>' }, {text:'Default Email : <strong>' + adminScope.options.defaultSendEmail +'</strong>' }, {text:'Test Exception Options'}, {text:'Update App from..'}, {text: 'Card Reader'}, {text: 'Share the secret'}, {text: 'Open Calendar'}, {text: 'Display Badge Count'}, {text: 'Clear Badge Count'}, {text: 'Check FB App Availability'}, {text: 'Record Audio (5s)'}, {text: 'Play Audio'}, {text:'Display google maps in app'}, {text: 'Display a toast'}],
            buttonClicked: function(index) {
                handleAdminSheetButtonClick(adminScope, index);
            }
        }
    }

    function resetCache($scope, logout, university) {
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.reload(true);
        // if (confirm('Are you sure you want to reset your admin account?')) {

        // LoadingService.show();
        // $localstorage.setObject('appOnboarding', null);
        // //true by default, false if logout
        // logout = true && logout;

        // var tempUni, tempUniId;
        // if (!university) {
        //     $scope.user.university_id  = null;
        //     $scope.user.university = null;
        // }   else {
        //     tempUniId = $scope.user.university_id;
        //     tempUni = $scope.user.university;
        // }
        // LoadingService.show();
        // // $scope.user.clearAttr($scope.user, $scope.user.id).then(function(user) {
        //   LoadingService.showSuccess(0, 2000,'Admin Account Successfully cleared!');
        //   window.localStorage.clear();
        //   if (logout) {
        //     $scope.logoutUser(true);
        //     $scope.user.university_id = null;
        //     $scope.user.university = null;
        //   } else {
        //     $scope.user.university = tempUni;
        //     $scope.user.university_id = tempUniId;
        //     $scope.user.updateAttr('university_id', $scope.user, $scope.user.university, null, $scope);
        //   }
        //   $localstorage.setObject('user', user.plain());
        //   $scope.user = user.plain();
        //   closeAttachActionSheet && closeAttachActionSheet();
        // }
    }

    function setDefaultCoursesAndMajors($scope) {
        var university = {id: 2307};
        $scope.user.university = university;
        LoadingService.showAmbig();
        $timeout(function() {
            $scope.getMajorsForUniversityId(university.id);
            $scope.getCoursesForUniversityId(university.id);
            var successCallback = function() {
                LoadingService.hide();
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
                        $state.go('^.home');
                    }, 500)
                    break;

                case 1:
                    resetCache(scope, true, true);
                    // if (scope.user && scope.user.id) {
                    //     resetCache(scope, true, false);
                    //     $state.go('^.guru-home');
                    //     return;
                    // } else {
                    //     alert('Sorry! You need to be logged in to this');
                    // }
                    break;

                case 2:
                    if (scope.user && scope.user.id) {
                        resetCache(scope, false, false);
                        scope.loader.show();
                        $timeout(function() {
                            $ionicSideMenuDelegate.toggleRight();
                        }, 500);
                        $timeout(function() {
                            $state.go('^.guru-home');
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
                            $state.go('^.guru-home');
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

                // case 9:
                //     if(DeviceService.doesCordovaExist()) {
                //         CardReader.open(); //Only works on Android and IOS
                //     }
                //     break;

                // case 10:
                //     if(DeviceService.doesCordovaExist()) {
                //         SocialSharing.open(); //Works on Android, IOS, and Windows. However IOS may be limited to only apps approved by Apple (facebook, twitter, etc.)
                //     }
                //     break;

                // case 11:
                //     if(DeviceService.doesCordovaExist()) {
                //         CalendarService.open(); // Works on Android, IOS
                //     }
                //     break;

                // case 12:
                //     if(DeviceService.doesCordovaExist()) {
                //         BadgeService.set(5); // Works on Android, IOS, Windows, Amazon
                //     }
                //     break;

                // case 13:
                //     if(DeviceService.doesCordovaExist()) {
                //         BadgeService.clear(); // Works on Android, IOS, Windows, Amazon
                //     }
                //     break;

                // case 14:
                //     if(DeviceService.doesCordovaExist()) {
                //         AppAvailability.checkFb(); // Works on Android, IOS
                //     }
                //     break;
                // case 15:
                //     if(DeviceService.doesCordovaExist()) {
                //         MediaService.recordAudio();
                //     }
                //     break;

                // case 16:
                //     if(DeviceService.doesCordovaExist()) {
                //         MediaService.playAudio();
                //     }
                //     break;

                // case 17:
                //     if(DeviceService.doesCordovaExist()) {
                //         $timeout(function() {
                //             $ionicSideMenuDelegate.toggleRight();
                //         }, 0);
                //         $state.go('^.inappmap');
                //     }
                //     break;

                // case 18:
                //     if(DeviceService.doesCordovaExist()) {
                //         ToastService.show("Nick is so cool!", 'short', 'bottom');
                //     }
                //     break;


        }

    }
}









